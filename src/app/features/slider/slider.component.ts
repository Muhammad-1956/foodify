import { Component, computed, ElementRef, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: ElementRef;

  offers = signal([
    { id: 4, img: './assets/images/offers/offer4.jpg' },
    { id: 7, img: './assets/images/offers/offer7.jpg' },
    { id: 8, img: './assets/images/offers/offer8.jpg' },
    { id: 9, img: './assets/images/offers/offer9.jpg' },
    { id: 10, img: './assets/images/offers/offer10.jpg' },
    { id: 11, img: './assets/images/offers/offer11.jpg' },
    { id: 12, img: './assets/images/offers/offer12.jpg' },
    { id: 13, img: './assets/images/offers/offer13.jpg' },
    { id: 14, img: './assets/images/offers/offer14.jpg' },
    { id: 16, img: './assets/images/offers/offer16.jpg' },
    { id: 17, img: './assets/images/offers/offer17.jpg' },
  ]);

// Get Random Offers
  randomOffers = computed(()=> [...this.offers()]
  .sort(() => Math.random() - 0.5)
  .slice(0, 5))


}
