import { util } from './util';

/**
 * 使用 const load = new WinLoad({tips, zIndex: 3000}, target);
 * load.destroy();
 * load.show();
 * load.hide();
 */
export class WinLoad {
  constructor(set = { tips: 'loading', zIndex: 3000 }, target = document.querySelector('body')) {
    this.set = set;
    this.id = 'winLoad_' + util.randomID();
    this.target = target;
    this.render();
  }

  show() {
    document.querySelector(`#${this.id}`).style.display = 'block';
  }

  hide() {
    document.querySelector(`#${this.id}`).style.display = 'none';
  }

  destroy() {
    const target = document.querySelector(`#${this.id}`);
    document.body.removeChild(target);
  }

  render() {
    const d = document.createElement('div');
    d.className = 'h5ds-win-loading';
    d.id = this.id;
    const dinner = document.createElement('div');
    dinner.className = 'h5ds-win-loading-inner';
    dinner.innerHTML = this.set.tips;
    d.appendChild(dinner);
    this.target.appendChild(d);
  }
}
