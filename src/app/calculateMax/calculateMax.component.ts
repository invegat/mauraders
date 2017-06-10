import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule, FormControl, FormBuilder,
  FormGroup, Validators
} from '@angular/forms';

@Component({
  selector: 'calculateMax',
  templateUrl: './calculateMax.component.html'
})
export class CalculateMaxComponent implements OnInit {
  public formModel: FormGroup;
  public submitted = false;
  public active = false;
  public formErrors = {
    'scoutGroup.sgold': '',
    'scoutGroup.slumber': '',
    'scoutGroup.srum': '',
    'raidGroup.gold': '',
    'raidGroup.lumber': '',
    'raidGroup.rum': '',
    'maxRaidTotal': ''
  };
  public validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 4 characters long.',
      maxlength: 'Name cannot be more than 24 characters long.',
      forbiddenName: 'Someone named "Bob" cannot be a hero.'
    },
    power: {
      required: 'Power is required.'
    }
  };
  constructor(private fb: FormBuilder) {
    console.log('calculateMax constructor');
  }

  public buildForm(): void {
    console.log('in buildForm');
    this.formModel = this.fb.group({
      scoutGroup: this.fb.group({
        sgold: ['', [Validators.required, Validators.pattern('/\d{1,7}/'),
                 Validators.minLength(1), Validators.maxLength(7)]],
        slumber: ['', [Validators.required, Validators.pattern('/\d{1,7}/')]],
        srum: ['', [Validators.required, Validators.pattern('\d{1,7}')]]
      }),
      raidGroup: this.fb.group({
        gold: ['', [Validators.required, Validators.pattern('/\d{1,7}/')]],
        lumber: ['', [Validators.required, Validators.pattern('/\d{1,7}/')]],
        rum: ['', [Validators.required, Validators.pattern('/\d{1,7}/')]]
      }),
      maxRaidTotal: [100000, [Validators.required, Validators.pattern('/\d{1,6}/')]]
    });
    console.log('before subscibe');
    this.formModel.valueChanges
      .subscribe((data) => this.onValueChanged(data));
    console.log('after subscibe');
    this.onValueChanged(); // (re)set validation messages now
    console.log('after onValueChanged');

  }
  public ngOnInit() {
    console.log('calculateMax init');
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
      // console.log('formErrors field:',field);
      // clear previous error message (if any)
      // console.log('valueChanged data:', data);
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        // const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += key + ' ';
          console.log('errror key:', key);
        }
      }
    }
  }
}
