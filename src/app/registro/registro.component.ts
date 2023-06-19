import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, updateDoc, getDoc, DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  email: string = '';
  password: string = '';

  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl('', [Validators.required]),
    }, { validators: this.passwordMatchValidator });
  }
  
  /*
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { 'passwordMismatch': true };
  }
  */

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    const passwordsMatch = password === confirmPassword;

    if (!passwordsMatch) {
      control.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
    }

    return null;
  }
  

  signUp() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signupForm.value;

    this.authService.signUp(email, password)
      .then(() => {
        const firebaseApp = initializeApp({
          apiKey: "AIzaSyBEQ1xlYvYPkh6r3aNiMDplV27dRSoV2J0",
          authDomain: "proyecto-final-9cd83.firebaseapp.com",
          projectId: "proyecto-final-9cd83",
          storageBucket: "proyecto-final-9cd83.appspot.com",
          messagingSenderId: "248208646105",
          appId: "1:248208646105:web:5758c93dfbdc9c2ca103c8"
        });
        const db = getFirestore(firebaseApp);

        const usersCollection = collection(db, 'usuarios');
        const docId = 'bUXiECw194pVT9t45m2V';

        const docRef = doc(usersCollection, docId);

        getDoc(docRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              updateDoc(docRef, {
                [email]: {
                  correo: email,
                  contraseña: password
                  // Agrega otros detalles del usuario si los tienes disponibles
                }
              })
                .then(() => {
                  this.authService.setSuccessMessage('Registro exitoso');
                  this.router.navigate(['/']); // Navega a la página de inicio
                })
                .catch(error => {
                  console.log('Error al guardar los datos del usuario en Firestore:', error);
                });
            } else {
              setDoc(docRef, {
                [email]: {
                  correo: email,
                  contraseña: password
                  // Agrega otros detalles del usuario si los tienes disponibles
                }
              })
                .then(() => {
                  this.authService.setSuccessMessage('Registro exitoso');
                  this.router.navigate(['/']); // Navega a la página de inicio
                })
                .catch(error => {
                  console.log('Error al guardar los datos del usuario en Firestore:', error);
                });
            }
          })
          .catch(error => {
            console.log('Error al obtener el documento de usuarios:', error);
          });
      })
      .catch(error => {
        console.log('Error al registrarse', error);
      });
  }
}
