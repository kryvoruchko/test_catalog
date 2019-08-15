import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../environments/environment';
import {
  ProductCreateReviewInterface,
  ProductInterface,
  ProductReviewInterface
} from '../models/catalog';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.url;

  constructor(
    private _http: HttpClient
  ) {
  }

  /**
   * Get products
   * @returns {Observable<ProductInterface[]>}
   */
  public getProducts(): Observable<ProductInterface[]> {
    return this._http.get<ProductInterface[]>(this.url + 'api/products/');
  }

  /**
   * Get product reviews
   * @param {number} id
   * @returns {Observable<ProductReviewInterface[]>}
   */
  public getProductReview(id: number): Observable<ProductReviewInterface[]> {
    return this._http.get<ProductReviewInterface[]>(this.url + 'api/reviews/' + id);
  }

  /**
   * Create product review
   * @param {ProductCreateReviewInterface} data
   * @param {number} id
   * @returns {Observable<any>}
   */
  public createProductReview(data: ProductCreateReviewInterface, id: number): Observable<any> {
    return this._http.post(this.url + 'api/reviews/' + id, data);
  }
}
