#!/bin/bash

# Bug present in reavt-native 0.54
# XHR fails with "Invalid response for blob" always when response status 204
# Comment line that is throwing the error, as suggested by Azkv:
# https://github.com/facebook/react-native/issues/18190#issuecomment-372989422

fetch_error='throw new Error(`Invalid response for blob: ${this._response}`);'
fetch_error_tab='          '
fetch_error_line=259

sed \
    -i '' \
    -- "$fetch_error_line"'s/^'"$fetch_error_tab$fetch_error"'$/'"$fetch_error_tab"'\/\/ '"$fetch_error"'/g' \
    node_modules/react-native/Libraries/Network/XMLHttpRequest.js

# Compatibility issue between react-native-maps 0.20.1 and react-native 0.54.
# Add '.js' to the filename on the first import

import_error="import MapView from '\.\/lib\/components\/MapView';"
import_error_line=1
import_error_fix="import MapView from '\.\/lib\/components\/MapView\.js';"

sed \
    -i '' \
    -- "$import_error_line"'s/^'"$import_error"'$/'"$import_error_fix"'/g' \
    node_modules/react-native-maps/index.js
