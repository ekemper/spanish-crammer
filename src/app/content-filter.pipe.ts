import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contentFilter'
})
export class ContentFilterPipe implements PipeTransform {

  transform(value: any[], searchFor: string) : any[] {
    if (!searchFor) return value;
    searchFor = searchFor.toLowerCase();
    return value.filter(
    	word => word.english.toLowerCase().indexOf(searchFor) >= 0 || word.spanish.toLowerCase().indexOf(searchFor) >= 0 );

      /*dive.location.toLowerCase().indexOf(searchFor) >= 0 ||
      dive.depth.toString().indexOf(searchFor) >= 0 ||
      dive.time.toString().indexOf(searchFor) >= 0);*/
  }

}
