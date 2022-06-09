import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, firstValueFrom, Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  ApiUrl='https://localhost:44307/';
  PersonaUrl='api/persona/';
  listPersonas: Persona[]=[];
  private updateFormPerson = new BehaviorSubject<Persona> ({} as any)

  constructor(private http: HttpClient) { }

  savePersona(persona: Persona):Observable<Persona>{
    return  this.http.post<Persona>(this.ApiUrl+this.PersonaUrl, persona)
  }

  getPersonas(){
     firstValueFrom(this.http.get(this.ApiUrl+this.PersonaUrl)).then(
      data=>{
        this.listPersonas=data as Persona[]
      }
    );
  }

  updatePerson(persona: Persona){
    this.updateFormPerson.next(persona)
  }

  getPersona$(): Observable<Persona>{
    return this.updateFormPerson.asObservable();
  }
}
