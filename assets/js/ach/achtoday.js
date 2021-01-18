var base_url = $("#base-url-1").val();

$(document).ready(function () {
    ach_today_debit('D', '');
});

$(document).on('change','#debit_from_date',function(){
    var s_date = $(this).val();
    ach_today_debit('D', s_date);
});

function ach_today_debit(type = '', s_date = ''){
    var postData    = {type:type,verified_date:s_date};
    postData[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'backend/ach_manual/debit_today_ach',
        success:function(result){
            $("#pending_Transactions").html(result.debit_ach_html);
        }
    });
}

$(document).on('click','#credit_tab',function(){
    ach_today_credit('C', '');
});

$(document).on('change','#debit_from_date_c',function(){
    var c_date = $(this).val();
    ach_today_credit('C', c_date);
});

function ach_today_credit(type = '', c_date = ''){
    var postData    = {type:type,verified_date:c_date};
    postData[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'backend/ach_manual/credit_today_ach',
        success:function(result){
            $("#paid_Transactions").html(result.credit_ach_html);
        }
    });
}

$(document).on('click','#selectall',function(){
    if(this.checked) { 
        $('.checkbox1').each(function() {
            this.checked = true;  
        });
    }else{
        $('.checkbox1').each(function() { 
          this.checked = false;        
        });         
    }
});

$(document).on('click','#stop-all-ach',function(){
    // $('#stop-all-ach').on("click", function(event){ 
    var n = $("#content_box input:checked").length;
    if(n==0) { 
        $("#error_msg").html('Please select atleast one checkbox.'); 
    } else{ 
        $("#error_msg").hide();
        var invest_confirm = confirm('Are you sure you want to make the payment?');
        if(invest_confirm==true){
            if(n>0) { 
                $(".checkbox1").each(function(){
                    var $this = $(this);
                    if($this.is(':checked')) {
                        var id        = $(this).val();
                        var type      = $(this).data('title');
                        var date      = $(".hid_clear_date_"+type+"_"+id).val();
                        var post_data = {eid:id,type:type};
                        post_data[global_csrf_token_name]= global_csrf_token_value;
                        $.ajax({
                            type: "GET",
                            url: base_url+'backend/ach_manual/stop_ach',
                            data :post_data,
                            dataType:'json',
                            success : function(data){   
                                location.reload();
                            }
                        });
                        $("#success_msg").html('Update status successfully.');   
                    }
                });
            }
            return false;
        }else{
            return false;
        }
        return false;
    }
});

// $('#reprocess-all-ach').on("click", function(event){
$(document).on('click','#reprocess-all-ach',function(){ 
    var n = $("#content_box input:checked").length;
    if(n==0) { 
        $("#error_msg").html('Please select atleast one checkbox.'); 
    } else{ 
        $("#error_msg").hide();
        var invest_confirm = confirm('Are you sure you want to make the payment?');
        if(invest_confirm==true){
            if(n>0) { 
                $(".checkbox1").each(function(){
                    var $this = $(this);
                    if($this.is(':checked')) {
                        var id = $(this).val();
                        var type = $(this).data('title');
                        //var date = $(this).data('date');
                        var date = $(".hid_clear_date_"+type+"_"+id).val();
                        var post_data ={eid:id,type:type};
                        post_data[global_csrf_token_name]= global_csrf_token_value;
                        $.ajax({
                            type: "POST",
                            url: base_url+'backend/ach_manual/reprocess_stoped_ach/'+id+'/'+type,
                            data :post_data,
                            dataType:'html',
                            success : function(data){   
                                location.reload();
                            }
                        });
                        $("#success_msg").html('Update status successfully.');   
                    }
                });
            }
            return false;
        }else{
            return false;
        }
        return false;
    }
});


$(document).on('click','#selectall_c',function(){
    if(this.checked) { 
        $('.checkbox2').each(function() {
            this.checked = true;  
        });
    }else{
        $('.checkbox2').each(function() { 
          this.checked = false;        
        });         
    }
});

$(document).on('click','#stop-all-ach_c',function(){
    // $('#stop-all-ach').on("click", function(event){ 
    var n = $("#content_box_c input:checked").length;
    if(n==0) { 
        $("#error_msg").html('Please select atleast one checkbox.'); 
    } else{ 
        $("#error_msg").hide();
        var invest_confirm = confirm('Are you sure you want to make the payment?');
        if(invest_confirm==true){
            if(n>0) { 
                $(".checkbox2").each(function(){
                    var $this = $(this);
                    if($this.is(':checked')) {
                        var id        = $(this).val();
                        var type      = $(this).data('title');
                        var date      = $(".hid_clear_date_"+type+"_"+id).val();
                        var post_data = {eid:id,type:type};
                        post_data[global_csrf_token_name]= global_csrf_token_value;
                        $.ajax({
                            type: "GET",
                            url: base_url+'backend/ach_manual/stop_ach',
                            data :post_data,
                            dataType:'json',
                            success : function(data){   
                                location.reload();
                            }
                        });
                        $("#success_msg").html('Update status successfully.');   
                    }
                });
            }
            return false;
        }else{
            return false;
        }
        return false;
    }
});

$(document).on('click','#reprocess-all-ach_c',function(){ 
    var n = $("#content_box_c input:checked").length;
    if(n==0) { 
        $("#error_msg").html('Please select atleast one checkbox.'); 
    } else{ 
        $("#error_msg").hide();
        var invest_confirm = confirm('Are you sure you want to make the payment?');
        if(invest_confirm==true){
            if(n>0) { 
                $(".checkbox2").each(function(){
                    var $this = $(this);
                    if($this.is(':checked')) {
                        var id = $(this).val();
                        var type = $(this).data('title');
                        //var date = $(this).data('date');
                        var date = $(".hid_clear_date_"+type+"_"+id).val();
                        var post_data ={eid:id,type:type};
                        post_data[global_csrf_token_name]= global_csrf_token_value;
                        $.ajax({
                            type: "POST",
                            url: base_url+'backend/ach_manual/reprocess_stoped_ach/'+id+'/'+type,
                            data :post_data,
                            dataType:'html',
                            success : function(data){   
                                location.reload();
                            }
                        });
                        $("#success_msg").html('Update status successfully.');   
                    }
                });
            }
            return false;
        }else{
            return false;
        }
        return false;
    }
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