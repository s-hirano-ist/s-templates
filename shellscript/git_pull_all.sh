#!/bin/bash
cd personal
DIR_NAMES=(`ls`)
for DIR_NAME in "${DIR_NAMES[@]}"; do
    echo $DIR_NAME
    cd $DIR_NAME
    git pull
    cd ..
done
cd ..
