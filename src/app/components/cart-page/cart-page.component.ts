import { Component, OnInit,ElementRef,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../utils/templates/navbar/navbar.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl } from '@angular/forms';
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
    { type: 'Subtotal:', price:'₹700',describe:'GST:', addGst:'₹50', getShipping:'Shipping:',ShippingCharge:'₹50',total: 'Total:', totalPrice:'₹800' },
  ];
  public CategoryItem = [
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
    { imageUrl: '../../../assets/shirt.svg', title: 'Half Cut Sleeve T-shirt', Influncer: 'by Influncer name', price: ' ₹700', originalPrrize: '₹1400', off: '50% Off' },
  ];
  public showPopup: boolean = false;
  getBackgroundColor(index: number): string {
    const colors = ['#ffa0a0', '#F7FF6D', '#5BFF89', '#A8B1FF'];
    return colors[index % colors.length];
  }
  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {

  }
  ngOnInit() {

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

  addWishList() {
    const element = this.el.nativeElement.querySelector('.wishlist')
    const isRed = element.getAttribute('fill') === 'red'
    if (!isRed) element.setAttribute('fill', 'red')
    else element.setAttribute('fill', 'none')
  }
  checkout() {
  console.log('Checkout clicked');
    this.showPopup = true;
    
    this.cdr.detectChanges();
  }

  closePopup() {
    this.showPopup = false;
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
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup(''),
    street: new FormGroup(''),
    pinecode: new FormGroup(''),
    city: new FormGroup(''),
    number: new FormGroup(''),
    email: new FormGroup(''),
  });
}
