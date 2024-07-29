import { Track } from '@/app/types/app'
import { saveAs } from 'file-saver'

export const downloadTracks = async (tracks: Track[]) => {
  const accessToken = localStorage.getItem('access_token') ?? ''
  for (const { name, id } of tracks) {
    try {
      const res = await fetch('http://127.0.0.1:8000/download', {
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
      saveAs(blob, `${name}.mp3`)
    } catch (error) {
      console.log(error)
    }
  }
}
