import { Injectable } from '@angular/core';
import { CartItem } from '@app/models/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService { 
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    // Recuperar el carrito del localStorage al inicializar el servicio
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find((i) => i.id_menu === item.id_menu);

    if (existingItem) {
      existingItem.cantidad += item.cantidad;
    } else {
      this.cartItems.push(item);
    }

    this.cartSubject.next([...this.cartItems]);
    this.updateCart();
  }

  removeFromCart(menuId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id_menu !== menuId);
    this.cartSubject.next([...this.cartItems]);
    this.updateCart();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + (item.subtotal * item.cantidad), 0);
  }

  private updateCart() {
    // Actualizar localStorage cada vez que cambia el carrito
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}