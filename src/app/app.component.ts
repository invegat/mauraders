/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <nav>
      <a [routerLink]=" ['./home'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        [Home]
      </a>
      <a [routerLink]=" ['./discoveries'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        [Discoveries]
      </a>
      <a [routerLink]=" ['./skeleton'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        [Skeleton Cave]
      </a>   
      <a [routerLink]=" ['./alchemist'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        [Alchemist Shop]
      </a>    
      <a [routerLink]=" ['./witch'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        [Witch Doctor's Hut]
      </a>    
      <a [routerLink]=" ['./calculateMax'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        [Calculate Haven Resources]
      </a>                       
      <a [routerLink]=" ['./about'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        [About]
      </a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      <span>Buccs 3 Brotherhood</span>
    </footer>
  `
})
export class AppComponent implements OnInit {
  public buccsLogo = 'assets/img/buccs3.jpg';
  public name = 'Buccs Marauders';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
