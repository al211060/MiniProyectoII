import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  mensajes:any[]=[];
  @ViewChild('closeModalButton', {static: false}) closeModalButton!: ElementRef;

  formSubmitted = false;
  constructor(private fb: FormBuilder) {
    const mensajesString = localStorage.getItem('mensajes');
    this.mensajes = mensajesString ? JSON.parse(mensajesString) : [];
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(25)]]
    });
  }

  submitForm() {
    var mensaje={
      nombre:this.contactForm.value.name,
      correo:this.contactForm.value.email,
      texto:this.contactForm.value.message
    }
    this.mensajes.push(mensaje);
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
