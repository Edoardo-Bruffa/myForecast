import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoordCaclulatorService } from '../../service/coord-caclulator.service';
import { ForecastService } from '../../service/forecast.service';

@Component({
  selector: 'app-form-and-map',
  templateUrl: './form-and-map.component.html',
  styleUrls: ['./form-and-map.component.scss']
})
export class FormAndMapComponent {
  value='';
  cityCoordinates: number[] = [41.9027835,12.4963655];
  nuovourl = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.1766,37.7505,11,0/300x200?access_token=pk.eyJ1IjoiZWRvYXJkb2JydWZmYSIsImEiOiJjbGY5ejJranMyNTMzM3RvMXJ6ZjI0enpxIn0.o_X9Q6sIdO_R5455bXqyfg`;

  InputForm = new FormGroup({
    input: new FormControl('')
  });

  constructor(private coordCalc: CoordCaclulatorService, private elRef: ElementRef, private forecastService: ForecastService){}

  ngOnInit(): void {
    this.displayMap();
  }

  onSubmit(){
    this.cityCoordinates = this.coordCalc.calcCoordinates(this.InputForm.controls['input'].value);
    this.displayMap();
  }

  displayMap(){
    this.forecastService.setLatLon(this.cityCoordinates[0], this.cityCoordinates[1]);
    this.nuovourl = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/`+this.cityCoordinates[1]+`,`+this.cityCoordinates[0]+`,10,0/300x200?access_token=pk.eyJ1IjoiZWRvYXJkb2JydWZmYSIsImEiOiJjbGY5ejJranMyNTMzM3RvMXJ6ZjI0enpxIn0.o_X9Q6sIdO_R5455bXqyfg`;
    const imageElement = this.elRef.nativeElement.querySelector('img');
    imageElement.setAttribute('src', this.nuovourl);
    this.forecastService.setLatLon(this.cityCoordinates[0], this.cityCoordinates[1]);
  }
}
