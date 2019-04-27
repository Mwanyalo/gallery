import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PhotoService } from '../_services/photo.service';
import { query } from '@angular/core/src/render3';

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
    private sanitizer: DomSanitizer
  ) {
    this.pageNumber = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getPhotos(this.pageNumber).subscribe(data => {
      this.photos = data;
      console.log(data);
    });
  }

  openPhoto(i: any) {
    console.log(i);
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

  downloadPhoto(photo) {
    const id = photo.id;
    this.photoService.getDownloadPhoto(id).subscribe(res => {
      console.log(res);
      // const a = document.createElement('a');
      // a.href = window.URL.createObjectURL(photo);
      // a.download = 'image.jpg';
      // document.body.appendChild(a);
      // a.click();
      // const blob = new Blob([res.url], { type: 'image/png' });
      // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      // console.log(this.fileUrl);
      // const a = document.createElement('a');
      // document.body.appendChild(a);
      // // a.setAttribute('style', 'display: none');
      // a.href = this.fileUrl.changingThisBreaksApplicationSecurity ;
      // a.download = id;
      // a.click();
      // window.URL.revokeObjectURL(this.fileUrl);
      // a.remove(); // remo
    });
  }
}
