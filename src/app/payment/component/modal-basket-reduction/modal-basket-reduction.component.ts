import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {AdherentBasketModel} from '../../../models/adherentBasketModel';
import {Button} from 'primeng/button';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {NgIf} from '@angular/common';
import {FieldsetModule} from 'primeng/fieldset';

@Component({
  selector: 'app-modal-basket-reduction',
  imports: [
    DialogModule,
    NgIf,
    Button,
    ReactiveFormsModule,
    InputText,
    InputNumberModule,
    DividerModule,
    FieldsetModule,
    CheckboxModule],
  standalone: true,
  templateUrl: './modal-basket-reduction.component.html',
  styleUrl: './modal-basket-reduction.component.scss'
})
export class ModalBasketReductionComponent implements OnInit {

  _visible = false;
  _isErrorForm = false;
  _adherentBasket!: AdherentBasketModel;

  _form!: FormGroup;

  @Input()
  get iAdherentBasket(): AdherentBasketModel | null {
    return this._adherentBasket;
  }

  set iAdherentBasket(adherentBasket: AdherentBasketModel | null) {
    if (adherentBasket) {
      this._visible = true;
      this.fillAdherentBasket(adherentBasket);
    } else {
      this._visible = false;
    }
  }

  @Output()
  oBasketReduction: EventEmitter<AdherentBasketModel | null> = new EventEmitter<AdherentBasketModel | null>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._form = this.createForm();
  }

  /**
   * Creates and returns a FormGroup with predefined controls and validation rules.
   * @return {FormGroup} The created FormGroup instance containing form controls with their validators.
   */
  createForm(): FormGroup {
    return this.formBuilder.group({
      isCarteTattoo: [false],
      codeTattoo: [{value: '', disabled: true}, [Validators.maxLength(10), Validators.minLength(10)]],
      amountTattoo: [{value: 60, disabled: true}, [Validators.min(0), Validators.max(60), this.integerValidator()]],
      isCartePassSport: [false],
      codePassSport: [{value: '', disabled: true}],
      amountPassSport: [{value: 70, disabled: true}, [Validators.min(0), Validators.max(70), this.integerValidator()]],
      isCartePassRegion: [false],
      codePassRegion: [{value: '', disabled: true}],
      pinPassRegion: [{value: '', disabled: true}],
      amountPassRegion: [{value: 30, disabled: true}, [Validators.min(0), Validators.max(30), this.integerValidator()]],
    });
  }

  fillAdherentBasket(adherentBasket: AdherentBasketModel) {
    this._adherentBasket = adherentBasket;
    this._form.get('isCarteTattoo')?.setValue(adherentBasket.basketAmountDetails?.tattooAmount != null && adherentBasket.basketAmountDetails?.tattooAmount > 0);
    this._form.get('codeTattoo')?.setValue(adherentBasket.basketAmountDetails?.tattooCode);
    this._form.get('amountTattoo')?.setValue(adherentBasket.basketAmountDetails?.tattooAmount);

    this._form.get('isCartePassSport')?.setValue(adherentBasket.basketAmountDetails?.passSportCode != null && adherentBasket.basketAmountDetails?.passSportAmount > 0);
    this._form.get('codePassSport')?.setValue(adherentBasket.basketAmountDetails?.passSportCode);
    this._form.get('amountPassSport')?.setValue(adherentBasket.basketAmountDetails?.passSportAmount);

    this._form.get('isCartePassRegion')?.setValue(adherentBasket.basketAmountDetails?.passRegionCode != null && adherentBasket.basketAmountDetails?.passRegionPin != null && adherentBasket.basketAmountDetails?.passRegionAmount > 0);
    this._form.get('codePassRegion')?.setValue(adherentBasket.basketAmountDetails?.passRegionCode);
    this._form.get('pinPassRegion')?.setValue(adherentBasket.basketAmountDetails?.passRegionAmount);

    this.onSelectCarteTattoo();
    this.onSelectCartePassSport();
    this.onSelectCartePassRegion();
  }

  integerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return Number.isInteger(value) ? null : {notInteger: true};
    };
  }

  onSelectCarteTattoo() {
    if (this._form.get('isCarteTattoo')?.value) {
      this._form.get('codeTattoo')?.enable();
      this._form.get('amountTattoo')?.enable();
    } else {
      this._form.get('codeTattoo')?.disable();
      this._form.get('amountTattoo')?.disable();
    }
  }

  onSelectCartePassSport() {
    if (this._form.get('isCartePassSport')?.value) {
      this._form.get('codePassSport')?.enable();
      this._form.get('amountPassSport')?.enable();
    } else {
      this._form.get('codePassSport')?.disable();
      this._form.get('amountPassSport')?.disable();
    }
  }

  onSelectCartePassRegion() {
    if (this._form.get('isCartePassRegion')?.value) {
      this._form.get('codePassRegion')?.enable();
      this._form.get('pinPassRegion')?.enable();
      this._form.get('amountPassRegion')?.enable();
    } else {
      this._form.get('codePassRegion')?.disable();
      this._form.get('pinPassRegion')?.disable();
      this._form.get('amountPassRegion')?.disable();
    }
  }

  onSubmit() {
    if (this._adherentBasket.basketAmountDetails) {
      if (this.isFormValid()) {
        this._isErrorForm = false;
        this._adherentBasket.basketAmountDetails.tattooCode = this._form.get('isCarteTattoo')?.value ? this._form.get('codeTattoo')?.value : '';
        this._adherentBasket.basketAmountDetails.tattooAmount = this._form.get('isCarteTattoo')?.value ? this._form.get('amountTattoo')?.value : 0;
        this._adherentBasket.basketAmountDetails.passSportCode = this._form.get('isCartePassSport')?.value ? this._form.get('codePassSport')?.value : '';
        this._adherentBasket.basketAmountDetails.passSportAmount = this._form.get('isCartePassSport')?.value ? this._form.get('amountPassSport')?.value : 0;
        this._adherentBasket.basketAmountDetails.passRegionCode = this._form.get('isCartePassRegion')?.value ? this._form.get('codePassRegion')?.value : '';
        this._adherentBasket.basketAmountDetails.passRegionPin = this._form.get('isCartePassRegion')?.value ? this._form.get('pinPassRegion')?.value : '';
        this._adherentBasket.basketAmountDetails.passRegionAmount = this._form.get('isCartePassRegion')?.value ? this._form.get('amountPassRegion')?.value : 0;
        this.oBasketReduction.emit(this._adherentBasket);
      } else {
        this._isErrorForm = true;
      }
    }
  }

  isFormValid(): boolean {
    let isCarteTattooValid = true;
    let isCartePassSportValid = true;
    let isCartePassRegionValid = true;
    if (this._form.get('isCarteTattoo')?.value) {
      isCarteTattooValid = this._form.get('codeTattoo')?.value != '' && this._form.get('amountTattoo')?.value != '';
    }
    if (this._form.get('isCartePassSport')?.value) {
      isCartePassSportValid = this._form.get('codePassSport')?.value != '' && this._form.get('amountPassSport')?.value != '';
    }
    if (this._form.get('isCartePassRegion')?.value) {
      isCartePassRegionValid = this._form.get('codePassRegion')?.value != '' && this._form.get('pinPassRegion')?.value != '' && this._form.get('amountPassRegion')?.value != '';
    }
    return this._form.valid && isCarteTattooValid && isCartePassSportValid && isCartePassRegionValid;
  }


  onCloseModal() {
    this._visible = false;
    this.oBasketReduction.emit(null);
  }
}
