import { TracksComponent } from '@components/tracks/tracks.component'
import { Component } from '@angular/core'

@Component({
  selector: 'home',
  standalone: true,
  imports: [TracksComponent],
  template: `
    @if (access_token) {
    <div class='flex flex-col gap-10'>
      <div class="flex gap-5">
        <div class="size-40 bg-gradient-to-br from-50% from-blue-500 via-blue-300 to-white bg-blue-300 rounded-md p-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
              fill="#ffffff"
            />
          </svg>
        </div>
        <span class='font-extrabold text-7xl flex items-end pb-5'>
          Your Likes
        </span>
      </div>
      <tracks />
    </div>
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
