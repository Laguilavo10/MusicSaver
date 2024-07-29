import { TracksComponent } from '@components/tracks/tracks.component'
import { Component } from '@angular/core';

@Component({
  selector: 'home',
  standalone: true,
  imports: [TracksComponent],
  template: `
    <tracks/>
  `
})
export class HomeComponent {

}
