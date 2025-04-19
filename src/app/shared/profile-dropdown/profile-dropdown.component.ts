// user-profile-dropdown.component.ts
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../_core/pipes/safe-html.pipe';
import { RouterLink } from '@angular/router';

// Interface for menu items
export interface ProfileMenuItem {
  label: string;
  icon?: string;
  action?: string;
  divider?: boolean;
  danger?: boolean;
}

@Component({
  selector: 'app-user-profile-dropdown',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, RouterLink],
  template: `
    <div class="relative">
      <!-- Profile Button -->
      <button 
        (click)="toggleDropdown()"
        class="flex items-center space-x-2 focus:outline-none"
        [ngClass]="{'ring-2 ring-blue-500 ring-opacity-50': isOpen}"
        aria-haspopup="true"
        [attr.aria-expanded]="isOpen"
      >
        <div class="flex items-center">
          <!-- Avatar: Show initials if no imageUrl is provided -->
          <div *ngIf="!imageUrl" 
               class="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm"
               [ngClass]="{'ring-2 ring-white': showStatusIndicator}"
          >
            {{ getUserInitials() }}
            <span *ngIf="showStatusIndicator" 
                  class="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                  [ngClass]="{
                    'bg-green-500': userStatus === 'online',
                    'bg-yellow-500': userStatus === 'away',
                    'bg-gray-400': userStatus === 'offline',
                    'bg-red-500': userStatus === 'busy'
                  }"
            ></span>
          </div>
          
          <!-- Avatar with Image -->
          <div *ngIf="imageUrl" 
               class="relative w-10 h-10 rounded-full overflow-hidden"
               [ngClass]="{'ring-2 ring-white': showStatusIndicator}"
          >
            <img [src]="imageUrl" alt="User avatar" class="w-full h-full object-cover">
            <span *ngIf="showStatusIndicator" 
                  class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                  [ngClass]="{
                    'bg-green-500': userStatus === 'online',
                    'bg-yellow-500': userStatus === 'away',
                    'bg-gray-400': userStatus === 'offline',
                    'bg-red-500': userStatus === 'busy'
                  }"
            ></span>
          </div>
        </div>
        
        <!-- User Info (optional) -->
        <div *ngIf="showNameInButton" class="flex flex-col items-start">
          <span class="text-sm font-medium">{{ userName }}</span>
          <span *ngIf="userRole" class="text-xs text-gray-500">{{ userRole }}</span>
        </div>
        
        <!-- Dropdown Arrow -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 text-gray-500 transition-transform duration-200"
          [ngClass]="{'transform rotate-180': isOpen}"
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
      
      <!-- Dropdown Menu -->
      <div *ngIf="isOpen" 
           class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
           role="menu"
           aria-orientation="vertical"
      >
        <!-- Header with User Info -->
        <div *ngIf="showHeaderInDropdown" class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
          <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
        </div>
        
        <!-- Menu Items -->
        <div class="py-1">
          <ng-container *ngFor="let item of menuItems">
            <!-- Regular Item -->
            <a 
              *ngIf="!item.divider" 
              (click)="onMenuItemClick(item)"
              class="flex items-center px-4 py-2 text-sm cursor-pointer"
              [ngClass]="{
                'text-gray-700 hover:bg-gray-100': !item.danger,
                'text-red-600 hover:bg-red-50': item.danger
              }"
              role="menuitem"
            >
              <!-- Icon if provided -->
              <ng-container *ngIf="item.icon">
                <span class="mr-3 h-5 w-5" [innerHTML]="getSvgIcon(item.icon) | safeHtml"></span>
              </ng-container>
              
              {{ item.label }}
            </a>
            
            <!-- Divider -->
            <div *ngIf="item.divider" class="border-t border-gray-100 my-1"></div>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class UserProfileDropdownComponent {
  @Input() userName!: string | null;
  @Input() userRole = '';
  @Input() userEmail = '';
  @Input() imageUrl = '';
  @Input() userStatus: 'online' | 'offline' | 'away' | 'busy' = 'online';
  @Input() showStatusIndicator = true;
  @Input() showNameInButton = true;
  @Input() showHeaderInDropdown = true;
  
  @Input() menuItems: ProfileMenuItem[] = [
  
    { label: 'Mis reseñas', icon: 'activity',},
    {
        divider: true,
        label: ''
    },
    
    { label: 'Sign out', icon: 'logout', danger: true }
  ];
  
  @Output() menuItemClicked = new EventEmitter<ProfileMenuItem>();
  
  isOpen = false;
  
  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    
    // Check if the click was inside the component
    if (!targetElement.closest('app-user-profile-dropdown')) {
      this.isOpen = false;
    }
  }
  
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }
  
  onMenuItemClick(item: ProfileMenuItem): void {
    this.menuItemClicked.emit(item);
    this.isOpen = false;
  }
  
  getUserInitials(): string {
    if (!this.userName) return '?';
    
    const names = this.userName.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }
  
  // Return SVG icon based on name
  getSvgIcon(iconName: string): string {
    const icons: {[key: string]: string} = {
    
                
      activity: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>`,
                
    
            
      logout: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>`
    };
    
    return icons[iconName] || '';
  }
}