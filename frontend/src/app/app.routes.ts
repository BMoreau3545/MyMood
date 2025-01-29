import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { SupervisorDashboardComponent } from './components/supervisor-dashboard/supervisor-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth/auth.guard';
import { roleGuard } from './guards/role/role.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'student', component: StudentDashboardComponent, canActivate: [authGuard, roleGuard], data: { roles: ['student'] } },
    { path: 'supervisor', component: SupervisorDashboardComponent, canActivate: [authGuard, roleGuard], data: { roles: ['supervisor'] } },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, roleGuard], data: { roles: ['admin'] } },
];
