import { Component } from '@angular/core';
import { ForecastService, WeatherData } from 'src/app/service/forecast.service';
import { UnixTimeConverterService } from 'src/app/service/unix-time-converter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  kelvin = 273.15;
  dayOfWeek: string[] = [];
  data: WeatherData = {
    city: {
      id: 0,
      name: '',
      coord: {
        lon: 0,
        lat: 0,
      },
      country: '',
      population: 0,
      timezone: 0,
    },
    cod: '',
    message: 0,
    cnt: 0,
    list: [],
  };
  coordinates: number[] = [];
  res: string[] = [];

  constructor(
    private forecastService: ForecastService,
    private unixTimeConvertor: UnixTimeConverterService
  ) {}

  ngOnInit(): void {
    setInterval(()=>{
      this.forecastService.getWeather().subscribe((response) => {
        this.data = response;
        this.displayTable();
      });
    },200)

  }

  displayTable() {
    for (let i = 0; i < 6; i++) {
      this.dayOfWeek[i] = this.unixTimeConvertor.getDayOfWeekFromUnixTimestamp(this.data.list[i].dt);
      this.res[i] = 'https://api.openweathermap.org/img/w/' + this.data.list[i].weather[0].icon;+'.png';
    }
  }
}
