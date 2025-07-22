import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {UserModel} from '../../../models/userModel';
import {InputText} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal-edit-user',
  imports: [
    DialogModule,
    ButtonModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    InputText,
    DividerModule,
    NgIf
  ],
  templateUrl: './modal-edit-user.component.html',
  styleUrl: './modal-edit-user.component.scss',
  standalone: true,
})
export class ModalEditUserComponent implements OnInit {

  _visible = false;
  _user: UserModel | null = null;
  _form!: FormGroup;
  _isError = false;

  @Input()
  get iUser(): UserModel | null {
    return this._user;
  }

  set iUser(user: UserModel | null) {
    if (user) {
      this._visible = true;
      this.fillUser(user);
    }
  }

  @Output()
  oUserEdit: EventEmitter<UserModel | null> = new EventEmitter<UserModel | null>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this._form = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: [{value: ''}, Validators.required],
      surname: [{value: ''}, Validators.required],
      phone: [{value: ''}, [Validators.required, Validators.pattern(/^(\+33|0)[1-9](\d{2}){4}$/)]],
      password: [{value: ''}],
      rePassword: [{value: ''}],
    });
  }

  fillUser(user: UserModel) {
    this._user = user;
    this._form.get('name')?.setValue(user.name);
    this._form.get('surname')?.setValue(user.surname);
    this._form.get('phone')?.setValue(user.phone);
    this._form.get('password')?.setValue('');
    this._form.get('rePassword')?.setValue('');
  }

  onSubmit() {
    const password: string = this._form.get('password')?.value;
    const rePassword: string = this._form.get('rePassword')?.value;
    if (this._form.valid && this._user && this.isPasswordValid(password, rePassword)) {
      this._user.name = this._form.get('name')?.value;
      this._user.surname = this._form.get('surname')?.value;
      this._user.phone = this._form.get('phone')?.value;
      this._user.password = this._form.get('password')?.value;
      this.oUserEdit.emit(this._user);
      this._visible = false;
      this._isError = false;
    } else {
      this._isError = true;
    }
  }

  isPasswordValid(password: string, rePassword: string): boolean {
    if (password !== rePassword) {
      return false;
    }
    return true;
  }

  onCloseModal() {
    this.oUserEdit.emit(null);
    this._visible = false;
  }
}
