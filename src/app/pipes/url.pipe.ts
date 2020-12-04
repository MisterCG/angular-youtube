import { Pipe, PipeTransform } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {
  
  constructor( private domSanatizer: DomSanitizer) { } 

  transform(url: string): SafeResourceUrl {
    
    let urlYoutube = `https://www.youtube.com/embed/${url}`;

    return this.domSanatizer.bypassSecurityTrustResourceUrl( urlYoutube );

  }

}
