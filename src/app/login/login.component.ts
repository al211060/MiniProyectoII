import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordError: boolean = false;
  loginError: boolean = false;
  errorMessage: string='';




  constructor(private authService: AuthService, private router: Router) {
  }

  /*
  signIn() {
    this.authService.signIn(this.email, this.password);
  }*/


  
  signIn() {
    this.authService.signIn(this.email, this.password)
      .then(() => {
        this.loginError = false;
        this.authService.setSuccessMessage('Inicio de sesión exitoso');
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/']); // Navega a la página de inicio si el inicio de sesión es exitoso
        }else{
          this.loginError = true;
          this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
        }
      })
      .catch((error: any) => {
        console.log(error); // Muestra el error completo en la consola para depuración
      });
  }
  
  


  logout(): void {
    this.authService.signOut();
  }

}
