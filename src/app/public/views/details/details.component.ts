import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardComponent } from "../../../shared/card/card.component";
import { BookService } from '../../../_core/services/book.service';
import { bookDetail, BookFilterParams, ResenaDetalle } from '../../../models/book';
import { CardModel } from '../../../shared/card/card-model';
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../_core/services/auth.service';
import { CommonService } from '../../../_core/services/common.service';
import { AlertType } from '../../../shared/alert/alert.type';
import { CommentResponse, CommentUpdateResponse } from '../../../models/comment';
import { CommentService } from '../../../_core/services/comment.service';
import { finalize, raceWith } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  

  isTokenValid: boolean = false;
  userId!: number
  showCommentForm: boolean = false; 
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  editingReviewId!: number ;
  editedCommentContent: string = '';
  editedRating: number = 0;
  updatedData!: CommentUpdateResponse
  
 
  filterBooks: BookFilterParams = new BookFilterParams();
  book!: bookDetail ;

  constructor(private bookService: BookService, 
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService, 
    private commonService: CommonService,
    private commentService: CommentService) { 
    this.isTokenValid = !!this.authService.getToken();
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        this.getBookDetails(id);
      }
    });
    console.log(this.isTokenValid, this.userId)
  }
  
  getBookDetails(id: string) {
    this.bookService.getBookDetails(Number(id)).subscribe({
      next: (response) => {
        this.book = response;
        this.book.librosRelacionados.map(r => r.cardType= "catalog"); ;
        console.log(this.book);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getStarRating(rating: number, interactive: boolean = false): string[] {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars.push('★'); // Estrella llena
      } else {
        stars.push('☆'); // Estrella vacía
      }
    }
    return stars;
  }
  
  get roundedAverageRating(): string {
    return this.book?.estadisticas?.calificacionPromedio.toFixed(1) ?? 'N/A';
  }
  
  onComment() {
    if(this.isTokenValid && this.userId){

      this.showCommentForm = !this.showCommentForm
    }else{
      this.commonService.updateAlert({
        message: 'Debes iniciar sesión para dejar un comentario',
        alertType: AlertType.Warning,
        show: true
      })
    }


  }
  commentSubmitted(comment: { rating: number; comment: string; }) {
    this.showCommentForm = false
    console.log(comment);
    if(this.isTokenValid && this.userId){
      const cm: CommentResponse = {
        idLibro: this.book.idLibro,
        idUsuario: this.userId,
        calificacion: comment.rating,
        comentario: comment.comment 
    }
    this.storeComment(cm)
  }
}
storeComment(comment: CommentResponse){
  this.commentService.storeComment(comment).pipe(
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
              this.alert = AlertType.Danger
              
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
startEditing(review: any): void {

  this.editingReviewId = review.idResena;
  this.editedCommentContent = review.comentario;
}

saveEdit( review: ResenaDetalle,  comment: { rating: number, comment: string }): void {
  

  if (!this.editedCommentContent.trim()) {
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


}
