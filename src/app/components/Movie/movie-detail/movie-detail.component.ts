import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { moviesObj } from 'src/app/core/Interfaces/movies';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  movie: moviesObj | undefined;
  constructor(private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));    
    this.pageTitle += `: ${id}`;
  }

}
