export default class SortableTable {
  element;
  subElements;
  
  constructor(header = [], {data = []} = {}) {
    this.header = header;
    this.data = data;
    this.headerTitle = this.headerTitles(header);
    this.render();
    }
    
    onMouseClick = event => {
        const sortArrow = event.target.closest('[data-element]');
        sortArrow.querySelector('[data-element]').remove();
        const element = event.target.closest('[data-sortable]');
        element.insertAdjacentHTML('beforeend', this.createArrow());
        if (element.dataset.sortable === 'true') {
            if (!element.dataset.order || element.dataset.order === 'desc') {
                element.dataset.order = 'asc'
            } else if (element.dataset.order === 'asc') {
                element.dataset.order = 'desc'
            }
            this.sort(element.dataset.id, element.dataset.order)
        }
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
      document.addEventListener('pointerdown', this.onMouseClick);
      this.defaultSort('title');
  }

    tableHeader() {        
    return this.header.map( item => {
      return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
        <span>${item.title}</span>        
      </div>
      `}).join('')
    }

    defaultSort(item) {
        const headerTitles = this.element.querySelectorAll(`[data-id]`);
        for (const headerItem of headerTitles) {
            if (headerItem.dataset.id === item) {
                headerItem.dataset.order = 'asc';
                headerItem.insertAdjacentHTML('beforeend', this.createArrow());
            }
        };
        this.sort(item);
    }

  createArrow() {
    return `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
    </span>`
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
    
      for (const item of this.headerTitle) {
      result += `
      <div class="sortable-table__cell">${dataItem[this.headerTitle[i++]]}</div>
    `}
    return result      
  }

  tableCellImage(dataItem){
    const getter = this.createGetter('images.url');
      return this.header[0].id === 'images' ?
          `<div class="sortable-table__cell">
        <img class="sortable-table-image" alt="Image" src="${getter(dataItem)}">
      </div>` : '';
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
      }, {});
  }

  sort(field, order = 'asc') {
      const sortedData = this.sortData(field, order);
    this.subElements.body.innerHTML = this.tableBody(sortedData);
  }

  sortData(field, order){
      const sortTable = [...this.data];
      const currentHeaderItem = this.header.find(item => item.id === field);
      const sortType = currentHeaderItem ? currentHeaderItem.sortType : '';
      let sortDirection;
      switch (order) {
          case 'asc': sortDirection = 1; break;
          case 'desc': sortDirection = -1; break;
          default: 0;
      }
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
