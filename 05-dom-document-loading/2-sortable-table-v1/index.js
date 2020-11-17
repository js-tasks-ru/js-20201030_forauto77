export default class SortableTable {
  element;
  subElements;
  
  constructor(header = [], {data = []} = {}) {
    this.header = header;
    this.data = data;
    this.headerTitle = this.headerTitles(header);
    this.render();
  }

  render(){
    const element = document.createElement('div');
    element.innerHTML = `
    <div class="sortable-table">
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.tableHeader(this.header)}
      </div>
      <div data-element="body" class="sortable-table__body">
      ${this.tableBody(this.data)}
    `;
    
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);
  }

  tableHeader(){
    return this.header.map( item => {
      return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
        <span>${item.title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
      `}).join('')
    }

  tableBody(data) {     
    return data.map( item => {
      return `
      <a href="/products/${item.id}" class="sortable-table__row">
        
        ${this.tableCell(item)}
      </a>
    `}).join('')
  }

  headerTitles(header){
    const headerTitles = [];      
      for (const item of header){
        if (item.id !== 'images'){
          headerTitles.push(item.id)
        }
      };
    return headerTitles
  }

  tableCell(dataItem){      
    let i = 0;
    let result = this.tableCellImage(dataItem);   
    
    for (const item of this.headerTitle){
      result += `
      <div class="sortable-table__cell">${dataItem[this.headerTitle[i++]]}</div>
    `}
    return result      
  }

  tableCellImage(dataItem){
    const getter = this.createGetter('images.url');
    let result = '';
    if (this.header[0].id === 'images'){
      result = `
        <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="Image" src="${getter(dataItem)}">
        </div>
      `}
    return result    
  }

  createGetter(path) {
  const partsPath = path.split('.');
  return function (obj) {
      let result = obj;
      for (const part of partsPath) {
        if(Array.isArray(result)){result = result[0]}
          result = result[part];
          if (!result){break}
      }
      return result
  }
  };

  getSubElements(element) {
      const elements = element.querySelectorAll('[data-element]');

      return [...elements].reduce((acc, item) => {
          acc[item.dataset.element] = item;
          return acc
      })
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    this.subElements.body.innerHTML = this.tableBody(sortedData);
  }

  sortData(field, order){
    const sortTable = [...this.data];
    const currentHeaderItem = this.header.find(item => item.id === field);
    const sortType = currentHeaderItem ? currentHeaderItem.sortType : '';
    const sortDirection = (order === 'desc') ? -1 : 1;

    sortTable.sort( (item1, item2) => {
      const a = item1[field];
      const b = item2[field];
    switch(sortType){
      case 'string': return sortDirection * a.localeCompare(b, ['ru', 'en'], {caseFirst: 'upper'});
      case 'number': return sortDirection * (a - b);
      default: break;
    }  
    })
    return sortTable
  }

  remove() {
      this.element.remove();
  }

  destroy() {
      this.remove();
  }
}

