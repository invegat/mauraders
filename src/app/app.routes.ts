import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { DiscoveriesComponent } from './discoveries';
import { DataResolver } from './app.resolver';
import { SkeletonComponent } from './skeleton';
import { AlchemistComponent } from './alchemist';
import { WitchComponent } from './witch';
import { CalculateMaxComponent  } from './calculateMax';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'discoveries', component: DiscoveriesComponent },
  { path: 'skeleton', component: SkeletonComponent},
  { path: 'alchemist', component: AlchemistComponent},
  { path: 'witch', component: WitchComponent},
  { path: 'calculateMax', component: CalculateMaxComponent},
  { path: 'about', component: AboutComponent },
  { path: '**', component: NoContentComponent },
];
