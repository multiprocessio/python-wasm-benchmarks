# Python WASM Benchmark

[Pyodide](https://pyodide.org/en/stable/) and
[Coldbrew](https://github.com/plasticityai/coldbrew) are two packages
of CPython+Emscripten that enables you to run CPython in the browser
on WebAssembly.

The good thing about that is that unlike
[Brython](https://brython.info/) (which is a great project in its own
right) you're not dealing with an implementation that only __looks__
like Python.

The bad thing is that there's an expensive load time. This repo
provides some utilities for benchmarking the load time of various
Python WASM packages.

## Setup

Once you have this repo, run:

```bash
$ yarn
$ ./prepare.sh
```

./prepare.sh will install coldbrew and pyodide locally so we aren't
benchmark CDN response times.

## Run

You can run a load tests a number of times:

```bash
$ ./run.sh
```

This will dump a CSV to output.

## Analysis

```bash
$ ./run.sh | tee results.csv
$ sqlite3 bench.db
sqlite> .mode csv
sqlite> .import results.csv results
sqlite> ^D
```

Then you can run queries:

```sql
$ sqlite3 bench.db 'SELECT name, AVG(time) FROM results GROUP BY name ORDER BY AVG(time) ASC;'
pyodide,2.24545
coldbrew,2.35455
```