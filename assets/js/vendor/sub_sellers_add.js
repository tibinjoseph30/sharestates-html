var base_url = $("#base-url-1").val();
$(document).ready(function(){
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

    $("#add-sub_sellers-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            firstname:{required:true},
            lastName:{required:true},
          
            phone:{required:true,
                phonecheck:true,
                // check_phone_exist:true
            },
            email:{required:true,
                email: true,
                 check_email_exist:true
            },
           
        },
        messages: {
            firstname:{required:"First Name is required"},
            lastName:{required:"Last Name is required"},
            phone:{required:"Phone Number is required",
                    phonecheck:"Phone number is invalid.",
                    // check_phone_exist:"This Phone already exists please use another one."
                },
            email:{required:"Email is required",
                    email:"Please enter a valid email address.",
                     check_email_exist:"This email already exists please use another one."
                },
            
        },
        errorPlacement: function(error, element) {
                error.insertAfter(element);
        }
    });
    $.validator.addMethod("check_email_exist",function(value,element) {
        var userid = $('#lenders_attorney_id').val();
        var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!==email_check){
            $.ajax({
                type: "POST",
                async:false,
                url: base_url + 'backend/sellers_attorney/check_email_exist',
                data: postData , 
                success: function(msg){ 
                    result = (msg == "1") ? false : true;
                }
            });
            
        }else{
            result =true;

        }
        return result;
    });

    $.validator.addMethod("phonecheck", function(value, element) {
        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
            return true;
        else
            return false;
    });

    // save sub attorney
	$(document).on('click','#save_seller_sub',function(e){
		e.preventDefault(e);

		var seller_form_valid = $("#add-sub_sellers-form").valid();

		if(seller_form_valid == true){
			var form = $('#add-sub_sellers-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/sellers_attorney/add_subaccount",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                	if(result.status = true){
                    	window.location.href = base_url+'backend/sellers_attorney';
                	}
                }
            });
		}
	});

    $(document).on('click','#cancel_seller_sub',function(e){
        window.location.href = base_url+'backend/sellers_attorney';
    });
});