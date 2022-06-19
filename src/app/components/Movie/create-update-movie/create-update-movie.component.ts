import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/core/Interfaces/movies';
import { MoviesListService } from 'src/app/core/services/movies-list.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/core/services/jwt.service';
@Component({
  selector: 'app-create-update-movie',
  templateUrl: './create-update-movie.component.html',
  styleUrls: ['./create-update-movie.component.css']
})
export class CreateUpdateMovieComponent implements OnInit {
  imageFile:File;
  base_url : "https://test-api.storexweb.com/"
  pageTitle:string = 'Movie Title';
  movie: IMovie = {} as IMovie;
  constructor(private fb:FormBuilder, private route: ActivatedRoute , private _moviesListService:MoviesListService ,private router: Router) { }
  submitted: boolean = false;
  movieForm: FormGroup;

  movieId:number;
  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));    
    this.pageTitle += `: ${this.movieId}`;
    if(this.movieId){
      this.getMovie()
    }
    else{
      this.buildForm()
    }
    
  }
  getMovie(){
    this._moviesListService.getMovie(this.movieId).subscribe(result => {
      this.movie = result['message']
      // console.log(this.base_url);
      
      this.buildForm()
      console.log(this.movie);
    });
  }

  onSubmit(){
    this.submitted =true;
    this.movieId ? this.update() : this.create();
    console.log(this.movieForm.value);
   
  }

  get f (){
    return this.movieForm.controls;
  }
  buildForm(){
    this.movieForm = this.fb.group({
      'name': [ this.movie?.name || null,[Validators.required, Validators.minLength(4)]],
      'description': [this.movie?.description || null, [Validators.required]],
      'image': [null, [Validators.required]],
      'categoryId': [this.movie?.category_id || null, [Validators.required , Validators.min(0)]]
    })
  }

  update(){
    this._moviesListService.updateMovie(this.movieForm.value).subscribe(result=>console.log(result)
    )
  }
  create(){
    this._moviesListService.createMovie(this.movieForm.value).subscribe(result=>console.log(result))
  }
}
