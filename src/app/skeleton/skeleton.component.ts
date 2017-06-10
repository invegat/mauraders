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
  templateUrl: './skeleton.component.pug'
})
export class SkeletonComponent implements OnInit {
  public skeletonCave = './../assets/img/skeletonCave.jpg';
  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    console.log('hello `Skeleton` component');
  }
}
