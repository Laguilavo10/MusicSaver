// import { TrackDetail } from '@/app/models/track-detail.model'
// import { ApiService } from '@/app/services/api.service'
// import { Component, inject, signal, OnInit, effect } from '@angular/core'
// import { ActivatedRoute } from '@angular/router'
// import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm'
// @Component({
//   selector: 'track-detail',
//   standalone: true,
//   imports: [HlmSpinnerComponent],
//   styles: [
//     `
//       :host {
//         display: contents;
//       }
//     `
//   ],
//   template: `
//     <div class="grid grid-cols-[20%_80%] flex-grow h-full relative">
//       <aside class="flex flex-col p-10 bg-green-400 items-center">
//         <div class="sticky top-0 py-10">
//           <a
//             class="relative w-40 block aspect-square overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:rounded-xl  lg:rounded-2xl "
//             href="/"
//             ><img
//               src="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg"
//               alt=""
//               class="object-cover w-full h-full"
//             />
//           </a>
//         </div>
//       </aside>
//       <div class="px-20 w-full flex flex-col">
//         <h1 class="text-2xl font-bold leading-7 text-slate-900 py-10 sm:py-12 ">
//           Options
//         </h1>
//         @if (trackData().options.length === 0){
//           <div class='flex-grow flex justify-center items-center'>
//             <hlm-spinner />
//           </div>
//         }
//         <div>
//           @for(option of trackData().options; track option.id){
//           <article
//             class="py-4 first:border-t border-b border-gray-300 flex justify-between items-center"
//           >
//             <div class=" px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
//               <div class="flex flex-col items-start">
//                 <h2
//                   id="episode-5-title"
//                   class="mt-2 text-lg font-bold text-slate-900"
//                 >
//                   {{ $index + 1 }}: {{ option.title }}
//                 </h2>
//                 <p class="mt-1 text-base leading-7 text-slate-700">
//                   {{ option.author }}
//                 </p>
//               </div>
//             </div>
//             <picture
//               class="aspect-video h-20 rounded-md overflow-hidden relative "
//             >
//               <a
//                 [href]="'https://youtube.com/watch?v=' + option.id"
//                 target="_blank"
//               >
//                 <img
//                   [src]="option.thumbnail"
//                   class="hover:scale-110 transition-transform ease-in-out duration-500"
//                   [alt]="'thumbnail del video de ' + option.title"
//                 />
//               </a>
//             </picture>
//           </article>

//           }
//         </div>
//       </div>
//     </div>
//   `
// })
// export class TrackDetailComponent implements OnInit {
//   router = inject(ActivatedRoute)
//   apiService = inject(ApiService)
//   trackData = signal<TrackDetail>({
//     id: '',
//     title: '',
//     options: []
//   })

//   getData(id: string) {
//     this.apiService.getTrackData(id).subscribe((data) => {
//       this.trackData.set(data)
//     })
//   }

//   constructor() {
//     effect(() => {
//       console.log(this.trackData())
//     })
//   }
//   ngOnInit(): void {
//     const params = this.router.snapshot.queryParams
//     this.getData(params['id'])
//   }
// }
