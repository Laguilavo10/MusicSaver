import { Observable } from 'rxjs'
import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@/environments/environment.development'
import { TrackDetail } from '@/app/models/track-detail.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  baseUrl = environment.api
  access_token = localStorage.getItem('access_token')

  getTrackData(trackId: string) {
    return this.http.post<TrackDetail>(
      `${this.baseUrl}/search/track`,
      {
        trackId
      },
      {
        headers: {
          Authorization: `Bearer ${this.access_token}`
        }
      }
    )
  }

  searchTrack(trackId: string) {
    return this.http.post<TrackDetail>(
      `${this.baseUrl}/search/track`,
      { trackId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.access_token}`
        }
      }
    )
  }
}
