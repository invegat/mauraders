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
  templateUrl: './witch.component.pug'
})
export class WitchComponent implements OnInit {
  public WitchDoctor = './../assets/img/WitchDoctor.jpg';
  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    console.log('hello `Witch` component');
  }
}
