import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { minimalAPI } from '../../services/minimalAPI.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Theme } from '../menu/menu.component';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  theme: Theme = 'light-theme';

  currentYear = new Date().getFullYear();
  nextYear = (new Date().getFullYear() + 1);

  constructor(private minimalApi:minimalAPI, public router: Router,@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    this.loginForm = this.CreateloginFrom();
  }

  CreateloginFrom(){
    return new FormGroup({
      usuario: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required, Validators.minLength(3)]),
      recuerdame: new FormControl(true)
    });
  }
  // get usuario() { return this.loginForm.get('usuario'); }
  // get password() { return this.loginForm.get('password'); }
  // get recuerdame() { return this.loginForm.get('recuerdame'); }

  ngOnInit(): void {
    this.initializeTheme();
  }



  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);

  switchTheme() {
    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme'
        ? (this.theme = 'dark-theme')
        : (this.theme = 'light-theme')
    );
  }

  // onPathValue(): void {
  //   this.loginForm.patchValue({ usuario: 'Pedro'});
  // }

  // initloginFrom(): loginFrom{
  //   return this.fb.group({
  //   usuario: ['',[Validators.required, Validators.minLength(2)]],
  //   password: ['',[Validators.required, Validators.minLength(2)]],
  //   recuerdame: ['']
  // })

  onLogin(){
    console.log(this.loginForm.value);

    if(this.loginForm.valid){
      this.loginForm.disable();
      // await new Promise(f => setTimeout(f, 4000));
        this.minimalApi.login(this.loginForm.value.usuario,this.loginForm.value.password).subscribe(
        data => {
          console.log("data =>",data);
          this.onResetloginFrom();
          // this.router.navigateByUrl('/clima');
          // this.router.navigate(['app-clima'],{queryParams: {name: 'Oier'}});
          // this.router.navigate(['app-clima']);
          this.router.navigate(['/clima']);
          },
          error => {
            console.log("error =>",error);
            swal.fire('Error !',error.error.response,'error');
            // this.loginFrom.patchValue({ usuario: ''});
            // this.loginFrom.patchValue({ password: ''});
          }
        );
        this.loginForm.enable();
        this.loginForm.reset();
    }else{
      swal.fire('Error !','loginFromulario Incorrecto','error');
    }
  }

  onResetloginFrom(): void {
    this.loginForm.reset();
  }

  // initloginFrom(): loginFrom{
  //   return this.fb.group({
  //     usuario: ['',[Validators.required, Validators.minLength(2)]],
  //     password: ['',[Validators.required, Validators.minLength(2)]],
  //     recuerdame: ['']
  //   });
  // }

}
