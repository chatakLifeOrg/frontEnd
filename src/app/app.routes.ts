import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CategoryPageComponent } from './components/category/category.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
export const routes: Routes = [{
  path: '',
  pathMatch: 'prefix',
  loadComponent: () => import('./components/influencer-page/influencer-page.component').then(mod => mod.InfluencerPageComponent),
}, {
  path: 'homePage',
  loadComponent: () => import('./components/home-page/home-page.component').then(mod => mod.HomePageComponent),
  title: 'HomePage',
},
{
  path: 'homePage',
  data: { breadcrumb: 'Home' },
  title: 'HomePage',
  children: [
    {
      path: 'category',
      pathMatch: 'prefix',
      title: 'Category',
      loadComponent: () => import('./components/category/category.component').then(mod => mod.CategoryPageComponent)
    }, {
      path: 'category',
      data: { breadcrumb: 'Category' },
      children: [
        {
          path: 'product',
          pathMatch: 'prefix',
          title: 'Product',
          data: { breadcrumb: 'Product' },
          loadComponent: () => import('./components/product-page/product-page.component').then(mod => mod.ProductPageComponent)
        }
      ]
    },  {
      path: 'cart',
      loadComponent: () => import('./components/cart-page/cart-page.component').then(mod => mod.CartPageComponent),
      pathMatch: 'prefix',
      title: 'Cart',
      data: { breadcrumb: 'Cart' },
    }
  ],
},
// {
//   path: 'influencer',
//   data: { breadcrumb: 'influencer' },
//   title: 'Influencer',
//   loadComponent: () => import('./components/influencer-page/influencer-page.component').then(mod => mod.InfluencerPageComponent),
// }
];
