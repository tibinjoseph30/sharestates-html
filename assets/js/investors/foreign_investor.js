var base_url = $("#base-url-1").val();
$(document).ready(function(){

    var post_data = {};
    post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type: 'POST',
        data: post_data,
        url:  base_url+'backend/investors/get_ac_foreign_count_amt',
        success: function (result) {
            var response = $.parseJSON(result); 
            if(response.status == true){
                $("#total_foreign_investors").html(response.total_foreign_investors['total']);
                $("#foreign_invest_total").html('$'+response.total_foreign_invest['display_amount']+response.total_foreign_invest['display_label_first']);

                $("#total_active_foreign_investors").html(response.total_active_foreign_investors['total']);
                $("#foreign_active_invest_total").html('$'+response.total_active_foreign_invest['display_amount']+response.total_active_foreign_invest['display_label_first']);

                $("#total_inactive_foreign_investors").html(response.total_inactive_foreign_investors['total']);
                $("#foreign_inactive_invest_total").html('$'+response.total_inactive_foreign_invest['display_amount']+response.total_inactive_foreign_invest['display_label_first']);
            }

        }
    });

	// investors data table list
	var myDataTable =  $('#investorList').DataTable({
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
            "url": base_url+'backend/investors/ajax_foreign_investors_list',
            "type": "GET",
            "data": function(d){

                var from_date   = $("#from_date").val();
                var to_date     = $("#to_date").val();
                var date_range  = $("#dateranges").find('.btn-primary').val();
                var status      = $(".status-search").find("option:selected").val();

                i=1;
                d['from_date']  = from_date;
                d['to_date']    = to_date;
                d['date_range'] = date_range;
                d['status']     = status;
            }
        },
        "targets": [ 0 ],
        "columns": [    
            { data: "user_id","orderable": false,  "visible": false},
            { "data": "count","orderable": false},
            { "data": "join_date"},
            { "data": "first_name"},
            { "data": "last_name"},
            { "data": "user_email"},
            { "data": "user_phone"},
            // { "data": "accreditation_verification_status"},

            { data:null,"orderable": false,className:"",render:function(data){
                if(data.accreditation_verification_status == 'Y'){
                    return '<span class="text-success" >Verified </span><i class="share-status_active"></i>';
                } else{
                    return '<a href="#" id="Approve" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="text-warning">Pending</span><i class="text-warning fa fa-ban ml-1"></i></a><div class="dropdown-menu pending text-center"><p class="p-b-10 p-t-20">Do you want to approve the Accreditation?</p><button class="btn btn-success" data-id="'+data.user_id+'" data-type="'+data.accreditation_verification_status+'" id="save_accredit">Yes</button></div>';
                }   
            }},

            { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){

                if(data.user_status == 'A'){
                    var active_class = 'br-green mr-1 user_deactivate';
                    var active_icons = 'fa fa-power-off color-green';
                    var title = 'Deactivate';

                }else{
                    var active_class = 'br-red mr-1 user_activate';
                    var active_icons = 'fa fa-ban text-danger';
                    var title = 'Activate';
                }
                // if(data.deleted_status == 'Y'){
                //     return '<a href="'+base_url+'backend/appraiser/edit_appraiser/'+data.project_appraiser_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a>';
                // }
                return '<a href="'+base_url+'backend/investors/edit_users/'+data.user_id+'" class="mr-1" data-toggle="tooltip" data-original-title="Edit" ><i class="fa fa-pencil"></i></a><a class="app-delete danger-outline user-delete mr-1" data-toggle="tooltip" data-original-title="Delete" data-id="'+data.user_id+'" data-name="'+data.first_name+'"> <i class="fa fa-trash-o text-danger"></i> </a><a  class="'+active_class+'" data-toggle="tooltip" data-original-title="'+title+'" data-type="'+data.user_status+'" data-id="'+data.user_id+'" data-name="'+data.first_name+'" > <i class="'+active_icons+'"></i> </a>';
            }}
        ],
    });

    myDataTable.on( 'draw', function () {
        $('[data-toggle="tooltip"]').tooltip();
    } );

    
    //----------------------filter options --------------------
    oTable = $('#investorList').dataTable();

    $(document).on('click','#save_accredit',function(){
        var user_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');

        var post_data = {user_id : user_id, old_acc_status: type};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        
        $.ajax({
            type: 'POST',
            data: post_data,
            url:  base_url+'backend/investors/change_accreditation_verification',
            success: function (result) {
                var response = $.parseJSON(result); 
                if(response.status == true){
                    $(".preloader").show();
                    $('#investorList').DataTable().ajax.reload();
                    $(".preloader").hide();
                }

            }
        });
    });

    $('#search-input').keyup(function(){
        $('#from_date').val('').trigger('change');
        $('#to_date').val('').trigger('change');
        $('#status').val('').trigger('change');

        $("#last_week").addClass("btn-outline-primary");
        $("#last_month").addClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_week").removeClass("btn-primary");
        
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#from_date').val('').trigger('change');
        $('#to_date').val('').trigger('change');
        $('#status').val('').trigger('change');

        $("#last_week").addClass("btn-outline-primary");
        $("#last_month").addClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_week").removeClass("btn-primary");

        $('#investorList').DataTable().ajax.reload();

    });

    $(document).on('click','#from_date, #to_date',function(){
        $("#last_week").addClass("btn-outline-primary");
        $("#last_month").addClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_week").removeClass("btn-primary");
    });

    $(document).on('change','#status',function(){
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();
    });

    $(document).on('click','#totalindividual',function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#from_date').val('').trigger('change');
        $('#to_date').val('').trigger('change');

        $("#last_week").addClass("btn-outline-primary");
        $("#last_month").addClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_week").removeClass("btn-primary");


        $('#status').val('').trigger('change');
    });

    $(document).on('click','#activeinvestors',function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#from_date').val('').trigger('change');
        $('#to_date').val('').trigger('change');

        $("#last_week").addClass("btn-outline-primary");
        $("#last_month").addClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_week").removeClass("btn-primary");


        $('#status').val('A').trigger('change');
    });

    $(document).on('click','#inactiveinvestors',function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#from_date').val('').trigger('change');
        $('#to_date').val('').trigger('change');

        $("#last_week").addClass("btn-outline-primary");
        $("#last_month").addClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_week").removeClass("btn-primary");


        $('#status').val('I').trigger('change');
    });


    $(document).on('change','#from_date',function(){
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();   
    });

    $(document).on('change','#to_date',function(){
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();   
    });

    //btn-primary

    $('#last_week').on('click',function(){
        $("#last_week").addClass("btn-primary");
        $("#last_week").removeClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_month").addClass("btn-outline-primary");

        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide(); 
    });

    $('#last_month').on('click',function(){
        $("#last_month").addClass("btn-primary");
        $("#last_month").removeClass("btn-outline-primary");
        $("#last_week").removeClass("btn-primary");
        $("#last_week").addClass("btn-outline-primary");

        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide(); 
    });

    $("#user-inactive-form").validate({
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

    $(document).on('click','.user_deactivate',function(){
        $("#user-inactive-form")[0].reset();
        var form_valid = $("#user-inactive-form").validate();
            form_valid.resetForm();
        var user_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Deactivate - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#user_id').val(user_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#user-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/investors/change_status',$("#user-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#investorList').DataTable().ajax.reload();
                    $('#investorList_NA').DataTable().ajax.reload();
                    swal("Updated!", "User status updated successfully.", "success");
       
                }else{
                     swal("Cancelled", "User status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.user_activate',function(){
        var user_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'user_id':user_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/investors/change_status',"Do you really want to change status of this investor?","Investor status updated successfully.","Investor status is could not be updated",'investorList');
    });

    $(document).on('click','.user-delete',function(){
        var user_id = $(this).attr('data-id');
        // var type = $(this).attr('data-type');
        status_update({'user_id':user_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/investors/delete',"Do you really want to delete this user?","User delete successfully.","User could not be deleted",'investorList');
    });

    
    var myDataTable =  $('#investorList_NA').DataTable({
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
            "url": base_url+'backend/investors/ajax_foreign_investors_list_NA',
            "type": "GET",
            "data": function(d){

                var from_date   = $("#from_date_NA").val();
                var to_date     = $("#to_date_NA").val();
                var date_range  = $("#dateranges_NA").find('.btn-primary').val();
                var status      = $(".status-search_na").find("option:selected").val();

                i=1;
                d['from_date']  = from_date;
                d['to_date']    = to_date;
                d['date_range'] = date_range;
                d['status']     = status;
            }
        },
        "targets": [ 0 ],
        "columns": [    
            { data: "user_id","orderable": false,  "visible": false},
            { "data": "count","orderable": false},
            { "data": "join_date"},
            { "data": "first_name"},
            { "data": "last_name"},
            { "data": "user_email"},
            { "data": "user_phone"},
            // { "data": "accreditation_verification_status"},

            { data:null,"orderable": false,className:"",render:function(data){
                if(data.accreditation_verification_status == 'Y'){
                    return '<span class="text-success" >Verified </span><i class="share-status_active"></i>';
                } else{
                    return '<a href="#" id="Approve" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="text-warning">Pending</span><i class="text-warning fa fa-ban ml-1"></i></a><div class="dropdown-menu pending text-center"><p class="p-b-10 p-t-20">Do you want to approve the Accreditation?</p><button class="btn btn-success" data-id="'+data.user_id+'" data-type="'+data.accreditation_verification_status+'" id="save_accredit">Yes</button></div>';
                }   
            }},

            { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){

                if(data.user_status == 'A'){
                    var active_class = 'br-green mr-1 user_deactivate_na';
                    var active_icons = 'fa fa-power-off color-green';
                    var title = 'Deactivate';

                }else{
                    var active_class = 'br-red mr-1 user_activate_na';
                    var active_icons = 'fa fa-ban text-danger';
                    var title = 'Activate';
                }
                // if(data.deleted_status == 'Y'){
                //     return '<a href="'+base_url+'backend/appraiser/edit_appraiser/'+data.project_appraiser_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a>';
                // }
                // return '<a href="'+base_url+'backend/investors/edit_investor/'+data.user_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="app-deactivate '+active_class+'"  title="'+title+'" data-type="'+data.user_status+'" data-id="'+data.user_id+'"> <i class="'+active_icons+'"></i> </a>';
                return '<a href="'+base_url+'backend/investors/edit_users/'+data.user_id+'" class="mr-1" data-toggle="tooltip" data-original-title="Edit" ><i class="fa fa-pencil"></i></a><a class="app-delete danger-outline user-delete_na mr-1" data-toggle="tooltip" data-original-title="Delete" data-id="'+data.user_id+'" data-name="'+data.first_name+'"> <i class="fa fa-trash-o text-danger"></i> </a><a  class="'+active_class+'" data-toggle="tooltip" data-original-title="'+title+'" data-type="'+data.user_status+'" data-id="'+data.user_id+'" data-name="'+data.first_name+'" > <i class="'+active_icons+'"></i> </a>';
            }}
        ],
    });

    myDataTable.on( 'draw', function () {
        $('[data-toggle="tooltip"]').tooltip();
    } );   

    oTable1 = $('#investorList_NA').dataTable();

    $('#search-input_NA').keyup(function(){
        oTable1.fnFilter($(this).val());
    });

    $('#search-reset_NA').click(function(){
        oTable1.fnFilter('');
        $('#search-input').val('');
        $('#from_date_NA').val('').trigger('change');
        $('#to_date_NA').val('').trigger('change');
        $('#status').val('').trigger('change');
        $('#status_NA').val('').trigger('change');

        $("#last_week_NA").addClass("btn-outline-primary");
        $("#last_month_NA").addClass("btn-outline-primary");
        $("#last_month_NA").removeClass("btn-primary");
        $("#last_week_NA").removeClass("btn-primary");

        $('#investorList_NA').DataTable().ajax.reload();

    });

    $(document).on('click','#from_date_NA, #to_date_NA',function(){
        $("#last_week_NA").addClass("btn-outline-primary");
        $("#last_month_NA").addClass("btn-outline-primary");
        $("#last_month_NA").removeClass("btn-primary");
        $("#last_week_NA").removeClass("btn-primary");
    });


    $(document).on('change','#from_date_NA',function(){
        $(".preloader").show();
        $('#investorList_NA').DataTable().ajax.reload();
        $(".preloader").hide();   
    });

    $(document).on('change','#to_date_NA',function(){
        $(".preloader").show();
        $('#investorList_NA').DataTable().ajax.reload();
        $(".preloader").hide();   
    });


    $(document).on('click','#non_accredited',function(){
        $('#investorList_NA').DataTable().ajax.reload();

        var post_data = {};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            data: post_data,
            url:  base_url+'backend/investors/get_na_foreign_count_amt',
            success: function (result) {
                var response = $.parseJSON(result); 
                if(response.status == true){
                    $("#total_foreign_investors_na").html(response.total_foreign_investors_na['total']);
                    $("#foreign_invest_total_na").html('$'+response.total_foreign_invest_na['display_amount']+response.total_foreign_invest_na['display_label_first']);

                    $("#total_active_foreign_investors_na").html(response.total_active_foreign_investors_na['total']);
                    $("#foreign_active_invest_total_na").html('$'+response.total_active_foreign_invest_na['display_amount']+response.total_active_foreign_invest_na['display_label_first']);

                    $("#total_inactive_foreign_investors_na").html(response.total_inactive_foreign_investors_na['total']);
                    $("#foreign_inactive_invest_total_na").html('$'+response.total_inactive_foreign_invest_na['display_amount']+response.total_inactive_foreign_invest_na['display_label_first']);
                }

            }
        });
    });

    $(document).on('click','#accredited',function(){
        $('#investorList').DataTable().ajax.reload();

        var post_data = {};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            data: post_data,
            url:  base_url+'backend/investors/get_ac_foreign_count_amt',
            success: function (result) {
                var response = $.parseJSON(result); 
                if(response.status == true){
                    $("#total_foreign_investors").html(response.total_foreign_investors['total']);
                    $("#foreign_invest_total").html('$'+response.total_foreign_invest['display_amount']+response.total_foreign_invest['display_label_first']);

                    $("#total_active_foreign_investors").html(response.total_active_foreign_investors['total']);
                    $("#foreign_active_invest_total").html('$'+response.total_active_foreign_invest['display_amount']+response.total_active_foreign_invest['display_label_first']);

                    $("#total_inactive_foreign_investors").html(response.total_inactive_foreign_investors['total']);
                    $("#foreign_inactive_invest_total").html('$'+response.total_inactive_foreign_invest['display_amount']+response.total_inactive_foreign_invest['display_label_first']);
                }

            }
        });
    });

    //btn-primary

    $('#last_week_NA').on('click',function(){
        $("#last_week_NA").addClass("btn-primary");
        $("#last_week_NA").removeClass("btn-outline-primary");
        $("#last_month_NA").removeClass("btn-primary");
        $("#last_month_NA").addClass("btn-outline-primary");

        $(".preloader").show();
        $('#investorList_NA').DataTable().ajax.reload();
        $(".preloader").hide(); 
    });

    $('#last_month_NA').on('click',function(){
        $("#last_month_NA").addClass("btn-primary");
        $("#last_month_NA").removeClass("btn-outline-primary");
        $("#last_week_NA").removeClass("btn-primary");
        $("#last_week_NA").addClass("btn-outline-primary");

        $(".preloader").show();
        $('#investorList_NA').DataTable().ajax.reload();
        $(".preloader").hide(); 
    });

    $(document).on('change','#status_NA',function(){
        $(".preloader").show();
        $('#investorList_NA').DataTable().ajax.reload();
        $(".preloader").hide();
    });

    $(document).on('click','#individualinvestors_na',function(){
        oTable1.fnFilter('');
        $('#search-input').val('');
        $('#from_date_NA').val('').trigger('change');
        $('#to_date_NA').val('').trigger('change');

        $("#last_week_NA").addClass("btn-outline-primary");
        $("#last_month_NA").addClass("btn-outline-primary");
        $("#last_month_NA").removeClass("btn-primary");
        $("#last_week_NA").removeClass("btn-primary");


        $('#status_NA').val('').trigger('change');
    });

    $(document).on('click','#activeinvestors_na',function(){
        oTable1.fnFilter('');
        $('#search-input').val('');
        $('#from_date_NA').val('').trigger('change');
        $('#to_date_NA').val('').trigger('change');

        $("#last_week_NA").addClass("btn-outline-primary");
        $("#last_month_NA").addClass("btn-outline-primary");
        $("#last_month_NA").removeClass("btn-primary");
        $("#last_week_NA").removeClass("btn-primary");


        $('#status_NA').val('A').trigger('change');
    });

    $(document).on('click','#inactiveinvestors_na',function(){
        oTable1.fnFilter('');
        $('#search-input').val('');
        $('#from_date_NA').val('').trigger('change');
        $('#to_date_NA').val('').trigger('change');

        $("#last_week_NA").addClass("btn-outline-primary");
        $("#last_month_NA").addClass("btn-outline-primary");
        $("#last_month_NA").removeClass("btn-primary");
        $("#last_week_NA").removeClass("btn-primary");


        $('#status_NA').val('I').trigger('change');
    });

    $(document).on('click','.user_deactivate_na',function(){
        $("#user-inactive-form")[0].reset();
        var form_valid = $("#user-inactive-form").validate();
            form_valid.resetForm();
        var user_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Deactivate - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#user_id').val(user_id);
    });

    $(document).on('click','.user_activate_na',function(){
        var user_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'user_id':user_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/investors/change_status',"Do you really want to change status of this investor?","Investor status updated successfully.","Investor status is could not be updated",'investorList_NA');
    });

    $(document).on('click','.user-delete_na',function(){
        var user_id = $(this).attr('data-id');
        // var type = $(this).attr('data-type');
        status_update({'user_id':user_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/investors/delete',"Do you really want to delete this user?","User delete successfully.","User could not be deleted",'investorList_NA');
    });

    $('#download_accredited').on('click',function(){

        var search      = '';
        var date_range  = '';
        var from_date   = '';
        var to_date     = '';
        
        var search_val = $('#search-input').val();
        if(search_val.length) {
            search = encodeURIComponent(search_val);
        }

        var daterange = $("#dateranges").find('.btn-primary').val();
        if(daterange){
            date_range = daterange;
        } else {
            date_range = '';
        }

        from_date = $("#from_date").val();
        to_date = $("#to_date").val();
        
        window.location.href = base_url + "backend/investors/export_foreign?search="+search+"&date_range="+date_range+"&from_date="+from_date+"&to_date="+to_date;
    });

    $('#download_nonaccredited').on('click',function(){

        var search_na      = '';
        var date_range_na  = '';
        var from_date_na   = '';
        var to_date_na     = '';
        
        var search_val_na = $('#search-input_NA').val();
        if(search_val_na.length) {
            search_na = encodeURIComponent(search_val_na);
        }

        var daterange_na = $("#dateranges_NA").find('.btn-primary').val();
        if(daterange_na){
            date_range_na = daterange_na;
        } else {
            date_range_na = '';
        }
        
        from_date_na = $("#from_date_NA").val();
        to_date_na = $("#to_date_NA").val();
        
        window.location.href = base_url + "backend/investors/export_foreign_na?search="+search_na+"&date_range="+date_range_na+"&from_date="+from_date_na+"&to_date="+to_date_na;
    });

    

});