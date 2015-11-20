$(document).ready(function(){
    $.getJSON("./resources/bookmarks.json",function(data){
        $.each(data,function(index,element){
            var content = "<div><p class="+"name"+">"+element.title+"</p>"+"<p class="+"ctime"+">"+"Created @ "+unixToDate(element.created)+"</p></div>";
            $("#content").append(content);
        });
    });
    var s = unixToDate("1387243195");
});
function unixToDate(time) {
    var unixTime = parseInt(time);
    var date = new Date(unixTime * 1000);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth()+1;
    var day = date.getUTCDate();
    return year+"-"+month+"-"+day;
}
function textChanged(){
    var text = $("#search-content").val();
    $("p").each(function(){
        var innerHtml = $(this)[0].innerHTML.replace(/<.*?>/ig,"");
        $(this)[0].innerHTML = innerHtml;
    });
    $("#content div").show();
    var children = $("#content div").children(".name").each(function(){
        var p_content = $(this).text();
		var reg = new RegExp("("+text+")","gi");
        if(p_content.match(reg)){
            $(this).html( $(this).html().replace(reg,"<span class='highlight'>$1</span>"));  
        }
        else{
            $(this).parent().hide();
        }
    });
};