import { ApiService } from '@/app/services/api.service'
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals'
import type { Track } from '@/app/types/app'
import { computed, inject } from '@angular/core'

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
  withMethods((store, apiService = inject(ApiService)) => ({
    addTrack: (track: Track) => {
      const addOptionsToTrack = (data: any) => {
        patchState(store, (state) => {
          track.options = { 
            isErrored: false,
            isLoading: false,
            urls: data.options
          }
          return { tracks: [...state.tracks, track] }
        })
      }
      apiService.searchTrack(track.id).subscribe((data) => {
        addOptionsToTrack(data)
      })
    },
    removeTrack: (trackId: Track['id']) =>
      patchState(store, (state) => ({
        tracks: state.tracks.filter((track) => track.id !== trackId)
      }))
  }))
)
