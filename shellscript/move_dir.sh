#!/bin/bash

# ファイルのみ再帰的にTARGET_DIRに移動
find TARGET_DIR -type f -exec mv {} DEST_DIR \;

