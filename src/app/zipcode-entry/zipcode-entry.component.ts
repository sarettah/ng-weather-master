import { Component, effect } from '@angular/core';
import { LocationService } from 'app/location.service';
import { WeatherService } from 'app/weather.service';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
})
export class ZipcodeEntryComponent {

  zipcodeString : string;
  
  constructor(private locationService : LocationService, private weatherService: WeatherService) {
   
    for (let loc of this.locationService.getLocations())
        if(!this.weatherService.findCurrentConditions(loc))
          this.weatherService.addCurrentConditions(loc);
    
   }


  addLocation(zip){
    if(!this.locationService.getLocations().includes(zip)){
      this.locationService.addLocation(zip);
      this.weatherService.addCurrentConditions(zip);
    }
  }
}
