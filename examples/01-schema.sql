-- Run once in an empty practice database. Uses PostgreSQL syntax.
BEGIN;

CREATE TABLE CUSTOMER (
  customer_id   INTEGER PRIMARY KEY,
  customer_name TEXT NOT NULL,
  city          TEXT,
  customer_type TEXT,
  district      TEXT
);

CREATE TABLE INVOICE (
  invoice_id     INTEGER PRIMARY KEY,
  customer_id    INTEGER NOT NULL,
  year           INTEGER,
  invoice_total  DECIMAL(10,2) CHECK (invoice_total >= 0),
  status         TEXT DEFAULT 'OK',
  FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id)
);

CREATE TABLE PRODUCT (
  product_id   INTEGER PRIMARY KEY,
  product_name TEXT NOT NULL,
  model        TEXT,
  color        TEXT,
  unit_price   NUMERIC(10,2) CHECK (unit_price >= 0)
);

CREATE TABLE INVOICE_LINE (
  invoice_id  INTEGER,
  product_id  INTEGER,
  quantity    INTEGER NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (invoice_id, product_id),
  FOREIGN KEY (invoice_id) REFERENCES INVOICE(invoice_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE RESTRICT
);

CREATE TABLE ACCOUNT (
  account_id INTEGER PRIMARY KEY,
  balance NUMERIC(12,2) NOT NULL CHECK (balance >= 0)
);

CREATE TABLE CUSTOMER_CONTACT_EXAMPLE (
  customer_id   INTEGER      PRIMARY KEY,
  customer_name VARCHAR(15)  NOT NULL,
  email         VARCHAR(50)  UNIQUE,
  customer_type CHAR(1)      DEFAULT 'A',
  district      CHAR(1)      CHECK (district IN ('I','L','1','2','3'))
);

COMMIT;
