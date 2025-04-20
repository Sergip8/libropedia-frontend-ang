import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardModel } from '../../shared/card/card-model';
import { BookFilterParams, PaginatedData, bookDetail } from '../../models/book';

const mockBooks: CardModel[] = [
  { idLibro: '1', titulo: 'Libro 1', autor: 'Autor 1', categoria: 'Ficción', portadaUrl: '', cardType: 'catalog' }
];
const mockPaginated: PaginatedData<CardModel> = { data: mockBooks, totalRecords: 1 };
const mockBookDetail: bookDetail = {
  idLibro: 1, titulo: 'Libro 1', isbn: '123', anioPublicacion: 2020, editorial: 'Editorial', resumen: '', portadaUrl: '',
  autor: { idAutor: 1, nombre: '', apellido: '', nombreCompleto: '', biografia: '', nacionalidad: '' },
  categoria: { idCategoria: 1, nombre: '', descripcion: '' },
  estadisticas: { calificacionPromedio: 5, totalResenas: 1, cincoEstrellas: 1, cuatroEstrellas: 0, tresEstrellas: 0, dosEstrellas: 0, unaEstrella: 0 },
  resenasRecientes: [], librosRelacionados: []
};

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch top books', () => {
    service.getTopBooks(1).subscribe(res => {
      expect(res).toEqual(mockBooks);
    });
    const req = httpMock.expectOne(r => r.url.includes('GetBookTopQualifications'));
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  it('should fetch filtered books', () => {
    service.getFilterBooks(new BookFilterParams()).subscribe(res => {
      expect(res).toEqual(mockPaginated);
    });
    const req = httpMock.expectOne(r => r.url.includes('GetAllBooksPaginated'));
    expect(req.request.method).toBe('POST');
    req.flush(mockPaginated);
  });

  it('should fetch book details', () => {
    service.getBookDetails(1).subscribe(res => {
      expect(res).toEqual(mockBookDetail);
    });
    const req = httpMock.expectOne(r => r.url.includes('GetBookDetail'));
    expect(req.request.method).toBe('GET');
    req.flush(mockBookDetail);
  });
});