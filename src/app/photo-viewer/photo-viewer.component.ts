import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Router, ActivatedRoute } from '@angular/router';
import {saveAs} from 'file-saver';

import { PhotoService } from '../_services/photo.service';

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

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    observer: true
  };

  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

  constructor(public photoService: PhotoService, private router: Router, private route: ActivatedRoute) {
    this.pageNumber = +this.route.snapshot.paramMap.get('id');
    this.index = this.route.snapshot.queryParamMap.get('index');
  }

  ngOnInit() {
    this.photoService.getPhotos(this.pageNumber).subscribe(data => {
      this.slides = data;
    });
  }

  downloadPhoto(image) {
    const imageId = image.id;
    const fileName = image.user.first_name;
    this.photoService.getDownloadPhoto(imageId).subscribe(
      (res) => {
        saveAs(res.url, fileName);
    });
  }
}
