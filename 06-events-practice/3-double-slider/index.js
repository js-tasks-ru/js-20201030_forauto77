export default class DoubleSlider {
    thumbLeft;
    thumbRight;
    progress;
    element;

    constructor() {
        this.render();
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="range-slider">
            ${this.slider()}
            </div>
        `;
        this.element = element.firstElementChild;
        this.thumbs();
    }

    slider() {        
        return `
        <span>$30</span>
        <div class="range-slider__inner">
          <span class="range-slider__progress" style="left: 0%; right: 0%"></span>
          <span class="range-slider__thumb-left" style="left: 0%"></span>
          <span class="range-slider__thumb-right" style="right: 0%"></span>
        </div>
        <span>$70</span>
        `
    }

    thumbs() {
        this.thumbLeft = this.element.querySelector('.range-slider__thumb-left');
        this.thumbRight = this.element.querySelector('.range-slider__thumb-right');
        this.progress = this.element.querySelector('.range-slider__progress');
        this.thumbLeft.addEventListener('mousedown', this.mouseDown);
        this.thumbLeft.addEventListener('mouseup', this.mouseUp);
    }

    mouseUp = event => {
        event.target.removeEventListener('mousemove', this.mouseMove);

    }

    mouseDown = event => {
        event.target.addEventListener('mousemove', this.mouseMove);
        event.target.ondragstart = () => {
            return false;
        }
        this.mouseMove(event);
    }

    mouseMove(event) {
        const x = event.clientX;
        event.target.style.left = `${x}px`
    }


    /* ball.onmousedown = function(event) { 

        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;

        document.body.append(ball);
      
        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
          ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
          ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        document.addEventListener('mousemove', onMouseMove);
      
        ball.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          ball.onmouseup = null;
        };
      
      }; */


}
