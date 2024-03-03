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
    const parallaxSectionBackground = this.el.nativeElement.querySelector('.parallaxSectionBackground');
    const whiteCircleElement = this.el.nativeElement.querySelector('.whiteCircle');
    const backdropElement = this.el.nativeElement.querySelector('.backdrop');
    const winScroll = div.scrollTop || div.scrollTop;
    const height = div.scrollHeight - div.clientHeight;
    const newScrolled = Math.floor((winScroll / height) * 100);

    parallaxSectionBackground.style.left = `calc(-9 * ${newScrolled}svh)`;
    const backdropTarget = newScrolled <= 30 ? 87 - newScrolled * (87 / 30) : 0;
    backdropElement.style.top = `${backdropTarget}svh`;
    let whiteCircleTarget;
    if (newScrolled > 30) {
      whiteCircleTarget = newScrolled <= 32 ? 72 - (newScrolled - 30) * (72 / 2) : -13;
      const cameraImage = this.el.nativeElement.querySelector('#camera')
      const peopleImage = this.el.nativeElement.querySelector('#people')
      const chatImage = this.el.nativeElement.querySelector('#chat')
      const handImage = this.el.nativeElement.querySelector('#hand')
      const taskImage = this.el.nativeElement.querySelector('#task')
      const pickingRightImage = this.el.nativeElement.querySelector('#pickingRight')
      const papper = this.el.nativeElement.querySelector('#papper')
      const handpen = this.el.nativeElement.querySelector('#handpen')
      const handpickedpen = this.el.nativeElement.querySelector('#handpickedpen')
      const handUp = this.el.nativeElement.querySelector('#handUp')
      const book = this.el.nativeElement.querySelector('#book')
      const headerText = this.el.nativeElement.querySelector('.headerText')
      const firstText = this.el.nativeElement.querySelector('.firstText')
      const secondText = this.el.nativeElement.querySelector('.secondText')
      const thirdText = this.el.nativeElement.querySelector('.thirdText')
      const fourthText = this.el.nativeElement.querySelector('.fourthText')
      const fifthText = this.el.nativeElement.querySelector('.fifthText')
      headerText.style.display = 'flex'
      if (newScrolled > 40) {
        whiteCircleElement.style.transform = `rotate3d(0, 0, 1, 360deg)`;
        backdropElement.style.background = '#1C1C1B'
        cameraImage.style.opacity = '1'
        cameraImage.style.bottom = '79svh';
        cameraImage.style.left = '28svw'
        if (newScrolled > 42) {
          peopleImage.style.opacity = '1'
          peopleImage.style.bottom = '52svh';
          peopleImage.style.left = '50svh'
        }
        if (newScrolled > 44) {
          chatImage.style.opacity = '1'
          chatImage.style.zIndex = '0'
          chatImage.style.bottom = '27svh';
          chatImage.style.left = '72svh'
        }
        if (newScrolled > 46) {
          handImage.style.opacity = '1'
          handImage.style.bottom = '28svh';
          handImage.style.left = '136svh'
        }
        if (newScrolled > 48) {
          taskImage.style.opacity = '1'
          taskImage.style.left = '140svh'
          taskImage.style.bottom = '74svh'
          whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 0deg)'
        }
        if (newScrolled > 50) {
          whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 360deg)'
          headerText.style.transform = 'translateY(0px)'
          firstText.style.transform = 'translate(0px, 0px)'
        }
        if (newScrolled > 52) {
          headerText.style.transform = 'translateY(-400px)'
          firstText.style.display = 'flex'
          firstText.style.transform = 'translate(0px, -380px)'
          secondText.style.transform = 'translate(0px, 0px)'
        } if (newScrolled > 54) {
          whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 0deg)'
          book.style.bottom = '40svh'
          book.style.left = '85svh'
          book.style.opacity = 0
          handUp.style.bottom = '40svh'
          handUp.style.left = '85svh'
          handUp.style.opacity = 0
          handpen.style.bottom = '40svh'
          handpen.style.left = '85svh'
          handpen.style.opacity = 0
          handpickedpen.style.bottom = '40svh'
          handpickedpen.style.left = '85svh'
          handpickedpen.style.opacity = 0
          papper.style.bottom = '40svh';
          papper.style.left = '85svh'
          papper.style.opacity = 0
          pickingRightImage.style.bottom = '40svh';
          pickingRightImage.style.left = '85svh'
          pickingRightImage.style.opacity = 0
        } if (newScrolled > 55) {
          cameraImage.style.bottom = '40svh';
          cameraImage.style.left = '85svh'
          cameraImage.style.opacity = '0'
          peopleImage.style.left = '85svh'
          peopleImage.style.opacity = '0'
          chatImage.style.bottom = '40svh';
          chatImage.style.left = '85svh'
          chatImage.style.opacity = '0'
          handImage.style.bottom = '40svh';
          handImage.style.left = '85svh'
          handImage.style.opacity = '0'
          taskImage.style.left = '85svh'
          taskImage.style.opacity = '0'
          firstText.style.transform = 'translate(0px, -800px)'
          secondText.style.display = 'flex'
          secondText.style.transform = 'translate(0px, -635px)'
          thirdText.style.transform = 'translate(0px, 0px)'
          pickingRightImage.style.bottom = '21svh';
          pickingRightImage.style.left = '60svh'
          pickingRightImage.style.opacity = 1
        }
        if (newScrolled > 57) {
          papper.style.bottom = '55svh';
          papper.style.left = '55svh'
          papper.style.opacity = 1
        }
        if (newScrolled > 59) {
          handpickedpen.style.bottom = '85svh'
          handpickedpen.style.left = '140svh'
          handpickedpen.style.opacity = 1
        }
        if (newScrolled > 61) {
          handpen.style.bottom = '80svh'
          handpen.style.left = '60svh'
          handpen.style.opacity = 1
        }
        if (newScrolled > 63) {
          handUp.style.bottom = '15svh'
          handUp.style.left = '132svh'
          handUp.style.opacity = 1
        }
        if (newScrolled > 65) {
          book.style.bottom = '55svh'
          book.style.left = '145svh'
          book.style.opacity = 1
        }
        if (newScrolled > 66) {
          whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 360deg)'
        }
        if (newScrolled > 67) {
          book.style.bottom = '40svh'
          book.style.left = '85svh'
          book.style.opacity = 0
          handUp.style.bottom = '40svh'
          handUp.style.left = '85svh'
          handUp.style.opacity = 0
          handpen.style.bottom = '40svh'
          handpen.style.left = '85svh'
          handpen.style.opacity = 0
          handpickedpen.style.bottom = '40svh'
          handpickedpen.style.left = '85svh'
          handpickedpen.style.opacity = 0
          papper.style.bottom = '40svh';
          papper.style.left = '85svh'
          papper.style.opacity = 0
          pickingRightImage.style.bottom = '40svh';
          pickingRightImage.style.left = '85svh'
          pickingRightImage.style.opacity = 0
          secondText.style.transform = 'translate(0px, -1055px)'
          thirdText.style.display = 'flex'
          thirdText.style.transform = 'translate(0px,-915px)'
          fourthText.style.transform = 'translate(0px, 0px)'
        } if (newScrolled > 77) {
          thirdText.style.transform = 'translate(0px, -1350px)'
          fourthText.style.display = 'flex'
          fourthText.style.transform = 'translate(0px, -1180px)'
          fifthText.style.transform = 'translate(0px, 0px)'
        }
        if (newScrolled > 88) {
          fourthText.style.transform = 'translate(0px,-1900px)'
          fifthText.style.display = 'flex'
          fifthText.style.transform = 'translate(0px, -1539px)'
        }
      } else if (newScrolled < 40) {
        cameraImage.style.bottom = '69svh';
        cameraImage.style.left = '45svw'
        cameraImage.style.opacity = '0'
        peopleImage.style.left = '90svh'
        peopleImage.style.opacity = '0'
        chatImage.style.bottom = '41svh';
        chatImage.style.left = '87svh'
        chatImage.style.opacity = '0'
        handImage.style.bottom = '47svh';
        handImage.style.left = '100svh'
        handImage.style.opacity = '0'
        taskImage.style.left = '97svh'
        taskImage.style.opacity = '0'
        backdropElement.style.background = 'rgba(0, 0, 0, 0.3294117647)'
        whiteCircleElement.style.transform = `rotate3d(0, 0, 0, 360deg)`;
      }
    } else {
      whiteCircleTarget = 74; // White circle is at its initial position
    }
    whiteCircleElement.style.top = `${whiteCircleTarget}svh`;
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
