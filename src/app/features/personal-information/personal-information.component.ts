import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
selector: 'app-personal-information',
standalone: true,
imports: [RouterLink, ReactiveFormsModule, CommonModule],
templateUrl: './personal-information.component.html',
styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent {
userInfo = signal<any>({});
currentYear = new Date().getFullYear();

personalForm = this.fb.group({
fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
email: ['', [Validators.required, Validators.email]],
phone: ['', [Validators.required, Validators.pattern(/^01\d{9}$/)]],
birthDay: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
birthMonth: ['', [Validators.required, Validators.pattern(/^(0?[1-9]|1[0-2])$/)]],
birthYear: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
address: ['', [Validators.required, Validators.minLength(3)]]
});

constructor(private profileService: ProfileService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) {}

ngOnInit() {
this.getInfo();
}

getInfo() {
this.profileService.getProfile().subscribe({
next: (res: any) => {
this.userInfo.set(res);

    // Populate form
    const [day, month, year] = res.birthday?.split('-') || ['', '', ''];
    this.personalForm.setValue({
      fullName: res.name || '',
      email: res.email || '',
      phone: res.phone || '',
      birthDay: day,
      birthMonth: month,
      birthYear: year,
      address: res.address || ''
    });
  }
});


}

updateProfile() {
  if (this.personalForm.invalid) return;

  const formValues = this.personalForm.value;
  const fd = new FormData();

  fd.append('full_name', formValues.fullName || '');
  fd.append('email', formValues.email || '');
  fd.append('phone', formValues.phone || '');
  fd.append('birthday', `${formValues.birthDay || ''}-${formValues.birthMonth || ''}-${formValues.birthYear || ''}`);
  fd.append('address', formValues.address || '');

  this.profileService.updateProfile(fd).subscribe({
    next: (res: any) => {
      this.toastr.success(res.message)
      this.router.navigate(['/profile'])
      console.log('Profile updated:', res);
    }
  });
}

}
