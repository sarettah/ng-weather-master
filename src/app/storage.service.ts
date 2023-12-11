import { Injectable } from '@angular/core';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

export const STORAGE_CONDITIONS : string = "storage-conditions";
export const STORAGE_FORECAST : string = "storage-forecast";
export const STORAGE_DATE : string = "storage-date";

export interface ForecastAndZip{
  zip: string;
  forecast: Forecast;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

conditionList : ConditionsAndZip[] = [];
forecastList: ForecastAndZip[] = [];

time: number = 2 * 3600;//this is 2 hours, can change it to 30
storageDate: Date;
nowDate: Date = new Date();

constructor() { 

  //get storage date from locastorage
  let storageDateString = localStorage.getItem(STORAGE_DATE);

  //if exists i use it, else i set it to now
  if(storageDateString){
    this.storageDate = new Date(JSON.parse(storageDateString))
  }else{
    localStorage.setItem(STORAGE_DATE, JSON.stringify(this.nowDate));
    this.countDown();
  }

  //if storage date exists calculate the time 
  if(this.storageDate){
    let seconds = (this.nowDate.getTime() - this.storageDate.getTime()) / 1000;
    
    if(this.time <= seconds  ){//if passed 2 hours then i delete the storage and set storagedate to now
      this.deleteStorage();
      localStorage.setItem(STORAGE_DATE, JSON.stringify(this.nowDate));
      this.countDown();
    }else{ //if not passed 2 hours i wait util they pass
      setTimeout(()=>{
        this.deleteStorage();
        localStorage.setItem(STORAGE_DATE, JSON.stringify(new Date()));
        this.countDown();
      }, (this.time-seconds)*1000);
    }
  }

  let conditionsString = localStorage.getItem(STORAGE_CONDITIONS);
  if (conditionsString)
      this.conditionList = JSON.parse(conditionsString);

  let forecastsString = localStorage.getItem(STORAGE_FORECAST);
  if(forecastsString)
    this.forecastList = JSON.parse(forecastsString);
}


countDown(){//every 2 housr the storage is deleted and the storagedate is set to now
  timer(0, this.time*1000).pipe( 
    map(() => { 
      this.deleteStorage();
      localStorage.setItem(STORAGE_DATE, JSON.stringify(new Date()));
    }) 
  ).subscribe();
}

storeCondition(condition: ConditionsAndZip){
  if(!this.findStoredConditionByZip(condition.zip)){
    this.conditionList.push(condition);
    localStorage.setItem(STORAGE_CONDITIONS, JSON.stringify(this.conditionList));
  }
}

findStoredConditionByZip(zipcode: string): boolean{
  return this.conditionList.findIndex(condition => condition.zip == zipcode) == -1 ? false : true;
}

getStoredCondition(zipcode: string): ConditionsAndZip{
  return this.conditionList.find(condition => condition.zip == zipcode);
}



storeForecast(zipcode: string, forecast: Forecast){
  if(!this.findForecastByZip(zipcode)){
    this.forecastList.push({zip: zipcode, forecast: forecast})
    localStorage.setItem(STORAGE_FORECAST, JSON.stringify(this.forecastList))
  }
}

findForecastByZip(zipcode: string): boolean{
  return this.forecastList.findIndex(forecast => forecast.zip == zipcode) == -1 ? false : true;
}

getStoredForecast(zipcode: string): Forecast{
    return this.forecastList.find(forecast => forecast.zip == zipcode).forecast;
}



deleteStorage(){
  localStorage.setItem(STORAGE_CONDITIONS, JSON.stringify([]) );
  localStorage.setItem(STORAGE_FORECAST, JSON.stringify([]) );
  this.conditionList = [];
  this.forecastList = [];
}

}
