interface TrackOptions { 
  urls: string[]
  isLoading: boolean
  isErrored: boolean
}
export interface Track {
  id: string
  name: string
  artist: string
  cover: string
  videoId?: string
}