import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CatalogComponent } from './catalog.component';
import { ProductComponent } from './product/product.component';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent,
    ReviewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
