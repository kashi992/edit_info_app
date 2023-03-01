// Script to Load Menu items 
// Menu and version data fetching function
$(function(){
    if(document.querySelector(".navbar")){
        //Menu JSON File URL
        const dataApi_url = "./assets/js/menu_structure.json";
        var data = '';

        //async function to get Data from JSON file
        async function getMenuData(url) {
            // Storing response
            const response = await fetch(url);

            // Storing data in form of JSON
            data = await response.json();
            var $menu = $("#navbar_menu_list");
            $.each(data.menu, function (index) {
                $menu.append(
                    getMenuItem(this, index)
                );
            });
            applyMenuScript()

        } 
        // Calling the async function
        getMenuData(dataApi_url);
       

        var getMenuItem = function (itemData, index) {
        
            var item = $('<li class="navbar-item">')
                item.append( $('<a href="" class="navbar-link">').html(itemData.name));
            if (itemData.sub) {
                var subListCon = $('<div class="nav-sub-menu">');
                var subList = $('<ul class="sub-menu-list">');
                $.each(itemData.sub, function (subIndex) {
                    subList.append(getSubMenuItem(this, subIndex));
                });
                subListCon.append(subList);
                item.append(subListCon);
                $(item).addClass("item-"+(index+1))
                return item;
            }
            
        };
        var getSubMenuItem = function (itemData, index) {
            var item = ''
                item = $('<li class="nav-sub-item">')
                $(item).html(itemData.name);
                $(item).addClass("item-"+(index+1))
            return item;

        };
        
    }
})


function applyMenuScript(){
    var j = -1;
    $(document).ready(function(){
        var menuItems = $(".navbar-menu .navbar-item")
        var subMenuItems = $(".navbar-item.active .nav-sub-item")
        var i = 0;
        $(".site-logo").mouseenter(function(){
            $(".navbar-item.item-1").addClass("hovered")
        })
        $(".navbar-menu .navbar-item").mouseenter(function(){
            $(".navbar-menu .navbar-item").removeClass("active")
            $(".navbar-menu .navbar-item").removeClass("hovered")
            $(".navbar-item .nav-sub-item").removeClass("active")
            $(".search-input-label").html("Search . "+$(this).find("a").text())
            $(".searchbar-input-con").removeClass("active")
            $(".searchbar-input-con").parent().removeClass("active")
            $(this).addClass("hovered")
            $(this).addClass("active")
            $(this).find("a").click(function(e){
                e.preventDefault();
            })
            subMenuItems = $(".navbar-item.active .nav-sub-item")
            activeSearchbar()
        })
        $(".navbar").mouseleave(function(){
            $(".navbar-menu .navbar-item").removeClass("hovered")
            if(!document.querySelector(".navbar-item .nav-sub-item.active")){
                $(".navbar-menu .navbar-item").removeClass("active")
                $(".search-input-label").html("Search . ")
                $(".searchbar-input-con").removeClass("active")
                $(".searchbar-input-con").parent().removeClass("active")
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
            activeSearchbar()
            $(".progress-title-con .progress-title").html($(this).text())
        })
        $(".navbar-item .nav-sub-item").mouseenter(function(){
            $(this).addClass("active")
            activeSearchbar()
            $(".navbar-item .nav-sub-item").removeClass("active")
        })
    
        document.onkeyup = function(event) {
                switch (event.keyCode) {
                   case 37:
                        prevItem()
                        activeSearchbar()
                      break;
                   case 38:
                        upItem()
                        activeSearchbar()
                      break;
                   case 39:
                        nextItem()
                        activeSearchbar()
                      break;
                   case 40:
                        downItem()
                        activeSearchbar()
                }        
        };
        
        function activeSearchbar(){
            $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(".navbar-item .nav-sub-item.active").text())
            $(subMenuItems).each(function(index) {
                if(this.classList.contains("active")){
                    j=index
                }
              });
              $(".searchbar-input-con").addClass("active")
              $(".searchbar-input-con").parent().addClass("active")
        }
        function nextItem(){
            if(j <=-1){
                $(".navbar-menu .navbar-item").removeClass("active")
                $(".navbar-menu .navbar-item").removeClass("hovered")
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
                $(".navbar-item .nav-sub-item").removeClass("hovered")
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
                $(".navbar-menu .navbar-item").removeClass("hovered")
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
                $(".navbar-item .nav-sub-item").removeClass("hovered")
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
                    $(".searchbar-input-con").parent().addClass("active")
                }
            }
        }
        function upItem(){
            if(document.querySelector(".navbar-item.active")){
                $(".nav-sub-item").removeClass("active")
                j = -1;
                $(".searchbar-input-con").removeClass("active")
                $(".searchbar-input-con").parent().removeClass("active")
                $(".search-input-label").html("Search .")
                $(".progress-title-con .progress-title").html("")
            }
        }
    })
}


// Video Controls Styles 
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const progressTitleCon = document.querySelector('.progress-title-con');
const player = document.querySelector(".bg_video_section");
const video = player.querySelector('.viewer');

let muted = false;

function mute() {
  if (!video.muted) {
        video['volume'] = 0;
        video.muted = true;
    } else {
        video['volume'] = 1;
        video.muted = false;
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
        }, 100);
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
    } else {
      video.pause();
    }
}

// Spacebar used to play and pause
document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
    //   togglePlay();
    }
    if(e.keyCode == 13){
        const elem = document.activeElement;
        if(elem == document.querySelector('#search-input')){
            showResults()
        }
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
    showResults()
})
function showResults(){
    if(j > -1 && $("#search-input").val()){
        $(".search-results-con").addClass("show")
        $(".search-results-con").addClass("show")
        setTimeout(() => {
            $(".search-results-con").addClass("appear")
        }, 50);
        setTimeout(() => {
            loadSearchResults();
            $(".main-search-keyword").html($("#search-input").val())
            $(".sub-search-keyword").html($(".nav-sub-item.active").html())
        }, 100);
    }
}

$(".searchresult-close-btn").click(function(){
    $(".search-results-con").removeClass("appear")
    setTimeout(() => {
        $(".search-results-con").removeClass("show")
    }, 300);
})



// Load JASON Data Script 
function loadSearchResults(){
        //Menu JSON File URL
        var dataApi_url = "./assets/js/JSON_SAMPLE_SEARCH_RESULTS.json";
        var dataApi_url2 = "./assets/js/SMALL_TEXT_SAMPLE.json";
        var data = '';
        var dataText = '';

        //async function to get Data from JSON file
        async function getSearchResultData(url, url2) {
            // Storing response
            const response = await fetch(url);
            const response2 = await fetch(url2);

            // Storing data in form of JSON
            data = await response.json();
            dataText = await response2.json();
            var $searchResultsLlist = $("#search-results-list");
            $.each(data.results, function () {
                $searchResultsLlist.append(
                    getSearchResultItem(this)
                );
            });
            

        }

        var getSearchResultItem = function (itemData) {
            var itemDomain = (new URL(itemData.url));
            var itemDateTime = (itemData.date_time).split('T')
            var itemDate = itemDateTime[0]
            var itemTime = itemDateTime[1]
            itemDomain = itemDomain.hostname.replace('www.','');
            var item = $('<li class="search-result-item">')
                item.append(
                    $('<div class="item-header"><span>___</span><div class="result-numb">'+itemData.result_number+'</div><div class="result-title">'+itemData.data_1+'</div><div class="result-data-2">'+itemData.data_2+'</div><div class="result-data-3">\ EX <span class="data-tag">'+itemData.data_3+'</span></div></div>')
                )
                item.append(
                    $('<div class="item-details"><div><span class="item-domain"><a href="'+itemData.url+'">'+itemDomain+'</a></span> &nbsp;/&nbsp; <span class="item-date">'+itemDate+'</span></div><div class="item-time">'+itemTime+'</div></div>')
                )
                item.append(
                    $('<div class="item-text-content"><p>'+itemData.headline+'</p></div>')
                )

                return item
            
        };

        // Calling the async function
        getSearchResultData(dataApi_url, dataApi_url2);
}

$(document).ready(function(){
    if(window.innerWidth < 768){
        setTimeout(() => {
            togglePlay();
        }, 2000);
    }
    // $(".video-player-container").mouseenter(function(){
    //     video.play()
    // })
    // $(".video-player-container").mouseleave(function(){
    //     video.pause()
    // })
})