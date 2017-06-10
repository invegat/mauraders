import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from './../title';
import { XLargeDirective } from './../x-large';

@Component({
  selector: 'alchemist',
  styles: [`
  `],
  templateUrl: './alchemist.component.pug'
})
export class AlchemistComponent implements OnInit {
  public alchemist= './../assets/img/alchemist.jpg';
  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    console.log('hello `Discoveries` component');
  }
}
