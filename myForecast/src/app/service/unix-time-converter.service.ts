import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnixTimeConverterService {
  giorno: string = '';
  getDayOfWeekFromUnixTimestamp(unixTimestamp: number):any {
    let date = new Date(unixTimestamp *1000);
    switch(date.getDay()){ // ritorno il giorno della settimana
      case 0: return "Sunday";
      case 1: return "Monday";
      case 2: return "Tuesday";
      case 3: return "Wednesday";
      case 4: return "Thursday";
      case 5: return "Friday";
      case 6: return "Saturday";
    }
  }
}
