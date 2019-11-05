import React, {PureComponent} from 'react'
import {TweenLite, Circ} from 'gsap'

function Circle(pos, rad, color, ctx) {
  let _this = this;

  (function () {
    _this.pos = pos || null
    _this.radius = rad || null
    _this.color = color || null
  })()

  this.draw = function () {
    if (!_this.active) return
    ctx.beginPath()
    ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = 'rgba(192, 168, 168,' + _this.active + ')'
    ctx.fill()
  }
}

class Particel extends PureComponent {
  points = []
  animateHeader = true
  width = window.innerWidth
  target = {x: this.width / 2, y: this.height / 2}
  constructor(props) {
    super(props)
    this.mouseMove = this.mouseMove.bind(this)
    this.scrollCheck = this.scrollCheck.bind(this)
    this.resize = this.resize.bind(this)
  }
  componentDidMount() {
    this.initHeader()
    this.initAnimation()
    this.addListeners()
  }
  componentWillUnmount() {
    this.removeListeners()
  }
  setVariable() {
    this.ctx = this.refs.canvas.getContext('2d')
    console.log(document.getElementById('homes-dev').scrollHeight)
    this.height = document.getElementById('homes-dev').offsetHeight
  }
  initHeader() {
    this.setVariable()
    this.refs.canvas.height = this.height
    this.refs.canvas.width = this.width
    for (let x = 0; x < this.width; x = x + this.width / 20) {
      for (let y = 0; y < this.height; y = y + this.height / 20) {
        let px = x + Math.random() * this.width / 20
        let py = y + Math.random() * this.height / 20
        let p = {x: px, originX: px, y: py, originY: py}
        this.points.push(p)
      }
    }
    for (let i = 0; i < this.points.length; i++) {
      let closest = []
      let p1 = this.points[i]
      for (let j = 0; j < this.points.length; j++) {
        let p2 = this.points[j]
        if (p1 !== p2) {
          let placed = false
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (!closest[k]) {
                closest[k] = p2
                placed = true
              }
            }
          }
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                closest[k] = p2
                placed = true
              }
            }
          }
        }
      }
      p1.closest = closest
    }
    for (let i in this.points) {
      let c = new Circle(this.points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)', this.ctx);
      this.points[i].circle = c;
    }
  }
  addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', this.mouseMove)
    }
    window.addEventListener('scroll', this.scrollCheck)
    window.addEventListener('resize', this.resize)
  }
  removeListeners() {
    if (!('ontouchstart' in window)) {
      window.removeEventListener('mousemove', this.mouseMove);
    }
    window.removeEventListener('scroll', this.scrollCheck);
    window.removeEventListener('resize', this.resize);
  }
  mouseMove(e) {
    let posy = 0;
    let posx = 0;
    if (e.pageX || e.pageY) {
      posx = e.pageX
      posy = e.pageY
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    this.target.x = posx
    this.target.y = posy
  }
  scrollCheck() {
    if (document.body.scrollTop > this.height) this.animateHeader = false
    else this.animateHeader = true
  }
  resize() {
    this.refs.canvas.height = this.height
    this.refs.canvas.width = this.width
  }
  initAnimation() {
    this.animate()
    for (let i in this.points) {
      this.shiftPoint(this.points[i])
    }
  }

  shiftPoint(p) {
    TweenLite.to(p, 1 + Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100, ease: Circ.easeInOut,
      onComplete: () => {
        this.shiftPoint(p)
      }
    });
  }

  animate() {
    if (this.animateHeader) {
      this.ctx.clearRect(0, 0, this.width, this.height)
      for (let i in this.points) {
        if (Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
          this.points[i].active = 0.3
          this.points[i].circle.active = 0.6
        } else if (Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
          this.points[i].active = 0.1
          this.points[i].circle.active = 0.3
        } else if (Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
          this.points[i].active = 0.02
          this.points[i].circle.active = 0.1
        } else {
          this.points[i].active = 0
          this.points[i].circle.active = 0
        }
        this.drawLines(this.points[i])
        this.points[i].circle.draw()
      }
    }
    requestAnimationFrame(this.animate.bind(this))
  }

  drawLines(p) {
    if (!p.active) return
    for (let i in p.closest) {
      this.ctx.beginPath()
      this.ctx.moveTo(p.x, p.y)
      this.ctx.lineTo(p.closest[i].x, p.closest[i].y)
      this.ctx.strokeStyle = 'rgba(192,168,168,' + p.active + ')'
      this.ctx.stroke()
    }
  }

  getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
  }
  render() {
    return (
      <canvas className='homes-dev-canvas' ref='canvas' />
    )
  }
}

export default Particel
