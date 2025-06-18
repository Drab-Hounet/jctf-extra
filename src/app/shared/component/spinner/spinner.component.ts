import {Component, Input} from '@angular/core';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-spinner',
  imports: [ProgressSpinnerModule, DialogModule],
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})

export class SpinnerComponent {
  _visible: boolean = false;

  @Input()
  get iIsOpen(): boolean | null {
    return this._visible ? this._visible : false;
  }

  set iIsOpen(isOpen: boolean | null) {
    const visble = isOpen ? isOpen : false;
    this._visible = visble;
  }

}
