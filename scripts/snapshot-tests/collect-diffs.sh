#!/bin/bash
set -ev

# $? is output of the previous command
# grep outputs 1 (failure) on no output
# so [[ $? == 1 ]] reverses that

DIFF_FOLDERS_LIST=diff_folders.log
DIFF_FILES_LIST=diff_files.log

echo ''
rm -rf ./tests/functional/__diff_output__
find ./tests/functional/snapshots -type d | grep __diff_output__ || [[ $? == 1 ]]
diffFolderCount=$(wc -l < $DIFF_FOLDERS_LIST)
echo "DIFF FOLDERS FOUND ($diffFolderCount found)"
cat $DIFF_FOLDERS_LIST
echo ''

echo ''
find ./tests/functional/ -type f -name '*png' | grep -h __diff_output__ > $DIFF_FILES_LIST || [[ $? == 1 ]]
diffFileCount=$(wc -l < $DIFF_FILES_LIST)
echo "DIFF FILES FOUND ($diffFileCount found)"
cat $DIFF_FILES_LIST
echo ''

node ./tests/functional/utils/collectDiffs.js

if [[ $diffFileCount -gt 0 ]]; then
    exit 1
fi
