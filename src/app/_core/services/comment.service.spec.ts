import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentResponse, CommentUpdateResponse, CommentUserPayload, CommentUserRequest } from '../../models/comment';
import { PaginatedData } from '../../models/book';

const mockCommentResponse = { idLibro: 1, idUsuario: 1, calificacion: 5, comentario: 'Excelente' };
const mockUpdateResponse = { idResena: 1, idUsuario: 1, calificacion: 4, comentario: 'Bueno' };
const mockPaginated: PaginatedData<CommentUserRequest> = { data: [], totalRecords: 0 };

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store comment', () => {
    service.storeComment(mockCommentResponse).subscribe(res => {
      expect(res).toEqual({ success: true });
    });
    const req = httpMock.expectOne(r => r.url.includes('StoreComment'));
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should update comment', () => {
    service.updateComment(mockUpdateResponse).subscribe(res => {
      expect(res).toEqual({ success: true });
    });
    const req = httpMock.expectOne(r => r.url.includes('UpdateComment'));
    expect(req.request.method).toBe('PUT');
    req.flush({ success: true });
  });

  it('should get user comments', () => {
    service.getUserComments(new CommentUserPayload()).subscribe(res => {
      expect(res).toEqual(mockPaginated);
    });
    const req = httpMock.expectOne(r => r.url.includes('GetUserComments'));
    expect(req.request.method).toBe('POST');
    req.flush(mockPaginated);
  });

  it('should delete comment', () => {
    service.deleteComment(1).subscribe(res => {
      expect(res).toEqual({ success: true });
    });
    const req = httpMock.expectOne(r => r.url.includes('DeleteComment'));
    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});