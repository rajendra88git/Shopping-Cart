import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  showPlaceholder = false;
  cartItems = [
    {
      name: 'OnePlus Nord CE 3 Lite 5G',
      price: '₹19999'
    },
    {
      name: 'Sony PlayStation',
      price: '₹120200'
    },
    {
      name: 'HP Laptop 15, 13th Gen Intel Core i5-1335U',
      price: '₹64290'
    },
    {
      name: 'boAt Wave Sigma Smartwatch',
      price: '₹1499'
    },
  ];

  constructor(public dialog: MatDialog) { }

  openDialog(item?: any, action?: string): void {
    const dialogRef = this.dialog.open(AddItemFormComponent, {
      data: {
        name: item ? item.name : null,
        price: item ? item.price.slice(1) : null
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action && action === 'edit') {
          item.name = result.name.trim();
          item.price = `₹${result.price.trim()}`;
        } else {
          this.cartItems.push({
            name: result.name.trim(),
            price: `₹${result.price.trim()}`
          });
          this.cartItems.length ? this.showPlaceholder = false : this.showPlaceholder = true;
        }
      }
    });
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.cartItems.length ? this.showPlaceholder = false : this.showPlaceholder = true;
  }
}
