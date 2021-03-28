import { Component, Input } from '@angular/core';
// import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [],
})
export class DonutComponent {
  @Input() title = 'Sin Título';
  @Input('labels') doughnutChartLabels: Label[] = [
    'Default1',
    'Default2',
    'Default3',
  ];
  @Input('data') doughnutChartData: MultiDataSet = [[33, 33, 33]];

  // public doughnutChartLabels: Label[] = [
  //   'Download Sales',
  //   'In-Store Sales',
  //   'Mail-Order Sales',
  // ];
  // public doughnutChartData: MultiDataSet = [[350, 450, 100]];

  public colors: Color[] = [
    { backgroundColor: ['#3a8bf7', '#07d79c', '#745bf2'] },
  ];
  // public colors: Color[] = [
  //   { backgroundColor: ['#398bf7', '#95f0ce', '#eb99f8'] },
  // ];
}
