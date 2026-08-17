import { Routes } from '@angular/router';
import { ComparisonPage } from './features/comparison/pages/comparison/comparison-page';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                redirectTo: 'comparison',
                pathMatch: 'full'
            },
            {
                path: 'comparison',
                loadComponent: () => import('./features/comparison/pages/comparison/comparison-page').then(c => c.ComparisonPage)
            }
        ]
    },
];
