
let deselectAll=function(){
    $(".cell").css("background-color", "white");
}
let selectRow=function(index){

    $(`.row${index}`).css("background-color", "#e0e0ff");
}
let colData=[];
let frequencies={};


let selectCol=function(index){
    colData=[];
    $(`.col${index}`).css("background-color", "#e0e0ff");
    $(`.col${index}`).map(function() {
        colData.push(this.innerHTML);
        
        if (!frequencies[getGrade(this.innerHTML)]){
            frequencies[getGrade(this.innerHTML)]=1;
        }
        else{
            frequencies[getGrade(this.innerHTML)]+=1;
        }
    });
    let totalMarks=colData.length;
    
    for (let i in frequencies){
        frequencies[i]=frequencies[i]/totalMarks;
    }
    console.log(frequencies);
    //creating data for d3 barplot
    var data = [];
    for(const [key, value] of Object.entries(frequencies)) {
        data.push({
                    "grade":key,
                    "freq":value
        });
    }
    console.log(data);

    
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    $("#barplot").replaceWith("<div id=\"barplot\"></div>");
    var svg = d3.select("#barplot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.grade; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 1])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
        .attr("class","bar")
        .attr("x", function(d) { return x(d.grade); })
        .attr("y", function(d) { return y(d.freq); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.freq); })
        .attr("fill", "#69b3a2")

}
function getGrade(mark) {
    if (mark < 50.0) {
        return 'F';
    } else if (mark < 60.0) {
        return 'D';
    } else if (mark < 70.0) {
        return 'C';
    } else if (mark < 80.0) {
        return 'B';
    } else {
        return 'A';
    }
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
            headers.splice(0,1); //removing SID
            for (i in headers){
                body+='<th class="asmt" id="col'+i+'">'+headers[i]+'</th>';
            }
            body += "</tr>";
            
            rows.splice(0, 1);//removing headers
            
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
            body+="<div id=\"barplot\"></div>";
            $('#container').replaceWith(body);
        }
    });
    
    $(".studentId").click(function(){
        
        deselectAll();
        selectRow($(this).attr('id').substring(3, ));
        

    });

    $(".asmt").click(function(){
        deselectAll();
        selectCol($(this).attr('id').substring(3, ));
        
       
    });
    
    function edit(){
        $(this).replaceWith("<td id=\"activeTd\"><input id=\"activeInput\" class=\"" + $(this).attr("class") + "\" value=\"" + $(this).html() + "\"></input></td>");
        $("#activeInput").keypress(function (event) {
            if (event['code'] == "Enter")
            {
                let memory = $("activeInput").attr("class");
                $("#activeTd").replaceWith("<td class=\"" + $("#activeInput").attr("class") + "\">" + $("#activeInput").val() + "</td>");
                $("td").click(edit);
            }
        });
    }
    $("td").click(edit);

    
});