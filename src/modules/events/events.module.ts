import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventsRoutingModule } from './events-routing.module'
import { EventCreateComponent } from './event-create/event-create.component'
import { MatInputModule, MatFormFieldModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule, MatDividerModule } from '@angular/material'
import { UtilsModule } from '../utils/utils.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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
    ReactiveFormsModule
  ],
  declarations: [EventCreateComponent]
})
export class EventsModule { }
