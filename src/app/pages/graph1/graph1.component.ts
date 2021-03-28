import { Component } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph1.component.html',
  styles: [],
})
export class Graph1Component {
  labels1 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  data1 = [[350, 450, 100]];
}
