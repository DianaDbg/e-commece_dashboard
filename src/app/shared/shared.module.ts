import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [SidebarComponent],
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    SidebarComponent,
    MatGridListModule,
    MatMenuModule
  ]
})
export class SharedModule { }
