#!/bin/bash

# touch $2
# cat $1 | while read line
# do
#   echo "$line$3" >> $2
# done

# usage
# sh sample.sh INPUT_DIR OUTPUT_DIR STRING_TO_ADD
mkdir $2
INPUT_FILE_LIST=($(ls ${1}))
for FILE_NAME in ${INPUT_FILE_LIST[@]}; do
  touch "$2/$FILE_NAME"
  cat "$1/$FILE_NAME" | while read line
  do
    echo "$line$3" >> "$2/$FILE_NAME"
  done
done
