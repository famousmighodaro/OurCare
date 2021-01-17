import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-hygiene-care',
  templateUrl: './create-hygiene-care.component.html',
  styleUrls: ['./create-hygiene-care.component.scss'],
})
export class CreateHygieneCareComponent implements OnInit {

  @ViewChild('hygieneCareForm')
  form: NgForm;

  hygieneType: 2;
  hygieneFrequency: 3;
  staffLevel: 3;
  constructor() { }

  ngOnInit() { }

  onSubmit() { }

}
