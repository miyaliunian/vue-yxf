#!/bin/bash
# echo "pwd: $(pwd)"
echo "shell started."
#rm -rf $1.zip
ls $1.zip | xargs rm -rf
echo "rm -rf $1.zip completed."
zip -r $1.zip $1/
echo "build $1.zip completed."
echo "shell finished."
