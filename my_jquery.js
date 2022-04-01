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
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/grades.csv',
        dataType: 'text',
        async: false,
        success: function(response) {
            let body = "<table>";
            let rows=response.split('\n');
            body += "<tr>";
            let header=rows[0];
            let headers=header.split(',');
            body+='<th>SID</th>';
            headers.splice(0,1);
            for (i in headers){
                body+='<th class="asmt" id="col'+i+'">'+headers[i]+'</th>';
            }
            body += "</tr>";
            
            rows.splice(0, 1);
            console.log(rows);
            for (let i in rows){
                
                body+='<tr>';
                let items=rows[i].split(',');
                
                body+='<th class="studentId" id="row'+i+'">'+items[0]+'</th>';
                items.splice(0,1);
                for (let j in items){
                    body+='<td class="cell row'+i+' col'+j+'">'+items[j]+'</td>';
                }
                body+='</tr>';
            }
            body += "</table>";
            $('#container').replaceWith(body);
        }
    });

    $(".studentId").click(function(){
        alert('studentId clicked');
        deselectAll();
        selectRow($(this).attr('id').substring(3, ));
        

    });

    $(".asmt").click(function(){
        deselectAll();
        selectCol($(this).attr('id').substring(3, ));
        alert('asmt clicked');
       
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