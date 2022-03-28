$(document).ready(function() {
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