import {Component, Input} from '@angular/core'


@Component({
  selector: 'app-navigation-list-item',
  templateUrl: 'navigation-list-item.component.html',
  styleUrls: ['./navigation-list-item.component.css'],
})
export class NavigationListItemComponent {
  @Input() icon: string
  @Input() text: string
  @Input() badge: string
}
