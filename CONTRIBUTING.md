# Contributing to the living book

Report an error with the edition date or Git commit, chapter and section, and a
small reproducing example when possible. Page numbers change between editions.

For changes:

1. Edit `Databases-ReaderBookFormat.tex`. Keep explanations accessible to students
   encountering databases for the first time. Use **ISE-AI** for the programme and
   **PostgreSQL** for implementation-specific SQL examples.
2. Preserve the distinction between this companion book and the TIM syllabus.
   Do not infer required chapters, deadlines, assessment rules, or teaching dates.
3. Update examples and the relevant behavioral checks for technical corrections.
   Note whether any lecture slide sources also need a matching correction.
4. Record meaningful changes in `CHANGELOG.md` and update the edition date in the
   reader and README when preparing a new published snapshot.
5. Run the SQL checks, compile the book with its index, and visually inspect the
   changed pages, diagrams, page breaks, links, and contents.
6. Regenerate the PDF and Overleaf ZIP in `dist/`, then submit a pull request with
   the reason for the change and the checks performed.

Please preserve attribution and follow the repository's CC BY 4.0 license.
