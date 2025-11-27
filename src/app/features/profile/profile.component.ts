import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { UpperCasePipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userInfo = signal<any>({});
  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router){

  }
  ngOnInit(){
    this.getInfo()
  }

  getInfo(){
    this.profileService.getProfile().subscribe({
      next: (res: any)=>{
        this.userInfo.set(res)
        console.log(res)
      }
    })
  }

  onLogout(){
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
