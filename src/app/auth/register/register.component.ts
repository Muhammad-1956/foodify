import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService ){

  }

form = new FormGroup({
  name: new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z ]{3,30}$')
  ]),
  phoneNumber: new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10,15}$')
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]),
  confPassword: new FormControl('', [
    Validators.required
  ])
}, { validators: this.passwordMatchValidator });
onSubmit(){
  if(this.form.valid){

    const name= this.form.get('name')?.value ?? '';
    const password= this.form.get('password')?.value ?? '';
    const confPassword= this.form.get('confPassword')?.value ?? '';
    const phoneNumber= this.form.get('phoneNumber')?.value ?? '';

    const fd = new FormData();
      fd.append('full_name', name);
      fd.append('phone', phoneNumber);
      fd.append('password', password);
      fd.append('password_confirmation', confPassword);
  this.authService.register(fd).subscribe({
    next: (res: any)=>{
      console.log(res)
      this.router.navigate(['/auth/otp'], { queryParams: { phoneNumber } })
    }
    ,
  error: (err: any) => {
    let message = 'Something went wrong!';

    if (err.error) {
      // Check if 'message' exists
      if (err.error.message) {
        message = err.error.message;
      }
      // Or check if there are field errors
      else if (err.error.errors) {
        const firstKey = Object.keys(err.error.errors)[0];
        message = err.error.errors[firstKey][0];
      }
    }

    this.toastr.error(message);
  }
  })
  }}


passwordMatchValidator(form: AbstractControl) {
  const password = form.get('password')?.value;
  const confirm = form.get('confPassword')?.value;

  return password === confirm ? null : { mismatch: true };
}
}
// full_name phone password password_confirmation

export interface UserInfo{
  name: string,
  phoneNumber: string,
  password: string,
  confPassword: string
}
