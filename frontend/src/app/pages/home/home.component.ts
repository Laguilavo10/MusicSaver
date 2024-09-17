import { TracksComponent } from '@components/tracks/tracks.component'
import { Component } from '@angular/core'

@Component({
  selector: 'home',
  standalone: true,
  imports: [TracksComponent],
  template: `
    @if (access_token) {
    <tracks />
    }@else {
    <main class="flex flex-col gap-20 bg-[#19181f] mb-20">
      <div class="flex flex-col items-center gap-5 ">
        <h1 class="text-6xl text-center font-bold mt-20">
          Unlock Your Favorite Tracks<br />
          with Full Metadata
        </h1>
        <p class="text-center text-lg font-medium text-light-text">
          Download tracks with complete metadata in just a few clicks.<br />
          Quick and effortless music management!
        </p>
      </div>
      <section class="h-full relative md:mx-20">
        <div
          class="bg-black flex h-full w-[90%] rounded-3xl min-h-[600px]"
        ></div>
        <div
          class="bg-light-primary absolute flex flex-col gap-5 top-20 right-0 w-2/6 min-h-[600px] rounded-3xl p-12 justify-center"
        >
          <h2 class="text-4xl font-bold">Favorites</h2>
          <p class="font-medium text-light-text text-lg">
            Easily download all your favorite tracks saved in 'Your Likes' .
            Quick access to your top music with complete metadata!
          </p>
        </div>
      </section>
    </main>

    }
  `
})
export class HomeComponent {
  access_token = localStorage.getItem('access_token')
}
