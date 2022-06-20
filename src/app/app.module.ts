import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorsProviders } from './core/interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MovieListComponent } from './components/Movie/movie-list/movie-list.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MovieDetailComponent } from './components/Movie/movie-detail/movie-detail.component';
import { SearchMoviePipe } from './core/pipes/search-movie.pipe';
import { SearchCategoryPipe } from './core/pipes/search-category.pipe';
import { CreateUpdateMovieComponent } from './components/Movie/create-update-movie/create-update-movie.component';
import { CreateUpdateCategoryComponent } from './components/Category/create-update-category/create-update-category.component';
import { CategoryDetailComponent } from './components/Category/category-detail/category-detail.component';
import { CategoryListComponent } from './components/Category/category-list/category-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovieListComponent,
    RegistrationComponent,
    MovieDetailComponent,
    SearchMoviePipe,
    SearchCategoryPipe,
    CreateUpdateMovieComponent,
    PageNotFoundComponent,
    CreateUpdateCategoryComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
  ],
  providers: [httpInterceptorsProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
