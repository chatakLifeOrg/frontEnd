import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'prefix',
  redirectTo: 'homePage/product'
}, {
  path: 'homePage',
  component: HomePageComponent,
  title: 'HomePage',
  data: { breadcrumb: 'Home' },
},
{
  path: 'homePage',
  children: [
    {
      path: 'product',
      component: ProductPageComponent,
      pathMatch: 'prefix',
      title: '',
      data: { breadcrumb: 'Product' },
    }
  ],
  title: 'HomePage | Product'
}
];
