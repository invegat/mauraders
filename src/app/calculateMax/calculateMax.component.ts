import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule, FormControl, FormBuilder,
  FormGroup, Validators
} from '@angular/forms';
//import { MdButtonModule, MdCheckboxModule } from '@angular/material';
import { maxValueValidator } from './maxValueValidator';

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
    this.onValueChanged(this.formModel);
    console.log('submit this.formModel.value', this.formModel.value);
    console.log('submit this.formModel.errors', this.formModel.errors);
  }
  public onValueChanged(data?: any) {
    if (!this.formModel) { return; }
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
    }
  }
}
