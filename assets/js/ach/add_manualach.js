var base_url = $("#base-url-1").val();

$(document).ready(function () {
    
    $( "#user_search" ).autocomplete({ 
        source: base_url+'backend/ach_manual/get_user_list',
        minLength: 1,
        select: function(event, ui) { 
            if(ui.item == null || ui.item == undefined) {
                alert("Invalid user");
                $(this).val('');
                $('#user_id').val('');
                $("#bank_id").empty();
                $('#bank_name').val('');
                $("#bank_id").append('<option value="">--Select--</option>');
            } else {
                id    = ui.item.id;
                value = ui.item.value;
                $('#user_id').val(id);
                $("#bank_id").empty();
                var post_data = {user_id:id};
                post_data[global_csrf_token_name]= global_csrf_token_value;
                $.ajax({
                    type : "POST",
                    url  : base_url + 'backend/ach_manual/get_bank',
                    data :post_data,
                    dataType:'json',
                    success : function(response){
                        if(response.data1=='Y'){
                            $("#bank_id").append('<option value="">--Select--</option>');
                            $.each(response.bank_details, function(key, value ) {
                                $("#bank_id").append('<option value=' + value.bank_id + '>' + value.string + '</option>');
                            });
                            $("#bank_id").selectpicker('refresh');
                        }else{
                            $("#bank_id").append('<option value="">--Select--</option>');
                            $("#bank_id").selectpicker('refresh');
                            $('#bank_name').val('');
                        }
                    }
                });
                $('#bank_acc').show();
            }         
        },
        change: function(event,ui){
            $(this).val((ui.item ? ui.item.value : ""));
            $('#user_id').val((ui.item ? ui.item.id : ""));
            if(ui.item == null || ui.item == undefined) {
                $("#bank_id").empty();
                $("#bank_id").append('<option value="">--Select--</option>');
                $("#bank_id").selectpicker('refresh');
            }
        }
    });

    $( "#project_search" ).autocomplete({
        source: base_url+'backend/ach_manual/get_project_list',
        minLength: 1,
            select: function(event, ui) { 
                if(ui.item == null || ui.item == undefined) {
                    alert("Invalid project name");
                    $(this).val('');
                    $('#project_id').val('');
                } else {
                    id    = ui.item.id;
                    value = ui.item.value;
                    $('#project_id').val(id);
                    $('#loan_number').val(ui.item.extend_no);
                }         
            },
            change: function(event,ui){
                $(this).val((ui.item ? ui.item.value : ""));
                $('#project_id').val((ui.item ? ui.item.id : ""));
            }
    });

    $(document).on('change','#bank_id',function(){ 
        var bank_id = $(this).val();
        if(bank_id != ''){
            get_bank_name(bank_id);
        }
    });

});

$('body').on('ifChecked', '.transactiontype', function(){
    var str1 = $(this).val();
    if(str1=='credit'){
        $("#totalamt").html('Total Amount to be ACH Credited');
    }else{
        $("#totalamt").html('Total Amount to be ACH Debited');
    }
});


$('#others').on('ifChanged', function(event){
    var islicence= $(this).is(':checked');
    if(islicence==true){
        $("#amt_interst").attr('disabled','disabled');
        $(".amt_type").attr('disabled','disabled');
        // $("[name='area_check[]']").iCheck('check');
        $("[name='amount_type[]']").iCheck('uncheck');
    }else{
        $("#amt_interst").removeAttr('disabled');
        $(".amt_type").removeAttr('disabled');
    }
});

$('body').on('ifChanged', '.amt_type', function(){
    var loc = [];
    $('input[name="amount_type[]"]:checked').each(function(){
        loc.push($(this).val());
    });
    if(loc.length != 0){
        $("#amt_other").attr('disabled','disabled');
        $("#amt_other1").attr('disabled','disabled');
        $("#others").attr('disabled','disabled');
        // $("[name='area_check[]']").iCheck('check');
        $("[name='amount_type_other']").iCheck('uncheck');
        $("#amt_type_error").html('');
        $("#amt_type_error").hide();
        $("#amt_other").val('');
    }else{
        $("#amt_other").removeAttr('disabled');
        $("#amt_other1").removeAttr('disabled');
        $("#others").removeAttr('disabled');
        $("#amt_interst").val('');
    }
});



$("#amt_interst, #amt_other").blur(function(){
    $("#ach_amt").val($(this).val());
});

$(document).on('change','#user_search',function(){ 
    $("#communication_div").html('Has this Been Communicated to' + $(this).val() );
});

$("#add-manual-transaction").validate({
    onkeyup: false,
    ignore : false,
    rules: {
        transaction_for:{required:true},
        transaction_type:{required:true},
        project_search:{required:true},
        loan_number:{required:true},
        user_search:{required:true},
        bank_id:{required:true},
        bank_name:{required:true},
        processing_date:{required:true},
        communicated:{required:true},
        admin_name:{required:true},
        manual_reason:{required:true},
        amt_interst:{required:true},
    },
    messages: {
        transaction_for:{required:"Transaction For is required"},
        transaction_type:{required:"Transaction Type is required"},
        project_search:{required:"Loan Name is required"},
        loan_number:{required:"Loan Number is required"},
        user_search:{required:"Borrower Entity is required"},
        bank_id:{required:"Bank Account is required"},
        bank_name:{required:"Bank Name is required"},
        processing_date:{required:"ACH Processing Date is required"},
        communicated:{required:"Communicated to is required"},
        admin_name:{required:"Admin Name is required"},
        manual_reason:{required:"Reason For Manual Transaction is required"},
        amt_interst:{required:"Amount is required"},
        

    },
    errorPlacement: function(error, element) {
        if (element.is('select')){
            error.insertAfter(element.parent());
        } else if((element.attr("name") == 'processing_date')){
            error.insertAfter(element.parent());
        } else{
            error.insertAfter(element);
        }
    }
});

$(document).on('click','#save_transation',function(e){
    e.preventDefault(e);
    var transaction_form_valid = $("#add-manual-transaction").valid();
    var amttype_check = 0;
    var description_check =0;
    if($('input[name="amount_type_other"]:checked').length == 0){
        var loc = [];
        $('input[name="amount_type[]"]:checked').each(function(){
            loc.push($(this).val());
        });
        if(loc.length == 0){
            $("#amt_type_error").show();
            $("#amt_type_error").html('Amount Type is required');
            amttype_check =1;
        } else {
            $("#amt_type_error").html('');
            $("#amt_type_error").hide();
            amttype_check = 0;
        }
    } else {
        if($("#description").val() == ''){
            $("#description_error").show();
            $("#description_error").html('Description is required');
            description_check =1;
        } else {
            $("#description_error").hide();
            $("#description_error").html('');
            description_check =0;
        }
    }


    if(transaction_form_valid == true && amttype_check ==0){ 
        var form = $('#add-manual-transaction')[0];
        var data = new FormData(form);
        $.ajax({
            url:base_url + "backend/ach_manual/addmanualtransaction",
            enctype: 'multipart/form-data',
            processData: false,  // Important!
            contentType: false,
            cache: false,
            data: data,       
            type:'POST',
            success:function(result){
                var response = $.parseJSON(result);  
                if(response.status = true){
                    window.location.href = base_url+'backend/ach_manual';
                }
            }
        });
    }
});

function get_bank_name(bank_id = null){
    var post_data = {bank_id:bank_id};
    post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type : "POST",
        url  : base_url + 'backend/ach_manual/get_bank_name',
        data :post_data,
        dataType:'json',
        success : function(response){
            $('#bank_name').val(response.bank_name);
            $('#bank_id_hid').val(response.bank_acc_no);
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