import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-influencer-page',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './influencer-page.component.html',
  styleUrl: './influencer-page.component.scss'
})
export class InfluencerPageComponent implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;
  private nextSlide: number = 0;
  public imgArr: Array<string> = ['../../../assets/temp/Slide 1.png', '../../../assets/temp/Slide 2.png', '../../../assets/temp/Slide 3.png', '../../../assets/temp/Slide 4.png', '../../../assets/temp/Slide 5.png', '../../../assets/temp/Slide 6.png']
  public multipleForms!: FormGroup;
  public currentFormIndex: number = 0;
  public formValidities = {
    firstForm: false,
    secondForm: false,
    thirdForm: false,
    fourthForm: false,
    fifthForm: false
  };
  public interval!: any;
  public width: number = 52;
  public pause: boolean = false;
  public count: number = 0

  constructor(
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private renderer: Renderer2) {

  }
  ngOnDestroy(): void {
    this.observer.disconnect();
    clearInterval(this.interval)
  }

  sendMail(data: string) {
    emailjs.send('service_71m6l34', 'template_ihk2aa3', {
      message: data,
      reply_to: "Karan@merchraja.com"
    }, 'Ik4omSySQTFoUSgNV').then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    })
  }

  mouseEnter(element: string, text: string,) {
    const wholeDiv = this.el.nativeElement.querySelector(element);
    const header = this.el.nativeElement.querySelector(`${element} span`);
    const isRotated = wholeDiv.classList.contains('rotated');
    // const line = this.el.nativeElement.querySelector(`${element} #line`)
    
    if (isRotated) {
      wholeDiv.classList.remove('rotated');
      header.classList.remove('rotated');
      const existingDiv = wholeDiv.querySelector('.new-content');
      wholeDiv.style.alignItems = 'flex-start';
      wholeDiv.style.paddingLeft = '15px';
      wholeDiv.style.paddingRight = '0';
      header.style.display = 'block'
      this.renderer.removeChild(wholeDiv, existingDiv); // Remove the element with the class new-content
    } else {
      wholeDiv.classList.add('rotated');
      wholeDiv.style.alignItems = 'flex-end';
      wholeDiv.style.paddingLeft = '0';
      wholeDiv.style.paddingRight = '15px';
      header.style.display = 'none'
      const existingDiv = wholeDiv.querySelector('.new-content');
      if (!existingDiv) {
        // Create a new <div> element
        const newElement = this.renderer.createElement('div');
        this.renderer.addClass(newElement, 'new-content'); // Add a class to the new div
        const newText = this.renderer.createText(text);
        this.renderer.appendChild(newElement, newText);
        newElement.style.marginTop = '15px'
        newElement.style.fontFamily = 'Montserrat'
        this.renderer.appendChild(wholeDiv, newElement);
      }
    }
  }

  ngOnInit() {
    this.multipleForms = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        emailAddress: ['', [Validators.required, Validators.email]]
      }),
      socialLinks: this.formBuilder.group({
        instagram: ['', [Validators.required]],
        facebook: ['', [Validators.required]],
        twitter: ['', [Validators.required]],
        youtube: ['', [Validators.required]],
        linkedin: ['', [Validators.required]]
      }),
      aboutYou: this.formBuilder.group({
        followersCount: ['', [Validators.required]],
        reach: ['', [Validators.required]],
        engagementRate: ['', [Validators.required]],
        niche: ['', [Validators.required]]
      }),
      vision: this.formBuilder.group({
        merchInterest: ['', [Validators.required]],
        collaborationGoals: ['', [Validators.required]]
      }),
      feedback: this.formBuilder.group({
        hearAboutUs: ['', [Validators.required]],
        suggestions: ['', [Validators.required]]
      })
    });

  }
  next() {
    console.log(this.count);
    this.imgArr = this.imgArr.concat(this.imgArr[this.count].trim())
    this.count++;
    const prevButton = this.el.nativeElement.querySelector('.left');
    prevButton.style.display = 'block'
    setTimeout(() => {
      this.pause = true
    }, 30000);
    this.pause = false
    this.changeDetection.detectChanges()
    this.slide(this.count)
  }
  prev() {
    this.count--
    if (this.count === 0) {
      const prevButton = this.el.nativeElement.querySelector('.left');
      prevButton.style.display = 'none'
    }
    this.slide(this.count);
    this.imgArr.pop()
    this.pause = false
    setTimeout(() => {
      this.pause = true
    }, 30000);
  }

  ngAfterViewInit(): void {
    const prevButton = this.el.nativeElement.querySelector('.left');
    prevButton.style.display = 'none'
    switch (true) {
      case window.innerWidth <= 376:
        this.width = 158;
        break;
      case window.innerWidth <= 425:
        this.width = 155;
        break;
      default:
        this.width = 52;
        break;
    }
    this.interval = setInterval(() => {
      if (this.count !== 0) {
        prevButton.style.display = 'block'
      }
      if (this.pause) {
        this.imgArr = this.imgArr.concat(this.imgArr[this.count].trim())
        // this.imgArr.shift()
        this.changeDetection.detectChanges()
        this.count++;
        this.slide(this.count)
      }
    }, 7000)
    // const parallaxElement = this.el.nativeElement.querySelector('.parallaxsection');
    // const threshold = 1
    // this.observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //       }
    //     });
    //   },
    //   { threshold }
    // );
    // this.observer.observe(parallaxElement)
  }

  goBack() {
    const multiForm = this.el.nativeElement.querySelector('.multipleForms')
    this.nextSlide = this.nextSlide + this.width;
    multiForm.style.transform = `translateX(${this.nextSlide}svw)`;
  }
  slide(i: number) {
    const container = this.el.nativeElement.querySelector('.slide')
    container.style.left = `-${i * 100}svw`;
  }


  // @HostListener('document:mousewheel', ['$event'])
  // scroll(event: WheelEvent) {
  //   const div = this.el.nativeElement.querySelector('.parallaxsection');
  //   const parallaxSectionBackground = this.el.nativeElement.querySelector('.parallaxSectionBackground');
  //   const whiteCircleElement = this.el.nativeElement.querySelector('.whiteCircle');
  //   const backdropElement = this.el.nativeElement.querySelector('.backdrop');
  //   const winScroll = div.scrollTop || div.scrollTop;
  //   const height = div.scrollHeight - div.clientHeight;
  //   const newScrolled = Math.floor((winScroll / height) * 100);
  //   parallaxSectionBackground.style.left = `calc(-9 * ${newScrolled}svh)`;
  //   const backdropTarget = newScrolled <= 30 ? 87 - newScrolled * (87 / 30) : 0;
  //   backdropElement.style.top = `${backdropTarget}svh`;
  //   let whiteCircleTarget;
  //   if (newScrolled > 30) {
  //     whiteCircleTarget = newScrolled <= 32 ? 72 - (newScrolled - 30) * (72 / 2) : -13;
  //     const cameraImage = this.el.nativeElement.querySelector('#camera')
  //     const peopleImage = this.el.nativeElement.querySelector('#people')
  //     const chatImage = this.el.nativeElement.querySelector('#chat')
  //     const handImage = this.el.nativeElement.querySelector('#hand')
  //     const taskImage = this.el.nativeElement.querySelector('#task')
  //     const pickingRightImage = this.el.nativeElement.querySelector('#pickingRight')
  //     const papper = this.el.nativeElement.querySelector('#papper')
  //     const handpen = this.el.nativeElement.querySelector('#handpen')
  //     const handpickedpen = this.el.nativeElement.querySelector('#handpickedpen')
  //     const handUp = this.el.nativeElement.querySelector('#handUp')
  //     const book = this.el.nativeElement.querySelector('#book')
  //     const boydrinking = this.el.nativeElement.querySelector('#boydrinking')
  //     const bulb = this.el.nativeElement.querySelector('#bulb')
  //     const downtriangle = this.el.nativeElement.querySelector('#downtriangle')
  //     const girldrinking = this.el.nativeElement.querySelector('#girldrinking')
  //     const heartsmall = this.el.nativeElement.querySelector('#heartsmall')
  //     const megaphone = this.el.nativeElement.querySelector('#megaphone')
  //     const toptriangle = this.el.nativeElement.querySelector('#toptriangle')
  //     const phone = this.el.nativeElement.querySelector('#phone')
  //     const postcard = this.el.nativeElement.querySelector('#postcard')
  //     const rocket = this.el.nativeElement.querySelector('#rocket')
  //     const smile = this.el.nativeElement.querySelector('#smile')
  //     const thunder = this.el.nativeElement.querySelector('#thunder')
  //     const big3rupee = this.el.nativeElement.querySelector('#big3rupee')
  //     const small4rupee = this.el.nativeElement.querySelector('#small4rupee')
  //     const rupee = this.el.nativeElement.querySelector('#rupee')
  //     const zigzagLine = this.el.nativeElement.querySelector('#zigzagLine')
  //     const growth = this.el.nativeElement.querySelector('#growth')
  //     const big4rupee = this.el.nativeElement.querySelector('#big4rupee')
  //     const headerText = this.el.nativeElement.querySelector('.headerText')
  //     const firstText = this.el.nativeElement.querySelector('.firstText')
  //     const secondText = this.el.nativeElement.querySelector('.secondText')
  //     const thirdText = this.el.nativeElement.querySelector('.thirdText')
  //     const fourthText = this.el.nativeElement.querySelector('.fourthText')
  //     const fifthText = this.el.nativeElement.querySelector('.fifthText')
  //     const line = this.el.nativeElement.querySelector('.line')
  //     const divs = this.el.nativeElement.querySelectorAll('.positionerFixer div')
  //     line.style.opacity = '1'
  //     headerText.style.display = 'flex'
  //     if (newScrolled > 40) {
  //       whiteCircleElement.style.transform = `rotate3d(0, 0, 1, 360deg)`;
  //       backdropElement.style.background = '#1C1C1B'
  //       cameraImage.style.opacity = '1'
  //       cameraImage.style.bottom = '180svh';
  //       cameraImage.style.left = '28svw'
  //       if (newScrolled > 42) {
  //         peopleImage.style.opacity = '1'
  //         peopleImage.style.bottom = '152svh';
  //         peopleImage.style.left = '50svh'
  //       }
  //       if (newScrolled > 44) {
  //         chatImage.style.opacity = '1'
  //         chatImage.style.zIndex = '0'
  //         chatImage.style.bottom = '123svh';
  //         chatImage.style.left = '72svh'
  //       }
  //       if (newScrolled > 46) {
  //         handImage.style.opacity = '1'
  //         handImage.style.bottom = '125svh';
  //         handImage.style.left = '136svh'
  //       }
  //       if (newScrolled > 48) {
  //         taskImage.style.opacity = '1'
  //         taskImage.style.left = '140svh'
  //         taskImage.style.bottom = '175svh'
  //         whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 0deg)'
  //       }
  //       if (newScrolled > 50) {
  //         whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 360deg)'
  //         headerText.style.transform = 'translateY(0px)'
  //         firstText.style.transform = 'translate(0px, 0px)'
  //         divs[0].style.background = '#FFFF00'
  //         divs[1].style.background = '#d9d9d9'
  //       }
  //       if (newScrolled > 52) {
  //         headerText.style.transform = 'translateY(-400px)'
  //         firstText.style.display = 'flex'
  //         firstText.style.transform = 'translate(0px, -380px)'
  //         secondText.style.transform = 'translate(0px, 0px)'
  //       } if (newScrolled > 54) {
  //         whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 0deg)'
  //         book.style.bottom = '40svh'
  //         book.style.left = '85svh'
  //         book.style.opacity = 0
  //         handUp.style.bottom = '40svh'
  //         handUp.style.left = '85svh'
  //         handUp.style.opacity = 0
  //         handpen.style.bottom = '40svh'
  //         handpen.style.left = '85svh'
  //         handpen.style.opacity = 0
  //         handpickedpen.style.bottom = '40svh'
  //         handpickedpen.style.left = '85svh'
  //         handpickedpen.style.opacity = 0
  //         papper.style.bottom = '40svh';
  //         papper.style.left = '85svh'
  //         papper.style.opacity = 0
  //         pickingRightImage.style.bottom = '40svh';
  //         pickingRightImage.style.left = '85svh'
  //         pickingRightImage.style.opacity = 0
  //       } if (newScrolled > 55) {
  //         divs[0].style.background = '#d9d9d9'
  //         divs[1].style.background = '#FFFF00'
  //         divs[2].style.background = '#d9d9d9'
  //         cameraImage.style.bottom = '40svh';
  //         cameraImage.style.left = '85svh'
  //         cameraImage.style.opacity = '0'
  //         peopleImage.style.left = '85svh'
  //         peopleImage.style.opacity = '0'
  //         chatImage.style.bottom = '40svh';
  //         chatImage.style.left = '85svh'
  //         chatImage.style.opacity = '0'
  //         handImage.style.bottom = '40svh';
  //         handImage.style.left = '85svh'
  //         handImage.style.opacity = '0'
  //         taskImage.style.left = '85svh'
  //         taskImage.style.opacity = '0'
  //         firstText.style.transform = 'translate(0px, -800px)'
  //         secondText.style.display = 'flex'
  //         secondText.style.transform = 'translate(0px, -635px)'
  //         thirdText.style.transform = 'translate(0px, 0px)'
  //         pickingRightImage.style.bottom = '123svh';
  //         pickingRightImage.style.left = '60svh'
  //         pickingRightImage.style.opacity = 1
  //       }
  //       if (newScrolled > 57) {
  //         papper.style.bottom = '155svh';
  //         papper.style.left = '55svh'
  //         papper.style.opacity = 1
  //       }
  //       if (newScrolled > 59) {
  //         handpickedpen.style.bottom = '185svh'
  //         handpickedpen.style.left = '140svh'
  //         handpickedpen.style.opacity = 1
  //       }
  //       if (newScrolled > 61) {
  //         handpen.style.bottom = '180svh'
  //         handpen.style.left = '60svh'
  //         handpen.style.opacity = 1
  //       }
  //       if (newScrolled > 63) {
  //         handUp.style.bottom = '115svh'
  //         handUp.style.left = '132svh'
  //         handUp.style.opacity = 1
  //       }
  //       if (newScrolled > 65) {
  //         book.style.bottom = '155svh'
  //         book.style.left = '145svh'
  //         book.style.opacity = 1
  //       }
  //       if (newScrolled > 66) {
  //         whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 360deg)'
  //         megaphone.style.bottom = '69svh';
  //         megaphone.style.left = '45svw'
  //         megaphone.style.opacity = '0'
  //         heartsmall.style.left = '90svh'
  //         heartsmall.style.opacity = '0'
  //         toptriangle.style.bottom = '41svh';
  //         toptriangle.style.left = '87svh'
  //         toptriangle.style.opacity = '0'
  //         downtriangle.style.bottom = '47svh';
  //         downtriangle.style.left = '100svh'
  //         downtriangle.style.opacity = '0'
  //         girldrinking.style.left = '97svh'
  //         girldrinking.style.opacity = '0'
  //         bulb.style.left = '97svh'
  //         bulb.style.opacity = '0'
  //         boydrinking.style.left = '97svh'
  //         boydrinking.style.opacity = '0'
  //       }
  //       if (newScrolled > 67) {
  //         divs[1].style.background = '#d9d9d9'
  //         divs[2].style.background = '#FFFF00'
  //         divs[3].style.background = '#d9d9d9'
  //         book.style.bottom = '40svh'
  //         book.style.left = '85svh'
  //         book.style.opacity = 0
  //         handUp.style.bottom = '40svh'
  //         handUp.style.left = '85svh'
  //         handUp.style.opacity = 0
  //         handpen.style.bottom = '40svh'
  //         handpen.style.left = '85svh'
  //         handpen.style.opacity = 0
  //         handpickedpen.style.bottom = '40svh'
  //         handpickedpen.style.left = '85svh'
  //         handpickedpen.style.opacity = 0
  //         papper.style.bottom = '40svh';
  //         papper.style.left = '85svh'
  //         papper.style.opacity = 0
  //         pickingRightImage.style.bottom = '40svh';
  //         pickingRightImage.style.left = '85svh'
  //         pickingRightImage.style.opacity = 0
  //         secondText.style.transform = 'translate(0px, -1055px)'
  //         thirdText.style.display = 'flex'
  //         thirdText.style.transform = 'translate(0px,-915px)'
  //         fourthText.style.transform = 'translate(0px, 0px)'
  //         boydrinking.style.left = '146svh'
  //         boydrinking.style.bottom = '130svh';
  //         boydrinking.style.height = '30svh'
  //         boydrinking.style.opacity = 1
  //       }
  //       if (newScrolled > 69) {
  //         bulb.style.opacity = 1
  //         bulb.style.left = '133svh'
  //         bulb.style.bottom = '185svh';
  //       }
  //       if (newScrolled > 71) {
  //         girldrinking.style.opacity = 1
  //         girldrinking.style.left = '40svh'
  //         girldrinking.style.bottom = '160svh';
  //         girldrinking.style.height = '40svh'
  //       }
  //       if (newScrolled > 73) {
  //         downtriangle.style.opacity = 1
  //         downtriangle.style.left = '92svh'
  //         downtriangle.style.bottom = '124svh';
  //         downtriangle.style.height = '3svh'
  //       }
  //       if (newScrolled > 75) {
  //         toptriangle.style.opacity = 1
  //         toptriangle.style.bottom = '193svh';
  //         toptriangle.style.height = '5svh'
  //       }
  //       if (newScrolled > 77) {
  //         heartsmall.style.opacity = 1
  //         heartsmall.style.left = '146svh'
  //         heartsmall.style.bottom = '170svh';
  //         heartsmall.style.height = '5svh'
  //       }
  //       if (newScrolled > 79) {
  //         megaphone.style.opacity = 1
  //         megaphone.style.left = '64svh'
  //         megaphone.style.bottom = '126svh';
  //       }
  //       if (newScrolled > 81) {
  //         whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 0deg)'
  //         phone.style.left = '97svh'
  //         phone.style.opacity = '0'
  //         postcard.style.left = '97svh'
  //         postcard.style.opacity = '0'
  //         rocket.style.left = '97svh'
  //         rocket.style.opacity = '0'
  //         smile.style.left = '97svh'
  //         smile.style.opacity = '0'
  //         thunder.style.left = '97svh'
  //         thunder.style.opacity = '0'
  //       }
  //       if (newScrolled > 82) {
  //         divs[2].style.background = '#d9d9d9'
  //         divs[3].style.background = '#FFFF00'
  //         divs[4].style.background = '#d9d9d9'
  //         megaphone.style.bottom = '69svh';
  //         megaphone.style.left = '45svw'
  //         megaphone.style.opacity = '0'
  //         heartsmall.style.left = '90svh'
  //         heartsmall.style.opacity = '0'
  //         toptriangle.style.bottom = '41svh';
  //         toptriangle.style.left = '87svh'
  //         toptriangle.style.opacity = '0'
  //         downtriangle.style.bottom = '47svh';
  //         downtriangle.style.left = '100svh'
  //         downtriangle.style.opacity = '0'
  //         girldrinking.style.left = '97svh'
  //         girldrinking.style.opacity = '0'
  //         bulb.style.left = '97svh'
  //         bulb.style.opacity = '0'
  //         boydrinking.style.left = '97svh'
  //         boydrinking.style.opacity = '0'
  //         thirdText.style.transform = 'translate(0px, -1350px)'
  //         fourthText.style.display = 'flex'
  //         fourthText.style.transform = 'translate(0px, -1180px)'
  //         fifthText.style.transform = 'translate(0px, 0px)'
  //         phone.style.opacity = '1'
  //         phone.style.left = '65svh'
  //         phone.style.bottom = '185svh';
  //         postcard.style.opacity = '1'
  //         postcard.style.left = '67svh'
  //         postcard.style.bottom = '130svh';
  //         postcard.style.height = '10svh'
  //         rocket.style.opacity = '1'
  //         rocket.style.left = '50svh'
  //         rocket.style.bottom = '150svh';
  //         rocket.style.height = '25svh'
  //         smile.style.opacity = '1'
  //         smile.style.left = '138svh'
  //         smile.style.bottom = '174svh';
  //         smile.style.height = '25svh'
  //         thunder.style.opacity = '1'
  //         thunder.style.bottom = '140svh';
  //         thunder.style.left = '145svh'
  //         big3rupee.style.opacity = '0'
  //         big3rupee.style.left = '97svh'
  //         small4rupee.style.opacity = '0'
  //         small4rupee.style.left = '97svh'
  //         rupee.style.opacity = '0'
  //         rupee.style.left = '97svh'
  //         zigzagLine.style.opacity = '0'
  //         zigzagLine.style.left = '97svh'
  //         growth.style.opacity = '0'
  //         growth.style.left = '97svh'
  //         big4rupee.style.opacity = '0'
  //         big4rupee.style.left = '97svh'
  //       }
  //       if (newScrolled > 84) {
  //         divs[3].style.background = '#d9d9d9'
  //         divs[4].style.background = '#FFFF00'
  //         phone.style.left = '97svh'
  //         phone.style.opacity = '0'
  //         postcard.style.left = '97svh'
  //         postcard.style.opacity = '0'
  //         rocket.style.left = '97svh'
  //         rocket.style.opacity = '0'
  //         smile.style.left = '97svh'
  //         smile.style.opacity = '0'
  //         thunder.style.left = '97svh'
  //         thunder.style.opacity = '0'
  //         whiteCircleElement.style.transform = 'rotate3d(2, 1, 1, 360deg)'
  //         big3rupee.style.opacity = '1'
  //         big3rupee.style.left = '62svh'
  //         big3rupee.style.bottom = '130svh';
  //         big3rupee.style.height = '17svh'
  //         small4rupee.style.opacity = '1'
  //         small4rupee.style.left = '128svh'
  //         small4rupee.style.bottom = '186svh';
  //         small4rupee.style.height = '13svh'
  //         small4rupee.style.zIndex = 0
  //         rupee.style.opacity = '1'
  //         rupee.style.left = '67svh'
  //         rupee.style.bottom = '180svh';
  //         rupee.style.height = '20svh'
  //         zigzagLine.style.opacity = '1'
  //         zigzagLine.style.left = '40svh'
  //         zigzagLine.style.bottom = '150svh';
  //         growth.style.opacity = '1'
  //         growth.style.left = '120svh'
  //         growth.style.bottom = '144svh';
  //         growth.style.height = '51svh'
  //         growth.style.zIndex = 0
  //         growth.style.transform = 'rotate3d(1, 2, 1, 45deg)'
  //         big4rupee.style.opacity = '1'
  //         big4rupee.style.left = '137svh'
  //         big4rupee.style.bottom = '124svh';
  //         big4rupee.style.height = '25svh'
  //         fourthText.style.transform = 'translate(0px,-1900px)'
  //         fifthText.style.display = 'flex'
  //         fifthText.style.transform = 'translate(0px, -1539px)'
  //       }
  //     } else if (newScrolled < 40) {
  //       divs[0].style.background = '#d9d9d9'
  //       divs[1].style.background = '#d9d9d9'
  //       divs[2].style.background = '#d9d9d9'
  //       divs[3].style.background = '#d9d9d9'
  //       divs[4].style.background = '#d9d9d9'
  //       line.style.opacity = '0'
  //       cameraImage.style.bottom = '69svh';
  //       cameraImage.style.left = '45svw'
  //       cameraImage.style.opacity = '0'
  //       peopleImage.style.left = '90svh'
  //       peopleImage.style.opacity = '0'
  //       chatImage.style.bottom = '41svh';
  //       chatImage.style.left = '87svh'
  //       chatImage.style.opacity = '0'
  //       handImage.style.bottom = '47svh';
  //       handImage.style.left = '100svh'
  //       handImage.style.opacity = '0'
  //       taskImage.style.left = '97svh'
  //       taskImage.style.opacity = '0'
  //       backdropElement.style.background = 'rgba(0, 0, 0, 0.3294117647)'
  //       whiteCircleElement.style.transform = `rotate3d(0, 0, 0, 360deg)`;
  //     }
  //   } else {
  //     whiteCircleTarget = 74; // White circle is at its initial position
  //   }
  //   whiteCircleElement.style.top = `${whiteCircleTarget}svh`;
  // }

  isFormValid(): boolean {
    return this.multipleForms.controls[this.getFormName()].valid;
  }

  getFormName(): string {
    return Object.keys(this.multipleForms.controls)[this.currentFormIndex];
  }

  @HostListener("window:resize", ['$event'])
  changeValue(event: Event) {
    switch (true) {
      case window.innerWidth <= 376:
        this.width = 158;
        break;
      case window.innerWidth <= 425:
        this.width = 155;
        break;
      default:
        this.width = 52;
        break;
    }
  }

  async nextForm(next?: string) {
    const multiForm = this.el.nativeElement.querySelector('.multipleForms')
    if (next) {
      this.sendMail(JSON.stringify(this.multipleForms.value))
      setTimeout(() => {
        this.multipleForms.reset();
        multiForm.style.transform = `translateX(0svw)`;
      }, 3000);
    }
    this.nextSlide = this.nextSlide - this.width;
    multiForm.style.transform = `translateX(${this.nextSlide}svw)`;
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



