import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent {
  @Input() size: 'short' | 'normal' = 'short'
  @Input() coverImage: string
  @Input() line1: string
  @Input() line2: string

  coverStyles = () => ({
    'background-image': `url('${this.coverImage}')`,

    // This will make cover in resolution ratio 1:1 when size is "normal"
    'padding-top': this.size === 'short' ? '0' : '100%',

    // Set fixed height when size id "short"
    height: this.size === 'short' ? '250px' : 'auto',
  })
}
