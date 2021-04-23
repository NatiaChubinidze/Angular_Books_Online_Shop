import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    HighchartsChartModule
  ]
})
export class AdminPanelModule { }
