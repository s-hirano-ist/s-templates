#!/bin/bash

# .Identifierフの拡張子を持つファイルを全削除
rm *.Identifier

ls | awk '{ printf "mv %s photo_%03d.jpg\n", $0, NR }' | sh
