import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activePanel: 'cart' | 'notif' | null = null;

  togglePanel(panel: 'cart' | 'notif') {
    if (this.activePanel === panel) {
      this.activePanel = null; // close if already open
    } else {
      this.activePanel = panel;
    }
  }
}
