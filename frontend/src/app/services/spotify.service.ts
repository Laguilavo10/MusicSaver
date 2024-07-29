import { Injectable } from '@angular/core'
import { environment } from '@/environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor() {}

  async getSavedTracks(token: string) {
    try {
      const response = await fetch(`${environment.spotifyApiUrl}/me/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (response.ok) {
        return data
      }

      const err = new Error(
        `HTTP error! status: ${response.status} in getUserData.ts. Error message: ${data.error.message}`
      )
      // err.data = {
      //   status: response.status,
      //   message: data.error.message
      // }
    } catch (error) {
      // if ((error)?.data?.status === 401) {
      //   getRefreshToken()
      // }
      throw error
    }
  }

  async getUserData(token: string) {
    try {
      const response = await fetch(`${environment.spotifyApiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()

      if (response.ok) {
        return data
      }

      const err = new Error(
        `HTTP error! status: ${response.status} in getUserData.ts. Error message: ${data.error.message}`
      )
      // err.data = {
      //   status: response.status,
      //   message: data.error.message
      // }
      throw err
    } catch (error) {
      // if((error as ExtendedError)?.data?.status === 401) {
      //   getRefreshToken()
      // }
      console.log(error)
      throw error
    }
  }
}
