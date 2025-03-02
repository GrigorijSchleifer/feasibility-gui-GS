import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DisplayData } from 'src/app/model/DataSelection/Profile/DisplayData';

@Pipe({
  name: 'displayTranslation',
  pure: false,
})
export class DisplayTranslationPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(display: DisplayData): string {
    if (!display) {
      return '';
    }
    const currentLang = this.translateService.currentLang;
    return display.translate(currentLang);
  }
}
