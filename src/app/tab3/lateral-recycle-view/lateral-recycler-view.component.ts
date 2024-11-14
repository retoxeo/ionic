import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lateral-recycler-view',
  templateUrl: './lateral-recycler-view.component.html',
  styleUrls: ['./lateral-recycler-view.component.scss'],
})
export class LateralRecyclerViewComponent implements OnInit {
  @Input() fotos: string[] = [];
  fotosHttps: string[] = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2.5,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true
  };

  ngOnInit() {
    this.fotosHttps = this.fotos.map(foto => this.cambiarUrlImagen(foto));
  }

  cambiarUrlImagen(url: string): string {
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  }
}