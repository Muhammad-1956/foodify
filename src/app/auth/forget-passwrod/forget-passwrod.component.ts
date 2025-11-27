import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-passwrod',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './forget-passwrod.component.html',
  styleUrl: './forget-passwrod.component.scss'
})
export class ForgetPasswrodComponent {
  constructor(private authService: AuthService,private router: Router){

  }

    form = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')])
  });

    onSubmit(){
      if(this.form.valid){
          const fd = new FormData()
          fd.append('phone',this.form.value.phoneNumber? this.form.value.phoneNumber : '')
          this.authService.forgotPassword(fd).subscribe({
            next: (res:any)=>{
              this.continueToNewPass(this.form.value.phoneNumber? this.form.value.phoneNumber : '')
            }
          })
      }
    }
    continueToNewPass(number: string){
      this.router.navigate(['/auth/otp'], { queryParams: { number, isForget: true } })
    }
}
