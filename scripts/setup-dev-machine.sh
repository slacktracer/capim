#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> /etc/hosts"
if grep -q "capim.local" /etc/hosts; then
  echo "capim.local already in /etc/hosts, skipping"
else
  echo "127.0.0.1 capim.local" | sudo tee -a /etc/hosts
fi

echo "==> mkcert"
if ! command -v mkcert &>/dev/null; then
  sudo dnf install -y mkcert
else
  echo "mkcert already installed, skipping"
fi

mkcert -install

if [[ -f "$repo_root/capim.local.pem" && -f "$repo_root/capim.local-key.pem" ]]; then
  echo "capim.local certs already exist, skipping"
else
  (cd "$repo_root" && mkcert capim.local)
fi

echo "==> main/.env"
if [[ -f "$repo_root/main/.env" ]]; then
  echo "main/.env already exists, skipping"
else
  cp "$repo_root/main/.env.example" "$repo_root/main/.env"
  sed -i 's#^NUXT_PUBLIC_BASE_URL=$#NUXT_PUBLIC_BASE_URL=https://capim.local:2099#' "$repo_root/main/.env"
fi

echo "==> Done. Run 'pnpm run x' from the repo root, then open https://capim.local:3000"
