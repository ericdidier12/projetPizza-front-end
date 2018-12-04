import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserInscription } from 'src/app/models/userInscription';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;

  user: any[]=[{
    nom: '',
    email: '',
    Login: '',
    adress:'',
    password: '',
    date:'',

  
  }];

  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {

    this.signUpForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.minLength(4)]],
      adress: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]], 
      date: [''],

     
    });
  }

      //getter pour acces plus facile
      get f() { return this.signUpForm.controls; }

  saveForm() {

    const fromvalue = this.signUpForm.value;
    const newUser = new UserInscription(
      fromvalue['nom'],
      fromvalue['email'],
      fromvalue['login'],
      fromvalue['adress'],
      fromvalue['password'],
      fromvalue['date'],
      ) ;
    
    //console.log(signup.form);
    //console.log("Saved : " + JSON.stringify(signup.value));
  }
  saveForms(signup: NgForm): void {
    console.log(signup.form);
    console.log("Saved : " + JSON.stringify(signup.value));
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
        return;
    }

    alert('Parfait !')
}
}
