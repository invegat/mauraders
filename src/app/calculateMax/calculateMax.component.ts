import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule, FormControl, FormBuilder, FormsModule,
  FormGroup, Validators
} from '@angular/forms';
// import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { maxValueValidator } from './maxValueValidator';
import { INumberHash } from '../../utils/iDictionary';

@Component({
  selector: 'calculateMax',
  styleUrls: ['../../styles/styles.styl'],
  templateUrl: './calculateMax.component.html'
})
export class CalculateMaxComponent implements OnInit {
  public formModel: FormGroup;
  public submitted = false;
  public active = false;
  public scoutIcon: string;
  public useRum = 'Use Rum as most accurate Scout';
  public useGl = 'Use maximum of Gold and Lumber as most accurate Scout';
  public goodScout: string = this.useRum;
  public pregex = new RegExp('^\\d{1,7}$');
  public mregex = new RegExp('^\\d{1,6}$');
  public pValidators = [Validators.required, Validators.pattern(this.pregex),
  Validators.minLength(1), Validators.maxLength(7), maxValueValidator(1500000)];
  public mValidators = [Validators.required, Validators.pattern(this.mregex),
  Validators.minLength(1), Validators.maxLength(6), maxValueValidator(100000)];

  public formErrors = {
    sgold: '',
    slumber: '',
    srum: '',
    gold: '',
    lumber: '',
    rum: '',
    maxRaidTotal: ''
  };
  public validationMessages = {
    resource: {
      required: 'Is required.',
      minlength: 'Must be at least 1 number long.',
      maxlength: 'Cannot be more than 7 characters long.',
      pattern: 'Must be numeric.',
      Max_Exceeded: 'must be equal to or less than 1,500,000'
    },
    maxTotal: {
      required: 'Is required.',
      minlength: 'Must be at least 1 number long.',
      maxlength: 'Cannot be more than 6 characters long.',
      pattern: 'Must be numeric.',
      Max_Exceeded: 'must be equal to or less than 100,000'
    }
  };
  constructor(private fb: FormBuilder) {
    console.log('calculateMax constructor');
  }
  /*
A7 is raid gL
A8 is raid rum
B7 is scout gL
B8 is scout rum
A9 is max raid 


  */
  private calculateMax(r: [INumberHash]): number {
    let useRum = (this.goodScout == this.useRum);
    let rv: number = 0;

    if (useRum) {
// =(B7 * 2) - ((A9*(B8/2)/A8) - (B8/2))
      let maxGl = Math.max(r['gold'],r['lumber']); // A7
      let smaxGl = Math.max(r['sgold'],r['slumber']); // B7
      rv = (smaxGl * 2) - ((r['maxRaidTotal'] * (r['srum']/2) / r['rum'])-(r['srum']/2)) 


    }
    return 0;
  }
  public setGoodScout(event) {
    this.goodScout = (this.goodScout == this.useRum) ? this.useGl : this.useRum;
  }
  public buildForm(): void {
    console.log('in buildForm');
    this.formModel = this.fb.group({
      sgold: ['', this.pValidators],
      slumber: ['', this.pValidators],
      srum: ['', this.pValidators],
      gold: ['', this.pValidators],
      lumber: ['', this.pValidators],
      rum: ['', this.pValidators],
      maxRaidTotal: [100000, this.mValidators]
    });
    this.formModel.valueChanges
      .subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
    this.scoutIcon = '../../assets/icon/testSVG_1.svg';
  }
  public ngOnInit() {
    this.active = true;
    this.buildForm();
  }
  public onSubmit() {
    this.submitted = true;
    let resources = this.onValueChanged(this.formModel);
    console.log('submit this.formModel.value', this.formModel.value);
    console.log('submit this.formModel.errors', this.formModel.errors);
  }
  public anyFormErrors(): boolean {
    let resourceEntities: [INumberHash] = [{gold: 0}];
    if (!this.formModel) { return; }
    const form = this.formModel;
    for (const field in this.formErrors) {
      if (field.length === 0) {
        continue;
      }
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        console.log('anyFormErrors returning true');
        console.log('error field:', field);
        console.log('error formControl :', control);
        return true;
      }
      // console.log('setting entities field:', field);

      resourceEntities[field] = +control.value;      // console.log('set entities field:', field);
    }
    let useGold = resourceEntities['sgold'] > resourceEntities['slumber'];
    let rv = (resourceEntities['srum'] <= 0) || (resourceEntities['rum'] <= 0) ||
            !(useGold ? resourceEntities['sgold'] > 0 && resourceEntities['gold'] > 0 :
                        resourceEntities['slumber'] > 0 && resourceEntities['lumber'] > 0);
    // console.log('anyFormErrors returning:', rv);
    return rv;
  }
  public onValueChanged(data?: any) : [INumberHash] {
    let resourceEntities: [INumberHash] = [{gold: 0}];
    if (!this.formModel) { return null; }
    const form = this.formModel;
    for (const field in this.formErrors) {
      if (field.length === 0) {
        continue;
      }
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages
        [field === 'maxRaidTotal' ? 'maxTotal' : 'resource'];
        for (const key in control.errors) {
          if (messages[key]) {
            this.formErrors[field] += messages[key] + ' ';
            console.log('error field:', field);
            console.log('error key:', key);
            console.log('erro message:', messages[key]);
            console.log('error formControl :', control);
          }
        }
      }
      else if (control) {
      resourceEntities[field] = +control.value;
      }
    }
    return resourceEntities;
  }
}
