import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/classes/supplier';
import { AddSupplierDTO } from 'src/interfaces/isupplier';
import { SupplierService } from '../../../services/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss'],
})
export class CreateSupplierComponent {
  supplierForm: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService
  ) {
    this.supplierForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required],
      ],
      address: ['', [Validators.required,Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.supplierForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form before submitting.';
      return;
    }

    this.isSubmitting = true;
    const formData: AddSupplierDTO = { ...this.supplierForm.value };
    const newSupplier = new Supplier(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.address
    );

    this.supplierService.addSupplier(newSupplier).subscribe({
      next: (response) => {
        console.log('Supplier added successfully:', response);
        this.supplierForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = "";
        this.errorMessage = error.error.message;
        this.isSubmitting = false;
      },
    });
  }
}
