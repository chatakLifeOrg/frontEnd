import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

export const routes: Routes = [{
  path: '',
  pathMatch: 'prefix',
  redirectTo: 'homePage'
}, {
  path: 'homePage',
  component: HomePageComponent,
  title: 'HomePage',
},
{
  path: 'homePage',
  data: { breadcrumb: 'Home' },
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
