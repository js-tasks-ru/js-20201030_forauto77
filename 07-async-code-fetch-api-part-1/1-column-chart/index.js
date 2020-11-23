
export default class ColumnChart {
  

    constructor({ url = '', range = {}, label = '', link = '' } = {}) {
        this.url = url;
        this.range = range;
        this.label = label;
        this.link = link;
        this.chartHeight = 50;
        this.render(); 
      }

  getStringDate(date) {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
      if (month.length < 2) { month = '0' + month }
    let day = (date.getDate()).toString();
    if (day.length < 2) { day = '0' + day }
    return year + '-' + month + '-' + day;
  }
  
  setNewRange(from, to) {
    this.range.from = from;
    this.range.to = to;
  }
    
  async getData(from, to) {
    this.subElements.header.textContent = '';
    this.subElements.body.innerHTML = '';
    this.element.classList.add('column-chart_loading')

    const fromDate = this.getStringDate(from);
    const toDate = this.getStringDate(to);
    this.setNewRange(from, to);
    const response = await fetch(`https://course-js.javascript.ru/${this.url}?from=${fromDate}T19%3A33%3A49.870Z&to=${toDate}T19%3A33%3A49.870Z`);
    this.data = await response.json();
    if (this.data && Object.values(this.data).length) {
      this.subElements.header.textContent = Object.values(this.data).reduce((sum, current) => sum + current, 0);
      this.subElements.body.innerHTML = this.getBody(this.data);
      
      this.element.classList.remove('column-chart_loading')
    };  
  }
      
  render() {
    const { from, to } = this.range;
    const element = document.createElement('div');     
    element.innerHTML = this.template();       
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
    this.setNewRange(from, to);
    this.getData(from, to);    
  }
  
  template() {
    return `
    <div class="column-chart style= '--chart-height:${this.chartHeight}'">
      <div class="column-chart__title"> Total ${this.label} ${this.getLink()}</div> 
      <div class="column-chart__container" >
        <div data-element="header" class="column-chart__header"></div>
        <div data-element="body" class="column-chart__chart" ></div>
      </div>
    </div> 
    `;
  }

  getLink() {
    return this.link ? `
    <a href="${this.link}" class="column-chart__link">View all</a>
    ` : '';
  }

  getBody(data) {
    return Object.values(data).map(item => {
      const maxValue = Math.max(...Object.values(data));
      const scale = 50 / maxValue;
      return `
      <div style="--value: ${Math.floor(item * scale)}" data-tooltip="${(item / maxValue * 100).toFixed(0)}%"></div>
      `;
    }).join('');
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }
      
  async update(from, to) {
    return await this.getData(from, to);
  }
      
  remove() {
    this.element.remove();
  }
      
  destroy() {
    this.remove();
  }    
}
