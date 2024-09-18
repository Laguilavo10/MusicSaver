import { MaxWidthWrapperComponent } from './components/max-width-wrapper/max-width-wrapper.component'
import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SigninComponent } from '@components/signin/signin.component'
import { environment } from '@/environments/environment.development'
import { HeaderComponent } from '@components/header/header.component'
import { TracksComponent } from '@components/tracks/tracks.component'
import { AuthService } from '@/app/services/auth.service'
import { TrackDetailComponent } from '@/app/pages/track-detail/track-detail.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SigninComponent,
    HeaderComponent,
    TracksComponent,
    MaxWidthWrapperComponent,
    TrackDetailComponent
  ],
  template: `
    <main class="flex flex-col gap-10">
      <max-width-wrapper>
        <app-header />
        <router-outlet class='hidden'/>
      </max-width-wrapper>
    </main>
  `
})
export class AppComponent implements OnInit {
  auth = inject(AuthService)
  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search)
    const spotifyCode = urlParams.get('code')

    if (!spotifyCode) return

    try {
      this.auth
        .getAccessToken({
          code: spotifyCode,
          clientId: environment.spotifyClientId,
          redirectUri: environment.redirectUri
        })
        .finally(() => {
          window.location.href = '/'
        })
    } catch (error) {
      alert('error')
    }
  }
}
