import { Component, ElementRef, ViewChild } from '@angular/core';
import { BuscarService } from '../buscar.service';
import { AuthService } from '../auth-service.service';
import * as alertifyjs from 'alertifyjs';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Database, onValue, push, ref } from '@angular/fire/database';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('signInModal', {static: false}) signInModal!: ElementRef;
  @ViewChild('regModal', {static: false}) regModal!: ElementRef;

  usuarios:any[] = [];
  usuariosAux:any[] = [];
  
  showRE:boolean = true;
  accordionCtrl1:boolean=false;
  accordionCtrl2:boolean=true;
  showLI: boolean = true;
  codeHidden:boolean = true;
  codeCheck!:number;
  id:any;

  /*email: string = '';
  password: string = '';*/
  passwordError: boolean = false;
  loginError: boolean = false;
  errorMessage: string='';

  phoneGroup = new FormGroup({
    phone: new FormControl('', [Validators.required, NavbarComponent.longitud])
  });

  mailGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    cPassword: new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    phone: new FormControl('', [Validators.required, NavbarComponent.longitud])
  });

  static longitud(control: AbstractControl): ValidationErrors| null {
    if (control.value?.toString().length == 10)
        return null;
    else
        return { longitud: true }
  }
  
  constructor(private buscarService: BuscarService, public authService: AuthService, private router: Router, public database: Database) {
    onValue(ref(this.database, 'users/'), (snapshot) => {
      if(snapshot.val() != null){
        //this.usuarios = snapshot.val();
        this.usuarios = [];
        this.usuariosAux = [];
        snapshot.forEach((childSnapshot)=>{
          this.usuarios.push(childSnapshot.val());
          this.usuariosAux.push(childSnapshot.key);
        });
      }
    });
    this.userForm.controls['cPassword'].addValidators(
      this.match( this.userForm.controls['password'], this.userForm.controls['cPassword'])
    );
  }

  match(control1 : AbstractControl, control2 : AbstractControl){
    return () => {
      if ( control1.value !== control2.value)
        return {match: true};
      return null;
    }
  } 

  logout(): void {
    this.authService.signOut();
  }

  signIn() {
    this.authService.signIn(this.mailGroup.value.email!, this.mailGroup.value.password!)
      .then(() => {
        this.loginError = false;
        //this.authService.setSuccessMessage('Inicio de sesión exitoso');
        if (this.authService.isLoggedIn()) {
          alertifyjs.set("notifier","position","top-center");
          alertifyjs.success("Inicio de sesión exitoso");
          this.signInModal.nativeElement.dispatchEvent(new MouseEvent('click'));
          this.router.navigate(['/']); // Navega a la página de inicio si el inicio de sesión es exitoso
        }else{
          this.loginError = true;
          alertifyjs.set("notifier","position","top-center");
          alertifyjs.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
          //this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
        }
      })
      .catch((error: any) => {
        console.log(error); // Muestra el error completo en la consola para depuración
      });
  }

  revisarExistencia():boolean{
    if(this.userForm.value.email === 'alex.flores6651@gmail.com'){
      return true;
    }
    for(let usuario of this.usuarios){
      if(usuario.correo === this.userForm.value.email){
        return true
      }
    }
    return false;
  }

  submitForm() {
    if(!this.revisarExistencia()){
      push(ref(this.database, 'users'),{
        nombre:this.userForm.value.name,
        correo:this.userForm.value.email,
        telefono:this.userForm.value.phone
      });
      //this.authService.register(usuario).then(()=> alert("Usuario registrado")).catch((e)=> console.log(e.message));
      this.authService.signUp(this.userForm.value.email!, this.userForm.value.password!)
      .then(() => {
        alertifyjs.set("notifier","position","top-center");
        alertifyjs.success("Cuenta registrada, Bienvenid@");
        this.regModal.nativeElement.dispatchEvent(new MouseEvent('click'));
        this.router.navigate(['/']); // Navega a la página de inicio
      })
      .catch(error => {
        console.log('Error al registrarse', error);
      });
  
    }else{
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.error("Ya existe una cuenta con ese correo");
    }

    this.userForm.reset({
      name:'',
      email:'',
      password:'',
      phone:''
    });
  }

  loginPhone(){
    /*var captcha = new RecaptchaVerifier("captcha",{size: 'invisible'},getAuth());
    this.authService.loginPhone("+52"+this.phoneGroup.value.phone!,captcha).then((confimationResults) =>{
      this.codeHidden = false
      this.id = confimationResults.verificationId;
    }).catch((e)=>console.log(e.message));
    this.resetForms();
    console.log("Inicio de sesion por SMS");*/
  }

  verify(){
    /*var credentials = PhoneAuthProvider.credential(this.id,this.codeCheck.toString());
    this.authService.signWithCredentials(credentials).then((response) =>{
      console.log(response);
      this.codeHidden = true;
      alert("Inicio de sesion por SMS exitoso");
    })*/
  }

  passwordLI(){
    this.showLI = !this.showLI;
  }

  passwordRE(){
    this.showRE = !this.showRE;
  }
  
  collapse(a:number){
    if(a == 1){
      if(this.accordionCtrl2 == true){
        this.accordionCtrl1 = !this.accordionCtrl1;
        this.accordionCtrl2 = !this.accordionCtrl2;
      }else{
        this.accordionCtrl1 = !this.accordionCtrl1;
      }
    }else if(a == 2){
      if(this.accordionCtrl1 == true){
        this.accordionCtrl1 = !this.accordionCtrl1;
        this.accordionCtrl2 = !this.accordionCtrl2;
      }else{
        this.accordionCtrl2 = !this.accordionCtrl2;
      }
    }
    this.resetForms();
  }

  resetForms(){
    this.mailGroup.reset({
      email:'',
      password:''
    });
    this.phoneGroup.reset({
      phone:''
    });
  }

  buscar() {
    const VB = (<HTMLInputElement>document.getElementById("buscar")).value.toLowerCase().trim();
    if(!this.buscarService.buscando(VB)){
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.error("No existe ningun platillo con ese nombre");
    }
    (<HTMLInputElement>document.getElementById("buscar")).value= "";
  }
}
