var base_url = $("#base-url-1").val();

$(document).ready(function () {
    return_list();
});

function return_list(){
    var postData    = {};
    postData[global_csrf_token_name]= global_csrf_token_value;
    // ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'backend/ach_manual/returnlist',
        success:function(result){
            // remvLoadingPanel();
            $("#return_payment_list").html(result.return_html);
        }
    });
}

$(document).on('click','#excel',function(){
    // alert(12);
    // $("#excel").click(function(){
    var search = $("#payment_search").val();
    var username = $("#searchKey1").val();
    var date_from = $("#from_date").val();
    var date_to = $("#to_date").val();
    var project_type = 'Credit';
    window.location.href = base_url+"backend/ach_export/export_excel_credit?searchKey="+search+"&username="+username+"&date_from="+date_from+"&date_to="+date_to+"&project_type="+project_type;

});


$(document).on('click','#debit_tab',function(){
    return_debit_list('','');
});

$(document).on('change','#from_date_debit',function(){
    var from_date = $(this).val();    
    var to_date   = $('#to_date_debit').val();
    return_debit_list(from_date, to_date);
});

$(document).on('change','#to_date_debit',function(){
    var to_date = $(this).val();    
    var from_date   = $('#from_date_debit').val();
    return_debit_list(from_date, to_date);
});

function return_debit_list(from_date = null, to_date = null){

    var postData    = {from_date:from_date,to_date:to_date};
    postData[global_csrf_token_name]= global_csrf_token_value;
    // console.log(postData);
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'backend/ach_manual/returnlist_debit',
        success:function(result){
            remvLoadingPanel();
            $("#return_debitlist").html(result.return_html);
        }
    });
}

$(document).on('click','#excel_debit',function(){
    var search = $("#payment_search_debit").val();
    var username = $("#searchKey1_debit").val();
    var date_from = $("#from_date_debit").val();
    var date_to = $("#to_date_debit").val();
    var project_type = 'Debit';
    window.location.href = base_url+"backend/ach_export/export_excel?searchKey="+search+"&username="+username+"&date_from="+date_from+"&date_to="+date_to+"&project_type="+project_type;
});



function statusupdate(posted_data,request_url,delete_msg,succes_msg,error_msg,reload_table_id){
    swal({   
            title: "Are you sure?",   
            text: delete_msg,   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#f59522",   
            confirmButtonText: "Yes update it!",   
            cancelButtonText: "No, cancel",   
            closeOnConfirm: false,   
            closeOnCancel: true 
        }, function(isConfirm){ 

        if (isConfirm) {
            $.ajax({
                url:request_url,
                type: 'POST',
                data: posted_data, 
                dataType: 'json',
                success: function(response){
                    if(response.status == true){
                        swal("Updated!", succes_msg, "success");
                        if(reload_table_id !=null && reload_table_id !='' && reload_table_id != 'VendorBrokerList' && reload_table_id != 'saved_criteria'){
                            $('#'+reload_table_id).DataTable().ajax.reload(null,false);
                        }
                    }else{
                       swal("Cancelled", error_msg, "error");  
                    }
                }
            });
        } else {     
            swal("Cancelled", error_msg, "error");   
        } 
    });
}

var ShwPnl = false;
function ShwLoadingPanel(){
    if(!ShwPnl){
        var lDPnl = jQuery(document.createElement('div'))
        lDPnl.attr("id","loadingPnl");    
        lDPnl.attr("class","animsition-loading");    
        lDPnl.css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px").css("opacity",0);
        lDPnl.css("background","url("+base_url+"images/ajax-loader.gif) no-repeat center rgba(255, 255, 255, 0.4)").css("position","fixed").css("left","0px").css("top","0px").css("z-index","10000"); 
        jQuery(lDPnl).appendTo("body");
        lDPnl.fadeTo(550, 1);
        ShwPnl = true;
    }else
        jQuery("#loadingPnl").fadeIn(550);
}
        
function remvLoadingPanel(){
    jQuery("#loadingPnl").fadeOut(100);
}