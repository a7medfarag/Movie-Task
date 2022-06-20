import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/core/Interfaces/category';
import { CategoryListService } from 'src/app/core/services/category-list.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  
  pageTitle: string = 'category Id';
  category: ICategory = {} as ICategory

  base_url = 'https://test-api.storexweb.com/'
  categories: ICategory[] = [];

  constructor(private route: ActivatedRoute, private _categoryListService: CategoryListService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this._categoryListService.getCategory(id).subscribe(result => {
      this.category = result['message']
    });
  }



  
}
