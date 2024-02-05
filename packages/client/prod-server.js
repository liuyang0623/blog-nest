const { config } = require('@feblog/config');
const cli = require('next/dist/cli/next-start');

const port = config.CLIENT_PORT || 3001;

try {
  cli.nextStart(['-p', port]);
  console.log(`[feblog] 客户端已启动，端口：${port}`);
} catch (err) {
  console.log(`[feblog] 客户端启动失败！${err.message || err}`);
}
