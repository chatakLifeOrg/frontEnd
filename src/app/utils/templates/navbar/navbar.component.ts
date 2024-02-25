import { Component, ElementRef, OnInit } from '@angular/core';
import { notifications } from '../../types/types';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public notifications: notifications = {
    hearts: '10',
    carts: '1'
  };

  constructor(
    private el: ElementRef,
  ) { }

  async ngOnInit() {
   
  }
}
