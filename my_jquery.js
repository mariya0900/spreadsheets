let deselectAll=function(){
    $(".cell").css("background-color", "white");
}
let selectRow=function(index){

    $(`.row${index}`).css("background-color", "#e0e0ff");
}

let selectCol=function(index){

    $(`.col${index}`).css("background-color", "#e0e0ff");
}
$(document).ready(function() {
    $(".studentId").click(function(){
        deselectAll();
        selectRow($(this).attr('id').substring(3, ));
        

    });

    $(".asmt").click(function(){
        deselectAll();
        selectCol($(this).attr('id').substring(3, ));
       
    });
	$("td").click(function () {
		$(this).replaceWith("<td id=\"activeTd\"><input id=\"activeInput\" class=\"" + $(this).attr("class") + "\" value=\"" + $(this).html() + "\"></input></td>");
		$("#activeInput").keypress(function (event) {
			if (event['code'] == "Enter")
			{
				$("#activeTd").replaceWith("<td class=\"" + $("#activeTd").attr("class") + "\">" + $("#activeInput").val() + "</td>");
			}
		});
	});
});