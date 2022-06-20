import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/core/Interfaces/movies';
import { MoviesListService } from 'src/app/core/services/movies-list.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/core/services/jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-update-movie',
  templateUrl: './create-update-movie.component.html',
  styleUrls: ['./create-update-movie.component.css']
})
export class CreateUpdateMovieComponent implements OnInit {
  imageFile: File;
  base_url: "https://test-api.storexweb.com/"
  pageTitle: string = 'Movie Title';
  movie: IMovie = {} as IMovie;
  constructor(private fb: FormBuilder,private toatsr:ToastrService , private route: ActivatedRoute, private _moviesListService: MoviesListService, private _http: HttpClient , private _router:Router) { }
  submitted: boolean = false;
  movieForm: FormGroup;
  
  movieId: number;
  ngOnInit(): void {
    // to get the movie id form the url
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${this.movieId}`;
    if (this.movieId) {
      this.getMovie()
    }
    
      this.buildForm()
    

  }
  // show the movie with the specified id
  getMovie() {
    this._moviesListService.getMovie(this.movieId).subscribe(
      result => {
        this.movie = result['message']
        this.buildForm()
      },
      err=>{
        this._router.navigate(['/movie-list'])
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    this.movieId ? this.update() : this.create();
  }

  get f() {
    return this.movieForm.controls;
  }
  
  // Update the specified movie
  update() {
    const formData:FormData = new FormData();
    
 
    this._moviesListService.updateMovie(formData , this.movie.id).subscribe(
      {
        next: res =>{
          this.toatsr.success('Movie Created Successfully' , 'Created Successfully'),
          this._router.navigate(['/movie-list'])
        } , 
        error: err=>{
          this.toatsr.error(err.message , 'Error Message')
        }
      }
    )
  }
  // to get the image as a file
  onSelectedFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.movieForm.patchValue({
      image: file
    });
    this.movieForm.get('image').updateValueAndValidity();  
  }
  // create the movie
  create() {
    const formData:FormData = new FormData();
    
    if(
      !this.movieForm.get('name').value || 
      !this.movieForm.get('description').value ||
      !this.movieForm.get('category_id').value || 
      !this.movieForm.get('image').value
    ){

      throw new Error("The parameter 'file' cannot be null.");
    }
    else {
      formData.append('name', this.movieForm.get('name').value)
      formData.append('description', this.movieForm.get('description').value)
      formData.append('image', this.movieForm.get('image').value)
      formData.append('category_id', this.movieForm.get('category_id').value)
    }


    this._http.post(`${environment.base_url}/movies`, formData).subscribe({
      next: (res)=>{
        this.toatsr.success('Movie Created Successfully' , 'Created Successfully' , {timeOut: 3000}),
        this._router.navigate(['/movie-list'])
      },
      error: (err)=>{
        this.toatsr.error(err.message , 'Error Message')
      }
      
    });
    
  }

  buildForm() {
    this.movieForm = this.fb.group({
      'description': [this.movie?.description || null, [Validators.required]],
      'name': [this.movie?.name || null, [Validators.required, Validators.minLength(4)]],
      'image': [ null || null, [Validators.required]],
      'category_id': [this.movie?.category_id || null, [Validators.required, Validators.min(0)]]
    })

    
  }

}
