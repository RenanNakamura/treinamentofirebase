import { Component } from '@angular/core';
import { ContatoService } from './contato.service';

@Component({
  selector: 'contato-app',
  template: `
    <contato-edit [contato]="editContato"
      (save)="save($event)" (clear)="clear()"></contato-edit>
    <contato-list [contatos]="contatos"
      (edit)="edit($event)" (remove)="remove($event)"></contato-list>
  `,
})
export class AppComponent {

  contatos = [];
  editContato = {};

  constructor(private contatoService: ContatoService) {
   // contatoService.errorHandler = error =>
   //   window.alert('Oops! The server request failed.');
    this.reload();
  }

  clear() {
    this.editContato = {};
  }

  edit(contato) {
    this.editContato = Object.assign({}, contato);
  }

  remove(contato) {
    this.contatoService.removeContato(contato)
      .then(() => this.reload());    
  }

  save(contato) {
    if (contato.id) {
      this.contatoService.updateContato(contato)
        .then(() => this.reload());
    } else {
      this.contatoService.addContato(contato)
        .then(() => this.reload());
    }
    this.clear();
  }

  private reload() {
    return this.contatoService.getContatos()
      .then(contatos => this.contatos = contatos);
  }

}
