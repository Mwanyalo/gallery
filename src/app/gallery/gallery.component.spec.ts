import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { from, defer } from 'rxjs';


import { GalleryComponent } from './gallery.component';
import { PhotoService } from '../_services/photo.service';

/*
*  Create async observable that emits-once and completes
*  after a JS engine turn
*/
export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const ptotoServiceStub = {
  getPhotos() {
    return fakeAsyncResponse([{id: 1}]);
  }
};

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let ptotoService: PhotoService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryComponent ],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'page/:id', component: GalleryComponent }]),
      ],
      providers: [PhotoService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    ptotoService = new PhotoService(null);
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loadPhotos() should set photos property with the items returned from API', () => {
    // Arrange - Setup
    const photos = [
      {
        id: 1,
        urls: {thumb: 'https://james.com'},
        user: {first_name: 'James'},
      },
      {
        id: 2,
        urls: {thumb: 'https://mark.com'},
        user: {first_name: 'Mark'},
      }
    ];

    spyOn(ptotoService, 'getPhotos').and.callFake(() => {
      return from([photos]);
    });

    component.ngOnInit();
    expect(component.photos).toEqual(photos);
  });

});
