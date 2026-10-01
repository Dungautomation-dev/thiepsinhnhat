/**
 * confetti.js - 60 FPS Canvas Confetti Cannon & Floating Balloon Engine
 * Provides celebratory visual effects for the Birthday E-Card
 */

class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");

    this.particles = [];
    this.balloons = [];
    this.sparkles = [];
    this.lastTime = performance.now();

    this.colors = [
      "#ff4081", "#e040fb", "#7c4dff", "#536dfe",
      "#00e5ff", "#1de9b6", "#ffeb3b", "#ff9100",
      "#ff5252", "#ffd700", "#ff6b81", "#70a1ff"
    ];

    this.initCanvas();
    this.initBalloons(14);
    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.initCanvas();
    });

    window.addEventListener("pointermove", (e) => {
      if (Math.random() < 0.4) {
        this.addSparkle(e.clientX, e.clientY);
      }
    });
  }

  initBalloons(count) {
    this.balloons = [];
    for (let i = 0; i < count; i++) {
      this.balloons.push({
        x: Math.random() * this.width,
        y: this.height + Math.random() * 200,
        radius: 20 + Math.random() * 16,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        speedY: 0.6 + Math.random() * 1.1,
        swingSpeed: 0.015 + Math.random() * 0.02,
        swingAmp: 25 + Math.random() * 35,
        swingOffset: Math.random() * Math.PI * 2,
        stringLen: 38 + Math.random() * 20,
        opacity: 0.75 + Math.random() * 0.2
      });
    }
  }

  fireCannon(originX = this.width / 2, originY = this.height * 0.55, count = 140) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const velocity = 6 + Math.random() * 16;
      const size = 6 + Math.random() * 8;
      const isStar = Math.random() < 0.25;

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - (Math.random() * 6 + 4), // upward kick
        size: size,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        tilt: Math.random() * 360,
        tiltSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.35 + Math.random() * 0.25,
        drag: 0.982,
        opacity: 1,
        decay: 0.003 + Math.random() * 0.004,
        isStar: isStar
      });
    }
  }

  addSparkle(x, y) {
    if (this.sparkles.length > 40) return;
    this.sparkles.push({
      x: x + (Math.random() - 0.5) * 16,
      y: y + (Math.random() - 0.5) * 16,
      size: 2 + Math.random() * 4,
      color: "#ffd700",
      opacity: 1,
      decay: 0.04 + Math.random() * 0.04
    });
  }

  drawBalloon(b) {
    this.ctx.save();
    this.ctx.globalAlpha = b.opacity;

    const currentX = b.x + Math.sin(b.swingOffset) * b.swingAmp;
    const currentY = b.y;

    // Balloon body
    this.ctx.beginPath();
    this.ctx.fillStyle = b.color;
    this.ctx.ellipse(currentX, currentY, b.radius * 0.82, b.radius, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Balloon 3D reflection highlight
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    this.ctx.ellipse(currentX - b.radius * 0.3, currentY - b.radius * 0.35, b.radius * 0.24, b.radius * 0.4, -Math.PI / 6, 0, Math.PI * 2);
    this.ctx.fill();

    // Knot
    this.ctx.beginPath();
    this.ctx.fillStyle = b.color;
    this.ctx.moveTo(currentX - 3, currentY + b.radius);
    this.ctx.lineTo(currentX + 3, currentY + b.radius);
    this.ctx.lineTo(currentX, currentY + b.radius + 4);
    this.ctx.closePath();
    this.ctx.fill();

    // String
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(currentX, currentY + b.radius + 4);
    this.ctx.quadraticCurveTo(
      currentX + Math.sin(b.swingOffset * 1.5) * 8,
      currentY + b.radius + b.stringLen * 0.5,
      currentX,
      currentY + b.radius + b.stringLen
    );
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawStar(x, y, r, p) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate((p.rotation * Math.PI) / 180);
    this.ctx.scale(Math.cos((p.tilt * Math.PI) / 180), 1);
    this.ctx.beginPath();
    this.ctx.fillStyle = p.color;
    for (let i = 0; i < 5; i++) {
      this.ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * r, -Math.sin(((18 + i * 72) * Math.PI) / 180) * r);
      this.ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (r * 0.45), -Math.sin(((54 + i * 72) * Math.PI) / 180) * (r * 0.45));
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }

  drawConfetti(p) {
    this.ctx.save();
    this.ctx.globalAlpha = p.opacity;

    if (p.isStar) {
      this.drawStar(p.x, p.y, p.size, p);
    } else {
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.scale(Math.cos((p.tilt * Math.PI) / 180), 1);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
    }

    this.ctx.restore();
  }

  update() {
    // Update balloons
    for (let b of this.balloons) {
      b.y -= b.speedY;
      b.swingOffset += b.swingSpeed;
      if (b.y < -b.radius * 2 - b.stringLen) {
        b.y = this.height + 40;
        b.x = Math.random() * this.width;
      }
    }

    // Update confetti particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotation += p.rotationSpeed;
      p.tilt += p.tiltSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > this.height + 50) {
        this.particles.splice(i, 1);
      }
    }

    // Update sparkles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.opacity -= s.decay;
      if (s.opacity <= 0) {
        this.sparkles.splice(i, 1);
      }
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw floating balloons in background
    for (let b of this.balloons) {
      this.drawBalloon(b);
    }

    // Draw confetti particles
    for (let p of this.particles) {
      this.drawConfetti(p);
    }

    // Draw cursor sparkles
    for (let s of this.sparkles) {
      this.ctx.save();
      this.ctx.globalAlpha = s.opacity;
      this.ctx.fillStyle = s.color;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  animate() {
    this.update();
    this.render();
    requestAnimationFrame(this.animate);
  }
}

// Global reference
let confettiEngine = null;

function initConfetti() {
  confettiEngine = new ConfettiEngine("confetti-canvas");
}

function fireConfettiBurst(x, y, count) {
  if (confettiEngine) {
    confettiEngine.fireCannon(x, y, count);
  }
}
