// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');

export const sendEmail = (message, { host, port, user, pass }) => {
  if (!host || !port || !user || !pass) {
    console.log('邮箱配置不正确，无法发送邮件');
    return null;
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secureConnection: false,
    // secure: true,
    auth: {
      user,
      pass,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  return new Promise((resolve, reject) => {
    transport.sendMail(message, function(err, info) {
      if (err) {
        console.log('发送邮件失败', err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
