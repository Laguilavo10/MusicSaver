import { Component, effect, input, signal } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { lucidePencil, lucideCheck } from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain'
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm'
import { Track } from '@/app/types/app'

@Component({
  selector: 'track-item-menu',
  standalone: true,
  imports: [
    HlmIconComponent,
    HlmInputDirective,
    BrnSeparatorComponent,
    HlmSeparatorDirective
  ],
  providers: [provideIcons({ lucidePencil, lucideCheck })],
  template: `
    <div class="flex flex-col gap-4">
      <brn-separator hlmSeparator />
      <article class="flex w-full gap-3">
        <img
          [src]="track().cover"
          [alt]="'Cover de la canción ' + track().name"
          class="size-20 aspect-square rounded-md"
        />
        <div class="w-full flex flex-col gap-1">
          <div class="w-full flex justify-between gap-4">
            <div class="flex flex-col">
              <h5 class="text-base font-semibold">{{ track().name }}</h5>
            </div>
          </div>
          <span class="text-sm font-semibold text-gray-500">{{
            track().artist
          }}</span>
        </div>
      </article>
      <div class="text-xs text-end flex gap-2 items-center justify-end">
        <span class="flex">From: </span>
        @if(isChangingLink()){
        <div class="flex gap-2 w-full">
          <input
            hlmInput
            [defaultValue]="url()"
            class="py-0 px-2 h-min w-full"
            (change)="handleChangeInput($event)"
          />
          <hlm-icon
            name="lucideCheck"
            class="hover:text-green-500 cursor-pointer size-5"
            (click)="isChangingLink.set(false)"
          ></hlm-icon>
        </div>
        }@else {
        <a [href]="url()" target="_blank" class="underline text-blue-500"
          >Link a descargar</a
        >
        <hlm-icon
          name="lucidePencil"
          class="cursor-pointer size-4"
          (click)="isChangingLink.set(true)"
        ></hlm-icon>

        }
      </div>
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

  isChangingLink = signal(false)
  url = signal('')

  constructor() {
    effect(
      () => {
        if (this.track().videoId) {
          this.url.set(
            `https://www.youtube.com/watch?v=${this.track().videoId}`
          )
        }
      },
      {
        allowSignalWrites: true
      }
    )
  }

  handleChangeInput(event: Event) {
    const input = event.target as HTMLInputElement
    this.url.set(input.value)
  }
}
