import {
    Component,
    OnInit,

  } from "@angular/core";

  import { AsyncPipe, NgClass } from "@angular/common";
import {  Router, RouterLink } from "@angular/router";
import { SearchInputComponent } from "../../../shared/searchbar/search-input.component";
import { ProfileMenuItem, UserProfileDropdownComponent } from "../../../shared/profile-dropdown/profile-dropdown.component";
import { AuthService, User } from "../../../_core/services/auth.service";
  
  @Component({
    selector: "app-public-header",
    standalone: true,
    imports: [RouterLink, SearchInputComponent, UserProfileDropdownComponent, AsyncPipe],
    template: `
         <header class="bg-white shadow-md sticky top-0 z-50">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" class="text-2xl font-bold text-indigo-600 hover:text-indigo-800">
          LibroPedia
        </a>
        <div>
          <app-search-input (search)="onSearch($event)" (inputChanged)="onChange($event)"></app-search-input>
        </div>
        <div class="flex gap-4 items-center">
          <div class="space-x-4">
            <a href="#" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
            <a [routerLink]="['catalogo']" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Catálogo</a>
            <a href="#" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Autores</a>
          </div>
          <div class="flex items-center gap-4">
            @if(user){
              <app-user-profile-dropdown (menuItemClicked)="menuItemClick($event)" [userName]="user.username" [userEmail]="user.email"></app-user-profile-dropdown>
              
            }@else {
              
              <a  [routerLink]="['auth/login']" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</a>
              <a  [routerLink]="['auth/register']" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Register</a>
            }

          </div>

        </div>
      </nav>
    </header>
    `,
    styles: [``],
  })
  export class PublicHeaderComponent implements OnInit {


    user!: User | null
onChange(change: string) {
if(change == ""){
    this.router.navigate(['catalogo']);
  }
}


    constructor(private router: Router, public authService: AuthService) {
      this.user = authService.getUser()
      console.log(this.user)
     
    }
onSearch(search: string) {
    if(search.length > 2){
      this.router.navigate(['catalogo'], { queryParams: { search: search },queryParamsHandling: 'merge' });
    }
}

    ngOnInit(): void {
      this.authService.user$.subscribe(u => this.user = u)
  }
  menuItemClick(item: ProfileMenuItem) {
    if(item.label == 'Sign out'){
      this.authService.removeToken()
      this.authService.resetUser()
    }
    if(item.label == 'Mis reseñas'){
      this.router.navigate(["/user/comment"])
    }

    }
}