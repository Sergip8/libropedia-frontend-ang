import { Component, OnInit } from '@angular/core';
import { CardModel } from '../../../shared/card/card-model';
import { BookFilterParams } from '../../../models/book';
import { BookService } from '../../../_core/services/book.service';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';
import { PaginationComponent } from "../../../shared/pagination/pagination";
import { FilterBarComponent } from "../../../shared/filter-bar/filter-bar.component";

import { debounceTime, distinctUntilChanged, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../../_core/services/common.service';
import { LoadingComponent } from "../../../shared/loading/loading.component";
import { RxLet } from '@rx-angular/template/let';


@Component({
  selector: 'app-catalogo',
  imports: [NgFor, NgIf, CardComponent, PaginationComponent, FilterBarComponent, LoadingComponent, RxLet],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  validSort = [
    "anio ASC",
    "anio DESC",
    "rating ASC",
    "rating DESC",
  ]
  loading = false;
  filterBooks: BookFilterParams = new BookFilterParams();
  public books$: Observable<CardModel[]>;
 
  constructor(private bookService: BookService, private route: ActivatedRoute, private commonService: CommonService, private router: Router) {
    this.route.queryParams
    .subscribe(params => {
      if(params['search']){
        this.filterBooks.titulo = params['search'];

      }
      if(params['author']){
        this.filterBooks.idAutor = params['author'];
   
      }
      if(params['page']){
        this.filterBooks.offset = (params['page']-1)*this.filterBooks.limite;
        
      }
      if(params['category']){
        this.filterBooks.idCategoria = params['category'];
      }
      if(params['sort']){
        if(this.validSort.includes(params['sort'])){
          this.filterBooks.sortBy = params['sort'].split(" ")[0];
          this.filterBooks.direcction = params['sort'].split(" ")[1];
        }
      }
      console.log(this.filterBooks);
      this.bookService.updateFilter(this.filterBooks);
    });
    this.books$ = this.bookService.currentFilter$.pipe(
      startWith(null),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap(filter => this.bookService.getFilterBooks(filter)),
      tap(data => {
        this.commonService.updatePagination({ count: data.totalRecords });
      }),
      map(data => data.data.map((book: CardModel) => ({
        ...book,
        cardType: 'catalog'
      })))
    );
   }
   ngOnInit(): void {
    this.loading = true;
    
  }
  pagination={
    page: 1,
    size:10,
    count: 0
  }
  


  getFilterBooks(filter: BookFilterParams){

    this.bookService.getFilterBooks(filter)
  }
  gotoPage(page: number){
    this.commonService.updatePagination({page: page});
    this.bookService.updateFilter({ offset: (page-1)*this.filterBooks.limite });
    
    
  }

  onResetFilters(){
    this.filterBooks = new BookFilterParams();
    this.router.navigate(['catalogo']);
  }

 
}
