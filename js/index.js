window.onload = function() {
  alert( 'Документ и все ресурсы загружены' );
};

/**
 * Меню
 */

const menu = document.querySelector('.section-menu'),
  menuItems = menu.querySelectorAll('.menu__item');

for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener('click', function () {
    const that = this;
    for (let j = 0; j < menuItems.length; j++) {
      if (that === menuItems[j]) {
        if (menuItems[j].classList.contains('is-active')) {
          menuItems[j].classList.remove('is-active');
        } else {
          menuItems[j].classList.add('is-active');
        }
      } else {
        menuItems[j].classList.remove('is-active');
      }
    }
  })
}


/**
 * Video player
 */

const video = document.querySelector('#player'),
  playBtn = document.querySelector('.duration__img'),
  whitePlayBtn = document.querySelector('.video__player-img'),
  videoTimer = document.querySelector('#timer'),
  mic = document.querySelector('#mic'),
  soundControl = document.querySelector('#micLevel'),
  durationControl = document.querySelector('#durationLevel');

let soundLevel = null, 
  intervalId;

soundControl.min = 0;
soundControl.max = 10;
soundControl.value = soundControl.max;

durationControl.value = 0;


playBtn.addEventListener('click', () => {
  playStop();
});

whitePlayBtn.addEventListener('click', () => {
  playStop();
});

video.addEventListener('click', () => {
  playStop();
});

video.addEventListener('timeupdate', () => {
  videoTimer.innerText = secondsToTime(video.currentTime);
});

mic.addEventListener('click', soundOf);
// soundControl.addEventListener('click', changeSoundVolume);
soundControl.addEventListener('mousemove', changeSoundVolume); 

durationControl.addEventListener('mousedown', stopInterval);
durationControl.addEventListener('mouseup', setVideoDuration);

function playStop() {
  if (video.paused) {
    video.play();
    playBtn.setAttribute('src', './img/player/Pause_gray.png');
    whitePlayBtn.classList.toggle('video__player-img--active');
    intervalId = setInterval(updateDuration, 1000 / 66);
  } else {
    video.pause();
    playBtn.setAttribute('src', './img/player/Play_gray.png');
    whitePlayBtn.classList.toggle('video__player-img--active');
    clearInterval(intervalId);
  }
}

function secondsToTime(time) {
  let h = Math.floor(time / (60 * 60)),
    fulltime,
    dm = time % (60 * 60),
    m = Math.floor(dm / 60),
    ds = dm % 60,
    s = Math.ceil(ds);
  if (s === 60) {
    s = 0;
    m += 1;
  }
  if (s < 10) {
    s = `0${s}`;
  }
  if (m === 60) {
    m = 0;
    h += 1;
  }
  if (m < 10) {
    m = `0${m}`;
  }
  if (h === 0) {
    fulltime = `${m}:${s}`;
  } else {
    fulltime = `${h}:${m}:${s}`;
  }
  return fulltime;
}

function soundOf () {
  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
    mic.setAttribute('src', './img/player/Volume_gray.png');
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    mic.setAttribute('src', './img/player/Volume_gray_mute.png');
  }
}

function changeSoundVolume() {
  video.volume = soundControl.value / 10;
  console.log(video.volume);
}

function updateDuration() {
  durationControl.value = video.currentTime;
  console.log(video.currentTime);
}

function setVideoDuration() {
  if (video.paused) {
    video.play();
    intervalId = setInterval(updateDuration, 1000 / 66);
  } else {
    video.pause();
    clearInterval(intervalId);
  }
  video.currentTime = durationControl.value;
  
}

function stopInterval() {
  video.pause();
  clearInterval(intervalId);
}