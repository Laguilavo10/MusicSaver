import { downloadTracks } from './../../services/download-tracks'
import { Component, inject, signal } from '@angular/core'
import { provideIcons } from '@ng-icons/core'
import { lucideDownload } from '@ng-icons/lucide'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import {
  BrnSheetContentDirective,
  BrnSheetTriggerDirective
} from '@spartan-ng/ui-sheet-brain'
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective
} from '@spartan-ng/ui-sheet-helm'
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm'
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain'
import { TrackItemMenuComponent } from '@components/track-item-menu/track-item-menu.component'
import { HlmScrollAreaComponent } from '@spartan-ng/ui-scrollarea-helm'
import { TracksStore } from '@/app/store/tracks.store'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    HlmIconComponent,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetDescriptionDirective,
    HlmSheetFooterComponent,
    HlmSheetHeaderComponent,
    HlmSheetTitleDirective,
    BrnSheetContentDirective,
    BrnSheetTriggerDirective,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    TrackItemMenuComponent,
    HlmScrollAreaComponent,
    HlmButtonDirective,
    HlmSpinnerComponent
  ],
  providers: [provideIcons({ lucideDownload })],
  template: `
    <hlm-sheet side="left">
      <button
        brnSheetTrigger
        class="relative border-2 border-black bg-gray-200 hover:bg-gray-300 transition-colors duration-150 p-3 h-full rounded-lg flex justify-center items-center"
      >
        <span
          class="border-2 border-black absolute -top-2 -right-2 bg-orange-400 px-2 py-1 text-xs font-bold rounded-full"
          >{{ countTracks() }}</span
        >
        <hlm-icon
          name="lucideDownload"
          class="stroke-white hover:cursor-pointer fill-white size-6"
        />
      </button>
      <hlm-sheet-content
        *brnSheetContent="let ctx"
        class="flex flex-col justify-between max-h-screen h-screen bg-primary"
      >
        <hlm-sheet-header>
          <h3 hlmSheetTitle>To Download</h3>
          <p hlmSheetDescription>Select the tracks you want to download</p>
        </hlm-sheet-header>

        <hlm-scroll-area class="w-full h-full">
          <div class="flex flex-col gap-4 overflow-auto pr-4">
            @for (track of tracks(); track $index) {
            <track-item-menu class="flex flex-col" [track]="track" />
            <brn-separator
              hlmSeparator
              [class]="$index !== countTracks() - 1 && 'hidden'"
            />
            }
          </div>
        </hlm-scroll-area>
        <hlm-sheet-footer>
          <button
            hlmBtn
            [disabled]="isDownloading()"
            class="w-full bg-green-600 py-2 rounded-md hover:bg-green-500 transition-colors duration-100 text-white"
            (click)="downloadTracksFromMenu()"
          >
            @if (isDownloading()) {
            <hlm-spinner class="size-5" />
            }@else { Download }
          </button>
        </hlm-sheet-footer>
      </hlm-sheet-content>
    </hlm-sheet>
  `
})
export class MenuComponent {
  store = inject(TracksStore)
  tracks = this.store.tracks
  countTracks = inject(TracksStore).count
  isDownloading = signal(false)
  async downloadTracksFromMenu() {
    this.isDownloading.set(true)
    await downloadTracks(this.tracks())
    this.isDownloading.set(false)
    this.store.cleanStore()
  }
}
