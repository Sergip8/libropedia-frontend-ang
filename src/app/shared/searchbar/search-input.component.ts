// search-input.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full">
      <div class="relative flex items-center">
  
        <div class="absolute left-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
     
        <input
          type="text"
          [(ngModel)]="searchValue"
          (ngModelChange)="onInputChange()"
          [placeholder]="placeholder"
          class="w-full py-2 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-150 ease-in-out"
          [ngClass]="{
            'border-gray-300 bg-white': !isActive,
            'border-blue-500 bg-white': isActive
          }"
          (focus)="isActive = true"
          (blur)="isActive = false"
        />
        
     
        <button 
          *ngIf="searchValue" 
          (click)="clearSearch()"
          class="absolute right-10 text-gray-400 hover:text-gray-600 focus:outline-none transition duration-150 ease-in-out"
          aria-label="Clear search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
   
        <button 
          (click)="onSearch()"
          class="absolute right-2 text-gray-400 hover:text-blue-500 focus:outline-none transition duration-150 ease-in-out"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
 
      <div *ngIf="showHelperText" class="mt-1 text-sm text-gray-500">
        {{ helperText }}
      </div>
      
  
      <div *ngIf="isLoading" class="mt-2 flex justify-center">
        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      </div>
    </div>
  `
})
export class SearchInputComponent {
  @Input() placeholder = 'Search...';
  @Input() debounceTime = 300;
  @Input() minChars = 0;
  @Input() helperText = 'Start typing to search';
  @Input() showHelperText = false;
  @Input() isLoading = false;
  
  @Output() search = new EventEmitter<string>();
  @Output() inputChanged = new EventEmitter<string>();
  
  searchValue = '';
  isActive = false;
  private debounceTimer: any;
  
  onInputChange() {
    // Clear existing timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // Emit event for immediate reaction if needed
    this.inputChanged.emit(this.searchValue);
    
    // Set debounce timer for search event
    this.debounceTimer = setTimeout(() => {
      if (this.searchValue.length >= this.minChars) {
        this.search.emit(this.searchValue);
      }
    }, this.debounceTime);
  }
  
  onSearch() {
    if (this.searchValue.length >= this.minChars) {
      this.search.emit(this.searchValue);
    }
  }
  
  clearSearch() {
    this.searchValue = '';
    this.inputChanged.emit(this.searchValue);
    this.search.emit(this.searchValue);
  }
}