var base_url = $("#base-url-1").val();
$(document).ready(function(){

	$("#add-buyer-attorney-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			lenders_business_name:{required:true},
			lenders_first_name:{required:true},
			lenders_last_name:{required:true},
			lenders_address:{required:true},
			lenders_city:{required:true},
			lenders_state:{required:true},
			lenders_zipcode:{required:true,minlength:5},
			lenders_phone:{required:true,user_phone_check:true,minlength:12
                // check_phone_exist:true
            },
			lenders_email:{required:true,email:true,remote:
                   {
                      url:base_url+'backend/buyer_attorney/check_email_exist',
                      type: "post",
                       data:{'csrf_test_name':global_csrf_token_value}
                   }},
            lenders_additional_email:{email:true},
            lenders_fax:{minlength:12},
            lenders_ein_dummy:{minlength:10},
            geoarea:{required:true},
		},
		messages: {
			lenders_business_name:{required:"Buyer Law Firm Name is required"},
			lenders_first_name:{required:"First Name is required"},
			lenders_last_name:{required:"Last Name is required"},
			lenders_address:{required:"Address is required"},
			lenders_city:{required:"City is required"},
			lenders_state:{required:"State is required"},
			lenders_zipcode:{required:"Zip Code is required",minlength:"Please enter at least 5 digits"},
			lenders_phone:{required:"Phone Number is required",
              		user_phone_check:"Phone number is invalid.",
              		minlength:"Not a valid 10-digit phone number"
                },
			lenders_email:{required:"Email is required",remote:"Email address is already exist!"},
			lenders_fax:{minlength:"Not a valid 10-digit Fax number"
                },
			lenders_ein_dummy:{minlength:"EIN is invalid"},
			geoarea:{required:"Geographic Areas Covered is required"},

		},
		errorPlacement: function(error, element) {
				if(element.attr("name") == 'lenders_state'){
					error.insertAfter(element.parent("div").parent("div"));
				}else if(element.attr("name") == 'geoarea'){
					//alert('dd');
					error.insertAfter(element.parent("div"));	
				}else{
					error.insertAfter(element);	
				}
				
		}
	});

	//
	$("#save_loc").click(function(){
		var loc = [];
		$('input[name="area_check[]"]:checked').each(function(){
			$(this).val();
			loc.push($(this).closest('.st').find('.states').text());
		});
		loc.sort();
		var html ='';
		html +='<ul id="">';
		if(loc.length>0){
			$("#geoarea").val('0');
			$.each(loc, function(i,element){
                html +='<li>'+element+'</li>';
            });
			html +='</ul>';
		}else{
			$("#geoarea").val('');
		}
		$('#areas_div').html(html);
		$('#areas_div').parent('div').find('#geoarea-error').remove();
	});

	$("#lenders_ein_dummy").keyup(function(){
	    var va = $(this).val();
	    $("#lenders_ein").val(va);
	});

	$("#lenders_ein_dummy").blur(function(){
	    var val1 = $("#lenders_ein").val();
	    var last = val1.slice(0,-4);
	    var last2 = val1.slice(-4);
	    hidden = val1.replace(/./gi, "*"); 
	    if(hidden.length > 10) hidden = hidden.substring(0,10);
	    $(this).val(hidden);
	    if(val1!=''){
	      
	    }
	});

	$(document).on('click','#save-buyer-attorney',function(e){
		e.preventDefault(e);
		var children = $("#add-buyer-attorney-form").find('input[readonly]');
    	children.prop('readonly', false);
		var appraiser_form_valid = $("#add-buyer-attorney-form").valid();
		var val = $("#add-buyer-attorney-form").validate();

		if(appraiser_form_valid == true){
			$.post(base_url+'backend/buyer_attorney/add',$("#add-buyer-attorney-form").serialize(),function(response){
				var response = $.parseJSON(response);
    			if(response.status == true){
    				
    				//window.location.reload()
    				window.location.href = base_url+'backend/buyer_attorney';
    			}

			});           
		}else{
			console.log("error list", val);
		}
		children.prop('readonly', true);
	});

	$(document).on('change', '#lenders_state', function(){
		//alert('dd');
        
        val = $(this).val();
        //alert(val);

        if(val.length)
        {
            $(this).parent().parent().parent().children('label.error').hide();
        }
    });

    $('#selectall').on('ifChanged',function() {
        if($(this).is(":checked")) {
            $("[name='area_check[]']").iCheck('check');
        } else {   
            $("[name='area_check[]']").iCheck('uncheck');
        }
    });

    $(document).on('click','#cancel-buyer',function(e){
        window.location.href = base_url+'backend/buyer_attorney';
    });

});