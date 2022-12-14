import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'App is working DEV : 131220221912';
  }
}
