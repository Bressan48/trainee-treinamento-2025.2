//Passando elementos HTML para variaveis JavaScript
const slider = document.querySelector('.slider');
const sliderContent = document.querySelector('.slider-conteudo');
const radioAuto = document.querySelector('.radio-auto');
const leftArrow = document.getElementById("seta-esquerda");
const rightArrow = document.getElementById("seta-direita");

//Declarar variaveis globais
let currentPage = 0;
let itemsPerView = 1;
let totalPages = 1;
let autoSlideInterval;

// Criação/Organização do Carrossel
function updateCarrossel()
{
    const sliderWidth = slider.offsetWidth;
    const itemWidth = sliderContent.children[0].getBoundingClientRect().width;
    
    itemsPerView = (sliderWidth / itemWidth)
    totalPages = Math.ceil((sliderContent.children.length / itemsPerView) - 2*((sliderWidth / itemWidth)/100))

    createRadioLabel();
    updateRadioLabel();
}

//RADIO LABEL
function createRadioLabel() 
{
    radioAuto.innerHTML = " ";
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
        })
        radioAuto.appendChild(label);
    }
}
function updateRadioLabel() 
{
    const labels = document.querySelectorAll('.radio-label');
    labels.forEach( (l,i) => {
        l.classList.toggle('active', i === currentPage)
    });
}

// MOVIMENTAÇÃO
function scrollToPage()
{
    const newPosition = slider.offsetWidth * currentPage;
    sliderContent.scrollTo({ left:newPosition, behavior: 'smooth' });
    updateRadioLabel();
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

// SLIDE AUTOMATICO
function startAutoSlide()
{
    autoSlideInterval = setInterval( () => {
        moveRight();
    }, 4000)
}
function resetAutoSlide()
{
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

//EVENTOS
leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight);
window.addEventListener('resize', updateCarrossel);

//CHAMA INÍCIO DAS FUNÇÕES
updateCarrossel();
startAutoSlide();