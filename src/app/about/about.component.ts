import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  styles: [`
  `],
  templateUrl: './about.component.pug'
})
export class AboutComponent implements OnInit {

  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    console.log('hello `About` component');
  }
}
