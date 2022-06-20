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
  getMovies(): Observable<IMovie[]>{
    
    return this._http.get<IMovie[]>(`${environment.base_url}/movies`).pipe( )
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
getMovie(id: number): Observable<IMovie> {
  const url = `${environment.base_url}/movies/${id}`;
  console.log(url);
  
  return this._http.get<IMovie>(url)
}


createMovie (movie: any): Observable<any> {
  return this._http.post<any>(`${environment.base_url}/movies`, movie, this.httpOptions)
}

deleteMovie (movie: IMovie | number): Observable<any> {
  const id = typeof movie === 'number' ? movie : movie.id;
  const url = `${environment.base_url}/movies/${id}`;

  return this._http.delete<IMovie>(url, this.httpOptions)
}

updateMovie (movie: IMovie): Observable<any> {
  const formData = new FormData();
  formData.append('name' , movie.name)
  formData.append('description' , movie.description)
  formData.append('image' , movie.image)
  formData.append('category_id' , `${movie.category_id}`)
  return this._http.put(`${environment.base_url}/movies`,formData , this.httpOptions)
}
}
