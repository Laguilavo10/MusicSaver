import { Track } from '@/app/types/app'
import * as FileSaver from 'file-saver';
import { environment } from '@/environments/environment'

export const downloadTracks = async (tracks: Track[]) => {
  const accessToken = localStorage.getItem('access_token') ?? ''
  console.log(`${environment.api}/download`)
  for (const { name, id } of tracks) {
    try {
      const res = await fetch(`${environment.api}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ tracksId: [id] })
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      console.log(res)

      const blob = await res.blob()
      FileSaver.saveAs(blob, `${name}.mp3`)
    } catch (error) {
      console.log(error)
    }
  }
}
