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
  dayOfWeek: string[] = []; // giorni della settimana
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
  }; // dati del meteo
  coordinates: number[] = []; // coordinate della città
  imageSrc: string[] = []; // variabile in cui vengono caricare le url delle immagini per l'html

  constructor(
    private forecastService: ForecastService,
    private unixTimeConverter: UnixTimeConverterService
  ) {}

  ngOnInit(): void {
      //chiamo l'API per avere le previsioni del meteo
      this.forecastService.getWeather().subscribe((response) => {
        this.data = response;
        this.displayTable();
      });
  }

  displayTable() {
    // salvo i prossimi giorni della settimana e gli url delle immagini
    for (let i = 0; i < 6; i++) {
      this.dayOfWeek[i] = this.unixTimeConverter.getDayOfWeekFromUnixTimestamp(this.data.list[i].dt);
      this.imageSrc[i] = 'https://api.openweathermap.org/img/w/' + this.data.list[i].weather[0].icon;+'.png';
    }
  }

}
