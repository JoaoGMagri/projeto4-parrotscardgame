const game = document.querySelector('.game');

const todasAsCartas = [
    
    'bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
    
];
let listaDeCartas = [];

let primeiraCarta = '';
let segundaCarta = '';
let quantidadeDeCartas = 0;
let tentativas = 0;
let tempo = 0;
let id = 0;

function iniciarGame() {

    quantidadeDeCartas = Number(prompt('Com quantas cartas quer jogar de 4 a 14??'));

    if (quantidadeDeCartas < 4 || quantidadeDeCartas > 14 || quantidadeDeCartas%2 !== 0) {
        
        alert("Escolha a quantidade de cartas entre 4 e 14 e que seja par");
        iniciarGame();
    
    }else {

        for (let i = 0; i < (quantidadeDeCartas/2); i++) {

            listaDeCartas[i] = todasAsCartas[i];
        
        }
        carregarJoga();
    
    }

}
iniciarGame();


function carregarJoga() {

    const duplicaListaDeCartas = [ ...listaDeCartas, ...listaDeCartas ];

    const arrayEmbaralhado = duplicaListaDeCartas.sort( () => Math.random() - 0.5 );

    arrayEmbaralhado.forEach((cartas) => {

        const carta = criarCartas(cartas);
        game.appendChild(carta);

    }); 

    giroDeCartaInicial();

}


function criarElemento(tag, Name) {

    const elemento = document.createElement(tag);
    elemento.className= Name;
    return elemento;

}


function giroDeCartaInicial() {

    setTimeout(() => {

        const cartasViradas = document.querySelectorAll('.carta');
        
        for (let i = 0; i < cartasViradas.length; i++) {

            cartasViradas[i].classList.remove('revelaCarta');

        }

    }, 1000);

    iniciarRelogio();

}


function iniciarRelogio() {

    id = setInterval(relogio, 1000);

}


function relogio() {
    
    tempo++;
    const relogio = document.querySelector('.contador');
    relogio.innerHTML = tempo;

}


function criarCartas(cartas) {

    const quantasCartas = document.querySelector('.game');

    quantasCartas.style.gridTemplateColumns = `repeat(${quantidadeDeCartas/2} , 117px)`;

    const carta = criarElemento('div', 'carta revelaCarta');
    const frente = criarElemento('div', 'faces frente');
    const atras = criarElemento('div', 'faces atras');

    frente.style.backgroundImage = `url('assets/image/${cartas}')`;

    carta.appendChild(frente);
    carta.appendChild(atras);

    carta.addEventListener('click', revelaCarta);
    carta.setAttribute('data-carta', cartas);

    return carta;

}


function revelaCarta({target}) {

    if (target.parentNode.className.includes('revelaCarta')){
        
        return;

    }

    if (primeiraCarta === '') {
        
        target.parentNode.classList.add('revelaCarta');
        primeiraCarta = target.parentNode;
        tentativas++;

    } else if (segundaCarta === '') {

        target.parentNode.classList.add('revelaCarta');
        segundaCarta = target.parentNode;
        tentativas++;        

        checarCartas();

    }

}


function checarCartas() {

    const primeiroAtributo = primeiraCarta.getAttribute('data-carta');
    const segundoAtributo = segundaCarta.getAttribute('data-carta');

    if (primeiroAtributo === segundoAtributo) {

        primeiraCarta = '';
        segundaCarta = '';

        fimDeJogo();

    } else {

        setTimeout(() => {

            primeiraCarta.classList.remove('revelaCarta');
            segundaCarta.classList.remove('revelaCarta');
            
            primeiraCarta = '';
            segundaCarta = '';
        }, 1000);

    }

}


function fimDeJogo() {

    const cartasViradas = document.querySelectorAll('.revelaCarta');

    if (cartasViradas.length === quantidadeDeCartas) {
        
        clearInterval(id);

        setTimeout(() => {

            alert(`
                Você ganhou em ${tentativas} jogadas!
                Em ${tempo} segundos
            `);

            reinicarGame();

        }, 1000);

    }

}


function reinicarGame() {

    const reiniciar = prompt("Deseja reinicar?");
    const corpo = document.querySelector('.game');

    if (reiniciar === 'sim' || reiniciar === 'Sim') {

        corpo.innerHTML = '';
        listaDeCartas = [];
        tentativas = 0;
        tempo = 0;
        iniciarGame();

    } else if(reiniciar === 'nao' || reiniciar === 'Nao' ||  reiniciar === 'não' || reiniciar === 'Não') {

        return;

    } else {

        reinicarGame();

    }

}