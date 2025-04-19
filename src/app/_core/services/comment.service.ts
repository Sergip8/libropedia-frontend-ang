import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { CardModel } from "../../shared/card/card-model";

import { SelectValues } from "../../shared/select/selectModel";
import { CommentResponse, CommentUpdateResponse, CommentUserPayload, CommentUserRequest } from "../../models/comment";
import { PaginatedData } from "../../models/book";
import { BehaviorSubject } from "rxjs";

const baseUrl = environment.ANGULAR_APP_API_URL;
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

   private commentPayload = new BehaviorSubject<CommentUserPayload>(new CommentUserPayload());
   commentPayload$ = this.commentPayload.asObservable(); 
  
    updateFilter(updatedFilter: Partial<CommentUserPayload>) {
      const currentFilter = this.commentPayload.value;
      this.commentPayload.next({ ...currentFilter, ...updatedFilter });
    }

  storeComment( comment: CommentResponse){
    return this.http.post<any>(baseUrl +"StoreComment/",comment); 
  }

  updateComment( comment: CommentUpdateResponse){
    return this.http.put<any>(baseUrl +"UpdateComment/",comment);
  }
  getUserComments( comment: CommentUserPayload){
    return this.http.post<PaginatedData<CommentUserRequest>>(baseUrl +"GetUserComments/",comment); 
  }
  deleteComment( commentId: number){
    return this.http.delete<any>(baseUrl +"DeleteComment/"+commentId); 
  }
}
