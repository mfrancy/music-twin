import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonForm } from './comparison-form';

describe('Comparison', () => {
  let component: ComparisonForm;
  let fixture: ComponentFixture<ComparisonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
