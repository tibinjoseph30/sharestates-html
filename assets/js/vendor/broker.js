var base_url = $("#base-url-1").val();
$(document).ready(function(){
	//appraiser data table list
	var myDataTable =  $('#broker-table-list').DataTable({
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
            "url": base_url+'backend/broker/ajax_broker_list',
            "type": "GET",
            "data": function(d){

                var loc_id = $(".loctaion-search").find("option:selected").val();
                var status = $(".status-search").find("option:selected").val();
                
                //var role_status = $(".role-status").find("option:selected").val();
                //var dept_status = $(".dept-status").find("option:selected").val();
                i=1;
                d['location'] = loc_id;
                d['status'] = status;
                //d['dept_status'] = dept_status;
                //alert(sort_status);
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { data: "broker_id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "broker_business_name"},
                        { "data": "broker_first_name"},
                        { "data": "broker_phone","orderable": false},
                        { "data": "broker_email"},
                        { data: null,"orderable": true,render:function(data){
                            //return data.active_loans;
                            
                            if(data.active_loans!='0')
                                return '<a class="view-vendor-loans" target="_blank" href="'+ base_url +'backend/broker/view_vendor_loans/'+data.broker_id+'" >'+ data.active_loans +'</a>';
                            else
                                return '0';

                        }},
                        {   
                            data: null,"orderable": false,render:function(data){
                            if(data.IsDeleted == 'Y'){
                                var disabled ="disabled";
                                return '<button type="button" class="btn btn-outline-primary" '+disabled+'>Add <i class="ti-user"></i> </button>'
                            }else
                            return '<a href="'+base_url+'backend/broker/sub_broker_add/'+data.broker_id+'" title="Edit"> <button type="button" class="btn btn-outline-primary">Add <i class="ti-user"></i> </button></a>'
                            
                        }},
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){
                            if(data.broker_status == 'A'){
                                var active_icons = 'fa fa-power-off color-green';
                                active_class = 'br-green mr-1 broker-deactivate';
                                var title = 'Deactivate';

                            }else{
                                if(data.broker_status == 'D'){
                                    if(data.deactivate_reason){
                                        var title = data.deactivate_reason;
                                    } else {
                                        var title = 'Reactivate';
                                    }
                                    var active_icons = 'fa fa-ban text-danger';
                                    active_class = 'br-red mr-1 broker-activate';
                                } else {
                                    var title = 'Activate';
                                    var active_icons = 'fa fa-ban color-yellow';
                                    active_class = 'br-yellow mr-1 broker-activate';
                                }
                            }

                            if(data.blocked_status == 'N'){
                                var block_icon = 'userUnblock';
                                var block_title = 'Block';
                                var block_class = 'br-green block-user';
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
                                return '<a href="'+base_url+'backend/broker/edit_broker/'+data.broker_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a>';
                            }else if(data.active_loans > 0  || data.sub_user_count != 0 ){
                                return '<a href="'+base_url+'backend/broker/edit_broker/'+data.broker_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a>  <a href="javascript:void(0)" class="'+active_class+'"  title="'+title+'" data-type="'+data.broker_status+'" data-id="'+data.broker_id+'" data-name="'+data.broker_first_name+'"> <i class="'+active_icons+'"></i> </a><a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.broker_id+'" data-name="'+data.broker_first_name+'"> <i class="'+block_icon+'"></i> </a>';
                            } else {
                                return '<a href="'+base_url+'backend/broker/edit_broker/'+data.broker_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a> <a href="javascript:void(0)" class="broker-delete danger-outline"  title="Delete"  data-id="'+data.broker_id+'"  data-name="'+data.broker_first_name+'"> <i class="fa fa-trash-o text-danger"></i> </a> <a href="javascript:void(0)" class="'+active_class+'"  title="'+title+'" data-type="'+data.broker_status+'" data-id="'+data.broker_id+'" data-name="'+data.broker_first_name+'"> <i class="'+active_icons+'"></i> </a><a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.broker_id+'" data-name="'+data.broker_first_name+'"> <i class="'+block_icon+'"></i> </a>';
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

    // $('#broker-table-list').on( 'draw.dt', function () {
    //     $('.broker-activate').tooltip();
    //     $('.unblock-user').tooltip();
    // } );

    $('#broker-table-list tbody').on('click', 'td.details-control', function () {
        $(this).toggleClass("down");
        var tr = $(this).closest('tr');
        var row = myDataTable.row( tr );
        var data = $('#broker-table-list').dataTable().fnGetData(row);
        var broker_id = data.broker_id;
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            append_ajax(broker_id, row, tr);
            // row.child( append_ajax(broker_id, row, tr) ).show();
            // tr.addClass('shown');
        }
    } );

    function append_ajax (broker_id, row, tr) {
        var post_data = {broker_id : broker_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/broker/get_subbrokers',
            data: post_data,
            dataType: "json",
            success: function (response) {
                if($.trim(response.subbrokers).length){
                    row.child( response.subbrokers ).show();
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
                    if(response.count_sub_brokers <= 10){
                        row.child().find('table').parent().find('.dataTables_paginate').hide();
                    }
                    row.child().find('table').parent().find('.dataTables_filter').hide();
                }
            }
        });
    }

    
    //----------------------filter options --------------------

    $(document).on('change','#location-id',function(){
       $(".preloader").show();
       $('#broker-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    $(document).on('change','#status',function(){
       var type = $(this).val(); 
       if(type == 'A')
        $('#header').html('List of Brokers - Active');
       else if(type == 'I')
        $('#header').html('List of Brokers - Inactive');
       else if(type == 'D')
        $('#header').html('List of Brokers - Deactive');
       else if(type == 'Y')
        $('#header').html('List of Brokers - Blocked');
       else if(type == 'DE')
        $('#header').html('List of Brokers - Deleted');
       else
        $('#header').html('List of Brokers');

       $(".preloader").show();
       $('#broker-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    oTable = $('#broker-table-list').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#status').val('').trigger('change');
        $('#location-id').val('').trigger('change');
        $('#header').html('List of Brokers');
    });

    $(document).on('click','#active',function(){
        $('#status').val('A').trigger('change');
        $('#header').html('List of Brokers - Active');
    });

    $(document).on('click','#inactive',function(){
        $('#status').val('D').trigger('change');
        $('#header').html('List of Brokers - Deactive');
    });

    $(document).on('click','#blocked',function(){
        $('#status').val('Y').trigger('change');
        $('#header').html('List of Brokers - Blocked');
    });

    $(document).on('click','#expired',function(){
        $('#status').val('E').show();
        $('#status').val('E').trigger('change'); 
        $('#header').html('List of Brokers - Licence Expired');
    });

    
    $('.total-count-apparaiser').on('click',function(){
        if($('#status').length)
            $('#status').val('').trigger('change');
    });
    

    //------------actions buttons ---------------------------
    // $(document).on('click','.broker-delete',function(){
    //     var broker_id = $(this).attr('data-id');
    //     delete_table_row(broker_id,base_url+'backend/broker/delete',"Do you really want to delete this Broker?","broker details deleted successfully","Broker is could not be deleted",'broker-table-list');
    
    // });

    


    
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


        window.location.href = base_url + "backend/broker/export?search=" + search+"&location="+location+"&status="+status;
    });

    // Active - Inactive
    $("#broker-inactive-form").validate({
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

    $(document).on('click','.broker-deactivate',function(){
        $("#broker-inactive-form")[0].reset();
        var form_valid = $("#broker-inactive-form").validate();
            form_valid.resetForm();
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#broker_id').val(broker_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#broker-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/broker/change_status',$("#broker-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#broker-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Broker status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Broker status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.broker-activate',function(){
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'broker_id':broker_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/broker/change_status',"Do you really want to change status of this broker?","Broker status updated successfully.","Broker status is could not be updated",'broker-table-list');
    });


    $("#broker-block-form").validate({
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
        $("#broker-block-form")[0].reset();
        var form_valid = $("#broker-block-form").validate();
            form_valid.resetForm();
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#broker_id').val(broker_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#broker-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/broker/change_block_status',$("#broker-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    $('#broker-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Broker  Blocked Successfully", "success");
                    $('#blocked').find('span').html(response.blocked_count);
                }else{
                     swal("Cancelled", "Broker  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.unblock-user',function(){
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'broker_id':broker_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/broker/change_block_status',"Do you really want to unblock this broker?","Broker  Unblocked Successfully.","Broker could not be unblocked",'broker-table-list');
    });


    $("#broker-delete-form").validate({
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

    $(document).on('click','.broker-delete',function(){
        $("#broker-delete-form")[0].reset();
        var form_valid = $("#broker-delete-form").validate();
        form_valid.resetForm();
        var broker_id = $(this).attr('data-id');
        $(".delete-user-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
        $(".delete-user-modal").modal('show');
        $(".delete-user-modal").find('#broker_id').val(broker_id);
    });

    $(document).on('click','#delete-user-subt',function(){
        var delete_form_valid = $("#broker-delete-form").valid();
        if(delete_form_valid == true){
            $.post(base_url+'backend/broker/delete',$("#broker-delete-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".delete-user-modal").modal('hide');
                    $('#broker-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Broker  Deleted Successfully", "success");
                    
                    if((response.total)!= undefined)
                        $('#total').find('h3').html(response.total);
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
                    if((response.blocked_count)!= undefined)
                        $('#blocked').find('span').html(response.blocked_count)
                }else{
                     swal("Cancelled", "Broker  could not be deleted ", "error");
                }
            });
        }else{

        }
    });


});