import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PersonaComponent } from './components/personas/persona/persona.component';
import { ListPersonaComponent } from './components/personas/list-persona/list-persona.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    PersonaComponent,
    ListPersonaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
