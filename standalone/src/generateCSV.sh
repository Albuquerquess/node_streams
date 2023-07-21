#!/bin/bash
echo "nome, idade, cargo, idx2m, idx3m, idx4m, idx5" > database.csv
for (( c=1; c<=10000; c++ )); do echo "Gustavo-$c, $(($c*10)), Cargo-$c, $(($c*2)), $(($c*3)), $(($c*4)), $(($c*5))" >> database.csv; done