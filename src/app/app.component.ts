import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicHomeComponent } from "./public/views/public-home/public-home.component";
import { AlertComponent } from './shared/alert/alert.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CommonService } from './_core/services/common.service';
import { PublicHeaderComponent } from './public/views/public-home/public-header';
import { PublicFooterComponent } from "./public/views/public-home/public-footer";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent, NgIf, AsyncPipe, PublicHeaderComponent, PublicFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'storeFrontAng';
  constructor(public commonService: CommonService) { }
}
