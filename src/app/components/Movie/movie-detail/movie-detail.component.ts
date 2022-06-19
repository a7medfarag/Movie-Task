import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/core/Interfaces/movies';
import { MoviesListService } from 'src/app/core/services/movies-list.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
}) 
export class MovieDetailComponent implements OnInit {

  pageTitle: string = 'Movie Id';
  movie: IMovie  = {} as IMovie

  base_url = 'https://test-api.storexweb.com/'

  constructor(private route: ActivatedRoute , private _moviesListService:MoviesListService ,private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));    
    this.pageTitle += `: ${id}`;
    this._moviesListService.getMovie(id).subscribe(result => {
      this.movie = result['message']
      console.log(this.movie);
      
      // this.movies.filter(items => items.id == id)
    });
  }
  
  // getImageSrc(movie:IMovie[]):string{
  //   let imgSrc = this.base_url + movie['image']
  //   return imgSrc
  // }
  // imgUrl = 

}
