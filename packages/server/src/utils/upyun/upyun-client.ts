export abstract class UpyunClient {
  config: Record<string, unknown>;

  constructor(config) {
    this.config = {
      ...config,
      apiPrefix: 'https://v0.api.upyun.com',
      upyunCdn: 'https://upyun.liuyfe.com',
    };
  }

  // abstract putFile(fileData: FormData): Promise<string>;
  abstract putFile(fileData: FormData);
  // abstract deleteFile(url: string): Promise<void>;
}
