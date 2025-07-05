import {Component, Input} from '@angular/core';
import {AdhesionModel} from '../../../models/adhesionModel';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {Tag} from 'primeng/tag';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription-details',
  imports: [
    NgFor,
    NgIf,
    Card,
    DatePipe,
    Divider,
    Tag,
    Button
  ],
  standalone: true,
  templateUrl: './inscription-details.component.html',
  styleUrl: './inscription-details.component.scss'
})
export class InscriptionDetailsComponent {

  _adhesionDetails: AdhesionModel | null = null;

  @Input()
  get iAdhesionDetails(): AdhesionModel | null {
    return this._adhesionDetails;
  }

  set iAdhesionDetails(adhesionDetails: AdhesionModel | null) {
    if (adhesionDetails) {
      this._adhesionDetails = adhesionDetails;
    }
  }

  constructor(private router: Router) {
  }

  onNewInscrition() {
    if (this._adhesionDetails) {
      this.router.navigate(['inscription', 'new', this._adhesionDetails.id]).then(_ =>{} );
    }
  }
}
