import { Component, effect, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  // signal to hold phone number
  phone = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const phoneFromRoute = params['number'];
      if (phoneFromRoute) {
        this.form
          .get('phoneNumber')
          ?.setValue(phoneFromRoute, { emitEvent: false });
      }
    });
  }

  form = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10,15}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (this.form.valid) {
      const phone = this.form.get('phoneNumber')?.value ?? '';
      const password = this.form.get('password')?.value ?? '';

      const fd = new FormData();
      fd.append('phone', phone);
      fd.append('password', password);

      this.authService.login(fd).subscribe({
        next: (res: any) => {
          console.log(res);
          const userToken = res.access_token;
          this.authService.setToken(userToken); // Set Access Token to local storage
          this.router.navigate(['/home']); // Navigate to Home
        },
      });
    }
  }
}

export interface userLogin {
  phone: string;
  password: string;
}
