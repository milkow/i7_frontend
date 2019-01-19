import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventsRoutingModule } from './routing/i7events-routing.module'
import { I7EventCreateComponent } from './components/i7event-create/i7event-create.component'
import { MatInputModule, MatFormFieldModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatDividerModule,
  MatCardModule, MatListModule, MatDialogModule, MatProgressSpinnerModule, MatRadioModule, MatMenuModule } from '@angular/material'
import { UtilsModule } from '../utils/utils.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { I7EventDetailsComponent } from './components/i7event-details/i7event-details.component'
import { I7EventDialogComponent } from './components/i7event-dialog/i7event-dialog.component'
import { I7EventUsersComponent } from './components/i7event-users/i7event-users.component'
import { I7EventHeaderComponent } from './components/i7event-header/i7event-header.component'
import { I7EventPhotosComponent } from './components/i7event-photos/i7event-photos.component'
import { I7eventListComponent } from './components/i7event-list/i7event-list.component'
import { I7eventBarComponent } from './components/i7event-bar/i7event-bar.component'
import { I7EventLocationComponent } from './components/i7-event-location/i7-event-location.component'
import { I7EventSettingsComponent } from './components/i7-event-settings/i7-event-settings.component'
import { EditAttributeComponent } from './components/i7-event-settings//edit-attribute/edit-attribute.component';
import { I7EventDeleteComponent } from './components/i7-event-settings/i7event-delete/i7event-delete.component';
import { I7eventAddPhotoComponent } from './components/i7event-add-photo/i7event-add-photo.component';
import { I7eventPhotoDetailsComponent } from './components/i7event-photo-details/i7event-photo-details.component';
import { ImageDeleteDialogComponent } from './components/image-delete-dialog/image-delete-dialog.component'

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    UtilsModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    UtilsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatMenuModule
  ],
  declarations: [
    I7EventCreateComponent,
    I7EventDetailsComponent,
    I7EventDialogComponent,
    I7EventUsersComponent,
    I7EventHeaderComponent,
    I7EventPhotosComponent,
    I7eventListComponent,
    I7eventBarComponent,
    I7EventLocationComponent,
    I7EventSettingsComponent,
    EditAttributeComponent,
    I7EventDeleteComponent,
    I7eventAddPhotoComponent,
    I7eventPhotoDetailsComponent,
    ImageDeleteDialogComponent
  ],
  entryComponents: [I7EventDialogComponent, I7EventLocationComponent, EditAttributeComponent, I7EventDeleteComponent, ImageDeleteDialogComponent],
  exports: [I7EventHeaderComponent, I7eventListComponent, I7eventBarComponent]
})
export class I7EventsModule { }
