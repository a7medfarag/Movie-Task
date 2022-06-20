import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryListService {

  constructor(private _http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  // get all categories
  getCategories(): Observable<ICategory[]>{
    
    return this._http.get<ICategory[]>(`${environment.base_url}/category`).pipe( )


}
// get category with specified ID
getCategory(id: number): Observable<ICategory> {
  const url = `${environment.base_url}/category/${id}`;
  return this._http.get<ICategory>(url)
}
// create new category
createCategory (category: ICategory): Observable<any> {
  const formData = new FormData();
  formData.append('name' , category.name)
  formData.append('category_id' , `${category.id}`)
  
  return this._http.post<any>(`${environment.base_url}/category`, category, this.httpOptions)
}
// delete specified category
deleteCategory (category: ICategory | number): Observable<any> {
  const id = typeof category === 'number' ? category : category.id;
  const url = `${environment.base_url}/category/${id}`;

  return this._http.delete<ICategory>(url, this.httpOptions)
}
// update specified category
updateCategory (category: ICategory , id:number): Observable<any> {
  const formData = new FormData();
  formData.append('name' , category.name)
  formData.append('_method' , 'PUT')
  
  return this._http.put(`${environment.base_url}/category/${id}`,category , this.httpOptions)
}
}
