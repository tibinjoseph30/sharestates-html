var base_url = $("#base-url-1").val();
$(document).ready(function(){

    var user_id = $('#user_id').val();
    //funding source data table list
    var myDataTable =  $('#funding-source-table').DataTable({
        "dom": '<<t>p>',
        "aLengthMenu":false,
        "paging":   true,
        "bLengthChange": true,
        "pageLength": 10,
        'bAutoWidth': false ,
        "drawCallback": function( settings ) {
            var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate'); 
            pagination.toggle(this.api().page.info().pages > 1);
        },
        "oLanguage": {
           //"sProcessing": "Loading products...",
            //"sLengthMenu": "_MENU_"
         },
        bInfo: false,
        responsive: {
            details: {
                type: 'column'
            }
        },

        order: [0, 'desc' ],
        "processing": true,
        "serverSide": true,
        //"ajax": window.location.href,
        "ajax": {
            "url": base_url+'backend/investor_broker/ajax_funding_source_list?user_id='+user_id,
            "type": "GET",
            "data": function(d){
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { data: "id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "account_type","orderable": false},
                        { "data": "name"},
                        { "data": "routing_number"},    
                        { "data": "account_name"},  
                        { "data": "account_number","orderable": false},                    
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){

                                return '<a href="'+base_url+'backend/investor_broker/funding_source/'+user_id+'/'+data.id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="fund-delete danger-outline"  title="Delete"  data-id="'+data.id+'" data-name="'+data.account_name+'"> <i class="fa fa-trash-o text-danger"></i> </a>';
                           
                        }}                        
                    ],
    });
    

    oTable = $('#funding-source-table').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
    });

    $('.add_funding_source').click(function(){
        $('.funds_list').addClass('hide');
        $('.funding_source_form').removeClass('hide');
    });

    $("#bank_acc_no").change(function(){
        var va = $(this).val();
        $("#bank_acc_no_hid").val(va);
    });

    $("#bank_acc_no").focusin(function(){
        $("#con_bank_acc_no").val('');
        $(this).val('');
    });

    $("#con_bank_acc_no").focusin(function(){
        $(this).val('');
    });

    $("#bank_acc_no").blur(function(){

        var val1 = $("#bank_acc_no_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = last.replace(/./gi, "*"); 
        $(this).val(hidden+last2);
    });

    $("#con_bank_acc_no").change(function(){
        var va = $(this).val();
        $("#con_bank_acc_no_hid").val(va);
    });

    $("#con_bank_acc_no").blur(function(){
        var val1 = $("#con_bank_acc_no").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = last.replace(/./gi, "*"); 
        $(this).val(hidden+last2); 
    });

    //validation
    $(".funding-source-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            'bank[account_type]':{required:true},
            'bank[name]':{required:true},
            'bank[routing_number]':{required:true,validate_Routing_Number:true},
            'bank[account_name]':{required:true},
            'account_number':{required:true},
            'cnf_account_number':{required:true,
                confirm_account_number : true}
        },
        messages: {
            'bank[account_type]':{required:'Account Type is required'},
            'bank[name]':{required:'Bank Name is required'},
            'bank[routing_number]':{required:'Routing Number is required',validate_Routing_Number:'Please enter a valid Routing Number'},
            'bank[account_name]':{required:'Account Name is required'},
            'account_number':{required:'Account Number is required'},
            'cnf_account_number':{required:'Confirm Account Number is required',
                confirm_account_number : 'Please enter the same value again'}
        },
        errorPlacement: function(error, element) {
            if(element.is('select')){
                error.insertAfter(element.parent());
            }else{
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod("validate_Routing_Number",function(value,element) {
      var value = value.replace('_');
      if(value.length != 9){
        return false;
      }
      return true;
    });

    $.validator.addMethod("confirm_account_number",function(value,element) {
      if( $('#bank_acc_no_hid').val() != $('#con_bank_acc_no_hid').val() ){
        return false;
      }
      return true;
    });

        // save investor broker
    $(document).on('click','#save_funding_source',function(e){
        e.preventDefault(e);

        var user_id = $('#user_id').val();
        
        var funding_source_form_valid = $(".funding-source-form").valid();

        if(funding_source_form_valid == true){ 

            $(this).prop('disabled',true);
            
            var form = $('.funding-source-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/investor_broker/add_funding_source",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                dataType:'json',
                success:function(response){
                    if(response.status = true){
                          window.location.href = base_url+'backend/investor_broker/funding_source/'+user_id;
                    }else{
                        $(this).prop('disabled',false);
                    }
                }
            });
        }
    });

    // Delete
    $("#funds-delete-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            deleting_reason:{required:true},
        },
        messages: {
            deleting_reason:{required:"Reason For Deleting is required"},

        },
        errorPlacement: function(error, element) {
               error.insertAfter(element); 
        }
    });

    $(document).on('click','.fund-delete',function(){
        $("#funds-delete-form")[0].reset();
        var form_valid = $("#funds-delete-form").validate();
        form_valid.resetForm();
        var bank_id = $(this).attr('data-id');
        $(".delete-funds-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
        $(".delete-funds-modal").modal('show');
        $(".delete-funds-modal").find('#bank_id').val(bank_id);
    });

    $(document).on('click','#delete-fund-source',function(){
        var delete_form_valid = $("#funds-delete-form").valid();
        if(delete_form_valid == true){
            $.post(base_url+'backend/investor_broker/delete',$("#funds-delete-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".delete-funds-modal").modal('hide');
                    $('#funding-source-table').DataTable().ajax.reload();
                    swal("Updated!", "Funding Source Deleted Successfully", "success");
                }else{
                     swal("Cancelled", "Funding source could not be deleted ", "error");
                }
            });
        }else{

        }
    });

    $('#bank_routing_num').on('keyup blur',function(){
        val = $('#bank_routing_num').val();
        //alert(val);
        $('#bank_routing_num-error').html('');
        if(val.trim().length == 9){
            $.ajax({
                url:base_url +'backend/investor_broker/check_routing_number/'+val.trim(),
                dataType:'json',
                success:function(resp){
                if(resp.code==200){ 
                    $('#bank_name').val(resp.customer_name);
                    $('#bank_name-error').attr("style","display: none");
                } else {
                    if(resp.message == 'not found')
                        $('#bank_routing_num-error').html('Bank '+resp.message).css('color','red').show(); 
                        $('#bank_name').val('');
                    }
                }
            });
        }
    });

});

////////////////// Return only number.block characters ///////////////////
function validateFloatKeyPress(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
   
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    
    
    return true;
}
////////////////// Return only number.block characters ///////////////////