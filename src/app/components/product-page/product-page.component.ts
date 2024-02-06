import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [MatGridListModule,NavbarComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

}
