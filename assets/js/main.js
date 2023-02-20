$(".navbar-menu .navbar-item").mouseenter(function(){
    $(".navbar-menu .navbar-item").removeClass("active")
    $(this).addClass("active")
})
$(".navbar").mouseleave(function(){
    $(".navbar-menu .navbar-item").removeClass("active")
})
$(document).ready(function(){
    var menuItems = $(".navbar-menu .navbar-item")
    var subMenuItems = $(".navbar-item.active .nav-sub-item")
    var i = 0;
    var j = -1;
    $(".navbar-control.next").click(function(){
        // if(j==-1){
        //     $(".navbar-menu .navbar-item").removeClass("active")
        //     if(i < menuItems.length){
        //         $(menuItems[i]).addClass("active")
        //         i++
        //     }
        //     else{
        //         i = 0;
        //         $(menuItems[i]).addClass("active")
        //         i++
        //     }
        // }
        // else if(j > -1 && j < subMenuItems.length){
        //     j++
        //     $(".navbar-item .nav-sub-item").removeClass("active")
        //     $(subMenuItems[j]).addClass("active")
        //     $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
        // }
        // else{
        //     j=0;
        //     $(subMenuItems[j]).addClass("active")
        //     $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
        // }
        nextItem()
    })
    $(".navbar-control.prev").click(function(){
        // if(j == -1){
        //     $(".navbar-menu .navbar-item").removeClass("active")
        //     if(i >= 0){
        //         i--
        //         $(menuItems[i]).addClass("active")
        //     }
        //     else{
        //         i = menuItems.length - 1;
        //         $(menuItems[i]).addClass("active")
        //     }
        // }
        // else if(j > -1 && j < subMenuItems.length){
        //     j--
        //     $(".navbar-item .nav-sub-item").removeClass("active")
        //     $(subMenuItems[j]).addClass("active")
        //     $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
        // }
        // else{
        //     j= subMenuItems.length - 1;
        // }
        prevItem()
    })

    document.onkeydown = function(event) {
        if(j == -1){
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
        }
        
    };
   
    $(".navbar-control.up").click(function(){
        // if(document.querySelector(".navbar-item.active")){
        //     $(".navbar-item.active .nav-sub-item").removeClass("active")
        //     j = -1;
        // }
        upItem();
    })
    $(".navbar-control.down").click(function(){
        // if(document.querySelector(".navbar-item.active")){
        //     subMenuItems = $(".navbar-item.active .nav-sub-item")
        //     if(j == -1){
        //         j++
        //         $(subMenuItems[j]).addClass("active")
        //         $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(subMenuItems[j]).text())
        //     }
        // }
        downItem();
    })


    $(".navbar-item .nav-sub-item").click(function(){
        $(".navbar-item .nav-sub-item").removeClass("active")
        $(this).addClass("active")
        $(".search-input-label").html("Search . "+$(".navbar-item.active a").text()+" ."+$(this).text())
    })
    function nextItem(){
        if(j==-1){
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
        if(j == -1){
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
        else if(j > -1 && j < subMenuItems.length){
            j--
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
            }
        }
    }
    function upItem(){
        if(document.querySelector(".navbar-item.active")){
            $(".navbar-item.active .nav-sub-item").removeClass("active")
            j = -1;
        }
    }
})
