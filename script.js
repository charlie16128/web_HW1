const logo = document.getElementById('logo');

let x = Math.random() * (window.innerWidth - 125);
let y = Math.random() * (window.innerHeight - 50);
let dx = 3;
let dy = 3;
const logoWidth = 125;
let logoHeight = 0;

function animate() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    logoHeight = logo.clientHeight || 50;

    x += dx;
    y += dy;

    if (x <= 0 || x + logoWidth >= winWidth) {
        dx = -dx;
        x = x <= 0 ? 0 : winWidth - logoWidth;
    }
    if (y <= 0 || y + logoHeight >= winHeight) {
        dy = -dy;
        y = y <= 0 ? 0 : winHeight - logoHeight;
    }
    
    logo.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.addEventListener('mousedown', (e) => {
    if (e.button === 0) { 
        let speedX = Math.random() * 4 + 2; 
        let speedY = Math.random() * 4 + 2; 

        dx = (Math.random() > 0.5 ? 1 : -1) * speedX;
        dy = (Math.random() > 0.5 ? 1 : -1) * speedY;
    }
});

let is_pause = false;
window.addEventListener('keydown', (e) => {
    const step = Math.random() * 2 + 2; 
    

    switch(e.key) {
        case 'ArrowUp':
            dy -= step;
            break;
        case 'ArrowDown':
            dy += step;
            break;
        case 'ArrowLeft':
            dx -= step;
            break;
        case 'ArrowRight':
            dx += step;
            break;
        case ' ': 
            if (!is_pause) {
                dx = 0;
                dy = 0;
                is_pause = true;
            } else {
                dx = (Math.random() > 0.5 ? 1 : -1);
                dy = (Math.random() > 0.5 ? 1 : -1);
                is_pause = false; 
            }
            
            break;
    }
    
    const maxSpeed = 10;
    dx = Math.max(-maxSpeed, Math.min(maxSpeed, dx));
    dy = Math.max(-maxSpeed, Math.min(maxSpeed, dy));
});

const blocks = document.querySelectorAll('.block');
const loadingText = document.getElementById('loading-text');
let currentBlock = 0;
let state = 'loading';

setInterval(() => {
    if (state === 'loading') {
        if (currentBlock < 10) {
            blocks[currentBlock].classList.add('active');
            currentBlock++;
            loadingText.innerText = `等待重試...${10 - currentBlock}s`;
            
        }
        if (currentBlock === 10) {
            blocks.forEach(block => block.classList.add('error'));
            loadingText.innerText = "重新整理中";
            loadingText.style.color = "green";
            state = 'error';
        }
    } else if (state === 'error') {
        blocks.forEach(block => { block.classList.remove('active', 'error'); });

        currentBlock = 0;
        loadingText.innerText = "等待重試...0%";
        loadingText.style.color = "white";
        state = 'loading';
        // location.reload();
    }
}, 1000);