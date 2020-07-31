import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringMultiSelectComponent } from './string-multi-select.component';

describe('StringMultiSelectComponent', () => {
  let component: StringMultiSelectComponent;
  let fixture: ComponentFixture<StringMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
