import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {NgClass, NgIf} from '@angular/common';
import {DividerModule} from 'primeng/divider';
import {SelectModule} from 'primeng/select';
import {TagModule} from 'primeng/tag';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdherentModel} from '../../../models/adherentModel';
import {AdherentBasketModel} from '../../../models/adherentBasketModel';
import {DatePickerModule} from 'primeng/datepicker';
import {CheckboxModule} from 'primeng/checkbox';
import {ImageModule} from 'primeng/image';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-modal-create-adherent',
  imports: [DialogModule,
    ButtonModule,
    NgIf,
    DividerModule,
    SelectModule,
    TagModule,
    ReactiveFormsModule,
    ImageModule,
    CheckboxModule,
    DatePickerModule,
    InputText],
  standalone: true,
  templateUrl: './modal-create-adherent.component.html',
  styleUrl: './modal-create-adherent.component.scss'
})
export class ModalCreateAdherentComponent implements OnInit {

  _visible: boolean = false;
  _formCreate!: FormGroup;
  _isMasculin = true;
  _sectionParentVisible = false;

  _isError = false;

  @Input()
  get iOpenModal(): boolean | null {
    return this._visible;
  }

  set iOpenModal(isOpen: boolean | null) {
    this._visible = isOpen != null ? isOpen : false;
    if (this._formCreate) {
      this._formCreate.reset();
    }
  }

  @Output()
  oNewAdherent: EventEmitter<AdherentModel | null> = new EventEmitter<AdherentModel | null>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this._formCreate = this.createFormCreate();
  }

  createFormCreate(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostal: ['', Validators.compose([Validators.required, Validators.pattern(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/)])],
      ville: ['', Validators.required],
      mail: ['', Validators.compose([Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)])],
      phoneFixe: ['', Validators.compose([Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)])],
      phoneOffice: ['', Validators.compose([Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)])],
      birthDay: [null, Validators.required],

      //  parent
      hasParent: [false],
      parent1: [''],
      adresseParent1: [''],
      postalParent1: [''],
      villeParent1: [''],
      mailParent1: [''],

      parent2: [''],
      adresseParent2: [''],
      postalParent2: [''],
      villeParent2: [''],
      mailParent2: [''],

      famille: [],

      // commentaire
      adherentCommentaire: [''],
    });
  }

  onChangeGender() {
    this._isMasculin = !this._isMasculin;
  }

  onParentPresent() {
    this._sectionParentVisible = !this._sectionParentVisible;
  }

  onDateChange() {
    const rawValue = this._formCreate.get('birthDay')?.value;
    if (!rawValue) {
      return;
    }
    const birthDate: Date = rawValue instanceof Date ? rawValue : new Date(rawValue);
    if (isNaN(birthDate.getTime())) {
      return;
    }

    const dateBirthDay: Date = this._formCreate.get('birthDay')?.value;
    const year = new Date().getFullYear() - dateBirthDay.getFullYear();
    this._sectionParentVisible = year < 18;
  }


  onSubmit() {
    this._isError = false;
    if (this._formCreate.valid) {
      let adherent: AdherentModel = {
        name: this._formCreate.get('name')?.value
      };
      adherent.surname = this._formCreate.get('surname')?.value;
      adherent.adress = this._formCreate.get('adresse')?.value;
      adherent.codePostal = this._formCreate.get('codePostal')?.value;
      adherent.ville = this._formCreate.get('ville')?.value;
      adherent.mail = this._formCreate.get('mail')?.value;
      adherent.phone = this._formCreate.get('phone')?.value;
      adherent.phoneFixe = this._formCreate.get('phoneFixe')?.value;
      adherent.phoneOffice = this._formCreate.get('phoneOffice')?.value;

      const birth: Date = new Date(this._formCreate.get('birthDay')?.value);
      birth.setHours(10); // Pour éviter le recul d'une heure selon le timezone
      adherent.birth = birth;

      adherent.sexe = this._isMasculin ? 'M' : 'F';

      //  parent
      adherent.hasParent = this._formCreate.get('hasParent')?.value;
      adherent.parent1 = this._formCreate.get('parent1')?.value;
      adherent.adresseParent1 = this._formCreate.get('adresseParent1')?.value;
      adherent.postalParent1 = this._formCreate.get('postalParent1')?.value;
      adherent.villeParent1 = this._formCreate.get('villeParent1')?.value;
      adherent.mailParent1 = this._formCreate.get('mailParent1')?.value;
      adherent.parent2 = this._formCreate.get('parent2')?.value;
      adherent.adresseParent2 = this._formCreate.get('adresseParent2')?.value;
      adherent.postalParent2 = this._formCreate.get('postalParent2')?.value;
      adherent.villeParent2 = this._formCreate.get('villeParent2')?.value;
      adherent.mailParent2 = this._formCreate.get('mailParent2')?.value;
      adherent.listAdhesion = [];
      this.oNewAdherent.emit(adherent);
    } else {
      this._isError = true;
    }
  }

  onCloseModal() {
    this._visible = false;
    this.oNewAdherent.emit(null);
  }
}
