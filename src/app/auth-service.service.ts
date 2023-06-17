import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  successMessage: string | null = null;

  setSuccessMessage(message: string) {
    this.successMessage = message;
  }

  clearSuccessMessage() {
    this.successMessage = null;
  }
  

  user: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  async signUp(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.user = userCredential.user;
      console.log('Registro exitoso', this.user);
    } catch (error) {
      console.log('Error al registrarse', error);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.user = userCredential.user;
      console.log('Inicio de sesión exitoso', this.user);
    } catch (error) {
      console.log('Error al iniciar sesión', error);
    }
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  isAdmin(): boolean {
    // Define una lista de correos electrónicos de usuarios administradores
    const adminEmails = ['admin@example.com', 'admin2@example.com'];
  
    // Comprueba si el correo electrónico del usuario actual está en la lista de administradores
    return this.isLoggedIn() && adminEmails.includes(this.user?.email || '');
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      this.user = null;
      console.log('Cierre de sesión exitoso');
    } catch (error) {
      console.log('Error al cerrar sesión', error);
    }
  }
}

