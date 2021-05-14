mkdir compressFiles
cp /dist/. compressFiles/
cp -r node_modules compressFiles/
zip -r Archive.zip compressFiles