export default class ColumnChart {
  constructor({ data = [], value = '', label = '', link = '' } = {}) {
  this.data = data;
  this.value = value;
  this.label = label;
  this.link = link;
  this.chartHeight = 50;
  this.update();  
  this.render(data, value, label, link);  
  this.initEventListener();
}

  initEventListener() {
      
  }

  render(data, value, label, link, chartHeight) {   
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;
    
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="column-chart style = "--chart-height: ${chartHeight}">
        <div class="column-chart__title"> Total ${label}</div> 
        <div class="column-chart__container" >
          <div data-element="header" class="column-chart__header">${value}</div>
          <div data-element="body" class="column-chart__chart" >
        </div>
      </div>
    </div> 
    `;
    this.element = element.firstElementChild;
    const columnChart = element.querySelector('.column-chart');
    const columnChartTitle = element.querySelector('.column-chart__title');

    if (!data || !value || !label){
      columnChart.classList.add('column-chart_loading');
    };

    if (link){
      columnChartTitle.insertAdjacentHTML('beforeend', `
      <a href="${link}" class="column-chart__link">View all</a>
      `);
    };   
      
    const elementBody = element.querySelector('.column-chart__chart');
    for (const item of data){                
      elementBody.insertAdjacentHTML('beforeend',`
      <div style="--value: ${Math.floor(item * scale)}" data-tooltip="${(item / maxValue * 100).toFixed(0)}%"></div>                
    `)};        
  }

  update() {
    const charts = document.querySelector('.column-chart');
    if(charts){
      charts.remove();
    }
  }

  remove() {
      this.element.remove();
  }

  destroy() {
      this.remove();
  }
}