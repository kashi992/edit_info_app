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
        }
        else{
            j=0;
            $(subMenuItems[j]).addClass("active")
            $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
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
                $(".searchbar-input-con").addClass("active")
            }
        }
    }
    function upItem(){
        if(document.querySelector(".navbar-item.active")){
            $(".nav-sub-item").removeClass("active")
            j = -1;
            $(".searchbar-input-con").removeClass("active")
        }
    }
})
