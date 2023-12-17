import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { BarComponent } from './pages/bar/bar.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';



const routes: Routes = [
  
  {path: '',component:HomeComponent}, 

  {path: 'login', component:LoginComponent}, 
  {path: 'reserva', component:ReservasComponent}, 
  {path: 'perfil', component:PerfilComponent}, 
  {path: 'registro', component:RegistroComponent},
  {path: 'bar/:id', component:BarComponent},
  {path: 'menu', component:MenuComponent},
  {path: 'shop', component:ShopComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
