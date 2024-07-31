import { Component, computed, input } from '@angular/core'
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm'
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain'
import { Track } from '@/app/types/app'

@Component({
  selector: 'track-item-menu',
  standalone: true,
  imports: [HlmSeparatorDirective, BrnSeparatorComponent],
  template: `
    <div class="flex flex-col gap-4">
      <brn-separator hlmSeparator />
      <article class="flex w-full gap-3">
        <img
          [src]="track().cover"
          [alt]="'Cover de la canción ' + track.name"
          class="size-20 aspect-square rounded-md"
        />

        <div class="w-full flex flex-col gap-1">
          <div class="w-full flex justify-between gap-4">
            <div class="flex flex-col">
              <h5 class="text-base  font-semibold ">
                {{ track().name }}
              </h5>
            </div>
          </div>
          <span class="text-sm font-semibold text-gray-500">{{
            track().artist
          }}</span>
          <span class="text-xs text-end">
            From :
            <a [href]="url()" target="_blank" class="underline text-blue-500"
              >Link a descargar</a
            >
          </span>
        </div>
      </article>
    </div>
  `
})
export class TrackItemMenuComponent {
  track = input<Track>({
    id: '',
    cover: '',
    name: '',
    artist: ''
  })

  url = computed(
    () => `https://www.youtube.com/watch?v=${this.track()?.options?.urls?.[0]}`
  )
}
