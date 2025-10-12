// carrossel-unico.js
// Passando elementos HTML para variáveis JavaScript
const sliderContent = document.querySelector('.slider-conteudo');
const slides = document.querySelectorAll('.slider-item');
const radioAuto = document.querySelector('.radio-auto');
const leftArrow = document.getElementById("seta-esquerda");
const rightArrow = document.getElementById("seta-direita");

// Declarando variáveis globais
let currentPage = 0;
let totalPages = slides.length;
let autoSlideInterval;

// CRIAÇÃO/ORGANIZAÇÃO DO CARROSSEL
function updateCarrossel() 
{
    const offset = -currentPage * 100; //empurra o elemento 100% da largura dele para a esquerda
    sliderContent.style.transform = `translateX(${offset}%)`;
    createRadioLabel();
    updateRadioLabel();
}

// RADIO LABEL
function createRadioLabel() 
{
    radioAuto.innerHTML = "";
    for (let i = 0; i < totalPages; i++)
    {
        const label = document.createElement('div');
        label.classList.add('radio-label');
        if (i === 0) 
            {
            label.classList.add('active');
        }
        label.addEventListener('click', () => {
            currentPage = i;
            updateCarrossel();
            resetAutoSlide();
        });
        radioAuto.appendChild(label);
    }
}
function updateRadioLabel() 
{
    const labels = document.querySelectorAll('.radio-label');
    labels.forEach((l, i) => {
        l.classList.toggle('active', i === currentPage)
    });
}

// MOVIMENTAÇÃO
function moveLeft() {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    updateCarrossel();
    resetAutoSlide();
}
function moveRight() {
    currentPage = (currentPage + 1) % totalPages;
    updateCarrossel();
    resetAutoSlide();
}

// SLIDE AUTOMÁTICO
function startAutoSlide() 
{
    autoSlideInterval = setInterval(() => {
        moveRight();
    }, 4000);
}
function resetAutoSlide() 
{
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// EVENTOS
leftArrow.addEventListener('click', () => {
    moveLeft();
});
rightArrow.addEventListener('click', () => {
    moveRight();
});
window.addEventListener('resize', updateCarrossel);

// CHAMADA DE INÍCIO DAS FUNÇÕES
updateCarrossel();
startAutoSlide();
