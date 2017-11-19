#! /bin/bash

if [[ $1 == '' ]] ; then
    echo 'release version is required'
    exit 1
fi

NODE_ENV=production npm run build || exit 1

cd dist

tar czf ui-$1.tar.gz index.html main.*
