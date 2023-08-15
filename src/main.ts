import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
	app.enableCors();

	const options = new DocumentBuilder()
		.setTitle('Ever API Starter Kit')
		.setDescription('The Ever API Starter Kit REST API Description')
		.setVersion('1.0')
		.addTag('ever')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	const port = 3005;

	await app.listen(port, async () => {
		console.log(`Listening at Port: ${port}`);
	});
}

bootstrap();
