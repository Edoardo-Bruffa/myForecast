import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordCaclulatorService {
  coordinates : number[] = [41.9027835,12.4963655];

  constructor(private http: HttpClient) {}

  calcCoordinates( cityName: string | null): number[] {
    const apiKey = '6f72c678f66144389ee34ae96e42d3c8';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`;


    this.http.get<any>(url).subscribe((response: any) => {
      this.coordinates[0] = response.results[0].geometry.lat;
      this.coordinates[1] = response.results[0].geometry.lng;
    });

    return this.coordinates;
  }

  getCoordinates(){
    return this.coordinates;
  }

}
