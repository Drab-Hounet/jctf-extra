import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {AdhesionModel} from '../../../models/adhesionModel';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import {DividerModule} from 'primeng/divider';
import {TagModule} from 'primeng/tag';
import {AdherentModel} from '../../../models/adherentModel';
import {CategoryClass} from '../../../shared/Utils/categoryClass';

@Component({
  selector: 'app-modal-adhesion-details',
  imports: [DialogModule,
    ButtonModule,
    NgFor,
    NgIf,
    DividerModule,
    DatePipe,
    TagModule
  ],
  standalone: true,
  templateUrl: './modal-adhesion-details.component.html',
  styleUrl: './modal-adhesion-details.component.scss'
})
export class ModalAdhesionDetailsComponent {
  _visible = false;

  _adhesion: AdhesionModel | null = null;

  @Input()
  get iAdhesion(): AdhesionModel | null {
    return this._adhesion;
  }

  set iAdhesion(adhesion: AdhesionModel | null) {
    if (adhesion) {
      console.log(adhesion);
      this._visible = true;
      this.fillAdherent(adhesion);
    }
  }

  @Output()
  oModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  fillAdherent(adhesion: AdhesionModel) {
    let categoryClass = new CategoryClass();
    for (let adherent of adhesion.listAdherent || []) {
      if(adherent.birth && adhesion.beginYear) {
        let date:Date = new Date(adherent.birth);
        adherent.category = categoryClass.getCategory(adhesion.beginYear - date.getFullYear())
      }
    }
    this._adhesion = adhesion;
  }


  onCloseModal() {
    this._visible = false;
    this._adhesion = null;
    this.oModalClose.emit(false);
  }
}
