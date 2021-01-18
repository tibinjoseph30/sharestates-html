var base_url = $("#base-url-1").val();
$(document).ready(function(){


    $("#date_of_birth").datepicker({
       todayHighlight: true,
       endDate: '-18y', 
       startDate: '01/01/1950',
       autoclose : true ,
       default : 'MM/DD/YYYY' 
    });

    $("#background_check_date").datepicker({
        startDate: '01/01/1950',
        autoclose : true ,
        default : 'MM/DD/YYYY', 
        endDate: "+0d"
    });

    $('#social_security_number').keypress(function () {
        $("#social_security_number").mask("999-99-99999");
    });

    $("#social_security_number").change(function(){
        var va = $(this).val();
        $("#social_security_number_hid").val(va);
    });

    var cid = $("#country").val();
    // alert(cid);
    if(cid!='226'){
        $("#phone_code").show();
        $("#phone").hide();
        $("#us-check").show();
        
        $(".us_state").hide();
        $(".foreign_state").show();

    } else {
        $("#phone").show();
        $("#phone_code").hide();
        $("#us-check").hide();
        
        $(".us_state").show();
        $(".foreign_state").hide();
    }

    $("#country").change(function(){
        var cid = $(this).val();

        if(cid!='226') {
            // alert(cid);
            $(".us_state").hide();
            $(".foreign_state").show();
            var post_data = {name:cid};
            post_data[global_csrf_token_name]= global_csrf_token_value;
            $.ajax({
                type:"POST",
                dataType:"json",
                data:post_data,
                url:base_url + "backend/investors/select_country",
                success:function(response) {
                    $("#phone").hide();
                    $("#phone_code").show();
                    $("#us-check").show();
                    $("#user_phone_code").val("+"+response.phonecode);
                    
                }
            });

        } else {
            $("#phone").show();
            $("#phone_code").hide();
            $("#us-check").hide();
            
            $(".us_state").show();
            $(".foreign_state").hide();
            
        }

    });

    
    $("#user-account-form").validate({
        onkeyup: false,
        // ignore : false,
        ignore:":not(:visible)",
        rules: {
            first_name:{required:true},
            last_name:{required:true},
            user_email:{
                required:true,
                email: true,
                check_email_exist:true
            },
            user_phone:{
                required: true,
                phonecheck: true
            },
            user_phone2:{
                required: true,
                phonecheck: true
            },
            user_password:{
                required:true,
                pwcheck: true
            },
            confirm_password:{
                required:true,
                equalTo: "#user_password"
            },
            social_security_number:{
                required:true,
                // ssncheck:true
            },
            user_address1:{required:true},
            user_zip_code:{
                required:true,
                validate_zip_code:true,
                number: true,
                maxlength: 5,
                minlength:5
            },
            country:{required:true},
            investor_type:{required:true},

        },
        messages: {
            first_name:{required:"First Name is required"},
            last_name:{required:"Last Name is required"},
            user_email:{
                required:"Email is required",
                email:"Please enter a valid email address.",
                check_email_exist:"This email already exists please use another one.",
            },
            user_phone:{
                required:"Phone Number is required",
                phonecheck:"Phone number is invalid."
            },
            user_phone2:{
                required:"Phone Number is required",
                phonecheck:"Phone number is invalid."
            },
            user_password: {
              required: "Password is required.",
              pwcheck:"Passwords must have at least one uppercase letter and lowercase letter and digit character and at least 8 character."
            },
            confirm_password: {
              required: "Confirm password is required.",
              equalTo:"Password and confirmation password do not match."
            },
            social_security_number:{
                required:"SSN is required",
                // ssncheck:"SSN is invalid"
            },
            user_address1:{required:"Address is required"},
            user_zip_code:{
                required:"Zip Code is required",
                validate_zip_code: "Please enter a valid Zip Code.",
                number: "Zip Code should contains numbers Only",
                minlength:"Zip Code should be in 5 digits."
            },
            country:{required:"Country is required"},
            investor_type:{required:"Investor type is required"},
        },
        errorPlacement: function(error, element) {
            if(element.is('select')){
                error.insertAfter(element.parent());
            }
            else if(element.attr("name") == 'investor_type'){
                 error.insertAfter(element.parent().closest('ul'));
            } 
            else{
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod("check_email_exist",function(value,element) {
        var userid = $('#user_id_account').val();
        var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!=email_check){
            $.ajax({
                type: "POST",
                async:false,
                url: base_url + 'backend/investors/check_email_exist',
                data: postData , 
                success: function(msg){ 
                    result = (msg == "1") ? false : true;
                }
            });
            
        }else{
            result = true;
        }
        return result;
    });

    $.validator.addMethod("phonecheck", function(value, element) {
        // var phoneDigitsOnly = value.replace(/\D/g, '');
        // var country = $(element).closest('.form-drpdown').find('.country').val();
        // if(country == '226' || country == '38'){
        //     return /^[\d\-\(\)\. ]+$/.test(value) &&
        //       /^[2-9]\d{2}[2-9]\d{6}$/.test(phoneDigitsOnly) &&
        //       !/^\d{4}11/.test(phoneDigitsOnly) &&
        //       !/^(\d)\1{2}/.test(phoneDigitsOnly) &&
        //       !RegExp(phoneDigitsOnly).test('01234567890123456789')
        // } else{
        //     return /^[\d\-\(\)\. ]+$/.test(value) &&
        //       /^\d{5}/.test(phoneDigitsOnly) &&
        //       !/^(\d)\1+$/.test(phoneDigitsOnly) &&
        //       !RegExp(phoneDigitsOnly).test('01234567890123456789')
        // }

        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
            return true;
        else
            return false;
    });

    $.validator.addMethod("ssncheck", function(value, element) {
        ein_hid = $('[name=social_security_number_hid]').val();
        if(ein_hid.match(/^\(?([0-9]{2})\)?[-. ]?([0-9]{7})$/))
            return true;
        else
            return false;
    });

    $.validator.addMethod("validate_zip_code", function(value, element) {
        var codeReg = /^(?!.*(\d)\1{4}).*$/;
        if (!codeReg.test(value)) {
           return false;
        } else {
            if (value != '') {
                var pattern = '0123456789012345789' //to match circular sequence as well.
                if (pattern.indexOf(value) == -1)
                   return true;
                else
                   return false;
            }
        }
    });

    $.validator.addMethod("pwcheck", function(value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
    });

    $('body').on('keydown', '.phone_format', function(e){   
         
        var key = e.charCode || e.keyCode || 0;
        // alert(key)
        $phone = $(this);
        // Auto-format- do not expose the mask as the user begins to type
        if (key !== 8 && key !== 9) {
            if ($phone.val().length === 3) {
                $phone.val($phone.val() + '-');
            }
            if ($phone.val().length === 7) {
                $phone.val($phone.val() + '-');
            }     
        }
        // Allow numeric (and tab, backspace, delete) keys only
        return (key == 8 || 
            key == 9 ||
            key == 46 ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)); 
    });



    $(document).on('click','#continue_acnt_details',function(e){ 
        e.preventDefault();
        var cid = $("#country").val();
        if(cid!='226') {
            $("#user_phone").rules("remove");
        } else {
            $("#user_phone2").rules("remove");
        }

        var userid = $('#user_id_account').val();
        // if(userid){
        //     $("#user_password").rules("remove");
        // } 

        var user_form_valid = $("#user-account-form").valid();
        if(user_form_valid == true){
            var form = $('#user-account-form')[0];
            var data = new FormData(form);
            var u_id = $('#user_id').val();
            ShwLoadingPanel();
            $.ajax({
                url:base_url + "backend/investors/add_user",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    var response = $.parseJSON(result);  
                    if(response.status = true){
                        if(u_id){
                            remvLoadingPanel();
                            // $(".info_tabs").show();
                            $("#user_id").val(response.user_id); 
                            $("#user_id_account").val(response.user_id);
                            $("#user_id_experience").val(response.user_id);
                            $("#user_id_preferences").val(response.user_id);
                            $("#user_id_compliance").val(response.user_id);
                            $("#user_id_identification").val(response.user_id);
                            $("#experience a" ).trigger( "click" );
                        } else{
                            window.location.href = base_url+'backend/investors/edit_users/'+response.user_id; 
                        }

                    }
                }
            });
        }


    });

    $(document).on('click','#change_password',function(e){ 
        var user_id = $("#user_id").val();
        $(".changepassword").modal('show');
        $(".changepassword").find('#user_id').val(user_id);
        
    });

    $("#change_pwd").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            userpassword:{
                required:true,
                pwcheck: true
            },
            confirmpassword:{
                required:true,
                equalTo: "#userpassword"
            },
        },
        messages: {
            userpassword: {
              required: "Password is required.",
              pwcheck:"Passwords must have at least one uppercase letter and lowercase letter and digit character and at least 8 character."
            },
            confirmpassword: {
              required: "Confirm password is required.",
              equalTo:"Password and confirmation password do not match."
            },

        },
        errorPlacement: function(error, element) {
                if(element.attr("name") == 'lenders_state'){
                    error.insertAfter(element.parent("div").parent("div"));
                }else{
                    error.insertAfter(element); 
                }
                
        }
    });

    $(document).on('click','#user-changepwd',function(){
        var form_valid = $("#change_pwd").valid();
        if(form_valid == true){
            $.post(base_url+'backend/investors/change_password',$("#change_pwd").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".changepassword").modal('hide');
                    swal("Updated!", "User password updated successfully.", "success");
                }else{
                     swal("Cancelled", "User password is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $("#user-experience-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            comp_rep:{required:true},
            industry:{required:true},
            // investments:{required:true},
            real_estate:{required:true},
            invest_amount:{required:true},

        },
        messages: {
            comp_rep:{required:"This field is required"},
            industry:{required:"This field is required"},
            // investments:{required:"This field is required"},
            real_estate:{required:"This field is required"},
            invest_amount:{required:"This field is required"},
        },
        errorPlacement: function(error, element) {
            if(element.is('select') ||(element.attr("name") == 'eo_date'))
                error.insertAfter(element.parent());
            else
                error.insertAfter(element);
        }
    });

    var vals = $('.investments').val();
    var tst = [];
    $("input:checkbox[name=investments]:checked").each(function () {
        var val = $(this).val();
        tst.push(val);
    });
    $('#investment').val(tst);

    $(document).on('ifChanged','.investments',function(){ 
        var vals = $(this).val();
        var tst = [];
        $("input:checkbox[name=investments]:checked").each(function () {
            var val = $(this).val();
            tst.push(val);
            // $('#validation_error2').hide(); 
        });
        $('#investment').val(tst);
        
    });


    



    $(document).on('click','#continue_experience',function(e){ 
        e.preventDefault();
        var experience_form_valid = $("#user-experience-form").valid();
        if(experience_form_valid == true){
            ShwLoadingPanel();
            var form = $('#user-experience-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/investors/add_user_experience",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    var response = $.parseJSON(result);  
                    if(response.status = true){
                        remvLoadingPanel();
                        $("#preferences a" ).trigger( "click" );
                    }
                }
            });
        }

    });

    var vals = $('.interested').val();
    var tst1 = [];
    $("input:checkbox[name=interested]:checked").each(function () {
        var val = $(this).val();
        tst1.push(val);
        //$('#validation_error2').hide(); 
    });
    $('#interest').val(tst1);

    $(document).on('ifChanged','.interested',function(){ 
        var vals = $(this).val();
        var tst = [];
        $("input:checkbox[name=interested]:checked").each(function () {
            var val = $(this).val();
            tst.push(val);
        // $('#validation_error2').hide(); 
        });
        $('#interest').val(tst);        
    });


    $(document).on('ifChanged','#check_other',function(){ 
    // $('#check_other').on('ifChanged', function(event){
        var ishold= $(this).is(':checked');
        if(ishold==true){
            $(".dis_other_cities").show();
        }else{
            $(".dis_other_cities").hide();
        }
    });

    $(".channelpublication").hide();
    var user_channel = $("#channel").val();
    var user_channel_value = $("#channel_value").val();

    if(user_channel=="search_engine"){
        $(".channelpublication").show();
    } else {
        $(".channelpublication").hide();
        $("#channel_publication").val('');            
    }

    if(user_channel=="search_engine"){
        var searchengine_options = {"Select Search Engine": "",
            "Bing": "bing",
            "Google": "google"
        };

        $("#channel_lebel").empty();
        $("#channel_lebel").html('Search Engine');

        $("#channel_publication").empty(); // remove old options
        $.each(searchengine_options, function(key, value) {
            $("#channel_publication").append($("<option></option>").attr("value", value).text(key));
        });
        $('#channel_publication option[value='+user_channel_value+']').attr('selected','selected');
    }

    $('body').on('change', '#channel', function(){
        var channel = $(this).val();
        if(channel=="search_engine"){
            $(".channelpublication").show();
        } else {
            $(".channelpublication").hide();  
            $("#channel_publication").val('');               
        }
        if(channel=="search_engine"){
              var searchengine_options = {"Select Search Engine": "",
                  "Bing": "bing",
                  "Google": "google"
              };
              $("#channel_lebel").empty();
              $("#channel_lebel").html('Search Engine');

              $("#channel_publication").empty(); // remove old options
               $.each(searchengine_options, function(key, value) {
                  $("#channel_publication").append($("<option></option>").attr("value", value).text(key));

              });
               $("#channel_publication").selectpicker('refresh'); 
        }
    });

    $("#user-preferences-form").validate({
        // onkeyup: false,
        ignore : false,
        rules: {
            type_of_financing:{required:true},
            borrower_min_exp:{required:true},
            interested:{required:true},
            channel:{required:true},
            channel_publication:{required:true},
            type_of_ltv:{required:true},
            borrower_fico:{required:true},
            cities:{required:true},

        },
        messages: {
            type_of_financing:{required:"This field is required"},
            borrower_min_exp:{required:"This field is required"},
            interested:{required:"This field is required"},
            channel:{required:"This field is required"},
            channel_publication:{required:"This field is required"},
            type_of_ltv:{required:"This field is required"},
            borrower_fico:{required:"This field is required"},
            cities:{required:"This field is required"},
        },
        errorPlacement: function(error, element) {
            if(element.is('select') ||(element.attr("name") == 'eo_date')){
                error.insertAfter(element.parent());
            } 
            else if(element.is('input')){
                 error.insertAfter(element.parent().closest('ul'));
            } 
            else{
                error.insertAfter(element);
            }
        }
    });

    $(document).on('click','#continue_preferences',function(e){ 
        e.preventDefault();

        var channel = $("#channel").val();

        if(channel!='search_engine') {
            $("#channel_publication").rules("remove");
        } else {
            $("#channel_publication" ).rules("add",{required:true,messages:{required:'This field is required'}});
        }
        var preferences_form_valid = $("#user-preferences-form").valid();
        if(preferences_form_valid == true){
            var form = $('#user-preferences-form')[0];
            var data = new FormData(form);
            ShwLoadingPanel();
            $.ajax({
                url:base_url + "backend/investors/add_user_preferences",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    var response = $.parseJSON(result);  
                    if(response.status = true){
                        remvLoadingPanel();
                        $("#compliance a" ).trigger( "click" );
                    }
                }
            });
        }

    });



    $(document).on('ifChanged','#background_check2',function(){ 
    // $('#check_other').on('ifChanged', function(event){
        var ishold= $(this).is(':checked');
        if(ishold==true){
            $('.bc_comment').show();
        }else{
            $('.bc_comment').hide();
        }
    });

    $("#user-compliance-form").validate({
        // onkeyup: false,
        ignore : false,
        rules: {
            background_check_date:{required:true},
            background_check:{required:true},
            // background_comment:{required:true},

           

        },
        messages: {
            background_check_date:{required:"This field is required"},
            background_check:{required:"This field is required"},
            // background_comment:{required:"This field is required"},
            
           
        },
        errorPlacement: function(error, element) {
            if(element.is('select') ||(element.attr("name") == 'eo_date')){
                error.insertAfter(element.parent());
            } 
            else if(element.is('input')){
                 error.insertAfter(element.parent().closest('ul'));
            } 
            else{
                error.insertAfter(element);
            }
        }
    });

    $(document).on('click','#continue_compliance',function(e){ 
        e.preventDefault();
       
        var compliance_form_valid = $("#user-compliance-form").valid();
        if(compliance_form_valid == true){
            var form = $('#user-compliance-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/investors/add_user_compliance",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    var response = $.parseJSON(result);  
                    if(response.status = true){
                        $("#identification a" ).trigger( "click" );
                    }
                }
            });
        }

    });

    $(document).on('click','#continue_identification',function(e){ 
        e.preventDefault();
       
        // var compliance_form_valid = $("#user-identification-form").valid();
        // if(compliance_form_valid == true){
            var form = $('#user-identification-form')[0];
            var data = new FormData(form);
            ShwLoadingPanel();
            $.ajax({
                url:base_url + "backend/investors/add_user_identification",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    var response = $.parseJSON(result);  
                    if(response.status = true){
                        remvLoadingPanel();
                        $("#accountdetails a" ).trigger( "click" );
                    }
                }
            });
        // }

    });


    var table;
    $(document).on('click','#funding_sources',function(e){ 
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        ShwLoadingPanel();
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/get_funding_source',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
                $('#VendorBrokerList').html(response.funding_source_html);
                $('[data-toggle="tooltip"]').tooltip();

                table = $('#VendorBrokerList').DataTable({
                   "columnDefs": [{
                        // "visible": false,
                        // "targets": 2
                        "orderable": false, "targets": 0,

                    }],
                    "order": [
                        [2, 'desc']
                    ],
                    "displayLength": 25,
                    "bDestroy": true
                });
                $("#VendorBrokerList_length").hide();
            }
        });

    });

    $(document).on('click','#add_funging_source',function(e){ 
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/add_bankaccount',
            data: post_data,
            dataType: "json",
            success: function (response) {
                $('.fs_modal').html(response.fs_edit_html);
                $('#funding_sources_modal').modal('show');
                $("#user_identification").selectpicker('refresh');
                $("#bank_acc_type").selectpicker('refresh');
            }
        });

    });

    $(document).on('click','.fs_edit',function(e){

        var bank_id = $(this).attr('alt'); 
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id, bank_id:bank_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/add_bankaccount',
            data: post_data,
            dataType: "json",
            success: function (response) {
                $('.fs_modal').html(response.fs_edit_html);
                $('#funding_sources_modal').modal('show');
                $("#user_identification").selectpicker('refresh');
                $("#bank_acc_type").selectpicker('refresh');
            }
        });

    });

    $(document).on('click','#fs_delete',function(){
        var bank_id = $(this).attr('alt');
        var user_id = $("#user_id").val(); 
        // var type = $(this).attr('data-type');
        status_update({'bank_id':bank_id,'user_id':user_id,'csrf_test_name':global_csrf_token_value,},base_url+'backend/investors/delete_account_stat',"Do you really want to delete this user?","User delete successfully.","User could not be deleted",'VendorBrokerList');
    });



    var table;
    $(document).on('click','#investment_accounts',function(e){ 
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        ShwLoadingPanel();
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/get_investment_accounts',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
                $('#investmentaccounts').html(response.investment_accounts_html);
                table = $('#investmentaccounts').DataTable({
                   "columnDefs": [{
                        // "visible": false,
                        // "targets": 2
                        // "orderable": false, "targets": 0,
                        'bSortable' : false,
                        'aTargets' : [0,3]

                    }],
                    // "order": [
                    //     [0, 'desc']
                    // ],
                    "displayLength": 25,
                    "bDestroy": true
                });

                $("#investmentaccounts_length").hide();

                if(response.result_count <= 10){
                    $("#investmentaccounts_paginate").hide();
                    $("#investmentaccounts_info").hide();
                }
                $('[data-toggle="tooltip"]').tooltip(); 
            }
        });

    });

    $(document).on('click','#add_inv_accounts',function(e){ 
        $('.ia_modal').html('');
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/add_investment_accounts',
            data: post_data,
            dataType: "json",
            success: function (response) {
                // initAutocomplete();

                $('.ia_modal').html(response.ia_edit_html);
                $('#investment_accountsModal').modal('show');
                $("#account_type").selectpicker('refresh');
                $("#e_entityType").selectpicker('refresh');
                $("#e_month").selectpicker('refresh');
                $("#e_day").selectpicker('refresh');
                $("#e_year").selectpicker('refresh');
                $("#e_state").selectpicker('refresh');
                $("#joint_ac_type").selectpicker('refresh');
                $("#j_month2").selectpicker('refresh');
                $("#j_day2").selectpicker('refresh');
                $("#j_year2").selectpicker('refresh');
                $("#j_state2").selectpicker('refresh');
                $("#t_juri").selectpicker('refresh');
                $("#t_day").selectpicker('refresh');
                $("#t_year").selectpicker('refresh');
                $("#t_month").selectpicker('refresh');
                $("#t_state").selectpicker('refresh');
            }
        });

    });
    $(document).on('click','#servicefeeInvwaiver',function(e){
        
        var user_id = $(this).attr('data-sub_id');
        //alert(user_id)
        $('#sub_user_id').val(user_id);
        $("#service_fee a" ).trigger("click");
    });

    $(document).on('click','.iv_edit',function(e){
        $('.ia_modal').html('');
        var sid = $(this).attr('data-sub_id');
        var pid = $(this).attr('data-user_id');
        var post_data = {sid:sid, user_id : pid};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/add_investment_accounts',
            data: post_data,
            dataType: "json",
            success: function (response) {
                $('.ia_modal').html(response.ia_edit_html);
                $('#investment_accountsModal').modal('show');

                $("#account_type").selectpicker('refresh');
                $("#e_entityType").selectpicker('refresh');
                $("#e_month").selectpicker('refresh');
                $("#e_day").selectpicker('refresh');
                $("#e_year").selectpicker('refresh');
                $("#e_state").selectpicker('refresh');
                $("#joint_ac_type").selectpicker('refresh');
                $("#j_month2").selectpicker('refresh');
                $("#j_day2").selectpicker('refresh');
                $("#j_year2").selectpicker('refresh');
                $("#j_state2").selectpicker('refresh');
                $("#t_juri").selectpicker('refresh');
                $("#t_day").selectpicker('refresh');
                $("#t_year").selectpicker('refresh');
                $("#t_month").selectpicker('refresh');
                $("#t_state").selectpicker('refresh');
            }
        });

    });


    $(document).on('click','#auto_withdraw',function(e){
        ShwLoadingPanel(); 
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/get_auto_withdraw',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
                $('#aw_content').html(response.aw_html);
            }
        });

    });

    

    // $('input[name="RequestType"]').click(function () {
     // $(document).on('click','.requesttype',function(e){
    $(document).on('ifChecked','.requesttype',function(){
        $(".autowithdraw_success").html('');
        var divvalue = $(this).val();
        if(divvalue==1){
            $('.account_div').show();
            $('.project_div').hide();
            $('.bulk_div').hide();
        }else if(divvalue==3){
            $('.bulk_div').show();
            $('.project_div').hide();
            $('.account_div').hide();
        }else{
            $('.account_div').hide();
            $('.project_div').show();
            $('.bulk_div').hide();
        }
    });

    
    /*$(document).on('click','.owl-item',function(){
        //alert("dfdfd")
       var servalue = $(this).find('.serviceFeeclass').attr('id');;
       if(servalue=='service_fee'){

        var main_user_id = $("#user_id").val();
        $('#sub_user_id').val(main_user_id);
       }
    });*/
    $(document).on('click','#service_fee',function(e){
    
      if(e.which==1){
        var main_user_id = $("#user_id").val();
        $('#sub_user_id').val(main_user_id); 
      }
     
        var user_id      = $("#sub_user_id").val();
       // alert(user_id)
        var main_user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        ShwLoadingPanel();
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/get_service_fee_waiver',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
               // $('#sub_user_id').val(user_id);
                $('#Investment-Service-Fee-Overrides').html(response.isfo_html);

            }
        });

    });



    $(document).on('click','#box_settings',function(e){
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        ShwLoadingPanel();
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/get_box_setting',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
                $('#box_setting_div').html(response.box_html);
                $("#service_provider").selectpicker('refresh');
            }
        });

    });


    $(document).on('click','#portfolio',function(e){
        ShwLoadingPanel();
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investor_portfolio/portfolio_new_ajax',
            data: post_data,
            dataType: "json",
            success: function (response) {
                if(response.status == true){
                    remvLoadingPanel();
                    
                    $('#profile2').html(response.portfolio_html);

                    
                }
            }
        });

    });

    $(document).on('click','#log_tab',function(e){
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        ShwLoadingPanel();
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/get_logs',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
                $('#log').html(response.log_html);
            }
        });

    });

    $(document).on('click','#credboxcriteriapage',function(e){
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        ShwLoadingPanel();
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/get_cred_box_criteria',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
                $('#Cred-Box-Criteria-page').html(response.cred_box_html);
            }
        });

    });

    $(document).on('click','#c_b_c_term',function(e){
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        ShwLoadingPanel();
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/investors/get_cred_box_criteria_term',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
                $('#Cred-Box-Criteria-term-page').html(response.cred_box_term_html);
            }
        });

    });

    $(document).on('click','#accreditation_tb',function(e){
        get_accreditation_data();

    });

    function get_accreditation_data(status){
        var status = status;
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        ShwLoadingPanel();
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/accreditation/get_user_docs',
            data: post_data,
            dataType: "json",
            success: function (response) {
                remvLoadingPanel();
                $('#accreditation').html(response.html);
                $("#accreditation-form").validate({
                    onkeyup: false,
                    ignore : false,
                    rules: {

                        
                        doc_name:{required:true},
                        accreditation_doc: {required:true},
                        //accreditation_doc:{required:true,equalTo : "#new_password"},
                        
                    },
                    messages: {
                        doc_name:{required:"Document Name is required"},
                        accreditation_doc: {required:"Please select a file"},
                        
                    },
                    errorPlacement: function(error, element) {
                           
                        if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
                            $(element).closest('.form-group').append(error);
                        }else if(element.attr("name")=='doc_name' || element.attr("name")=='accreditation_doc'){
                            $(element).closest('.form-group').append(error);
                            //$(element).closest('.input-group').append(error);
                        } else{
                            error.insertAfter(element);
                        } 
                    }

                });
                if(status ==1){
                    var personal_html ='<p class="text-success">Document  has been successfully uploaded.</p>';
                    $('#acc-info-sec-msg').html(personal_html);
                    $('#acc-info-sec-msg').show();
                    setInterval(function(){ $('#acc-info-sec-msg').html(''); }, 5000)
                }
            }
        });

    }

    $(document).on('click','#save-accreditation',function(){
        var valid_accreditation = false;
        var valid_accreditation_form = $("#accreditation-form").valid();
        if(valid_accreditation_form == false){
            return false;
        }else{
            valid_accreditation = true;
        }

        if(valid_accreditation == true){
            ShwLoadingPanel();
            var data = new FormData($('#accreditation-form')[0]);
            $.ajax({
                url: base_url + "backend/accreditation/save_docs",
                type: "POST",
                data: data,
                contentType: false,
                cache: false,
                processData: false,
                success: function(response){
                    //remvLoadingPanel();
                    var response_data = $.parseJSON(response);
                    if(response_data.status == true){
                        get_accreditation_data(1);

                        /*var personal_html ='<p class="text-success">Personal Info has been successfully saved.</p>';
                        $('#acc-info-sec-msg').html(personal_html);
                        $('#acc-info-sec-msg').show();
                        setInterval(function(){ $('#acc-info-sec-msg').html(''); }, 5000);*/
                        
                    }

                }
            });  
        }
    });

    $(document).on('click','#approve-accredit',function(){
        var user_id = $("#user_id").val();
        var post_data = {user_id : user_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;

        var request_url = base_url + "backend/accreditation/approve";
        swal({   
                title: "Are you sure?",   
                text: "Would you like to verify this user?",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Yes, approve",   
                cancelButtonText: "No, cancel",   
                closeOnConfirm: false,   
                closeOnCancel: true 
            }, function(isConfirm){ 

            if (isConfirm) {

                $.ajax({
                    url:request_url,
                    type: 'POST',
                    data: post_data, 
                    dataType: 'json',
                    success: function(response){
                        swal("Approved!", "Accreditation Status  is approved successfully", "success");   
                        get_accreditation_data(); 


                    }
                });
               
                   
            } else {     
                swal("Cancelled","", "error");   
            } 
        });
    });


    $(document).on('click','.self-doc-delete',function(){
        var user_id = $("#user_id").val();
        var doc_id = $(this).attr('data-id');
        var doc_name = $(this).attr('data-docname');
        var post_data = {user_id : user_id};
        post_data['doc_id'] = doc_id;
        post_data['doc_name'] = doc_name;
        post_data[global_csrf_token_name]= global_csrf_token_value;

        var request_url = base_url + "backend/accreditation/delete_document";
        swal({   
                title: "Are you sure?",   
                text: "Do you want to delete this document?",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "Yes delete it!",   
                cancelButtonText: "No, cancel",   
                closeOnConfirm: false,   
                closeOnCancel: true 
            }, function(isConfirm){ 

            if (isConfirm) {

                $.ajax({
                    url:request_url,
                    type: 'POST',
                    data: post_data, 
                    dataType: 'json',
                    success: function(response){
                        swal("Approved!", "Document  is deleted successfully", "success");   
                        get_accreditation_data(); 


                    }
                });
               
                   
            } else {     
                swal("Cancelled","", "error");   
            } 
        });
    });

});


$(document).on('click','#save_cred',function(e){
    e.preventDefault();
    $("#eligibility_criteria_form").valid();
    $("#risk_type_err").html('');
    var min_size = $("#minimum_loan_size").val();
    min_size = parseFloat(min_size.replace(/[^0-9-.]/g, ''));
    var max_size = $("#maximum_loan_size").val();
    max_size = parseFloat(max_size.replace(/[^0-9-.]/g, ''));
    var min_invest = $("#min_invest").val();
    var flag1 = 0;

    if(max_size<min_size){
        $("#err-labl2").remove();
        $("#maximum_loan_size").parent().append('<label class="error" id="err-labl2">Maximum Loan Size should be greater than Minimum Loan Size.</label>');
        $('#maximum_loan_size').focus();
        flag1=1;
        return false;
    }

    // var num1 = $("#eligibility_criteria input:checked").length;
    // if(num1==0){
    //     $("#risk_type_err").html('Please choose one option');
    //     $("#risk_type_err").show();
    //     flag1=1;
    //     return false;
    // }

    if(flag1==0) {   
        if($('#eligibility_criteria_form').valid()) {
            $("#save_invest").attr("disabled", true);
            // $('#eligibility_criteria_form').submit();

            ShwLoadingPanel();
            var form = $('#eligibility_criteria_form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/investors/add_eligibility_criteria",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    remvLoadingPanel();
                    var response = $.parseJSON(result);  
                    if(response.status = true){
                        $("#credboxcriteriapage a" ).trigger( "click" );
                    }
                }
            });


        }
    }
});

$(document).on('ifChanged','#investment8',function(){
    var noa= $(this).is(':checked');
    if(noa==true){
        $('.investments').iCheck('uncheck');
    }
});

$(document).on('ifChanged','.investments',function(){
    var noa= $(this).is(':checked');
    if(noa==true){
        $('#investment8').iCheck('uncheck');
    }
});


$(document).on('click','#save_cred_term',function(e){
    e.preventDefault();

    if($('#long_term_form').valid()) {
        $("#save_invest").attr("disabled", true);
        // ShwLoadingPanel();
        var form = $('#long_term_form')[0];
        var data = new FormData(form);
        $.ajax({
            url:base_url + "backend/investors/add_term_eligibility_criteria",
            enctype: 'multipart/form-data',
            processData: false,  // Important!
            contentType: false,
            cache: false,
            data: data,       
            type:'POST',
            success:function(result){
                // remvLoadingPanel();
                var response = $.parseJSON(result);  
                if(response.status = true){
                    $("#c_b_c_term a" ).trigger( "click" );
                }
            }
        });


    }
});
    

$(document).on('click','#baserate_btn',function(e){
    e.preventDefault();
    var base_rate_form = $("#base_rate_form").valid();
    if(base_rate_form == true){
        ShwLoadingPanel();
        var form = $('#base_rate_form')[0];
        var data = new FormData(form);
        $.ajax({
            url:base_url + "backend/investors/base_rate_waive",
            enctype: 'multipart/form-data',
            processData: false,  // Important!
            contentType: false,
            cache: false,
            data: data,       
            type:'POST',
            success:function(result){
                var response = $.parseJSON(result);  
                if(response.status = true){
                    remvLoadingPanel();

                    // msg = $('#baserate_error');
                    // msg.show();
                    // msg.css('color','green');
                    // msg.html('Data updated successfully');
                    // setTimeout(function() {
                    //     msg.hide();
                    // }, 2000);

                    // $("#baserate_error").html('Data updated successfully');
                    $("#service_fee" ).trigger( "click" );
                    $("#service_fee_override a" ).trigger( "click" );
                }
            }
        });
    }

});

$(document).on('click','#save_ancillary_settings',function(e){
    e.preventDefault();
    ShwLoadingPanel();
    var form = $('#ancillary_fee_form')[0];
    var data = new FormData(form);
    $.ajax({
        url:base_url + "backend/investors/change_user_fee",
        enctype: 'multipart/form-data',
        processData: false,  // Important!
        contentType: false,
        cache: false,
        data: data,       
        type:'POST',
        success:function(result){
            remvLoadingPanel();
            var response = $.parseJSON(result);
            // msg = $('#ancillary_fee_msg');
            // msg.show();
            // if(response.status){
            //     msg.css('color','green');
            //     msg.html(response.response);
            //     setTimeout(function() {
            //         msg.hide();
            //     }, 2000);
            // } else{
            //     msg.css('color','red');
            //     msg.html(response.response);
            // }

            // if(response.status = true){
            //     $("#baserate_error").html('Data updated successfully');
            //     $("#service_fee_override a" ).trigger( "click" );
            // }
        }
    });

});



$(document).on('click','#save_fs',function(e){ 
    e.preventDefault();
   
    var fs_form_valid = $("#bank_account_form").valid();
    if(fs_form_valid == true){

        var form = $('#bank_account_form')[0];
        var data = new FormData(form);
        $.ajax({
            url:base_url + "backend/investors/add_funding_source",
            enctype: 'multipart/form-data',
            processData: false,  // Important!
            contentType: false,
            cache: false,
            data: data,       
            type:'POST',
            success:function(result){
                var response = $.parseJSON(result);  
                if(response.status = true){
                    $("#funding_sources" ).trigger( "click" );
                    $('#funding_sources_modal').modal('hide');
                }
            }
        });
    }

});

$(document).on('click','#cancel_fs',function(e){ 
    $('#funding_sources_modal').modal('hide');
});


$(document).on('click','#save_inv_acct',function(e){ 
    e.preventDefault();
    var form_inv = $("#form_master_sub").valid();
    if(form_inv == true){
        var form = $('#form_master_sub')[0];
        var data = new FormData(form);
        $.ajax({
            url:base_url + "backend/investors/my_sub_account",
            enctype: 'multipart/form-data',
            processData: false,  // Important!
            contentType: false,
            cache: false,
            data: data,       
            type:'POST',
            success:function(result){
                var response = $.parseJSON(result);  
                if(response.status = true){
                    $("#investment_accounts" ).trigger( "click" );
                    $('#investment_accountsModal').modal('hide');
                }
            }
        });
    }
});


$(document).on('click','.inv_user_delete',function(){
    var user_id = $(this).attr('data-user_id');
    var pid     = $(this).attr('data-pid');
    // var type = $(this).attr('data-type');
    status_update({'user_id':user_id,'pid':pid,'csrf_test_name':global_csrf_token_value},base_url+'backend/investors/del_user_ac',"Do you really want to delete this user?","User delete successfully.","User could not be deleted",'investmentaccounts');
});

function validateFloatKeyPress(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

$(document).on('click','.subStatus',function(e){
    var userId = $(this).attr('rel');
    var bankId = $(this).closest('.statdet').prev('td').find('.bankid_account').val();
   
    var radios = 'N';
    if($(this).is(":checked")){
        var radios = 'Y';
    }
    if(bankId=="" && radios=='Y'){
        alert("please Select a bank")
        return false;

    /*swal({   
        title: "Alert",   
        text: 'please Select a bank',   
        type: "warning",   
        // showCancelButton: true,   
        confirmButtonColor: "#f59522",   
        confirmButtonText: "Yes update it!",   
        cancelButtonText: "No, cancel",   
        closeOnConfirm: false,   
        closeOnCancel: true 
    }, function(isConfirm){ 

        if (isConfirm) {
            // alert("please Select a bank")
            return false;
        } else {     
            swal("Cancelled", error_msg, "error");   
        } 
    });*/









    }
});

$('body').on('click', '.subprojectStatus', function() {
    var bankId    = $(this).closest('.statprojectdet').prev('td').find('.bankid_account').val();
    var radios = 'N';
    if($(this).is(":checked")){
        var radios = 'Y';
    }
    if( bankId=="" && radios=='Y'){
        alert("Please select a bank account");
        return false;
    }
});

$(document).on('click','#project_submit_btn',function(e){
    ShwLoadingPanel();
    var post_data   = new FormData($('#auto_with_project')[0]);
    $.ajax({
        type: "post",
        dataType: "json",
        data: post_data,
        url: base_url + 'backend/investors/save_project_account',
        cache: false,
        contentType: false,
        processData: false,
        success: function(res) {
            if(res.succes=="success"){
                remvLoadingPanel();
                $(".autowithdraw_success").html('Your account has been updated successfully.');
                $('html, body').animate({
                    scrollTop: $('#aw_content').offset().top - 20
                }, 'slow');
            
            }
        }

    });
});

$(document).on('click','#account_submit_btn',function(e){
    var post_data   = new FormData($('#auto_with_account')[0]);
    $.ajax({
        type: "post",
        dataType: "json",
        data: post_data,
        url: base_url + 'backend/investors/save_user_account',
        cache: false,
        contentType: false,
        processData: false,
        success: function(res) {
            if(res.succes=="success"){
            $(".autowithdraw_success").html('Your account has been updated successfully.');
            $('html, body').animate({
                scrollTop: $('#aw_content').offset().top - 20
            }, 'slow');

            }
        }
    });
});

$(document).on('click','#bulk_submit_btn',function(e){
    var post_data   = new FormData($('#auto_with_bulk')[0]);
    $.ajax({
        type: "post",
        dataType: "json",
        data: post_data,
        url: base_url + 'backend/investors/save_bulk_account',
        cache: false,
        contentType: false,
        processData: false,
        success: function(res) {
            if(res.succes=="success"){
                $(".autowithdraw_success").html('Your account has been updated successfully.');
                $('html, body').animate({
                    scrollTop: $('#aw_content').offset().top - 20
                }, 'slow');

            }
        }

    });
});

$(document).on('click','#news_submit',function(e){
    e.preventDefault();
    var override_status = $('input[name=override_status]:checked').val();
    var flag = 0;
    var num = 0;
    if(override_status=="Over"){
        $(".section2 .percentage").each(function(e){
            if($(this).val() < 7 && $(this).val()!='' && $(this).val()!=0) {
                $(this).css('border-color','red');
                $(this).focus();
                flag = 1;
            }else{
                $(this).css('border-color','');
            }
            if($(this).val()=='' && $(this).val()==0){
                num++;
            }
        });
    }else{
        flag = 0;
    }

    if(num==23){
        flag = 1;
        $("#error_over_ride").html('Please enter override percentage');
        $('html, body').animate({
            scrollTop: $('.error').offset().top - 20
        }, 'slow');
        return false;
    }

    if(flag==0){
        $("#error_span").hide();
        var form = $('#service_fee_waiver_form')[0];
        var data = new FormData(form);
        $.ajax({
            url:base_url + "backend/investors/save_service_fee_waiver",
            enctype: 'multipart/form-data',
            processData: false,  // Important!
            contentType: false,
            cache: false,
            data: data,       
            type:'POST',
            success:function(result){
                var response = $.parseJSON(result);  
                if(response.status = true){
                    $("#service_fee" ).trigger( "click" );
                }
            }
        });

    }else{
        //$('#user_servicefee_override').focus();
        $("#error_over_ride").html('Please enter override percentage greater than 6.99');
        $('html, body').animate({
            scrollTop: $('.error').offset().top - 20
        }, 'slow');
    }
});

$(document).on('ifChanged','#closingPackage',function(){ 
// $('#check_other').on('ifChanged', function(event){
    var ishold= $(this).is(':checked');
    if(ishold==true){
        $('.closingpkgdocs').show();
    }else{
        $('.closingpkgdocs').hide();
    }
});


$(document).on('click','.save_docs',function(e){

    var user_id = $(this).data('id');

    var row_uwdocs = $('input[name="underwriting_docs[]"]:checked');
    var uwdocs = [];
    row_uwdocs.each(function( index, el ) {
        uwdocs.push($(el).val());
    });
    var underwritingdocs = uwdocs.join(',');


    var row_cdocs = $('input[name="closing_docs[]"]:checked');
    var cdocs = [];
    row_cdocs.each(function( index, el ) {
        cdocs.push($(el).val());
    });
    var closingdocs = cdocs.join(',');

    var service_provider = $('#service_provider').val();
    var user_name = $('#user_name').val();
    var password = $('#password').val();
    var user_email = $('#user_email').val(); 

    postData = { user_id:user_id,
        underwriting_docs:underwritingdocs,
        closing_docs:closingdocs,
        service_provider:service_provider,
        user_name:user_name,
        password:password,
        user_email:user_email
    };
    postData[global_csrf_token_name]= global_csrf_token_value;

    $.ajax({
        type: "POST",
        dataType:"json",
        async:false,
        data:postData,
        url: base_url+'backend/investors/save_box_doc_detais',
        success:function(result){
            var response = $.parseJSON(result);  
            if(response.status = true){
                $("#box_settings" ).trigger( "click" );
            }
        }
    });

});




// search with dates
// $(document).on('ifChanged','.date_range',function(){ 

//     alert(1);

//     investor_loan_list(status_array,type_array);
//     var post_data = {user_id:status_array,type:type_array,year:year,main_user_id:main_user_id};
//     post_data[global_csrf_token_name]= global_csrf_token_value;
//     var investUrl = baseURL + 'backend/investor_portfolio/invest_list';
//     get_invest_list(post_data, investUrl);
// });








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