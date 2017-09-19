import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ContatoService } from './contato.service';
import { AppComponent } from './app.component';
import { ContatoEditComponent } from './contato-edit.component';
import { ContatoListComponent } from './contato-list.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule],
  declarations: [AppComponent, ContatoEditComponent, ContatoListComponent],
  providers: [ContatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
