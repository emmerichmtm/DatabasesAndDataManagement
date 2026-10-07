# Change log

## 2026-10-07 — SQL injection cartoon

- Add the supplied car-and-speed-camera cartoon at the end of Chapter 5,
  following its DDL/DML closing joke. Use the existing orange Joke box style
  and preserve the editable TikZ artwork and `DROP TABLE Fines;` number plate.
- Rebuild the PDF and self-contained Overleaf ZIP.

## 2026-10-07 — ISE-AI companion reader

Based on repository commit `dab7a0d02ec6d7fa2a3ff41f3d9cfb7d2b8d009a`.

### Positioning and publication

- Identify the reader as a living GitHub book supporting ISE-AI, with TIM defining
  the course sequence and requirements. Preserve its broader nine-chapter scope.
- Use PostgreSQL as the learning environment. Add edition information, attribution,
  licensing, contribution guidance, build scripts, and an Overleaf entry point.
- Replace the proposed WordPress workflow with actual GitHub maintenance guidance.
- Provide a PDF snapshot and a self-contained Overleaf ZIP in `dist/`.

### Technical corrections

- Align the running schema's integer identifiers and numeric prices across SQL
  chapters; apply LIKE to text; add the referenced product DDL; fix its FK diagram.
- Replace `ON DELETE SET NULL` on a primary-key column with `RESTRICT`; require
  non-null positive quantities. Clarify CHECK/NULL, UNIQUE/NULL, defaults, and
  referential-action constraints. Separate alternate table definitions by name.
- Rename the customer-grouped sales view accurately and qualify aggregation's
  privacy implications. Explain prerequisites for PostgreSQL role grants.
- Explain missing-row and insufficient-funds checks for transfers. Add a guarded
  update, row-count control flow, rollback checks, and a balance constraint.
- Distinguish PostgreSQL isolation behavior from SQL-standard minimum guarantees;
  explain serialization retries and distinguish classical 2PL from PostgreSQL MVCC.
- Correct entity/relationship wording, candidate-key assumptions, one-to-one FK
  uniqueness, participation constraints, and the limits of subtype-only mappings.
- Disambiguate renamed relations in self-joins; qualify division with an empty
  divisor; correct key minimality and the general BCNF decomposition formula.
- Clarify the join-tree counting assumption, CAP definitions, and combiner validity.

### Typesetting and validation

- Keep chapter reference lists inside their chapters. Fix Unicode punctuation,
  duplicate figure destinations, long schema expressions, and diagram legibility.
- Keep SQL blocks together; generate contents, cross-references, and the index.
- Execute 24 reader SELECT examples and 22 behavioral assertions with PGlite
  0.3.14 / PostgreSQL 17.5. Checks cover FK rejection, cascade/rollback, primary-key
  uniqueness, NULL handling, CHECK constraints, aggregation, and transfers.
- Compile the source and inspect rendered PDF pages. The release build is checked
  for missing characters, unresolved references, and overflowing boxes.

Review scope: this is a targeted technical and editorial review of the reader,
not a claim that every statement or exercise has been independently verified.
Concurrent sessions and installation-specific access permissions are explained
from PostgreSQL 18 documentation rather than tested by the single-backend runner.
The existing lecture slide files are retained as separately maintained sources.

Primary references for implementation notes:

- [PostgreSQL 18: constraints](https://www.postgresql.org/docs/18/ddl-constraints.html)
- [PostgreSQL 18: transaction isolation](https://www.postgresql.org/docs/18/transaction-iso.html)
- [PostgreSQL 18: explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)
- [PostgreSQL 18: privileges](https://www.postgresql.org/docs/18/ddl-priv.html)
- [Gilbert and Lynch: CAP theorem](https://doi.org/10.1145/564585.564601)
