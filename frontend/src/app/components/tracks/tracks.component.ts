import { inject, OnInit, signal, Component } from '@angular/core'
import { TrackCardComponent } from '@components/track-card/track-card.component'
import { SpotifyService } from '@/app/services/spotify.service'

interface Track {
  id: string
  name: string
  artist: string
  cover: string
  options?: string[]
}

interface SavedTracks {
  items: Track[]
  next: string
}

@Component({
  selector: 'tracks',
  standalone: true,
  imports: [TrackCardComponent],
  template: `
    <section class="grid grid-cols-auto-fit gap-12">
      @for (track of tracks(); track $index) {
      <track-card [id]="track.id" [artist]="track.artist" [cover]="track.cover" [trackName]="track.name"/>
      }
    </section>
  `
})
export class TracksComponent implements OnInit {
  tracks = signal<Track[]>([])
  access_token = localStorage.getItem('access_token')
  spotify = inject(SpotifyService)

  async ngOnInit() {
    if (!this.access_token) return
    try {
      const tracksData: SavedTracks = await this.spotify.getSavedTracks(this.access_token)
      const { items } = tracksData
      const data: Track[] = items.map((item: any) => {
        return {
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
          cover: item.track.album.images[0].url
        }
      })
      this.tracks.set(data)
    } catch (error) {
      localStorage.removeItem('access_token')
      this.access_token = null
      console.log(error)
    }
  }
}
