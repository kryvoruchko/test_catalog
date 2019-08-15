import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../../models/catalog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: ProductInterface;
  @Input() modal: any;
  public imgUrl = environment.url;
}
