export interface CardModel {
    idLibro?: string;
    titulo: string;
    anioPublicacion?: number;
    autor: string;
    idAutor?: number;
    idCategoria?: number;
    categoria: string;
    rating?: number;
    portadaUrl: string;
    cardType: 'top' | 'author' | 'catalog';
    tags?: string[];
    resumen ?: string;
  }