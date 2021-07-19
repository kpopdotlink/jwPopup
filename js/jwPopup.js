Element.prototype.jwPopup = function(options){
    var $el = this;
    var element_id = $el.getAttribute("id");
    var jwPopup_containder_id = element_id+"_container";
    var jwPopup_background_id = element_id+"_background";
    if(!$el.classList.contains("jwPopup-setted")){
        if(document.getElementById(jwPopup_containder_id) == null && document.getElementById(jwPopup_background_id) == null){
            var $jwPopup_container = document.createElement("div");
            $jwPopup_container.setAttribute("id",jwPopup_containder_id);
            $jwPopup_container.classList.add("jwPopup-container");
            var $jwPopup_background = document.createElement("div");
            $jwPopup_background.setAttribute("id",jwPopup_background_id);
            $jwPopup_background.classList.add("jwPopup-background");
            
            $el.classList.add("jwPopup-dialog","jwPopup-setted");

            $jwPopup_container.appendChild($el);
            $jwPopup_container.appendChild($jwPopup_background);
            document.body.appendChild($jwPopup_container);
        }
        else{
            console.error("jwPopup was unable to create DOM with ids: "+jwPopup_background_id+","+jwPopup_containder_id);
        }
    }
    if(!$el.classList.contains("jwPopup-eventAttached")){
        document.getElementById(jwPopup_background_id).addEventListener("click",function(e){
            if(e.currentTarget.classList.contains("jwPopup-background")){
                document.getElementById(element_id).jwPopup("hide");
            }
        });
        var jwPopupCloseList = $el.getElementsByClassName("jwPopupClose");
        for(var i=0;i<jwPopupCloseList.length;i++){
            jwPopupCloseList[i].addEventListener("click",function(e){
                document.getElementById(element_id).jwPopup("hide");
            });
        }
        $el.classList.add("jwPopup-eventAttached")
    }
    if(options=='show'){
        var shown_container_arr = document.querySelectorAll(".jwPopup-container.show");
        var max_z_index=1050;
        for(var i=0;i<shown_container_arr.length;i++){
            if(max_z_index<shown_container_arr[i].style.zIndex){
                max_z_index=shown_container_arr[i].style.zIndex;
            }
        }
        if(shown_container_arr.length>0){
            document.getElementById(jwPopup_containder_id).style.zIndex=max_z_index+2;
            document.getElementById(element_id).style.zIndex=max_z_index+2;
            document.getElementById(jwPopup_background_id).style.zIndex=max_z_index+1;
        }
        else{
            document.getElementById(jwPopup_containder_id).style.zIndex=1052;
            document.getElementById(element_id).style.zIndex=1052;
            document.getElementById(jwPopup_background_id).style.zIndex=1051;
        }
        document.getElementById(jwPopup_containder_id).classList.add("show");
    }
    else if(options == 'hide'){
        if(typeof document.getElementById(element_id).close_reload !== 'undefined' && document.getElementById(element_id).close_reload){
            location.reload();
        }
        else{
            document.getElementById(jwPopup_containder_id).classList.remove("show");
        }
    }
    if(typeof options =='object'){
        if(typeof options.show !== 'undefined' && options.show){
            var shown_container_arr = document.querySelectorAll(".jwPopup-container.show");
            var max_z_index=1050;
            for(var i=0;i<shown_container_arr.length;i++){
                if(max_z_index<shown_container_arr[i].style.zIndex){
                    max_z_index=shown_container_arr[i].style.zIndex;
                }
            }
            if(shown_container_arr.length>0){
                document.getElementById(jwPopup_containder_id).style.zIndex=max_z_index+2;
                document.getElementById(element_id).style.zIndex=max_z_index+2;
                document.getElementById(jwPopup_background_id).style.zIndex=max_z_index+1;
            }
            document.getElementById(jwPopup_containder_id).classList.add("show");
        }
        else if(typeof options.show !== 'undefined' && !options.show){
            document.getElementById(jwPopup_containder_id).classList.remove("show");
        }
        if(typeof options.width == "string" && options.width.toLowerCase().indexOf("px")==-1 && isNaN(parseInt(options.width))){
            $el.classList.remove("jwPopup-medium-width","jwPopup-small-width","jwPopup-large-width");
            $el.style.removeProperty("width");
            if(options.width=='medium'){
                $el.classList.add("jwPopup-medium-width");
            }
            else if(options.width=='large'){
                $el.classList.add("jwPopup-large-width");
            }
            else if(options.width=='small'){
                $el.classList.add("jwPopup-small-width");
            }
        }
        else if(typeof options.width =='number' || (typeof options.width !== 'undefined' && !isNaN(parseInt(options.width)))){
            $el.classList.remove("jwPopup-medium-width","jwPopup-small-width","jwPopup-large-width");
            $el.style.width=parseInt(options.width)+"px";
        }
        if(typeof options.height == "string" && options.height.toLowerCase().indexOf("px")==-1 && isNaN(parseInt(options.height))){
            $el.classList.remove("jwPopup-medium-height","jwPopup-small-height","jwPopup-large-height");
            $el.style.removeProperty("height");
            if(options.height=='medium'){
                $el.classList.add("jwPopup-medium-height");
            }
            else if(options.height=='large'){
                $el.classList.add("jwPopup-large-height");
            }
            else if(options.height=='small'){
                $el.classList.add("jwPopup-small-height");
            }
        }
        else if(typeof options.height =='number' || (typeof options.height !== 'undefined' && !isNaN(parseInt(options.height)))){
            $el.classList.remove("jwPopup-medium-height","jwPopup-small-height","jwPopup-large-height");
            $el.style.height=parseInt(options.height)+"px";
        }
        if(typeof options.position == 'object'){
            if(typeof options.position.x !=='undefined' || !isNaN(parseInt(options.position.x))){
                $el.style.left=parseInt(options.position.x)+"px";
                $el.style.margin="0";
            }
            if(typeof options.position.y !=='undefined' || !isNaN(parseInt(options.position.y))){
                $el.style.top=parseInt(options.position.y)+"px";
                $el.style.margin="0";
                $el.classList.add("jwPopup-no-transform");
            }
        }
    }
}
window.addEventListener("load",function(){
    var jwPopupList = document.getElementsByClassName("jwPopup");
    var jwPopupIdList = [];
    for(var i=0;i<jwPopupList.length;i++){
        if(jwPopupList[i].getAttribute("id") != null){
            jwPopupIdList.push(jwPopupList[i].getAttribute("id"));
        }
    }
    for(var i=0;i<jwPopupIdList.length;i++){
        document.getElementById(jwPopupIdList[i]).jwPopup();
    }
    var jwPopupOpenList = document.getElementsByClassName("jwPopupOpen");
    for(var i=0;i<jwPopupOpenList.length;i++){
        jwPopupOpenList[i].addEventListener("click",function(e){
            var element_id = e.currentTarget.getAttribute("jw-target");
            document.getElementById(element_id).jwPopup('show');
        });
    }
    document.addEventListener("keyup",function(e){
        if(e.key=='Escape'){
            var max_i=-1;
            var max_z_index=1050;
            var shown_container_arr = document.querySelectorAll(".jwPopup-container.show");
            for(var i=0;i<shown_container_arr.length;i++){
                if(max_z_index<=shown_container_arr[i].style.zIndex){
                    max_z_index=shown_container_arr[i].style.zIndex;
                    max_i=i;
                }
            }
            if(max_i!=-1){
                shown_container_arr[max_i].querySelector(".jwPopup").jwPopup("hide");
            }
        }
    });
});