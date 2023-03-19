import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
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
  subject = new Subject<WeatherData>();
  obsChart!: Observable<WeatherData>;

  constructor(private http: HttpClient) { }

  setLatLon(lat: number, lon: number){// recupero delle previsioni del meteo
    this.url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=`+lat+`&lon=`+lon+`&cnt=6&appid=443fa0c2cd924186bdd510aeabb03630`;// imposto latitudine e longitudine

    this.http.get<WeatherData>(this.url).subscribe( response =>{ //faccio la chiamata http
      this.subscription(response)
    });
  }

  subscription(val: WeatherData){
    this.subject.next(val); // inserimento delle previsioni del meteo in una variabile subject
  }

  getWeather(){
    return this.subject.asObservable(); // ritorno delle previsioni del meteo
  }
  getWeatherChart(){
    this.obsChart = this.http.get<WeatherData>(this.url);
    return this.obsChart
  }

}
