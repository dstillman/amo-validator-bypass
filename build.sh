#!/bin/bash

ID="$RANDOM-$RANDOM-$RANDOM"
sed -i "s/amo-validator-bypass.*@example.net/amo-validator-bypass-$ID@example.net/" install.rdf
sed -i "s/amo-validator-bypass.*@example.net/amo-validator-bypass-$ID@example.net/" README.md
rm -f ../bypass.xpi
zip -r ../bypass.xpi install.rdf chrome.manifest chrome
