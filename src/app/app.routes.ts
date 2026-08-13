import { Routes } from '@angular/router';
import { ComparisonPage } from './features/comparison/pages/comparison/comparison-page';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/comparison/pages/comparison/comparison-page').then(c => c.ComparisonPage)
    }
];
