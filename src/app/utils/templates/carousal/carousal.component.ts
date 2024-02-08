import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousal',
  standalone: true,
  imports: [CarouselModule,],
  templateUrl: './carousal.component.html',
  styleUrl: './carousal.component.scss'
})
export class CarousalComponent implements AfterViewInit {
  public path = '../../../../assets/shirt.svg'
  public count: number = 0
  constructor(
    private el: ElementRef
  ) { }
  ngAfterViewInit(): void {
    this.slide(this.count)
  }


  next() {
    const slides = this.el.nativeElement.querySelectorAll('.slide')
    if (this.count < slides.length - 1) {
      this.count++;
      this.slide(this.count);
    }
  }

  slide(i: number) {
    const container = this.el.nativeElement.querySelector('.slider-container')
    const slides = this.el.nativeElement.querySelectorAll('.slide')
    const next = this.el.nativeElement.querySelector('.greaterThan')
    const prev = this.el.nativeElement.querySelector('.lowerThan')
    container.style.left = `-${i * 4.5}svw`;
    slides.forEach((element: HTMLElement, index: number) => {
      if (i === index) {
        element.classList.add('active-slide')
      } else {
        element.classList.remove('active-slide');
      }
    });
    console.log(slides);
    if (i === slides.length - 1) {
      next.style.display = "none";
    } else {
      next.style.display = "flex";
    }
    if (i === 0) {
      prev.style.display = "none";
    } else {
      prev.style.display = "flex";
    }
  }

  prevSlide() {
    if (this.count > 0) {
      this.count--;
      this.slide(this.count);
    }
  }

}
