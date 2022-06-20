import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovie } from '../Interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {


  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // headers: new HttpHeaders({'Authorization': `Bearer ${this.token}` })
  };

// show all movies
getMovies(): Observable<IMovie[]>{
    return this._http.get<IMovie[]>(`${environment.base_url}/movies`).pipe( )
}
// get movie with specified id
getMovie(id: number): Observable<IMovie> {
  const url = `${environment.base_url}/movies/${id}`;  
  return this._http.get<IMovie>(url)
}

// create new movie
createMovie (movie: any): Observable<any> {
  return this._http.post<any>(`${environment.base_url}/movies`, movie, this.httpOptions)
}
// delete movie with specified id
deleteMovie (movie: IMovie | number): Observable<any> {
  const id = typeof movie === 'number' ? movie : movie.id;
  const url = `${environment.base_url}/movies/${id}`;

  return this._http.delete<IMovie>(url, this.httpOptions)
}
// update movie with specified id
updateMovie (formData: any , id:number): Observable<any> {
 
  return this._http.put(`${environment.base_url}/movies/${id}`,formData)
}
}
