import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../../shared/alert/alert.type';
import { Pagination } from '../../shared/pagination/pagination-model';


@Injectable({
  providedIn: 'root'
})
  
export class CommonService {
  constructor() { }

  private alertState = new BehaviorSubject<Alert>(new Alert)
    alertState$ = this.alertState.asObservable()

    updateAlert(value: Alert){
      
        
        this.alertState.next(value)
        setTimeout(() => {
          value.show = false
          this.alertState.next(value)
        }, 4000);
        
    }

    private paginationState = new BehaviorSubject<Pagination>({page: 1, count: 0, size: 10});
    currentPagination$ = this.paginationState.asObservable(); 
  
    updatePagination(updatedFilter: Partial<Pagination>) {
      const currentFilter = this.paginationState.value;
      this.paginationState.next({ ...currentFilter, ...updatedFilter });
    }
  
    resetFilter() {
      this.paginationState.next({page: 1, count: 0, size: 10});
    }

  public prepareRoute(...paths: string[]): string{
    let rootRoute = '/';
    return rootRoute.concat(paths.filter(Boolean).join('/'));
  }
}
