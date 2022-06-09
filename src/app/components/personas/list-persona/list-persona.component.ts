import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-list-persona',
  templateUrl: './list-persona.component.html',
  styleUrls: ['./list-persona.component.css']
})
export class ListPersonaComponent implements OnInit {

  constructor(public personaService: PersonaService) { }
  listaPersonas: Persona[]=[];
  xsearch:string ='';

  ngOnInit(): void {

    this.personaService.getPersonas();
    //this.personaService.getPersona$().subscribe(
    //  data=>{
    //    console.log(data);
    //  }
    //)
  }

  viewPersona(persona: Persona){
    this.personaService.updatePerson(persona)
  }

  searchPerson(){
    if (this.xsearch.length>=3)
    {
      this.listaPersonas= this.personaService.listPersonas.filter(
        
          item=>{
           return item.name?.toLocaleLowerCase().match(this.xsearch.toLocaleLowerCase()) 
           || item.lastName?.toLocaleLowerCase().match(this.xsearch.toLocaleLowerCase())
           || item.lastName2?.toLocaleLowerCase().match(this.xsearch.toLocaleLowerCase())
           || item.documentId?.toLocaleLowerCase().match(this.xsearch.toLocaleLowerCase());
        }
      )
      //console.log(this.listaPersonas)
    } else if(this.xsearch =="" ){
      this.listaPersonas=[];
    }
    //this.listaPersonas= this.personaService.listPersonas;
  }
}
