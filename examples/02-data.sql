-- Small fictional dataset for the reader's query examples.
BEGIN;
INSERT INTO CUSTOMER VALUES
 (1,'Aino','Jyväskylä','A',NULL),
 (2,'Ben Berg','Turku','A','L'),
 (3,'Cleo Laine','Helsinki','B','2'),
 (4,'Dara','Tampere','B',NULL);
INSERT INTO PRODUCT VALUES
 (1,'Atlas notebook','A4','blue',10.00),
 (2,'Amber keyboard','K1','black',100.00),
 (3,'Canvas bag','C2','green',20.00);
INSERT INTO INVOICE VALUES
 (101,1,2025,1200.00,'OK'),
 (102,1,2025,200.00,'OK'),
 (103,2,2024,40.00,'OK'),
 (104,3,2025,100.00,'OK');
INSERT INTO INVOICE_LINE VALUES
 (101,1,20),(101,2,10),(102,2,2),(103,3,2),(104,2,1);
INSERT INTO ACCOUNT VALUES (1,500.00),(2,200.00);
COMMIT;
