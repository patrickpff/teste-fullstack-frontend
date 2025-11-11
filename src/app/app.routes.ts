import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { EntityComponent } from './entity/entity.component';
import { ListComponent } from './entity/list/list.component';
import { FormComponent } from './entity/form/form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { 
        path: 'entity', 
        component: EntityComponent,
        children: [
            { path: '', component: ListComponent },
            { path: 'new', component: FormComponent },
            { path: 'edit/:id', component: FormComponent }
        ]
    },
    { path: '**', redirectTo: '/login' } // Fallback
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}