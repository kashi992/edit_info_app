$(document).ready(function(){
    var menuItems = $(".navbar-menu .navbar-item")
    var subMenuItems = $(".navbar-item.active .nav-sub-item")
    var i = 0;
    var j = -1;
    $(".navbar-menu .navbar-item").mouseenter(function(){
        $(".navbar-menu .navbar-item").removeClass("active")
        $(".navbar-menu .navbar-item").removeClass("hovered")
        $(".navbar-item .nav-sub-item").removeClass("active")
        $(".search-input-label").html("Search . "+$(this).find("a").text())
        $(".searchbar-input-con").removeClass("active")
        $(this).addClass("hovered")
        $(this).addClass("active")
        $(this).find("a").click(function(e){
            e.preventDefault();
        })
        subMenuItems = $(".navbar-item.active .nav-sub-item")
    })
    $(".navbar").mouseleave(function(){
        $(".navbar-menu .navbar-item").removeClass("hovered")
        if(!document.querySelector(".navbar-item .nav-sub-item.active")){
            $(".navbar-menu .navbar-item").removeClass("active")
            $(".search-input-label").html("Search . ")
        }
        subMenuItems = $(".navbar-item.active .nav-sub-item")
    })
    $(".navbar-control.next").click(function(){
        nextItem()
    })
    $(".navbar-control.prev").click(function(){
        prevItem()
    })
   
    $(".navbar-control.up").click(function(){
        upItem();
    })
    $(".navbar-control.down").click(function(){
        downItem();
    })
    $(".navbar-item .nav-sub-item").click(function(){
        subMenuItems = $(".navbar-item.active .nav-sub-item")
        $(".navbar-item .nav-sub-item").removeClass("active")
        $(this).addClass("active")
        $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(this).text())
        $(".progress-title-con .progress-title").html($(this).text())
        $(subMenuItems).each(function(index) {
            if(this.classList.contains("active")){
                j=index
            }
          });
          $(".searchbar-input-con").addClass("active")
    })

    document.onkeyup = function(event) {
            switch (event.keyCode) {
               case 37:
                    prevItem()
                  break;
               case 38:
                    
                    upItem()
                  break;
               case 39:
                    
                    nextItem()
                  break;
               case 40:
                   
                    downItem()
                  break;
            }        
    };
    
    function nextItem(){
        if(j <=-1){
            $(".navbar-menu .navbar-item").removeClass("active")
            if(i < menuItems.length){
                $(menuItems[i]).addClass("active")
                i++
            }
            else{
                i = 0;
                $(menuItems[i]).addClass("active")
                i++
            }
        }
        else if(j > -1 && j < subMenuItems.length){
            j++
            $(".navbar-item .nav-sub-item").removeClass("active")
            $(subMenuItems[j]).addClass("active")
            $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
            $(".progress-title-con .progress-title").html($(this).text())
            $(".progress-title-con .progress-title").html($(subMenuItems[j]).text())
        }
        else{
            j=0;
            $(subMenuItems[j]).addClass("active")
            $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
            $(".progress-title-con .progress-title").html($(subMenuItems[j]).text())
        }
    }
    function prevItem(){
        if(j <= -1){
            $(".navbar-menu .navbar-item").removeClass("active")
            if(i >= 0){
                i--
                $(menuItems[i]).addClass("active")
            }
            else{
                i = menuItems.length - 1;
                $(menuItems[i]).addClass("active")
            }
        }
        else if(j > -1){
            j--
            if(j == -1){
                j=0
            }
            $(".navbar-item .nav-sub-item").removeClass("active")
            $(subMenuItems[j]).addClass("active")
            $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
            $(".progress-title-con .progress-title").html($(subMenuItems[j]).text())
        }
        else{
            j= subMenuItems.length - 1;
        }
    }

    function downItem(){
        if(document.querySelector(".navbar-item.active")){
            subMenuItems = $(".navbar-item.active .nav-sub-item")
            if(j == -1){
                j++
                $(subMenuItems[j]).addClass("active")
                $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
                $(".progress-title-con .progress-title").html($(subMenuItems[j]).text())
                $(".searchbar-input-con").addClass("active")
            }
        }
    }
    function upItem(){
        if(document.querySelector(".navbar-item.active")){
            $(".nav-sub-item").removeClass("active")
            j = -1;
            $(".searchbar-input-con").removeClass("active")
            $(".search-input-label").html("Search .")
            $(".progress-title-con .progress-title").html("")
        }
    }
})


// Video Controls Styles 
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const progressTitleCon = document.querySelector('.progress-title-con');
const player = document.querySelector('.video-player-container');
const video = player.querySelector('.viewer');


let muted = false;

function mute() {
  if (!muted) {
    video['volume'] = 0;
    muted = true;
  } else {
    video['volume'] = 1;
    muted = false;
  }
}

$(".mute-btn").click("click", function(){
    mute();
})


// update progress bar as the video plays
function updateProgress() {
    let progressValue = (video.currentTime / video.duration) * 100
    if(progressValue == 100){
        progressBar.style.left= '99%';
        progressTitleCon.style.left = 'calc(100% - 200px)'
        // setTimeout(() => {
        // }, 100);
    }
    else{
        progressBar.style.left= progressValue+'%';
    }
    if(progressValue == 0 || progressValue < 12){
        progressTitleCon.style.left = '0'
    }
    if(progressValue > 12 && progressValue < 100){
        setTimeout(() => {
            progressTitleCon.style.left = 'calc('+progressValue+'% - 185px)'
        }, 300);
    }
}

function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.left = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

function scrub(event) {
    const scrubTime = (event.offsetX / progressRange.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    if(mouseDown){
        $(progressTitleCon).addClass("rubberBand")
    }
    else{
        $(progressTitleCon).removeClass("rubberBand")
    }
}

// toggle between play and pause
function togglePlay() {
    if (video.paused) {
      video.play();
    //   playBtn.classList.replace('fa-play', 'fa-pause');
    //   playBtn.setAttribute('title', 'Pause');
    } else {
      video.pause();
    //   showPlayIcon();
    }
}

// Spacebar used to play and pause
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      togglePlay();
    }
}


// =======================
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
// ===================


// progress bar controls
let mouseDown = false;
progressRange.addEventListener('click', scrub);
progressRange.addEventListener('mousemove', (event) => mouseDown && scrub(event));
progressRange.addEventListener('mousedown', () => mouseDown = true);
progressRange.addEventListener('mouseup', () => mouseDown = false);



$(".results-control.next").on("mousedown", function(){
    var cs = $(".search-results").scrollTop();
    $(".search-results").scrollTop(cs+100)
});
$(".results-control.prev").on("mousedown", function(){
    var cs = $(".search-results").scrollTop();
    $(".search-results").scrollTop(cs-100)
});


$(".navbar-search-btn").click(function(){
    $(".search-results-con").addClass("show")
    $(".search-results-con").addClass("show")
    setTimeout(() => {
        $(".search-results-con").addClass("appear")
    }, 50);
})

$(".searchresult-close-btn").click(function(){
    $(".search-results-con").removeClass("appear")
    setTimeout(() => {
        $(".search-results-con").removeClass("show")
    }, 300);
})