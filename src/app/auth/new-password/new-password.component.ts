import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  number: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      this.number = params['number'];
    })};

  form = new FormGroup({
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]),
  confirmPassword: new FormControl('', [
    Validators.required
  ])
}, { validators: this.passwordMatchValidator });

  passwordMatchValidator(form: AbstractControl) {
  const password = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;
  return password === confirm ? null : { mismatch: true };
}

  onSubmit(){

  }
}
