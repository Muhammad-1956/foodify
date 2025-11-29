import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent implements OnInit {
  counter = signal(60);
  isTimeOut = signal(false);
  isWrong = signal(false);
  destroyRef = inject(DestroyRef);
  number = '';


  constructor(private route: ActivatedRoute,private router: Router, private authService: AuthService) {}
  isForget = undefined
  ngOnInit() {
    const intervalId = setInterval(() => {
      const newValue = this.counter() - 1;
      this.counter.set(newValue);

      if (newValue === 0) {
        clearInterval(intervalId);
        this.isTimeOut.set(true);
      }
    }, 1000);

    // Clear when component is destroyed
    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });


    this.route.queryParams.subscribe((params: any) => {
      this.number = params['phoneNumber'];
    });
    this.route.queryParams.subscribe((params: any) => {
      this.isForget = params['isForget'];
    });
  }

  form = new FormGroup({
    d1: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    d2: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    d3: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    d4: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  });

  allowOnlyNumbers(event: KeyboardEvent) {
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
}

  onSubmit() {
    if(this.form.valid){
      const { d1, d2, d3, d4 } = this.form.value;
      const otp = `${d1 ?? ''}${d2 ?? ''}${d3 ?? ''}${d4 ?? ''}`;
      console.log('OTP:', otp);
      console.log('iam here');
      const number = this.number
      this.authService.verify(otp, number).subscribe({
        next: (res: any)=>{
          console.log(res)
          if(this.isForget){
            this.router.navigate(['/auth/new-password'],{ queryParams: { number } })
          }else{
            this.router.navigate(['/auth/login'],{ queryParams: { number } })
          }
        }
      })
      this.form.reset();
    }
  }

  moveFocus(event: any, nextControlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === input.maxLength) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[formControlName="${nextControlName}"]`
      );
      nextInput?.focus();
    }
  }
  handleBackspace(event: KeyboardEvent, prevControlName: string | null) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && prevControlName) {
        const prevInput = document.querySelector<HTMLInputElement>(
          `input[formControlName="${prevControlName}"]`
        );
        prevInput?.focus();
        // Also clear the previous control
        this.form.get(prevControlName)?.setValue('');
        event.preventDefault();
      }
    }
  }
  onFocus(event: any) {
  const input = event.target as HTMLInputElement;
  if (input.value === '') {
    input.placeholder = '';
  }
}

onBlur(event: any) {
  const input = event.target as HTMLInputElement;
  if (input.value === '') {
    input.placeholder = '-';
  }
}

}
