import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/core/Interfaces/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryListService } from 'src/app/core/services/category-list.service';

@Component({
  selector: 'app-create-update-category',
  templateUrl: './create-update-category.component.html',
  styleUrls: ['./create-update-category.component.css']
})
export class CreateUpdateCategoryComponent implements OnInit {

  imageFile:File;
  base_url : "https://test-api.storexweb.com/"
  pageTitle:string = 'Category Title';
  category: ICategory = {} as ICategory;
  constructor(private fb:FormBuilder, private route: ActivatedRoute , private _categoryListService:CategoryListService ,private router: Router) { }
  submitted: boolean = false;
  categoryForm: FormGroup;

  public updateData:boolean = true;
  categoryId:number;
  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));    
    this.pageTitle += `: ${this.categoryId}`;
    if(this.categoryId){
      this.getcategory();
      this.updateData = false;
    }
    else{
      this.buildForm()
    }
    
  }
  getcategory(){
    this._categoryListService.getCategory(this.categoryId).subscribe(result => {
      this.category = result['message']
      // console.log(this.base_url);
      
      this.buildForm()
      console.log(this.category);
    });
  }

  onSubmit(){
    this.submitted =true;
    this.categoryId ? this.update() : this.create();
    console.log(this.categoryForm.value);
   
  }

  get f (){
    return this.categoryForm.controls;
  }
  buildForm(){
    this.categoryForm = this.fb.group({
      'name': [ this.category?.name || null,[Validators.required, Validators.minLength(4)]],
      'categoryId': [this.category?.id || null, [Validators.required , Validators.min(0)]]
    })
  }

  update(){
    console.log(this.categoryForm.value.name);
    
    this._categoryListService.updateCategory(this.categoryForm.value.name.toString() , this.categoryId).subscribe(result=>console.log(result))
  }
  create(){
    this._categoryListService.createCategory(this.categoryForm.value).subscribe(result=> {
      if(result.status == 'success'){
        this.router.navigate(['category-list'])
      }
    })
  }

}
