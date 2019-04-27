import { Component, OnInit, ViewChild } from '@angular/core';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface, SwiperAutoplayInterface } from 'ngx-swiper-wrapper';
import { PhotoService } from '../_services/photo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit {

  public show = true;
  public slides = [ ];
  public type = 'component';
  public disabled = false;
  public pageNumber: number;
  public index: any;

  // private autoplay: SwiperAutoplayInterface = {
  //   delay: 4000
  // };

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    // autoplay: this.autoplay,
    observer: true
  };

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

  constructor(public photoService: PhotoService, private router: Router, private route: ActivatedRoute) {
    this.pageNumber = +this.route.snapshot.paramMap.get('id');
    this.index = this.route.snapshot.queryParamMap.get('index');
    console.log('index', this.route.snapshot.queryParamMap.get('index'));
  }

  ngOnInit() {
    this.photoService.getPhotos(this.pageNumber).subscribe(data => {
      this.slides = data;
    });
  }

  public onIndexChange(index: number): void {
    // console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    // console.log('Swiper event: ', event);
  }

  downloadPhoto() {

  }

}
