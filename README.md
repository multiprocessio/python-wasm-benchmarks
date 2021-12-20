# Python WASM Benchmark

## Setup

Once you have this repo, run:

```bash
$ yarn
```

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
$ sqlite3 bench.db 'SELECT name, AVG(time) FROM results GROUP BY name ORDER BY AVG(time) DESC;'
pyodide,3.35955
coldbrew,2.9929
```