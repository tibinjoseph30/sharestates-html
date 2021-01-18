var base_url = $("#base-url-1").val();
$(document).ready(function(){
    /*show/hide business informations - add/edit broker*/
    $(".ss-buisness-name").keyup(function(e){

        var name = $(this).val().trim();
        if(name != '')
            $('.ss-optional').removeClass('hide');
        else
            $('.ss-optional').addClass('hide');
    });

    $('body').on('ifChanged','.same-as-above',function(e){
        if($(this).is(':checked')){
            $(".address-2").val($(".address-1").val());
            $(".zipcode-2").val($(".zipcode-1").val());
            $(".city-2").val($(".city-1").val());
            $(".state-2").val($(".state-1 :selected").val()).change();
        }else{
            $(".address-2,.zipcode-2,.city-2,.state-2").val('').change();
        }
    });

    $('body').on('keyup','.address-2',function(e){
        if($('.address-1').val() != $('.address-2').val()){
            $(".same-as-above").removeAttr('checked');
            $(".same-as-above").closest('div').removeClass('checked');
        }
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

    $("#ssn").change(function(){
        var va = $(this).val();
        $("#ssn_hid").val(va);
    });

    $("#ssn").blur(function(){
        var val1 = $("#ssn_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = val1.replace(/./gi, "*"); 
        if(hidden.length > 11) hidden = hidden.substring(0,11);
        $(this).val(hidden);
        if(val1!=''){
          
        }
    });

    $(".investor-broker-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            'user[first_name]':{required:true},
            'user[last_name]':{required:true},
            'user[user_email]':{required:true,
                email: true,
                remote:{
                    url : base_url+'backend/investor_broker/check_email',
                    type : 'POST',
                    data : {'user_id':$('#user_id').val(),'csrf_test_name':global_csrf_token_value}
                }
            },
            'user[user_phone]':{required:true,
                phonecheck:true
            },
            'user[user_password]':{required:true,
                regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$_+()%^&*-]).{8,}$/},
            'cnf_password':{required:true,
                equalTo : "#password"},                        
            'mask[social_security_number]':{required:true, minlength:11},
            'user[user_zip_code]':{required:true,validate_zip_code:true},
            'user[user_address1]':{required:true},
            'user[user_city]':{required:true},
            'user[user_state]':{required:true},
            'broker[investor_fee]':{required:true,valid_fee:true},
            'broker[origination_fee]':{required:true,valid_fee:true},

            'mask[business_ein]':{valid_business_name:true, valid_business_ein:true},
            'broker[business_zipcode]':{valid_business_name:true,validate_business_zip:true},
            'broker[business_street_address]':{valid_business_name:true},
            'broker[business_city]':{valid_business_name:true},
            'broker[business_state]':{valid_business_name:true},

            'licnese_data[license_number]':{valid_license_info:true},
            'licnese_data[license_valid_until]':{valid_license_info:true},
            'license':{valid_license_info:true}
            
        },
        messages: {
            'user[first_name]':{required:'First Name is required'},
            'user[last_name]':{required:'Last Name is required'},
            'user[user_email]':{required:'Email is required',
                email: 'Please enter a valid email address',
                remote: "This email already exists please use another one"
            },
            'user[user_phone]':{required:'Phone Number is required',
                phonecheck:'Phone number is invalid'
            },
            'user[user_password]':{required:'Password is required'},
            'cnf_password':{required:'Confirm Password is required',
                equalTo: 'Please enter the same value again'},                        
            'mask[social_security_number]':{required:'SSN is required', 
                minlength:'SSN is invalid'},
            'user[user_zip_code]':{required:'Zip Code is required',
                validate_zip_code:'Please enter a valid Zip Code'},
            'user[user_address1]':{required:'Street Address is required'},
            'user[user_city]':{required:'City is required'},
            'user[user_state]':{required:'State is required'},
            'broker[investor_fee]':{required:'Investor Yield Spread is required',
                valid_fee:'Investor Yield Spread must not exceed 10.00'},
            'broker[origination_fee]':{required:'Project Origination Fee is required',
                valid_fee:'Project Origination Fee must not exceed 10.00'},

            'mask[business_ein]':{valid_business_name:'EIN is required', 
                valid_business_ein:'EIN is invalid'},
            'broker[business_zipcode]':{valid_business_name:'Zip Code is required',
                validate_business_zip:'Please enter a valid Zip Code'},
            'broker[business_street_address]':{valid_business_name:'Street Address is required'},
            'broker[business_city]':{valid_business_name:'City is required'},
            'broker[business_state]':{valid_business_name:'State is required'},

            'licnese_data[license_number]':{valid_license_info:'License Number is required'},
            'licnese_data[license_valid_until]':{valid_license_info:'License Valid Until is required'},
            'license':{valid_license_info:'License Document is required'}
        },
        errorPlacement: function(error, element) {
            if(element.is('select')){
                error.insertAfter(element.parent());
            }else if((element.attr("name") == 'license') || ( element.attr("name") == 'licnese_data[license_valid_until]')){
                error.insertAfter(element.parent());
            }else{
                error.insertAfter(element);
            }
        }
    });

    $.validator.addMethod("regex",function(value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        },
        "Passwords require at least 8 characters including one uppercase character, one lowercase character, one number and one special character."
    );

    $.validator.addMethod("valid_fee", function(value, element) {
        value = parseFloat(value.replace(/[^0-9-.]/g, ''));
        if(value > 10 )
            return false;
        else
            return true;
    });

    $.validator.addMethod("valid_license_info", function(value, element) {
        if(value != '' || ((element.id == 'license') && ($('.upload-list li').html() != undefined )) )
            return true;
        if($('#license_number').val() != '' || $('#license_valid_until').val() != '' || $('#license').val() != '' || $('.upload-list li').html() != undefined)
            return false;
        else
            return true;       
    });

    $.validator.addMethod("valid_business_name", function(value, element) {
        if(value != '')
            return true;
        if($('#business_name').val().trim() != '')
            return false;
        else
            return true;       
    });

    $.validator.addMethod("valid_business_ein", function(value, element) {
        if($('#business_name').val().trim() != ''){
            if(value.length<10)
              return false;
            else
                return true;
       }else{
        return true;
       }
    });

    $.validator.addMethod("validate_business_zip", function(value, element) {
        if($('#business_name').val().trim() != ''){
            if(value.length<5){
              return false;
            }
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
       }else{
        return true;
       }
    });

    // save investor broker
    $(document).on('click','#save_investor_broker',function(e){
        e.preventDefault(e);
        //alert($('.upload-list li').html());

        var appl_type = $(this).attr('data-type');
        
        var inv_broker_form_valid = $(".investor-broker-form").valid();

        if(inv_broker_form_valid == true){ 

            $(this).prop('disabled',true);
            
            var form = $('.investor-broker-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/investor_broker/add",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                dataType:'json',
                success:function(response){
                    if(response.status == true){
                        if(appl_type == 'add')
                           window.location.href = base_url+'backend/investor_broker';
                        else 
                            window.location.href = base_url+'backend/investor_broker/add/'+response.user_id;
                    }else{
                        $('#save_investor_broker').prop('disabled',false);
                    }
                }
            });
        }
    });

    $('body').on('click', '.delete-doc', function(){  
        var type = $(this).attr('alt');
        var id   = $(this).attr('id');
        var post_data = {id:id,type:type};
        post_data[global_csrf_token_name]= global_csrf_token_value;
          
        var project_confirm = confirm('Are you sure you want to delete this document?');
        if(project_confirm==true){
            $.ajax({
                type: 'POST',
                data: post_data,
                url:  base_url + 'backend/investor_broker/broker_delete_doc',
                dataType: "html",
                success: function (response) {
                    $('#'+type+'_'+id).remove();
                }
            });
        } else {
            return false;
        }
    });

});
