#!/bin/bash

set -e


cat > custom_values.yaml << EOF
imageCredentials:
  creds: $REGISTRY_TOKEN

EOF