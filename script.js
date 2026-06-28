const glow = document.querySelector(".mouse-glow");
const canvas = document.getElementById("particles");
const nickname = document.querySelector(".nickname");
const hero = document.querySelector(".hero");
const ctx = canvas ? canvas.getContext("2d") : null;

const isMobile =
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

if (!isMobile && hero && nickname) {
    hero.addEventListener("mousemove", (e) => {
        const rect = nickname.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        const rotateX = -dy / 22;
        const rotateY = dx / 22;
        const skewX = dx / 140;

        nickname.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            skewX(${skewX}deg)
            scale(1.04)
        `;
    });

    hero.addEventListener("mouseleave", () => {
        nickname.style.transform = "perspective(1200px) rotateX(0) rotateY(0) scale(1)";
    });
}

function animateGlow() {
    if (glow && !isMobile) {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }

    requestAnimationFrame(animateGlow);
}

animateGlow();

if (canvas && ctx) {
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const particles = [];
    const particleCount = isMobile ? 35 : 70;

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