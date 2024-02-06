import { Component, ElementRef, OnInit } from '@angular/core';
import { notifications } from '../../types/types';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public notifications: notifications = {
    hearts: '10',
    carts: '1'
  };

  constructor(
    private el: ElementRef,
  ) { }

  async ngOnInit() {
    await Promise.all([
      this.setCounterAttribute('.heartsWrapper', this.notifications.hearts),
      this.setCounterAttribute('.cartsWrapper', this.notifications.carts)
    ])
  }

  private async setCounterAttribute(selector: string, value: string): Promise<void> {
    const elements = this.el.nativeElement.querySelector(selector);
    const attribute = Object.keys(this.notifications).find((key) => this.notifications[key as keyof notifications] === value);
    elements.setAttribute(attribute as string, value)
  }
}
