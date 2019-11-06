import React, {PureComponent} from 'react'

/* global particlesJS */
class Particel extends PureComponent {
  setting = {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 900
        }
      },
      "color": {
        "value": "#8b8b8b"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 3
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 200,
        "color": "#8B8B8B",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1.5,
        "direction": "top-right",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 962.0472365193136,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "grab"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 353.2535873510851,
          "line_linked": {
            "opacity": 0.4606664856905469
          }
        },
        "bubble": {
          "distance": 267.9854800594439,
          "size": 56.84540486109416,
          "duration": 2,
          "opacity": 1,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
  componentDidMount() {
    this.load()
  }
  load() {
    particlesJS('portofolio-dev-particles', this.setting, function() {
      console.log('callback - particles.js config loaded');
    })
  }
  render() {
    return (
      <div id="portofolio-dev-particles" className='portofolio-dev-particles' />
    )
  }
}

export default Particel
