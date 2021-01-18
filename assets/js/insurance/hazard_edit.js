var base_url = $("#base-url-1").val();
$(document).ready(function(){


	function AllowNumbersOnly(e) {
	    var code = (e.which) ? e.which : e.keyCode;
	    if (code > 31 && (code < 48 || code > 57)) {
	        e.preventDefault();
	    }
	}

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

	$("#add-hazard-form").validate({
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
            }
		},
		messages: {
			businessname:{required:"Business Name is required"},
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
                }

		},
		errorPlacement: function(error, element) {
            if(element.is('select')){
                error.insertAfter(element.parent());
            }else if((element.attr("name") == 'appraiser_eo_date')){
                error.insertAfter(element.parent());
            }
            else{
				error.insertAfter(element);
            }
		}
	});

	$.validator.addMethod("check_email_exist",function(value,element) {
		var userid = $('#insurance_id').val();
  		var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!==email_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url + 'backend/manage_insurance/check_email_exist',
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
    	var userid = $('#insurance_id').val();
    	var phone_check = $('#phone_check').val();
        var postData ={phone:value.replace(/\D/g, '')};
        postData[global_csrf_token_name]= global_csrf_token_value;

        if(userid=="" || value.replace(/\D/g, '')!==phone_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url+ 'backend/manage_insurance/check_phone_exist',
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


    $(document).on('click','#save_hazard',function(e){ 
        e.preventDefault();

        var appl_type = $(this).attr('data-type');
        
		var hazard_form_valid = $("#add-hazard-form").valid();

		if(hazard_form_valid == true){ 

            
            $(this).prop('disabled',true);
            
			var form = $('#add-hazard-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/manage_insurance/add",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    var response = $.parseJSON(result);  
                	if(response.status = true){
                        if(appl_type == 'add')
                    	   window.location.href = base_url+'backend/manage_insurance';
                        else 
                            window.location.href = base_url+'backend/manage_insurance/edit_hazard/'+response.insurance_id;
                	}
                }
            });
		}
	});
    
    $(document).on('click','#cancel_hazard',function(e){
        window.location.href = base_url+'backend/manage_insurance';
    });

});
