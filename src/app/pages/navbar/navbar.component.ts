import { Component } from '@angular/core';
import { CartItem } from '@app/models/cart';
import { CartService } from '@app/services/cart/cart.service';
import { MenuService } from '@app/services/menu/menu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItems$: Observable<CartItem[]>;


  constructor(private menuService: MenuService, public cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
  }

}
