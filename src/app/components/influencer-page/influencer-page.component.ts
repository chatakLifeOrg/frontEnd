import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';

@Component({
  selector: 'app-influencer-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './influencer-page.component.html',
  styleUrl: './influencer-page.component.scss'
})
export class InfluencerPageComponent implements AfterViewInit {

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit(): void {
  }


  @HostListener('window:scroll', ['$event'])
  scroll(event: Event) {
    const parallaxElement = this.el.nativeElement.querySelector('.parallaxsection')
    const choseUsElement = this.el.nativeElement.querySelector('.chooseUs')
    const influncerProductDataElement = this.el.nativeElement.querySelector('.influncerProductData')
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 0.1;
    influncerProductDataElement.style.transform = `translateY(${scrolled} svh)`
    console.log(scrolled);


  }

  isInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

}



// // console.log(scrolled);
