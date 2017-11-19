#! /bin/bash

if [[ $1 == '' ]] ; then
    echo 'release version is required'
    exit 1
fi

NODE_ENV=production npm run build || exit 1

package_name=haproxy-router-ui_$1

mkdir -p build 
mv dist $package_name

tar czf build/$package_name.tar.gz $package_name/

rm -rf $package_name
