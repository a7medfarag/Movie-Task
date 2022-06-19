import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../Interfaces/category';
@Pipe({
  name: 'searchCategory'
})

export class SearchCategoryPipe implements PipeTransform {

  transform(categories: ICategory[], value: number): ICategory[] {
    if(!categories)return [];
      if(!value)return categories;
      return categories.filter(function(category){   
        console.log(typeof category.id);
             
          return category.id == value;
      });
  }

}
