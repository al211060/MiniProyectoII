import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, "es");

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
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { OlMapComponent } from './ol-map/ol-map.component';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    OlMapComponent
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
    MatButtonModule,
    MatRippleModule,
    HttpClientModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'es-mx'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
