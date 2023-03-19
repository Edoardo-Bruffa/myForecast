import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ForecastService, WeatherData } from 'src/app/service/forecast.service';
import { UnixTimeConverterService } from './../../service/unix-time-converter.service';

@Component({
  selector: 'app-statistic-and-dashboard',
  templateUrl: './statistic-and-dashboard.component.html',
  styleUrls: ['./statistic-and-dashboard.component.scss'],
})
export class StatisticAndDashboardComponent implements OnInit{
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
  };
  dayOfWeek: string[] = []; //giorni della settimana del meteo
  doughnutData: number[] = [0, 0, 0, 0]; //dati del grafico doughnut
  lineData: number[] = []; //dati del grafico line
  barData: number[] = []; //dati del grafico bar

  constructor(
    private forecastService: ForecastService,
    private unixTimeConverter: UnixTimeConverterService
  ) {}

  ngOnInit(): void {
    this.forecastService.getWeather().subscribe((response) => {
      //ricavo le previsioni del meteo
      this.data = response;
      this.displayChart(); //calcolo tutte le informazioni necessarie per realizzare i grafici
    });
  }

  displayChart() {

    for (let i = 0; i < 6; i++) {
      // converto la data da unix time a giorno della settimana
      this.dayOfWeek[i] = this.unixTimeConverter.getDayOfWeekFromUnixTimestamp(this.data.list[i].dt);
      this.barData[i] = this.data.list[i].humidity; // ricavo i dati dell'umidità

      switch ( this.data.list[i].weather[0].main ) { // ricavo la statistica sul meteo dei prossimi giorni
        case 'Clear':
          this.doughnutData[0]++;
          break;
        case 'Clouds':
          this.doughnutData[1]++;
          break;
        case 'Rain':
          this.doughnutData[2]++;
          break;
        case 'Snow':
          this.doughnutData[3]++;
          break;
      }
      // ricavo le temperature arrotondando e trasformando da kelvin a centigradi
      this.lineData[i] = Math.round(this.data.list[i].temp.day - this.kelvin);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createDoughnutChart(); //creo il doughnut chart

      this.createLineChart(); //creo il line chart

      this.createBarChart(); //creo il bar chart
    }, 300);
  }

  createDoughnutChart() {
    // prendo il tag HTML per stampare il grafico
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    // modifico i dati per utilizzarli con la libreria chartJS
    const doughnutDataFinal = {
      labels: ['Clear', 'Clouds', 'Rain', 'Snow'],
      datasets: [
        {
          data: this.doughnutData,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
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
    // prendo il tag HTML per stampare il grafico
    const ctx1 = document.getElementById('myChart1') as HTMLCanvasElement;
    // creo il grafico
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
              borderColor: 'rgb(75, 192, 192)',
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
    // prendo il tag HTML per stampare il grafico
    const ctx2 = document.getElementById('myChart2') as HTMLCanvasElement;
    // modifico i dati per utilizzarli con la libreria chartJS
    const barDataFinal = {
      labels: this.dayOfWeek,
      datasets: [
        {
          label: 'Humidity %',
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
