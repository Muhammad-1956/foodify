import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  number: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
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
    const password = this.form.get('password')?.value ?? '';
    const confirm = this.form.get('confirmPassword')?.value?? '';
    const otp = '1234'
    const phone  = this.number
    const fd = new FormData()
    fd.append('otp',otp)
    fd.append('phone',phone)
    fd.append('password',password)
    fd.append('password_confirmation',confirm)
    this.authService.resetPassword(fd).subscribe({
      next: (res:any)=>{
        this.router.navigate(['/auth/login'],{ queryParams: { number: this.number } })
      }
    })
  }
}
