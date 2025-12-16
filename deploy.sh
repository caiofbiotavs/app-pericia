#!/bin/bash
set -e

APP_DIR="/home/caiotavares/app"
BRANCH="main"
CONTAINER="app"

cd "$APP_DIR"

echo ">>> Atualizando código"
git pull origin "$BRANCH"

echo ">>> Recarregando Caddy"
docker exec "$CONTAINER" caddy reload --config /etc/caddy/Caddyfile

echo ">>> Deploy finalizado com sucesso"
