import { Component, OnInit } from '@angular/core';
import { CardModel } from '../../../shared/card/card-model';
import { BookFilterParams } from '../../../models/book';
import { BookService } from '../../../_core/services/book.service';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../../../shared/card/card.component';
import { PaginationComponent } from "../../../shared/pagination/pagination";
import { FilterBarComponent } from "../../../shared/filter-bar/filter-bar.component";

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../_core/services/common.service';


interface FilterValues {
  value: string;
  limit: number;
  type: string;
}
@Component({
  selector: 'app-catalogo',
  imports: [NgFor, CardComponent, PaginationComponent, NgIf, FilterBarComponent],
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

  filterBooks: BookFilterParams = new BookFilterParams();
  books: CardModel[] = [];
  constructor(private bookService: BookService, private route: ActivatedRoute, private commonService: CommonService) {
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
   }
   ngOnInit(): void {
    
    this.bookService.currentFilter$
    .pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap(filter => {this.books = []; return this.bookService.getFilterBooks(filter)}) 
    )
    .subscribe(data => {
      console.log(data);
      this.books = data.data;
      this.books.map((book: CardModel, _) => {this.books[_].cardType = "catalog"}); 
      this.commonService.updatePagination({ count:  data.totalRecords});
    });
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



 
}
