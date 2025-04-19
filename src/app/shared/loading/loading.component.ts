import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pageTurn } from '../utils/animations';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  animations: [pageTurn],
  template: `
    <div class="flex flex-col items-center justify-center h-full">
      <!-- Book loading animation -->
      <div class="relative w-24 h-32">
        <!-- Book cover -->
        <div class="absolute w-full h-full bg-blue-600 rounded-r-md rounded-l-sm shadow-lg transform animate-pulse">
          <!-- Book spine decoration -->
          <div class="absolute left-0 top-2 bottom-2 w-1.5 bg-gold-500 bg-gradient-to-b from-yellow-300 to-yellow-400"></div>
          
          <!-- Book title lines -->
          <div class="absolute left-4 right-3 top-4 h-1 bg-white opacity-70 rounded"></div>
          <div class="absolute left-4 right-5 top-8 h-1 bg-white opacity-70 rounded"></div>
          <div class="absolute left-4 right-7 top-12 h-1 bg-white opacity-70 rounded"></div>
        </div>
        
        <!-- Opening/closing page animation -->
        <div class="absolute top-0 right-0 w-1/2 h-full bg-white rounded-r-md shadow-md origin-left " [@pageTurn]>
          <!-- Page content lines -->
          <div class="absolute left-2 right-2 top-4 h-0.5 bg-gray-300 rounded"></div>
          <div class="absolute left-2 right-4 top-7 h-0.5 bg-gray-300 rounded"></div>
          <div class="absolute left-2 right-3 top-10 h-0.5 bg-gray-300 rounded"></div>
          <div class="absolute left-2 right-6 top-13 h-0.5 bg-gray-300 rounded"></div>
          <div class="absolute left-2 right-5 top-16 h-0.5 bg-gray-300 rounded"></div>
          <div class="absolute left-2 right-3 top-19 h-0.5 bg-gray-300 rounded"></div>
        </div>
      </div>
      
      <!-- Loading text -->
      <div class="mt-6 text-gray-700 font-medium">Loading</div>
      <div class="flex space-x-1 mt-2">
        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
        <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
      </div>
    </div>
  `,
  styles: [`
   
  `]
})
export class LoadingComponent {}