import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})

export class IconService {
  modulePath="./assets/cryptocurrency-icons/svg/color/";

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  public registerIcons(): void {
    this.loadIcons(Object.values(["BTC"]), this.modulePath);
  }

  private loadIcons(iconKeys, iconUrl: string): void {
    iconKeys.forEach(key => {
     var  path=`${iconUrl}/btc.svg`;
      this.matIconRegistry.addSvgIcon('btc', this.domSanitizer.bypassSecurityTrustResourceUrl(path));
    });
  }
}