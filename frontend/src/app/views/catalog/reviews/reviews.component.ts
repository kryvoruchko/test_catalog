import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ProductReviewInterface } from '../../../models/catalog';
import { AuthService } from '../../../services/auth.service';
import { catchError } from 'rxjs/internal/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/index';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() productId: number;
  @Input() modal: any;

  public reviews: ProductReviewInterface[];
  public preloader = true;
  public submitProcess = false;
  public submitted = false;
  public createReviewForm: FormGroup;

  constructor(
    public authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService,
    private _productService: ProductService
  ) { }

  ngOnInit() {
    this.createReviewForm = this._formBuilder.group({
      rate: [null, Validators.required],
      text: ['', Validators.required]
    });
    this._productService.getProductReview(this.productId).subscribe(data => {
      this.preloader = false;
      this.reviews = data;
    });
  }

  /**
   * Create review
   */
  public createReview() {
    this.submitted = true;

    if (this.createReviewForm.valid) {
      this.submitProcess = true;
      this._productService.createProductReview(this.createReviewForm.value, this.productId)
        .pipe(catchError(error => {
          this.submitProcess = false;
          if(error.status === 500) {
            this._toastrService.error('Oops, something went wrong');
          }
          return throwError(error);
        }))
        .subscribe((data) => {
          this.reviews.push({
            id: data.review_id,
            product: this.productId,
            created_at: new Date(),
            created_by: {
              username: this.authService.username,
            },
            rate: this.createReviewForm.value['rate'],
            text: this.createReviewForm.value['text']
          });
          this._toastrService.success('Review created');
          this.submitProcess = false;
          this.submitted = false;
          this.createReviewForm.reset();
        });
    }
  }

  /**
   * Router to link
   * @param {string} link
   */
  public routingToLink(link: string) {
    this.modal.dismiss();
    this._router.navigate([link]);
  }

}
