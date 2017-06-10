import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from './../title';
import { XLargeDirective } from './../x-large';

@Component({
  selector: 'discoveries',
  styles: [`
  `],
  templateUrl: './discoveries.component.pug'
})
export class DiscoveriesComponent implements OnInit {
  public swordPlay = './../assets/img/swordPlay.jpg';
  public marauderDiscoverBonus = './../assets/img/marauderDiscoverBonus.jpg';
  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    console.log('hello `Discoveries` component');
  }
}
