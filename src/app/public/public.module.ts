import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { PublicHomeComponent } from './views/public-home/public-home.component';
import { CardComponent } from "../shared/card/card.component";
import { DetailsComponent } from './views/details/details.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from "./views/details/comment.component";
import { LoadingComponent } from "../shared/loading/loading.component";






@NgModule({
  declarations: [PublicComponent, PublicHomeComponent, DetailsComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    RouterOutlet,
    CardComponent,
    CommentComponent,
    LoadingComponent
]

})
export class PublicModule {}
