var base_url = $("#base-url-1").val();
$(document).ready(function(){



    var url_vendor_status   = base_url + 'backend/appraiser/vendor_status';

	//appraiser data table list
	var myDataTable =  $('#appraiser-table-list').DataTable({
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
            "url": base_url+'backend/appraiser/ajax_appraiser_list',
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
                        { data: "project_appraiser_id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "name"},
                        { "data": "contact_name"},
                        { "data": "mobile","orderable": false},
                        { "data": "email"},
                        { data: null,"orderable": true,render:function(data){
                            //return data.active_loans;
                            if(data.active_loans!='0')
                                return '<a class="view-vendor-loans" target="_blank" href="'+ base_url +'backend/appraiser/view_vendor_loans/'+data.project_appraiser_id+'" >'+ data.active_loans +'</a>';
                            else
                                return '0';

                        }},
                        {
                            data: null,"orderable": false,render:function(data){
                            if(data.deleted_status == 'Y'){
                                var disabled ="disabled";
                                return '<a href="#" title="Add Sub User" > <button type="button" class="btn btn-outline-primary" '+disabled+'>Add<i class="ti-user"></i> </button></a>'
                            }else
                            return '<a href="'+base_url+'backend/appraiser/sub_account_add/'+data.project_appraiser_id+'" title="Add Sub User" > <button type="button" class="btn btn-outline-primary">Add<i class="ti-user"></i> </button></a>'
                            
                        }},
                        // { 
                        //     data: null,"orderable": false,render:function(data){
                        //     return data.turn_around_time;
                        // }},
                        // {
                        //     data: null,"orderable": false,render:function(data){
                        //     return ' <button type="button" class="btn btn-outline-primary">Add<i class="ti-user"></i> </button>'
                            
                        // }},
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){

                            if(data.appraiser_status == 'A'){
                                var active_icons = 'fa fa-power-off color-green';
                                active_class = 'br-green mr-1 app-deactivate';
                                var title = 'Deactivate';
                            }else{
                                if(data.appraiser_status == 'D'){
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
                            if(data.deleted_status == 'Y'){
                                return '<a href="'+base_url+'backend/appraiser/edit_appraiser/'+data.project_appraiser_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a>';
                            }
                            else if(data.active_loans > 0 || data.sub_user_count != 0){
                                return '<a href="'+base_url+'backend/appraiser/edit_appraiser/'+data.project_appraiser_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="'+active_class+'"  title="'+title+'" data-type="'+data.appraiser_status+'" data-id="'+data.project_appraiser_id+'" data-name="'+data.contact_name+'"> <i class="'+active_icons+'"></i> </a><a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.project_appraiser_id+'" data-name="'+data.contact_name+'"> <i class="'+block_icon+'"></i> </a>';
                            }else{
                                return '<a href="'+base_url+'backend/appraiser/edit_appraiser/'+data.project_appraiser_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="app-delete danger-outline"  title="Delete"  data-id="'+data.project_appraiser_id+'" data-name="'+data.contact_name+'"> <i class="fa fa-trash-o text-danger"></i> </a> <a href="javascript:void(0)" class="'+active_class+'"  title="'+title+'" data-type="'+data.appraiser_status+'" data-id="'+data.project_appraiser_id+'" data-name="'+data.contact_name+'"> <i class="'+active_icons+'"></i> </a><a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.project_appraiser_id+'" data-name="'+data.contact_name+'"> <i class="'+block_icon+'"></i> </a>';
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

    // $('#appraiser-table-list').on( 'draw.dt', function () {
    //     $('.app-activate').tooltip();
    //     $('.unblock-user').tooltip();
    // } );


    //--------------Sub account list
    $('#appraiser-table-list tbody').on('click', 'td.details-control', function () {
        $(this).toggleClass("down");
        var tr = $(this).closest('tr');
        var row = myDataTable.row( tr );
        var data = $('#appraiser-table-list').dataTable().fnGetData(row);
        var appraiser_id = data.project_appraiser_id;
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            append_ajax(appraiser_id, row, tr);
            // row.child( append_ajax(broker_id, row, tr) ).show();
            // tr.addClass('shown');
        }
    } );

    
    //----------------------filter options --------------------

    $(document).on('change','#location-id',function(){
       //alert('f');
       $(".preloader").show();
       $('#appraiser-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    $(document).on('change','#property-id',function(){
       //alert('f');
       $(".preloader").show();
       $('#appraiser-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    $(document).on('change','#status',function(){
       var type = $(this).val(); 
       if(type == 'A')
        $('#header').html('List of Appraisers - Active');
       else if(type == 'I')
        $('#header').html('List of Appraisers - Inactive');
       else if(type == 'D')
        $('#header').html('List of Appraisers - Deactive');
       else if(type == 'Y')
        $('#header').html('List of Appraisers - Blocked');
       else if(type == 'DE')
        $('#header').html('List of Appraisers - Deleted');
       else
        $('#header').html('List of Appraisers');

       $(".preloader").show();
       $('#appraiser-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    $(document).on('click','#active',function(){
        $('#status').val('A').trigger('change');
        $('#header').html('List of Appraisers - Active');
    });

    $(document).on('click','#inactive',function(){
        $('#status').val('D').trigger('change');
        $('#header').html('List of Appraisers - Deactive');
    });

    $(document).on('click','#blocked',function(){
        $('#status').val('Y').trigger('change');
        $('#header').html('List of Appraisers - Blocked');
    });

    $(document).on('click','#expired',function(){
        $('#status').val('E').show();
        $('#status').val('E').trigger('change'); 
        $('#header').html('List of Appraisers - Licence Expired');
    });

    
    $('.total-count-apparaiser').on('click',function(){
        if($('#status').length)
            $('#status').val('').trigger('change');
    });
    



    oTable = $('#appraiser-table-list').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#property-id').val('').trigger('change');
        $('#status').val('').trigger('change');
        $('#location-id').val('').trigger('change');
        $('#header').html('List of Appraisers');
    });
    
    // $(document).on('click','.app-delete',function(){
    //     var appr_id = $(this).attr('data-id');
    //     //alert(appr_id);
    //     delete_table_row(appr_id,base_url+'backend/appraiser/delete',"Do you really want to delete this Appraiser?","Appraiser details deleted successfully","Appraiser is could not be deleted",'appraiser-table-list');
    
    // });

    // $(document).on('click','.appraiser-delete',function(){
    //     var appraiser_id = $(this).attr('data-id');
    //     delete_table_row(appraiser_id, base_url+'backend/appraiser/delete',"Do you really want to delete this Appraiser?","Appraiser details deleted successfully","Appraiser is could not be deleted",'appraiser-table-list');

    // });

    // $(document).on('click','.appraiser-deactivate',function(){
    //     var appraiser_id = $(this).attr('data-id');
    //     var type = $(this).attr('data-type');
        
    //     status_update({'status':type,'appraiser_id':appraiser_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/appraiser/change_status',"Do you really want to change status of this Appraiser?","Appraiser status updated successfully.","Appraiser status is could not be updated",'appraiser-table-list');

    // });

    $('#download-excel').on('click',function(){
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
    });

    //------------actions buttons ---------------------------
    
    // Active - Inactive
    $("#appraiser-inactive-form").validate({
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
        $("#appraiser-inactive-form")[0].reset();
        var form_valid = $("#appraiser-inactive-form").validate();
            form_valid.resetForm();
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#appraiser_id').val(appr_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#appraiser-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/appraiser/change_status',$("#appraiser-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#appraiser-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Appraiser status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Appraiser status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.app-activate',function(){
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'appraiser_id':appr_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/appraiser/change_status',"Do you really want to change status of this appraiser?","Appraiser status updated successfully.","Appraiser status is could not be updated",'appraiser-table-list');
    });

    // Block - Unblock
    $("#appraiser-block-form").validate({
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
        $("#appraiser-block-form")[0].reset();
        var form_valid = $("#appraiser-block-form").validate();
            form_valid.resetForm();
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#appraiser_id').val(appr_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#appraiser-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/appraiser/change_block_status',$("#appraiser-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    $('#appraiser-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Appraiser  Blocked Successfully", "success");
                    $('#blocked').find('span').html(response.blocked_count);
       
                }else{
                     swal("Cancelled", "Appraiser  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.unblock-user',function(){
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'appraiser_id':appr_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/appraiser/change_block_status',"Do you really want to unblock this appraiser?","Appraiser  Unblocked Successfully.","Appraiser could not be unblocked",'appraiser-table-list');
    
    });

    // Delete
    $("#appraiser-delete-form").validate({
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
        $("#appraiser-delete-form")[0].reset();
        var form_valid = $("#appraiser-delete-form").validate();
        form_valid.resetForm();
        var appraiser_id = $(this).attr('data-id');
        $(".delete-user-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
        $(".delete-user-modal").modal('show');
        $(".delete-user-modal").find('#appraiser_id').val(appraiser_id);
    });

    $(document).on('click','#delete-user-subt',function(){
        var delete_form_valid = $("#appraiser-delete-form").valid();
        if(delete_form_valid == true){
            $.post(base_url+'backend/appraiser/delete',$("#appraiser-delete-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".delete-user-modal").modal('hide');
                    $('#appraiser-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Appraiser  Deleted Successfully", "success");
                    
                    if((response.total)!= undefined)
                        $('#total').find('h3').html(response.total);
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
                    if((response.blocked_count)!= undefined)
                        $('#blocked').find('span').html(response.blocked_count)
                }else{
                     swal("Cancelled", "Appraiser  could not be deleted ", "error");
                }
            });
        }else{

        }
    });



});
//-------------------- appens sub user------------

function append_ajax (appraiser_id, row, tr) {
        var post_data = {appraiser_id : appraiser_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/appraiser/get_sub_accounts',
            data: post_data,
            dataType: "json",
            success: function (response) {
                if($.trim(response.subaccounts).length){
                    row.child( response.subaccounts ).show();
                    row.child().addClass('ajax-child-table');
                    tr.addClass('shown');

                    var sub_table =row.child().find('table').DataTable({
                        "bInfo" : false,
                        "lengthChange": false,
                        "aoColumnDefs" : [ {
                            'bSortable' : false,
                            'aTargets' : [1,2,4,6,7,8]
                            
                        } ,
                        { "targets": [0],"orderable": false,  "visible": false},
                        ]
                    });
                    if(response.count_sub_appraiser <= 10){
                        row.child().find('table').parent().find('.dataTables_paginate').hide();
                    }
                    row.child().find('table').parent().find('.dataTables_filter').hide();
                }
            }
        });
}