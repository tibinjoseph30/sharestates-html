var base_url = $("#base-url-1").val();

clone_html =  '<div class="first-row">'+
    '<div class="row ">'+

    '<div class="col-sm-6 col-md-6">'+
            '<div class="form-group">'+
                '<label class="control-label">State Bar License Number (<span class="geographical-area-name"></span>)<span class="text-danger">*</span></label>'+
                '<input type="text" name="bar_licence_num[]"  class="form-control bar_licence_num" maxlength="16" onkeypress = "" value="" >'+
                
                '<input type="hidden" name="location_id[]" >'+
                '<!-- <small class="form-control-feedback"> This field has error. </small> -->'+
            '</div>'+
        '</div>'+
        '<div class="col-sm-6 col-md-6">'+
            '<div class="form-group">'+
                '<label class="control-label">License Valid Until (<span class="geographical-area-name"></span>)<span class="text-danger">*</span></label>'+
                '<div class="input-group">'+
                    '<input type="text" name="fidelity_licence_valid[]" class="form-control mydatepicker fidelity_licence_valid" value="" placeholder="mm/dd/yyyy">'+
                    '<div class="input-group-append">'+
                        '<span class="input-group-text"><i class="icon-calender"></i></span>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
            '<div class="col-md-6">'+
                '<div class="form-group">'+
                    '<label class="control-label">State Licence</label>'+
                    '<div class="fileinput fileinput-new input-group" data-provides="fileinput">'+
                        '<span class="input-group-append btn btn-default btn-file">'+
                            '<span class="fileinput-new">Upload File</span>'+
                            '<span class="fileinput-exists">Change</span>'+
                            '<input type="file" class="state_licence_doc" >'+
                        '</span>'+
                        '<ul class="upload-list que-doc">'+
                            '<li class="d-flex" >'+
                                '<div class="form-control no-border current-doc p-l-0" data-trigger="fileinput">'+
                                    '<i class="glyphicon glyphicon-file fileinput-exists"></i>'+
                                    '<a target="_blank" href="#">'+
                                        '<span class="fileinput-filename"></span>'+
                                    '</a>'+
                                '</div>'+
                                '<a href="javascript:void(0)" data-id=""  class="input-group-append btn btn-default fileinput-exists delete_doc_bank_attorney_preview" data-dismiss="fileinput"><i class="fa fa-times text-danger"></i></a>'+
                            '</li>'+
                        '</ul>'+


                    '</div>'+
             '</div>'+
            '</div>'+
            '<div class="col-md-6">'+
                '<div class="form-group">'+
                    '<label class="control-label"> Residential Properties  </label>   '+

                    '<ul class="icheck-list p-r-0 p-l-10 p-t-5 inline-chk in-blk p-0 res_property">'+
                        '<li class="">'+
                            '<input type="radio" class="check" name="property_type_" id="res_property_1" value="R" data-radio="iradio_minimal-blue" >'+
                            '<label for="res_property_1">Residential</label>'+
                        '</li>'+
                        '<li class="">'+
                            '<input type="radio" class="check" id="res_property_2" name="property_type_" value="C" data-radio="iradio_minimal-blue"  >'+
                            '<label for="res_property_2">Commercial</label>'+
                        '</li>'+
                        '<li class="">'+
                            '<input type="radio" class="check" id="res_property_3" name="property_type_" value="M" data-radio="iradio_minimal-blue" >'+
                            '<label for="res_property_3">Mixed Use</label>'+
                        '</li>'+
                    '</ul>'+
                '</div>'+
            '</div>'+
    '</div>'+
    '<div class="row">'+
    '<div class="col-sm-12 col-md-12">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Production Point of Contact (<span class="geographical-area-name"></span>) </label>'+
                                '<div class="controls location-chk">'+
                                    ''+
                                    '<input type="checkbox" value="1" class="main_poc " data-checkbox="icheckbox_minimal-blue">'+
                                    '<label> Same as Main POC</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_poc">'+
                            '<div class="form-group">'+
                                '<label class="control-label">First Name<span class="text-danger">*</span></label>'+
                                '<input type="text" value="" class="form-control valid poc_fname" maxlength="16">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_poc">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Last Name<span class="text-danger">*</span></label>'+
                                ''+
                                '<input type="text" value="" class="form-control valid poc_lname">'+
                                    ''+
                            '</div>'+
                            ''+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_poc">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Phone Number<span class="text-danger">*</span></label>'+
                                '<input type="text" value="" class="form-control phone_format valid valid_phonecheck poc_phone" maxlength="12">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_poc">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Email<span class="text-danger">*</span></label>'+
                                ''+
                                '<input type="text" value="" class="form-control valid valid_emailcheck poc_email">'+
                                    ''+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-12 col-md-12">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Orders Point of Contact (<span class="geographical-area-name"></span>) </label>'+
                                '<div class="controls location-chk">'+
                                    '<input type="checkbox" value="1"  class="order_poc "  data-checkbox="icheckbox_minimal-blue">'+
                                    '<label> Same as Production POC</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_production">'+
                            '<div class="form-group">'+
                                '<label class="control-label">First Name<span class="text-danger">*</span></label>'+
                                '<input type="text" value="" class="form-control valid order_fname" maxlength="16">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_production">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Last Name<span class="text-danger">*</span></label>'+
                                '<input type="text" value="" class="form-control valid order_lname">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_production">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Phone Number<span class="text-danger">*</span></label>'+
                                '<input type="text" value="" class="form-control phone_format valid valid_phonecheck order_phone" maxlength="12">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_production">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Email<span class="text-danger">*</span></label>'+
                                '<input type="text" value="" class="form-control valid valid_emailcheck order_email">'+
                                    ''+
                            '</div>'+
                        '</div>'+
            '</div>'+
'<hr>'+

'</div>';

$(document).ready(function(){

	$("#ein").mask("99-9999999");
	
	
    
	var user_channel = $("#channel").val();
  	// var user_channel_value = $("#channel_value").val();
    $("#source").hide();
    $("#se_engine").hide();
    
  	if(user_channel == "search_engine"){
     	$("#se_engine").show();
        $("#source").hide();
        
  	} else if(user_channel.length) {

        $("#se_engine").hide();
        $("#source").show();

     	
     	$("#channel_publication").val('');
  	}

	$('body').on('change', '#channel', function(){
     	var channel = $(this).val();

        //alert(channel);
        $("#source").hide();
        $("#se_engine").hide();
        
        if(channel == "search_engine"){
            $("#se_engine").show();
            $("#source").hide();
            
        } else if(channel.length) {

            $("#se_engine").hide();
            $("#source").show();

            
            $("#channel_publication").val('');
        }

  	});

	$("#save_loc").click(function(){
		var loc = [];
        var loc_name_and_id = [];

		$('input[name="area_check[]"]:checked').each(function(){
            
            id = $(this).val();
            state_name = $(this).closest('.st').find('.states').text();

            loc.push($(this).closest('.st').find('.states').text());

            loc_name_and_id[id] = state_name;

        });
        loc.sort();


     //   $('#bank_attorney_area_id').remove();

        current_areas = [];
        $("[data-geographical-area-name]").each(function(i,elem){
            
            current_area = $(this).attr('data-geographical-area-name');

            current_areas.push(current_area);

        });

        


        
        new_areas = [];

        
        if(loc.length>0){

            $('#geo').hide();

            $.each(loc, function(i,element){


                new_areas.push(element);

                ele_len = $("[data-geographical-area-name='"+ element +"']").length;

                 
            if(!ele_len)
            {
                license_details = $(clone_html);
                
                if(license_details.hasClass('first-row'))
                    license_details_copy = license_details.removeClass('first-row');
                else
                    license_details_copy = license_details;


                license_details_copy.find('input:not([type=radio],[type=checkbox])').val('');

                
                license_details_copy.find('.geographical-area-name').text(element);
                license_details_copy.attr('data-geographical-area-name', element);

                location_id = loc_name_and_id.indexOf(element);
                license_details_copy.find("[name='location_id[]']").val(location_id);

                license_details_copy.find('.bar_licence_num').attr('name','bar_licence_num['+ location_id +']');
                license_details_copy.find('.fidelity_licence_valid').attr('name','fidelity_licence_valid['+ location_id +']');
                license_details_copy.find('.state_licence_doc').attr('name','bar_state_doc['+ location_id +']');

              
                license_details_copy.find('.poc_fname').attr('id',"poc_fname_"+location_id);
                license_details_copy.find('.poc_lname').attr('id',"poc_lname_"+location_id);
                license_details_copy.find('.poc_phone').attr('id',"poc_phone_"+location_id);
                license_details_copy.find('.poc_email').attr('id',"poc_email_"+location_id);
                license_details_copy.find('.order_fname').attr('id',"order_fname_"+location_id);
                license_details_copy.find('.order_lname').attr('id',"order_lname_"+location_id);
                license_details_copy.find('.order_phone').attr('id',"order_phone_"+location_id);
                license_details_copy.find('.order_email').attr('id',"order_email_"+location_id);

                license_details_copy.find('.poc_fname').attr('name',"poc_fname_"+location_id);
                license_details_copy.find('.poc_lname').attr('name',"poc_lname_"+location_id);
                license_details_copy.find('.poc_phone').attr('name',"poc_phone_"+location_id);
                license_details_copy.find('.poc_email').attr('name',"poc_email_"+location_id);
                license_details_copy.find('.order_fname').attr('name',"order_fname_"+location_id);
                license_details_copy.find('.order_lname').attr('name',"order_lname_"+location_id);
                license_details_copy.find('.order_phone').attr('name',"order_phone_"+location_id);
                license_details_copy.find('.order_email').attr('name',"order_email_"+location_id);

                
                license_details_copy.find('.order_poc').attr("name","order_poc["+ location_id +"]");
                license_details_copy.find('.order_poc').attr("id","order_poc["+ location_id +"]");
                license_details_copy.find('.order_poc').attr("rel",location_id);
                
                license_details_copy.find('.order_poc').parent().find('label').attr("for","order_poc["+ location_id +"]");

                license_details_copy.find('.main_poc').attr("name","main_poc["+ location_id +"]");
                license_details_copy.find('.main_poc').attr("id","main_poc["+ location_id +"]");
                license_details_copy.find('.main_poc').parent().find('label').attr("for","main_poc["+ location_id +"]");


                license_details_copy.find('.attorney_docs').remove();
                //license_details_copy.find('.iradio_minimal-blue').remove();

                
                license_details_copy.find('ul.res_property li').each(function(i,elem){
                    
                    j = (i+1);


                    $(elem).find('input').attr('id','res_property_'+ j +'_'+ location_id);

                    $(elem).find('input').attr('name','property_type_' + location_id);
                    
                    $(elem).find('label').attr('for','res_property_'+ j +'_'+ location_id);
                    
                });

                license_details_copy.find('input[type=radio],input[type=checkbox]').addClass('apply_icheck');

               
                //license_details_copy.insertAfter("#license-details>div:last");
                
                $('#license-details').append($(license_details_copy));

                $('.apply_icheck').iCheck('destroy');
                
                $('.apply_icheck').iCheck({
                       checkboxClass: 'icheckbox_minimal-blue',
                       radioClass: 'iradio_minimal-blue'
                       });



                $('#areas_div').append('<li data-geographical-area-name="'+ element +'" >'+element+'</li>');
                
            }


            });

            jQuery('.mydatepicker, #datepicker').datepicker({
                autoclose: true,
                todayHighlight: true
            });
            
        }

        $('.first-row').remove();
        

        
        
        

        diff_areas = $(current_areas).not(new_areas).get();
        
        $.each(diff_areas,function(i, area_to_remove){
            $("[data-geographical-area-name='"+ area_to_remove +"']").remove();
        });
        
        


     $("#add-bank-attorney-form").validate({
        onkeyup: false,
        ignore : false,
    
        rules: {
            businessname:{required:true},
            first_name:{required:true},
            last_name:{required:true},
            address1:{required:true},
            city:{required:true},
            state:{required:true},
            fax:{required:true,phonecheck:true},
            zipcode:{required:true,validate_zip_code:true,number: true},
            phone:{required:true,phonecheck:true,check_phone_exist:true},
            email:{required:true,email: true,check_email_exist:true},
            alternate_email:{email:true},
            channel:{required:true},
            channel_publication_text:{required: function (element) {
                    var channel = $("#channel").val();  

                    // if(channel!="search_engine" && channel!="social_media" && channel!="online" && channel!="conference"){
                    if(channel!="search_engine"){
                        var e = $("#channel_publication_text").val();
                        e = $.trim(e);
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
            channel_publication:{required: function (element) {
                    var channel = $("#channel").val();  
                    // if(channel!="search_engine" && channel!="social_media" && channel!="online" && channel!="conference"){
    
                    if(channel=="search_engine"){
                        var e = $("#channel_publication").val();
                        e = $.trim(e);
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
            ein:{required:true,eincheck:true},
            amount_of_coverage_on_fidelity:{required:true,min:function (element) {
                var eo_amount = $("#amount_of_coverage_on_fidelity").val();
                if(eo_amount !=''){
                    eo_amount =  parseFloat(eo_amount.replace(/,/g,'').replace('$','')).toFixed(2);
                }
                
                if(eo_amount >= 1000000){
                }else{
                    return false;
                }
            }},
            license_date:{required:true}

        },
        messages: {
            businessname:{required:"Business Name is required"},
            first_name:{required:"First Name is required"},
            last_name:{required:"Last Name is required"},
            address1:{required:"Address is required"},
            city:{required:"City is required"},
            state:{required:"State is required"},
            fax:{required:"Fax is required",
                phonecheck:"Fax is invalid"},
            zipcode:{required:"Zip Code is required",
                    validate_zip_code: "Please enter a valid Zip Code.",
                    number: "Zip Code should contains numbers Only."},
            phone:{required:"Phone Number is required",
                    phonecheck:"Phone number is invalid.",
                    check_phone_exist:"This Phone already exists please use another one."},
            email:{required:"Email is required",
                    email:"Please enter a valid email address.",
                    check_email_exist:"This email already exists please use another one."},
            alternate_email:{email:'Please enter a valid email address'},
            channel: {required:"Please select Channel"},
            channel_publication:{required:"Please select Channel Publication"},
            ein:{required:"EIN is required",eincheck:"EIN is invalid"},
            channel_publication_text:{required:"Source is required."},
            amount_of_coverage_on_fidelity:{required:"Amount of coverage on Fidelity And Errors And Omissions is required",min:"Amount must be greater than or equal to $1,000,000.00"},
            license_date:{required:"Fidelity And Errors And Omissions validity date is required."}

        },
        errorPlacement: function(error, element) {
            
            if(element.hasClass('mydatepicker'))
                error.insertAfter(element.parent());
            else if(element.is('select'))
                error.insertAfter(element.parent());
            else
                error.insertAfter(element);
        }
    });

      $('[name^=bar_licence_num]').each(function(e) {
        $(this).rules('add', {
            required: true
        });
    });

      $('[name^=fidelity_licence_valid]').each(function(e) {
        $(this).rules('add', {
            required: true
        });
    });

        $('#license-details').find('.valid').each(function () {
            $(this).rules('add', {
                required: true,
                messages: {
                    required: "This field is required"
                }
            });
        });

        $('#license-details').find('.valid_phonecheck').each(function () {
            $(this).rules('add', {
                required: true,
                phonecheck: true,
                check_phone_exist: true,
                messages: {
                    required: "This field is required",
                    phonecheck:"Phone number is invalid.",
                    check_phone_exist:"This Phone already exists please use another one."
                }
            });
        });

        $('#license-details').find('.valid_emailcheck').each(function () {
            $(this).rules('add', {
                required: true,
                email: true,
                check_email_exist: true,
                messages: {
                    required: "This field is required",
                    email:"Please enter a valid email address.",
                    check_email_exist:"This email already exists please use another one."
                }
            });
        });

        
        // if(loc.length==52){
        //  $("#select_all_broker_area").prop('checked',true);
        // }else{
        //  $("#select_all_title_area").prop('checked',false);
        // }
        
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
    jQuery('.mydatepicker, #datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
    });
    
    $('#eo_chk').on('ifChanged', function(event){
	   	var is_eo= $(this).is(':checked');
	   	if(is_eo==true){
	   		$("#eo_date").attr('disabled','disabled');
           	$("#eo_amount").attr('disabled','disabled');
	   	}else{
	   		$("#eo_date").removeAttr('disabled');
          	$("#eo_amount").removeAttr('disabled');
	   	}
	});

    $('#licence_chk').on('ifChanged', function(event){
	   	var islicence= $(this).is(':checked');
	   	if(islicence==true){
	   		$("#license_date").attr('disabled','disabled');
	   	}else{
	   		$("#license_date").removeAttr('disabled');
	   	}
	});

    $('body').on('click', '.delete_doc_bank_attorney_preview', function(){  

        delete_button = $(this);
        delete_button.closest('.fileinput').fileinput('clear');

    });

	$('body').on('click', '.delete_doc_bank_attorney', function(){  

        delete_button = $(this);
        var id   = delete_button.attr('data-id');
        //var type = $(this).attr('alt');
        var project_confirm = confirm('Are you sure you want to delete this document?');
        var post_data = {id:id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        if(project_confirm==true){
            $.ajax({
              	type: 'POST',
              	data: post_data,
              	url:  base_url + 'backend/bank_attorney/bank_attorney_delete_doc',
              	dataType: "html",
              	success: function (response) {
                    $('#doc_'+id).remove();
                    
              	}
            });

        } else {
        	return false;
        }
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

  

	$("#add-bank-attorney-form").validate({
		onkeyup: false,
		ignore : false,
        rules: {
			businessname:{required:true},
			first_name:{required:true},
			last_name:{required:true},
			address1:{required:true},
			city:{required:true},
			state:{required:true},
            fax:{required:true,phonecheck:true},
			zipcode:{required:true,validate_zip_code:true,number: true},
			phone:{required:true,phonecheck:true,check_phone_exist:true},
			email:{required:true,email: true,check_email_exist:true},
            alternate_email:{email:true},
			channel:{required:true},
            channel_publication_text:{ channel_publication_text:true },
			channel_publication:{ channel_publication:true },
            ein:{required:true,eincheck:true},
            amount_of_coverage_on_fidelity:{required:true,min:function (element) {
                var eo_amount = $("#amount_of_coverage_on_fidelity").val();
                if(eo_amount !=''){
                    eo_amount =  parseFloat(eo_amount.replace(/,/g,'').replace('$','')).toFixed(2);
                }
                
                if(eo_amount >= 1000000){
                }else{
                    return false;
                }
            }},
            license_date:{required:true}
		},
		messages: {
			businessname:{required:"Business Name is required"},
			first_name:{required:"First Name is required"},
			last_name:{required:"Last Name is required"},
			address1:{required:"Address is required"},
			city:{required:"City is required"},
			state:{required:"State is required"},
            fax:{required:"Fax is required",
                phonecheck:"Fax is invalid"},
			zipcode:{required:"Zip Code is required",
              		validate_zip_code: "Please enter a valid Zip Code.",
              		number: "Zip Code should contains numbers Only."},
			phone:{required:"Phone Number is required",
              		phonecheck:"Phone number is invalid.",
              		check_phone_exist:"This Phone already exists please use another one."},
			email:{required:"Email is required",
					email:"Please enter a valid email address.",
              		check_email_exist:"This email already exists please use another one."},
            alternate_email:{email:'Please enter a valid email address'},                    
			channel: {required:"Please select Channel"},
			channel_publication:{channel_publication:"Please select Channel Publication"},
			ein:{required:"EIN is required",eincheck:"EIN is invalid"},
            channel_publication_text:{channel_publication_text:"Source is required."},
            amount_of_coverage_on_fidelity:{required:"Amount of coverage on Fidelity And Errors And Omissions is required",min:"Amount must be greater than or equal to $1,000,000.00"},
            license_date:{required:"Fidelity And Errors And Omissions validity date is required."}
		},
		errorPlacement: function(error, element) {


            if(element.hasClass('mydatepicker'))
                error.insertAfter(element.parent());
            else if(element.is('select'))
                error.insertAfter(element.parent());
            else
				error.insertAfter(element);
		}
	});

      $('[name^=bar_licence_num]').each(function(e) {
        $(this).rules('add', {
            required: true
        });
    });

      $('[name^=fidelity_licence_valid]').each(function(e) {
        $(this).rules('add', {
            required: true
        });
    });
      
	$.validator.addMethod("check_email_exist",function(value,element) {
		var userid = $('#bank_attorney_id').val();
  		var email_check = $('#email_check').val();

        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;

       
        if( (userid=="") || (value != email_check) ){

            // Either on insertion or on updating by changing the current email

	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url + 'backend/bank_attorney/check_email_exist',
	            data: postData , 
	            success: function(msg){ 
	                result = (msg == "1") ? false : true;
	            }
	        });

            
        	return result;
        }
        else
        {
            
            return true;
        }
        
    });



    $.validator.addMethod("channel_publication_text", function(value, element) {
            
        var channel = $("#channel").val();  
            
        if(channel != "search_engine"){
            var e = $("#channel_publication_text").val();
            e = $.trim(e);
            if(e==""){
                return false; 
            }
            else{
                return true;
            }          
        }
        else{
            return true;
        }
        
    });



    $.validator.addMethod("channel_publication", function(value, element) {
            
            
        var channel = $("#channel").val();  
            
        if(channel == "search_engine"){
            var e = $("#channel_publication").val();
            e = $.trim(e);
            if(e==""){
                return false; 
            }
            else{
                return true;
            }          
        }
        else{
            return true;
        }
        
    });



    $.validator.addMethod("phonecheck", function(value, element) {
        
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
    	var userid = $('#bank_attorney_id').val();
    	var phone_check = $('#phone_check').val();
        var postData ={phone:value.replace(/\D/g, '')};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || (value != phone_check)) {
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url+ 'backend/bank_attorney/check_phone_exist',
	            data: postData , 
	            success: function(msg){ 
	                result = (msg == "1") ? false : true;
	            }
	        });
	        return result;
        }
        else
        {
            
            return true;
        }
    });

    $.validator.addMethod("validate_zip_code", function(value, element) {

        
        if(value.match(/^\d{5}(?:[-\s]\d{4})?$/))
            return true;
        else
            return false;


    });

	// save bank attorney
	$(document).on('click','#save_bank_attorney',function(e){
		e.preventDefault();
        
        $("[data-dismiss='alert']").click();


        var loctn = [];
        $('input[name="area_check[]"]:checked').each(function(){
            id = $(this).val();
            loctn.push(id);

        }); 

        if(loctn.length == 0){ 
            $('#geo').html('Geographic Areas is required');
            $('#geo').show();
        }
        else
        {
            $('#geo').hide();
        }


        var bank_attorney_form_valid = $("#add-bank-attorney-form").valid();
        
        var appl_type = $(this).attr('data-type');
        
		if(bank_attorney_form_valid == true && loctn.length != 0){

			var form = $('#add-bank-attorney-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/bank_attorney/add",
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
                   	        window.location.href = base_url+'backend/bank_attorney';
                        else
                            window.location.href = base_url+'backend/bank_attorney/edit_bank_attorney/'+response.attorney_id;
                	}  
                }
            });
            
		}
	});

    var data_property = {};
    var url_chart_property   = base_url + 'backend/bank_attorney/loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val();
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var bank_attorney_id   = $('#bank_attorney_id').val();
        data.bank_attorney_id  = bank_attorney_id;
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
                    colors: ['#43d570', '#cdcdcd','#ff6666']
                });
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'propertyType',
                        type: 'pie',
                        marginRight:0,    
                        events: {
                            load: function(event) {
                                var chart = this,
                                points = chart.series[0].points,
                                len = points.length,
                                total = 0,
                                i = 0;

                                
                                for (; i < len; i++) {
                                    total += points[i].y;
                                }

                                
                                chart.setTitle({
                                    text: '<span style="font-weight:bold; color:#1a2942; font-size:35px;">'+ response.total +'</span>' + '<br>Total<br>' + 'Assigned Loans',
                                    align: 'center',
                                    verticalAlign: 'middle',
                                    y: -10,
                                    style: {
                                        color: '#a7aab1',
                                        fontSize:'17px'
                                    },
                                });

                                html = '';


                                $(chart.series[0].data).each(function (j, seriesitem) {


                                    

                                html += '<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + seriesitem.y + '</span></div></div>';


                                });

                                $('#items').html(html).click(function () {
                                    seriesitem.visible ? seriesitem.hide() : seriesitem.show();
                                });


                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>' + this.point.name + '</b>:' + this.y;
                        }
                    },
                    legend: {
                        enabled: true,
                        floating: false,
                        borderWidth: 0,
                        align: 'right',
                        layout: 'vertical',
                        verticalAlign: 'middle',
                        itemMarginBottom: 5,
                        useHTML: true,
                        x:20,
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        pie: {
                            shadow: false,
                            dataLabels: {
                                enabled: false
                            },
                            width:'60%',
                            innerSize: '90%',
                        }
                    },
                    credits:false,
                    series: [{
                        name: '',
                            data: [{
                                name: 'Completed:',
                                y: response.completed,
                                color:'#43d570'
                            }, {
                                name: 'In Progress:',
                                y: response.inprogress
                            }, {
                                name: 'Dead/Denied:',
                                y: ( response.total - (response.inprogress+response.completed))
                            }],
                        
                    }]
                });
            });
        });
    }

    var data_location= {};
    var url_chart_location   = base_url + 'backend/bank_attorney/loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var bank_attorney_id = $('#bank_attorney_id').val();
        data.bank_attorney_id  = bank_attorney_id;
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
                    colors: ['#43d570', '#cdcdcd','#ff6666']
                });
                chart = new Highcharts.Chart({
                    chart: {
                      renderTo: 'locationType',
                      type: 'pie',
                      marginRight:0,
                      events: {
                        load: function(event) {
                          var chart = this,
                            points = chart.series[0].points,
                            len = points.length,
                            total = 0,
                            i = 0;

                          for (; i < len; i++) {
                            total += points[i].y;
                          }

                          chart.setTitle({
                            text: '<span style="font-weight:bold; color:#1a2942; font-size:35px;">'+response.total+'</span>' + '<br>Total<br>' + 'Assigned Loans',
                            align: 'center',
                            verticalAlign: 'middle',
                            y: -10,
                            style: {
                                color: '#a7aab1',
                                fontSize:'17px'
                            },
                          });

                            html = '';


                            $(chart.series[0].data).each(function (j, seriesitem) {

                                
                            html += '<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + this.y + '</span></div></div>';


                            });

                            $('#items2').html(html).click(function () {
                                seriesitem.visible ? seriesitem.hide() : seriesitem.show();
                            });

                        }
                      }
                    },
                    tooltip: {
                      formatter: function() {
                        return '<b>' + this.point.name + '</b>: ' + this.y;
                      }
                    },
                    legend: {
                      enabled: true,
                      floating: false,
                      borderWidth: 0,
                      align: 'right',
                      layout: 'vertical',
                      verticalAlign: 'middle',
                      itemMarginBottom: 5,
                      x:20,
                      useHTML: true,
                    },
                    yAxis: {
                      title: {
                        text: ''
                      }
                    },
                    plotOptions: {
                        pie: {
                            shadow: false,
                            dataLabels: {
                                enabled: false
                            },
                            width:'60%',
                            innerSize: '90%',
                        }
                    },
                    credits:false,
                    series: [{
                      name: '',
                      data: [{
                        name: 'Completed:',
                        y: response.completed,
                        color:'#43d570'
                      }, {
                        name: 'In Progress:',
                        y: response.inprogress
                      }, {
                            name: 'Dead/Denied:',
                            y: ( response.total - (response.inprogress+response.completed))
                        }]
                    }]
                });
            });
        });
    }





	// propertyType
   

    
    var data_sub = {};
    var url_chart_sub = base_url + 'backend/bank_attorney/loan_chart_sub';
    get_loan_chart_sub(data_sub, url_chart_sub);

    $('body').on('change', '#sub_attorneys', function(){
        var sub_id = $(this).val();
        data_sub.sub_id  = sub_id;
        get_loan_chart_sub(data_sub, url_chart_sub);
    });

    function get_loan_chart_sub(data, url){
        var bank_attorney_id = $('#bank_attorney_id').val();
        data.bank_attorney_id  = bank_attorney_id;
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
                    colors: ['#43d570', '#cdcdcd', '#ff6666']
                });
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'subuserType',
                        type: 'pie',
                        marginRight:0,    
                        events: {
                            load: function(event) {
                                var chart = this,
                                points = chart.series[0].points,
                                len = points.length,
                                total = 0,
                                i = 0;

                                for (; i < len; i++) {
                                    total += points[i].y;
                                }

                                chart.setTitle({
                                    text: '<span style="font-weight:bold; color:#1a2942; font-size:35px;">'+response.total+'</span>' + '<br>Total<br>' + 'Assigned Loans',
                                    align: 'center',
                                    verticalAlign: 'middle',
                                    y: -10,
                                    style: {
                                        color: '#a7aab1',
                                        fontSize:'17px'
                                    },
                                });

                                html = '';


                                $(chart.series[0].data).each(function (j, seriesitem) {


                                html += '<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + this.y + '</span></div></div>';


                                });

                                $('#items3').html(html).click(function () {
                                    seriesitem.visible ? seriesitem.hide() : seriesitem.show();
                                });

                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>' + this.point.name + '</b>:' + this.y;
                        }
                    },
                    legend: {
                        enabled: true,
                        floating: false,
                        borderWidth: 0,
                        align: 'right',
                        layout: 'vertical',
                        verticalAlign: 'middle',
                        itemMarginBottom: 5,
                        x:20,
                        useHTML: true,
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        pie: {
                            shadow: false,
                            dataLabels: {
                                enabled: false
                            },
                            width:'60%',
                            innerSize: '90%',
                        }
                    },
                    credits:false,
                    series: [{
                        name: '',
                        data: [{
                            name: 'Completed:',
                            y: response.completed,
                            color:'#43d570'
                        }, {
                            name: 'In Progress:',
                            y: response.inprogress
                        }, {
                            name: 'Dead/Denied:',
                            y: ( response.total - (response.inprogress+response.completed))
                        }]
                    }]
                });
            });
        });
    }



    $("[name=amount_of_coverage_on_fidelity]").blur(function(e){
    // alert($(this).val())
                     if($(this).val()!=0)
                     {
                        $(this).val('$'+number_format($(this).val(),2));
                    }else{
                        $(this).val('');
                        return false;
                    }
                
  });

     $('body').on('change', 'select', function(){
        
        val = $(this).val();

        if(val.length)
        {
            $(this).parent().parent().children('label.error').hide();
        }
    });

    $('button[type=reset]').on('click',function(){
        
        window.location.href = base_url+'backend/bank_attorney';
        
    });
        
    
    $('#selectall').on('ifChanged',function() {
        
        if($(this).is(":checked")) {
            
            $("[name='area_check[]']").iCheck('check');
            
        }
        else
        {   
            
            $("[name='area_check[]']").iCheck('uncheck');
        }

    });
    
    $('body').on('changeDate','.mydatepicker',function(){
        
        if($(this).val().length)
            $(this).parent().parent().find('label.error').hide();
        
    });

    $('#channel_publication').on('change',function(){
        $('#channel_value').val($(this).val());
    });

    $('#channel_publication_text').on('keyup',function(){
        $('#channel_value').val($(this).val());
    });
    
    $(document).on('ifChanged','.main_poc',function(){  
        var l = $(this).closest('.form-group').parent().next();
        if($(this).prop('checked')==true){
          
          l.find(".poc_fname").val($('#first_name').val());
          l.next().find(".poc_lname").val($('#last_name').val());
          l.next().next().find(".poc_phone").val($('#phone').val());
          l.next().next().next().find(".poc_email").val($('#email').val());
          $(this).closest('.form-group').parent().siblings('.same_poc').hide();
        }else{
          l.find(".poc_fname").val('');
          l.next().find(".poc_lname").val('');
          l.next().next().find(".poc_phone").val('');
          l.next().next().next().find(".poc_email").val('');
          //$(this).closest('.form-group').parent().siblings('.same_poc').removeClass('none');
          $(this).closest('.form-group').parent().siblings('.same_poc').show();

        }
    });

    $(document).on('ifChanged','.order_poc',function(){ 
        var ids = $(this).attr('rel'); 
       // var ids = $(this).siblings("[name='hidden_poc[]']").attr("id"); alert(ids)
        var i  = "";
        if(ids)
             i = ids; 
        var l = $(this).closest('.form-group').parent().next();
        if($(this).prop('checked')==true){ 
          l.find("#order_fname_"+i).val($('#poc_fname_'+i).val());
          l.next().find("#order_lname_"+i).val($('#poc_lname_'+i).val());
          l.next().next().find("#order_phone_"+i).val($('#poc_phone_'+i).val());
          l.next().next().next().find("#order_email_"+i).val($('#poc_email_'+i).val());
          $(this).closest('.form-group').parent().siblings('.same_production').hide();
        }else{
          l.find("#order_fname_"+i).val('');
          l.next().find("#order_lname_"+i).val('');
          l.next().next().find("#order_phone_"+i).val('');
          l.next().next().next().find("#order_email_"+i).val('');
          $(this).closest('.form-group').parent().siblings('.same_production').show();
        }
    });

       $('#license-details').find('.valid').each(function () {
            $(this).rules('add', {
                required: true,
                messages: {
                    required: "This field is required"
                }
            });
        });

       $('#license-details').find('.valid_phonecheck').each(function () {
            $(this).rules('add', {
                phonecheck: true,
                check_phone_exist: true,
                messages: {
                    phonecheck:"Phone number is invalid.",
                    check_phone_exist:"This Phone already exists please use another one."
                }
            });
        });

        $('#license-details').find('.valid_emailcheck').each(function () {
            $(this).rules('add', {
                email: true,
                check_email_exist: true,
                messages: {
                    email:"Please enter a valid email address.",
                    check_email_exist:"This email already exists please use another one."
                }
            });
        });

        // $(document).on('click','.bank-attorney-deactivate',function(){
        //     var bank_attorney_id = $(this).attr('data-id');
        //     var type = $(this).attr('data-type');

           

        //     status_update({'status':type,'bank_attorney_id':bank_attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/bank_attorney/change_status',"Do you really want to change status of this bank attorney?","Bank attorney status updated successfully.","Bank attorney status is could not be updated",'bank-attorney-table-list');
        
        // });


    // Active - Inactive
    $("#attorney-inactive-form").validate({
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

    $(document).on('click','#bank-attorney-deactivate',function(){
        $("#attorney-inactive-form")[0].reset();
        var form_valid = $("#attorney-inactive-form").validate();
            form_valid.resetForm();
        var attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#bank_attorney_id').val(attorney_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#attorney-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/bank_attorney/change_status',$("#attorney-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#bank-attorney-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Bank attorney status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Bank attorney status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#bank-attorney-activate',function(){
        var bank_attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'bank_attorney_id':bank_attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/bank_attorney/change_status',"Do you really want to change status of this bank attorney?","Bank attorney status updated successfully.","Bank attorney status is could not be updated",'bank-attorney-table-list');
    });


        $("#attorney-block-form").validate({
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
        // $(document).on('click','#bank-attorney-deactivate',function(){
        //     var bank_attorney_id = $(this).attr('data-id');
        //     var type = $(this).attr('data-type');
        //     status_update_refresh({'status':type,'bank_attorney_id':bank_attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/bank_attorney/change_status',"Do you really want to change status of this bank attorney?","Bank attorney status updated successfully.","Bank attorney status is could not be updated",'bank-attorney-table-list');
        
        // });
        $(document).on('click','#block-user',function(){
            $("#attorney-block-form")[0].reset();
            var form_valid = $("#attorney-block-form").validate();
                form_valid.resetForm();
            var attorney_id = $(this).attr('data-id');
            var type = $(this).attr('data-type');
            $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
            $(".block-user-modal").modal('show');
            $(".block-user-modal").find('#type').val(type);
            $(".block-user-modal").find('#attorney_id').val(attorney_id);
        });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#attorney-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/bank_attorney/change_block_status',$("#attorney-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    $('#bank-attorney-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Bank attorney  Blocked Successfully", "success");
                }else{
                     swal("Cancelled", "Bank attorney  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#unblock-user',function(){
        var attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'attorney_id':attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/bank_attorney/change_block_status',"Do you really want to unblock this bank attorney?","Bank Attorney  Unblocked Successfully.","Bank Attorney could not be unblocked",'bank-attorney-table-list');
    
    });
    
    $(document).on('click','.confirm',function(){
        window.location.reload();
    });



});
