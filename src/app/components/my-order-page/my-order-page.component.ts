import { Component, OnInit, ElementRef, ChangeDetectorRef  } from '@angular/core';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
@Component({
  selector: 'app-my-order-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './my-order-page.component.html',
  styleUrl: './my-order-page.component.scss'
})
export class MyOrderPageComponent implements OnInit {
  ngOnInit() {

  }  

}
