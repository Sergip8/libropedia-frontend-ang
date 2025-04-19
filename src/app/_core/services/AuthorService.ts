import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { CardModel } from "../../shared/card/card-model";
import { SelectValues } from "../../shared/select/selectModel";


const baseUrl = environment.ANGULAR_APP_API_URL;
@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthors( params: {search: string, limit: number}) {
    return this.http.post<SelectValues[]>(baseUrl +"GetAuthorFilter/",params); // Reemplaza con la URL de tu API
  }
}
