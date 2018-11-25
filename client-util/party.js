import randomColor from 'randomcolor'
// TODO limpiar todo esto

const party = function (t) {
  var e = this
  e.config = {
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
    el: 'body',
    elements: {
      conf: {
        direction: 'down',
        rotation: false
      },
      star: {
        count: 15,
        direction: 'up',
        rotation: false
      },
      ribbon: {
        count: 10,
        direction: 'down',
        rotation: false
      }
    },
    confCount: 75,
    x: 0,
    y: 0,
    angle: 90,
    decay: 0.9,
    spread: 45,
    startVelocity: 45,
    position: null
  }
  for (var n in t) { e.config[n] = t[n] }
  var o = e.config
  e.renderStar = function (t, e) {
    return '<div style="width:' + t + 'px;fill:' + e + '"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 75 75" ><title>star</title><polygon points="37.5 18.411 56.342 8.505 52.743 29.486 67.987 44.345 46.921 47.406 37.5 66.495 28.079 47.406 7.013 44.345 22.257 29.486 18.658 8.505 37.5 18.411" /></svg></div>'
  }

  e.renderRibbon = function (t, e) {
    return `
    <div style="width:${t}px;stroke:${e}">
    <svg version="1.1"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px" y="0px" width="20.5px" height="19.1px" viewBox="0 0 20.5 19.1" style="enable-background:new 0 0 20.5 19.1;"
      xml:space="preserve">
    <path fill="${e}" d="M20.5,8.6c-0.2-6.4-9.7-5.9-10.3-5.9C6,2.8,3.5,1.6,2,0.2C1.5-0.3,0.6,0.2,0.7,0.9l0.7,4.6L0,7.2c0.2,6.4,9.7,5.9,10.3,5.9
      c8-0.2,9.8,4.2,10.1,5.9l-1.3-8.4L20.5,8.6z"/>
    </svg>
    </div>`
  }

  e.customRender = function (t, e, n, o, i) {
    return e === 'text' ? '<p style="color:' + n + ';font-size:' + i + 'px">' + t + '</p>' : e === 'svg' ? '<div style="width:' + o + 'px;fill:' + n + '">' + t + '</div>' : e === 'image' ? '<img style="width:' + o + 'px;" src="' + t + '"/>' : void 0
  }

  e.createElements = function (t, n) {
    var i = o.elements.star ? o.elements.star.count : 0

    var s = o.elements.ribbon ? o.elements.ribbon.count : 0

    var c = []
    if (o.elements.custom && o.elements.custom.length > -1) {
      console.log(o.elements.custom.length)
      for (var r = 0; r <= o.elements.custom.length; r++) {
        o.elements.custom[r] && c.push({
          count: o.elements.custom[r].count
        })
      }
    }
    for (var l = 0, a = [], d = 0; d <= n; d++) {
      var m = document.createElement('div')
      m.classList = ['fetti']
      var u = o.colors[d % o.colors.length]

      var h = Math.floor(10 * Math.random() + 1) + 'px'

      var f = Math.floor(10 * Math.random() + 1) + 'px'
      if (m.style.width = h,
      m.style.height = f,
      m.style.position = 'fixed',
      m.style.zIndex = '999999',
      o.elements.star && i > 0) {
        var y = i - 1
        y <= o.elements.star.count && y >= 0 && (m.style['background-color'] = '',
        m.innerHTML = e.renderStar(25, u),
        m.direction = o.elements.star.direction,
        m.rotation = o.elements.star.rotation,
        i = y)
      } else if (o.elements.ribbon && s > 0) {
        var p = s - 1
        p <= o.elements.ribbon.count && p >= 0 && (m.style['background-color'] = '',
        m.innerHTML = e.renderRibbon(30, u),
        m.direction = o.elements.ribbon.direction,
        m.rotation = o.elements.ribbon.rotation,
        s = p)
      } else if (o.elements.custom && o.elements.custom.length > -1 && c[l]) {
        if (c[l]) {
          var g = c[l].count - 1
          if (g <= c[l].count && g <= c[l].count && g >= 0) {
            m.style['background-color'] = ''
            var v = o.elements.custom[l].contentType

            var w = o.elements.custom[l].content

            var b = o.elements.custom[l].width

            var x = o.elements.custom[l].textSize
            m.innerHTML = e.customRender(w, v, u, b, x),
            m.direction = o.elements.custom[l].direction,
            m.rotation = o.elements.custom[l].rotation,
            c[l].count = g,
            c[l].count == 0 && l++
          }
        }
      } else {
        h == f ? (m.style['background-color'] = u,
        m.style.borderRadius = '50%') : m.style['background-color'] = u,
        m.direction = o.elements.conf && o.elements.conf.direction ? o.elements.conf.direction : 'down',
        m.rotation = !o.elements.conf || !o.elements.conf.rotation || o.elements.conf.rotation
      }
      t.insertBefore(m, t.firstChild),
      a.push(m)
    }
    return a
  }

  e.randomPhysics = function (t, e, n, o, i) {
    var s = n * (Math.PI / 180)

    var c = o * (Math.PI / 180)
    return {
      x: t,
      y: e,
      wobble: 10 * Math.random(),
      velocity: 0.3 * i + Math.random() * i,
      angle2D: -s + (0.3 * c - Math.random() * c),
      angle3D: -Math.PI / 4 + Math.random() * (Math.PI / 2),
      tiltAngle: Math.random() * Math.PI
    }
  }

  e.updateFetti = function (t, e, n) {
    t.physics.x += Math.cos(t.physics.angle2D) * t.physics.velocity,
    t.physics.y += Math.sin(t.physics.angle2D) * t.physics.velocity,
    t.physics.z += Math.sin(t.physics.angle3D) * t.physics.velocity,
    t.physics.wobble += 0.1,
    t.physics.velocity *= n,
    t.element.direction == 'up' ? t.physics.y -= 3 : t.physics.y += 3,
    t.physics.tiltAngle += 0.1
    var o; var i = t.physics.x; var s = t.physics.y; var c = t.physics.tiltAngle; var r = t.physics.wobble; var l = i + 10 * Math.cos(r); var a = s + 10 * Math.sin(r)
    o = t.element.rotation ? 'translate3d(' + l + 'px, ' + a + 'px, 0) rotate3d(1, 1, 1, ' + c + 'rad)' : 'translate3d(' + l + 'px, ' + a + 'px, 0)',
    t.element.style.transform = o,
    t.element.style.opacity = 1 - e
  }

  e.animate = function (t, n, o) {
    var i = 200

    var s = 0
    requestAnimationFrame(function c () {
      n.forEach(function (t) {
        e.updateFetti(t, s / i, o)
      }),
      (s += 1) < i ? requestAnimationFrame(c) : n.forEach(function (e) {
        t.removeChild(e.element)
      })
    })
  }

  e.conf = function (t, n, i) {
    // debugger
    var angle = o.angle
    var decay = o.decay
    var spread = o.spread
    var startVelocity = o.startVelocity
    var elementCount = o.confCount
    var s = []
    e.createElements(t, elementCount).map(function (t) {
      var o = {
        element: t,
        physics: e.randomPhysics(n, i, angle, spread, startVelocity)
      }
      s.push(o)
    }),
    e.animate(t, s, decay)
  }

  var i = document.querySelector(o.el)
  if (o.position != null) {
    if (o.position == 'bottomLeftRight') {
      o.angle = 45,
      e.conf(i, 0, window.innerHeight - 200),
      (s = t).position = null,
      s.angle = 135,
      s.x = window.innerWidth,
      s.y = window.innerHeight - 200,
      new party(s)
    } else if (o.position == 'topLeftRight') {
      var s
      o.angle = 340,
      e.conf(i, 0, 0),
      (s = t).position = null,
      s.angle = 190,
      s.x = window.innerWidth,
      s.y = 0,
      new party(s)
    }
  } else { e.conf(i, o.x, o.y) }
}

export default () => {
  new party({
    colors: randomColor({ hue: 'random', count: 18 }),
    confCount: 40,
    angle: 90,
    startVelocity: 60,
    elements: {
      'conf': {
        direction: 'down',
        rotation: true
      },
      'star': {
        count: 10,
        direction: 'down',
        rotation: true
      },
      'ribbon': {
        count: 10,
        direction: 'down',
        rotation: true
      }
    },
    position: 'topLeftRight'
  })
}
