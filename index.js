//the music list that we are ready to play
let track_list = [
    {
        name:"LallaBheemla",
        artist:"Thaman.S, Sri Krishna Prithvi Chandra & Ram Miriyala",
        image:"images/10441027.jpg",
        path:"Songs/Lala Bheemla (DJ Version).mp3"
    },
    {
        name:"LallaBheemla",
        artist:"Thaman.S, Sri Krishna Prithvi Chandra & Ram Miriyala",
        image:"images/10441027.jpg",
        path:"Songs/1-Antha Ishtam.mp3"
    },
    {
        name:"Pushpa",
        artist:"Devisriprasad, Sri Krishna Prithvi Chandra & Ram Miriyala",
        image:"images/wp13957098-pushpa-poster-wallpapers.jpg",
        path:"Songs/Pushpa Pushpa.mp3"
    },
    {
        name:"LoveStory",
        artist:"Thaman.S, Sri Krishna Prithvi Chandra & Ram Miriyala",
        image:"images/wp8289595-lovers-day-movie-wallpapers.jpg",
        path:"Songs/[iSongs.info] 07 - Maahiya Bheliyaa.mp3"
    }
];

//step 1: Select all the elements in the Html_page and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track i");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");


let seek_selector = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

//we need to know the song is playing or not
//step2:Specify globally used values
let isplaying = false;
let trackIndex = 0;
 
const audio = document.createElement('audio');

//step 3: Create the audio element for the player
//loadTrack() to load a track and set it up
function loadTrack() {
    const track = track_list[trackIndex];
    now_playing.innerText = `Playing ${trackIndex + 1} of  ${track_list.length}`;
    track_art.style.backgroundImage = `url("${track.image}")`;
    track_name.innerText = track.name;
    track_artist.innerText = track.artist;

    audio.src = track.path;
    audio.load();

   

}
//set up a random background color
function random_bg_color() {

}
//Reset all values to their default
function resetValues() {

}

//To switch to playing when paused, and vice versa
function playpauseTrack() {
    const totalMinutes = ''+ Math.floor(audio.duration / 60);
    const totalSeconds = ''+ Math.floor(audio.duration - (60 * totalMinutes));

    total_duration.innerText = `${totalMinutes.padStart(2, `0`)}:${totalSeconds.padStart(2, `0`)}`;
    if(isplaying) {
        pauseTrack();
    }else {
        playTrack();
    }

}
function playTrack() {
isplaying = true;
audio.play();
playpause_btn.classList.remove('fa-play-circle');
playpause_btn.classList.add('fa-pause-circle');
}
function pauseTrack() {
    isplaying = false;
    audio.pause();
    playpause_btn.classList.remove('fa-pause-circle');
    playpause_btn.classList.add('fa-play-circle');

}
function nextTrack() {
 ++trackIndex;

 if(trackIndex === track_list.length) {
    trackIndex = 0;
 }
 loadTrack();
 playTrack();
}
function prevTrack() {
 --trackIndex;

 if(trackIndex < 0) {
    trackIndex = track_list.length -1;
 }
 loadTrack();
 playTrack();
}

function seekTo() {
audio.volume = seek_slider.value / 100 * audio.duration;
}

function setVolume() {
    audio.volume = volume_slider.value / 100;

}
//update the progress slider and duration as the music plays
function seekUpdate() {
    seek_slider.value = Math.floor((audio.currentTime / audio.duration) * 100);

    const curMinutes = ''+ Math.floor(audio.currentTime / 60);
    const curSeconds = ''+ Math.floor(audio.currentTime - (60 * curMinutes));

    curr_time.innerText = `${curMinutes.padStart(2, `0`)}:${curSeconds.padStart(2, `0`)}`;
}
//set the ball rollings when the page loads
loadTrack();
playpause_btn.addEventListener('click',playpauseTrack);
next_btn.addEventListener('click',nextTrack);
prev_btn.addEventListener('click',prevTrack);
volume_slider.addEventListener('input',setVolume);
seek_slider.addEventListener('input',seekTo);

