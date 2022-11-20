import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroBuscador'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    //Si el valor es vacio y menor de x caracteres que no filtre
      if(arg === '' || arg?.length < 2) return value;
      const resultsPost = [];
      for(const post of value){
          if(post.nombre?.toLowerCase().indexOf(arg.toLowerCase()) > -1){
              resultsPost.push(post);
          };
      };
      return resultsPost;
  }
}
