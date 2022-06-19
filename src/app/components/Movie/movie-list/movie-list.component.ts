import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { moviesObj } from 'src/app/core/Interfaces/movies';
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

  private _listFilter: string = '';

    listByCategory:moviesObj[] = [];

    movies: moviesObj[] = [];

    errorMessage:string = '';

    get filterBy(): string{
      return this._listFilter;
    }
    set filterBy(value: string){
      this._listFilter = value;
      console.log('Sitter Value ' + this._listFilter);
      this.listByCategory = this.performFilter(value);
    }
    performFilter(listedBy: string):moviesObj[]{
      // listedBy = listedBy.toLocaleLowerCase();
      return this.movies.filter((movie:moviesObj)=> {
        console.log(this.movies);
        console.log(movie);
        movie.category_id.includes(listedBy)});
    }
  ngOnInit(): void {
    if(this.jwt.isAuthenticated()){      
      // console.log(this._moviesListService.getMovies());
      
      this.sub = this._moviesListService.getMovies().subscribe({
        next: movies => {
          this.movies = movies['message'];
          
          this.listByCategory = this.movies;
          console.log(this.listByCategory);
        },
        error: err => this.errorMessage = err
      })
      // console.log(this.sub);
    //  this.getMovies();
      
      
    }
    else{
      this._router.navigate(['/login']);
    }
  
  }
  getImageSrc(movie:moviesObj[]):string{
    let imgSrc = this.base_url + movie['image']
    return imgSrc
  }
  // getMovies(): void {
  //   console.log('here');
  //   this._moviesListService.getMovies().subscribe(movies => {
      
      
  //     this.movies = movies['message']
  //     console.log(this.movies);
  //   });
  // }
  delete(movie: number): void {
    this.movies = this.movies.filter(m => m !== m[movie]);
    this._moviesListService.deleteMovie(movie).subscribe();
  }
  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}
