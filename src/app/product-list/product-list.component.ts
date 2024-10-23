import { Component, OnInit } from '@angular/core';
import { ProductControllerService } from '../services/product/services/product-controller.service';
import { ApiConfiguration } from '../services/shared/api-configuration';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {ProductResponse} from '../services/product/models/product-response';
import {provideRouter, Router, RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../app.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {BuyNowComponent} from '../buy-now/buy-now.component';
import {SubmitBidComponent} from '../submit-bid/submit-bid.component';

interface Product {
  id: number;
  name: string;
  price: number;
  auction: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: ProductResponse[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private productService: ProductControllerService,
    private apiConfig: ApiConfiguration, private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
  fetchProducts(): void {
    // Use the product service to fetch products
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        this.errorMessage = 'Error fetching products: ' + error.message;
      }
    );
  }

  submitBid(productId?: number): void {
    console.log(`Submitting bid for product ID: ${productId}`);
    this.router.navigate(['/submit-bid']);
  }

  buyNow(productId?: number): void {
    console.log(`Buying product ID: ${productId}`);
    this.router.navigate(['/buy-now']);
  }
}

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'buy-now', component: BuyNowComponent },
  { path: 'submit-bid', component: SubmitBidComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
})
  .then(() => console.log('Bootstrap successful'))
  .catch(err => console.error('Error during bootstrap:', err));
