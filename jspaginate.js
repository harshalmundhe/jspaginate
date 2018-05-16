/*
 * Js paginate 
 * Open source pagination code
 * Author Harshal
 * Date 16-05-2018
 *
 */
elemet_arr = [];
instance = 0;
jQuery.fn.extend({
    createPaging: function(options){
        var defaults = {
            selectvals: [5,10,20,50,100]
        };
        var settings = jQuery.extend( {}, defaults, options );
 
        return this.each(function(index, element) {
            index = instance;
            instance++;       
            var trlen = jQuery(element).find("tbody tr").length;
            jQuery(element).before('<div class="paginate-control'+index+'"></div>');
            jQuery(".paginate-control"+index).css("width",jQuery(element).width());
            elemet_arr[index] = element;
            createSelect(index,settings.selectvals,trlen);
            createNavForm(index,trlen);
            displayLogic(index);
        });
    }
});
function createSelect(index,selectvals,trlen){
    jQuery(".paginate-control"+index).append("<select class='paginate-dropdown"+index+"' onchange='createNavForm("+index+","+trlen+");displayLogic("+index+");'></select>");
    
    jQuery.each(selectvals,function (i, el) {
        jQuery(".paginate-dropdown"+index).append("<option>" + el + "</option>");
    });
}

function getSelectedItem(index){
    return parseInt(jQuery(".paginate-dropdown"+index+" :selected").text());
}

function createNavForm(index,trlen){
    element = elemet_arr[index];
   jQuery(".pagediv"+index).remove();
   var pagediv = "<a href='javascript:void(0)' onclick='goBackAll("+index+","+trlen+")'>&lt;&lt;</a>&nbsp;&nbsp;";
   pagediv += "<a href='javascript:void(0)' onclick='goBackOne("+index+","+trlen+")'>&lt;</a>&nbsp;&nbsp;";
   pagediv += "Page: <input type='text' id='pageval"+index+"' value='1' size='2' onchange='updatePage("+index+","+trlen+")'> of "+getPage(index,trlen)+"&nbsp;&nbsp;";
   pagediv += "<a href='javascript:void(0)' onclick='goForwardOne("+index+","+trlen+")'>&gt;</a>&nbsp;&nbsp;";
   pagediv += "<a href='javascript:void(0)' onclick='goForwardAll("+index+","+trlen+")'>&gt;&gt;</a>";
   jQuery(".paginate-control"+index).append("<div class='pagediv"+index+"'>"+pagediv+"</div>");
   jQuery(".pagediv"+index).css("float","right");
   
   jQuery(".pagediv"+index+" a").css({"text-decoration":"none","color":"black"});
   
   
}

function getPage(index,trlen){
    var paginate_selected = getSelectedItem(index);

    return Math.ceil(trlen/paginate_selected);
}

function displayLogic(index,start=0,end=""){
    if(end === ""){
        end = getSelectedItem(index);
    }
    
    element = elemet_arr[index];
    
    jQuery.each(jQuery(element).find("tbody tr"),function(i){
       if(i<start) jQuery(this).hide();
       else if(i>=end) jQuery(this).hide();
       else jQuery(this).show();
    });
    
}

function goBackAll(index, trlen){
    var pageval =  jQuery("#pageval"+index).val();
    
    var selected = getSelectedItem(index);
    if(pageval == 1){
        return;
    }else{
        var start = 0;
        var end = selected;
        displayLogic(index,start,end);
        jQuery("#pageval"+index).val("1");
    }
    
}
function goForwardAll(index, trlen){
    var pageval =  jQuery("#pageval"+index).val();
    var maxpage = getPage(index, trlen);
    var selected = getSelectedItem(index);
    if(pageval == maxpage){
        return;
    }else{
        var start = ((maxpage-1)*selected);
        var end = start+pageval;
        displayLogic(index,start,end);
        jQuery("#pageval"+index).val(maxpage);
    }
}

function goBackOne(index, trlen){
    var pageval =  jQuery("#pageval"+index).val();
    var selected = getSelectedItem(index);
    if(pageval == 1){
        return;
    }else{
        pageval--;
        var start = ((pageval-1)*selected);
        jQuery("#pageval"+index).val(pageval);
        var end = start+selected;
        displayLogic(index,start,end);
    }
}
function goForwardOne(index, trlen){
    var pageval =  jQuery("#pageval"+index).val();
    var maxpage = getPage(index, trlen);
    var selected = getSelectedItem(index);
    if(pageval == maxpage){
        return;
    }else{
        var start = (pageval*selected);
        pageval++;
        jQuery("#pageval"+index).val(pageval);
        var end = start+selected;
        displayLogic(index,start,end);
    }
}

function updatePage(index,trlen){
    var pageval =  jQuery("#pageval"+index).val();
    var maxpage = getPage(index, trlen);
    var selected = getSelectedItem(index);
    if(pageval<1 || pageval>maxpage){
        return;
    }else{
        var start = ((pageval-1)*selected);
        var end = start+selected;
        displayLogic(index,start,end);
    }
}


