import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rForm: FormGroup;
  post: any;
  description:string = '';
  name:string = '';
  titleAlert:string = 'This field is required.';

  constructor(private fb: FormBuilder){
    this.rForm = fb.group({
      'name':[null, Validators.required],
      'description':[null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(200)])],
      'validate': ''
    });
  }

  ngOnInit(){
    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if(validate == '1'){
          console.log(validate);
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "The Name field must be at least 3 characters."
        }
        else{
          console.log(validate);
          this.rForm.get('name').setValidators(Validators.required);
          this.titleAlert = "The Name field is required."
        }
        this.rForm.get('name').updateValueAndValidity();
      }
    )
  }

  get f(){ return this.rForm.controls; }

  addPost(post){
    this.description = post.description;
    this.name = post.name;
  }
}
