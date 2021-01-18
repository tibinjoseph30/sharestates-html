var base_url = $("#base-url-1").val();
$(document).ready(function(){

    var post_data = {};
    post_data[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.getJSON(base_url+'admin_template/assets/json/investors_list.json', function(response) {

        if(response.status == true){
            $("#total_individual_investors").html(response.total_individual_investors['total']);
            $("#individual_invest_total").html('$'+response.total_individual_invest['display_amount']+response.total_individual_invest['display_label_first']);

            $("#total_active_individual_investors").html(response.total_active_individual_investors);
            $("#individual_active_invest_total").html('$'+response.total_active_individual_invest['display_amount']+response.total_active_individual_invest['display_label_first']);


            //$("#total_inactive_individual_investors").html(response.total_inactive_individual_investors['total']);
           // $("#individual_inactive_invest_total").html('$'+response.total_inactive_individual_invest['display_amount']+response.total_inactive_individual_invest['display_label_first']);


            $("#total_functional_investors").html(response.total_functional_investors);
            $("#functional_invest_total").html('$'+response.total_functional_invest['display_amount']+response.total_functional_invest['display_label_first']);

            $("#institutional_investors").html(response.total_institutional_investors);
            $("#institutional_invest_total").html('$'+response.total_institutional_invest['display_amount']+response.total_institutional_invest['display_label_first']);

            $("#total_wholeloan_investors").html(response.total_whole_loan_investors);
            $("#total_wholeloan_investment_total").html('$'+response.total_whole_loan_invest['display_amount']+response.total_whole_loan_invest['display_label_first']);
            remvLoadingPanel();
        }

    });
    $(document).on('change','#accredition',function(){
        show_or_hide_reset();
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();
    });
    $(document).on('change','#investment_amount',function(){
        show_or_hide_reset();
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();

    });
    $(document).on('change','#investor_type',function(){
        show_or_hide_reset();
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();


    });


    function show_or_hide_reset(){
        console.log($('#accredition').val());
        console.log($('#investor_type').val());
        console.log($('#investment_amount').val());
        console.log("ccce"+$('#search-input'+"ccce").val());
        console.log($('#to_date').val());
        console.log($('#from_date').val());

        if($('#accredition').val()!=""||$('#investor_type').val()||$('#investment_amount').val()||$('#search-input').val()!=""||$('#to_date').val()!=""
            ||$('#from_date').val()!=""){
            $("#search-reset").show();
        }else{

            $("#search-reset").hide();

        }

    }

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
            "url": base_url+'backend/investors/ajax_investors_list',
            "type": "GET",
            "data": function(d){

                var from_date = $("#from_date").val();
                var to_date = $("#to_date").val();
                var date_range = $("#dateranges").find('.btn-primary').val();
                var status = $(".status-search").find("option:selected").val();

                var accredition = $('#accredition').find("option:selected").val();
                var investor_type = $('#investor_type').find("option:selected").val();
                var investment_amount = $('#investment_amount').find("option:selected").val();

                i=1;
                d['from_date']  = from_date;
                d['to_date']    = to_date;
                d['date_range'] = date_range;
                d['status']     = status;

                d['accredition']     = accredition;
                d['investor_type']     = investor_type;
                d['investment_amount']     = investment_amount;
            }
        },
        "targets": [ 0 ],
        "columns": [    
            { data: "user_id","orderable": false,  "visible": false},
            // { "data": "count","orderable": false},
            // { "data": "join_date"},
            { "data": "institution_nickname"},
            { "data": "first_name"},
            { "data": "last_name"},
            { data:null,"orderable": false,className:"",render:function(data){
                    if(data.whole_loan_buyer_status == '1'){
                         return 'Whole Loan';
                    }else {
                        if(data.investor_type == 'I'){
                            return 'Institutional';
                        }else if(data.investor_type == 'R'){
                            return 'Fractional Investors';
                        }
                        else return '';
                    }
                }},
            { "data": "user_email"},
            { "data": "user_phone",className:"ws-nowrap"},
            { "data": "join_date"},

            // { "data": "accreditation_verification_status"},

            { data:null,"orderable": false,className:"",render:function(data){
                

                if(data.accreditation_verification_status == 'Y'){
                    return '<div class="d-flex align-items-center"><span class="text-success" >Verified </span><i class="ml-1 share-status_active"></i></div>';
                } else{
                    if(data.accreditation_verification_status == 'N' && data.selfverification_docupload_status == 'N'){
                        return '<div class="d-flex align-items-center"><span class="text-danger" >Not Verified </span><i class="ml-1 share-status_inactive"></i></div>';
                    }else{
                        return '<div class="d-flex align-items-center"><a href="#" id="Approve" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="text-warning">Pending</span><i class="text-warning fa fa-ban ml-1"></i></a>';
                        //return '<div class="d-flex align-items-center"><a href="#" id="Approve" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ><span class="text-warning">Pending</span><i class="text-warning fa fa-ban ml-1"></i></a><div class="dropdown-menu pending text-center"><p class="p-b-10 p-t-20">Do you want to approve the Accreditation?</p><button class="btn btn-success" data-id="'+data.user_id+'" data-type ="'+data.accreditation_verification_status+'" id="save_accredit">Yes</button></div></div>';
                    } 
                    
                }  

            }},

            { data:null,"orderable": false,className:"text-nowrap",render:function(data){

                if(data.user_status == 'A'){
                    //var active_class = 'br-green mr-1 user_deactivate';
                    //var active_icons = 'fa fa-power-off color-green';
                    var title = 'Deactivate';

                }else{
                    //var active_class = 'br-red mr-1 user_activate';
                    //var active_icons = 'fa fa-ban text-danger';
                    var title = 'Activate';
                }
                // if(data.deleted_status == 'Y'){
                //     return '<a href="'+base_url+'backend/appraiser/edit_appraiser/'+data.project_appraiser_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a>';
                // }
                // return '<a href="'+base_url+'backend/investors/edit_users/'+data.user_id+'" class="mr-1" data-toggle="tooltip" data-original-title="Edit" ><i class="fa fa-pencil"></i></a><a class="app-delete danger-outline user-delete mr-1" data-toggle="tooltip" data-original-title="Delete" data-id="'+data.user_id+'" data-name="'+data.first_name+'"> <i class="fa fa-trash-o text-danger"></i> </a><a  class="'+active_class+'" data-toggle="tooltip" data-original-title="'+title+'" data-type="'+data.user_status+'" data-id="'+data.user_id+'" data-name="'+data.first_name+'" > <i class="'+active_icons+'"></i> </a>';
                    return '<ul class="links"><li><a href="'+base_url+'backend/investors/edit_users/'+data.user_id+'" class="" >View Profile</a></li>' +
                        '<li><a href="'+base_url+'backend/users/users_account_credit/'+data.user_id+'" class="" >Users Account Credit</a></li>'+
                        '<li><a class="app-delete user-delete ls-red" data-id="'+data.user_id+'" data-name="'+data.first_name+'"> Delete Account </a></li>' +
                        '<li><a  class="user_activate_na ls-orange" data-type="'+data.user_status+'" data-id="'+data.user_id+'" data-name="'+data.first_name+'" > Deactivate Account </a></li></ul>';

                }}
        ],
    });
    myDataTable.on( 'draw', function () {
        // alert( 'Table redrawn' );
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
        // $('#search-input').val('');
        $('#from_date').val('').trigger('change');
        $('#to_date').val('').trigger('change');
        $('#status').val('').trigger('change');

        $("#last_week").addClass("btn-outline-primary");
        $("#last_month").addClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_week").removeClass("btn-primary");
        show_or_hide_reset();

        oTable.fnFilter($(this).val());
    });

    $('#search-input-button').click(function(){
        
        if($('#search-input').val() !=''){
            $('#from_date').val('').trigger('change');
            $('#to_date').val('').trigger('change');
            $('#status').val('').trigger('change');

            $("#last_week").addClass("btn-outline-primary");
            $("#last_month").addClass("btn-outline-primary");
            $("#last_month").removeClass("btn-primary");
            $("#last_week").removeClass("btn-primary");
            show_or_hide_reset();

            oTable.fnFilter($('#search-input').val());
        }
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

        $('#investor_type').val('').trigger('change');
        $('#accredition').val('').trigger('change');
        $('#investment_amount').val('').trigger('change');

        $('#investorList').DataTable().ajax.reload();

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


    $(document).on('click','#from_date, #to_date',function(){
        $("#last_week").addClass("btn-outline-primary");
        $("#last_month").addClass("btn-outline-primary");
        $("#last_month").removeClass("btn-primary");
        $("#last_week").removeClass("btn-primary");
    });


    $(document).on('change','#from_date',function(){
        show_or_hide_reset();
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();   
    });

    $(document).on('change','#to_date',function(){
        show_or_hide_reset();
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


    $(document).on('change','#accredition_NA',function(){
        show_or_hide_reset_NA();
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();
    });
    $(document).on('change','#investment_amount_NA',function(){
        show_or_hide_reset_NA();
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();

    });
    $(document).on('change','#investor_type_NA',function(){
        show_or_hide_reset_NA();
        $(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        $(".preloader").hide();


    });


    function show_or_hide_reset_NA(){

        if($('#accredition_NA').val()!=""||$('#investor_type_NA').val()||$('#investment_amount_NA').val()||$('#search-input_NA').val()!=""||$('#to_date_NA').val()!=""
            ||$('#from_date_NA').val()!=""){
            $("#search-reset_NA").show();
        }else{

            $("#search-reset_NA").hide();

        }

    }


 /*   var myDataTable =  $('#investorList_NA').DataTable({
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
            "url": base_url+'backend/investors/ajax_investors_list_NA',
            "type": "GET",
            "data": function(d){

                var from_date   = $("#from_date_NA").val();
                var to_date     = $("#to_date_NA").val();
                var date_range  = $("#dateranges_NA").find('.btn-primary').val();
                var status = $(".status-search_na").find("option:selected").val();

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
            // { "data": "count","orderable": false},
            { "data": "institution_nickname"},
            { "data": "first_name"},
            { "data": "last_name"},
            { data:null,"orderable": false,className:"",render:function(data){
                    if(data.investor_type == 'I'){
                        return 'Institutional';
                    } else if(data.investor_type == 'R'){
                        return 'Fractional Investors';
                    }  else if(data.whole_loan_buyer_status == '1'){
                        return 'Whole Loan';
                    } else return '';
                }},
            { "data": "user_email"},
            { "data": "user_phone"},
            { "data": "join_date"},
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
                // return '<a href="'+base_url+'backend/investors/edit_users/'+data.user_id+'" class="mr-1" data-toggle="tooltip" data-original-title="Edit" ><i class="fa fa-pencil"></i></a><a class="app-delete danger-outline user-delete_na mr-1" data-toggle="tooltip" data-original-title="Delete" data-id="'+data.user_id+'" data-name="'+data.first_name+'"> <i class="fa fa-trash-o text-danger"></i> </a><a  class="'+active_class+'" data-toggle="tooltip" data-original-title="'+title+'" data-type="'+data.user_status+'" data-id="'+data.user_id+'" data-name="'+data.first_name+'" > <i class="'+active_icons+'"></i> </a>';
                  return '<a href="'+base_url+'backend/investors/edit_users/'+data.user_id+'" class="mr-2 w-auto no-border" data-toggle="tooltip" data-original-title="Edit" >View Profile </a>' +
                      '<a class="app-delete danger-outline user-delete_na mr-1 w-auto no-border text-danger mr-2" data-toggle="tooltip" data-original-title="Delete" data-id="'+data.user_id+'" data-name="'+data.first_name+'"> Delete Account </a>' +
                      '<a  class=" w-auto br-red mr-2 user_activate_na no-border text-green   '+active_class+'" data-toggle="tooltip" data-original-title="'+title+'" data-type="'+data.user_status+'" data-id="'+data.user_id+'" data-name="'+data.first_name+'" > Deactivate Account </a>';

                }}
        ],
    });
*/
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
        $('#status_NA').val('').trigger('change');

        $("#last_week_NA").addClass("btn-outline-primary");
        $("#last_month_NA").addClass("btn-outline-primary");
        $("#last_month_NA").removeClass("btn-primary");
        $("#last_week_NA").removeClass("btn-primary");

        $('#investor_type_NA').val('').trigger('change');
        $('#accredition_NA').val('').trigger('change');
        $('#investment_amount_NA').val('').trigger('change');


        $('#investorList_NA').DataTable().ajax.reload();

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

    $(document).on('click','#from_date_NA, #to_date_NA',function(){
        $("#last_week_NA").addClass("btn-outline-primary");
        $("#last_month_NA").addClass("btn-outline-primary");
        $("#last_month_NA").removeClass("btn-primary");
        $("#last_week_NA").removeClass("btn-primary");
    });


    $(document).on('click','#non_accredited',function(){
        $('#investorList_NA').DataTable().ajax.reload();

        var post_data = {};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            data: post_data,
            url:  base_url+'backend/investors/get_na_investors_count_amt',
            success: function (result) {
                var response = $.parseJSON(result); 
                if(response.status == true){
                    $("#total_individual_investors_na").html(response.total_individual_investors_na['total']);
                    $("#individual_invest_total_na").html('$'+response.total_individual_invest_na['display_amount']+response.total_individual_invest_na['display_label_first']);

                    $("#total_active_individual_investors_na").html(response.total_active_individual_investors_na['total']);
                    $("#individual_active_invest_total_na").html('$'+response.total_active_individual_invest_na['display_amount']+response.total_active_individual_invest_na['display_label_first']);

                    $("#total_inactive_individual_investors_na").html(response.total_inactive_individual_investors_na['total']);
                    $("#individual_inactive_invest_total_na").html('$'+response.total_inactive_individual_invest_na['display_amount']+response.total_inactive_individual_invest_na['display_label_first']);


                    $("#total_functional_investors_na").html(response.total_functional_investors_na['total']);
                    $("#functional_invest_total_na").html('$'+response.total_functional_invest_na['display_amount']+response.total_functional_invest_na['display_label_first']);

                    $("#institutional_investors_na").html(response.total_institutional_investors_na['total']);
                    $("#institutional_invest_total_na").html('$'+response.total_institutional_invest_na['display_amount']+response.total_institutional_invest_na['display_label_first']);

                    $("#total_wholeloan_investors_na").html(response.total_whole_loan_investors_na['total']);
                    $("#total_wholeloan_investment_total_na").html('$'+response.total_whole_loan_invest_na['display_amount']+response.total_whole_loan_invest_na['display_label_first']);



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
            url:  base_url+'backend/investors/get_ac_investors_count_amt',
            success: function (result) {
                var response = $.parseJSON(result); 
                if(response.status == true){
                    $("#total_individual_investors").html(response.total_individual_investors['total']);
                    $("#individual_invest_total").html('$'+response.total_individual_invest['display_amount']+response.total_individual_invest['display_label_first']);

                    $("#total_active_individual_investors").html(response.total_active_individual_investors['total']);
                    $("#individual_active_invest_total").html('$'+response.total_active_individual_invest['display_amount']+response.total_active_individual_invest['display_label_first']);

                    $("#total_inactive_individual_investors").html(response.total_inactive_individual_investors['total']);
                    $("#individual_inactive_invest_total").html('$'+response.total_inactive_individual_invest['display_amount']+response.total_inactive_individual_invest['display_label_first']);


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
        
        window.location.href = base_url + "backend/investors/export_individual?search="+search+"&date_range="+date_range+"&from_date="+from_date+"&to_date="+to_date;
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
        
        window.location.href = base_url + "backend/investors/export_individual_na?search="+search_na+"&date_range="+date_range_na+"&from_date="+from_date_na+"&to_date="+to_date_na;
    });


    

});

var ShwPnl = false;
function ShwLoadingPanel()
{
    if(!ShwPnl)
    {
        var lDPnl = jQuery(document.createElement('div'))
        lDPnl.attr("id","loadingPnl");    
        lDPnl.attr("class","animsition-loading");    
        lDPnl.css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px").css("opacity",0);
        lDPnl.css("background","url("+base_url+"images/ajax-loader.gif) no-repeat center rgba(255, 255, 255, 0.4)").css("position","fixed").css("left","0px").css("top","0px").css("z-index","10000");
        jQuery(lDPnl).appendTo("body");
        lDPnl.fadeTo(550, 1);
        ShwPnl = true;
    }
    else
        jQuery("#loadingPnl").fadeIn(550);
}
        
function remvLoadingPanel()
{
    jQuery("#loadingPnl").fadeOut(100);
}