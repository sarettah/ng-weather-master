import { Component,  EventEmitter, Input,  Output, TemplateRef } from '@angular/core';
import { Tab } from '../tab.model';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css']
})
export class TabViewComponent {


  @Input() tabs: Tab[] = [];
  @Input() currentTemplate: TemplateRef<any>;

  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  



  constructor() {}


  close(zip: string){
    this.remove.emit(zip);
  }

  tabClick(tab: Tab){
    this.currentTemplate = tab.template;
    this.clicked.emit(tab);
  }

  

}
