import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileDropdownComponent } from './profile-dropdown.component';

describe('UserProfileDropdownComponent', () => {
  let component: UserProfileDropdownComponent;
  let fixture: ComponentFixture<UserProfileDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserProfileDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
