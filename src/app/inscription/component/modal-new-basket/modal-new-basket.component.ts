import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {DividerModule} from 'primeng/divider';
import {TagModule} from 'primeng/tag';
import {AdherentModel} from '../../../models/adherentModel';
import {SelectModule} from 'primeng/select';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectModel} from '../../../models/selectModel';
import {AdherentBasketModel} from '../../../models/adherentBasketModel';

@Component({
  selector: 'app-modal-new-basket',
  imports: [DialogModule,
    ButtonModule,
    NgIf,
    NgClass,
    DividerModule,
    SelectModule,
    TagModule,
    ReactiveFormsModule],
  standalone: true,
  templateUrl: './modal-new-basket.component.html',
  styleUrl: './modal-new-basket.component.scss'
})
export class ModalNewBasketComponent implements OnInit {
  _visible = false;

  _form!: FormGroup;
  _isError = false;
  _isEmptyAdherents = false;
  _isJudoSelected = true;
  _isTaisoSelected = false;
  _isJujitsuSelected = false;
  _isJJBSelected = false;

  _adherents: AdherentModel[] | null = null;
  _adherentsSelect: SelectModel [] = [];

  @Input()
  get iAdherents(): AdherentModel[] | null {
    return this._adherents;
  }

  set iAdherents(adherents: AdherentModel[] | null) {
    if (adherents) {
      this.fillAdherents(adherents);
    }
  }

  @Output()
  oNewAdherentBasket: EventEmitter<AdherentBasketModel | null> = new EventEmitter<AdherentBasketModel | null>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._form = this.createFormCreate();
  }

  createFormCreate(): FormGroup {
    return this.formBuilder.group({
      adherent: ['', Validators.required],
    });
  }

  private fillAdherents(adherents: AdherentModel[]) {
    this._visible = true;
    this._adherentsSelect = []
    this._adherents = adherents;
    if (adherents.length == 0) {
      this._isEmptyAdherents = true;
    } else {
      this._isEmptyAdherents = false;
      for (let adherent of adherents) {
        this._adherentsSelect.push({
          name: `${adherent.surname} - ${adherent.name}`,
          code: adherent.id?.toString() ?? '0'
        })
      }
    }
  }

  onSelectActivity(activity: string) {
    if (activity === 'Judo') {
      this._isJudoSelected = !this._isJudoSelected;
    } else if (activity === 'Taiso') {
      this._isTaisoSelected = !this._isTaisoSelected;
    } else if (activity === 'Jujitsu') {
      this._isJujitsuSelected = !this._isJujitsuSelected;
    } else if (activity === 'JJB') {
      this._isJJBSelected = !this._isJJBSelected;
    }
  }

  onSubmit() {
    this._isError = false;
    const adherentSelectSelected: SelectModel = this._form.get('adherent')?.value;
    const adherentSelected: AdherentModel | null = this._adherents?.find(el => el.id?.toString() === adherentSelectSelected.code) ?? null;
    if (!adherentSelected || (!this._isJujitsuSelected && !this._isJJBSelected && !this._isTaisoSelected && !this._isJudoSelected)) {
      this._isError = true;
    } else {
      const adherentBasket: AdherentBasketModel = {
        idBasket: 0,
        id: adherentSelected.id,
        jjb: this._isJJBSelected,
        judo: this._isJudoSelected,
        taiso: this._isTaisoSelected,
        jujitsu: this._isJujitsuSelected,
      }
      this.oNewAdherentBasket.emit(adherentBasket);
      this._visible = false;
    }
  }

  onCloseModal() {
    this._visible = false;
    this.oNewAdherentBasket.emit(null);
  }
}
