import { Component, Input, ViewChild, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR, FormGroup } from '@angular/forms';
import { MultiSelectOption } from './multi-select-option';
import { MultiSelectConfig } from './multi-select-config';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
  }]
})
export class MultiSelectComponent<T = any> implements OnInit, ControlValueAccessor {
  @Input() options = Array<T>();
  @Input() config: MultiSelectConfig<T> = null;

  protected allOptions = Array<MultiSelectOption<T>>();
  protected visibleOptions = Array<MultiSelectOption<T>>();
  protected selectedOptions = Array<MultiSelectOption<T>>();

  protected active = false;
  protected searchText = '';

  private values = Array<T>();
  private disabled = false;

  onChange = (_: Array<T>): Array<T> => Array<T>();
  onTouched = () => {};

  get isDisabled(): boolean {
    return this.disabled;
  }

  get selectedValues(): Array<T> {
    return this.values;
  }

  constructor() { }

  ngOnInit() {
    console.log(this.options);

    this.options.forEach(opt => {
      const convertedOption = this.buildOption(opt);

      this.allOptions.push(convertedOption);
      this.visibleOptions.push(convertedOption);
    });
  }

  writeValue(value: T): void {
    if (value === null || value === undefined) {
      return;
    }

    const option = this.allOptions.find(opt => opt.value === value);

    this.selectOption(option);
  }

  clear(): void {
    this.selectedOptions = Array<MultiSelectOption<T>>();

    this.triggerChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  activate(): void {
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
  }

  protected activateOption(option: MultiSelectOption<T>): void {
    option.active = true;
  }

  protected deactivateOption(option: MultiSelectOption<T>): void {
    option.active = false;
  }

  private triggerChanges(): void {
    this.selectedOptions = this.allOptions.filter((opt: MultiSelectOption<T>) => opt.selected);
    this.values = this.selectedOptions.map((opt: MultiSelectOption<T>) => opt.value);

    this.onChange(this.values);
    this.onTouched();
  }

  private selectOption(option: MultiSelectOption<T>): void {
    option.selected = true;
    this.triggerChanges();
  }

  private buildOption(value: T): MultiSelectOption<T> {
    const option = {
      value,
      displayText: this.getOverrideValue(value, this.config ? this.config.displayText : null),
      selected: false,
      active: false
    };

    return option;
  }

  private getOverrideValue(value: T, override?: any): any {
    if (override) {
      switch (typeof override) {
        case 'string':
          return value[override];
        default:
          return override(value);
      }
    }

    return value;
  }

}
