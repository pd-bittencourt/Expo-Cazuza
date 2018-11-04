const pls = [
  {
    title: 'Pro Dia Nascer Feliz',
    musicas: [ 
      {
        i: 1,
        title: 'O Nosso Amor A Gente Inventa',
        url: './audio/o_nosso_amor_a_gente_inventa.mp3'
      },
      {
        i: 2,
        title: 'Blues da piedade',
        url: './audio/blues_da_piedade.mp3'
      },
      {
        i: 3,
        title: 'Bete Balanço',
        url: './audio/bete_balanco.mp3'
      },{
        i: 4,
        title: 'Pro Dia Nascer Feliz',
        url: './audio/pro_dia_nascer_feliz.mp3'
      }
    ]
  },
  {
    title: 'Pode seguir a sua estrela',
    musicas: [ 
      {
        i: 1,
        title: 'Exagerado',
        url: './audio/exagerado.mp3'
      },
      {
        i: 2,
        title: 'Ideologia',
        url: './audio/ideologia.mp3'
      },
      {
        i: 3,
        title: 'Maior Abandonado',
        url: './audio/maior_abandonado.mp3'
      },
      {
        i: 4,
        title: 'Brasil',
        url: './audio/brasil.mp3'
      }
    ]
  },
  {
    title: 'Mais uma dose? É claro que eu tô afim.',
    musicas: [ 
      {
        i: 1,
        title: 'Por que a gente é assim?',
        url: './audio/pq_a_gente_e_assim.mp3'
      },
      {
        i: 2,
        title: 'Completamente Blue',
        url: './audio/completamente_blue.mp3'
      },
      {
        i: 3,
        title: 'O tempo não para',
        url: './audio/o_tempo_nao_para.mp3'
      },
      {
        i: 4,
        title: 'Minha Flor, Meu Bebê',
        url: './audio/minha_flor.mp3'
      },
    ]
  },
  {
    title: 'Faz parte do meu show',
    musicas: [ 
      {
        i: 1,
        title: 'Boas Novas',
        url: './audio/boas_novas.mp3'
      },
      {
        i: 2,
        title: 'Pro dia nascer feliz',
        url: './audio/pro_dia_nascer_feliz.mp3'
      },
      {
        i: 3,
        title: 'Faz parte do meu show ',
        url: './audio/faz_parte_do_meu_show.mp3'
      },
      {
        i: 4,
        title: 'Bete Balanço',
        url: './audio/bete_balanco.mp3'
      }
    ]
  },
  {
    title: 'Até nas coisas mais banais',
    musicas: [ 
      {
        i: 1,
        title: 'Esse Cara',
        url: './audio/esse_cara.mp3'
      },
      {
        i: 2,
        title: 'Codinome Beija-Flor',
        url: './audio/codinome_beija_flor.mp3'
      },
      {
        i: 3,
        title: 'Ritual',
        url: './audio/ritual.mp3'
      },
      {
        i: 4,
        title: 'Quase um segundo',
        url: './audio/quase_um_segundo.mp3'
      }
    ]
  },{
    title: 'O tempo não para',
    musicas: [ 
      {
        i: 1,
        title: 'Ideologia',
        url: './audio/ideologia.mp3'
      },
      {
        i: 2,
        title: 'O Tempo não para',
        url: './audio/o_tempo_nao_para.mp3'
      },
      {
        i: 3,
        title: 'Um trem para as estrelas',
        url: './audio/um_trem_para_as_estrelas.mp3'
      },
      {
        i: 4,
        title: 'Exagerado',
        url: './audio/exagerado.mp3'
      }
    ]
  }
]

const plBtn = document.querySelector('.playlist-1');
const plBtns = document.querySelectorAll('.lista>ul>li>button');

const plName = document.querySelector('.playlist-name');
const plSelected = document.querySelector('.playlist-selected');
const plTrack = document.querySelector('.playlist-track');

const player = document.querySelector('.player');
const btnPlay = document.querySelector('.play');
const btnBack = document.querySelector('.back');
const btnNext = document.querySelector('.next');
const btnVolume = document.querySelector('.volume');

const track = new Audio();
let track_index = 1;
let is_playing = false;
let currentPl = 0;
let currentTrack = 0;

const el1 = document.createElement("span");
const el2 = document.createElement("span");
const el3 = document.createElement("span");
el1.classList.add('now-playing', 'bar-1');
el2.classList.add('now-playing', 'bar-2');
el3.classList.add('now-playing', 'bar-3');

function choosePl(obj) {
  currentPl = obj.getAttribute('data-id');
  obj.classList.add('selected');
  obj.appendChild(el1);
  obj.appendChild(el2);
  obj.appendChild(el3);
  for(let i = 0; i < plBtns.length; i++){
    if(obj != plBtns[i]){
      plBtns[i].classList.remove('selected');
    }
  }
  // animation equalizer
  const infiniteLoopAlternate = anime.timeline({
    direction: 'alternate',
    loop: true
  });

  infiniteLoopAlternate
    .add({
      targets: '.now-playing.bar-1',
      scaleY: [
        { value: 8, duration: 300 },
        { value: 5, duration: 300 },
        { value: 10, duration: 300 },
        { value: 9, duration: 300 },
        { value: 5, duration: 300 }
    ],
    offset: 0,
    easing: 'linear' 
    })
    .add({
      targets: '.now-playing.bar-2',
      scaleY: [
        { value: 3, duration: 300 },
        { value: 8, duration: 300 },
        { value: 9, duration: 300 },
        { value: 3, duration: 300 },
        { value: 10, duration: 300 }
    ],
    offset: 0,
    easing: 'linear' 
    })
    .add({
      targets: '.now-playing.bar-3',
      scaleY: [
        { value: 9, duration: 300 },
        { value: 8, duration: 300 },
        { value: 5, duration: 300 },
        { value: 10, duration: 300 },
        { value: 4, duration: 300 }
    ],
    offset: 0,
    easing: 'linear' 
    })
  currentTrack = 0;
  trackPlaying();
  playPauseTrack();
  showPlayer();
}

function showPlayer() {
  if(player.classList.contains('oculto')){
    player.classList.remove('oculto');
  }
}

function trackPlaying() {
  track.src = pls[currentPl].musicas[currentTrack].url;
  plSelected.textContent = pls[currentPl].title;
  plTrack.textContent = pls[currentPl].musicas[currentTrack].i + '. ' + pls[currentPl].musicas[currentTrack].title;
}

function playPauseTrack(){
  if(track.paused) {
    track.play();
    is_playing = true;
    btnPlay.classList.add('pause-icon');
    stoper();
  } else {
    track.pause();
    is_playing = false;
    btnPlay.classList.remove('pause-icon');
    backToRoot();
  }
}

function nextTrack() {
  currentTrack++;
  if(currentTrack >= pls[currentPl].musicas.length){
    currentTrack = 0;
  }
  trackPlaying();
  playPauseTrack();
}

function prevTrack() {
  currentTrack--;
  if(currentTrack <= 0){
    currentTrack = 0;
  }
  trackPlaying();
  playPauseTrack();
}

track.addEventListener('timeupdate', function(){
  if (track.duration === track.currentTime && currentTrack === 4){
    track.pause();
    btnPlay.classList.remove('pause-icon');
    backToRoot();
  } else if (track.duration === track.currentTime) {
    currentTrack++ ;
    trackPlaying();
    track.play();
  }
})

const ajustVolume = (e) => {
  track.volume = e;
}

// Retornar a pagina principal
let timer;
function backToRoot() {
  timer = setTimeout('window.location.href="../cazuza.html"', 15000);
}

function stoper() {
  clearTimeout(timer);
} 

trackPlaying();