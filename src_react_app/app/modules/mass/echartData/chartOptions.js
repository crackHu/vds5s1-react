let legendData = ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他'],
seriesName = ['访问来源', '访问来源'],
seriesData = [
  [{
    value: 335,
    name: '直达',
    selected: true
  }, {
    value: 679,
    name: '营销广告'
  }, {
    value: 1548,
    name: '搜索引擎'
  }],
  [{
    value: 335,
    name: '直达'
  }, {
    value: 310,
    name: '邮件营销'
  }, {
    value: 234,
    name: '联盟广告'
  }, {
    value: 135,
    name: '视频广告'
  }, {
    value: 1048,
    name: '百度'
  }, {
    value: 251,
    name: '谷歌'
  }, {
    value: 147,
    name: '必应'
  }, {
    value: 102,
    name: '其他'
  }]
]
pieOptions(legendData, seriesName, seriesData)

export function pieOptions(legendData, seriesName, seriesData) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: legendData
    },
    series: [{
      // name: '访问来源',
      name: seriesName[0],
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],

      label: {
        normal: {
          position: 'inner'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: seriesData[0]
    }, {
      // name: '访问来源',
      name: seriesName[1],
      type: 'pie',
      radius: ['40%', '55%'],
      data: seriesData[1]
    }]
  }
}