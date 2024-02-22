import { NavbarComponent } from './../../utils/templates/navbar/navbar.component';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../service/dataSharingComponentService/data.service';
import { HomepageCarousalComponent } from '../../utils/templates/homepage-carousal/homepage-carousal.component';
import { CommonModule } from '@angular/common';
import { MobileNavbarComponent } from '../../utils/templates/mobile-navbar/mobile-navbar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    HomepageCarousalComponent,
    CommonModule,
    MobileNavbarComponent
  ],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',

})
export class HomePageComponent implements AfterViewInit {
  public featuredCategories: Array<any> = [
    {
      img: '../../../assets/beauty.svg',
      name: 'Beauty'
    },
    {
      img: '../../../assets/Education.svg',
      name: 'Education'
    },
    {
      img: '../../../assets/business.svg',
      name: 'Business'
    },
    {
      img: '../../../assets/comedy.svg',
      name: 'Comedy'
    },
    {
      img: '../../../assets/Fashion.svg',
      name: 'Fashion'
    },
    {
      img: '../../../assets/Lifestyle.svg',
      name: 'Lifestyle'
    },
    {
      img: '../../../assets/Music.svg',
      name: 'Music'
    },
    {
      img: '../../../assets/gaming.svg',
      name: 'Gaming'
    },
  ]
  private count: number = 0;
  public carousalCard: Array<any> = [
    {
      name: 'anything',
      summary: "asjdqwenqeklqjeljqklejqwlkjeklqjiasucopaiwkeqopeiopwieopklxcjqooqwpeiqwieoopqweioqwiepoqeoqekacnz,xmcn"
    },
    {
      name: 'anything1',
      summary: "asjdqwenqeklqjeljqklejqwlkjeklqjiasucopaiwkeqopeiopwieopklxcjqooqwpeiqwieoopqweioqwiepoqeoqekacnz,xmcn"
    },
    {
      name: 'anything2',
      summary: "asjdqwenqeklqjeljqklejqwlkjeklqjiasucopaiwkeqopeiopwieopklxcjqooqwpeiqwieoopqweioqwiepoqeoqekacnz,xmcn"
    }
  ]
  constructor(private el: ElementRef, private changeDetection: ChangeDetectorRef) {

  }
  ngAfterViewInit(): void {
    const prevButton = this.el.nativeElement.querySelector('.prev');
    prevButton.style.display = 'none'
    const carousalCard = this.el.nativeElement.querySelectorAll('.card')
    carousalCard[1].style.zIndex = '1'
    carousalCard[1].style.transform = 'translateX(0%)'
    carousalCard[0].style.transform = 'translateX(-44%)'
    carousalCard[2].style.transform = 'translateX(44%)'
  }

  nextCard() {
    this.slideCard('next');
  }
  prevCard() {
    this.slideCard('prev');
  }

  slideCard(check: string) {
    const cards = this.el.nativeElement.querySelectorAll('.card');
    const cardWithZIndexOne: any = Array.from(cards).find((card: any) => {
      const zIndex = window.getComputedStyle(card).zIndex;
      return zIndex === '1';
    });
    const totalCards = cards.length;
    const currentIndex = Array.from(cards).indexOf(cardWithZIndexOne);
    const nextIndex = (currentIndex + 1) % totalCards;
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;

    const nextCard = cards[nextIndex];
    const prevCard = cards[prevIndex];

    check === 'next' ? nextCard.style.transform = 'translateX(0%)' : nextCard.style.transform = 'translateX(-44%)'
    check === 'next' ? cardWithZIndexOne.style.transform = 'translateX(-44%)' : prevCard.style.transform = 'translateX(0%)'
    cardWithZIndexOne.style.zIndex = '0';
    check === 'next' ? nextCard.style.zIndex = '1' : prevCard.style.zIndex = '1';
    check === 'next' ? prevCard.style.transform = 'translateX(44%)' : cardWithZIndexOne.style.transform = 'translateX(44%)'
    this.changeDetection.detectChanges();
  }





  next() {
    this.count++
    const prevButton = this.el.nativeElement.querySelector('.prev');
    prevButton.style.display = 'block'
    this.slide(this.count);
    this.featuredCategories.push(this.featuredCategories[this.count]);
  }

  slide(i: number) {
    const container = this.el.nativeElement.querySelector('.featuredCategoryCarousal')
    container.style.left = `-${i * 13.6}svw`
  }

  prev() {
    if (this.count === 0) {
      const prevButton = this.el.nativeElement.querySelector('.prev');
      prevButton.style.display = 'none'
    }
    this.count--
    this.slide(this.count);
    this.featuredCategories.slice(-1)
  }

}
