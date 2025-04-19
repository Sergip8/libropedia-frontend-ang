import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgClass, NgFor, NgIf } from "@angular/common";
import { QuillModule } from "ngx-quill";



@Component({
    selector: 'app-comment',
    imports: [FormsModule, NgClass, NgFor, NgIf, NgClass,  QuillModule,],
    template: `
     
        <div class="space-y-4">
          <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tu calificación:</label>
              <div class="flex space-x-1">
                  <button *ngFor="let star of [1, 2, 3, 4, 5]"
                          (click)="setRating(star)"
                          type="button"
                          class="p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-yellow-400 transition-colors duration-150"
                          [ngClass]="{
                              'text-yellow-400 hover:text-yellow-500': star <= newUserRating,
                              'text-gray-300 hover:text-gray-400': star > newUserRating
                          }">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                  </button>
              </div>
          </div>
          <div>
              <label for="commentEditor" class="block text-sm font-medium text-gray-700 mb-1">Comentario:</label>
              <quill-editor id="commentEditor"
                            [(ngModel)]="newCommentContent"
                            [modules]="quillConfig"
                            format="html"
                            class="bg-white w-full rounded-md shadow-sm border border-gray-300">
              </quill-editor>
               <p class="mt-1 text-xs text-gray-500">Puedes usar negrita, cursiva, listas y más.</p>
          </div>
          <div class="text-right flex gap-3 justify-end">
              <button (click)="submitComment()"
                      type="button"
                      [disabled]="newUserRating === 0 || !newCommentContent || newCommentContent.trim() === '<p><br></p>' || newCommentContent.trim() === ''"
                      class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  {{okButtonName}}
              </button>
              <button *ngIf="isCancelButton" (click)="onCancel.emit()"
                      type="button"
                      [disabled]="newUserRating === 0 || !newCommentContent || newCommentContent.trim() === '<p><br></p>' || newCommentContent.trim() === ''"
                      class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  Cancelar
              </button>
          </div>
        </div>
   
    `,
    styles: [`    
    `]
})
  export class CommentComponent implements OnInit {

    newUserRating: number = 0; 
    newCommentContent: string = '';
    quillConfig = {
        toolbar: [
            ['bold', 'italic', 'underline'],      
            // ['link'],                               
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            // ['clean']                              
        ],
        placeholder: 'Escribe tu reseña aquí...', 
        theme: 'snow' // Tema estándar de Quill
    };
    @Input() showCommentForm: boolean = false; 
    @Output() commentSubmitted = new EventEmitter<{ rating: number, comment: string }>();
    @Output() onCancel = new EventEmitter()
    @Input() setComment = ""
    @Input() setInputRating!: number
    @Input() okButtonName = "Enviar Reseña"
    @Input() isCancelButton = false
    constructor(){}
  ngOnInit(): void {
    if(this.setComment != "")
      this.newCommentContent = this.setComment
    if(this.setInputRating)
      this.newUserRating = this.setInputRating
    
  }
  submitComment(): void {
    // Validación básica
    if (this.newUserRating === 0 || !this.newCommentContent || this.newCommentContent.trim() === '<p><br></p>' || this.newCommentContent.trim() === '') {
      alert('Por favor, selecciona una calificación y escribe un comentario.'); // O usar un sistema de notificaciones más elegante
      return;
    }
    console.log({
      rating: this.newUserRating,
      comment: this.newCommentContent // El contenido HTML del editor Quill
    })
    // Emitir el evento al componente padre
    this.commentSubmitted.emit({
      rating: this.newUserRating,
      comment: this.newCommentContent // El contenido HTML del editor Quill
    });
    
    // Limpiar el formulario después de enviar
    this.newUserRating = 0;
    this.newCommentContent = '';
    this.onCancel.emit() // Opcional: ocultar el formulario tras enviar
    // Aquí podrías añadir una notificación de éxito
  }
  setRating(rating: number): void {
    this.newUserRating = rating;
  }

  }