import { Component, effect, inject, Input, signal } from '@angular/core'
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective
} from '@spartan-ng/ui-card-helm'
import { BrnTooltipContentDirective } from '@spartan-ng/ui-tooltip-brain'
import {
  HlmTooltipComponent,
  HlmTooltipTriggerDirective
} from '@spartan-ng/ui-tooltip-helm'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { UtilsService } from '@/app/services/utils.service'
import { TracksStore } from '@/app/store/tracks.store'
import { ApiService } from '@/app/services/api.service'

@Component({
  selector: 'track-card',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmTooltipComponent,
    HlmTooltipTriggerDirective,
    BrnTooltipContentDirective,
    HlmIconComponent
  ],
  providers: [],
  template: `
    <hlm-tooltip>
      <article
        hlmTooltipTrigger
        [class]="cn('flex flex-col items-center shadow-xl hover:cursor-pointer h-full rounded-3xl', {
          'border-green-500 border-4 shadow-green-300 shadow-lg' : isSelected(),
          'border-2 border-light-text ' : !isSelected(),
        })"
        (click)="toggleSelected()"
      >
        <header hlmCardHeader>
          <h2 hlmCardTitle class="text-center">{{ trackName }}</h2>
        </header>
        <div hlmCardContent class="flex flex-col gap-2">
          <img
            [src]="cover"
            [alt]="'cover de la canción ' + trackName"
            class="w-full rounded-lg pointer-events-none"
          />
          <p hlmCardDescription class="text-end text-light-text">
            {{ artist }}
          </p>
        </div>
      </article>
      <span
        *brnTooltipContent
        class="flex justify-self-center text-xs border-green-500"
      >
        {{ isSelected() ? 'Added' : 'Add to download' }}
      </span>
    </hlm-tooltip>
  `
})
export class TrackCardComponent {
  @Input({ required: true }) id: string = ''
  @Input({ required: true }) trackName: string = ''
  @Input({ required: true }) cover: string = ''
  @Input({ required: true }) artist: string = ''
  tracksStore = inject(TracksStore)
  apiService = inject(ApiService)
  cn = inject(UtilsService).cn
  isSelected = signal<boolean>(false)

  addTrack() {
    this.tracksStore.addTrack({
      id: this.id,
      name: this.trackName,
      artist: this.artist,
      cover: this.cover
    })
  }

  removeTrack() {
    this.tracksStore.removeTrack(this.id)
  }

  toggleSelected() {
    this.isSelected() ? this.removeTrack() : this.addTrack()
    this.isSelected.set(!this.isSelected())
  }
}
