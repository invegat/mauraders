import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** a field can't exceed the maximum value */
export function maxValueValidator(maxValue: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const v = (control.value as number);
    // console.log('v', v);
    // console.log('maxValue', maxValue);
    const no = v > maxValue;
    // console.log('no', no);
    return no ? {Max_Exceeded: {v}} : null;
  };
}
