import { Component, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {

  image= input.required<string>();
  content= input.required<string>();
  path= input.required<string>();

}
