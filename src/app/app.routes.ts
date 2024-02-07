import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CategoryComponent } from './components/category/category.component';

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
  title: 'HomePage',
  children: [
    {
      path: 'category',
      component: CategoryComponent,
      pathMatch: 'prefix',
      title: 'Category',
    },{
      path:'category',
      data: { breadcrumb:'Category' },
      children: [
        {
          path: 'product',
          component: ProductPageComponent,
          pathMatch: 'prefix',
          title: 'Product',
          data: { breadcrumb: 'Product' },
        }
      ]
    }
  ],
},
];
