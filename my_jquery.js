let deselectAll=function(){
    $(".cell").css("background-color", "white");
}
let selectRow=function(index){
    
    $(`.row${index}`).css("background-color", "#e0e0ff");
}

let selectCol=function(index){
    
    $(`.col${index}`).css("background-color", "#e0e0ff");
}

$(document).ready(function(){
    
    $(".studentId").click(function(){
        deselectAll();
        selectRow($(this).attr('id').substring(3, ));
        /*if ($(this).attr('id')==='row0'){
            selectRow(0);
            $(".row0").css("background-color", "#e0e0ff");
        }
        else if ($(this).attr('id')==='row1'){
            selectRow(1);
            $(".row1").css("background-color", "#e0e0ff");
        }
        else{
            selectRow(2);
            $(".row2").css("background-color", "#e0e0ff");
        }*/
        
    });
    
    $(".asmt").click(function(){
        deselectAll();
        selectCol($(this).attr('id').substring(3, ));
        /*if ($(this).attr('id')==='col0'){
            $(".col0").css("background-color", "#e0e0ff");
        }
        else if ($(this).attr('id')==='col1'){
            $(".col1").css("background-color", "#e0e0ff");
        }
        else{
            $(".col2").css("background-color", "#e0e0ff");
        }
        */
    });
  });