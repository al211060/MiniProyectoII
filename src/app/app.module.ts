import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, "es");

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//import { environment } from '../app/environments/environment';
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore/lite';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { ListadoItemsComponent } from './listado-items/listado-items.component';
import { ItemComponent } from './item/item.component';
import { ReservarComponent } from './reservar/reservar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoticiasComponent } from './noticias/noticias.component';
import { DomseguroPipe } from './domseguro.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { OlMapComponent } from './ol-map/ol-map.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ProductsComponent } from './products/products.component';
import { ProductosService } from './productos.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FaqComponent } from './faq/faq.component';
import { QRComponent } from './qr/qr.component';


const firebaseConfig = {
  apiKey: "AIzaSyBEQ1xlYvYPkh6r3aNiMDplV27dRSoV2J0",
  authDomain: "proyecto-final-9cd83.firebaseapp.com",
  projectId: "proyecto-final-9cd83",
  storageBucket: "proyecto-final-9cd83.appspot.com",
  messagingSenderId: "248208646105",
  appId: "1:248208646105:web:5758c93dfbdc9c2ca103c8"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    AboutComponent,
    ListadoItemsComponent,
    ItemComponent,
    ReservarComponent,
    NoticiasComponent,
    DomseguroPipe,
    BusquedaComponent,
    OlMapComponent,
    LoginComponent,
    RegistroComponent,
    ReporteComponent,
    ProductsComponent,
    BarChartComponent,
    FaqComponent,
    QRComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    HttpClientModule,
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [
    ProductosService, 
    {provide: LOCALE_ID, useValue: 'es-mx'},
    // Proporciona la instancia de la aplicación Firebase
    { provide: 'firebase-config', useValue: firebaseConfig },
    { provide: 'firebase-app', useFactory: () => initializeApp(firebaseConfig) },
    // Proporciona el servicio de Firestore
    //{ provide: 'firestore', useFactory: () => getFirestore() }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
