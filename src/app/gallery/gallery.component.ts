import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PhotoService } from '../_services/photo.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public photos: Array<any> = [];
  fileUrl;
  public pageNumber: number;

  constructor(
    public photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.pageNumber = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getPhotos(this.pageNumber).subscribe(data => {
      this.photos = data;
    });
  }

  openPhoto(i: any) {
    this.router.navigate([`page/${this.pageNumber}/fullview`], {queryParams: {index: i}});
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = (this.pageNumber - 1);
      this.loadPhotos();
      this.router.navigate([`page/${this.pageNumber - 1}`]);
    } else {
        console.log('You are in the first page');
    }
  }

  nextPage() {
    if (this.pageNumber >= 1) {
      this.pageNumber = (this.pageNumber + 1);
      this.loadPhotos();
      this.router.navigate([`page/${this.pageNumber + 1}`]);
    } else {
        console.log('You are in the last page');
    }
  }

}
