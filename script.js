const glow = document.querySelector(".mouse-glow");
const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

// --------------------
// Mouse Glow
// --------------------
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

function animateGlow() {
    if (glow) {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }

    requestAnimationFrame(animateGlow);
}

animateGlow();

// --------------------
// Particles
// --------------------
if (canvas && ctx) {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 35 : 70;

    for (let i = 0; i < particleCount; i++) {
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

        for (const p of particles) {
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.25)";
            ctx.fill();
        }

        requestAnimationFrame(drawParticles);
    }

    drawParticles();

    window.addEventListener("resize", resizeCanvas);
}