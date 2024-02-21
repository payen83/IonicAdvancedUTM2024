import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(value: any, arg: any, unit?: string ): any {
    if(arg == 'convertWeight'){
      switch (unit){
        case 'kg':
          return value;
        case 'g':
          return value*1000;
        case 'lb':
          return value*2.20462
        default:
          return value;
      }

    }

    return null;
  }

} 
