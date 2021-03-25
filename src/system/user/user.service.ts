import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async getHello(): Promise<string> {
        return 'Hello World!';
    }
}
