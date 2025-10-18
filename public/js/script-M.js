//DECLARAÇÃO DE VARIAVEIS
const slider = document.querySelector('.slider');
const sliderContent = document.querySelector('.slider-conteudo');
const radioAuto = document.querySelector('.radio-auto');
const leftArrow = document.getElementById("seta-esquerda");
const rightArrow = document.getElementById("seta-direita");

let currentPage = 0;
let itemsPerView = 1;
let totalPages = 1;
let autoSlidesInterval;

//FUNÇOES DE UPDATE
function updateCarrossel() {
    const sliderWidth = slider.offsetWidth;
    const itemWidth = sliderContent.children[0].getBoundingClientRect().width;

    itemPerView = (sliderWidth / itemWidth);
    totalPages = Math.ceil((sliderContent.children.length / itemsPerView) - 2*((sliderWidth/itemWidth)/100))

    createRadioLabel();
    updateRadioLabel();
}

function createRadioLabel () {
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
function updateRadioLabel() {
    const labels = document.querySelectorAll('.radio-label');
    labels.forEach( (l,i) => {
        l.classList.toggle('active', i === currentPage)
    });
}

//MOVIMENTAÇÃO
function scrollToPage () {
    const newPosition = slider.offsetWidth * currentPage;
    sliderContent.scrollTo( {left: newPosition, behavior: 'smooth'} );
    updateRadioLabel();
    resetAutoSlide();
}
function moveLeft() {
    currentPage--;
    if (currentPage < 0)
    {
        currentPage = totalPages - 1;
    }
    scrollToPage();
    resetAutoSlide();
}
function moveRight() {
    currentPage++;
    if (currentPage >= totalPages)
    {
        currentPage = 0;
    }
    scrollToPage();
    resetAutoSlide();
}

//SLIDE AUTOMATICO
function startAutoSlide()
{
    autoSlidesInterval = setInterval( () => {
        moveRight();
    }, 4000)
}
function resetAutoSlide() {
    clearInterval(autoSlidesInterval);
    startAutoSlide();
}

//CHAMADA DAS FUNÇÕES
leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight);
window.addEventListener('resize', updateCarrossel);

updateCarrossel();
startAutoSlide();
console.log("Java Script está funcionando");