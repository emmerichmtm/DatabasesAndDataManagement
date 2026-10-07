import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const db = new PGlite();
const read = p => readFile(new URL(p, import.meta.url), 'utf8');
let checks = 0;
const equal = (actual, expected) => { assert.deepEqual(actual, expected); checks++; };
const rows = async sql => (await db.query(sql)).rows;
async function rejected(sql, code) {
  try { await db.exec(sql); } catch (error) { equal(error.code, code); return; }
  throw new Error(`Expected ${code}: ${sql}`);
}
try {
  console.log((await rows('SELECT version()'))[0].version);
  await db.exec(await read('01-schema.sql'));
  await db.exec(await read('02-data.sql'));
  const book = await read('../Databases-ReaderBookFormat.tex');
  const blocks = [...book.matchAll(/\\begin\{codesql\}([\s\S]*?)\\end\{codesql\}/g)].map(m=>m[1].trim());
  let queries = 0;
  for (const sql of blocks) {
    if (sql.startsWith('SELECT ') && !sql.includes('column_list')) {
      await db.exec(sql); queries++;
    }
  }
  equal((await rows("SELECT customer_name FROM CUSTOMER WHERE customer_name LIKE 'A___'")), [{customer_name:'Aino'}]);
  equal((await rows('SELECT COUNT(*) AS n, COUNT(district) AS known FROM CUSTOMER')), [{n:4,known:2}]);
  equal((await rows('SELECT customer_id, SUM(invoice_total) AS total FROM INVOICE WHERE year=2025 GROUP BY customer_id HAVING SUM(invoice_total)>1000')), [{customer_id:1,total:'1400.00'}]);
  equal((await rows('SELECT SUM(l.quantity*p.unit_price) AS total FROM INVOICE_LINE l JOIN PRODUCT p USING(product_id) WHERE invoice_id=101')), [{total:'1200.00'}]);
  await rejected('INSERT INTO INVOICE_LINE VALUES (999,1,1)', '23503');
  await rejected('INSERT INTO INVOICE_LINE VALUES (101,1,2)', '23505');
  await rejected('INSERT INTO INVOICE_LINE VALUES (104,3,0)', '23514');
  await rejected('INSERT INTO INVOICE_LINE VALUES (104,3,NULL)', '23502');
  await rejected('DELETE FROM PRODUCT WHERE product_id=1', '23503');
  await db.exec('BEGIN; DELETE FROM INVOICE WHERE invoice_id=101;');
  equal(await rows('SELECT COUNT(*) AS n FROM INVOICE_LINE WHERE invoice_id=101'), [{n:0}]);
  await db.exec('ROLLBACK;');
  equal(await rows('SELECT COUNT(*) AS n FROM INVOICE_LINE WHERE invoice_id=101'), [{n:2}]);
  await db.exec("INSERT INTO CUSTOMER_CONTACT_EXAMPLE(customer_id,customer_name) VALUES (10,'Eva'),(11,'Finn');");
  equal(await rows('SELECT COUNT(*) AS n FROM CUSTOMER_CONTACT_EXAMPLE WHERE email IS NULL AND district IS NULL'), [{n:2}]);
  equal(await rows('SELECT customer_type FROM CUSTOMER_CONTACT_EXAMPLE WHERE customer_id=10'), [{customer_type:'A'}]);
  await rejected("INSERT INTO CUSTOMER_CONTACT_EXAMPLE(customer_id,customer_name,district) VALUES (12,'Gia','X')", '23514');
  await db.exec("UPDATE CUSTOMER_CONTACT_EXAMPLE SET email='sample@example.invalid' WHERE customer_id=10");
  await rejected("UPDATE CUSTOMER_CONTACT_EXAMPLE SET email='sample@example.invalid' WHERE customer_id=11", '23505');
  for (const sql of blocks.filter(s=>s.startsWith('CREATE VIEW ') || s.startsWith('CREATE INDEX '))) await db.exec(sql);
  equal(await rows('SELECT total_sales FROM v_customer_sales WHERE customer_id=1'), [{total_sales:'1400.00'}]);
  // Application control flow required by the guarded transfer in chapter 5.
  async function transfer(from, to, amount) {
    await db.exec('BEGIN');
    try {
      const debit = await db.query('UPDATE ACCOUNT SET balance=balance-$1 WHERE account_id=$2 AND balance >= $1 RETURNING account_id,balance',[amount,from]);
      if (debit.rows.length !== 1) throw new Error('Debit rejected');
      const credit = await db.query('UPDATE ACCOUNT SET balance=balance+$1 WHERE account_id=$2 RETURNING account_id,balance',[amount,to]);
      if (credit.rows.length !== 1) throw new Error('Destination missing');
      await db.exec('COMMIT');
      return true;
    } catch (error) {
      await db.exec('ROLLBACK');
      if (!['Debit rejected','Destination missing'].includes(error.message)) throw error;
      return false;
    }
  }
  equal(await transfer(1,2,100),true);
  equal(await rows('SELECT balance FROM ACCOUNT ORDER BY account_id'),[{balance:'400.00'},{balance:'300.00'}]);
  equal(await transfer(1,2,1000),false);
  equal(await transfer(1,999,100),false);
  equal(await rows('SELECT balance FROM ACCOUNT ORDER BY account_id'),[{balance:'400.00'},{balance:'300.00'}]);
  await rejected('UPDATE ACCOUNT SET balance=-1 WHERE account_id=1','23514');
  console.log(`PASS: ${queries} reader SELECT examples executed; ${checks} behavioral assertions passed.`);
  console.log('Single-backend SQL checks; concurrent sessions and deployment permissions are not simulated.');
} finally { await db.close(); }
