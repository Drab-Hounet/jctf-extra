import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-button-hello-asso',
  imports: [
  ],
  standalone: true,
  templateUrl: './button-hello-asso.component.html',
  styleUrl: './button-hello-asso.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom // to not be impacted by global style
})
export class ButtonHelloAssoComponent {

  @Output() oPayAction: EventEmitter<boolean> = new EventEmitter();

  onPay() {
    this.oPayAction.emit(true);
  }
}
