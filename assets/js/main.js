// Script to Load Menu items 
// Menu data fetching function
$(function(){
    if(document.querySelector(".navbar")){
        //Menu JSON File URL
        const dataApi_url = "./assets/xml/menu_structure.xml";
        var $menu = $("#navbar_menu_list");

        var getMenuItem = function (menuItem, index) {
            var item = $('<li class="navbar-item">')
                item.append( $('<a href="" class="navbar-link">').html(menuItem.getAttribute("name")));
            if (menuItem.getElementsByTagName('subMenu')) {
                var subListCon = $('<div class="nav-sub-menu">');
                var subList = $('<ul class="sub-menu-list">');
                var menuSubItems = menuItem.getElementsByTagName('subMenu')
                 menuSubItems = $(menuSubItems).find('subItem')
                $.each(menuSubItems, function (subIndex) {
                    subList.append(getSubMenuItem(this, subIndex));
                });
                subListCon.append(subList);
                item.append(subListCon);
                $(item).addClass("item-"+(index+1))
                return item;
            }
            else{
                console.log("not found")
            }
            
        };
        var getSubMenuItem = function (subMenuItem, index) {
            var item = ''
                item = $('<li class="nav-sub-item">')
                $(item).html(subMenuItem.innerHTML);
                $(item).addClass("item-"+(index+1))
            return item;

        };


        const xmlhttp = new XMLHttpRequest();
        let menuItems=[]
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const xmlDoc = this.responseXML;
                menuItems = xmlDoc.getElementsByTagName("menuItem");
                $.each(menuItems, function (index) {
                    $menu.append(
                        getMenuItem(this, index)
                    );
                });

                applyMenuScript()  
                
            } else if (this.readyState === 4 && this.status !== 200) {
                console.error("Error loading XML file:", this.statusText);
            }
        };
        xmlhttp.open("GET", dataApi_url, true);
        xmlhttp.send(); 

         
    }


    playHomeVideos()
})


var j = -1;
function applyMenuScript(){
    $(document).ready(function(){
        var menuItems = $(".navbar-menu .navbar-item")
        var subMenuItems = $(".navbar-item.active .nav-sub-item")
        var i = 0;
        $(".site-logo").mouseenter(function(){
            $(".pagesMenu").addClass("active")
            $(".navbar-menu .navbar-item").removeClass("active")
            $(".navbar-menu .navbar-item").removeClass("hovered")
            $(".navbar-item .nav-sub-item").removeClass("active")
        })
        $(".navbar-menu .navbar-item").mouseenter(function(){
            $(".pagesMenu").removeClass("active")
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
            $(".pagesMenu").removeClass("active")
            if(!document.querySelector(".navbar-menu .navbar-item.active")){
                $(".navbar-menu .navbar-item").removeClass("active")
                $(".search-input-label").html("Search . ")
                $(".searchbar-input-con").removeClass("active")
                $(".searchbar-input-con").parent().removeClass("active")
            }
            subMenuItems = $(".navbar-item.active .nav-sub-item")
        })
        $(".navbar-control.next").click(function(){
            nextItem()
            activeSearchbar()
        })
        $(".navbar-control.prev").click(function(){
            prevItem()
            activeSearchbar()
        })
       
        $(".navbar-control.up").click(function(){
            upItem();
            activeSearchbar()
        })
        $(".navbar-control.down").click(function(){
            downItem();
            activeSearchbar()
        })
        $(".navbar-item .nav-sub-item").click(function(){
            subMenuItems = $(".navbar-item.active .nav-sub-item")
            $(".navbar-item .nav-sub-item").removeClass("active")
            $(this).addClass("active")
            activeSearchbar()
            $(".progress-title-con .progress-title").html($(this).text())
        })
        $(".navbar-item .nav-sub-item").mouseenter(function(){
            // $(this).addClass("active")
            $(".navbar-item .nav-sub-item").removeClass("active")
            activeSearchbar()
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
                    $(menuItems[i]).addClass("hovered")
                    i++
                }
                else{
                    $('.navbar-menu').scrollLeft(0);
                    i = 0;
                    $(menuItems[i]).addClass("active")
                    $(menuItems[i]).addClass("hovered")
                    i++
                }
                if(window.innerWidth > 500){
                    if(i >= 6){
                        if(window.innerWidth > 2200){
                            $('.navbar-menu').scrollLeft(i * 400);
                        }
                        else{
                            $('.navbar-menu').scrollLeft(i * 200);
                        }
                    }
                }
                else{
                    if(i >= 5){
                        $('.navbar-menu').scrollLeft(i * 100);
                    }
                }
            }
            else if(j > -1 && j < subMenuItems.length){
                j++
                $(".navbar-item .nav-sub-item").removeClass("active")
                $(".navbar-item .nav-sub-item").removeClass("hovered")
                $(subMenuItems[j]).addClass("active")
                $(subMenuItems[j]).addClass("hovered")
                $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
                $(".progress-title-con .progress-title").html($(this).text())
                $(".progress-title-con .progress-title").html($(subMenuItems[j]).text())
            }
            else{
                j=0;
                $(subMenuItems[j]).addClass("active")
                $(subMenuItems[j]).addClass("hovered")
                $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
                $(".progress-title-con .progress-title").html($(subMenuItems[j]).text())
            }
        }
        function prevItem(){
            if(j <= -1){
                $(".navbar-menu .navbar-item").removeClass("active")
                $(".navbar-menu .navbar-item").removeClass("hovered")
                if(window.innerWidth > 500){
                    if(i > 0){
                        if(i==0 || i < 6){
                            $('.navbar-menu').scrollLeft(0);
                        }
                        else if(i >=6){
                            if(window.innerWidth > 2200){
                                $('.navbar-menu').scrollLeft(i * 400);
                            }else{
                                $('.navbar-menu').scrollLeft(i * 200);
                            }
                        }
                        i--
                        $(menuItems[i]).addClass("active")
                        $(menuItems[i]).addClass("hovered")
                    }
                    else{
                        if(i == 0){
                            $('.navbar-menu').scrollLeft(menuItems.length * 500);
                        }else{
                            $('.navbar-menu').scrollLeft(i * 500);
                        }
                        console.log(i)
                        i = menuItems.length - 1;
                        $(menuItems[i]).addClass("active")
                        $(menuItems[i]).addClass("hovered")
                    }
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
                $(subMenuItems[j]).addClass("hovered")
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
                $(this).addClass("hovered")
                $(".navbar-menu .navbar-item").removeClass("active")
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
const videItemLink = document.querySelector('#videItemLink');

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
        progressBar.style.left= '98.5%';
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
    if(window.innerWidth < 500){
        if(progressValue > 12 && progressValue < 100){
            setTimeout(() => {
                let pixels = parseFloat(progressValue) / 100 * window.innerWidth;
                pixels -= 110;
                progressValue = (pixels / window.innerWidth * 100).toFixed(2) + "%";

                progressTitleCon.style.left = progressValue
            }, 400);
        }
    }
    else{
        if(progressValue > 12 && progressValue < 100){
            setTimeout(() => {
                let pixels = parseFloat(progressValue) / 100 * window.innerWidth;
                pixels -= 185;
                progressValue = (pixels / window.innerWidth * 100).toFixed(2) + "%";

                progressTitleCon.style.left = progressValue
            }, 400);
        }
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
      togglePlay();
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



// Sub Pages Popup Script 
$(".page-menu-item a").click(function(e){
    e.preventDefault();
    $($(this).parent().attr("data-target")).addClass("show")
    setTimeout(() => {
        $($(this).parent().attr("data-target")).addClass("appear")
    }, 50);
})
$(".page-menu-item").click(function(e){
    $($(this).attr("data-target")).addClass("show")
        setTimeout(() => {
        $($(this).attr("data-target")).addClass("appear")
    }, 50);
})
$(".sub-page-close-btn").click(function(){
    $(".sub-page-popup").removeClass("appear")
    setTimeout(() => {
        $(".sub-page-popup").removeClass("show")
    }, 300);
})



$(".navbar-search-btn").click(function(){
    showResults()
})
function showResults(){
    if( $(".navbar-item").hasClass("active") && $("#search-input").val()){
        $(".search-results-con").addClass("show")
         setTimeout(() => {
            $(".search-results-con").addClass("appear")
        }, 50);
        setTimeout(() => {
            loadSearchResults();
            $(".main-search-keyword").html($("#search-input").val())
            if($(".nav-sub-item").hasClass("active")){
                $(".sub-search-keyword").html($(".nav-sub-item.active").html())
            }
            else{
                $(".sub-search-keyword").html($(".navbar-item.active a").text())
            }
        }, 100);
    }
}

// Search Results CLOSE Button 
$(".searchresult-close-btn").click(function(){
    $(".search-results-con").removeClass("appear")
    setTimeout(() => {
        $(".search-results-con").removeClass("show")
    }, 300);
    $("bg_video_section").addClass("show")
    var menuItems = $(".navbar-item")
    var activeMe9nuItem = '';
    $.each(menuItems, function(index){
        var activeIndex = ''
        var subItemIndex = -1
        if(this.classList.contains("active")){
            activeMenuItem = index;
            var navSubItems = $(".navbar-item.active .nav-sub-item")
            activeIndex = index
            $.each(navSubItems, function(subIndex){
                if(this.classList.contains("active")){
                    subItemIndex = subIndex
                }
            })
            playVideo(activeIndex, subItemIndex);
        }
    })
    
})

function playVideo(index, subIndex){
    var dataApi_url = "./assets/js/menu_structure.json";
    var data = '';
    var vidLink = ''
    var allVideos = []
    var allVideosLinks = []

    //async function to get Data from JSON file
    async function getSearchResultData(url) {
    
        const response = await fetch(url);

        data = await response.json();
        if(index != 0){
            if(subIndex > -1){
                vidLink = data.menu[index].sub[subIndex].videoLink
                videItemLink.href = data.menu[index].sub[subIndex].itemLink
            }
            else{
                vidLink = data.menu[index].videoLink
                videItemLink.href = data.menu[index].itemLink
            }
            video.src = vidLink
            $(".bg_video_section").addClass("show");
            video.play()
            $(".main-content").addClass("show")
            video.addEventListener("ended", function(){
                video.src = vidLink
                videItemLink.href = data.menu[index].sub[subIndex].itemLink
                video.currentTime = 0;
            })
        }
        else if(index == 0){
            if(subIndex > -1){
                vidLink = data.menu[index].sub[subIndex].videoLink
                videItemLink.href = data.menu[index].sub[subIndex].itemLink
                video.src = vidLink
                $(".bg_video_section").addClass("show");
                video.play()
                $(".main-content").addClass("show")
                video.addEventListener("ended", function(){
                    video.src = vidLink
                    videItemLink.href = data.menu[index].sub[subIndex].itemLink
                    video.currentTime = 0;
                })
            }
            else{
                $.each(data.menu, function(index){
                    allVideos.push(data.menu[index].videoLink)
                    allVideosLinks.push(videItemLink.href = data.menu[index].itemLink)
                })
                let videoIndex = 0;
    
                video.src = allVideos[videoIndex];
                videItemLink.href = allVideosLinks[videoIndex]
                video.addEventListener("ended", function() {
                    videoIndex++;
                    if (videoIndex < allVideos.length) {
                        video.src = allVideos[videoIndex];
                        videItemLink.href = allVideosLinks[videoIndex]
                        video.play();
                  }
                });
              
                $(".bg_video_section").addClass("show");
                video.play()
                $(".main-content").addClass("show")
            }
        }
    }
    
     getSearchResultData(dataApi_url);   
}

function playHomeVideos(){
    const dataApi_url = "./assets/xml/menu_structure.xml";
    var allVideos = []

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const xmlDoc = this.responseXML;
            const mainPageVideos = xmlDoc.getElementsByTagName("mainPageVideos");
            const mainVidLinks = $(mainPageVideos).find("videoLinks")
            $.each(mainVidLinks, function(index){
                allVideos.push(this.innerHTML)
            })
            let videoIndex = 0;
    
            video.src = allVideos[videoIndex];
            video.addEventListener("ended", function() {
            videoIndex++;
            if (videoIndex < allVideos.length) {
                video.src = allVideos[videoIndex];
                video.play();
            }
            });
        
            $(".bg_video_section").addClass("show");
            video.play()
            $(".main-content").addClass("show")
        } 
        else if (this.readyState === 4 && this.status !== 200) {
            console.error("Error loading XML file:", this.statusText);
        }
    };
    xmlhttp.open("GET", dataApi_url, true);
    xmlhttp.send();
}


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
    // if(window.innerWidth < 768){
    //     setTimeout(() => {
    //         togglePlay();
    //     }, 2000);
    // }
    // $(".video-player-container").mouseenter(function(){
    //     video.play()
    // })
    // $(".video-player-container").mouseleave(function(){
    //     video.pause()
    // })
})