import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  //users:UserInterface[]=[]
  url="http://localhost:3000/movies"
  constructor(private http:HttpClient) 
  
  { }

  getUser()
  {
    //this.url="http://localhost:3000/users"

    //console.log(this.http.get(this.url.value));
    return this.http.get(this.url,{responseType:'json'})
    //return this.http.get('/users')
  }

  saveUser(user:UserInterface):Observable<UserInterface>{

    //this.url="http://localhost:3000/users"

    return this.http.post<UserInterface>(this.url,user)

  }

  getUserToUpdateValue(id:number):Observable<UserInterface>{
    return this.http.get<UserInterface>(this.url+"/"+id)
  }
  
  updateUserValue(user:UserInterface){
    return this.http.put<UserInterface>(this.url+"/"+user.id,user)
  }

  deleteUser(id:number)
  {
    return this.http.delete<UserInterface>(this.url+"/"+id)
  }
}
