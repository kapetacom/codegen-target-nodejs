//#FILENAME:scripts/build.sh:write-always:755
#!/usr/bin/env bash
rm -rf ./node_modules/
npm install "$@"