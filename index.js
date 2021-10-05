// Get canvas elem and context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Set canvas width and height
canvas.width = innerWidth;
canvas.height = innerHeight;

// Object to store mouse coords
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// Color Pallete
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];


// Objects
class Particle {
    // Creates array
    static objects = [];

    // Constructor w/ defaults
    constructor(x, y, radius, color, xv, yv) {
        this.x = x || 100;
        this.y = y || 100;
        this.radius = radius || 10;
        this.color = color || randomColor(colors);
        this.xv = xv || 0;
        this.yv = yv || 0;
        Particle.objects.push(this);
    }

    // Draws cirlce
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    // Update velocity and size
    update() {
        this.x += this.xv;
        this.y += this.yv;
        this.radius -= 0.2;
    }
}

// Animation Loop
function animate() {
    // Recursion
    requestAnimationFrame(animate);

    // Clear canvas
    c.fillStyle = 'rgba(255, 255, 255, 1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    // Debug
    // new Particle(mouse.x, mouse.y, randomIntFromRange(10, 20), randomColor(colors), 0, 0);

    // Update and draw for each in array
    for (let i = 0; i < Particle.objects.length; i++) {
        Particle.objects[i].update();
        Particle.objects[i].draw();
        if (Particle.objects[i].radius <= 1) {
            Particle.objects.splice(i, 1);
            i--;
        }
    }

    // Draws
    for (let i = 0; i < Particle.objects.length; i++) {
        for (let j = 0; j < Particle.objects.length; j++) {
            const x1 = Particle.objects[i].x;
            const y1 = Particle.objects[i].y;
            const x2 = Particle.objects[j].x;
            const y2 = Particle.objects[j].y;
            const d = distance(x1, y1, x2, y2);
            if (d < 50) {
                c.strokeStyle = 'rgba(255, 0, 0, 0.5)';
                c.lineWidth = 1;
                c.beginPath();
                c.moveTo(x1, y1);
                c.lineTo(x2, y2);
                c.stroke();
            }
            
        }
    }
}

// Helper functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}


// Event Listeners
document.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

document.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

document.addEventListener('mousedown', () => {
    for (let i = 0; i < 50; i++) {
        const dir = randomIntFromRange(0,359);
        const vel = Math.random() * 5 + 0.5;
        const xv = Math.cos(dir) * vel;
        const yv = Math.sin(dir) * vel;
        new Particle(mouse.x, mouse.y, randomIntFromRange(10, 15), randomColor(colors), xv, yv);
    }
});

// Call to action!
animate();