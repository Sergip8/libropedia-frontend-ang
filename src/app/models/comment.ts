export interface CommentResponse {
    idLibro: number
    idUsuario: number
    calificacion: number
    comentario: string
}
export interface CommentUpdateResponse {
    idResena: number
    idUsuario: number
    calificacion: number
    comentario: string
}
export interface CommentUserRequest {
    idResena: number;
    calificacion: number;
    comentario: string;
    fechaResena: Date;
    idLibro: number;
    titulo: string;
    anioPublicacion: number;
    editorial: string;
    portadaUrl: string;
}
export class CommentUserPayload {
    userId: number = 0;
    limit: number = 10;
    offset: number = 0;
}