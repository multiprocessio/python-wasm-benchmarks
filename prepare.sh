#!/usr/bin/env bash

set -e

rm -rf assets
mkdir -p assets

pushd assets
# Get coldbrew
curl -LO https://github.com/plasticityai/coldbrew/archive/refs/tags/0.0.74.zip
unzip 0.0.74.zip

# Get pyodide
curl -LO https://github.com/pyodide/pyodide/releases/download/0.18.0/pyodide-build-0.18.0.tar.bz2
tar xjf pyodide*.tar.bz2
popd
