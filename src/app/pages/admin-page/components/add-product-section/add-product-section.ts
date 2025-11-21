import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormField } from '../../../../common/form-field/form-field';
import { Input } from '../../../../common/input/input';
import { Button } from '../../../../common/button/button';
import { ProductsService } from '../../../../services/products-service';

@Component({
  selector: 'app-add-product-section',
  imports: [ReactiveFormsModule, FormField, Input, Button],
  templateUrl: './add-product-section.html',
  styleUrl: './add-product-section.scss',
})
export class AddProductSection {
  private readonly productsService = inject(ProductsService);

  addProductForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    stockQuantity: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    sku: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    isActive: new FormControl(false, {
      nonNullable: true,
    }),
  });

  readonly inputs = [
    {
      label: 'Name',
      for: 'name',
      type: 'text',
      placeholder: 'Name...',
      name: 'name',
    },
    {
      label: 'Description',
      for: 'description',
      type: 'text',
      placeholder: 'Description...',
      name: 'description',
    },
    {
      label: 'Price',
      for: 'price',
      type: 'text',
      placeholder: 'Price...',
      name: 'price',
    },
    {
      label: 'Stock quantity',
      for: 'stockQuantity',
      type: 'text',
      placeholder: 'Stock quantity...',
      name: 'stockQuantity',
    },
    {
      label: 'Sku',
      for: 'sku',
      type: 'text',
      placeholder: 'Sku...',
      name: 'sku',
    },
  ];

  onSubmit() {
    this.productsService.addProduct(this.addProductForm.getRawValue());
    console.log(this.addProductForm.getRawValue());
  }
}
