import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import  { AppNavbar } from './navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {ProductComponent} from './product/product.component';
import {ProductListComponent} from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { httpTokenInterceptor } from './interceptor/http-token.interceptor';
//import {KeycloakService} from './services/keycloak/keycloak.service';
import {HomepageComponent} from './home/homepage.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    AppNavbar,
    HeaderComponent,
    ProductComponent,
    ProductListComponent,
    HomepageComponent,
    RouterOutlet,
    KeycloakAngularModule,
    //HttpClientModule
  ],
  /*
  providers: [
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
    KeycloakService  // Use the new functional interceptor
  ],*/
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title: string = 'This loaded dynamically';
}
