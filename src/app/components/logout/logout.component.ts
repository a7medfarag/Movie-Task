import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
 
  public showBtn:boolean = false;

  public get isAuthenticated():boolean{
    this.showBtn = this.jwt.isAuthenticated()
    return this.showBtn
  }
  constructor(private jwt:JwtService , private _router:Router) { }

  ngOnInit(): void {
  }
  showCategories(){
    const routerUrl = 'category-list'
    this._router.navigate([routerUrl])
  }
  showMovies(){
    const routerUrl = 'movie-list'
    this._router.navigate([routerUrl])
  }
 
  logout(){
    this.jwt.logout();
    }
}
