# Introduction to Databases and Data Management

A living book by **Michael T. M. Emmerich**, Faculty of Information Technology,
University of Jyväskylä. This reader accompanies the **ISE-AI** bachelor programme
in Software Engineering and AI. **PostgreSQL** is used for SQL examples and practice.

The book has a broader scope and a different chapter sequence from the course.
The [TIM course home](https://tim.jyu.fi/view/kurssit/it/iseai/26-27/databases/home)
defines assigned reading, teaching order, exercises, assessment, and arrangements.
The nine chapters are supporting reading; inclusion does not imply required content.

## Read or edit the book

- [Download the PDF snapshot](dist/ISEAI-Databases-Reader.pdf)
- [Download the Overleaf source ZIP](dist/ISEAI-Databases-Overleaf.zip)
- [Book source](Databases-ReaderBookFormat.tex)
- [Changes and validation notes](CHANGELOG.md)

Current working edition: **7 October 2026**. Cite the date and repository commit or
release tag when referring to a specific version. This is an evolving teaching text.

## Contents

1. Introduction to databases and data management
2. Conceptual modeling with ER diagrams
3. Relational model and transformation from ER
4. SQL queries
5. Database programming: DDL, DML, access control, and transactions
6. Relational algebra
7. Schema refinement and normal forms
8. Data warehousing, distribution, and database paradigms
9. Big data, Hadoop, and MapReduce (additional reading)

The `Databases-lecture*.tex` files are the separately maintained lecture slide
sources from which the reader developed. This edition's technical review applies
to the reader and its examples. Check slide content before teaching from it;
the source slide files have not yet received the same corrections.

## Open in Overleaf

1. Download `dist/ISEAI-Databases-Overleaf.zip` as a file.
2. In Overleaf, choose **New Project > Upload Project** and upload the ZIP.
3. Set **Main document** to `main.tex` and **Compiler** to **XeLaTeX**.
4. Recompile. The table of contents, links, and index are generated automatically.

The ZIP is self-contained: all illustrations are drawn in LaTeX/TikZ. Node.js and
Python are not needed on Overleaf. The ZIP can also be edited and built locally.

## Build locally

With a current TeX Live or MiKTeX installation including `latexmk` and XeLaTeX:

```sh
latexmk -xelatex -interaction=nonstopmode -halt-on-error -outdir=build main.tex
```

This produces `build/main.pdf`, including the index. The main wrapper loads
`Databases-ReaderBookFormat.tex`, which is also directly compilable.

Alternatively, install [Tectonic](https://tectonic-typesetting.github.io/) and
MakeIndex, then use Python 3:

```sh
python scripts/build.py
python scripts/package-overleaf.py
```

The build script runs Tectonic, MakeIndex, and Tectonic again in `build/`, then
copies the PDF to `dist/`. This route was validated with Tectonic 0.17.0.
Use `--tectonic /path/to/tectonic` if it is not on PATH.
The packaging script creates the source ZIP in `dist/` without build products or
dependencies. Regenerate both downloads after changes, and inspect the PDF.

## PostgreSQL examples

Use an empty practice database. Run the schema once, then load the fictional data:

```sh
psql -v ON_ERROR_STOP=1 -d reader_practice -f examples/01-schema.sql
psql -v ON_ERROR_STOP=1 -d reader_practice -f examples/02-data.sql
```

These files contain the chapter 4/5 running schema and data. The prose includes
independent examples and syntax templates; it is not a script to execute from top
to bottom. In particular, privilege examples require existing roles, suitable
schema/database access, and an authorized grantor. The guarded transfer requires
application checks on the number of updated rows.

For contributor checks using Node.js and pnpm:

```sh
pnpm install --frozen-lockfile
pnpm test
```

The tests use PGlite, a WebAssembly build of PostgreSQL, to execute reader queries
and check constraint and transaction behavior. They do not simulate concurrent
connections or deployment-specific permissions. No running server is required.

## Contributing and versioning

Use GitHub issues for errors and suggestions, and pull requests for edits. See
[CONTRIBUTING.md](CONTRIBUTING.md). Keep source and example corrections together,
record substantive changes in the change log, and regenerate the downloadable
snapshot. Use Git history or dated release tags to refer to past editions.

## Copyright and license

Copyright © Michael Emmerich. The material is shared under
[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
Please credit the author and identify adaptations when reusing it.

Michael T. M. Emmerich · Faculty of Information Technology · University of Jyväskylä

michael.t.m.emmerich@jyu.fi
