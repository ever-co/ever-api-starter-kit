import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class SchemaService implements OnApplicationBootstrap {
  constructor(
  ) {
	console.log(`SchemaService initializing.`);
  }

  async ping(): Promise<void> {
	console.log('SchemaService ping');
  }

  async onApplicationBootstrap(): Promise<void> {
    console.log('SchemaService onApplicationBootstrap');
  }
}
