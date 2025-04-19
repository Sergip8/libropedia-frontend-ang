import { CardModel } from "../shared/card/card-model";

export interface Book {
    idLibro: number;
    titulo: string;
    autor: string;
    categoria: string;
    rating: number;
    portadaUrl: string;
  }

  export class BookFilterParams {
    titulo: string = '';
    idAutor: number = 0;
    idCategoria: number= 0;
    sortBy: string = '';
    direcction: string = '';
    limite: number = 10;
    offset : number = 0;
  }
  export interface PaginatedData<T> {
    data: T[];
    totalRecords: number;
  }

  export interface bookDetail {
    idLibro: number;
    titulo: string;
    isbn: string;
    anioPublicacion: number;
    editorial: string;
    resumen: string;
    portadaUrl: string;
    autor: AutorInfo;
    categoria: CategoriaInfo;
    estadisticas: EstadisticasResenas;
    resenasRecientes: ResenaDetalle[];
    librosRelacionados: CardModel[];
  }
  
  export interface AutorInfo {
    idAutor: number;
    nombre: string;
    apellido: string;
    nombreCompleto: string;
    biografia: string;
    nacionalidad: string;
  }
  
  export interface CategoriaInfo {
    idCategoria: number;
    nombre: string;
    descripcion: string;
  }
  
  export interface EstadisticasResenas {
    calificacionPromedio: number;
    totalResenas: number;
    cincoEstrellas: number;
    cuatroEstrellas: number;
    tresEstrellas: number;
    dosEstrellas: number;
    unaEstrella: number;
  }
  
  export interface ResenaDetalle {
    idResena: number;
    calificacion: number;
    comentario: string;
    fechaCreacion: string; // Puede ser `Date` si estás trabajando con objetos Date en JS
    usuario: UsuarioResena;
  }
  
  export interface UsuarioResena {
    idUsuario: number;
    nombreUsuario: string;
    nombreCompleto: string;
  }
  
  export interface LibroRelacionado {
    idLibro: number;
    titulo: string;
    portadaUrl: string;
    autor: string;
    categoria: string;
    calificacionPromedio: number;
  }