var base_url = $("#base-url-1").val();
$(document).ready(function(){

	//appraiser data table list
	var myDataTable =  $('#hazard-table-list').DataTable({
        "dom": '<<t>p>',
        "aLengthMenu":false,
        "paging":   true,
        "bLengthChange": true,
        "pageLength": 10,
        'bAutoWidth': false ,
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
            "url": base_url+'backend/manage_insurance/ajax_hazard_list',
            "type": "GET",
            "data": function(d){

                //var dept_status = $(".dept-status").find("option:selected").val();
                i=1;
                //d['dept_status'] = dept_status;
                //alert(sort_status);
            }
        },
        "targets": [ 0 ],
        "columns": [    
            { data: "insurance_id","orderable": false,  "visible": false},
            { "data": "count","orderable": false},
            { "data": "insurance_business_name"},
            { "data": "insurance_first_name"},
            { "data": "insurance_phone","orderable": false},
            { "data": "insurance_email"},
            { data: null,"orderable": true,render:function(data){
                //return data.active_loans;
                if(data.active_loans!='0')
                    return '';
                else
                    return '0';

            }},
            { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){

                if(data.insurance_status == 'A'){
                    var active_icons = 'fa fa-power-off color-green';
                    active_class = 'br-green mr-1 app-deactivate';
                    var title = 'Deactivate';
                }else{
                    if(data.insurance_status == 'D'){
                        if(data.deactivate_reason){
                            var title = data.deactivate_reason;
                        } else {
                            var title = 'Reactivate';
                        }
                        var active_icons = 'fa fa-ban text-danger';
                        active_class = 'br-red mr-1 app-activate';
                    } else {
                        var title = 'Activate';
                        var active_icons = 'fa fa-ban color-yellow';
                        active_class = 'br-yellow mr-1 app-activate';
                    }
                }

                if(data.blocked_status == 'N'){
                    var block_icon = 'userUnblock';
                    var block_title = 'Block';
                    var block_class = 'br-green mr-1 block-user';
                }else{
                    var block_icon = 'userBlock';
                    var block_class = 'br-red unblock-user';
                    if(data.blocked_reason){
                        var block_title = data.blocked_reason;
                    } else {
                        var block_title = 'Unblock';
                    }
                }
                if(data.IsDeleted == 'Y'){
                    return '<a href="'+base_url+'backend/manage_insurance/edit_hazard/'+data.insurance_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a>';
                }
                else{
                    return '<a href="'+base_url+'backend/manage_insurance/edit_hazard/'+data.insurance_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="app-delete danger-outline"  title="Delete"  data-id="'+data.insurance_id+'" data-name="'+data.insurance_first_name+'"> <i class="fa fa-trash-o text-danger"></i> </a> <a href="javascript:void(0)" class="'+active_class+'"  title="'+title+'" data-type="'+data.insurance_status+'" data-id="'+data.insurance_id+'" data-name="'+data.insurance_first_name+'"> <i class="'+active_icons+'"></i> </a><a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.insurance_id+'" data-name="'+data.insurance_first_name+'"> <i class="'+block_icon+'"></i> </a>';
                }
            }}
        ],
    });
    
    //----------------------filter options --------------------
    oTable = $('#hazard-table-list').dataTable();

    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
    });
    
    /*$('#download-excel').on('click',function(){
        var search  = '';
        var location = '';
        var status = '';
        var property = '';


        search_val = $('#search-input').val();
        if(search_val.length)
        {
            search = encodeURIComponent(search_val);
        }

        location_val = $('#location-id').val();
        if(location_val.length)
        {
            location = encodeURIComponent(location_val);
        }

        status_val = $('#status').val();
        if(status_val.length)
        {
            status = encodeURIComponent(status_val);
        }

        property_val = $('#property-id').val();
        if(property_val.length)
        {
            property = encodeURIComponent(property_val);
        }


        search_type = $('#property-id').val();    
        
        window.location.href = base_url + "backend/appraiser/export?search="+search+"&search_type="+search_type+"&location="+location+"&status="+status+"&property_type="+property;
    });*/

    //------------actions buttons ---------------------------
    
    // Active - Inactive
    $("#insurance-inactive-form").validate({
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
        $("#insurance-inactive-form")[0].reset();
        var form_valid = $("#insurance-inactive-form").validate();
            form_valid.resetForm();
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#insurance_id').val(appr_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#insurance-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/manage_insurance/change_status',$("#insurance-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#hazard-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Insurance status updated successfully.", "success");
                }else {
                    swal("Cancelled", "Insurance status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.app-activate',function(){
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'insurance_id':appr_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/manage_insurance/change_status',"Do you really want to change status of this insurance?","Insurance status updated successfully.","Insurance status is could not be updated",'hazard-table-list');
    });

    // Block - Unblock
    $("#insurance-block-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            blocked_reason:{required:true},
        },
        messages: {
            blocked_reason:{required:"Reason For Blocking is required"},

        },
        errorPlacement: function(error, element) {
                if(element.attr("name") == 'lenders_state'){
                    error.insertAfter(element.parent("div").parent("div"));
                }else{
                    error.insertAfter(element); 
                }
                
        }
    });

    $(document).on('click','.block-user',function(){
        $("#insurance-block-form")[0].reset();
        var form_valid = $("#insurance-block-form").validate();
            form_valid.resetForm();
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#insurance_id').val(appr_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#insurance-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/manage_insurance/change_block_status',$("#insurance-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    $('#hazard-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Insurance  Blocked Successfully", "success");
                }else{
                     swal("Cancelled", "Insurance  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.unblock-user',function(){
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'insurance_id':appr_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/manage_insurance/change_block_status',"Do you really want to unblock this insurance?","Insurance Unblocked Successfully.","Insurance could not be unblocked",'hazard-table-list');
    
    });

    // Delete
    $("#insurance-delete-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            deleting_reason:{required:true},
        },
        messages: {
            deleting_reason:{required:"Reason For Deleting is required"},

        },
        errorPlacement: function(error, element) {
                if(element.attr("name") == 'lenders_state'){
                    error.insertAfter(element.parent("div").parent("div"));
                }else{
                    error.insertAfter(element); 
                }
                
        }
    });

    $(document).on('click','.app-delete',function(){
        $("#insurance-delete-form")[0].reset();
        var form_valid = $("#insurance-delete-form").validate();
        form_valid.resetForm();
        var insurance_id = $(this).attr('data-id');
        $(".delete-user-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
        $(".delete-user-modal").modal('show');
        $(".delete-user-modal").find('#insurance_id').val(insurance_id);
    });

    $(document).on('click','#delete-user-subt',function(){
        var delete_form_valid = $("#insurance-delete-form").valid();
        if(delete_form_valid == true){
            $.post(base_url+'backend/manage_insurance/delete',$("#insurance-delete-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".delete-user-modal").modal('hide');
                    $('#hazard-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Insurance  Deleted Successfully", "success");
                }else{
                     swal("Cancelled", "Insurance  could not be deleted ", "error");
                }
            });
        }else{

        }
    });

});
