const { config } = require('@feblog/config');
const cli = require('next/dist/cli/next-dev');

const port = config.ADMIN_PORT || 3002;

try {
  cli.nextDev(['-p', port]);
  console.log(`[feblog] 管理端已启动，端口：${port}`);
} catch (err) {
  console.log(`[feblog] 管理端启动失败！${err.message || err}`);
}
