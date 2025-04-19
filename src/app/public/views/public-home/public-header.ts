import {
    Component,
    OnInit,

  } from "@angular/core";

  import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import {  Router, RouterLink } from "@angular/router";
import { SearchInputComponent } from "../../../shared/searchbar/search-input.component";
import { ProfileMenuItem, UserProfileDropdownComponent } from "../../../shared/profile-dropdown/profile-dropdown.component";
import { AuthService, User } from "../../../_core/services/auth.service";
import { PublicRoutes } from "../../public-routing.module";
  
  @Component({
    selector: "app-public-header",
    standalone: true,
    imports: [RouterLink, SearchInputComponent, UserProfileDropdownComponent, NgClass, NgIf],
    template: `
      <header class="bg-white shadow-md sticky top-0 z-50">
  <nav class="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
    <!-- Logo -->
    <a href="#" class="text-xl md:text-2xl font-bold text-indigo-600 hover:text-indigo-800">
      LibroPedia
    </a>

    <!-- Mobile Menu Button -->
    <button type="button" class="lg:hidden ml-auto text-gray-600 hover:text-indigo-600 focus:outline-none" 
            (click)="toggleMobileMenu()">
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Search Bar - Full width on mobile, normal width on desktop -->
    <div class="w-full lg:w-1/2 order-3 lg:order-2 mt-4 lg:mt-0 lg:mx-4">
      <app-search-input (search)="onSearch($event)" (inputChanged)="onChange($event)"></app-search-input>
    </div>

    <!-- Navigation and Auth Buttons -->
    <div class="hidden lg:flex items-center gap-4 order-2 lg:order-3">
      <div class="space-x-2 md:space-x-4">
        <a href="#" class="text-gray-600 hover:text-indigo-600 px-2 md:px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
        <a [routerLink]="[routes.Catalogo]" class="text-gray-600 hover:text-indigo-600 px-2 md:px-3 py-2 rounded-md text-sm font-medium">Catálogo</a>
      </div>
      
      <div class="flex items-center gap-2 md:gap-4">
        <ng-container *ngIf="user; else loginButtons">
          <app-user-profile-dropdown (menuItemClicked)="menuItemClick($event)" [userName]="user.username" [userEmail]="user.email"></app-user-profile-dropdown>
        </ng-container>
        <ng-template #loginButtons>
          <a [routerLink]="[routes.Login]" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 md:px-5 py-2 md:py-2.5 me-1 md:me-2 mb-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</a>
          <a [routerLink]="[routes.Register]" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 md:px-5 py-2 md:py-2.5 text-center me-1 md:me-2 mb-0 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Register</a>
        </ng-template>
      </div>
    </div>

    <!-- Mobile Menu (Hidden by default) -->
    <div class="w-full order-4 mt-4 lg:hidden" [ngClass]="{'hidden': !mobileMenuOpen}">
      <div class="flex flex-col space-y-2 pb-3 pt-2">
        <a href="#" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium block">Inicio</a>
        <a [routerLink]="[routes.Catalogo]" class="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium block">Catálogo</a>
        
        <ng-container *ngIf="user; else mobileLoginButtons">
          <!-- Mobile User Profile Link -->
          <div class="px-3 py-2">
            <app-user-profile-dropdown (menuItemClicked)="menuItemClick($event)" [userName]="user.username" [userEmail]="user.email"></app-user-profile-dropdown>
          </div>
        </ng-container>
        <ng-template #mobileLoginButtons>
          <div class="flex flex-col space-y-2 px-3">
            <a [routerLink]="[routes.Login]" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</a>
            <a [routerLink]="[routes.Register]" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Register</a>
          </div>
        </ng-template>
      </div>
    </div>
  </nav>
</header>
    `,
    styles: [``],
  })
  export class PublicHeaderComponent implements OnInit {

    mobileMenuOpen = false;
    routes = PublicRoutes
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
    toggleMobileMenu(): void {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    }
}