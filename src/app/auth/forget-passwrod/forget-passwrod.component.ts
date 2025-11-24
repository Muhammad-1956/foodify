import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-passwrod',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './forget-passwrod.component.html',
  styleUrl: './forget-passwrod.component.scss'
})
export class ForgetPasswrodComponent {

  constructor(private router: Router){

  }

    form = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,15}$')])
  });

    onSubmit(){
      if(this.form.valid){
        this.continueToNewPass(this.form.value.phoneNumber? this.form.value.phoneNumber : '')
      }
    }
    continueToNewPass(number: string){
      this.router.navigate(['/auth/new-password'], { queryParams: { number } })
    }
}
