var base_url = $("#base-url-1").val();
$(document).ready(function(){

	$(".channelpublication").hide();
    $(".channelpublicationtext").hide();
	var user_channel = $("#channel").val();

  	if(user_channel == "search_engine"){
        $(".channelpublication").show();
        $(".channelpublicationtext").hide();
        $("#channel_publication_text").val('');
    } else if(user_channel==""){
        $(".channelpublication").hide();
        $(".channelpublicationtext").hide();
        $("#channel_publication").val('');
        $("#channel_publication_text").val('');
    } else {
        $(".channelpublication").hide();
        $("#channel_publication").val('');
        $(".channelpublicationtext").show();
    }

	$('body').on('change', '#channel', function(){
        $("#channel_publication_text").val('');
     	var channel = $(this).val();
     	if(channel=="search_engine"){
            $(".channelpublication").show();
            $(".channelpublicationtext").hide();
            $("#channel_publication_text").val('');
        } else if(channel==""){
            $(".channelpublication").hide();
            $(".channelpublicationtext").hide();
            $("#channel_publication").val('');
            $("#channel_publication_text").val('');
        } else {
            $(".channelpublication").hide();
            $("#channel_publication").val('');
            $(".channelpublicationtext").show();            
        }
  	});

    $('body').on('change', 'select', function(){
        val = $(this).val();
        if(val.length){
            // $(this).parent().children('label.error').hide();
            $(this).parent().parent().children('label.error').hide();
        }
    });


	function AllowNumbersOnly(e) {
	    var code = (e.which) ? e.which : e.keyCode;
	    if (code > 31 && (code < 48 || code > 57)) {
	        e.preventDefault();
	    }
	}

	$('#ein').keypress(function () {
	    $("#ein").mask("99-9999999");
	});

	$("#ein").change(function(){
	    var va = $(this).val();
	    $("#ein_hid").val(va);
	});

	$("#ein").blur(function(){
	    var val1 = $("#ein_hid").val();
	    var last = val1.slice(0,-4);
	    var last2 = val1.slice(-4);
	    hidden = val1.replace(/./gi, "*"); 
	    if(hidden.length > 10) hidden = hidden.substring(0,10);
	    $(this).val(hidden);
	    if(val1!=''){
	      
	    }
	});

	// Date Picker
    jQuery('.mydatepicker,#datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
    });
    $('.icon-calender').click(function() {
        $(this).closest('div').prev().focus();
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

	$("#add-contractor-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			businessname:{required:true},
			firstname:{required:true},
			lastName:{required:true},
			address:{required:true},
			city:{required:true},
			state:{required:true},
			zipcode:{required:true,validate_zip_code:true,number: true,maxlength: 5,minlength:5},
			phone:{required:true,phonecheck:true
                // check_phone_exist:true
            },
			email:{required:true,email: true,
                check_email_exist:true
            },
            ein:{required:true, minlength:10},
            channel:{required:true},
            channel_publication:{required: function (element) {
                    var channel = $("#channel").val();  
                    if(channel=="search_engine"){
                        var e = $("#channel_publication").val();
                        if(e==""){
                            return true; 
                        }else{
                            return false;
                        }                           
                    }else{
                        return false;
                    } 
                }  
            },
            channel_publication_text:{required: function (element) {
                    var channel = $("#channel").val();  
                    if(channel!="search_engine"){
                        var e = $("#channel_publication_text").val();
                        if(e==""){
                            return true; 
                        }else{
                            return false;
                        }                           
                    }else{
                        return false;
                    } 
                }  
            }
		},
		messages: {
			businessname:{required:"Contractor‘s Business Name is required"},
			firstname:{required:"First Name is required"},
			lastName:{required:"Last Name is required"},
			address:{required:"Address is required"},
			city:{required:"City is required"},
			state:{required:"State is required"},
			zipcode:{required:"Zip Code is required",
              		validate_zip_code: "Please enter a valid Zip Code.",
              		number: "Zip Code should contains numbers Only.",
                    minlength:"Zip Code should be 5 digits."},
			phone:{required:"Phone Number is required",
              		phonecheck:"Phone number is invalid."
              		// check_phone_exist:"This Phone already exists please use another one."
                },
			email:{required:"Email is required",
					email:"Please enter a valid email address.",
              		check_email_exist:"This email already exists please use another one."
                },
            ein:{required:"EIN is required",
                    minlength:"EIN is invalid"
                },
            channel: {required:"Please select Channel"},
            channel_publication:{channel_check:"Please select Channel Publication"},
            channel_publication_text:{required:"Source is required"}

		},
		errorPlacement: function(error, element) {
            if(element.is('select'))
                error.insertAfter(element.parent());
            else
				error.insertAfter(element);
		}
	});

	$.validator.addMethod("check_email_exist",function(value,element) {
		var userid = $('#contractor_id').val();
  		var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!==email_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url + 'backend/contractors/check_email_exist',
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

    $.validator.addMethod("eincheck", function(value, element) {
        ein_hid = $('[name=ein_hid]').val();
        if(ein_hid.match(/^\(?([0-9]{2})\)?[-. ]?([0-9]{7})$/))
            return true;
        else
            return false;
    });

    $.validator.addMethod("check_phone_exist",function(value,element) {
    	var userid = $('#appraiser_id').val();
    	var phone_check = $('#phone_check').val();
        var postData ={phone:value.replace(/\D/g, '')};
        postData[global_csrf_token_name]= global_csrf_token_value;

        if(userid=="" || value.replace(/\D/g, '')!==phone_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url+ 'backend/appraiser/check_phone_exist',
	            data: postData , 
	            success: function(msg){ 
	                result = (msg == "1") ? false : true;
	            }
	        });
	        return result;
        }
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

	// save appraiser
	$(document).on('click','#save_contractor',function(e){
		e.preventDefault(e);
        
        var appl_type = $(this).attr('data-type');
		var contractor_form_valid = $("#add-contractor-form").valid();

		if(contractor_form_valid == true){ 
            $(this).prop('disabled',true);
			var form = $('#add-contractor-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/contractors/add",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    var response = $.parseJSON(result);
                	if(result.status = true){
                        if(appl_type == 'add')
                           window.location.href = base_url+'backend/contractors';
                        else 
                            window.location.href = base_url+'backend/contractors/edit_contractor/'+response.contractor_id;
                	}
                }
            });
		}
	});
    
    $(document).on('click','#cancel_contractor',function(e){
        window.location.href = base_url+'backend/contractors';
    });

    // $(document).on('click','#app-deactivate',function(){
    //     var contractor_id = $(this).attr('data-id');
    //     var type = $(this).attr('data-type');
    //     status_update_refresh({'status':type,'contractor_id':contractor_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/contractors/change_status',"Do you really want to change status of this contractor?","Contractor status updated successfully.","Contractor status is could not be updated",'contractor-table-list');
    
    // });

        // Active - Inactive
    $("#contractor-inactive-form").validate({
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

    $(document).on('click','#app-deactivate',function(){
        $("#contractor-inactive-form")[0].reset();
        var form_valid = $("#contractor-inactive-form").validate();
            form_valid.resetForm();
        var contractor_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#contractor_id').val(contractor_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#contractor-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/contractors/change_status',$("#contractor-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    // window.location.reload();
                    swal("Updated!", "Contractor status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Contractor status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#app-activate',function(){
        var contractor_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'contractor_id':contractor_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/contractors/change_status',"Do you really want to change status of this contractor?","Contractor status updated successfully.","Contractor status is could not be updated",'contractor-table-list');
    });


    $("#contractor-block-form").validate({
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

    $(document).on('click','#block-user',function(){
        $("#contractor-block-form")[0].reset();
        var form_valid = $("#contractor-block-form").validate();
            form_valid.resetForm();
        var contractor_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#contractor_id').val(contractor_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#contractor-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/contractors/change_block_status',$("#contractor-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    $('#contractor-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Contractor  Blocked Successfully", "success");
                }else{
                     swal("Cancelled", "Contractor  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#unblock-user',function(){
        var contractor_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'contractor_id':contractor_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/contractors/change_block_status',"Do you really want to unblock this Contractor?","Contractor  Unblocked Successfully.","Contractor could not be unblocked",'contractor-table-list');
    
    });

    $(document).on('click','.confirm',function(){
        window.location.reload();
    });


});
