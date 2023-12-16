import { Component } from '@angular/core';
import { CartService } from '@app/services/cart/cart.service';
import { MenuService } from '@app/services/menu/menu.service';
import { Observable } from 'rxjs';
import { CartItem } from '@app/models/cart';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  cartItems$: Observable<CartItem[]>;
  
  constructor( public cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  removeItemFromCart(menuId: any) {
    this.cartService.removeFromCart(menuId);
  }


}
