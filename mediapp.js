const song = document.querySelector('.song');
const play = document.querySelector('.play');
const replay = document.querySelector('.replay')
const trackoutline = document.querySelector('.track-outline');
const outline = document.querySelector('.moving-outline circle');
const timedisplay = document.querySelector('.time-display');
const video = document.querySelector('.vid-container video');
const sounds = document.querySelectorAll('.song-picker button');

let outlinelength = outline.getTotalLength();

const timeselect = document.querySelectorAll('.select-time button')

let faketimer = 600;

outline.style.strokeDashoffset = outlinelength;
outline.style.strokeDasharray = outlinelength;
timedisplay.textContent = `${Math.floor(faketimer/60)}:${Math.floor(faketimer%60)}`

timeselect.forEach(option => {
    option.addEventListener('click', function(){
        faketimer = this.getAttribute('data-time')
        timedisplay.textContent = `${Math.floor(elapsed/60)}:${Math.floor(elapsed%60)}`
    })
});

sounds.forEach(sound =>{
    sound.addEventListener('click',function(){
        song.src = this.getAttribute("data-sound")
        video.src = this.getAttribute("data-video")
        checkPlaying(song);
    })
})

play.addEventListener('click',()=>{
    checkPlaying(song)
})

replay.addEventListener('click', function(){
       restartSong(song)
})

restartSong = (song)=>{
    let currentTime = song.currentTime
    song.currentTime = 0;
}
const checkPlaying = song =>{
    if(song.paused){
        song.play();
        video.play();
        play.src = `./svg/pause.svg`
    }else{
        song.pause();
        video.pause();
        play.src = `./svg/play.svg`
    }
}


song.ontimeupdate = function(){
    currentTime = song.currentTime;
    elapsed = faketimer - currentTime;
    seconds = Math.floor(elapsed%60);
    minutes = Math.floor(elapsed/60);
    timedisplay.textContent = `${minutes}:${seconds}`
    let progress = outlinelength - (currentTime/faketimer)*outlinelength;
    outline.style.strokeDashoffset = progress
    if(currentTime >=faketimer){
        song.pause();
        video.pause()
        play.src = `./svg/play.svg`
        song.currentTime =0
    }
}
