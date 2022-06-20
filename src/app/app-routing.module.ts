import { AuthGuard } from './core/guards/auth.guard';
import { IsLoggedGuard } from './core/guards/is-logged.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MovieListComponent } from './components/Movie/movie-list/movie-list.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MovieDetailGuard } from './core/guards/movie-detail.guard';
import { MovieDetailComponent } from './components/Movie/movie-detail/movie-detail.component';
import { CreateUpdateMovieComponent } from './components/Movie/create-update-movie/create-update-movie.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryDetailGuard } from './core/guards/category-detail.guard';
import { CategoryDetailComponent } from './components/Category/category-detail/category-detail.component';
import { CreateUpdateCategoryComponent } from './components/Category/create-update-category/create-update-category.component';
import { CategoryListComponent } from './components/Category/category-list/category-list.component';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch:'full'},
  { path: "login", component: LoginComponent, canActivate: [IsLoggedGuard] },
  {path: 'register' , component: RegistrationComponent},
  {path: 'movie-list' , canActivate: [AuthGuard], component: MovieListComponent},
  {path: 'movie-list/:id' , canActivate: [MovieDetailGuard , AuthGuard] , component: MovieDetailComponent},
  {path: 'create-movie'  , canActivate: [AuthGuard] , component: CreateUpdateMovieComponent},
  {path: 'update-movie/:id' , canActivate: [MovieDetailGuard] , component: CreateUpdateMovieComponent},
  {path: 'category-list' , canActivate: [AuthGuard], component: CategoryListComponent},
  {path: 'category-list/:id' , canActivate: [CategoryDetailGuard , AuthGuard] , component: CategoryDetailComponent},
  {path: 'create-category'  , canActivate: [AuthGuard] , component: CreateUpdateCategoryComponent},
  {path: 'update-category/:id' , canActivate: [CategoryDetailGuard] , component: CreateUpdateCategoryComponent},
  {path: '**' ,  component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
