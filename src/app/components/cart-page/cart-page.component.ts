import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    MatGridListModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  public cartItems = [
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', price: ' ₹700', originalPrrize: '₹1400' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', price: ' ₹700', originalPrrize: '₹1400' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', price: ' ₹700', originalPrrize: '₹1400' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', price: ' ₹700', originalPrrize: '₹1400' },
  ];
  public items = [
    { type: 'My Cart', },
    { type: 'Address', },
    { type: 'Payment', },
    { type: 'Confirmation', },
  ];
  public CartBill = [
    { type: 'Subtotal:', price: '₹700', describe: 'GST:', addGst: '₹50', getShipping: 'Shipping:', ShippingCharge: '₹50', total: 'Total:', totalPrice: '₹800' },
  ];
  public CategoryItem = [
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
  ];
  public showPopup: boolean = false;
  public orderSummaryPopup: boolean = false;
  public paymentDirection :boolean = false;
  getBackgroundColor(index: number): string {
    const colors = ['#ffa0a0', '#F7FF6D', '#5BFF89', '#A8B1FF'];
    return colors[index % colors.length];
  }
  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {

  }
  capitalizeFirstLetter(control: FormControl) {
    const value = control.value;
    if (value.length > 0) {
      control.setValue(value.charAt(0).toUpperCase() + value.slice(1));
    }
  }
  ngOnInit() {
    const firstNameControl = this.AddressForm.get('firstName') as FormControl;
    const lastNameControl = this.AddressForm.get('lastName') as FormControl;
    const cityNameControl = this.AddressForm.get('city') as FormControl;
    if (firstNameControl && lastNameControl && cityNameControl) {
      firstNameControl.valueChanges.subscribe((value) => {
        this.capitalizeFirstLetter(firstNameControl);
      });

      lastNameControl.valueChanges.subscribe((value) => {
        this.capitalizeFirstLetter(lastNameControl);
      });
      cityNameControl.valueChanges.subscribe((value) => {
        this.capitalizeFirstLetter(cityNameControl);
      });
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }
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

  addWishList(index?:number) {
    const element = index?this.el.nativeElement.querySelectorAll('.wishlistcard'):this.el.nativeElement.querySelector('.wishlist')
    console.log(index,element);
    const isRed = index?element[index - 1].getAttribute('fill') === 'red':element.getAttribute('fill') === 'red'
    if (!isRed) index?element[index - 1].setAttribute('fill', 'red'):element.setAttribute('fill', 'red') 
    else index?element[index - 1].setAttribute('fill', 'none'):element.setAttribute('fill', 'none')
  }
  checkout() {
    console.log('Checkout clicked');
    this.showPopup = true;
    this.cdr.detectChanges();
  }

  showOrderSummaryPopup() {
    console.log('Showing order summary popup');
    this.showPopup = false;
    this.orderSummaryPopup = true;
    this.cdr.detectChanges(); 
  }
  ContinueToPayment(){
    console.log('payment Direction popup');
    this.showPopup = false;
    this.orderSummaryPopup = false;
    this.paymentDirection = true;
    this.cdr.detectChanges(); 
  }
  closePopup() {
    this.showPopup = false;
    this.orderSummaryPopup = false;
    this.paymentDirection = false;
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + parseFloat(item.price.replace(' ₹', ''));
    }, 0);
  }
  calculateFinalTotal(): number {
    const shippingCharge = parseFloat(this.CartBill[0].ShippingCharge.replace('₹', ''));
    const addGst = parseFloat(this.CartBill[0].addGst.replace('₹', ''));
    const totalPrice = this.calculateTotalPrice();

    return shippingCharge + addGst + totalPrice;
  }

  AddressForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]+$/),

    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    address: new FormControl(
      '', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(200),
      Validators.pattern(/^[a-zA-Z0-9\s\-]*$/),
    ]),
    street: new FormControl('', [
      Validators.minLength(0),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    pinecode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),

    city: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    number: new FormControl('',
      [
        Validators.required,
        Validators.pattern(/^[6-9][0-9]{9}$/),
        Validators.maxLength(10),
      ]),
    email: new FormControl('', [
      Validators.email,
      Validators.minLength(0),
      Validators.maxLength(50)
    ]),
    agreeTerms: new FormControl('', [Validators.requiredTrue]),
  });
  submitForm() {
    if (this.AddressForm.valid) {
      console.log('Form submitted successfully!');
      this.orderSummaryPopup = true;
      this.showOrderSummaryPopup();
    } else {
      console.log('Form is not valid. Please check the fields.');
    }
  }
  

}