import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { PhotoViewerComponent } from './photo-viewer/photo-viewer.component';

const routes: Routes = [
  { path: 'page/:id/fullview', component: PhotoViewerComponent },
  { path: 'page/:id', component: GalleryComponent },
  {path: '', redirectTo: '/page/1', pathMatch: 'full'},
  { path: '**', redirectTo: '/page/1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
