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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

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
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
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
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
  ],
})
export class SharedModule {}
