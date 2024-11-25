
    const html = document.querySelector('html')

        const focoBt = document.querySelector('.app__card-button--foco')

            const curtoBt = document.querySelector('.app__card-button--curto')

                const longoBt = document.querySelector('.app__card-button--longo')

                    const banner = document.querySelector('.app__image')

                        const titulo = document.querySelector('.app__title')
                            
                            const botoes = document.querySelectorAll('.app__card-button')

                                 const StartPauseBt = document.querySelector('#start-pause')

                                const MusicaFocoInput = document.querySelector('#alternar-musica')

                            const Musica = new Audio('sons/luna-rise-part-one.mp3')
                                   
                        let tempoDecorridoEmSegundos = 1500

                    let intervaloId = null

                Musica.loop = true

            const playMusic = new Audio ('sons/play.wav')

        const pauseMusic = new Audio ('sons/pause.mp3')

    const finishMusic = new Audio ('sons/beep.mp3')

 const iniciarOupausarBt = document.querySelector('#start-pause span')

    const setaPause = document.querySelector('.app__card-primary-butto-icon')

        const tempoNaTela = document.querySelector('#timer')


    MusicaFocoInput.addEventListener('change', ( ) => {
        if(Musica.paused){
            Musica.play()
        } else{
            Musica.pause()
        }

    })

    focoBt.addEventListener('click', () => {
        tempoDecorridoEmSegundos = 1500
        alterarContexto('foco')

        focoBt.classList.add('active')

        //html.setAttribute('data-contexto', 'foco');
           // banner.setAttribute('src', 'imagens/foco.png')
})

    curtoBt.addEventListener('click', () => {
        tempoDecorridoEmSegundos = 300
        alterarContexto('descanso-curto')

        curtoBt.classList.add('active')

        //html.setAttribute('data-contexto', 'descanso-curto')
            //banner.setAttribute('src', 'imagens/descanso-curto.png')
})

    longoBt.addEventListener('click', () => {
        tempoDecorridoEmSegundos = 900
        alterarContexto('descanso-longo')

        longoBt.classList.add('active')

        //html.setAttribute('data-contexto', 'descanso-longo')
            //banner.setAttribute('src', 'imagens/descanso-longo.png')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
})

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png` )
    
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade, <br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

            case "descanso-curto":
                titulo.innerHTML = `
                Que tal dar uma respirada <br>
                <strong class="app__title-strong">Faça uma pausa curta .</strong>
                `
                break;

            case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superficie <br>
                <strong class="app__title-strong">Faça uma pausa longa .</strong>
                `

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){

        finishMusic.play();
        zerar()
        alert('Tempo Finalizado!')
        
        return

    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    //console.log('temporizador: ' + tempoDecorridoEmSegundos)
}

StartPauseBt.addEventListener('click', iniciarOupausar)

function iniciarOupausar(){
    if(intervaloId){
        pauseMusic.play();
        zerar()
        return
    }
    playMusic.play();
    setaPause.setAttribute('src', 'imagens/pause.png')
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOupausarBt.textContent = "Pausar"
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOupausarBt.textContent = "Começar"
    setaPause.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()