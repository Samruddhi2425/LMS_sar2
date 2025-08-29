import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BookRatingResult {
  average_rating: number;
  total_ratings: number;
}

export interface RateBookRequest {
  userId: number;
  bookId: number;
  ratings: number;
}
@Injectable({
  providedIn: 'root'
})
export class GetbooksService {
  private apiUrl = "https://localhost:7252/api/Books/ViewAllBooks";
  private recommendUrl = "https://localhost:7252/api/IssueBook/recommend-books";
  private genreUrl = "https://localhost:7252/api/Category/";
  private uploadUrl = "https://localhost:7252/api/Books/AddBook";

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRecentBooks(): Observable<any[]> {
    return this.http.get<any[]>("https://localhost:7252/api/Books/RecentBooks")
  }

  getRecommendedBooks(userId: number, searchTerm: string = ''): Observable<any[]> {
  return this.http.get<any[]>(`${this.recommendUrl}`, {
    params: {
      userId: userId.toString(),
      searchTerm: searchTerm || ''
    }
  });
}

  getBooksExcluding(excludeBookIds: string): Observable<any[]> {
    const url = `${this.apiUrl}?excludeBookIds=${excludeBookIds}`;
    return this.http.get<any[]>(url);
  }

 getBooksPaged(
  page: number,
  pageSize: number,
  excludeBookIds: number[] = [],
  searchTerm: string = '',
  userId: number | null = null  // ✅ New optional userId param
): Observable<any> {
  const params: any = {
    pageNumber: page,
    pageSize: pageSize,
    searchTerm: searchTerm || ''
  };

  if (excludeBookIds && excludeBookIds.length > 0) {
    params.excludeBookIds = excludeBookIds.join(',');
  }

  // ✅ Add userId if available (only for logged-in users)
  if (userId !== null) {
    params.userId = userId;
  }

  return this.http.get<any>(`https://localhost:7252/api/Books/books-paged`, {
    params
  });
}



  getGenre(): Observable<any[]> {
    return this.http.get<any[]>(this.genreUrl + "ViewAllBooks");
  }

  addGenre(genre: any): Observable<any[]> {
    return this.http.post<any[]>(this.genreUrl + "AddGenre", genre);
  }

  uploadBook(bookData: any): Observable<any[]> {
    return this.http.post<any[]>(this.uploadUrl, bookData);
  }

  getBookById(bookId: any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7252/api/Books/${bookId}`);
  }

  updateBookData(bookData: any): Observable<any[]> {
    return this.http.put<any>(`https://localhost:7252/api/Books/${bookData.bookId}`, bookData);
  }

  ViewBookByGenre(genreId: number): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7252/api/Books/books-by-category/${genreId}`);
  }

  deleteGenre(Id: number): Observable<any[]> {
    return this.http.delete<any[]>(this.genreUrl + `delete/${Id}`);
  }

  getPopularBooks(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7252/api/Books/popularBook`);
  }

  getPopularBooksByGenre(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7252/api/Books/getBookByGenre`);
  }
  //most liked books
  getMostLikedBooks(): Observable<any[]> {
    const url = `https://localhost:7252/api/Books/likedBooks`;
    return this.http.get<any[]>(url);
  }

  rateBook(request: RateBookRequest): Observable<any> {
    const url = `https://localhost:7252/api/Books/rateBook`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, request, { headers });
  }
}
