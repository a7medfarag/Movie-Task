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
  public deleted:boolean = true;
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));    
    console.log(typeof id);
    
    this.pageTitle += `: ${id}`;
    this._moviesListService.getMovie(id).subscribe(result => {
      this.movie = result['message']
      console.log(this.movie);
      
      // this.movies.filter(items => items.id == id)
    });
  }
  delete(movie: IMovie): void {
    // this.movie = this.movie.filter(m => m !== m[movie]);
    this._moviesListService.deleteMovie(movie).subscribe();
    this.deleted = false;
    this.router.navigate(['movie-list'])
  } 


}
