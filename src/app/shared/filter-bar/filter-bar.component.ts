import { Component, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../_core/services/category.service';
import { AuthorService } from '../../_core/services/AuthorService';
import { SelectData, SelectValues } from '../select/selectModel';
import { SelectCheckComponent } from "../select/select-check";
import { SearchComponent } from "../select/search.component";
import { BookService } from '../../_core/services/book.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-bar',
  imports: [SelectCheckComponent, SearchComponent, NgIf],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent implements OnInit {



  constructor(private categoryService: CategoryService, private authorService: AuthorService, private bookService: BookService, private router: Router) { }


  catSelectData: SelectData = {
    list: [],
    type: 'single',
    search: false,
    showLabel: false,
    default: 'Categoria',
  }
  authorSelectData!: SelectValues[]
  authorId!: number;

  catValue!: number;
  sortSelectData: SelectData = {
    list: [{ id: "anio ASC", value: "Año asc" }, { id: "anio DESC", value: "Año desc" },{ id: "rating ASC", value: "rating asc" }, { id: "rating DESC", value: "rating desc" }],
    type: 'single',
    search: false,
    showLabel: false,
    default: 'Ordenar por',
  }
  ngOnInit(): void {
    this.getCategories()
    this.bookService.currentFilter$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),

      )
      .subscribe(filter => {
        this.catValue = filter.idCategoria;
       

      });
  }


  getCategories() {
    this.categoryService.getCategories({ search: "", limit: 6 }).subscribe({
      next: (response) => {
        this.catSelectData.list = response;
        console.log(response);
      }
    })
  }

  getAuthors(search: string) {
    const params = {
      search: search,
      limit: 6
    }
    this.authorService.getAuthors(params).subscribe({
      next: (response) => {
        this.authorSelectData = response;
        console.log(response);
      }
    })
  }
  searchInput(search: string) {


    this.getAuthors(search);
    console.log(search);
  }
  authorSelected(authorId: number) {

    this.router.navigate(['catalogo'], { queryParams: { author: authorId }, queryParamsHandling: 'merge' });

  }
  catSelected(catId: number) {

    this.router.navigate(['catalogo'], { queryParams: { category: catId }, queryParamsHandling: 'merge' });
  }

  sortSelected(sort: string) {
    this.router.navigate(['catalogo'], { queryParams: { sort: sort }, queryParamsHandling: 'merge' });
  }
}

