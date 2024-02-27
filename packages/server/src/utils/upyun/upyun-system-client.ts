import axios from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpyunClient } from './upyun-client';
const FormData = require('form-data');
import { HexMD5, b64hamcsha1 } from './hash';

export class UpyunSysClient extends UpyunClient {
  // eslint-disable-next-line class-methods-use-this
  constructor(config) {
    super(config);
  }

  async putFile(fileData: any) {
    const uploadData = new FormData();
    const { bucketname, operator, password, apiPrefix, upyunCdn } = this.config;
    const { path, file } = fileData;
    uploadData.append('file', file.buffer, file.originalname);

    const apiUrl = `${apiPrefix}/${bucketname}`;

    /* 计算policy */
    const policyObj = {
      'bucket': bucketname,
      'save-key': `/{filename}-${new Date().getTime()}{.suffix}`,
      'expiration': new Date().getTime() + 3600 /* 过期时间，在当前时间+10分钟 */,
    };
    const policy = btoa(JSON.stringify(policyObj));
    uploadData.append('policy', policy);

    /* 计算 Authorization */
    const passwordMd5 = HexMD5.MD5(password).toString(HexMD5.enc.Hex);
    /* [Method-请求方法, URI-请求路径, policy] */
    const arr = ['POST', `/${bucketname}`, policy];
    const authorization = `UPYUN ${operator}:${b64hamcsha1(passwordMd5, arr.join('&'))}`;
    uploadData.append('authorization', authorization);
    let resultUrl = '';
    try {
      const res: any = await axios({ method: 'POST', url: apiUrl, data: uploadData });
      if (res.code === 200) {
        resultUrl = `${upyunCdn}${res.url}`;
      }
    } catch (error) {
      throw new HttpException(error.response.data.msg, HttpStatus.BAD_REQUEST);
    }
    return resultUrl;
  }

  // async deleteFile(url: string) {
  //   const client = await this.buildClient();
  //   await client.delete(url);
  // }
}
