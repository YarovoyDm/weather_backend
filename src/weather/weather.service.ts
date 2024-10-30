import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather } from './weather.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private apiKey = '2c604fb5cb65011ca5c7a84109026f18'; //Should be in .env file it's here only for test

  constructor(
    @InjectModel('Weather') private readonly weatherModel: Model<Weather>,
    private readonly httpService: HttpService,
  ) {}

  async getWeather(city: string): Promise<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;

    const response = await firstValueFrom(this.httpService.get(url));

    const newWeather = new this.weatherModel({
      city,
      data: response.data,
    });
    await newWeather.save();

    return response.data;
  }

  async getRecentRequests() {
    return this.weatherModel.find().sort({ createdAt: -1 }).limit(100).exec();
  }
}
