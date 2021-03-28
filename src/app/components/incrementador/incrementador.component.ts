import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  //
  @Input('value') progress: number = 90;
  @Input() btnClass: string = 'btn-primary';
  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  // get getProgress() {
  //   return `${this.progress}%`;
  // }

  constructor() {}

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  changeProgress(value: number): void {
    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
    } else if (this.progress <= 0 && value < 0) {
      this.progress = 0;
    } else {
      this.progress += value;
    }
    this.emitValue();
  }

  onChange(value: number) {
    if (this.progress >= 100) {
      this.progress = 100;
    } else if (this.progress <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }
    this.emitValue();
  }

  emitValue(value: number = this.progress) {
    this.valueChange.emit(value);
  }
}
