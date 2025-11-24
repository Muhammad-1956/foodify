import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-auth-init',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './auth-init.component.html',
  styleUrl: './auth-init.component.scss'
})
export class AuthInitComponent {

}
