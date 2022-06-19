import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { moviesObj } from '../Interfaces/movies';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {

  constructor(private _http: HttpClient) { }

  
  // getMovies(): Observable<moviesObj[]>{
  //   return this._http.get<moviesObj[]>(`${environment.base_url}/movies`).pipe(
  //     catchError(this.handleError)
  //   );
  
  // }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // headers: new HttpHeaders({'Authorization': `Bearer ${this.token}` })
  };
  getMovies(): Observable<moviesObj[]>{
    
    return this._http.get<moviesObj[]>(`${environment.base_url}/movies`).pipe( )
    // .pipe( )
//   private handleError(err:HttpErrorResponse){
//     // in a real world app, we may send the server to some remote logging infrastructure
//     // instead of just logging it to the console
//     let errMessage = '';
//     if(err.error instanceof ErrorEvent){
//       errMessage = `an error occured ${err.error.message}`
//     }
//     else{
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong,
//       errMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
//     }
//     //toastr
//     console.log(errMessage);
//     return throwError(errMessage)
// }

}
getMovie(id: number): Observable<moviesObj[]> {
  //return of(MOVIES.find(movie => movie.id === id));
  const url = `${environment.base_url}/movies/${id}`;
  return this._http.get<moviesObj[]>(url)
}

addMovie (movie: moviesObj[]): Observable<moviesObj[]> {
  return this._http.post<moviesObj[]>(`${environment.base_url}/movies`, movie, this.httpOptions)
}

deleteMovie (movie: moviesObj | number): Observable<moviesObj[]> {
  const id = typeof movie === 'number' ? movie : movie.id;
  const url = `${environment.base_url}/movies/${id}`;

  return this._http.delete<moviesObj[]>(url, this.httpOptions)
}

updateMovie (movie: moviesObj[]): Observable<any> {
  return this._http.put(`${environment.base_url}/movies`, movie, this.httpOptions)
}
}
