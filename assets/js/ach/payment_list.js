var base_url = $("#base-url-1").val();

$(document).ready(function () {
    payment_list();
});

function payment_list(){
    var postData    = {};
    postData[global_csrf_token_name]= global_csrf_token_value;
    // ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'backend/ach_manual/paymentlist',
        success:function(result){
            // remvLoadingPanel();
            $("#payment_list_table").html(result.paymentlist_html);
        }
    });
}

$(document).on('click','#credit_tab',function(){
    ach_manual_credit('C');
});

function ach_manual_credit(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'backend/ach_manual/credit_ach',
        success:function(result){
            $("#paid_Transactions").html(result.credit_ach_html);
        }
    });
}











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