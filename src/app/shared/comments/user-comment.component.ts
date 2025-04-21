import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentUpdateResponse, CommentUserPayload, CommentUserRequest } from '../../models/comment';
import { CommentService } from '../../_core/services/comment.service';
import { PaginationComponent } from "../pagination/pagination";
import { CommonService } from '../../_core/services/common.service';
import { AuthService } from '../../_core/services/auth.service';
import { debounceTime, distinctUntilChanged, finalize, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AlertType } from '../alert/alert.type';
import { LoadingComponent } from "../loading/loading.component";
import { pageTransition } from '../utils/animations';
import { CommentComponent } from '../../public/views/details/comment.component';
import { ResenaDetalle } from '../../models/book';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent, RouterLink, LoadingComponent, CommentComponent],
  animations: [pageTransition],
  template: `
   <div class="max-w-4xl mx-auto p-4">
      <h2 class="text-xl font-semibold mb-4">Mis Reseñas</h2>
      <div *ngIf="comments.length === 0 && !loading">No tienes reseñas aún.</div>
      <app-loading *ngIf="loading"></app-loading>
      <div *ngFor="let review of comments" class="flex gap-4 mb-6 bg-white rounded-xl shadow p-4" [@pageTransition]>
        <img [src]="review.portadaUrl" alt="portada" class="w-24 h-32 object-cover rounded-md" />
        
        <div class="flex-1">
          <a [routerLink]="'/details/'+review.idLibro" class="text-lg font-bold">{{ review.titulo }}</a>
          <p class="text-sm text-gray-600">{{ review.editorial }} • {{ review.anioPublicacion }}</p>
          
          <div class="mt-2 text-yellow-500 font-medium">
            ★ {{ review.calificacion }} / 5
          </div>
          
          <p class="mt-2 text-sm text-gray-700 italic" [innerHTML]="review.comentario"></p>
          <p class="text-xs text-gray-400 mt-1">{{ review.fechaResena | date:'medium' }}</p>
          <div *ngIf="editingReviewId === review.idResena">
                  
      
                   <div class="mb-2">
                  
    
                      <app-comment (onCancel)="cancelEdit()" [okButtonName]="'Guardar'" [isCancelButton]="true" [setInputRating]="review.calificacion" [setComment]="editedCommentContent" [showCommentForm]="editingReviewId === review.idResena" (commentSubmitted)="saveEdit(review, $event)"></app-comment>
    
    
    
                  </div>
      
              
                </div>

        </div>
        <div class="flex gap-2 h-10">
          <button (click)="editReview(review)" class="cursor-pointer px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            📝 Editar
          </button>
          <button (click)="deleteReview(review.idResena)" class=" cursor-pointer px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
            🗑️ Eliminar
          </button>
        </div>
      </div>

      <app-pagination></app-pagination>
    </div>
  `
})
export class ReviewListComponent implements OnInit {
    commentParams = new CommentUserPayload()
    comments: CommentUserRequest[] = []
     readonly alertType = AlertType;
      alert = this.alertType.Info
      showAlert = false
      alertMsg = ""
    loading = false
    editingReviewId = 0
    editedCommentContent = ""
     updatedData!: CommentUpdateResponse
     userId!: number
  constructor(private commentService: CommentService, private commonService: CommonService, private authService: AuthService) {
    this.userId = authService.getUserId()
  }
  ngOnInit() {
    this.commentService.updateFilter({userId: this.authService.getUserId()})
     this.commentService.commentPayload$
        .pipe(
          distinctUntilChanged(),
          switchMap(filter => {this.comments = []; this.loading =true; return this.commentService.getUserComments(filter)}) 
        )
        .subscribe(data => {
          console.log(data);
          this.comments = data.data;
          this.loading = false
          this.commonService.updatePagination({ count:  data.totalRecords});
        });
  }

  
  editReview(review: CommentUserRequest
  ) {
    this.editingReviewId = review.idResena
    // this.updatedData = {
    //     idResena: review.idResena,
    //     comentario: comment.comment,
    //     idUsuario: this.userId,
    //     calificacion: comment.rating
    //   };
    // Aquí puedes navegar a un formulario o abrir un modal
    console.log('Editar reseña:', review);
  }

  deleteReview(id: number) {
    if (confirm('¿Estás seguro de eliminar esta reseña?')) {
      this.commentService.deleteComment(id).pipe(
                finalize (() => {
                  this.commonService.updateAlert({
                    message: this.alertMsg,
                    alertType: this.alert,
                    show: true
                   
                  })
                })
              ).subscribe({
            next: data => {
              console.log(data)
                if(data.isError){
                  this.alert = AlertType.Danger
                }else{
                  this.alert = AlertType.Success
                   this.comments = this.comments.filter(c => c.idResena != id)
                }
                this.alertMsg = data.message

            },error: e => {
              this.alert = AlertType.Danger
              this.alertMsg = e.error.message
            }
    })
  }

}
saveEdit( review: CommentUserRequest,  comment: { rating: number, comment: string }): void {
  
console.log(comment)
  if (!comment.comment.trim()) {
    console.error("El comentario no puede estar vacío.");
    return;
  }
  if (comment.rating < 1 || comment.rating > 5) {
      console.error("La calificación debe estar entre 1 y 5.");
      return;
  }

   this.updatedData = {
    idResena: this.editingReviewId,
    comentario: comment.comment,
    idUsuario: this.userId,
    calificacion: comment.rating
  };
  this.updateComment(this.updatedData)
 
  review.comentario = comment.comment
  review.calificacion = comment.rating

  this.cancelEdit(); 
}

cancelEdit(): void {
  // Limpiar las variables de estado de edición
  this.editingReviewId = 0;
  this.editedCommentContent = '';
}
updateComment(comment: CommentUpdateResponse){
  this.commentService.updateComment(comment).pipe(
        finalize (() => {
          this.commonService.updateAlert({
            message: this.alertMsg,
            alertType: this.alert,
            show: true
          })
        })
      ).subscribe({
        next: data => {
            if(data.isError){
              this.alert = AlertType.Info
             
              
            }else{
              this.alert = AlertType.Success
            }
            this.alertMsg = data.message
            
        },error: e => {
          console.log(e)
          this.alert = AlertType.Danger
          this.alertMsg = e.error.message
        }
      })
}
}
