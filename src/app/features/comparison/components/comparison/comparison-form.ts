import { Component, inject, output } from '@angular/core';
import { ComparisonInput } from '../../models/comparison-input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comparison-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comparison-form.html',
  styleUrl: './comparison-form.scss',
})
export class ComparisonForm {
  private fb = inject(FormBuilder);
  compare = output<ComparisonInput>();

  form = this.fb.nonNullable.group({
    user: ['', Validators.required],
    otherUser: ['', Validators.required]
  });

  onSubmit() {
    let formValue: ComparisonInput;
    if (!this.form.valid) {
      console.log('false')
    } else {
      console.log(this.form.value)

      formValue = this.form.getRawValue();
      this.compare.emit(formValue)

    }
  }
}
