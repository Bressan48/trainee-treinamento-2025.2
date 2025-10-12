// carrossel-multiplo.js
// Passando elementos HTML para variáveis JavaScript
const slider = document.querySelector('.slider');
const sliderItems = document.querySelector('.slider-conteudo');
const radioAuto = document.querySelector('.radio-auto');
const leftArrow = document.getElementById("seta-esquerda");
const rightArrow = document.getElementById("seta-direita");

// Declarando variáveis globais
let currentPage = 0;
let itemsPerView = 1;
let totalPages = 1;
let autoSlideInterval;

// CRIAÇÃO/ORGANIZAÇÃO DO CARROSSEL
function updateCarrossel() 
{
    const sliderWidth = slider.offsetWidth;
    const itemWidth = sliderItems.children[0].getBoundingClientRect().width; // corrigido: pega o primeiro item corretamente
    
    itemsPerView = Math.max(1, Math.floor(sliderWidth / itemWidth));
    totalPages = Math.ceil( (sliderItems.children.length / itemsPerView) - 1 );

    createLabelButtons();
    updateLabelButtons();
}

// RADIO LABEL
function createLabelButtons() 
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
            scrollToPage();
        });
        radioAuto.appendChild(label);
    }
}
function updateLabelButtons() 
{
    const labels = document.querySelectorAll('.radio-label');
    labels.forEach((l, i) => l.classList.toggle('active', i === currentPage));
}

// MOVIMENTAÇÃO
function scrollToPage()
{
    const newPosition = slider.offsetWidth * currentPage;
    sliderItems.scrollTo({ left:newPosition, behavior:'smooth' });
    updateLabelButtons();
    resetAutoSlide();
}
function moveLeft()
{
    currentPage--;
    if (currentPage < 0)
    {
        currentPage = totalPages-1;
    }
    scrollToPage();
    resetAutoSlide();
}
function moveRight()
{
    currentPage++;
    if (currentPage >= totalPages)
    {
        currentPage = 0;
    }
    scrollToPage();
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
leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight);
window.addEventListener('resize', updateCarrossel);

// CHAMADA DE INÍCIO DAS FUNÇÕES
updateCarrossel();
startAutoSlide();
