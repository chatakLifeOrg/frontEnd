import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(
    private route: Router
  ) { }

  async ngOnInit() {

  }

  click(check: string) {
    switch (check) {
      case 'ct':
        this.route.navigate(['category'])
        break;
      case 'pd':
        this.route.navigate(['category/product'])
        break;
      default:
        throw new Error("erro");
        break;
    }

  }

}
