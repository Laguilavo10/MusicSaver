import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals'
import type { Track } from '@/app/types/app'
import { computed } from '@angular/core'

type TracksState = {
  tracks: Track[]
}

const initialState: TracksState = {
  tracks: []
}

export const TracksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ tracks }) => ({
    count: computed(() => tracks().length)
  })),
  withMethods((store) => ({
    addTrack: (track: Track) => {
      patchState(store, (state) => ({ tracks: [...state.tracks, track] }))

      const addOptionsToTrack = (trackId: string, data: any) => {
        patchState(store, (state) => {
          const index = state.tracks.findIndex((track) => track.id === trackId)
          if (index === -1) return state
          const newState = [...state.tracks]
          newState[index] = {
            ...newState[index],
            options: {
              isErrored: false,
              isLoading: false,
              urls: data.options
            }
          }
          return { tracks: newState }
        })
      }

      fetch('http://127.0.0.1:8000/search/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ trackId: track.id })
      })
        .then((res) => res.json())
        .then((data) => {
          addOptionsToTrack(track.id, data)
        })
    },
    removeTrack: (trackId: Track['id']) =>
      patchState(store, (state) => ({
        tracks: state.tracks.filter((track) => track.id !== trackId)
      }))
  }))
)
