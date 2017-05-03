export function lineOptions(xData, seriesNames, series, title, showPercent) {
  let seriesData = seriesNames.map((item, i) => {
    let label
    if (showPercent) {
      label = {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c} %'
        }
      }
    } else {
      label = {
        normal: {
          show: true,
          position: 'top'
        }
      }
    }
    return {
      name: item,
      type: 'line',
      smooth: true,
      label,
      lineStyle: {
        normal: {
          width: 1
        }
      },
      itemStyle: {
        normal: {}
      },
      areaStyle: {
        normal: {
          opacity: 0
        }
      },
      data: series[i]
    }
  })

  return {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: seriesNames,
      orient: 'horizontal',
      align: 'left',
      left: 35
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: false
        }
      }
    },
    grid: {
      // top: seriesNames.length * 24 + 20,
      top: 24 + 20,
      bottom: 50,
      right: 40,
      left: 40,
      containerLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      inverse: true,
      data: xData,
      axisLabel: {
        textStyle: {
          color: '#858e99',
          fontSize: 10
        }
      }
    },
    yAxis: {
      type: 'value',
      // nameTextStyle: {
      //   fontSize: 10
      // },
      axisLabel: {
        textStyle: {
          color: '#858e99',
          fontSize: 10
        }
      }
    },
    series: seriesData
  }
}

export function pieOptions(title, data) {
  return {
    title: {
      text: title,
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
}