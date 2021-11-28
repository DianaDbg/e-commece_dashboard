import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent {
  @ViewChild('chart')
  chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Earnings',
          data: [310, 400, 280, 510, 420, 109, 100, 122, 123, 313, 133, 638],
        },
      ],

      chart: {
        height: 400,
        with: '50%',
        toolbar: {
          show: false,
        },
        type: 'area',
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: ['#E6A20E'],
        width: 2,
        dashArray: 0,
      },

      xaxis: {
        datetimeFormatter: 'day',
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },

      yaxis: {
        show: false,
        showAlways: false,
      },

      grid: {
        show: true,
        borderColor: '#DDDFE5',
        strokeDashArray: 4,
        position: 'back',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },

      tooltip: {
        enabled: false,
        followCursor: true,
        intersect: false,
        inverseOrder: false,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: 'Lato',
        },
        onDatasetHover: {
          highlightDataSeries: true,
        },
        x: {
          show: false,
        },
        y: {
          formatter: undefined,
          title: {
            formatter: (seriesName: any) => seriesName + ' $',
          },
        },
        marker: {
          show: true,
        },
        fixed: {
          enabled: false,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0,
        },
      },

      fill: {
        type: 'gradient',
        colors: ['#E6A20E'],
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.9,
          color: '#E6A20E',
          stops: [0, 90, 100],
        },
      },
    };
  }

  public generateData(
    _baseval: number,
    count: number,
    yrange: { max: number; min: number }
  ) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      _baseval += 86400000;
      i++;
    }
    return series;
  }

  ngOnInit(): void {}
}
