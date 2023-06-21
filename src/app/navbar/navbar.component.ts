import { Component, ElementRef, ViewChild } from '@angular/core';
import { BuscarService } from '../buscar.service';
import { AuthService } from '../auth-service.service';
import * as alertifyjs from 'alertifyjs';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Database, onValue, push, ref } from '@angular/fire/database';
import { PhoneAuthProvider, RecaptchaVerifier } from '@angular/fire/auth';
import { getAuth } from '@firebase/auth';
import { NgOtpInputComponent } from 'ng-otp-input';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('signInModal', {static: false}) signInModal!: ElementRef;
  @ViewChild('regModal', {static: false}) regModal!: ElementRef;
  @ViewChild(NgOtpInputComponent, { static: false}) ngOtpInput!:NgOtpInputComponent;
  @ViewChild('otpRE', { static: false}) otpRE!:NgOtpInputComponent;
  
  recaptchaVerifier:any;
  confimationResults:any
  config ={
    allowNumbersOnly:true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px'
    }
  }

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
    
    console.log(this.confimationResults)
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
          this.mailGroup.reset({
            email:'',
            password:''
          })
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
      var tempP = this.userForm.value.phone;
      //this.authService.register(usuario).then(()=> alert("Usuario registrado")).catch((e)=> console.log(e.message));
      this.authService.signUp(this.userForm.value.email!, this.userForm.value.password!)
      .then(() => {
        this.setRecaptcha()
        this.recaptchaVerifier = new RecaptchaVerifier("captcha",{size: 'invisible'},getAuth());
        this.authService.user?.linkWithPhoneNumber("+52"+this.userForm.value.phone!,this.recaptchaVerifier).then((confimationResults) =>{
          this.confimationResults = confimationResults;
          console.log(this.confimationResults)
          //this.onREOtpChange();
        })
        .catch(error => {
          console.log(error);
        });
        this.codeHidden = false;
      })
      .catch(error => {
        console.log('Error al registrarse', error);
      });
  
    }else{
      alertifyjs.set("notifier","position","top-center");
      alertifyjs.error("Ya existe una cuenta con ese correo");
    }
  }

  loginPhone(){
    this.setRecaptcha()
    this.recaptchaVerifier = new RecaptchaVerifier("captcha",{size: 'invisible'},getAuth());
    
    this.authService.loginPhone("+52"+this.phoneGroup.value.phone!,this.recaptchaVerifier).then((confimationResults) =>{
      this.codeHidden = false
      this.id = confimationResults.verificationId;
    }).catch((e)=>console.log(e.message));
    alertifyjs.set("notifier","position","top-center");
    alertifyjs.success("Codigo enviado");
  }

  onOtpChange(code:any){
    if(code.length == 6){
      var credentials = PhoneAuthProvider.credential(this.id,code.toString());
      this.authService.signWithCredentials(credentials).then((response) =>{
        console.log(response);
        this.codeHidden = true;
        this.resetForms();
        this.ngOtpInput.setValue(0);
        alertifyjs.set("notifier","position","top-center");
        alertifyjs.success("Inicio de sesion exitoso");
        this.signInModal.nativeElement.dispatchEvent(new MouseEvent('click'));
        this.router.navigate(['/']);
      }).catch(error => {
        alertifyjs.set("notifier","position","top-center");
        alertifyjs.error("Codigo incorrecto");
      });
    }
  }

  onREOtpChange(code:any){
    if(code.length == 6){ 
      console.log(this.otpRE.currentVal);
      console.log(this.otpRE.currentVal.length);
      this.confimationResults.confirm(code).then(() =>{
        alertifyjs.set("notifier","position","top-center");
        alertifyjs.success("Cuenta registrada, Bienvenid@");
        this.otpRE.setValue(0)
        this.codeHidden = true;
        this.showRE = true;
        this.userForm.reset({
          name:'',
          email:'',
          password:'',
          phone:''
        });
        this.regModal.nativeElement.dispatchEvent(new MouseEvent('click'));
        this.router.navigate(['/']); // Navega a la página de inicio
      })
      .catch((e: { message: any; }) => {
        console.log(e.message)
        alertifyjs.set("notifier","position","top-center");
        alertifyjs.error("Codigo incorrecto");
      });
    }
  }

  setRecaptcha() {
    if (this.recaptchaVerifier && ('clear' in this.recaptchaVerifier)) {
      console.log('Clearing recaptcha');
      this.recaptchaVerifier.clear();
      document.getElementById('capchaContainer')!.innerHTML = '<div id=\'captcha\'></div>';
    }
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
