class Tooltip {
    static instance;
    element;

    onMouseOver = event => {
        const element = event.target.closest('[data-tooltip]');
        

        if (element) {
            this.render(element.dataset.tooltip);
            this.moveTooltip(event);

            document.addEventListener('pointermove', this.onMouseMove);
        }
        
    };

    onMouseMove = event => {
        this.moveTooltip(event);
    };

    onMouseOut = () => {
        this.removeTooltip();
    };

    removeTooltip() {
        if (this.element) {
            this.element.remove();
            this.element = null;

            document.removeEventListener('pointermove', this.onMouseMove);
        }
        
    }

    constructor() {
        if (Tooltip.instance) {
            return Tooltip.instance;
          }
      
          Tooltip.instance = this;
    }

    initEventListeners() {
        document.addEventListener('pointerover', this.onMouseOver);
        document.addEventListener('pointerout', this.onMouseOut);
      }
    
      initialize() {
        this.initEventListeners();
      }

    render(tooltip) {
        const element = document.createElement('div');
        element.innerHTML = `<div class="tooltip">${tooltip}</div>`
        this.element = element.firstElementChild;
        document.body.append(this.element);
    }

    moveTooltip(event) {
        const x = event.clientX+10;
        const y = event.clientY+10;

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`
    }

    dispatchEvent() {
        this.element.remove();
    }

    remove() {
        this.element.remove();
    }
  
    destroy() {
        document.removeEventListener('pointerover', this.onMouseOver);
        document.removeEventListener('pointerout', this.onMouseOut);
        this.removeTooltip();
    }
}

const tooltip = new Tooltip();

export default tooltip;
