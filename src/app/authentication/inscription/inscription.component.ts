import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Router } from '@angular/router';
import { UserInscription } from 'src/app/models/user-inscription';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;

  user: UserInscription ={
    name: '',
    email: '',
    username: '',
    adress:'',
    password: '',
    birth_date:'',
  };


  constructor(private fb: FormBuilder, private service: InscriptionService, private router: Router) {
   }

  ngOnInit() {

    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      adress: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(3)]], 
      birth_date: [''],

     
    });
  }

      //getter pour acces plus facile
      get f() { return this.signUpForm.controls; }



  onSubmit() {
    this.submitted = true;

    // stop ici si le formulaire est invalide
    if (this.signUpForm.invalid) {
        return;
    }

    this.user.name = this.signUpForm.get('name').value;
    this.user.email = this.signUpForm.get('email').value;
    this.user.username = this.signUpForm.get('username').value;
    this.user.adress = this.signUpForm.get('adress').value;
    this.user.password = this.signUpForm.get('password').value;
    this.user.birth_date =new Date(this.signUpForm.get('birth_date').value).toISOString().substring(0,10);
    console.log(this.user);

    this.service.attemptSignup(this.user.username, this.user.password, this.user.name, this.user.email, this.user.adress, this.user.adress)
    .pipe(first()).subscribe(data => { console.log("user inscrit"+data)
    }
    );
       this.router.navigate(['login']);
}
}
