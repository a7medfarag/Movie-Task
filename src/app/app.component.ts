import { Component } from '@angular/core';
import { JwtService } from './core/services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie-Task';

  // public showBtn:boolean = true;
  constructor(private jwt:JwtService){}
  ngOnInit(): void {
    // this.checkLogging();
  }
  logout(){
    this.jwt.logout();
    // this.showBtn = true;
    }
// OnChanges(){
//   this.checkLogging()
// }
// checkLogging(){
//   if(this.jwt.isAuthenticated() == true){
//     this.showBtn = true;
//   }
//   this.showBtn = false;
// }
}
