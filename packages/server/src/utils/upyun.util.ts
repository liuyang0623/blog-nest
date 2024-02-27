import { HttpException, HttpStatus } from '@nestjs/common';

import { SettingService } from '../modules/setting/setting.service';
import { UpyunSysClient } from './upyun/upyun-system-client';
import { UpyunClient } from './upyun/upyun-client';

export class Upyun {
  settingService: SettingService;
  config: Record<string, unknown>;
  upyunClient: UpyunClient;

  constructor(settingService: SettingService) {
    this.settingService = settingService;
  }

  private async getConfig() {
    const data = await this.settingService.findAll(true);
    const config = JSON.parse(data.upyun);
    if (!config) {
      throw new HttpException('又拍云 配置不完善，无法进行操作', HttpStatus.BAD_REQUEST);
    }
    return config as Record<string, unknown>;
  }

  private async getUpyunClient() {
    const config = await this.getConfig();
    const type = String(config.type).toLowerCase();

    switch (type) {
      case 'aliyun':
      default:
        return new UpyunSysClient(config);
    }
  }

  async putFile(fileData: any) {
    const client = await this.getUpyunClient();
    const url = await client.putFile(fileData);
    return url;
  }

  // async deleteFile(url: string) {
  //   const client = await this.getUpyunClient();
  //   await client.deleteFile(url);
  // }
}
