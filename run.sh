#!/usr/bin/env bash

set -e

rm -f runlog

names="pyodide coldbrew"
times=20

echo "name,time"

for name in $names; do
    for time in $(seq 1 $times); do
	res="$(node load.js $name.html)"
	echo "$name,$res"
    done
done
