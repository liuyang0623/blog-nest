#! /bin/bash
# if [ -f yarn.lock ]
# then 
#     yarn --frozen-lockfile
# elif [ -f package-lock.json ]
# then
#     npm ci
# elif [ -f pnpm-lock.yaml ]
# then
#     yarn config set registry https://registry.npm.taobao.org/
#     yarn global add pnpm && pnpm i --frozen-lockfile
# else
#     echo "Lockfile not found." && exit 1
# fi

pnpm run build
pnpm run pm2

pm2 startup
pm2 save
