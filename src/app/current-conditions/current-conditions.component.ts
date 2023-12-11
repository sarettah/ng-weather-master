import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, effect, inject, OnDestroy, OnInit, Signal, TemplateRef, ViewChild} from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../conditions-and-zip.type';
import { Subscription, timer } from 'rxjs';
import { Tab } from './tab.model';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent{

  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> =  this.weatherService.getCurrentConditions();

  protected tabs = [];


  currentTemplate:  TemplateRef<string> ;
  location: ConditionsAndZip;

  @ViewChild('template1') template1: TemplateRef<string> ;
  
  constructor(){
    effect(() => {
      this.tabs = this.currentConditionsByZip().map(item=>new Tab(item.data.name+' ('+item.zip+')', item, this.template1));
      this.location = this.tabs[0]?.data;
    });
  }

  ngAfterViewInit(): void {
    for(let tab of this.tabs){
      tab.template = this.template1;
    }
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  remove(zip:string){
    this.locationService.removeLocation(zip)
    this.weatherService.removeCurrentConditions(zip);
  }


  tabClick(tab: Tab){
    this.location = tab.data;
    this.currentTemplate = tab.template;
  }

}
