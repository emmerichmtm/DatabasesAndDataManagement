# Introduction to Databases and Data Management

This repository contains the course slides and the reader-style book manuscript for the databases course.

The material is organized so that the full reader can be maintained alongside the individual lecture slide sources.

## Main book file

The full reader is:

- `Databases-ReaderBookFormat.tex`

This is the main LaTeX source for the book version of the course material.

## Lecture slide sources

The lecture slides are maintained as separate LaTeX files:

- `Databases-lecture1-Introduction.tex`
- `Databases-lecture2-ConceptualER.tex`
- `Databases-lecture3-LogicalDesign.tex`
- `Databases-lecture4_sqlQueries.tex`
- `Databases-lecture5-sqlDDLandTransactions.tex`
- `Databases-lecture6-RelationalAlgebra.tex`
- `Databases-lecture7-NormalForms.tex`
- `Databases-lecture8-DataManagement.tex`
- `Databases-lecture9-MapReduceHadoop.tex`

## Repository idea

The purpose of this repository is to keep two closely related forms of the course material together:

- the **reader / book** in a continuous chapter-based format
- the **lecture slides** in individual teaching units

This makes it easier to:
- update the slides without losing the connection to the book
- enrich the book using examples, figures, and jokes from the slides
- track improvements over time with Git
- keep course teaching material and reader development synchronized

## Suggested workflow

A practical workflow is:

1. Update the relevant lecture slide source.
2. Transfer important changes to the corresponding chapter in `Databases-ReaderBookFormat.tex`.
3. Commit both changes together when they belong to the same topic.
4. Use Git history to track how the slides and the reader evolve in parallel.

## Chapter and lecture correspondence

A natural correspondence is:

- Lecture 1 → Introduction
- Lecture 2 → Conceptual modeling and ER diagrams
- Lecture 3 → Relational model and logical design
- Lecture 4 → SQL querying
- Lecture 5 → SQL DDL, transactions, and access control
- Lecture 6 → Relational algebra
- Lecture 7 → Normal forms and schema refinement
- Lecture 8 → Data warehousing, distribution, and database paradigms
- Lecture 9 → Big data, Hadoop, and MapReduce

## Building the material

You can compile the files in Overleaf or with a local LaTeX installation.

Typical use:
- compile `Databases-ReaderBookFormat.tex` for the full reader
- compile any `Databases-lectureX-...tex` file for the corresponding lecture slides

## Versioning note

The repository is intended to support long-term maintenance of both:
- the evolving course slides
- the evolving reader / book manuscript

This makes Git especially useful for:
- chapter-by-chapter refinement
- correction of definitions and examples
- integration of figures from slide sources
- release snapshots for teaching periods

## Copyright and license

Copyright © Michael Emmerich.

This material is made available under the Creative Commons Attribution 4.0 International license (CC BY 4.0).

Please provide appropriate credit when reusing, adapting, or sharing this material.

## Author and affiliation

**Michael Emmerich**  
Faculty of Information Technology  
University of Jyväskylä  
michael.t.m.emmerich@jyu.fi
