import { ElementRef, TemplateRef } from "@angular/core";
import { ConditionsAndZip } from "app/conditions-and-zip.type";

export class Tab{
   name: string;
   data: ConditionsAndZip;
   template: TemplateRef<ElementRef>;

   constructor(name: string, data: ConditionsAndZip, template: TemplateRef<ElementRef>){
    this.name = name;
    this.data = data;
    this.template = template;
   }
}