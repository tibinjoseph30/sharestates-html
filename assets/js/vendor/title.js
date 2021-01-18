var base_url = $("#base-url-1").val();
$(document).ready(function(){
	//title data table list
	var myDataTable =  $('#title-table-list').DataTable({
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
            "url": base_url+'backend/titlecompany/ajax_title_list',
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
                        // { data: ""},
                        { data: "title_company_id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "title_business_name"},
                        { "data": "title_first_name"},
                        { "data": "title_phone","orderable": false},
                        { "data": "title_email"},
                        { data: null,"orderable": true,render:function(data){
                            //return data.active_loans;
                            if(data.active_loans!='0')
                                return '<a class="view-vendor-loans" target="_blank" href="'+ base_url +'backend/titlecompany/view_vendor_loans/'+data.title_company_id+'" >'+ data.active_loans +'</a>';
                            else
                                return '0';

                        }},
                        {
                            data: null,"orderable": false,render:function(data){
                            if(data.IsDeleted == 'Y'){
                                var disabled ="disabled";
                                return '<button type="button" class="btn btn-outline-primary" '+disabled+'>Add<i class="ti-user"></i> </button>'
                            }else

                            return '<a href="'+base_url+'backend/titlecompany/sub_account_add/'+data.title_company_id+'" title="Add Sub User" > <button type="button" class="btn btn-outline-primary">Add<i class="ti-user"></i> </button></a>'
                            
                        }},
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){
                            
                            if(data.title_status=='A'){
                                var active = 'fa fa-power-off color-green';
                                var title = 'Deactivate';
                                var border = 'br-green title-deactivate';
                            }else{
                                if(data.title_status == 'D'){
                                    if(data.deactivate_reason){
                                        var title = data.deactivate_reason;
                                    } else {
                                        var title = 'Reactivate';
                                    }
                                    var active = 'fa fa-ban text-danger';
                                    var border = 'br-red title-activate';
                                } else {
                                    var title = 'Activate';
                                    var active = 'fa fa-ban color-yellow';
                                    var border = 'br-yellow title-activate';
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
                                return '<a href="'+base_url+'backend/titlecompany/title/'+data.title_company_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a>';
                            }else if(data.active_loans > 0 || data.sub_user_count != 0 ){
                                return '<a href="'+base_url+'backend/titlecompany/title/'+data.title_company_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a> <a href="javascript:void(0)" class="'+border+'"  title="'+title+'" data-type="'+data.title_status+'" data-id="'+data.title_company_id+'" data-name="'+data.title_business_name+'"> <i class="'+active+'"></i> </a>  <a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.title_company_id+'" data-name="'+data.title_business_name+'"> <i class="'+block_icon+'"></i> </a><a href="javascript:void(0)" class="view_title_company br-green"  title="View" id="'+data.title_company_id+'"> <i class="fa fa-eye color-green"></i> </a>';
                            }else{
                                return '<a href="'+base_url+'backend/titlecompany/title/'+data.title_company_id+'" title="Edit"> <i class="fa fa-pencil text-info"></i> </a> <a href="javascript:void(0)" class="title-delete danger-outline"  title="Delete"  data-id="'+data.title_company_id+'" data-name="'+data.title_first_name+'"> <i class="fa fa-trash-o text-danger"></i> </a><a href="javascript:void(0)" class="'+border+'"  title="'+title+'" data-type="'+data.title_status+'" data-id="'+data.title_company_id+'" data-name="'+data.title_business_name+'"> <i class="'+active+'"></i> </a>  <a href="javascript:void(0)" class="'+block_class+'"  title="'+block_title+'" data-type="'+data.blocked_status+'" data-id="'+data.title_company_id+'" data-name="'+data.title_business_name+'"> <i class="'+block_icon+'"></i> </a><a href="javascript:void(0)" class="view_title_company br-green"  title="View" id="'+data.title_company_id+'"> <i class="fa fa-eye color-green"></i> </a>';
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

    $('#title-table-list').on( 'draw.dt', function () {
        $('.title-activate').tooltip();
        $('.unblock-user').tooltip();
    } );

    $('#title-table-list tbody').on('click', 'td.details-control', function () {
        $(this).toggleClass("down");
        var tr = $(this).closest('tr');
        var row = myDataTable.row( tr );
        var data = $('#title-table-list').dataTable().fnGetData(row);
        var title_id = data.title_company_id;
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            append_ajax(title_id, row, tr);
            // row.child( append_ajax(broker_id, row, tr) ).show();
            // tr.addClass('shown');
        }
    } );

    function append_ajax (title_id, row, tr) {
        var post_data = {title_id : title_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/titlecompany/get_sub_accounts',
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
                    if(response.count_sub_title <= 10){
                        row.child().find('table').parent().find('.dataTables_paginate').hide();
                    }
                    row.child().find('table').parent().find('.dataTables_filter').hide();
                }
            }
        });
    }

    // Active - Inactive
    $("#title-inactive-form").validate({
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

    $(document).on('click','.title-deactivate',function(){
        $("#title-inactive-form")[0].reset();
        var form_valid = $("#title-inactive-form").validate();
            form_valid.resetForm();
        var title_company_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#title_company_id').val(title_company_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#title-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/titlecompany/change_status',$("#title-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#title-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Title company status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Title company status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.title-activate',function(){
        var title_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'title_company_id':title_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/titlecompany/change_status',"Do you really want to change status of this Title company?","Title company status updated successfully.","Title company status is could not be updated",'title-table-list');
    });


    $("#title-block-form").validate({
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
        $("#title-block-form")[0].reset();
        var form_valid = $("#title-block-form").validate();
            form_valid.resetForm();
        var title_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#title_id').val(title_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#title-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/titlecompany/change_block_status',$("#title-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    $('#title-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Title Company  Blocked Successfully", "success");
                    $('#blocked').find('span').html(response.blocked_count);
                                         
                }else{
                     swal("Cancelled", "Title Company  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.unblock-user',function(){
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'title_id':appr_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/titlecompany/change_block_status',"Do you really want to unblock this Title Company?","Title Company  Unblocked Successfully.","Title Company could not be unblocked",'title-table-list');
    });


    $("#title-delete-form").validate({
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

    $(document).on('click','.title-delete',function(){
        $("#title-delete-form")[0].reset();
        var form_valid = $("#title-delete-form").validate();
        form_valid.resetForm();
        var title_company_id = $(this).attr('data-id');
        $(".delete-user-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
        $(".delete-user-modal").modal('show');
        $(".delete-user-modal").find('#title_id').val(title_company_id);
    });

    $(document).on('click','#delete-user-subt',function(){
        var delete_form_valid = $("#title-delete-form").valid();
        if(delete_form_valid == true){
            $.post(base_url+'backend/titlecompany/delete',$("#title-delete-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".delete-user-modal").modal('hide');
                    $('#title-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Title company  Deleted Successfully", "success");
                    
                    if((response.total)!= undefined)
                        $('#total').find('h3').html(response.total);
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
                    if((response.blocked_count)!= undefined)
                        $('#blocked').find('span').html(response.blocked_count)
                }else{
                     swal("Cancelled", "Title company  could not be deleted ", "error");
                }
            });
        }else{

        }
    });


    

    
    //----------------------filter options --------------------

    $(document).on('change','#location-id',function(){
       //alert('f');
       $(".preloader").show();
       $('#title-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    $(document).on('change','#status',function(){
       var type = $(this).val(); 
       if(type == 'A')
        $('#header').html('List of Title Companies - Active');
       else if(type == 'I')
        $('#header').html('List of Title Companies - Inactive');
       else if(type == 'D')
        $('#header').html('List of Title Companies - Deactive');
       else if(type == 'Y')
        $('#header').html('List of Title Companies - Blocked');
       else if(type == 'DE')
        $('#header').html('List of Title Companies - Deleted');
       else
        $('#header').html('List of Title Companies');

       $(".preloader").show();
       $('#title-table-list').DataTable().ajax.reload();
       $(".preloader").hide();
    });

    $(document).on('click','#active',function(){
        $('#status').val('A').trigger('change');
        $('#header').html('List of Title Companies - Active');
    });

    $(document).on('click','#inactive',function(){
        $('#status').val('D').trigger('change');
        $('#header').html('List of Title Companies - Deactive');
    });

    $(document).on('click','#blocked',function(){
        $('#status').val('Y').trigger('change');
        $('#header').html('List of Title Companies - Blocked');
    });


    $('.total-count-apparaiser').on('click',function(){
        if($('#status').length)
            $('#status').val('').trigger('change');
    });

    $(document).on('click','#expired',function(){
        $('#status').val('E').show();
        $('#status').val('E').trigger('change'); 
        $('#header').html('List of Title Companies - Licence Expired');
    });
    
    
    oTable = $('#title-table-list').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#status').val('').trigger('change');
        $('#location-id').val('').trigger('change');
        $('#header').html('List of Title Companies');
    });

});

// ------------actions buttons ---------------------------
// $(document).on('click','.title-delete',function(){
//     var title_id = $(this).attr('data-id');
//     delete_table_row(title_id, base_url+'backend/titlecompany/delete',"Do you really want to delete this Title company?","Title company details deleted successfully","Title company is could not be deleted",'title-table-list');

// });



$(document).on("click",".view_title_company",function(){
    var project_title_company_id =this.id;
    $('#error_2').html('');
    var post_data = {project_title_company_id:project_title_company_id};
    post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type:'POST',
        data:post_data,
        url:base_url+'backend/title_company/login_as_title_company/',
        dataType:'json',
        success: function(response){  
            if(response.status1 == 'success'){
            var win = window.open(base_url+"title/pipeline/projectpipeline", '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }
            }
        }
    });
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


    window.location.href = base_url + "backend/titlecompany/export?search=" + search+"&location="+location+"&status="+status;

});







