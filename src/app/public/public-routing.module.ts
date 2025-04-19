import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { PublicHomeComponent } from './views/public-home/public-home.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { CatalogoComponent } from './views/catalogo/catalogo.component';
import { DetailsComponent } from './views/details/details.component';
import { ReviewListComponent } from '../shared/comments/user-comment.component';


export enum PublicRoutes {
  Home = '',
  Catalogo = 'catalogo',
  Login = 'auth/login',
  Register = 'auth/register',
  Details = 'details/',
  Comment = 'user/comment',
}


const routes: Routes = [

  {
    path: PublicRoutes.Home,
    title: 'Home',
    component: PublicHomeComponent,
  },
  {
    path: PublicRoutes.Catalogo,
    title: 'Catalog',
    component: CatalogoComponent,
  },
  {
    path: PublicRoutes.Login,
    title: 'login',
    component: LoginComponent
  },
  {
    path: PublicRoutes.Register,
    title: 'register',
    component: RegisterComponent
  },
  {
    path: PublicRoutes.Details+":id",
    title: 'details',
    component: DetailsComponent
  },
  {
    path: PublicRoutes.Comment,
    title: 'comment',
    component: ReviewListComponent
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
