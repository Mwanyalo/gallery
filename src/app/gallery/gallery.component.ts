import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../_services/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public photos: Array<any> = [];

  constructor(public photoService: PhotoService) {  }

  ngOnInit() {
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data;
      console.log(data);
    });
  }

}
