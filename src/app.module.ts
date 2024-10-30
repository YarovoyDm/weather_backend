import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://yarovyidmytro:Silent.pick1@cluster0.mwuipr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ), // String above should be in .env file, it's here only for test
    WeatherModule,
  ],
})
export class AppModule {}
