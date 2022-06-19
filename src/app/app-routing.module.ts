import { AuthGuard } from './core/guards/auth.guard';
import { IsLoggedGuard } from './core/guards/is-logged.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MovieListComponent } from './components/Movie/movie-list/movie-list.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch:'full'},
  { path: "login", component: LoginComponent, canActivate: [IsLoggedGuard] },
  {path: 'register' , component: RegistrationComponent},
  {path: 'movie-list' , component: MovieListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
