$(document).ready(function(){
    $.getJSON("../resources/bookmarks.json",function(data){
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
    $("span").each(function(){
        var tmp=$(this).html();
        $(this).replaceWith(tmp);
    });
    $("#content div").show();
    var children = $("#content div").children(".name").each(function(){
        var p_content = $(this).text();
        var text_lower = text.toLowerCase();
        var p_content_lower = p_content.toLowerCase();
        if(p_content_lower.indexOf(text_lower) >=0 ){
            $(this).html( $(this).html().replace(eval("/"+text+"/gi"),"<span class='highlight'>"+text+"</span>"));
        }
        else{
            $(this).parent().hide();
        }
    });
};