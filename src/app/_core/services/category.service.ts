import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { CardModel } from "../../shared/card/card-model";

import { SelectValues } from "../../shared/select/selectModel";

const baseUrl = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories( params: {search: string, limit: number}){
    return this.http.post<SelectValues[]>(baseUrl +"GetCategoryFilter/",params); // Reemplaza con la URL de tu API
  }
  
}
