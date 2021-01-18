var base_url = $("#base-url-1").val();

$(document).ready(function () {
    ach_manual_debit('D');
});

function ach_manual_debit(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'backend/ach_manual/debit_ach',
        success:function(result){
            $("#pending_Transactions").html(result.debit_ach_html);
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



$(document).on('click','.reason',function(){
    var reason = $(this).attr('data-reason');
    $("#reason").val(reason);
});

$("#inactive-form").validate({
    onkeyup: false,
    ignore : false,
    rules: {
        inactive_reason:{required:true},
    },
    messages: {
        inactive_reason:{required:"Reason For Inactivating is required"},
    },
    errorPlacement: function(error, element) {
        if(element.attr("name") == 'lenders_state'){
            error.insertAfter(element.parent("div").parent("div"));
        }else{
            error.insertAfter(element); 
        }
    }
});

$(document).on('click','.app-deactivate',function(){
    $("#inactive-form")[0].reset();
    var form_valid = $("#inactive-form").validate();
        form_valid.resetForm();
    var man_id = $(this).attr('data-id');
    var type = $(this).attr('data-type');
    var m_type = $(this).attr('data-m_type');
    $(".inactive-modal").find('#myLargeModalLabel').html('Deactivate');
    $(".inactive-modal").modal('show');
    $(".inactive-modal").find('#status').val(type);
    $(".inactive-modal").find('#manual_id').val(man_id);
    $(".inactive-modal").find('#m_type').val(m_type);
});

$(document).on('click','#inact-subt',function(){
    var form_valid = $("#inactive-form").valid();
    if(form_valid == true){
        var mtype = $("#m_type").val();
        $.post(base_url+'backend/ach_manual/change_status',$("#inactive-form").serialize(),function(response){
            var response = $.parseJSON(response);
            if(response.status == true){
                if(mtype == 'D'){
                    $('#ach_debit_transaction').DataTable().ajax.reload();
                } else {
                    $('#ach_credit_transaction').DataTable().ajax.reload();
                }
                $(".inactive-modal").modal('hide');
                
                swal("Updated!", "Status updated successfully.", "success");
            }else{
                 swal("Cancelled", "Status is could not be updated", "error");
            }
        });
    }else{

    }
});

$(document).on('click','.app-activate',function(){
    var man_id = $(this).attr('data-id');
    var type = $(this).attr('data-type');
    var m_type = $(this).attr('data-m_type');
    if(m_type == 'D'){
        var table = 'ach_debit_transaction';
    } else {
        var table = 'ach_credit_transaction';
    }
    statusupdate({'status':type,'manual_id':man_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/ach_manual/change_status',"Do you really want to change Status?","Status updated successfully.","Status is could not be updated", table);
});

$(document).on('click','.delete',function(){
    var man_id = $(this).attr('data-id');
    var m_type = $(this).attr('data-m_type');
    if(m_type == 'D'){
        var table = 'ach_debit_transaction';
    } else {
        var table = 'ach_credit_transaction';
    }
    statusupdate({'manual_id':man_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/ach_manual/delete',"Do you really want to Delete?","Deleted successfully.","Delete is could not be done", table);
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