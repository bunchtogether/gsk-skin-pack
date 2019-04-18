#!/bin/bash

DIFF_DIRECTORIES=$(find ./diff -type d)

rm -rf ./custom

mkdir ./custom

find default -type f -print0 | xargs -0 dos2unix

for directory in $DIFF_DIRECTORIES ; do
  CUSTOM_DIRECTORY=$(echo "$directory" | sed 's/diff/custom/')
  mkdir -p $CUSTOM_DIRECTORY
done

DIFF_FILES=$(find ./diff -type f)

for file in $DIFF_FILES ; do
  DEFAULT_FILE_1=$(echo "$file" | sed 's/diff/default/')
  DEFAULT_FILE=$(echo "$DEFAULT_FILE_1" | sed 's/\.diff//')
  CUSTOM_FILE=$(echo "$DEFAULT_FILE" | sed 's/default/custom/')
  if [[ $file == *".diff"* ]];
  then
    cp $DEFAULT_FILE $CUSTOM_FILE
    patch $CUSTOM_FILE $file
  else
    cp $file $CUSTOM_FILE
  fi
done
