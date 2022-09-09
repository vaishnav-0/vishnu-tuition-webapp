#!/bin/sh
npm run build
cp -r build/* ../firebase/public/
cd ../firebase
firebase deploy --only hosting
