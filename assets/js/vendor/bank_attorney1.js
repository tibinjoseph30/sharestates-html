var base_url = $("#base-url-1").val();
$(document).ready(function(){
	//appraiser data table list
	var myDataTable =  $('#bank-attorney-table-list').DataTable({
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
            "url": base_url+'backend/bank_attorney/ajax_bank_attorney_list',
            "type": "GET",
            "data": function(d){

                var loc_id = $(".loctaion-search").find("option:selected").val();
                var pr_type = $(".property-search").find("option:selected").val();
                var status = $(".status-search").find("option:selected").val();
                
                //var role_status = $(".role-status").find("option:selected").val();
                //var dept_status = $(".dept-status").find("option:selected").val();
                i=1;
                d['location'] = loc_id;
                d['property_type'] = pr_type;
                d['status'] = status;
                //d['dept_status'] = dept_status;
                //alert(sort_status);
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { 'data': "bank_attorney_id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "attorney_business_name"},
                        { "data": "attorney_first_name"},
                        { "data": "attorney_phone","orderable": false},
                        { "data": "attorney_email"},
                        { "data": null,render:function(data, type){
                            //return data.active_loans;

                            
                                if(data.active_loans!='0')
                                    return '<a class="view-vendor-loans" target="_blank" href="'+ base_url +'backend/bank_attorney/view_vendor_loans/'+data.bank_attorney_id+'" >'+ data.active_loans +'</a>';
                                else
                                    return '0';
                            

                        }},
                        {
                            data: null,"orderable": false,render:function(data){
                            if(data.deleted_status == 'Y'){
                                var disabled ="disabled";
                            }
                            return ' <button type="button" data-href="'+base_url+'backend/bank_attorney/edit_sub_bank_attorney/'+data.bank_attorney_id+'" class="btn btn-outline-primary add-sub-user" '+disabled+'>Add <i class="ti-user"></i> </button>'
                            
                        }},
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){
                            
                            if(data.attorney_status=='1'){
                                var active = 'fa fa-power-off color-green';
                                var title = 'Deactivate';
                                var border = 'br-green bank-attorney-deactivate';
                            }else{
                                if(data.attorney_status == '3'){
                                    if(data.deactivate_reason){
                                        var title = data.deactivate_reason;
                                    } else {
                                        var title = 'Reactivate';
                                    }
                                    var active = 'fa fa-ban text-danger';
                                    var border = 'br-red bank-attorney-activate';
                                } else {
                                    var title = 'Activate';
                                    var active = 'fa fa-ban color-yellow';
                                    var border = 'br-yellow mr-1 bank-attorney-activate';
                                }
                                
                            }

                            if(data.blocked_status == 'N'){
                                var block_icon = 'userUnblock';
                                var block_title = 'Block';
                                var block_class = 'br-green block-user';
                            }else{
                                var block_icon = 'userBlock';
                                var block_class = 'br-red unblock-user';
                                // var block_title = 'Unblock';
                                if(data.blocked_reason){
                                    var block_title = data.blocked_reason;
                                } else {
                                    var block_title = 'Unblock';
                                }
                            }
                            if(data.deleted_status == 'Y'){
                                return '<a href="'+base_url+'backend/bank_attorney/edit_bank_attorney/'+data.bank_attorney_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a> ';
                            }else
                            if(data.active_loans > 0 || data.sub_user_count != 0 ){
                                return '<a href="'+base_url+'backend/bank_attorney/edit_bank_attorney/'+data.bank_attorney_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a> <a href="javascript:void(0)" class=" '+border+'"  title="'+title+'" data-type="'+data.attorney_status+'" data-id="'+data.bank_attorney_id+'" data-name="'+data.attorney_first_name+'"> <i class="'+active+'"></i> </a> <a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.bank_attorney_id+'" data-name="'+data.attorney_first_name+'"> <i class="'+block_icon+'"></i> </a>'+
                            ' <a href="javascript:void(0)" class="br-green view_bank_attorney"  title="View Profile" data-id="'+data.bank_attorney_id+'" > <i class="fa fa-eye color-green"></i> </a>';
                            } else {
                                return '<a href="'+base_url+'backend/bank_attorney/edit_bank_attorney/'+data.bank_attorney_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a> <a href="javascript:void(0)" class="bank-attorney-delete danger-outline"  title="Delete"  data-id="'+data.bank_attorney_id+'" data-name="'+data.attorney_first_name+'"> <i class="fa fa-trash-o text-danger"></i> </a> <a href="javascript:void(0)" class="'+border+'"  title="'+title+'" data-type="'+data.attorney_status+'" data-id="'+data.bank_attorney_id+'" data-name="'+data.attorney_first_name+'"> <i class="'+active+'"></i> </a> <a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.bank_attorney_id+'" data-name="'+data.attorney_first_name+'"> <i class="'+block_icon+'"></i> </a>'+
                            ' <a href="javascript:void(0)" class="br-green view_bank_attorney"  title="View Profile" data-id="'+data.bank_attorney_id+'" > <i class="fa fa-eye color-green"></i> </a>';
                            }
                            
                        }},
                        {
                            "className":      'details-control expand-arrow rotate',
                            "orderable":      false,
                            "data":           null,
                            "defaultContent": ''
                        }
                        /* {
                            data: null,"orderable": false,render:function(data){
                            if(data.admin_status=='I'){
                                return data.deactivated_on;    
                            }else{
                                return null;
                            }
                        }},
                        { data: null,"orderable": false,render:function(data){
                            if(data.admin_status=='A'){
                                return ' <button type="button" class="btn btn-circle btn-success sm change-status" data-type="'+data.admin_status+'"  data-id="'+data.admin_id+'"><i class="ti-check"></i> </button>';
                            }else{
                                return ' <button type="button" class="btn btn-danger btn-circle sm change-status" data-type="'+data.admin_status+'"  data-id="'+data.admin_id+'"><i class="ti-close"></i> </button>';
                                //return '<i class="fa fa-close btn-danger"></i>';
                            }
                        }},
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){
                            //return '<a href="'+base_url+'76rqJ7/admin/edit_admin/'+data.admin_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a> <a href="'+base_url+'76rqJ7/admin/delete/'+data.admin_id+'" onclick="'+delete_msg+'" title="Delete"> <i class="fa fa-close text-danger"></i> </a>';
                            return '<a href="'+base_url+'76rqJ7/admin/edit_admin/'+data.admin_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a> <a href="javascript:void(0)" class="admin-delete danger-outline"  title="Delete" data-id="'+data.admin_id+'"> <i class="fa fa-trash-o text-danger"></i> </a> <a href="'+base_url+'76rqJ7/admin/access_settings/'+data.admin_id+'" title="Edit"> <i class="fa fa-cog text-reverse"></i> </a>';
                        }}*/
                    ],
    });

    // $('#bank-attorney-table-list').on( 'draw.dt', function () {
    //     $('.bank-attorney-activate').tooltip();
    //     $('.unblock-user').tooltip();
    // } );


    $('#bank-attorney-table-list tbody').on('click', 'td.details-control', function () {
        $(this).toggleClass("down");
        var tr = $(this).closest('tr');
        var row = myDataTable.row( tr );
        var data = $('#bank-attorney-table-list').dataTable().fnGetData(row);
        var bank_attorney_id = data.bank_attorney_id;
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            append_ajax(bank_attorney_id, row, tr);
            // row.child( append_ajax(bank_attorney_id, row, tr) ).show();
            // tr.addClass('shown');
        }
    } );

    function append_ajax (bank_attorney_id, row, tr) {
        var post_data = {bank_attorney_id : bank_attorney_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/bank_attorney/get_sub_attornies',
            data: post_data,
            dataType: "json",
            success: function (response) {

                if($.trim(response.sub_attornies).length )
                {
                    row.child( response.sub_attornies ).show();
                    row.child().addClass('ajax-child-table');

                    
                    tr.addClass('shown');

                    var sub_table =row.child().find('table').DataTable({
                        "bInfo" : false,
                        "lengthChange": false,
                        "aoColumnDefs" : [ {
                            'bSortable' : false,
                            'aTargets' : [1,2,4,6,7,8]
                            // 'aTargets' : [ 1,2,5 ]
                        } ,
                        { "targets": [0],"orderable": false,  "visible": false},
                        ]
                    });
                    row.child().find('table').parent().find('.dataTables_paginate').hide();
                    row.child().find('table').parent().find('.dataTables_filter').hide();
                }
                
            }
        });
        // return html;
        // `d` is the original data object for the row
        // return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        //     '<tr>'+
        //         '<td>Full name:</td>'+
        //         '<td>1213313</td>'+
        //     '</tr>'+
        //     '<tr>'+
        //         '<td>Extension number:</td>'+
        //         '<td>testtttttttt</td>'+
        //     '</tr>'+
        //     '<tr>'+
        //         '<td>Extra info:</td>'+
        //         '<td>And any further details here (images etc)...</td>'+
        //     '</tr>'+
        // '</table>';
    }

    
    //----------------------filter options --------------------

    $(document).on('change','#location-id',function(){
       //alert('f');
       $(".preloader").show();
       $('#bank-attorney-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    $(document).on('change','#status',function(){
       $(".preloader").show();
       $('#bank-attorney-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    $(document).on('click','#active',function(){
        $('#status').val('1').trigger('change');
        $('#header').html('List of Bank Attorneys - Active');
    });

    $(document).on('click','#inactive',function(){
        $('#status').val('3').trigger('change');
        $('#header').html('List of Bank Attorneys - Deactive');
    });

    $(document).on('click','#blocked',function(){
        $('#status').val('Y').trigger('change');
        $('#header').html('List of Bank Attorneys - Blocked');
    });
    $(document).on('click','#expired',function(){
        $('#status').val('E').show();
        $('#status').val('E').trigger('change'); 
        $('#header').html('List of Bank Attorneys - Licence Expired');
    });

    $('.total-count-apparaiser').on('click',function(){
        if($('#status').length)
            $('#status').val('').trigger('change');
    });
    
    
    oTable = $('#bank-attorney-table-list').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#status').val('').trigger('change');
        $('#location-id').val('').trigger('change');
        $('#header').html('List of Bank Attorneys');
    });


    //------------actions buttons ---------------------------
    // $(document).on('click','.bank-attorney-delete',function(){
    //     var bank_attorney_id = $(this).attr('data-id');
    //     delete_table_row(bank_attorney_id,base_url+'backend/bank_attorney/delete',"Do you really want to delete this Bank Attorney?","Bank attorney details deleted successfully","Bank attorney is could not be deleted",'bank-attorney-table-list');
    
    // });

    

    $(document).on('click','.add-sub-user',function(){
        
        href = $(this).attr('data-href');

        window.location.href = href;

    });

    $('#download-excel').on('click',function(){
        var search  = '';
        var location = '';
        var status = '';



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


        window.location.href = base_url + "backend/bank_attorney/export?search=" + search+"&location="+location+"&status="+status;
    });


    // Active - Inactive
    $("#attorney-inactive-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            inactive_reason:{required:true},
        },
        messages: {
            inactive_reason:{required:"Reason For Deactivating is required"},

        },
        errorPlacement: function(error, element) {
                if(element.attr("name") == 'lenders_state'){
                    error.insertAfter(element.parent("div").parent("div"));
                }else{
                    error.insertAfter(element); 
                }
                
        }
    });

    $(document).on('click','.bank-attorney-deactivate',function(){
        $("#attorney-inactive-form")[0].reset();
        var form_valid = $("#attorney-inactive-form").validate();
            form_valid.resetForm();
        var attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#bank_attorney_id').val(attorney_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#attorney-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/bank_attorney/change_status',$("#attorney-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#bank-attorney-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Bank attorney status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Bank attorney status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.bank-attorney-activate',function(){
        var bank_attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'bank_attorney_id':bank_attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/bank_attorney/change_status',"Do you really want to change status of this bank attorney?","Bank attorney status updated successfully.","Bank attorney status is could not be updated",'bank-attorney-table-list');
    });


    $("#attorney-block-form").validate({
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
        $("#attorney-block-form")[0].reset();
        var form_valid = $("#attorney-block-form").validate();
            form_valid.resetForm();
        var attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#attorney_id').val(attorney_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#attorney-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/bank_attorney/change_block_status',$("#attorney-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    $('#bank-attorney-table-list').DataTable().ajax.reload();
                    $('#blocked').find('span').html(response.blocked_count);
                    swal("Updated!", "Bank attorney  Blocked Successfully", "success");
                }else{
                     swal("Cancelled", "Bank attorney  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.unblock-user',function(){
        var attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'attorney_id':attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/bank_attorney/change_block_status',"Do you really want to unblock this bank attorney?","Bank Attorney  Unblocked Successfully.","Bank Attorney could not be unblocked",'bank-attorney-table-list');
    });


    $(document).on("click",".view_bank_attorney",function(){
  
      var attorney_id = $(this).attr('data-id');
      
      var post_data = {bank_attorney_id:attorney_id};
      post_data[global_csrf_token_name]= global_csrf_token_value;
      $.ajax({
          type:'POST',
          data:post_data,
          url: base_url + 'backend/projects_ajax/login_as_bank_attorney/',
          dataType:'json',
          success: function(response){  
            if(response.status1 == 'success'){
                var win = window.open(base_url + "attorney/project_pipeline/pipeline", '_blank');
                if (win) {
                    //Browser has allowed it to be opened
                    win.focus();
                } else {
                    //Browser has blocked it
                    swal('','Please allow popups for this website');
                }
            }
          }
      });
        
    });


    $("#attorney-delete-form").validate({
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

    $(document).on('click','.bank-attorney-delete',function(){
        $("#attorney-delete-form")[0].reset();
        var form_valid = $("#attorney-delete-form").validate();
        form_valid.resetForm();
        var attorney_id = $(this).attr('data-id');
        $(".delete-user-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
        $(".delete-user-modal").modal('show');
        $(".delete-user-modal").find('#attorney_id').val(attorney_id);
    });

    $(document).on('click','#delete-user-subt',function(){
        var delete_form_valid = $("#attorney-delete-form").valid();
        if(delete_form_valid == true){
            $.post(base_url+'backend/bank_attorney/delete',$("#attorney-delete-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".delete-user-modal").modal('hide');
                    $('#bank-attorney-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Bank attorney  Deleted Successfully", "success");
                    
                    if((response.total)!= undefined)
                        $('#total').find('h3').html(response.total);
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
                    if((response.blocked_count)!= undefined)
                        $('#blocked').find('span').html(response.blocked_count)
                }else{
                     swal("Cancelled", "Bank attorney  could not be deleted ", "error");
                }
            });
        }else{

        }
    });




});