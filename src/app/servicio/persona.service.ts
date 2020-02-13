import { Injectable } from '@angular/core';
import { Persona } from '../entities/persona';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
miUrl:string ='http://localhost:9001/api/v1/persona/';
  constructor(private http:HttpClient) { }

  getAll():Observable<Persona[]>{
    return this.http.get<Persona[]>(this.miUrl);
  }
  getOne(id:number):Observable<Persona>{
    try{  
    return this.http.get<Persona>(this.miUrl + id);
    }catch(e){
      alert("se produjo un error");
    }
  }

  delete(id:number):Observable<any>{
    try{
    return this.http.delete(this.miUrl+id);
    }catch(e){
      alert("Se produjo un error al eliminar");
    }
  }

  post(persona:any):Observable<any>{
    try{
    return this.http.post<any>(this.miUrl,persona);
    }catch(e){
      alert("Se produjo un error al guardar");
    }
  }
 
  put(id:number,persona:Persona):Observable<Persona>{
    try{
    return this.http.put<Persona>(this.miUrl + id,persona);
    }catch(e){
      alert("Se produjo un error al editar");
    }
  }

}
