import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ForecastService, WeatherData } from 'src/app/service/forecast.service';
import { UnixTimeConverterService } from './../../service/unix-time-converter.service';

@Component({
  selector: 'app-statistic-and-dashboard',
  templateUrl: './statistic-and-dashboard.component.html',
  styleUrls: ['./statistic-and-dashboard.component.scss'],
})
export class StatisticAndDashboardComponent {
  kelvin = 273.15;
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
  dayOfWeek: string[] = []; // giorni della settimana
  doughnutData: number[] = [0,0,0,0]; // dati del grafico a ciambella
  lineData: number[] = []; // dati del grafico a linea
  barData: number[] = []; // dati del grafico barre

  constructor(
    private forecastService: ForecastService,
    private unixTimeConverter: UnixTimeConverterService
  ) {}

  ngOnInit(): void {
    //richiamo il servizio per ricevere le previsioni del meteo
    this.forecastService.getWeatherChart().subscribe((response) => {
      this.data = response;
      this.displayChart();
    });
  }

  displayChart() {
    for (let i = 0; i < 6; i++) {
      // salvo i giorni della settimana che seguono il giorno presente
      this.dayOfWeek[i] = this.unixTimeConverter.getDayOfWeekFromUnixTimestamp(
        this.data.list[i].dt
      );
      // salvo i dati dell'umidità per il grafico a barre
      this.barData[i] = this.data.list[i].humidity;

      // creo la statistica dei dati per il grafico a ciambella
      switch (this.data.list[i].weather[0].main) {
        case "Clear": this.doughnutData[0]++;
          break;
        case "Clouds": this.doughnutData[1]++;
          break;
        case "Rain": this.doughnutData[2]++;
          break;
        case "Snow": this.doughnutData[3]++;
          break;
      }
      // ricavo i dati sulla temperatura per il grafico a linea
      this.lineData[i] = Math.round(this.data.list[i].temp.day - this.kelvin);
    }
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.createDoughnutChart(); // display del grafico a ciambella

      this.createLineChart(); // display del grafico a linea

      this.createBarChart(); // display del grafico a barre
    }, 300);
  }

  createDoughnutChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const doughnutDataFinal = {
      labels: ['Clear', 'Clouds', 'Rain', 'Snow'],
      datasets: [
        {
          data: this.doughnutData,
          backgroundColor: [
            'rgb(145, 223, 255)',
            'rgb(111, 111, 111)',
            'rgb(0, 0, 0)',
            'rgb(255,255,255)'
          ],
          hoverOffset: 4,
        },
      ],
    };

    if (ctx)
      new Chart(ctx, {
        type: 'doughnut',
        data: doughnutDataFinal,

        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  }

  createLineChart() {
    const ctx1 = document.getElementById('myChart1') as HTMLCanvasElement;
    if (ctx1)
      new Chart(ctx1, {
        type: 'line',
        data: {
          labels: this.dayOfWeek,
          datasets: [
            {
              label: 'temperature',
              data: this.lineData,
              fill: false,
              borderColor: 'rgb(0, 0, 0)',
              tension: 0.1,
            },
          ],
        },

        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  }

  createBarChart() {
    const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
    const barDataFinal = {
      labels: this.dayOfWeek,
      datasets: [
        {
          backgroundColor: 'rgb(230,218,218)',
          label: "Humidity %",
          data: this.barData,
        },
      ],
    };

    if (ctx2)
      new Chart(ctx2, {
        type: 'bar',
        data: barDataFinal,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  }
}
