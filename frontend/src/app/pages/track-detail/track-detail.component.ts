import { Component } from '@angular/core'

@Component({
  selector: 'track-detail',
  standalone: true,
  imports: [],
  template: `
    <div class="grid grid-cols-[30%_70%]">
      <aside
        class="flex flex-col p-10 bg-green-400 justify-center items-center h-full"
      >
        <a
          class="relative w-40 block aspect-square overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:rounded-xl  lg:rounded-2xl "
          href="/"
          ><img
            src="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg"
            alt=""
            class="object-cover w-full h-full"
          />
        </a>
      </aside>
      <div>sdas</div>
    </div>
  `
})
export class TrackDetailComponent {}
