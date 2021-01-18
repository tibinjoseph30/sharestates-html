var base_url = $("#base-url-1").val();

var licence_html = '<div class="row">'+
                        '<div class="col-sm-6 col-md-6">'+
                            '<div class="form-group">'+
                                '<label class="control-label">State License Number (<span class="geographical-area-name"></span>)<span class="text-danger">*</span></label>'+
                                '<input type="text" name="state_licence[]"  class="form-control valid" maxlength="16" onkeypress = "" value="" >'+
                                ''+
                                '<input type="hidden" name="location_id[]" >'+
                                '<!-- <small class="form-control-feedback"> This field has error. </small> -->'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6">'+
                            '<div class="form-group">'+
                                '<label class="control-label">License Valid Until (<span class="geographical-area-name"></span>)<span class="text-danger">*</span></label>'+
                                '<div class="input-group">'+
                                    '<input type="text" name="title_license_date[]" class="form-control mydatepicker valid" value="" placeholder="mm/dd/yyyy">'+
                                    '<div class="input-group-append">'+
                                        '<span class="input-group-text"><i class="icon-calender"></i></span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6">'+
                            '<div class="form-group">'+
                            '<label class="control-label">License</label>'+
                                '<div class="fileinput fileinput-new input-group" data-provides="fileinput">'+
                                    '<span class="input-group-append btn btn-default btn-file">'+
                                        '<span class="fileinput-new">Upload File</span>'+
                                        '<span class="fileinput-exists">Change</span>'+
                                        '<input type="file" class="span6 rqd-fld" name="licence_doc[]" id="licence_doc_">'+
                                    '</span>'+
                                    '<div class="form-control no-border" data-trigger="fileinput">'+
                                        '<i class="glyphicon glyphicon-file fileinput-exists"></i>'+
                                        '<span class="fileinput-filename"></span>'+
                                    '</div>'+
                                    '<a href="javascript:void(0)" class="input-group-append btn btn-default fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times text-danger"></i></a>'+
                                '</div>'+
                               
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-12 col-md-12">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Services Provided</label>'+
                                '<ul class="icheck-list p-r-0 p-l-10 p-t-5 inline-chk d-inline-flex in-blk">'+
                                    '<li class="m-r-10 d-flex">'+
                                        '<input type="checkbox"  id="nj_title_insurance_" class="title_insurance" name="title_insurance[]"  value="T" data-checkbox="icheckbox_minimal-blue">'+
                                        '<label for="nj_title_insurance_"> Title Insurance</label>'+
                                    '</li>'+
                                    '<li class="d-flex">'+
                                        '<input type="checkbox" id="nj_settlement_" class="settlement" name="settlement[]" value="S"  data-checkbox="icheckbox_minimal-blue"> '+
                                        '<label for="nj_settlement_"> Settlement/Escrow </label>'+
                                    '</li>'+
                                '</ul>'+
                                '<div class="clearfix"></div>'+
                              ''+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-12 col-md-12">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Production Point of Contact (<span class="geographical-area-name"></span>) </label>'+
                                '<div class="controls location-chk">'+
                                    ''+
                                    '<input type="checkbox" value="1" id="main_poc_[]" name="main_poc[]" class="main_poc " data-checkbox="icheckbox_minimal-blue">'+
                                    '<label for="main_poc_[]"> Same as Main POC</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_poc">'+
                            '<div class="form-group">'+
                                '<label class="control-label">First Name<span class="text-danger">*</span></label>'+
                                '<input type="text" name="poc_fname[]" id="poc_fname_" value="" class="form-control valid" maxlength="16">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_poc">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Last Name<span class="text-danger">*</span></label>'+
                                ''+
                                '<input type="text" name="poc_lname[]" id="poc_lname_" value="" class="form-control valid">'+
                                    ''+
                            '</div>'+
                            ''+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_poc">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Phone Number<span class="text-danger">*</span></label>'+
                                '<input type="text" name="poc_phone[]" id="poc_phone_" value="" class="form-control phone_format valid valid_phonecheck" maxlength="12">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_poc">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Email<span class="text-danger">*</span></label>'+
                                ''+
                                '<input type="text" name="poc_email[]" id="poc_email_" value="" class="form-control valid valid_emailcheck">'+
                                    ''+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-12 col-md-12">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Orders Point of Contact (<span class="geographical-area-name"></span>) </label>'+
                                '<div class="controls location-chk">'+
                                    '<input type="checkbox" value="1" id="order_poc_[]" name="order_poc[]" class="order_poc "  data-checkbox="icheckbox_minimal-blue">'+
                                    '<label for="order_poc_[]"> Same as Production POC</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_production">'+
                            '<div class="form-group">'+
                                '<label class="control-label">First Name<span class="text-danger">*</span></label>'+
                                '<input type="text" name="order_fname[]" id="order_fname_" value="" class="form-control valid" maxlength="16">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_production">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Last Name<span class="text-danger">*</span></label>'+
                                '<input type="text" name="order_lname[]" id="order_lname_" value="" class="form-control valid">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_production">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Phone Number<span class="text-danger">*</span></label>'+
                                '<input type="text" name="order_phone[]" id="order_phone_" value="" class="form-control phone_format valid valid_phonecheck" maxlength="12">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-sm-6 col-md-6 same_production">'+
                            '<div class="form-group">'+
                                '<label class="control-label">Email<span class="text-danger">*</span></label>'+
                                '<input type="text" name="order_email[]" id="order_email_" value="" class="form-control valid valid_emailcheck">'+
                                    ''+
                            '</div>'+
                        '</div>'+
                    '</div>';

$(document).ready(function(){

	//$("#ein").mask("99-9999999");
	
	$(".channelpublication").hide();
	var user_channel = $("#channel").val();
  	// var user_channel_value = $("#channel_value").val();

  	if(user_channel == "search_engine"){
     	$(".channelpublication").show();
        $(".channelpublicationtext").hide(); 
        $("#channel_publication_text").val('');
  	}else if(user_channel == ""){
       $(".channelpublicationtext").hide(); 
       $("#channel_publication_text").val('');
       $(".channelpublication").hide();
       $("#channel_publication").val('');
    } else {
     	$(".channelpublication").hide();
     	$("#channel_publication").val('');

  	}

	$('body').on('change', '#channel', function(){
        $(this).parent().parent().parent('.form-group').find('#channel-error').remove();
     	var channel = $(this).val();
     	if(channel=="search_engine"){
        	$(".channelpublication").show();
            $(".channelpublicationtext").hide(); 
            $("#channel_publication_text").val('');
     	} else if(channel == ""){
           $(".channelpublicationtext").hide(); 
           $("#channel_publication_text").val('');
           $(".channelpublication").hide();
           $("#channel_publication").val('');
        } else {
        	$(".channelpublication").hide();
        	$("#channel_publication").val('');   
            $(".channelpublicationtext").show();
            $("#channel_publication_text").val('');              
     	}
  	});
    $('body').on('change', '#channel_publication', function(){
        $(this).parent().parent().parent('.form-group').find('#channel_publication-error').remove();
    });

	/*$("#save_loc").click(function(){
		var loc = [];
		$('input[name="area_check[]"]:checked').each(function(){
			$(this).val();
			loc.push($(this).closest('.st').find('.states').text());
		});
		loc.sort();
		var html ='';
		html +='<ul id="">';
		if(loc.length>0){
			$.each(loc, function(i,element){
			  	 html +='<li>'+element+'</li>';
			});
			html +='</ul>';
		}
		$('#title_area_id').remove();
		$('#areas_div').html(html);
		// if(loc.length==52){
		// 	$("#select_all_broker_area").prop('checked',true);
		// }else{
		// 	$("#select_all_title_area").prop('checked',false);
		// }
	});*/

    $('body').on('focus',"[name='title_license_date[]']", function(){
        $(this).datepicker({ 
                        autoclose: true,
                        todayHighlight: true,
                        //container :'.input-group'
                    });
    });

    $('#selectall').on('ifChanged',function() {
        if($(this).is(":checked")) {
            $("[name='area_check[]']").iCheck('check');
        } else {   
            $("[name='area_check[]']").iCheck('uncheck');
        }
    });



    $("#save_loc").click(function(){

        $('#geo').hide();

        var loc = [];
        var loc_name_and_id = [];
        $('input[name="area_check[]"]:checked').each(function(){
            
            id = $(this).val();
            state_name = $(this).closest('.st').find('.states').text();

            loc.push($(this).closest('.st').find('.states').text());

            loc_name_and_id[id] = state_name;

        });
        loc.sort();
        
        


        //$('#foreclosure_attorney_area_id').remove();
        

        current_areas = [];
        $("[data-geographical-area-name]").each(function(i,elem){
            
            current_area = $(this).attr('data-geographical-area-name');

            current_areas.push(current_area);

        });
        
        
        new_areas = [];

        
        if(loc.length>0){

            

            $.each(loc, function(i,element){


                new_areas.push(element);

                ele_len = $("[data-geographical-area-name='"+ element +"']").length;

                console.log(element);
                 
            if(!ele_len)
            {
                
                license_details = $(licence_html);
                
                if(license_details.hasClass('first-row'))
                    license_details_copy = license_details.removeClass('first-row');
                else
                    license_details_copy = license_details;
               
                //license_details_copy.find("[name='poc_fname[]']").attr("id","poc_fname_"+i);

                license_details_copy.find('input:not([type=checkbox])').val('');
                license_details_copy.find(':checkbox').prop('checked', false);

                
                license_details_copy.find('.geographical-area-name').text(element);
                license_details_copy.attr('data-geographical-area-name', element);
                license_details_copy.find('.upload-list').html('');
                
                //html = license_details_copy.html();
                //console.log(html);
                //$('#license-details').append("<div class='row'>"+ html +"</div>");
                
               // license_details_copy.find('input[type=checkbox]').removeClass('check');

                location_id = loc_name_and_id.indexOf(element);
                license_details_copy.find("[name='location_id[]']").val(location_id);

                license_details_copy.find('.main_poc').attr('name',"main_poc["+location_id+"]");
                license_details_copy.find('.order_poc').attr('name',"order_poc["+location_id+"]");
                license_details_copy.find('.settlement').attr('name',"settlement["+location_id+"]");
                license_details_copy.find('.title_insurance').attr('name',"title_insurance["+location_id+"]");
                license_details_copy.find('.main_poc').attr('id',"main_poc["+location_id+"]");
                license_details_copy.find('.main_poc').parent().children("label").attr('for','main_poc['+location_id+']');
                license_details_copy.find('.order_poc').attr('id',"order_poc["+location_id+"]");
                license_details_copy.find('.order_poc').parent().children("label").attr('for','order_poc['+location_id+']');
                license_details_copy.find('.settlement').attr('id',"nj_settlement_"+location_id);
                license_details_copy.find('.settlement').parent().children("label").attr('for','nj_settlement_'+location_id);
                license_details_copy.find('.title_insurance').attr('id',"nj_title_insurance_"+location_id);
                license_details_copy.find('.title_insurance').parent().children("label").attr('for','nj_title_insurance_'+location_id);

                license_details_copy.find('input[name="poc_fname[]"]').attr('id',"poc_fname_"+location_id);
                license_details_copy.find('input[name="poc_lname[]"]').attr('id',"poc_lname_"+location_id);
                license_details_copy.find('input[name="poc_phone[]"]').attr('id',"poc_phone_"+location_id);
                license_details_copy.find('input[name="poc_email[]"]').attr('id',"poc_email_"+location_id);
                license_details_copy.find('input[name="order_fname[]"]').attr('id',"order_fname_"+location_id);
                license_details_copy.find('input[name="order_lname[]"]').attr('id',"order_lname_"+location_id);
                license_details_copy.find('input[name="order_phone[]"]').attr('id',"order_phone_"+location_id);
                license_details_copy.find('input[name="order_email[]"]').attr('id',"order_email_"+location_id);
                license_details_copy.find('input[name="state_licence[]"]').attr('id',"state_licence_["+location_id+"]");
                license_details_copy.find('input[name="title_license_date[]"]').attr('id',"title_license_date_["+location_id+"]");
                license_details_copy.find('.order_poc').attr('rel',location_id); 

                license_details_copy.find('.title_insurance, .main_poc, .order_poc, .settlement').iCheck('destroy');
               
                 //html = license_details_copy.html();
               // console.log($("#license-details1").html());
               
                $('#license-details').append(license_details_copy);
//                 license_details_copy.insertAfter("#license-details>.row:last");
               
                $('#areas_div>ul').append('<li  data-geographical-area-name="'+ element +'" >'+element+'</li>');
                
            }


            });
            
            $('.title_insurance, .main_poc, .order_poc, .settlement').iCheck({checkboxClass: 'icheckbox_minimal-blue'});

           /* jQuery('.mydatepicker, #datepicker').datepicker({ 
                autoclose: true,
                todayHighlight: true,
                container :'.input-group'
            });*/
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
                    phonecheck:true,
                    messages: {
                        phonecheck: "Phone number is invalid."
                    }
                });
            });
            $('#license-details').find('.valid_emailcheck').each(function () {
                $(this).rules('add', {
                    emailcheck:true,
                    messages: {
                        emailcheck: "Please enter a valid email address."
                    }
                });
            });
 
            
            $('.icon-calender').click(function() {
                $(this).closest('div').prev().focus();
            });
            
        }

        $('.first-row').remove();
        
        
 
        diff_areas = $(current_areas).not(new_areas).get();
       
        $.each(diff_areas,function(i, area_to_remove){
            $("[data-geographical-area-name='"+ area_to_remove +"']").remove();
        });
        
        $("#license-details").find('hr').remove();
         $("#license-details").find('.row').after('<hr>');
         $("#license-details").find('.row').addClass('m-t-30 m-b-10');
        
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
        $('#ein_err').hide();
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

        // var einDigitsOnly = val1.replace(/\D/g, ''); 
        
        // var codeReg =/^\d{9}$/
        // if (!codeReg.test(einDigitsOnly)) 
        //    $('#ein_err').show();
        // else 
        //     $('#ein_err').hide();
	});

	// Date Picker
    jQuery('.mydatepicker, #datepicker').datepicker({
        autoclose: true,
        todayHighlight: true,
        container :'.input-group'
    });

    //$(document).on("click",'.icon-calender',function(){
    $('.icon-calender').click(function() {
        $(this).closest('div').prev().focus();
    });
    
    $('#eo_chk').on('ifChanged', function(event){
	   	var is_eo= $(this).is(':checked');
	   	if(is_eo==true){
	   		$("#title_eo_date").attr('disabled','disabled');
           	$("#title_eo_amount").attr('disabled','disabled');
	   	}else{
	   		$("#title_eo_date").removeAttr('disabled');
          	$("#title_eo_amount").removeAttr('disabled');
	   	}
	});

    $("#title_eo_amount").blur(function(e){
        if($(this).val()!=0)
        {
            $(this).val('$'+number_format($(this).val(),2));
        }else{
            $(this).val('');
            return false;
        }
    });

    /* Underwriter list*/
    //$('.uw-div').hide();
    
    if($("#buis_underwriter").is(':checked')){
       $('.uw-div').hide();
       $(".underwritingAgency").modal('hide');
    }
    $("#agent_sel").on('click',function(){
       $(".underwritingAgency").modal('show');
    })
    if($("#buis_agent").is(':checked')){
       $('.uw-div').show();
      //$(".underwritingAgency").modal('show');
    }
    $('.agent_type').on('ifChanged', function(event){
        var agenttype=$(this).val(); 
        if($("#buis_agent").is(':checked')){ 
            $(".underwritingAgency").modal('show');
            $('.uw-div').show();
        }else{ 
            $(".underwritingAgency").modal('hide');
            $('.uw-div').hide();
            $("[name='agent_check[]']").iCheck('uncheck');
            $('#title_underwriter').val('');
            
        }
    });

    // $('.agent_type').on('ifChanged', function(event){
    //     var agenttype=$(this).val();
    //     if(agenttype=='A'){ 
    //         $(".underwritingAgency").modal('show');
    //         $('.uw-div').show();
    //     }else{
    //         $('.uw-div').hide();
    //     }
    // });
    $('#save_agency').on('click',function(){
        var agent =[];
        var agent_name_and_id =[];
        $('input[name="agent_check[]"]:checked').each(function(){
            
            id = $(this).val();
            agent_name = $(this).closest('.st').find('.uwAgent').text();
            agent_name_and_id[id] = agent_name;
            agent.push(id);
        });
        agent.sort();
        $('#title_underwriter').val(agent);

        current_agent = [];
        $("[data-underwriter-agent-name]").each(function(i,elem){
            
            current_agt = $(this).attr('data-underwriter-agent-name');

            current_agent.push(current_agt);

        });
        new_agent = [];

      
        if(agent.length>0){
            $('.uw-div>ul').html('');
            $.each(agent, function(i,element){

                new_agent.push(element);
                agent_name = agent_name_and_id[element];//alert(element);alert(agent_name)
                $('.uw-div>ul').append('<li data-underwriter-agent-name="'+ element +'" >'+agent_name+'</li>');
            });
        }

        diff_agent = $(current_agent).not(new_agent).get();
       
        $.each(diff_agent,function(i, agent_to_remove){
            $("[data-underwriter-agent-name='"+ agent_to_remove +"']").remove();
        });
        
    });

 //    $('#licence_chk').on('ifChanged', function(event){
	//    	var islicence= $(this).is(':checked');
	//    	if(islicence==true){
	//    		$("#license_date").attr('disabled','disabled');
	//    	}else{
	//    		$("#license_date").removeAttr('disabled');
	//    	}
	// });

	// $('body').on('click', '.delete_doc_broker', function(){  

 //        var id   = $(this).attr('id');
 //        var type = $(this).attr('alt');
 //        var project_confirm = confirm('Are you sure you want to delete this document?');
 //        var post_data = {id:id,type:type};
 //        post_data[global_csrf_token_name]= global_csrf_token_value;
 //        if(project_confirm==true){
 //            $.ajax({
 //              	type: 'POST',
 //              	data: post_data,
 //              	url:  '<?php echo base_url(); ?>backend/broker/broker_delete_doc',
 //              	dataType: "html",
 //              	success: function (response) {
 //                	$('#'+type+'_'+id).remove();
 //              	}
 //            });

 //        } else {
 //        	return false;
 //        }
 //    });

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

	$("#add-title-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			businessname:{required:true},
			firstname:{required:true},
			lastName:{required:true},
			address1:{required:true},
			city:{required:true},
			state:{required:true},
			zipcode:{required:true,validate_zip_code:true,number: true},
			phone:{required:true,
                phonecheck:true,
                // check_phone_exist:true
            },
			email:{required:true,
                email: true,
                check_email_exist:true
            },
			channel:{required:true},
			channel_publication:{required: function (element) {
					var channel = $("#channel").val();	
	                // if(channel!="search_engine" && channel!="social_media" && channel!="online" && channel!="conference"){
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
            },
            ein:{required:true,
                eincheck:true
            },
            fax:{required:true,
            phonecheck:true,},
            title_eo_amount:{required:true,min:function (element) {
                var eo_amount = $("#title_eo_amount").val();
                if(eo_amount !=''){
                    eo_amount =  parseFloat(eo_amount.replace(/,/g,'').replace('$','')).toFixed(2);
                }
                
                if(eo_amount >= 1000000){
                    //return true;
                }else{ 
                    return false;
                }
            }},
            title_eo_date:{required:true,
               },
		},
		messages: {
			businessname:{required:"Business Name is required"},
			firstname:{required:"First Name is required"},
			lastName:{required:"Last Name is required"},
			address1:{required:"Address is required"},
			city:{required:"City is required"},
			state:{required:"State is required"},
			zipcode:{required:"Zip Code is required",
              		validate_zip_code: "Please enter a valid Zip Code.",
              		number: "Zip Code should contains numbers Only."},
			phone:{required:"Phone Number is required",
              		phonecheck:"Phone number is invalid.",
              		// check_phone_exist:"This Phone already exists please use another one."
                },
			email:{required:"Email is required",
					email:"Please enter a valid email address.",
              	    check_email_exist:"This email already exists please use another one."
                },
			channel: {required:"Please select Channel"},
			channel_publication:{required:"Please select Channel Publication"},
            channel_publication_text:{required:"Source is required"},
			ein:{required:"EIN is required",
                 eincheck:"EIN is invalid"
             },
            fax:{required:"Fax is required",
                  phonecheck:"Fax is invalid"},
            title_eo_amount:{required:"Amount of Coverage on the E&O Policy is required",min:"Amount must be greater than or equal to $1,000,000.00"},
            title_eo_date:{required:"E&O Expiration Date is required",
            }

		},
		errorPlacement: function(error, element) {

            if (element.attr("name") == "title_license_date[]")
                element.parent().parent('.form-group').append(error);
            else if(element.attr("name") == "channel" || element.attr("name") == "channel_publication" || element.attr("name") == "state")
                element.parent().parent().parent('.form-group').append(error);
            else if((element.attr("name") == 'title_eo_date')){
                error.insertAfter(element.parent());
            }else    
                element.parent('.form-group').append(error);
         
				//error.insertAfter(element);
		}
	});
    $('#license-details').find('.valid_phonecheck').each(function () {
        $(this).rules('add', {
            phonecheck:true,
            messages: {
                phonecheck: "Phone number is invalid."
            }
        });
    });
    $('#license-details').find('.valid_emailcheck').each(function () {
        $(this).rules('add', {
            emailcheck:true,
            messages: {
                emailcheck: "Please enter a valid email address."
            }
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

    
	$.validator.addMethod("check_email_exist",function(value,element) {
		var userid = $('#title_company_id').val();
  		var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;

        if(userid == "" || value != email_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url + 'backend/titlecompany/check_email_exist',
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
    $.validator.addMethod("emailcheck", function(value, element) {
        
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

        if(!pattern.test(value))
          return false;
        else  
          return true;
    });

    $.validator.addMethod("phonecheck", function(value, element) {
        /*var phoneDigitsOnly = value.replace(/\D/g, '');
        var country = $(element).closest('.form-drpdown').find('.country').val();
        if(country == '226' || country == '38'){
            return /^[\d\-\(\)\. ]+$/.test(value) &&
              /^[2-9]\d{2}[2-9]\d{6}$/.test(phoneDigitsOnly) &&
              !/^\d{4}11/.test(phoneDigitsOnly) &&
              !/^(\d)\1{2}/.test(phoneDigitsOnly) &&
              !RegExp(phoneDigitsOnly).test('01234567890123456789')
        } else{
            return /^[\d\-\(\)\. ]+$/.test(value) &&
              /^\d{10}/.test(phoneDigitsOnly) &&
              !/^(\d)\1+$/.test(phoneDigitsOnly) &&
              !RegExp(phoneDigitsOnly).test('01234567890123456789')
        }*/
        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
            return true;
        else
            return false;
    });
    $.validator.addMethod("eincheck", function(value, element) {
         var ein =$('#ein_hid').val();
        var einDigitsOnly = ein.replace(/\D/g, ''); 
        
        var codeReg =/^\d{9}$/
        if (!codeReg.test(einDigitsOnly)) 
           return false;
        else 
            return true;
    }); 
    $('#state,#channel,#channel_publication').on('change',function(){
        if ($(this).val()!="")
        {
            $(this).valid();
        }
    });

 //    $.validator.addMethod("check_phone_exist",function(value,element) {
 //    	var userid = $('#broker_id').val();
 //    	var phone_check = $('#phone_check').val();
 //        var postData ={phone:value.replace(/\D/g, '')};
 //        postData[global_csrf_token_name]= global_csrf_token_value;
 //        if(userid=="" || value.replace(/\D/g, '')!==phone_check){
	//         $.ajax({
	//             type: "POST",
	//             async:false,
	//             url: base_url+ 'backend/broker/check_phone_exist',
	//             data: postData , 
	//             success: function(msg){ 
	//                 result = (msg == "1") ? false : true;
	//             }
	//         });
	//         return result;
 //        }
 //    });

    $.validator.addMethod("validate_zip_code", function(value, element) {
       	//var codeReg = /^(?!.*(\d)\1{4}).*$/;
        var codeReg =/^\d{5}$/
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

    $('#alternate_email').on('blur',function(){
       
        var userinput = $(this).val(); 
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
   

        if(!pattern.test(userinput)&& userinput!='')
          $('#alt_err').show();
       else  
          $('#alt_err').hide();
    });

	// save title
	$(document).on('click','#save_title',function(e){
		e.preventDefault();
		var title_form_valid = $("#add-title-form").valid();
        var appl_type = $(this).attr('data-type');
        /**/
        var loctn = [];
        $('input[name="area_check[]"]:checked').each(function(){
            id = $(this).val();
            loctn.push(id);

        }); 
        var flag = 0 ;
        if(loctn.length == 0){
            flag = 1;
            $('#geo').show();
            $('#geo').html('Geographic Areas is required');
        }

        /**/
		if(title_form_valid == true && flag == 0){

			var form = $('#add-title-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/titlecompany/add",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    var response = $.parseJSON(result);  
                	if(response.status = true){
                        if(appl_type == 'save')
                            window.location.href = base_url+'backend/titlecompany';
                        else
                            window.location.href = base_url+'backend/titlecompany/title/'+response.title_id;
                	}
                }
            });
		}
	});

    $(document).on('click','#cancel_title',function(e){
        window.location.href = base_url+'backend/titlecompany';
    });

    var data_property = {};
    var url_chart_property   = base_url + 'backend/titlecompany/title_loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val();
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var title_company_id = $('#title_company_id').val();
        data.title_company_id  = title_company_id;
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
                        x:20
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
                                name: 'Completed',
                                y: response.completed
                            }, {
                                name: 'In Progress',
                                y: response.inProgress
                            },{
                                name: 'Dead/Denied',
                                y: ( response.total - (response.inProgress+response.completed))
                            }]
                    }]
                });
            });
        });
    }

    var data_location= {};
    var url_chart_location   = base_url + 'backend/titlecompany/title_loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var title_company_id = $('#title_company_id').val();
        data.title_company_id  = title_company_id;
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
                    //colors: ['#ffaf46', '#cdcdcd','#ff6666']
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
                        useHTML: true
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
                        name: 'Browsers',
                        data: [{
                            name: 'Completed',
                            y: response.completed
                        }, {
                            name: 'In Progress',
                            y: response.inProgress
                        },{
                            name: 'Dead/Denied',
                            y: ( response.total - (response.inProgress+response.completed))
                        }]
                    }]
                });
            });
        });
    }

    var data_sub = {};
    var url_chart_sub = base_url + 'backend/titlecompany/title_loan_chart_sub';
    get_loan_chart_sub(data_sub, url_chart_sub);

    $('body').on('change', '#sub_accounts', function(){
        var sub_id = $(this).val();
        data_sub.sub_id  = sub_id;
        get_loan_chart_sub(data_sub, url_chart_sub);
    });

    function get_loan_chart_sub(data, url){
        var title_company_id = $('#title_company_id').val();
        data.title_company_id  = title_company_id;
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
                   // colors: ['#43bbf7', '#cdcdcd','#ff6666']
                    colors: ['#43d570', '#cdcdcd','#ff6666']
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
                        useHTML: true
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
                            name: 'Completed',
                            y: response.completed
                        }, {
                            name: 'In Progress',
                            y: response.inProgress
                        },{
                            name: 'Dead/Denied',
                            y: ( response.total - (response.inProgress+response.completed))
                        }]
                    }]
                });
            });
        });
    }
    
    $(document).on('ifChanged','.main_poc',function(){  
        var l = $(this).closest('.form-group').parent().next();
        if($(this).prop('checked')==true){
          
          l.find("[name='poc_fname[]']").val($('#firstname').val());
          l.next().find("[name='poc_lname[]']").val($('#lastName').val());
          l.next().next().find("[name='poc_phone[]']").val($('#phone').val());
          l.next().next().next().find("[name='poc_email[]']").val($('#email').val());
          $(this).closest('.form-group').parent().siblings('.same_poc').hide();
        }else{
          l.find("[name='poc_fname[]']").val('');
          l.next().find("[name='poc_lname[]']").val('');
          l.next().next().find("[name='poc_phone[]']").val('');
          l.next().next().next().find("[name='poc_email[]']").val('');
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

    $(document).on('click','.delete-doc',function(){ 
        var type = $(this).attr('alt');
        var id   = $(this).attr('id');
        var postData ={type:type,id:id};
        postData[global_csrf_token_name]= global_csrf_token_value;
        var project_confirm = confirm('Are you sure you want to delete this document?');
        if(project_confirm==true){
            $.ajax({
                type: "POST",
                async:false,
                url: base_url + "backend/titlecompany/title_delete_doc",
                data: postData , 
                success: function (response) {
                    $('#'+type+'_'+id).remove();
                }
            });
        }
        
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
    $(document).on('click','#block-user',function(){
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
                    // window.location.reload();
                    swal("Updated!", "Title Company  Blocked Successfully", "success");
                }else{
                     swal("Cancelled", "Title Company  could not be blocked ", "error");
                }
            });
        }else{

        }
    });
    $(document).on('click','.confirm',function(){
        window.location.reload();
    });
    $(document).on('click','#unblock-user',function(){
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'title_id':appr_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/titlecompany/change_block_status',"Do you really want to unblock this Title Company?","Title Company  Unblocked Successfully.","Title Company could not be unblocked",'title-table-list');
    
    });
    // $(document).on('click','#active_title',function(){
    //     var title_id = $(this).attr('data-id');
    //     var type = $(this).attr('data-type');
    //     status_update_refresh({'status':type,'title_company_id':title_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/titlecompany/change_status',"Do you really want to change status of this Title company?","Title company status updated successfully.","Title company status is could not be updated",'title-table-list');

    // });

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

    $(document).on('click','#title-deactivate',function(){
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
                    // window.location.reload();
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

    $(document).on('click','#title-activate',function(){
        var title_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'title_company_id':title_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/titlecompany/change_status',"Do you really want to change status of this Title company?","Title company status updated successfully.","Title company status is could not be updated",'title-table-list');
    });


});
