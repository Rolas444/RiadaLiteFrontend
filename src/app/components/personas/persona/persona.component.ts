import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit, OnDestroy {
  personform: FormGroup;
  suscription!: Subscription;
  persona!: Persona;
  idPersona =0;
  //dateFormat=require ("dateformat");

  constructor(private formBuilder: FormBuilder,
              private personaService:PersonaService,
              public datePipe: DatePipe,
              private toastr:ToastrService) {
    this.personform = this.formBuilder.group({
      
      id: 0,
      names: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      lastname2: ['',[Validators.required]],
      tipdoc: [''],
      documentid: ['', [Validators.required]],
      birthday: [''],
      email:[''],
      address: [''],
      ubigeo:['']
    })
   }

  ngOnInit(): void {
    this.suscription = this.personaService.getPersona$().subscribe(
      data=>{
        console.log (data);
        this.persona=data;
        this.personform.patchValue({
          id:this.persona.id,
          names: this.persona.name,
          lastname: this.persona.lastName,
          lastname2: this.persona.lastName2,
          tipdoc:this.persona.typeDocumentId,
          documentid: this.persona.documentId,
          birthday: this.datePipe.transform(this.persona.birthday,'yyyy-MM-dd') ,
          address: this.persona.address,
          email: this.persona.email
        })
      }
    )
  }

  ngOnDestroy(){
    this.suscription.unsubscribe();
  }

  saveperson(){
    const personafrm:Persona = {
      name:this.personform.get('names')?.value,
      documentId:this.personform.get('documentid')?.value,
      typeDocumentId:this.personform.get('tipdoc')?.value,
      lastName:this.personform.get('lastname')?.value,
      lastName2:this.personform.get('lastname2')?.value,
      email:this.personform.get('email')?.value,
      address:this.personform.get('address')?.value,
      birthday:this.personform.get('birthday')?.value,
    }

    this.personaService.savePersona(personafrm).subscribe(data=>{
      this.toastr.success('registro grabado correctamente','Proceso correcto');
      this.personaService.getPersonas();
      this.personform.reset();
    })
  }

}
