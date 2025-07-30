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
import {ModalNewBasketModel} from '../../../models/modalNewBasketModel';
import {ActivityModel} from '../../../models/activityModel';

@Component({
  selector: 'app-modal-new-basket',
  imports: [DialogModule,
    ButtonModule,
    NgIf,
    NgClass,
    DividerModule,
    SelectModule,
    NgFor,
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

  _activities: ActivityModel[] = [];

  _adherents: AdherentModel[] | null = null;
  _adherentsSelect: SelectModel [] = [];

  _modalNewBasket!: ModalNewBasketModel | null;

  @Input()
  get iModalNewBasket(): ModalNewBasketModel | null {
    return this._modalNewBasket;
  }

  set iModalNewBasket(modalNewBasket: ModalNewBasketModel | null) {
    if (modalNewBasket && modalNewBasket.listAdherent) {
      this.fillModalInformations(modalNewBasket);
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

  private fillModalInformations(modalNewBasker: ModalNewBasketModel) {
    this._modalNewBasket = modalNewBasker;
    this._visible = true;
    this._activities = [];
    this._adherentsSelect = []
    this._adherents = modalNewBasker.listAdherent;
    this._isJudoSelected = false;
    this._isJujitsuSelected = false;
    this._isTaisoSelected = false;
    this._isJJBSelected = false;
    if (modalNewBasker.listAdherent && modalNewBasker.listAdherent.length > 0) {
      this._isEmptyAdherents = false;
      for (let adherent of modalNewBasker.listAdherent ?? []) {
        this._adherentsSelect.push({
          name: `${adherent.surname} - ${adherent.name}`,
          code: adherent.id?.toString() ?? '0'
        });
      }

      this._form.get('adherent')?.setValue({
        name: this._adherentsSelect[0].name,
        code: this._adherentsSelect[0].code
      });

      // Display only activities according to adherent

      const adherentSelected = modalNewBasker.listAdherent?.find(el => el.id === (modalNewBasker.listAdherent[0].id));
      if (adherentSelected) {
        this.getActivities(modalNewBasker);
      }
    } else {
      this._isEmptyAdherents = true;
    }
  }

  /**
   * Retrieves and processes activities based on the adherent selected.
   * @param {ModalNewBasketModel} modalNewBasker - The model containing the list of group activities and adherents.
   * @param {AdherentModel} adherentSelected - The selected adherent for filtering activities.
   * @return {void} This method does not return a value but updates the internal list of activities.
   */
  private getActivities(modalNewBasker: ModalNewBasketModel) {
    this._activities = [];
    const adherentSelect: SelectModel = this._form.get('adherent')?.value;
    const adherentSelected = this._modalNewBasket?.listAdherent?.find(el => el.id?.toString() === adherentSelect.code);
    if (adherentSelected) {
      for (let groupActivity of modalNewBasker.listGroupActivity ?? []) {
        if (modalNewBasker.listAdherent && groupActivity.listCategories.find(category => category.toString() == adherentSelected.category)) {
          if (groupActivity.activityName === 'JUDO') {
            this._activities.push({
              name: groupActivity.activityName,
              nbPlaces: groupActivity.nbPlace ?? 0,
              borderColor: "border-blue-900",
              backgroundColor: "bg-blue-50",
              hoverBackgroundColor: "hover:bg-blue-100",
              isSelected: false,
              isActive: (groupActivity.nbPlace ?? -1) > 0,
            });
          } else if (groupActivity.activityName == 'JUJITSU') {
            this._activities.push({
              name: groupActivity.activityName,
              nbPlaces: groupActivity.nbPlace ?? 0,
              borderColor: "border-orange-900",
              backgroundColor: "bg-orange-50",
              hoverBackgroundColor: "hover:bg-orange-100",
              isSelected: false,
              isActive: (groupActivity.nbPlace ?? -1) > 0,
            });
          } else if (groupActivity.activityName == 'TAISO') {
            this._activities.push({
              name: groupActivity.activityName,
              nbPlaces: groupActivity.nbPlace ?? 0,
              borderColor: "border-red-900",
              backgroundColor: "bg-red-50",
              hoverBackgroundColor: "hover:bg-red-100",
              isSelected: false,
              isActive: (groupActivity.nbPlace ?? -1) > 0,
            });
          } else if (groupActivity.activityName == 'JJB') {
            this._activities.push({
              name: groupActivity.activityName,
              nbPlaces: groupActivity.nbPlace ?? 0,
              borderColor: "border-600",
              backgroundColor: "surface-200",
              hoverBackgroundColor: "hover:surface-300",
              isSelected: false,
              isActive: (groupActivity.nbPlace ?? -1) > 0,
            });
          }
        }
      }
    }
  }

  onSelectActivity(activity: ActivityModel) {
    if (activity.isActive) {
      activity.isSelected = !activity.isSelected;
    }


    // if (activity === 'Judo') {
    //   this._isJudoSelected = !this._isJudoSelected;
    // } else if (activity === 'Taiso') {
    //   this._isTaisoSelected = !this._isTaisoSelected;
    // } else if (activity === 'Jujitsu') {
    //   this._isJujitsuSelected = !this._isJujitsuSelected;
    // } else if (activity === 'JJB') {
    //   this._isJJBSelected = !this._isJJBSelected;
    // }
  }

  onSelectAdherent() {
    const adherentSelect: SelectModel = this._form.get('adherent')?.value;
    const adherentSelected = this._modalNewBasket?.listAdherent?.find(el => el.id?.toString() === adherentSelect.code);
    if (adherentSelected && this._modalNewBasket) {
      this.getActivities(this._modalNewBasket);
    }
  }

  onSubmit() {
    console.log(this._activities)
    this._isError = false;
    const adherentSelectSelected: SelectModel = this._form.get('adherent')?.value;
    const adherentSelected: AdherentModel | null = this._adherents?.find(el => el.id?.toString() === adherentSelectSelected.code) ?? null;

    const isActivitySelected = this._activities.find(el => el.isSelected);
    if (!adherentSelected || !isActivitySelected) {
      this._isError = true;
    } else {
      const adherentBasket: AdherentBasketModel = {
        idBasket: 0,
        id: adherentSelected.id,
        jjb: this._activities.find(el => el.name === 'JJB')?.isSelected ?? false,
        judo: this._activities.find(el => el.name === 'JUDO')?.isSelected ?? false,
        taiso: this._activities.find(el => el.name === 'TAISO')?.isSelected ?? false,
        jujitsu: this._activities.find(el => el.name === 'JUJITSU')?.isSelected ?? false,
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
