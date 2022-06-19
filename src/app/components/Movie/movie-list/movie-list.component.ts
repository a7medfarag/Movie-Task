import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IMovie } from 'src/app/core/Interfaces/movies';
import { JwtService } from 'src/app/core/services/jwt.service';
import { MoviesListService } from 'src/app/core/services/movies-list.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit  {
  pageTitle = "Movies List";
  sub!:Subscription;

  private base_url = 'https://test-api.storexweb.com/'
  constructor(private _moviesListService:MoviesListService , private jwt:JwtService , private _router:Router) { }

   listSearch: string = '';

    searchByCategory:IMovie[] = [];

    movies: IMovie[] = [];

    errorMessage:string = '';

    get searchBy(): string{
      return this.listSearch;
    }
    set searchBy(value: string){
      this.listSearch = value;
      console.log('Sitter Value ' + this.listSearch);
    }

  ngOnInit(): void {
    if(this.jwt.isAuthenticated()){            
      this.sub = this._moviesListService.getMovies().subscribe({
        next: movies => {
          this.movies = movies['message'];

        },
        error: err => this.errorMessage = err
      })

    }
    else{
      this._router.navigate(['/login']);
    }
  
  }
  getImageSrc(movie:IMovie[]):string{
    let imgSrc = this.base_url + movie['image']
    return imgSrc
  }

  delete(movie: number): void {
    this.movies = this.movies.filter(m => m !== m[movie]);
    this._moviesListService.deleteMovie(movie).subscribe();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
