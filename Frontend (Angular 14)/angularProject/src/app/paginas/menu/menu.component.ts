import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  theme: Theme = 'light-theme';
  usuarioLogeado!:String;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.initializeTheme();
    this.usuarioLogeado = this.getLocalStorageByKey("loginNombreUsuario");
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);


  switchTheme() {
    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme'
        ? (this.theme = 'dark-theme')
        : (this.theme = 'light-theme')
    );
  }

  getLocalStorageByKey(Key:string):string{
    return String(localStorage.getItem(Key));
  }

  cerrarSesion():void{
    localStorage.clear();
    window.location.reload();
  }

}
export type Theme = 'light-theme' | 'dark-theme';
