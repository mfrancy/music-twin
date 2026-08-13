import { Component, EventEmitter, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComparisonInput } from '../../models/comparison-input';
import { form } from '@angular/forms/signals';
import { ComparisonForm } from '../../components/comparison/comparison-form';

@Component({
  selector: 'app-comparison-page',
  imports: [ReactiveFormsModule, ComparisonForm],
  templateUrl: './comparison-page.html',
  styleUrl: './comparison-page.scss',
})

export class ComparisonPage {

onCompare(event: ComparisonInput) {
  console.log(event)
}
  
}