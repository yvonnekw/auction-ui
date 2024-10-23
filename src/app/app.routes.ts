import {provideRouter, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {BuyNowComponent} from './buy-now/buy-now.component';
import {AuthGuard} from './guard/auth.guard';
import {SubmitBidComponent} from './submit-bid/submit-bid.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {HomepageComponent} from './home/homepage.component';
import {ProductListComponent} from './product-list/product-list.component';

let RegisterComponent;
export const routes: Routes = [
  //{ path: '', component: AppComponent },
  { path: '', component: HomepageComponent },
  //{ path: '', component: ProductListComponent },
  { path: 'buy-now', component: BuyNowComponent, canActivate: [AuthGuard] },
  { path: 'submit-bid', component: SubmitBidComponent, canActivate: [AuthGuard] },
  //{ path: 'register', component: RegisterComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
