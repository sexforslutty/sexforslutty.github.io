const glow = document.querySelector(".mouse-glow");
const nickname = document.querySelector(".nickname");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

// Mouse glow
window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

function animateGlow() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    glow.style.transform = `translate(${currentX}px, ${currentY}px)`;

    requestAnimationFrame(animateGlow);
}

animateGlow();

// Intro animation
window.addEventListener("load", () => {
    nickname.style.opacity = "0";
    nickname.style.transform = "translateY(25px) scale(0.96)";

    requestAnimationFrame(() => {
        nickname.style.transition =
            "opacity 1.5s ease, transform 1.5s ease";

        nickname.style.opacity = "1";
        nickname.style.transform = "translateY(0) scale(1)";
    });
});

// Particles
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for (let i = 0; i < 70; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
    });

    requestAnimationFrame(drawParticles);
}

drawParticles();

// Responsive canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
