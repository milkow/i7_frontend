import {Component, Input} from '@angular/core'
import {DropDownOption} from '../../drop-down-option'


@Component({
  selector: 'app-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.css'],
})
export class ModuleHeaderComponent {
  @Input() headerText: string
  @Input() headerIcon: string
  @Input() headerCallback: () => void
  @Input() moreText: string
  @Input() moreIcon: string
  @Input() options: DropDownOption[]
}
