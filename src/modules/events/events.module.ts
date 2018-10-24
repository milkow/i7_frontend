import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventsRoutingModule } from './events-routing.module'
import { EventCreateComponent } from './event-create/event-create.component'
import { MatInputModule, MatFormFieldModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatDividerModule,
  MatCardModule, MatListModule, MatDialogModule } from '@angular/material'
import { UtilsModule } from '../utils/utils.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EventDetailsComponent } from './event-details/event-details.component'
import { LocationComponent } from '../utils/components/location/location.component'
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { EventUsersComponent } from './event-users/event-users.component';
import { EventHeaderComponent } from './event-header/event-header.component';
import { EventPhotosComponent } from './event-photos/event-photos.component'

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
  ],
  declarations: [EventCreateComponent, EventDetailsComponent, EventDialogComponent, EventUsersComponent, EventHeaderComponent, EventPhotosComponent],
  entryComponents: [LocationComponent, EventDialogComponent],
  exports: [EventHeaderComponent]
})
export class EventsModule { }
