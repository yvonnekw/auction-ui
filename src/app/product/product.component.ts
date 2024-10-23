import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  title: string = 'product page';
  imgURL: string = 'https://www.istockphoto.com/photo/woman-hands-putting-warm-neutral-sweater-into-cardboard-box-seasonal-storage-method-gm1941454161-556633214?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fclothing&utm_medium=affiliate&utm_source=unsplash&utm_term=clothing%3A%3Aaffiliate-collections%3Acontrol';
  isDisabled: boolean = true;
  isActive: boolean = false;

  users: Array<string> = ['Sam', 'Jon', 'Smith', 'Raj'];
}
