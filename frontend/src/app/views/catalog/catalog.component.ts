import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductInterface } from '../../models/catalog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public catalog: ProductInterface[];
  public selectProduct: ProductInterface;
  public preloader = true;
  public imgUrl = environment.url;

  constructor(
    public readonly productService: ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.preloader = false;
      this.catalog = data;
    });
  }

  /**
   * Open product modal
   * @param {any} content
   * @param {ProductInterface} product
   */
  public openProduct(content: any, product: ProductInterface) {
    this.selectProduct = product;
    this.modalService.open(content, {size: 'lg'});
  }

}
