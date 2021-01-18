var base_url = $("#base-url-1").val();
$(document).ready(function(){
    var user_id = $('#user_id').val();
	//investor broker data table list
	var myDataTable =  $('#investor-yield-spread-report').DataTable({
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
            "url": base_url+'backend/investor_broker/ajax_investor_yield_spread_report/'+user_id,
            "type": "GET",
            "data": function(d){
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { data: "broker_id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "investor_name"},
                        { "data": "user_email"},
                        { "data": "commission"},    
                        { "data": "origination_fee"}, 
                        { "data": "admin_name"}, 
                        { "data": "created_on"},                    
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){
                               actions = '<a href="javascript:void(0)" title="Edit" class="yield-spread-edit" data-id="'+data.id+'"> <i class="fa fa-pencil"></i> </a> ';
                                actions += '<a href="javascript:void(0)" class="yield-spread-delete danger-outline" title="Delete" data-id="'+data.id+'"> <i class="fa fa-trash-o text-danger"></i> </a> ';
                                actions += '<a href="'+base_url+'backend/investor_broker/investor_projects/'+data.investor_id+'" title="Investor Projects" class="icon-Investor"> <img src="'+base_url+'images/icons/projects.png"> </a> ';
                                return  actions;                               
                          
                        }}                        
                    ],
    });
    

    oTable = $('#investor-yield-spread-report').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
    });
    
    $("#inv_name").autocomplete({
        source : function(request,response){
            $.getJSON(base_url + 'backend/investor_broker/investors', { word : request.term},function(investors){
                response($.map(investors, function (investor, key) {
                    return {
                        value: investor.name + '(' + investor.email + ')',
                        id: investor.user_id
                    };
                }));
        })},
        minLength:1,
        appendTo: ".searchlister",
        select : function(event,ui){
            event.preventDefault();
            $("#inv_name").val(ui.item.value);
            $("#inv_id").val(ui.item.id);
            $("#save_investor_yield_spread").prop('disabled',false);
        },
        change : function(event,ui){
        }   
    });

    $(".investor-yield-spread-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            'broker[investor_id]':{required:true},
            'investor_name':{required:true},
            'broker[commission]':{required:true,valid_fee:true},
            'broker[origination_fee]':{required:true,valid_fee:true}
        },
        messages: {
            'broker[investor_id]':{required:'Investor Name is required'},
            'investor_name':{required:'Investor Name is required'},
            'broker[commission]':{required:'Investor Yield Spread is required',
                valid_fee:'Investor Yield Spread must not exceed 10.00'},
            'broker[origination_fee]':{required:'Project Origination Fee is required',
                valid_fee:'Project Origination Fee must not exceed 10.00'}
        },
        errorPlacement: function(error, element) {
                error.insertAfter(element);
        }
    });

    $.validator.addMethod("valid_fee", function(value, element) {
        value = parseFloat(value.replace(/[^0-9-.]/g, ''));
        if(value > 10 )
            return false;
        else
            return true;
    });

    $(document).on('click','#save_investor_yield_spread',function(e){
        e.preventDefault(e);

        var inv_broker_form_valid = $(".investor-yield-spread-form").valid();

        if(inv_broker_form_valid == true){ 

            $(this).prop('disabled',true);
            
            var form = $('.investor-yield-spread-form')[0];
            var data = new FormData(form);
            $(this).prop('disabled',false);
            $.ajax({
                url:base_url + "backend/investor_broker/save_commission",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                dataType:'json',
                success:function(response){
                    if(response.status == true){
                        window.location.reload();
                    }
                }
            });
        }
    });

    // Delete
    $("#inv-yield-spread-delete-form").validate({
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

    $(document).on('click','.yield-spread-delete',function(){
        $("#inv-yield-spread-delete-form")[0].reset();
        var form_valid = $("#inv-yield-spread-delete-form").validate();
        form_valid.resetForm();
        var id = $(this).attr('data-id');
        //$(".delete-inv-yield-spread-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
        $(".delete-inv-yield-spread-modal").modal('show');
        $(".delete-inv-yield-spread-modal").find('#id').val(id);
    });

    $(document).on('click','#delete-inv-yield-spread',function(){
        var delete_form_valid = $("#inv-yield-spread-delete-form").valid();
        if(delete_form_valid == true){
            $.post(base_url+'backend/investor_broker/delete_commission',$("#inv-yield-spread-delete-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".delete-inv-yield-spread-modal").modal('hide');
                    $('#investor-yield-spread-report').DataTable().ajax.reload();
                    swal("Updated!", "Commission Record Deleted Successfully", "success");
                }else{
                     swal("Cancelled", "Commission record could not be deleted ", "error");
                }
            });
        }else{

        }
    });


    //Edit
    $('body').on('click', '.yield-spread-edit', function(){
        var id    = $(this).data('id');
        var post_data = {id:id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
            
        $.ajax({
          type: 'POST',
          data: post_data,
          url:  base_url + 'backend/investor_broker/view_fee_details',
          dataType: "json",
          
          success: function (response) {
           $(".edit-popup").html(response.disvalue);
           $(".edit-inv-yield-spread-modal").modal('show');
          }
        });
         
    });

    $('body').on('changeDate', '#new_commission_from', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#new_commission_to').datepicker('setStartDate', minDate);
    });

    $('body').on('changeDate', '#new_commission_to', function (selected) {
        var maxdate = new Date(selected.date.valueOf());
        $('#new_commission_from').datepicker('setEndDate', maxdate);
    });

    $('body').on('changeDate', '#new_origination_from', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#new_origination_to').datepicker('setStartDate', minDate);
    });

    $('body').on('changeDate', '#new_origination_to', function (selected) {
        var maxdate = new Date(selected.date.valueOf());
        $('#new_origination_from').datepicker('setEndDate', maxdate);
    });

    $('body').on('click', '.y_spread_add', function(){
        $('.y_spread').removeClass('hide');
    });

    $('body').on('click', '.origin_fee_add', function(){
        $('.origin_fee').removeClass('hide');
    });

    // investor yield spread edit
    // $("#yield-spread-form").validate({
    //     onkeyup: false,
    //     ignore : false,
    //     rules: {
    //         'commission':{required:true},
    //         'new_commission':{required:true},
    //         'new_commission_from':{required:true},
    //         'new_commission_to':{required:true},
    //     },
    //     messages: {
    //         new_commission:{required:"This field is required"},
    //     },
    //     errorPlacement: function(error, element) {
    //            error.insertAfter(element); 
    //     }
    // });

    $(document).on('click','.yield-spread-submit',function(){
        //var edit_form_valid = $("#yield-spread-form").valid();
        var edit_form_valid = true;
        if(edit_form_valid == true){
            $.post(base_url+'backend/investor_broker/update_commission',$("#yield-spread-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".edit-inv-yield-spread-modal").modal('hide');
                    $('#investor-yield-spread-report').DataTable().ajax.reload();
                    swal("Updated!", "Investor Yield Spread Updated Successfully", "success");
                }else{
                     swal("Cancelled", "Investor Yield Spread could not be updated ", "error");
                }
            });
        }else{

        }
    });

    // origination fee edit
    // $("#commission-fee-form").validate({
    //     onkeyup: false,
    //     ignore : false,
    //     rules: {
    //         deleting_reason:{required:true},
    //     },
    //     messages: {
    //         deleting_reason:{required:"Reason For Deleting is required"},

    //     },
    //     errorPlacement: function(error, element) {
    //            error.insertAfter(element); 
    //     }
    // });

    $(document).on('click','.commission-fee-submit',function(){
        //var edit_form_valid = $("#commission-fee-form").valid();
        var edit_form_valid = true;
        if(edit_form_valid == true){
            $.post(base_url+'backend/investor_broker/update_origination',$("#commission-fee-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".edit-inv-yield-spread-modal").modal('hide');
                    $('#investor-yield-spread-report').DataTable().ajax.reload();
                    swal("Updated!", "Origination Fee Updated Successfully", "success");
                }else{
                     swal("Cancelled", "Origination Fee could not be updated ", "error");
                }
            });
        }else{

        }
    });
    
});
