import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
	console.log(`AppController initializing. Sending "ping"... Get: ${JSON.stringify(appService.ping())}`);
  }
}
