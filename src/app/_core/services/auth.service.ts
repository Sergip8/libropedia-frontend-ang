import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable} from "rxjs";



import { LoginRequest, LoginResponse, RegistrationResponse } from '../../models/auth-models';
import { environment } from '../../../environments/environment.development';

const baseUrl = environment.ANGULAR_APP_API_URL;
export interface User{
  username: string
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endpoints: any = {
    signin: baseUrl+"Login",
    signup: baseUrl+"Register",
  };
  tokenKey = "token"
  
  


  private user = new BehaviorSubject<User | null>(null) 
  user$ = this.user.asObservable()


  updateUser(){
   
    this.user.next(this.getTokenUser())
  }
  getUser(){
    this.updateUser()
    return this.user.value
  }
  resetUser(){
    this.user.next(null)
  }

  constructor(private httpClient: HttpClient) { }

  signIn(data: LoginResponse): Observable<LoginRequest> {
    return this.httpClient.post<LoginRequest>(this.endpoints.signin, data)
  }
  signUp(data: RegistrationResponse){
    return this.httpClient.post<any>(this.endpoints.signup, data);
  }

  setToken(value: string) {
    localStorage.setItem(this.tokenKey, value);
}

getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
}

removeToken() {
    localStorage.removeItem(this.tokenKey);
}
decodeToken(){
  const token = this.getToken()
  if(token){
    const base64Url = token.split('.')[1]
    const base64 = base64Url?.replace(/_/g, '+').replace(/_/g, '+')
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => {
        return '%' + ('00'+ c.charCodeAt(0).toString(16)).slice(-2)
      }).join('')
    )
    return JSON.parse(jsonPayload)

  }
  else
  return null
}
getRole(){
  if (this.decodeToken())
  return this.decodeToken().role.split(",")
 return null
}
getEmail(){
  if (this.decodeToken()){
    console.log(this.decodeToken())
    return this.decodeToken().email
  }                             
 return null
}

getTokenUser():User | null{
  if (this.decodeToken()){
    const {email, nameid} = this.decodeToken()
    return {username: nameid, email: email}
  }
  return null
}
getUserId(){
  const userId = this.decodeToken()?.["unique_name"]
  if(userId)
    return userId
  return null
}


}
