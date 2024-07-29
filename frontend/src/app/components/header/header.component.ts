import { SigninComponent } from '@components/signin/signin.component'
import { Component, OnInit, signal, ChangeDetectionStrategy, inject } from '@angular/core'
import {
  HlmAvatarComponent,
  HlmAvatarImageDirective,
  HlmAvatarFallbackDirective
} from '@spartan-ng/ui-avatar-helm'
import { provideIcons } from '@ng-icons/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { lucideChevronDown, lucideMenu } from '@ng-icons/lucide';
import { MenuComponent } from '@components/menu/menu.component';
import { SpotifyService } from '@/app/services/spotify.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SigninComponent,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
    MenuComponent
  ],
  providers: [provideIcons({ lucideChevronDown, lucideMenu })],
  template: `
    <header class="w-full flex items-center flex-row-reverse gap-5">
      @if(!access_token) {
      <signin />
      }@else {
        <div
        class="bg-primary flex items-center gap-2 justify-end text-white w-fit p-2 rounded-lg"
        >
        <hlm-avatar>
          <img [src]="user().picture" alt="" hlmAvatarImage />
          <span class="text-white bg-gray-500" hlmAvatarFallback>RG</span>
        </hlm-avatar>
        <span>{{ user().name ? user().name : 'Usuario 1' }}</span>
        <hlm-icon  name="lucideChevronDown" class="stroke-white hover:cursor-pointer fill-white"/>
      </div>
      <app-menu />
      }
    </header>
  `
})
export class HeaderComponent implements OnInit {
  access_token = localStorage.getItem('access_token')
  user = signal({ name: '', picture: '' })
  spotify = inject(SpotifyService)
  
  async ngOnInit() {
    if (!this.access_token) return
    try {
      const userData = await this.spotify.getUserData(this.access_token)
      const { display_name, images } = userData
      this.user.set({
        name: display_name,
        picture: images[0].url
      })
    } catch (error) {
      localStorage.removeItem('access_token')
      this.access_token = null
      console.log(error)
    }
  }
}
