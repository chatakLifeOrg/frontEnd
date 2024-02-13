import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-homepage-carousal',
  standalone: true,
  imports: [],
  templateUrl: './homepage-carousal.component.html',
  styleUrl: './homepage-carousal.component.scss'
})
export class HomepageCarousalComponent {
  public imgArr: Array<string> = ['../../../../assets/UI_banner_2 1.jpg', '../../../../assets/UI_banner_2 1.jpg',]
  private interval!: any;
  constructor(private el: ElementRef) {

  }
  ngAfterViewInit(): void {
    let count = 0
    this.interval = setInterval(() => {
      this.imgArr = this.imgArr.concat(this.imgArr[count])
      this.imgArr.slice(1)
      count++;
      this.slide(count)
    }, 5000)
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    clearInterval(this.interval)
  }

  slide(i: number) {
    const container = this.el.nativeElement.querySelector('.slide')
    container.style.left = `-${i * 100}svw`;
  }
}
