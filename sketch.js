let rings = [];
let particles = [];
let img;

function preload() {
  img = loadImage("https://static.wikia.nocookie.net/kamenrider/images/6/6f/SKR-Typhoon_%28Kamen_Rider%29.png/revision/latest?cb=20230228145824");
}

function setup() {
  createCanvas(900, 300);
  noFill();
  stroke(255);
  strokeWeight(2);

  let explodeButton = createButton("Click to Transform!");
  explodeButton.position(width / 2 - 30, height + 10);
  explodeButton.mousePressed(createExplosion);

  let resetButton = createButton("Reset");
resetButton.position(width / 2 + 50, height + 10 + 30);
  resetButton.mousePressed(resetCanvas);
}

function draw() {
  background(img);

  // Display and update particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].update();
  }

  // Display and expand rings
  for (let i = 0; i < rings.length; i++) {
    rings[i].display();
    rings[i].expand();
  }
}

function createExplosion() {
  // Add particles to the center
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(width / 2, height / 2, random(-5, 5), random(-5, 5)));
  }

  // Add multiple rings to the center
  for (let i = 0; i < 5; i++) {
    rings.push(new Ring(width / 2, height / 2));
  }

  
}

function resetCanvas() {
  particles = [];
  rings = [];
  clear();
}

class Particle {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(255, 0, 0, this.alpha);
    ellipse(this.x, this.y, 10, 10);
  }
}

class Ring {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = sqrt(sq(width) + sq(height));
  }

  expand() {
    if (this.radius < this.maxRadius) {
      this.radius += 10;
    }
  }

  display() {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}
