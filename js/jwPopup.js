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
            if(options =='show' || (typeof options !='undefined' && options.show)){
                $jwPopup_container.classList.add("show");
            }
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

            $jwPopup_container.append($el);
            $jwPopup_container.append($jwPopup_background);
            document.body.append($jwPopup_container);
        }
        else{
            console.error("jwPopup was unable to create DOM with ids: "+jwPopup_background_id+","+jwPopup_containder_id);
        }
    }
    else{
        if(options=='show'){
            document.getElementById(jwPopup_containder_id).classList.add("show");
        }
        else if(options == 'hide'){
            document.getElementById(jwPopup_containder_id).classList.remove("show");
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