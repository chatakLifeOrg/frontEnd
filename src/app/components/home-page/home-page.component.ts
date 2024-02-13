import { NavbarComponent } from './../../utils/templates/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../service/dataSharingComponentService/data.service';
import { HomepageCarousalComponent } from '../../utils/templates/homepage-carousal/homepage-carousal.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    HomepageCarousalComponent,
  ],
  providers:[DataService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',

})
export class HomePageComponent implements OnInit {
  constructor(){

  }
  ngOnInit(): void {

  }
}
