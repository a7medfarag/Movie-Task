import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/core/Interfaces/category';
import { CategoryListService } from 'src/app/core/services/category-list.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  pageTitle = "Categories List";
  sub!:Subscription;

  private base_url = 'https://test-api.storexweb.com/'
  constructor(private _categoryListService:CategoryListService , private jwt:JwtService , private _router:Router) { }

   listSearch: string = '';

    searchByCategory:ICategory[] = [];

    categories: ICategory[] = [];

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
      this.sub = this._categoryListService.getCategories().subscribe({
        next: categories => {
          this.categories = categories['message'];

        },
        error: err => this.errorMessage = err
      })

    }
    else{
      this._router.navigate(['/login']);
    }
  
  }
  getImageSrc(category:ICategory[]):string{
    let imgSrc = this.base_url + category['image']
    return imgSrc
  }

  showCategory(id:number){
    const routerUrl = `category-list/${id}`
    this._router.navigate([routerUrl])    
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
