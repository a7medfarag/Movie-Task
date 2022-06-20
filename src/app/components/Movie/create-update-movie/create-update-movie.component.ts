import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from 'src/app/core/Interfaces/movies';
import { MoviesListService } from 'src/app/core/services/movies-list.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/core/services/jwt.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _moviesListService: MoviesListService, private _http: HttpClient) { }
  submitted: boolean = false;
  movieForm: FormGroup;

  movieId: number;
  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${this.movieId}`;
    if (this.movieId) {
      this.getMovie()
    }
    else {
      this.buildForm()
    }

  }
  getMovie() {
    this._moviesListService.getMovie(this.movieId).subscribe(result => {
      this.movie = result['message']
      // console.log(this.base_url);

      this.buildForm()
      console.log(this.movie);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.movieId ? this.update() : this.onLoad();
    console.log(this.movieForm.value);

  }

  get f() {
    return this.movieForm.controls;
  }
  buildForm() {
    this.movieForm = this.fb.group({
      'name': [this.movie?.name || null, [Validators.required, Validators.minLength(4)]],
      'description': [this.movie?.description || null, [Validators.required]],
      'image': [null, [Validators.required]],
      'category_id': [this.movie?.category_id || null, [Validators.required, Validators.min(0)]]
    })
  }


  update() {
    this._moviesListService.updateMovie(this.movieForm.value).subscribe(result => console.log(result))
  }
  
  onSelectedFile(files:FileList) {
    // this.movieForm['controls']['image'].setValue(event.target.files[0]);
    this.imageFile = files.item(0)
  }
  onLoad() {
    const formData = new FormData();
    formData.append('name', this.movieForm['name'])
    formData.append('description', this.movieForm['description'])
    formData.append('image', this.imageFile, this.imageFile.name)
    formData.append('category_id', `${this.movieForm['category_id']}`)
  
    console.log(formData);
    this._http.post(`${environment.base_url}/movies`, formData, this.httpOptions)
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // headers: new HttpHeaders({'Authorization': `Bearer ${this.token}` })
  };

  // create(){    
  //   let data:IMovie = {
  //     name: this.movieForm.value.name,
  //     description: this.movieForm.value.description,
  //     image: this.imageFile,
  //     category_id:this.movieForm.value.category_id
  //   }



  // }
}
