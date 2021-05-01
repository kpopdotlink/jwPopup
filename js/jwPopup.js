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
            $jwPopup_background.addEventListener("click",function(e){
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
            $el.classList.add("jwPopup-dialog","jwPopup-setted");

            $jwPopup_container.appendChild($el);
            $jwPopup_container.appendChild($jwPopup_background);
            document.body.appendChild($jwPopup_container);
        }
        else{
            console.error("jwPopup was unable to create DOM with ids: "+jwPopup_background_id+","+jwPopup_containder_id);
        }
    }
    if(options=='show'){
        document.getElementById(jwPopup_containder_id).classList.add("show");
    }
    else if(options == 'hide'){
        document.getElementById(jwPopup_containder_id).classList.remove("show");
    }
    if(typeof options =='object'){
        if(typeof options.show !== 'undefined' && options.show){
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
    }
}
window.onload = function(){
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
}