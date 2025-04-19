import { NgClass, NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Pagination } from "./pagination-model";
import { CommonService } from "../../_core/services/common.service";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { Router } from "@angular/router";




@Component({
    selector: 'app-pagination',
    imports: [NgFor, NgIf],
    template: `
   <nav *ngIf="pageData && pageData.count != 0" aria-label="Pagination">
   <div class="flex justify-center items-center gap-2 my-4">
 
  <button 
    (click)="goToPage(pageData.page - 1)" 
    [disabled]="pageData.page <= 1" 
    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400">
    Anterior
  </button>

  <ng-container *ngFor="let p of pages">
    <button 
    *ngIf="p !== '...'; else dots" 
      (click)="goToPage(p)" 
      [class.bg-blue-500]="p === pageData.page" 
      [class.text-white]="p === pageData.page" 
      [class.bg-gray-200]="p !== pageData.page" 
      [class.text-gray-700]="p !== pageData.page" 
      class="px-4 py-2 rounded hover:bg-blue-400 hover:text-white">
      {{ p }}
    </button>
    <ng-template #dots>
      <span class="px-2 py-2 text-gray-500">...</span>
    </ng-template>
  </ng-container>

  <button 
    (click)="goToPage(pageData.page + 1)" 
    [disabled]="pageData.page >= totalPages" 
    class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400">
    Siguiente
  </button>
</div>
</nav>
    `,
    styles: [`
        
    `]
})
export class PaginationComponent implements OnInit, OnChanges {

    constructor(private commonService: CommonService, private router: Router) { 
        this.pageData = {
            page: 1,
            size: 10,
            count: 0
        }
      
    }
    ngOnInit(): void {
         this.commonService.currentPagination$
          .pipe(
            debounceTime(200), 
            distinctUntilChanged() 
          )
          .subscribe(pd => {
            console.log(pd)
            this.pageData = pd;
            this.updatePagination();
          });
      console.log(this.pageData)
    
    }
    totalPages: number = 0; // Total de páginas
    pages: (number | string)[] = []; // Lista de números de páginas para mostrar

  ngOnChanges(change: SimpleChanges): void {
    console.log("entro change")
    if (change['pageData']) {
      this.pageData = change['pageData'].currentValue;
      console.log(change['pageData'])
      this.updatePagination();
    }
   
  }
  updatePagination(): void {
    this.totalPages = Math.ceil(this.pageData.count / this.pageData.size); // Calcula total de páginas
    this.pages = this.getPages() 
    //this.router.navigate(['catalogo'], { queryParams: { page: this.pageData.page },queryParamsHandling: 'merge' });
  
  }

  goToPage(page: number| string): void {
    if (<number>page >= 1 && <number>page <= this.totalPages) {
      this.pageChange.emit(<number>page); // Emite el cambio
    }
  }
  getPages(): (number | string)[] {
    const maxVisible = 5; // Máximo de páginas visibles
    const pages: (number | string)[] = [];

    if (this.totalPages <= maxVisible) {
      // Si hay pocas páginas, muéstralas todas
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {

      const start = Math.max(2, this.pageData.page - 1); 
      const end = Math.min(this.totalPages - 1, this.pageData.page + 3); 

      pages.push(1);

      if (start > 2) {
        pages.push('...'); 
      }

      for (let i = start; i <= end; i++) {
        pages.push(i); 
      }

      if (end < this.totalPages - 1) {
        pages.push('...'); 
      }

      pages.push(this.totalPages); 
    }

    return pages;
  }
    pageData!: Pagination
    @Output() pageChange = new EventEmitter<number>()
  }