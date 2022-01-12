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
            if($el.classList.contains("jwPopup-nobackground")){
                $jwPopup_container.classList.add("jwPopup-nobackground");
            }
            var $jwPopup_background = document.createElement("div");
            $jwPopup_background.setAttribute("id",jwPopup_background_id);
            $jwPopup_background.classList.add("jwPopup-background");
            var data_theme = $el.getAttribute('data-theme');
            if(data_theme!==null){
                if(!$jwPopup_container.classList.contains(data_theme)){
                    $jwPopup_container.classList.add(data_theme);
                }
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
    if(!$el.classList.contains("jwPopup-eventAttached")){
        if($el.getAttribute('data-autoClose')!='N' && $el.getAttribute('data-autoClose')!='n' && $el.getAttribute('data-autoClose')!='false' && $el.getAttribute('data-autoClose')!='False'){
            document.getElementById(jwPopup_background_id).addEventListener("click",function(e){
                if(e.currentTarget.classList.contains("jwPopup-background")){
                    document.getElementById(element_id).jwPopup("hide");
                }
            });
        }
        var jwPopupCloseList = $el.getElementsByClassName("jwPopupClose");
        for(var i=0;i<jwPopupCloseList.length;i++){
            jwPopupCloseList[i].addEventListener("click",function(e){
                document.getElementById(element_id).jwPopup("hide");
            });
            jwPopupCloseList[i].addEventListener("touchstart",function(e){
                document.getElementById(element_id).jwPopup("hide");
            });
        }
        var jwPopupMaximizeList = $el.getElementsByClassName("jwPopupMaximize");
        for(var i=0;i<jwPopupMaximizeList.length;i++){
            jwPopupMaximizeList[i].addEventListener("click",function(e){
                document.getElementById(element_id).jwPopup("maximize");
            });
            jwPopupMaximizeList[i].addEventListener("touchstart",function(e){
                document.getElementById(element_id).jwPopup("maximize");
            });
        }
        var jwPopupMinimizeList = $el.getElementsByClassName("jwPopupMinimize");
        for(var i=0;i<jwPopupMinimizeList.length;i++){
            jwPopupMinimizeList[i].addEventListener("click",function(e){
                document.getElementById(element_id).jwPopup("minimize");
            });
            jwPopupMinimizeList[i].addEventListener("touchstart",function(e){
                document.getElementById(element_id).jwPopup("minimize");
            });
        }
        var data_draggable=$el.getAttribute("data-draggable");
        if((typeof options !=='undefined' && (options=='draggable' || (typeof options.draggable !=='undefined' && options.draggable))) || (data_draggable!==null && (data_draggable===true||data_draggable=="true"||data_draggable=="Y"||data_draggable=="y"))){
            var header_array = $el.getElementsByClassName("jw-popup-header");
            for(var i=0;i<header_array.length;i++){
                var $header = header_array[i];
                $header.style.cursor="move";
                dragElement($el,$header);
            }
            $el.setAttribute("data-draggable","true");
        }
        $el.classList.add("jwPopup-eventAttached")
    }
    var data_resizable=$el.getAttribute("data-resizable");
    var data_minimizable=$el.getAttribute("data-minimizable");
    if((data_resizable=='true' || data_resizable=='Y' || data_resizable==='y') && $el.style.resize!=='both'){
        $el.setAttribute('data-resizable','true');
    }
    if((data_resizable=='false' || data_resizable=='N' || data_resizable==='n') && $el.style.resize=='both'){
        $el.setAttribute('data-resizable','false');
    }
    if(data_minimizable=='true' || data_minimizable=='Y' || data_minimizable==='y'){
        $el.setAttribute('data-minimizable','true');
//        minimize_footer_setting();
    }
    if(data_minimizable=='false' || data_minimizable=='N' || data_minimizable==='n'){
        $el.setAttribute('data-minimizable','false');
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
        if(document.getElementById(jwPopup_containder_id).classList.contains("jwPopup-minimize")){
            minimize(jwPopup_containder_id);
        }
    }
    else if(options == 'hide'){
        if(typeof document.getElementById(element_id).close_reload !== 'undefined' && document.getElementById(element_id).close_reload){
            location.reload();
        }
    else if(typeof document.getElementById(element_id).close_url !== 'undefined' && document.getElementById(element_id).close_url){
            location.href=document.getElementById(element_id).close_url;
        }
        else{
            document.getElementById(jwPopup_containder_id).classList.remove("show");
            document.getElementById(jwPopup_containder_id).classList.remove("jwPopup-minimize");
            document.getElementById(jwPopup_containder_id).classList.remove("jwPopup-maximize");
        }
    }
    else if(options=='maximize'){
        maximize(jwPopup_containder_id);
    }
    else if(options=='minimize'){
        minimize(jwPopup_containder_id);
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
        if(typeof options.nobg !=='undefined' && options.nobg){
            $el.classList.add("jwPopup-nobackground");
            document.getElementById(jwPopup_containder_id).classList.add("jwPopup-nobackground");
        }
        if(typeof options.containerPosition !=='undefined'){
            if(typeof options.containerPosition.top !=='undefined'){
                document.getElementById(jwPopup_containder_id).style.top=options.containerPosition.top;
            }
            if(typeof options.containerPosition.left !=='undefined'){
                document.getElementById(jwPopup_containder_id).style.left=options.containerPosition.left;
            }
        }
        if(typeof options.resizable!=='undefined' && options.resizable){
            $el.setAttribute('data-resizable','true');
        }
        if(typeof options.minimizable!=='undefined' && options.minimizable){
            $el.setAttribute('data-minimizable','true');
            //minimize_footer_setting();
        }
        if(typeof options.resizable!=='undefined' && !options.resizable){
            $el.style.overflow='unset';
            $el.style.resize='unset';
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
        if(typeof options.tab =='number' || (typeof options.tab=='string' && !isNaN(parseInt(options.tab)))){
            var $tab_items = $el.querySelectorAll('.jwPopup-tab-item');
            for(var i=0;i<$tab_items.length;i++){
                $tab_items[i].classList.remove('show');
                if(i==parseInt(options.tab)){
                    $tab_items[i].classList.add('show');
                }
            }
            var $tab_list_items = $el.querySelectorAll('.jwPopup-tab-list-item');
            for(var i=0;i<$tab_list_items.length;i++){
                $tab_list_items[i].classList.remove('active');
                if(i==parseInt(options.tab)){
                    $tab_list_items[i].classList.add('active');
                }
            }
        }
        if(typeof options.theme !=='undefined'){
            if(!document.getElementById(jwPopup_containder_id).classList.contains(options.theme)){
                document.getElementById(jwPopup_containder_id).classList.add(options.theme);
            }
        }
    }
    function maximize(jwPopup_containder_id){
        if(document.getElementById(jwPopup_containder_id).classList.contains('jwPopup-maximize')){
            document.getElementById(jwPopup_containder_id).classList.remove('jwPopup-maximize')
        }
        else{
            document.getElementById(jwPopup_containder_id).classList.add('jwPopup-maximize')
        }
    }
    function minimize(jwPopup_containder_id){
        if(document.getElementById(jwPopup_containder_id).classList.contains('jwPopup-minimize')){
            document.getElementById(jwPopup_containder_id).classList.remove('jwPopup-minimize')
        }
        else{
            document.getElementById(jwPopup_containder_id).classList.add('jwPopup-minimize')
        }
    }
    function dragElement(elmnt, header) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (header) {
            header.onmousedown = dragMouseDown;
            header.addEventListener('touchstart',dragMouseDown,{passive:false});
        }
        function dragMouseDown(e) {
            if(e){
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.addEventListener('touchend',closeDragElement,{passive:false});
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
                document.addEventListener('touchmove',elementDrag,{passive:false});
            }
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            if(e.clientX){
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
            }
            else{
                pos1 = pos3 - e.changedTouches[0].clientX;
                pos2 = pos4 - e.changedTouches[0].clientY;
                pos3 = e.changedTouches[0].clientX;
                pos4 = e.changedTouches[0].clientY;
            }

            var newtop=(parseInt(elmnt.style.top) - pos2) ;
            var newleft=(parseInt(elmnt.style.left) - pos1);

            var startTop = 0;
            var startLeft=0;
            var endTop=999999999;
            var endLeft=999999999;
            var tmpContainer = document.getElementsByClassName("jw-popup-container");
            if(tmpContainer!=null && typeof tmpContainer!=='undefined' && tmpContainer.length==1){
                startTop = tmpContainer[0].offsetTop;
                startLeft = tmpContainer[0].offsetLeft;
                endTop = tmpContainer[0].offsetTop + tmpContainer[0].offsetHeight - elmnt.getBoundingClientRect().height;
                endLeft = tmpContainer[0].offsetLeft + tmpContainer[0].offsetWidth - elmnt.getBoundingClientRect().width;
            }
            // set the element's new position:
            if(newtop>=startTop && newtop<=endTop){
                elmnt.style.top = newtop+ "px";
            }
            if(newleft>=startLeft && newleft<=endLeft){
                elmnt.style.left = newleft + "px";
            }
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            document.removeEventListener('touchmove',elementDrag,{passive:false});
            document.removeEventListener('touchend',closeDragElement,{passive:false});
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
        if(document.getElementById(jwPopupIdList[i]).getAttribute('data-resizable')=='true' && document.getElementById(jwPopupIdList[i]).style.resize!='both'){
            document.getElementById(jwPopupIdList[i]).style.overflow='auto';
            document.getElementById(jwPopupIdList[i]).style.resize='both';
            document.getElementById(jwPopupIdList[i]).style.width=document.getElementById(jwPopupIdList[i]).getBoundingClientRect().width+'px';
            var width_calc=40;
            if(document.getElementsByClassName("jw-popup-container") !== null && document.getElementsByClassName("jw-popup-container").length==1){
                document.getElementById(jwPopupIdList[i]).style.maxWidth=document.getElementsByClassName("jw-popup-container")[0].offsetWidth-width_calc+'px';
            }
            else{
                document.getElementById(jwPopupIdList[i]).style.maxWidth=document.body.offsetWidth-width_calc+'px';
            }
            document.getElementById(jwPopupIdList[i]).style.height=document.getElementById(jwPopupIdList[i]).getBoundingClientRect().height+'px';
            var height_calc=15;
            if(document.getElementsByClassName("jw-popup-container") !== null && document.getElementsByClassName("jw-popup-container").length==1){
                document.getElementById(jwPopupIdList[i]).style.maxHeight=document.getElementsByClassName("jw-popup-container")[0].offsetHeight-height_calc+'px';
            }
            else{
                if(document.getElementById(jwPopupIdList[i]).getAttribute('data-minimizable')=='true'){
                    height_calc+=document.getElementById("jwPopupMinimized").getBoundingClientRect().height;
                }
                document.getElementById(jwPopupIdList[i]).style.maxHeight=document.body.offsetHeight-height_calc+'px';
            }
            var tmpHeight=0;
            var header_array = document.getElementById(jwPopupIdList[i]).getElementsByClassName("jw-popup-header");
            for(var j=0;j<header_array.length;j++){
                tmpHeight += header_array[j].offsetHeight;
            }
            var footer_array = document.getElementById(jwPopupIdList[i]).getElementsByClassName("jw-popup-footer");
            for(var j=0;j<footer_array.length;j++){
                tmpHeight += footer_array[j].offsetHeight;
            }
            var body_array = document.getElementById(jwPopupIdList[i]).getElementsByClassName("jw-popup-body");
            if(body_array.length==1){
                tmpHeight += parseInt(window.getComputedStyle(body_array[0]).getPropertyValue('padding-top'));
                tmpHeight += parseInt(window.getComputedStyle(body_array[0]).getPropertyValue('padding-bottom'));
                body_array[0].style.maxHeight='unset';
                body_array[0].style.height='calc(100% - '+tmpHeight+'px )';
            }
        }
        else if(document.getElementById(jwPopupIdList[i]).getAttribute('data-resizable')=='false' && document.getElementById(jwPopupIdList[i]).style.resize=='both'){
            document.getElementById(jwPopupIdList[i]).style.overflow='unset';
            document.getElementById(jwPopupIdList[i]).style.resize='unset';
        }
        if(document.getElementById(jwPopupIdList[i]).style.position!=='absolute' && document.getElementById(jwPopupIdList[i]).getAttribute('data-draggable')=='true'){
            var ty=parseInt(window.getComputedStyle(document.getElementById(jwPopupIdList[i])).transformOrigin.split(" ")[1]);
            document.getElementById(jwPopupIdList[i]).style.top=document.getElementById(jwPopupIdList[i]).offsetTop-ty+"px";
            document.getElementById(jwPopupIdList[i]).style.left=document.getElementById(jwPopupIdList[i]).offsetLeft+"px";
            document.getElementById(jwPopupIdList[i]).style.transform="translate(0,0)";
            document.getElementById(jwPopupIdList[i]).style.position="absolute";
        }
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