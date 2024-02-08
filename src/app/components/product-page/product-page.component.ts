import { Component, ElementRef, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
import { BreadcrumbesComponent } from '../../utils/templates/breadcrumbes/breadcrumbes.component';
import { colour } from '../../utils/types/types';
import { CarousalComponent } from '../../utils/templates/carousal/carousal.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    MatGridListModule,
    NavbarComponent,
    BreadcrumbesComponent,
    CarousalComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {
  public productDetails: any = {
    "Material Composition": "Pure Cotton",
    "Pattern": "Printed",
    "Length": "Standard Length",
    "Material Type": "Cotton Blend",
    "Sleeve Type": "Half Sleeve",
    "Number of items": 1,
    "Country of Origin": "India"
  }
  public productkeys: Array<string> = Object.keys(this.productDetails);
  public colors: Array<colour> = [
    {
      colour: "red"
    }, {
      colour: "green"
    }, {
      colour: "blue"
    }, {
      colour: "black"
    }, {
      colour: "purple"
    },
  ]
  public sizes = [
    { size: 'S', range: '32-34', value1: '27', value2: '16.5' },
    { size: 'M', range: '36-38', value1: '27', value2: '17.0' },
    { size: 'L', range: '40-42', value1: '28', value2: '17.5' },
    { size: 'X', range: '44-46', value1: '28', value2: '18' },
    { size: '2X', range: '48-50', value1: '30', value2: '19.0' },
    { size: 'S', range: '52-54', value1: '30', value2: '19.5' },
    { size: '4X', range: '52-54', value1: '31', value2: '20' }
  ];
  public isChartOpen: boolean = false
  constructor(private el: ElementRef) {

  }

  ngOnInit() {}

  addRating(i: number) {
    const ratingElements = this.el.nativeElement.querySelectorAll('.ratingImg');
    const newImg = '../../../assets/goldStar.svg';
    const deselectedImg = '../../../assets/star.svg';

    const clickedImgSrc = ratingElements[i].getAttribute('src');
    const isClickedSelected = clickedImgSrc === newImg;

    for (let index = 0; index < ratingElements.length; index++) {
      if (index <= i) {
        ratingElements[index].setAttribute('src', newImg);
      } else if (isClickedSelected) {
        ratingElements[index].setAttribute('src', deselectedImg);
      }
    }
  }

  addWishList() {
    const element = this.el.nativeElement.querySelector('.wishlist')
    const isRed = element.getAttribute('fill') === 'red'
    if (!isRed) element.setAttribute('fill', 'red')
    else element.setAttribute('fill', 'none')
  }

}
