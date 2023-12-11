import { TemplateRef } from "@angular/core";

export class Tab{
   name: string;
   data: Object;
   template: TemplateRef<any>;

   constructor(name: string, data: Object, template: TemplateRef<any>){
    this.name = name;
    this.data = data;
    this.template = template;
   }
}