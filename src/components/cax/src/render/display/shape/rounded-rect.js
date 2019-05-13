import Shape from './shape';

class RoundedRect extends Shape {
  constructor (width, height, r, option) {
    super();
    this.option = Object.assign({
      lineWidth: 1,
      lt: true,
      rt: true,
      lb: true,
      rb: true
    }, option);
    this.r = r || 0;
    this.width = width;
    this.height = height;
  }

  draw () {
    const width = this.width;

    const height = this.height;

    const r = this.r;

    const ax = r;

    const ay = 0;

    const bx = width;

    const by = 0;

    const cx = width;

    const cy = height;

    const dx = 0;

    const dy = height;

    const ex = 0;

    const ey = 0;

    this.beginPath();

    this.moveTo(ax, ay);
    if (this.option.rt) {
      this.arcTo(bx, by, cx, cy, r);
    } else {
      this.lineTo(bx, by);
    }

    if (this.option.rb) {
      this.arcTo(cx, cy, dx, dy, r);
    } else {
      this.lineTo(cx, cy);
    }

    if (this.option.lb) {
      this.arcTo(dx, dy, ex, ey, r);
    } else {
      this.lineTo(dx, dy);
    }

    if (this.option.lt) {
      this.arcTo(ex, ey, ax, ay, r);
    } else {
      this.lineTo(ex, ey);
    }

    if (this.option.fillStyle) {
      this.closePath();
      this.fillStyle(this.option.fillStyle);
      this.fill();
    }

    if (this.option.strokeStyle) {
      this.lineWidth(this.option.lineWidth);
      this.strokeStyle(this.option.strokeStyle);
      this.stroke();
    }
  }
}

export default RoundedRect;
