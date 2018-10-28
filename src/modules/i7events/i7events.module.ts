import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventsRoutingModule } from './i7events-routing.module'
import { I7EventCreateComponent } from './i7event-create/i7event-create.component'
import { MatInputModule, MatFormFieldModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatDividerModule,
  MatCardModule, MatListModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material'
import { UtilsModule } from '../utils/utils.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { I7EventDetailsComponent } from './i7event-details/i7event-details.component'
import { LocationComponent } from '../utils/components/location/location.component'
import { I7EventDialogComponent } from './i7event-dialog/i7event-dialog.component'
import { I7EventUsersComponent } from './i7event-users/i7event-users.component'
import { I7EventHeaderComponent } from './i7event-header/i7event-header.component'
import { I7EventPhotosComponent } from './i7event-photos/i7event-photos.component'

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
    MatProgressSpinnerModule
  ],
  declarations: [
    I7EventCreateComponent,
    I7EventDetailsComponent,
    I7EventDialogComponent,
    I7EventUsersComponent,
    I7EventHeaderComponent,
    I7EventPhotosComponent
  ],
  entryComponents: [LocationComponent, I7EventDialogComponent],
  exports: [I7EventHeaderComponent]
})
export class I7EventsModule { }
