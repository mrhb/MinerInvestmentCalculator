import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  miners=MINERS;
  signupForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      address: [''],
      firstname: [''],
      lastname: [''],

  });
  }
  onSubmit()
  {}
}


const MINERS=[
  {name: "SJ9" , hashrate:14.5, consumption:1350},
  {name: "SJ9" , hashrate:14.5, consumption:1350},
  {name: "SJ9" , hashrate:14.5, consumption:1350},
  {name: "SJ9" , hashrate:14.5, consumption:1350},
  {name: "SJ9" , hashrate:14.5, consumption:1350}
];