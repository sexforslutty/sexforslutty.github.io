// Mouse glow element
const glow = document.querySelector(".mouse-glow");
const nickname = document.querySelector(".nickname");

// Current and target positions for smooth interpolation
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

// Track mouse movement
window.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
});

// Smooth animation loop
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
    nickname.style.transform = "translateY(30px) scale(0.96)";

    requestAnimationFrame(() => {
        nickname.style.transition =
            "opacity 1.5s ease, transform 1.5s ease";

        nickname.style.opacity = "1";
        nickname.style.transform = "translateY(0) scale(1)";
    });
});
