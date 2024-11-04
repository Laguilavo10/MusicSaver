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
import { TrackDetail } from '../models/track-detail.model'

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
      const addOptionsToTrack = (data: TrackDetail) => {
        patchState(store, (state) => {
          track.videoId = data.videoId
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
      })),
    cleanStore: () => patchState(store, () => initialState)
  }))
)
