import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { bookDetail, BookFilterParams, PaginatedData } from '../../models/book';
import { CardModel } from '../../shared/card/card-model';
import { BehaviorSubject } from 'rxjs';

const baseUrl = environment.ANGULAR_APP_API_URL;
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private filterState = new BehaviorSubject<BookFilterParams>(new BookFilterParams());
  currentFilter$ = this.filterState.asObservable(); 

  constructor(private http: HttpClient) { }

  updateFilter(updatedFilter: Partial<BookFilterParams>) {
    const currentFilter = this.filterState.value;
    this.filterState.next({ ...currentFilter, ...updatedFilter });
  }

  resetFilter() {
    this.filterState.next(new BookFilterParams());
  }

  

  getTopBooks(limit: number) {
    return this.http.get<CardModel[]>(baseUrl +"GetBookTopQualifications/" + limit); // Reemplaza con la URL de tu API
  }
  getFilterBooks(params: BookFilterParams){
    return this.http.post<PaginatedData<CardModel>>(baseUrl +"GetAllBooksPaginated", params); // Reemplaza con la URL de tu API
  }
  getBookDetails(id: number){
    return this.http.get<bookDetail>(baseUrl +"GetBookDetail/" + id); // Reemplaza con la URL de tu API
  }
}
