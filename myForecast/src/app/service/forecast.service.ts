import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Coord {
  lon: number;
  lat: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface ListItem {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
}

export interface WeatherData {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: ListItem[];
}


@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  url: string = "";
  obs: Observable<any> = new Observable;

  constructor(private http: HttpClient) { }

  setLatLon(lat: number, lon: number){
    this.url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=`+lat+`&lon=`+lon+`&cnt=6&appid=cd72d5ff50e365968e0c6af474f2198a`
  }

  getWeather(){
    this.obs = this.http.get<WeatherData>(this.url);
    return this.obs;
  }
}
