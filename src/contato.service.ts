import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ContatoService {

  errorHandler = error => console.error('ContatoService error', error);
  private baseUrl = 'https://treinamento-b5afb.firebaseio.com';
  private collection = 'contatos';

  constructor(private http: Http) { }

  addContato(contato) {
    const json = JSON.stringify(contato);
    return this.http.post(`${this.baseUrl}/${this.collection}.json`, json)
      .toPromise()
      .catch(this.errorHandler);
  }

  getContatos() {
    return this.http.get(`${this.baseUrl}/${this.collection}.json`)
      .toPromise()
      .then(response => this.convert(response.json()))
      .catch(this.errorHandler);
  }

  removeContato(contato) {
    return this.http.delete(`${this.baseUrl}/${this.collection}/${contato.id}.json`)
      .toPromise()
      .catch(this.errorHandler);
  }

  updateContato(contato) {
    const json = JSON.stringify({
      nome: contato.nome,
      telefone: contato.telefone
    });
    return this.http.patch(`${this.baseUrl}/${this.collection}/${contato.id}.json`, json)
      .toPromise()
      .catch(this.errorHandler);
  }

  private convert(parsedResponse) {
    return Object.keys(parsedResponse)
      .map(id => ({
        id: id,
        nome: parsedResponse[id].nome,
        telefone: parsedResponse[id].telefone
      }))
      .sort((a, b) => a.nome.localeCompare(b.nome));
  }

}
