// DATA LAYER - Conteúdo Gerenciado via JS
const featureData = [
    { title: "Tecnologia", desc: "Laboratórios equipados com IA e robótica." },
    { title: "Inclusão", desc: "Ambiente adaptado para todas as necessidades." },
    { title: "Esportes", desc: "Programas atléticos de alto desempenho." }
];

const faqData = [
    { q: "Qual o horário das aulas?", a: "As aulas ocorrem das 08:00 às 13:00 no período matutino." },
    { q: "Existe sistema de bolsas?", a: "Sim, realizamos provas anuais para concessão de bolsas." }
];

const slideData = [
    " 'A melhor escola da região!' - Maria S. ",
    " 'Metodologia inovadora e acolhedora.' - João P. ",
    " 'Meu filho adora os laboratórios.' - Ana L. "
];

// RENDERIZAÇÃO DINÂMICA
function init() {
    // Renderizar Cards
    const cardWrapper = document.getElementById('cards-wrapper');
    featureData.forEach(item => {
        cardWrapper.innerHTML += `
            <article class="card">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </article>
        `;
    });

    // Renderizar FAQ
    const faqGroup = document.getElementById('accordion-group');
    faqData.forEach((item, index) => {
        faqGroup.innerHTML += `
            <div class="accordion-item">
                <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(this)">
                    ${item.q}
                </button>
                <div class="accordion-content">
                    <p>${item.a}</p>
                </div>
            </div>
        `;
    });

    // Renderizar Slides
    const track = document.getElementById('carousel-track');
    slideData.forEach(text => {
        track.innerHTML += `<div class="slide">${text}</div>`;
    });
}

// ACESSIBILIDADE: CONTROLE DE FONTE
let currentFontSize = 16;
function changeFontSize(action) {
    currentFontSize = action === 'increase' ? currentFontSize + 2 : currentFontSize - 2;
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
}

// ACESSIBILIDADE: ALTO CONTRASTE
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// COMPONENTE: ACORDEÃO
function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    btn.setAttribute('aria-expanded', !isExpanded);
    content.style.maxHeight = !isExpanded ? content.scrollHeight + "px" : "0";
}

// COMPONENTE: CARROSSEL
let currentSlide = 0;
document.getElementById('next-btn').addEventListener('click', () => {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    document.getElementById('carousel-track').style.transform = `translateX(-${currentSlide * 100}%)`;
});

document.getElementById('prev-btn').addEventListener('click', () => {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    document.getElementById('carousel-track').style.transform = `translateX(-${currentSlide * 100}%)`;
});

// SCROLL REVEAL (Intersection Observer API)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// INICIALIZAÇÃO
window.onload = init;
