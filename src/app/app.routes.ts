import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  pathMatch: 'prefix',
  redirectTo: 'homePage'
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
      loadComponent: () => import('./components/category/category.component').then(mod => mod.CategoryComponent)
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
    }
  ],
},
{
  path: 'influencer',
  data: { breadcrumb: 'influencer' },
  title: 'Influencer',
  loadComponent: () => import('./components/influencer-page/influencer-page.component').then(mod => mod.InfluencerPageComponent),
}
];
