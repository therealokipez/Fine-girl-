// Create sparkles
for (let i = 0; i < 50; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    document.body.appendChild(sparkle);
}

const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');
const container = canvas.parentElement;

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Realistic flower drawing functions
function drawRose(x, y, size, color, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    // Outer petals
    for (let i = 0; i < 8; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / 8);
        
        const gradient = ctx.createRadialGradient(0, -size * 0.7, 0, 0, -size * 0.7, size * 0.4);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.5, color);
        gradient.addColorStop(1, '#8b0000');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.7, size * 0.35, size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(139, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
    }
    
    // Inner petals
    for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / 5 + 0.3);
        
        const innerGrad = ctx.createRadialGradient(0, -size * 0.4, 0, 0, -size * 0.4, size * 0.25);
        innerGrad.addColorStop(0, '#ff6b8a');
        innerGrad.addColorStop(1, color);
        
        ctx.fillStyle = innerGrad;
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.4, size * 0.25, size * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    
    // Center
    const centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.15);
    centerGrad.addColorStop(0, '#ffeb3b');
    centerGrad.addColorStop(1, '#ff6b8a');
    ctx.fillStyle = centerGrad;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawSunflower(x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    // Yellow petals
    for (let i = 0; i < 13; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 * i) / 13);
        
        const petalGrad = ctx.createLinearGradient(0, -size, 0, -size * 0.4);
        petalGrad.addColorStop(0, '#ffeb3b');
        petalGrad.addColorStop(1, '#ffa726');
        
        ctx.fillStyle = petalGrad;
        ctx.beginPath();
        ctx.ellipse(0, -size * 0.7, size * 0.2, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(255, 152, 0, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
    }
    
    // Brown center with texture
    const centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.3);
    centerGrad.addColorStop(0, '#8d6e63');
    centerGrad.addColorStop(0.6, '#5d4037');
    centerGrad.addColorStop(1, '#3e2723');
    
    ctx.fillStyle = centerGrad;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Add seeds texture
    ctx.fillStyle = 'rgba(62, 39, 35, 0.5)';
    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * size * 0.25;
        const sx = Math.cos(angle) * radius;
        const sy = Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(sx, sy, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
}

function drawTulip(x, y, size, color, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    // Three main petals
    const petalColors = [color, color, color];
    const petalOffsets = [-0.35, 0, 0.35];
    
    petalOffsets.forEach((offset, i) => {
        const gradient = ctx.createLinearGradient(offset * size * 0.6, -size, offset * size * 0.6, 0);
        gradient.addColorStop(0, petalColors[i]);
        gradient.addColorStop(0.7, petalColors[i]);
        gradient.addColorStop(1, '#c2185b');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(offset * size * 0.6, 0);
        ctx.bezierCurveTo(
            offset * size * 0.8, -size * 0.3,
            offset * size * 0.6, -size * 0.8,
            offset * size * 0.3, -size
        );
        ctx.bezierCurveTo(
            offset * size * 0.1, -size * 0.9,
            offset * size * 0.4, -size * 0.4,
            offset * size * 0.6, 0
        );
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = 'rgba(194, 24, 91, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
    
    ctx.restore();
}

function drawStem(x1, y1, x2, y2) {
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, '#4caf50');
    gradient.addColorStop(1, '#2e7d32');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x1 + (x2 - x1) * 0.5 - 20, y1 + (y2 - y1) * 0.5, x2, y2);
    ctx.stroke();
    
    // Shadow
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(x1 + 2, y1 + 2);
    ctx.quadraticCurveTo(x1 + (x2 - x1) * 0.5 - 18, y1 + (y2 - y1) * 0.5 + 2, x2 + 2, y2 + 2);
    ctx.stroke();
}

function drawLeaf(x, y, size, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    const gradient = ctx.createLinearGradient(-size, 0, size, 0);
    gradient.addColorStop(0, '#2e7d32');
    gradient.addColorStop(0.5, '#4caf50');
    gradient.addColorStop(1, '#2e7d32');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.8, size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#1b5e20';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.restore();
}

let progress = 0;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (progress < 1) {
        progress += 0.01;
    }
    
    const p = Math.min(progress * 1.2, 1);
    
    // Draw stems first
    if (p > 0.1) {
        drawStem(centerX - 150, centerY + 200, centerX - 120, centerY - 20);
        drawStem(centerX - 50, centerY + 200, centerX - 30, centerY - 50);
        drawStem(centerX + 50, centerY + 200, centerX + 40, centerY - 30);
        drawStem(centerX + 150, centerY + 200, centerX + 130, centerY - 60);
        drawStem(centerX, centerY + 200, centerX, centerY - 10);
    }
    
    // Draw leaves
    if (p > 0.3) {
        drawLeaf(centerX - 140, centerY + 50, 25, -0.5);
        drawLeaf(centerX - 40, centerY + 80, 25, 0.3);
        drawLeaf(centerX + 60, centerY + 70, 25, -0.4);
        drawLeaf(centerX + 140, centerY + 40, 25, 0.6);
        drawLeaf(centerX + 10, centerY + 90, 25, 0.2);
    }
    
    // Draw flowers progressively
    if (p > 0.4) {
        drawRose(centerX - 120, centerY - 20, 50 * p, '#e91e63', 0.3);
    }
    if (p > 0.5) {
        drawSunflower(centerX - 30, centerY - 50, 45 * p, 0.8);
    }
    if (p > 0.6) {
        drawTulip(centerX + 40, centerY - 30, 55 * p, '#f06292', -0.2);
    }
    if (p > 0.7) {
        drawRose(centerX + 130, centerY - 60, 48 * p, '#ff4081', -0.5);
    }
    if (p > 0.8) {
        drawTulip(centerX, centerY - 10, 52 * p, '#ec407a', 0.1);
    }
    
    if (progress < 1) {
        requestAnimationFrame(animate);
    }
}

setTimeout(() => animate(), 500);

// Floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.opacity = '0';
    heart.style.animation = 'floatHeart 6s ease-in-out';
    heart.style.zIndex = '1';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 1000);
