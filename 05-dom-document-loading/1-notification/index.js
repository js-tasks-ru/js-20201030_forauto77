export default class NotificationMessage {
    element;
    static showedElement;

    constructor(message = '', { duration = 1000, type = 'success' } = {}) {
        this.message = message;
        this.duration = duration;
        this.type = type;

        if (NotificationMessage.showedElement) {
            NotificationMessage.showedElement.remove();
        }

        this.render();
    }

    render() {
        
        this.element = document.createElement('div');
        this.element.innerHTML = `
        <div class="notification success" style="--value:${this.duration / 1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">success</div>
          <div class="notification-body">
            ${this.message + Math.random()}
          </div>
        </div>
        </div>
        `;
        this.element = this.element.firstElementChild;
        NotificationMessage.showedElement = this.element;
    }

    show() {      
        document.body.append(this.element);
        setTimeout(() => (this.remove()), this.duration);   
        
        return this.element
        
    }

    remove() {
        this.element.remove();
    }
  
    destroy() {
        this.remove();
        this.element = null;
    }
}
