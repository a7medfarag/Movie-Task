import { Pipe, PipeTransform } from '@angular/core';
import { IMovie } from '../Interfaces/movies';
@Pipe({
  name: 'searchMovie'
})
export class SearchMoviePipe implements PipeTransform {

  transform(movies: IMovie[], value: number): IMovie[] {
    if(!movies)return [];
      if(!value)return movies;
      return movies.filter(function(movie){                
          return movie.category_id == value;
      });
  }

}

