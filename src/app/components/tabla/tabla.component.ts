import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/entities/persona';
import { PersonaService } from 'src/app/servicio/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  personas:Persona[]=[];
  persona:FormGroup;
  persona1:Persona={
    id:0,
    nombre:" ",
    apellido:" ",
    dni:0,
    edad:0,
  }
idAux;



  constructor(private servicio:PersonaService,private router:Router,private actRoute:ActivatedRoute) {

    this.persona = new FormGroup({
      'nombre': new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{1,50}')  
      ]),
      'apellido': new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]{1,50}')  
      ]),
      'dni': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]{8}$')
      ]),
      'edad': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{1,3}$')
      ])
    });
   }
   
  ngOnInit() {
    this.getAll();
  }

  getAll(){
  this.servicio.getAll().subscribe((data)=>{//con susbribe lo hago asincrono,
    this.personas=data;
 
  });

  }

  delete(id:number){
    const opcion =
    confirm("Esta seguro que quiere eliminar");
    if (opcion){
      this.servicio.delete(id).subscribe((data)=>{
        alert("Registro eliminado");
        location.reload();
      });
    }
  }

  obtenerId(id:number){//obtengo el id de la persona a editar
    this.idAux=id;
    this.getOne(this.idAux);
  }
  addEdit(){//Si el id no es nulo, es una edicion sino es una insercion
    if(this.idAux!=null){
      this.put(this.idAux);
    }else{
      this.post();
    }
  }

  post(){
      const nuevaPersona = this.persona.value;
      this.servicio.post(nuevaPersona).subscribe((data)=>{
     
        alert("Persona agregada");
        location.reload();

      });
  }
 
  put(id:number){
    const editarPersona = this.persona.value;
    this.servicio.put(id,editarPersona).subscribe((data)=>{
      alert("Cambios guardados correctamente");
      location.reload();
    });
  
  }
  getOne(id:number){//obtengo los datos de la persona y los aisgno a los cmapos del modal
    this.servicio.getOne(id).subscribe((data)=>{

      
    this.persona = new FormGroup({
      'nombre': new FormControl(data.nombre, [
        Validators.required,
        Validators.pattern('[a-zA-Z]{1,50}')  
      ]),
      'apellido': new FormControl(data.apellido, [
        Validators.required,
        Validators.pattern('[a-zA-Z]{1,50}')
      ]),
      'dni': new FormControl(data.dni, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]{8}')
      ]),
      'edad': new FormControl(data.edad, [
        Validators.required,
        Validators.pattern('[0-9]{1,3}$')
      ])
    });
      
    });
  
  }


}
