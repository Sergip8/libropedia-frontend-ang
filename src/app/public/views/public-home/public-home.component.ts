import { Component } from '@angular/core';

import { NgFor } from '@angular/common';
import { BookService } from '../../../_core/services/book.service';
import { CardModel } from '../../../shared/card/card-model';
import { PublicRoutes } from '../../public-routing.module';

@Component({
  selector: 'app-public-home',
  standalone: false,
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.css'
})
export class PublicHomeComponent {
  topBooks: CardModel[] = [];
  routes = PublicRoutes

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // Datos de ejemplo - Reemplaza con datos reales de tu backend o servicio
  
    this.getTopBooks()
  }
  calcRating(rating: number): number {
    return Math.round(rating)
  }
  getTopBooks() {
    this.bookService.getTopBooks(8).subscribe({
      next: (data) => {
        this.topBooks = data;
        this.topBooks.map((book: CardModel, _) => {this.topBooks[_].cardType = "top"});
        console.log(this.topBooks);
      },
      error: (error) => {
        console.error('Error fetching top books:', error);
      }
    })
      
    
  }

}
