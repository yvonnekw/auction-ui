import { Component, OnInit } from '@angular/core';
import {CommonModule, NgFor, NgIf} from '@angular/common'; // <-- Import CommonModule
import { ProductControllerService } from '../services/product/services/product-controller.service';
//import { ProductService } from '../../services/shared/product.service'; // Update with the correct path
import { ProductResponse } from '../services/product/models/product-response';
import {Router, RouterModule} from '@angular/router';
import {ApiConfiguration} from '../services/shared/api-configuration';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  products: ProductResponse[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  // Inject the ProductControllerService
  constructor(private productControllerService: ProductControllerService,  private apiConfig: ApiConfiguration, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productControllerService.getAllProducts().subscribe({
      next: (response: ProductResponse[]) => {
        console.log('Products fetched:', response);
        this.products = response; // Store the response in the products array
        this.isLoading = false; // Update loading state
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false; // Update loading state
      }
    });
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
