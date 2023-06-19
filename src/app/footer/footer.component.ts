import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as alertifyjs from 'alertifyjs';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  mensajeEnviado: boolean = false;


  contactForm: FormGroup = new FormGroup({});
  mensajes:any[]=[];
  @ViewChild('closeModalButton', {static: false}) closeModalButton!: ElementRef;

  formSubmitted = false;
  constructor(private fb: FormBuilder, public emailService: EmailService) {
    const mensajesString = localStorage.getItem('mensajes');
    this.mensajes = mensajesString ? JSON.parse(mensajesString) : [];
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.minLength(25)]]
    });
  }

  submitForm(formulario: any) {
    var mensaje={
      nombre:this.contactForm.value.nombre,
      correo:this.contactForm.value.email,
      texto:this.contactForm.value.mensaje
    }
    this.mensajes.push(mensaje);

    this.emailService.sendMessage(formulario).subscribe(() => {
      this.mensajeEnviado = true;
    });

    if(this.mensajeEnviado){console.log("Mensaje enviado");}

    localStorage.setItem('mensajes', JSON.stringify(this.mensajes));
    alertifyjs.set("notifier","position","top-center");
    alertifyjs.success("Su mensaje ha sido enviado, Gracias "+this.contactForm.value.name);
    this.closeModalButton.nativeElement.dispatchEvent(new MouseEvent('click'));
    this.contactForm.reset({
      nombre:'',
      apellido:'',
      correo:''
    });
  }
}
