#!/bin/bash
echo "nome, idade, cargo" > database.csv
for (( c=1; c<=10000000000; c++ )); do echo "Gustavo-$c, $c, Cargo-$c" >> database.csv; done