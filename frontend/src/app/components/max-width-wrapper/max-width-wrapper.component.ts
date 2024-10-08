import { Component, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'max-width-wrapper',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  template: `
    <div class="flex flex-col px-4 mx-auto max-w-[2000px] sm:px-6 lg:px-8 py-10 h-full min-h-screen gap-10">
      <ng-content />
    </div>
  `
})
export class MaxWidthWrapperComponent {}
