import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';

@Component({
  selector: 'app-influencer-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './influencer-page.component.html',
  styleUrl: './influencer-page.component.scss'
})
export class InfluencerPageComponent implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private scrolled: number = 0;
  constructor(private el: ElementRef) {

  }
  ngOnDestroy(): void {
    this.observer.disconnect()
  }

  ngAfterViewInit(): void {
    const parallaxElement = this.el.nativeElement.querySelector('.parallaxsection');
    const threshold = 1
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // parallaxSectionBackground.style.left = `${this.scrolled}svh`
          }
        });
      },
      { threshold }
    );
    this.observer.observe(parallaxElement)
  }

  @HostListener('document:mousewheel', ['$event'])
  scroll(event: WheelEvent) {
    const div = this.el.nativeElement.querySelector('.parallaxsection');
    const parallaxSectionBackground = this.el.nativeElement.querySelector('.parallaxSectionBackground')
    const winScroll = div.scrollTop || div.scrollTop;
    const height = div.scrollHeight - div.clientHeight;
    this.scrolled = Math.floor((winScroll / height) * 100);
    parallaxSectionBackground.style.left = `calc(-7 * ${this.scrolled}svh)`
    if(this.scrolled >= 95){
      console.log('true');
    }
    console.log(this.scrolled);

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
