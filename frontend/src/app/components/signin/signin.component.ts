import { Component, inject } from '@angular/core'
import { HlmButtonDirective } from '@components/ui/ui-button-helm/src'
import { SpotifySvgComponent } from '@components/svgs/spotify-svg.component'
import { environment } from '@/environments/environment.development'
import { AuthService } from '@/app/services/auth.service'

@Component({
  selector: 'signin',
  standalone: true,
  imports: [HlmButtonDirective, SpotifySvgComponent],
  template: `
    <button hlmBtn class="flex gap-2 items-center" (click)="handleAuth()">
      <spotify-svg class='size-5' />
      Sing in with Spotify
    </button>
  `
})
export class SigninComponent {
  auth = inject(AuthService)
  handleAuth = async () => {
    await this.auth.getAuthToken({
      clientId: environment.spotifyClientId,
      redirectUri: environment.redirectUri,
      scope: 'user-read-private user-read-email user-library-read'
    })
  }
}
