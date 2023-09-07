import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {
  newItemName = '';
  newItemPrice: any;
  isAddButtonDisabled = true;
  showError = false;

  constructor(public dialogRef: MatDialogRef<AddItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.newItemName = this.dialogData.name ? this.dialogData.name : '';
    this.newItemPrice = this.dialogData.price ? this.dialogData.price : '';
  }

  ngOnInit() {
    this.validateInput();
  }

  updateItemName(event: any) {
    this.newItemName = event.target.value;
    this.validateInput();
  }

  updatePrice(event: any) {
    this.newItemPrice = event.target.value;
    if (this.newItemPrice == '' || this.newItemPrice == 0 || this.newItemPrice > 1000000) {
      this.showError = true;
    } else {
      this.showError = false;
    }
    this.validateInput();
  }

  validateInput() {
    if (this.newItemName.trim().length && !this.showError) {
      this.isAddButtonDisabled = false;
    } else {
      this.isAddButtonDisabled = true;
    }
  }

  addItem() {
    this.dialogRef.close({
      name: this.newItemName,
      price: this.newItemPrice
    })
  }
}
