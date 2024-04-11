import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Animations } from '../../animations/animations';

type InputTypes = "text" | "email" | "password";

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  animations: [Animations],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PrimaryInputComponent), multi: true}
  ],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.css'
})
export class PrimaryInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: InputTypes = 'text';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessages: string[] = ['This field is required'];
  @Input() error: boolean = false;

  value: string = '';
  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.writeValue(value);        
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
