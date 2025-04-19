import { Component, Input } from '@angular/core';
import { CardModel } from './card-model';
import { DecimalPipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {  NoImageFoundDirective } from '../../_core/directives/img-fallback.directive';
import { AuthorService } from '../../_core/services/AuthorService';
import { BookService } from '../../_core/services/book.service';
import { fadeInOut, pageTransition } from '../utils/animations';

@Component({
  selector: 'app-card',
  imports: [NgClass, NgFor, NgIf, RouterLink, UpperCasePipe, DecimalPipe, NoImageFoundDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [pageTransition],
})
export class CardComponent {



  @Input() cardData!: CardModel;

  constructor(private router: Router, private bookService: BookService) {}
  
  // Helper method to get the card style class based on type
  getCardClasses(): string {
    const baseClasses = 'rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300';
    
    switch(this.cardData.cardType) {
      case 'top':
        return `${baseClasses} bg-gradient-to-br bg-indigo-50 border border-indigo-200`;
      case 'author':
        return `${baseClasses} bg-white border border-blue-200 author-card`;
      case 'catalog':
        return `${baseClasses} bg-blue-50 border border-blue-100 h-full `;
     
      default:
        return `${baseClasses} bg-white border border-gray-200`;
    }
  }
  
  // Helper method to get button style class based on type
  getButtonClasses(): string {
    const baseClasses = 'inline-block px-4 py-2 text-white rounded-md transition duration-300 text-sm font-medium';
    
    switch(this.cardData.cardType) {
      case 'top':
        return `${baseClasses} bg-blue-600 hover:bg-blue-700`;
      case 'author':
        return `${baseClasses} bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800`;
      case 'catalog':
        return `${baseClasses} bg-blue-500 hover:bg-blue-600`;
     
      default:
        return `${baseClasses} bg-blue-500 hover:bg-blue-600`;
    }
  }
  
  // Helper method to get title text color based on type
  getTitleClasses(): string {
    switch(this.cardData.cardType) {
      case 'top':
        return 'text-xl font-bold text-blue-800 mb-1';
      case 'author':
        return 'text-xl font-semibold text-blue-900 mb-1';
      case 'catalog':
        return 'text-xl font-medium text-blue-700 mb-1';
  
      default:
        return 'text-xl font-semibold text-gray-800 mb-1';
    }
  }
  onClickAuthor(authorId: number) {
    this.router.navigate(['catalogo'], { queryParams: { author: authorId }, queryParamsHandling: 'merge' });
    }
    onClickCat(catId: number) {
      this.router.navigate(['catalogo'], { queryParams: { category: catId }, queryParamsHandling: 'merge' });

    }
}


