import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I7Event } from '../../../../shared/models/i7event';
import { I7EventService } from '../../../../services/i7event.service'
import { MatDialog } from '@angular/material'
import { EditAttributeComponent } from './edit-attribute/edit-attribute.component'
import { I7EventDeleteComponent } from './i7event-delete/i7event-delete.component';

@Component({
  selector: 'app-i7-event-settings',
  templateUrl: './i7-event-settings.component.html',
  styleUrls: ['./i7-event-settings.component.scss']
})
export class I7EventSettingsComponent implements OnInit {
  i7event: I7Event

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private i7eventService: I7EventService,
    private dialog: MatDialog,
    private eventService: I7EventService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.i7eventService.get(params['id']).subscribe(ev => this.i7event = ev)
    })
  }

  editTitle() {
    const dialogRef = this.dialog.open(EditAttributeComponent, {
      width: '80%',
      maxWidth: '400px',
      height: '30vh',
      minHeight: '250px',
      maxHeight: '300px',
      data: { attribute: this.i7event.title, attributeName: 'title'}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.eventService.updatePartial(this.i7event.id, {title: result}).subscribe(data => console.log(data))
    })
  }

  editDescription() {
    const dialogRef = this.dialog.open(EditAttributeComponent, {
      width: '80%',
      maxWidth: '400px',
      height: '30vh',
      minHeight: '250px',
      maxHeight: '300px',
      data: { attribute: this.i7event.description, attributeName: 'description'}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.eventService.updatePartial(this.i7event.id, {description: result}).subscribe(data => console.log(data))
    })
  }

  goToManageUsers() {
    this.router.navigate([`/events/${this.i7event.id}/users`])
  }


  deleteEvent() {
    const dialogRef = this.dialog.open(I7EventDeleteComponent, {
      width: '80%',
      maxWidth: '400px',
      height: '30vh',
      minHeight: '250px',
      maxHeight: '300px',
    })

    dialogRef.afterClosed().subscribe(result => {
      this.eventService.delete(this.i7event.id).subscribe(() => {
        this.router.navigate(['/dashboard'])
      })
    })
  }

}