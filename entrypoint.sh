#!/bin/sh

# give 'node' user from alpine container ownership of .next folder
# so that server can write new pages (static regeneration)
chown -R node /usr/app/.next

# Run pm2 as 'node' user
# pm2 is a replacement for 'npm start' and will
# reboot the server on failures
exec su-exec node pm2-runtime npm -- start "$@"
