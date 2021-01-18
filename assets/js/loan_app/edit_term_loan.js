var base_url = null;
var more_id = null;
var trakinfo = false;
var port_flag = false;
$(document).ready(function(){
	base_url = $("#base-url-1").val();
	more_id = parseInt($("#more_id").val());
    var user_id  = $("#user_id").val();
    var broker_id = $("#broker_id").val();

	/*disable for changing loan progra,*/
	$('.loan_program').iCheck('disable');
	event
	$(document).on('ifChecked','.loan_program',function(event){
		alert('dd');
		event.preventDefault();
		event.stopPropagation();
	});

	$(document).on('ifChecked','.check',function(){
		$(this).closest('.form-group').find('label.error').hide();
	});

	/* hide label error for selectpicker */
	$(document).on('change', '.selectpicker', function(){
        val = $(this).val();
        if(val)
        {	
            $(this).closest('.form-group').find('label.error').hide();
        }
    });

	//on load hide divs
	/*$("#shareline-div").hide();
	$("#entity-div").hide();
	$("#affi-ass-div").hide();
	$("#mem-des-div").hide();
	$("#toe-div").hide();
	$("#lien-div").hide();
	$("#third-lien-div").hide();	
	$(".short-sale-div").hide();
	$("#loan-purpose-div").hide();
	$("#current_mortgage").hide();	
	if($('#sale_rep_yes').prop('checked') == true){
		$("#sale-div").show();
	}else{
		$("#sale-div").hide();
	}*/

	$("#desired_funding_date").datepicker({
        //startDate:'+5d',
		format: 'mm/dd/yyyy',
		autoclose: true
    }).on('changeDate', function(){
           $(this).closest('.form-group').find('label.error').hide();
    });

	$("#original_purchase_date").datepicker({
        endDate:'today',
		format: 'mm/dd/yyyy',
		autoclose: true
    }).on('changeDate', function(){
           $(this).closest('.form-group').find('label.error').hide();
    });

	$(".more_collater_datePicker").datepicker({
        endDate:'today',
		format: 'mm/dd/yyyy',
		autoclose: true
    }).on('changeDate', function(){
           $(this).closest('.form-group').find('label.error').hide();
    });

	$("#toe_closing_date").datepicker({
        startDate:'today',
		format: 'mm/dd/yyyy',
		autoclose: true
    }).on('changeDate', function(){
           $(this).closest('.form-group').find('label.error').hide();
    });

	//check borrower or broker
	$(document).on('ifChecked','#borrower',function(){
		if($(this).prop('checked') == true){
			$("#broker-form").removeClass('active-form');
			$('.nav-tabs li:nth-child(4)').hide();
			$(".broker_or_borrower").attr('data-value','BO');
			$("#shareline-div").hide();
			$('#shareline_user').val('');
			$('#shareline_user').selectpicker('refresh');

		}
	});

	$(document).on('ifChecked','#broker',function(){
		if($(this).prop('checked') == true){
			$("#broker-form").addClass('active-form');
			$('.nav-tabs li:nth-child(4)').show();
			$(".broker_or_borrower").attr('data-value','BR');
			$("#shareline-div").hide();
			$('#shareline_user').val('');
			$('#shareline_user').selectpicker('refresh');
		}
	});

	$(document).on('ifChecked','#shareline',function(){
		if($(this).prop('checked') == true){
			$("#broker-form").removeClass('active-form');
			$('.nav-tabs li:nth-child(4)').hide();
			$(".broker_or_borrower").attr('data-value','SB');
			$("#shareline-div").show();
			$("#channel option[value='broker']").remove();
		}
	});

	$(document).on('ifChecked','.broker_or_borrower',function(){
		if($(this).val()=='BR'){
			
			$(".hear_abt_borrower").hide();
			$('#channel_borrower').rules('remove');
			$('#channel_publication_borrower').rules('remove');
			
			
		}
		if($(this).val()=='BO'){
			
			$(".hear_abt_borrower").show();
		}
		add_borrower_check_rule($(this).val());

	});

	//refinance change
	var tr_type = null;
	$(document).on('ifChecked','.transaction_type',function(){
		if($(this).prop('checked') == true){
			tr_type  = $(this).val();
			if(tr_type == 'R' || tr_type == 'RA'){
				$("#refin-div").show();
				$("#purchase_price" ).rules("remove" );
				$("#purchase_price" ).val('').prop('disabled',true);
				$("#acquisition_loan_request").prev('.control-label').html('Refinance Loan Request<span class="require-star">*</span>');

				//new changes
				//$("#ref_amounts").show();
				$("#pr_amounts").hide();
				//$("#construction_budget" ).rules("remove" );
				//$("#remaining_construction_budget" ).rules("add",{required:true,messages:{required:'Current Remaining Construction Budget is required'}});
				$("#purchase_price").val('');
				//$("#construction_budget").val('');
				$(".refin-const").show();
				$(".short-sale-div").hide();
				$("#mem-des-div").hide();
				$(".short-sale").prop('checked',false).iCheck('update');
				$('input[name="assignment_flip_type"]').prop('checked',false).iCheck('update');
				$("#affiliate_description").val('');
				$("#contract_assigned").val('');
				$("#assignor").val('');
				$('input[name="assignor_affiliate"]').prop('checked',false).iCheck('update');

				$("#loan-purpose-div").show();
				$(".refin-spent1").hide();

				
			}else{
				$("#acquisition_loan_request").prev('.control-label').html('Acquisition Loan Request<span class="require-star">*</span>');
				$("#refin-div").hide();
				$("#original_purchase_date").val('');
				$("#original_purchase_price").val('');
				$("#purchase_price" ).rules("add",{required:true,messages:{required:'Purchase price is required'}});
				$("#purchase_price" ).val('').prop('disabled',false);
				$(".exist-mort").prop('checked',false).iCheck('update');
				$("#current_mortgage_name").val('');
				$('#current_mortgage_balance').val('');
				$("#current_mortgage").hide();
				//$("#construction_budget" ).val('').prop('disabled',false);
				//$("#construction_loan_request" ).val('').prop('disabled',false);

				//new changes
				//$("#ref_amounts").hide();
				$("#pr_amounts").show();
				//$("#remaining_construction_budget" ).rules("remove");
				//$("#remaining_construction_budget").val('');
				//$("#construction_budget1").val('');
				//$("#construction_budget" ).rules("add",{required:true,messages:{required:'Construction budget is required'}});
				$(".refin-const").hide();
				$(".start-const").prop('checked',false).iCheck('update');
				$(".paid-recpt").prop('checked',false).iCheck('update');
				$("#spent_amount").val('');
				$(".recpt-list").html('');
				$('input[name="receipt_files[]"]').val('');
				$(".refin-spent").hide();
				$("#refin-file").hide();
				$(".short-sale-div").show();
				$("#loan-purpose-div").hide();
				$(".loan_purpose").prop('checked',false).iCheck('update');
			}
			collateral_action(tr_type);
		}
	});

	$(document).on('ifChecked','#existing_mortgage_yes',function(){
		if($(this).prop('checked') == true){;
			$("#current_mortgage").show();
		}
	});
	$(document).on('ifChecked','#existing_mortgage_no',function(){
		if($(this).prop('checked') == true){;
			$("#current_mortgage").hide();
		}
	});

	//salesperson div
	$(document).on('ifChecked','#sale_rep_yes',function(){
		if($(this).prop('checked') == true){
			$("#sale-div").show();
		}
	});

	$(document).on('ifChecked','#sale_rep_no',function(){
		if($(this).prop('checked') == true){
			$("#sale-div").hide();
			$('#sales_person').val('');
			$('#sales_person').selectpicker('refresh');
		}
	});
	

	$(document).on('ifChecked','.lien-position',function(){
		if($(this).prop('checked') == true){
			var lien_value  = $(this).val();
			if(lien_value == 'second_lien'){
				$("#lien-div").show();
				$("#third-lien-div").hide();
				$("#third_lean_holders_name").val('');
				$("#third_lien_loan_amount").val('');
			}else if(lien_value == 'third_lien'){
				$("#lien-div").show();
				$("#third-lien-div").show();
				
			}else{
				$("#lien-div").hide();
				$("#lean_holders_name").val('');
				$("#second_lien_laon_amount").val('');

				$("#third-lien-div").hide();
			}
		}
	});

	$(document).on('ifChecked','.toe-check',function(){
		if($(this).prop('checked') == true){
			var toe_value  = $(this).val();
			if(toe_value == 'Y'){
				$("#toe-div").show();
			}else{
				$("#toe-div").hide();
				$("#toe_closing_date").val('');
			}
		}
	});

	//LLC transaction details
	$(document).on('ifChecked','#llc_transaction_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#entity-div").show();
		}
	});
	$(document).on('ifChecked','#llc_transaction_No',function(){
		if($(this).prop('checked') == true){
			$("#entity-div").hide();
			$("#entity_name").val('');
			$('#entity_name').selectpicker('refresh');
		}
	});

	$(document).on('ifChecked','#membership_units_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#mem-des-div").show();
		}
	});
	$(document).on('ifChecked','#membership_units_No',function(){
		if($(this).prop('checked') == true){
			$("#mem-des-div").hide();
			$("#assignment_description").val('');
		}
	});


	//assignor text area
	$(document).on('ifChecked','#assignor_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#affi-ass-div").show();
		}
	});

	$(document).on('ifChecked','#assignor_No',function(){
		if($(this).prop('checked') == true){
			$("#affi-ass-div").hide();
			$("#affiliate_description").val('');
		}
	});

	//transation form validation
	$("#transaction-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {

			loan_type:{required:true},
			sales_rep:{required:true},
			citizenship_type:{required:true},
			shareline_user:{required:"#shareline:checked"},
			sales_person:{required:"#sale_rep_yes:checked"},
			transaction_type:{required:true},
			existing_mortgage:{required:".ref-req:checked"},
			current_mortgage_name:{required:"#existing_mortgage_yes:checked"},
			current_mortgage_balance:{required:"#existing_mortgage_yes:checked"},
			loan_purpose:{required:".ref-req:checked"},
			lien_position:{required:true},
			lean_holders_name:{required:function(){
				var isChecked = $("input[name=lien_position]:checked").val();
				if(isChecked == 'second_lien' ||isChecked == 'third_lien'){
					return true;
				}else{
					return false;
				}
			}},
			second_lien_laon_amount:{required:function(){
				var isChecked = $("input[name=lien_position]:checked").val();
				if(isChecked == 'second_lien' || isChecked == 'third_lien'){
					return true;
				}else{
					return false;
				}
			}},
			third_lean_holders_name:{required:"#third_lien:checked"},
			third_lien_loan_amount:{required:"#third_lien:checked"},
			loan_term_request:{required:true},
			amortizing_interest:{required:".rate-opt-req:checked"},
			desired_funding_date:{required:true},
			toe_transaction:{required:true},
			toe_closing_date:{required:"#toe_transaction_yes:checked"},
			shortsale_transaction_type:{required:"#purchase:checked"},
			assignment_flip_type:{required:"#purchase:checked"},
			contract_assigned:{required:'#membership_units_Yes:checked'},
			assignor:{required:'#membership_units_Yes:checked'},
			assignor_affiliate:{required:'#membership_units_Yes:checked'},
			affiliate_description:{required:"#assignor_Yes:checked"},
			llc_transaction_type:{required:true},
			entity_type:{required:"#llc_transaction_Yes:checked"},
			entity_name:{required:"#llc_transaction_Yes:checked"},
		},
		messages: {
			loan_type :{required:"Please select a value "},
			sales_rep :{required:"Please select a value "},
			citizenship_type :{required:"Please select a value "},
			sales_person:{required:"Please Select a Sales Person"},
			shareline_user:{required:"Please Select a Shareline User"},
			transaction_type:{required:"Please select a transaction type"},
			existing_mortgage:{required:"Please select a value"},
			current_mortgage_name:{required:"Please enter current mortgage name"},
			current_mortgage_balance:{required:"Please enter current mortgage balance"},
			loan_purpose:{required:"Please select a loan purpose"},
			lien_position:{required:"Please Select a value"},
			lean_holders_name:{required:"Lien Holder's Name is required"},
			second_lien_laon_amount:{required:"Loan Amount from First Lien is required"},
			third_lean_holders_name:{required:"Lien Holder's Name is required"},
			third_lien_loan_amount:{required:"Loan Amount from Second Lien is required"},
			loan_term_request:{required:"Please select loan term request"},
			amortizing_interest:{required:"Please Select a value"},
			desired_funding_date:{required:"Please enter desired funding date"},
			toe_transaction:{required:"Please select a value"},
			toe_closing_date:{required:"Please enter T.O.E. closing date"},
			shortsale_transaction_type:{required:"Please select a value"},
			assignment_flip_type:{required:"Please select a value"},
			assignment_description:{required:"This field is required"},
			contract_assigned:{required:"This field is required"},
			assignor:{required:"Assignor is required"},
			assignor_affiliate:{required:"Please select a value"},
			affiliate_description:{required:"This field is required"},
			llc_transaction_type:{required:"Please select a value"},
			entity_type:{required:"Please select a Entity Type"},
			entity_name:{required:"Entity name is required"},

		},
		errorPlacement: function(error, element) {
			   
		    if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
		    	$(element).closest('.form-group').append(error);
		    }else if(element.is('select')){
                $(element).closest('.form-group').append(error);
            }else if(element.attr("name") == "desired_funding_date" || element.attr("name") == "toe_closing_date" ){
				$(element).closest('.form-group').append(error);
			}else{
				error.insertAfter(element);
			} 
		},
		invalidHandler: function(form, validator) {
        	var errors = validator.numberOfInvalids();
        	if (errors) {                    
            	validator.errorList[0].element.focus();
        	
    		} 
    	}
	});

	/*$(document).on('click','#ctn-btn1',function(e){

		if($('#transaction-form').valid() == true){

			$('a[data-target="#property_info"]').removeClass('disabled');
			$('a[data-target="#property_info"]').attr('data-toggle','tab');

			$('a[data-target="#property_info"]').trigger('click');
		}
		return false;
	});	*/

    //-------------------------------------------Property Info------------------------------------------//
    //on load hide divs
    /*$("#refin-div").hide();
	$(".refin-const").hide();
	$(".refin-spent").hide();
	//$("#refin-file").hide();
	$('.current-div').hide();*/

   $(document).on('ifChecked','.start-const',function(){
		if($(this).prop('checked') == true){
			var const_value  = $(this).val();
			var collateral_cons_data_id = $(this).attr('data-id');
			if(const_value == 'Y'){
				$(".refin-spent").show();
			}else{
				$(".refin-spent").hide();
				$("#spent_amount").val('');
				//$("#refin-file").hide();
				$('input[name="receipt_files[]"]').val('');
				$(".recpt-list").html('');
				$(".paid-recpt").prop('checked',false).iCheck('update');
			}
		}
	});

   $(document).on('ifChecked','.start-const1',function(){
		if($(this).prop('checked') == true){
			var const_value  = $(this).val();
			var collateral_cons_data_id = $(this).attr('data-id');
			if(const_value == 'Y'){
				if(collateral_cons_data_id !=""){
					$(".refin-spent"+collateral_cons_data_id).show();
				}
			}else{
				if(collateral_cons_data_id !=""){
					$(".refin-spent"+collateral_cons_data_id).hide();
				}
			}
		}
	});

   $(document).on('click','.paid-recpt',function(){
		if($(this).prop('checked') == true){
			var paid_value  = $(this).val();
			var collateral_paid_data_id = $(this).attr('data-id');
			if(paid_value == 'Y'){
			}else{
				$('input[name="receipt_files[]"]').val('');
				$(".recpt-list").html('');
			}
		}
	});

    var fileList = new Array;
    var file_count  =0;
	$(document).on('change','#receipts_file',function(){
		ShwLoadingPanel();
		if($(this).val() != null || $(this).val() !=''){
			var data = new FormData($('#property-info-form')[0]);
			data.append('csrf_test_name',global_csrf_token_value);
         	$.ajax({
             	url: base_url + "quick_loan_application/upload_receipts_docs",
             	type: "POST",
             	data: data,
             	contentType: false,
             	cache: false,
             	processData: false,
             	success: function(response){
             		remvLoadingPanel();
             		var response_data = $.parseJSON(response);	
             		//console.log(response_data);
             		if(response_data.status == true){
             			var file_details = response_data.file_data;
             			//alert(file_details.file_name);
             			fileList[file_count] = {"serverFileName" : file_details.file_name, "fileName" : file_details.file_name,"fileId" : file_count ,"file_id":file_details.raw_name};
             			file_count ++;
             			$("#transaction-form").append($('<input type="hidden" ' +'name="receipt_files[]" ' +'value="' +file_details.file_name+'"id="' +file_details.raw_name+ '">'));
             			//alert(response_data.file_data[file_name]);

             			$(".recpt-list").append('<li><span class="file-r glyphicon glyphicon-file"></span>'+file_details.file_name+'<a href="javascript:void(0);" class="delete_file" data-file-id="'+file_details.raw_name+'" data-file-name="'+file_details.file_name+'"> <span class="glyphicon glyphicon-remove text-danger"></span></a></li>');
             			$("#receipts_file").val('');
             			$('#doc_count').val($('input[name="receipt_files[]"]').length);
             			$("#doc_count").find('input').removeClass('error');
          				$("#doc_count").next('label').hide();	
             		}
             	}

				
			});
		}
		
	});

	$(document).on('click','.delete_file',function(){
		var delete_file_id = $(this).attr('data-file-id');
		var delete_file_name = $(this).attr('data-file-name');
		var element = $(this);
		if(confirm("Are you sure you want to delete this document?") == true){
			$.get(base_url+'backend/quick_loans/delete_receipt_file',{'file_name':delete_file_name,'file_id':''},function(data){
				var response = $.parseJSON(data);

				if(response.status == true){
					$('#'+delete_file_id).remove();
					$(element).parent('li').remove();
					$('#doc_count').val($('input[name="receipt_files[]"]').length);
				}
			});
		}
	});

	$(document).on('blur','.cal-total',function(){	
    	calculate_construction_budget();
    });

    $(document).on('ifChecked','.as-is-chck',function(){		

		if($(this).prop('checked')== true){
			$('.unit').val('');
		}
		$.get(base_url+'quick_loan_application/get_property_use',{'asset_type':$(this).val()},function(data){
			var response = $.parseJSON(data);
	    	var props =  response.prop_use;
	    	if(response.status == true){
				$("#property_use").html('');
				$("#property_use").append('<option value="">-- Select --</option>');
				$.each(props,function(key,name){
			       $("#property_use").append('<option value="' + name + '">' + name + '</option>');
			    });
			    $("#property_use").selectpicker('refresh');
			}

		});

		if($(this).val() == 'Portfolio'){
			$(".add-collateral-chk").prop('checked',false).iCheck('update');
			$("#additional_collateral_yes").prop('checked',true).iCheck('update');
			if($("#additional_collateral_yes").prop('checked') == true){
				port_flag = true;
				$("#more_collatral").show();
				$(".add-more").show();
				$("#portfolio-unit-div").show();
			}
		}else{
			if(port_flag == true){
				$(".add-collateral-chk").prop('checked',false).iCheck('update');
				$("#additional_collateral_no").prop('checked',true).iCheck('update');
				if($("#additional_collateral_no").prop('checked') == true){
					$("#more_collatral").hide();
					$(".add-more").hide();
					$('#more_collatral').find('input:text').val('');
					$('#more_collatral').find('select').val('');
					$(".collateral:gt(0)").remove();
					more_id = 1;
				}
			}
			$("#portfolio-unit-div").hide();
			$("#portfolio_units").val('');
		}
	});

	$(document).on('ifChecked','.occupancy-chk',function(){

		var ocup_val = $(this).val();
		if($(this).prop('checked')== true && ocup_val == 'Partially Occupied' || ocup_val == 'Fully Occupied'){
			$('.current-div').show();
		}else{
			$(".current-div").find('input:text').val('');;
			$('.current-div').hide();
		}

		$(".dev-phase").prop('checked',false).iCheck('update');
		$(".dev-phase").closest('.full-width').hide();
		if(ocup_val == 'Vacant'){
			$(".dev-phase").closest('.full-width').show();

		}else if(ocup_val == 'Partially Occupied'){
			var per  = $('#partial_percentage').val();
	        per      = parseFloat(per.replace(/[^0-9-.]/g, ''));
	        if(per<80){
				$(".dev-phase").closest('.full-width').show();
				$(".dev-phase[value='Ground Up Construction']").closest('.full-width').hide();
			}else if(per>=80){
				$(".dev-phase[value='In Contract to Sell']").closest('.full-width').show();
				$(".dev-phase[value='Rehab Complete & Listed for Sale']").closest('.full-width').show();
				$(".dev-phase[value='Leasing']").closest('.full-width').show();
			}else{
	        	$(".dev-phase").closest('.full-width').show();
	        	$(".dev-phase[value='Ground Up Construction']").closest('.full-width').hide();
	        	$(".dev-phase[value='Entitlements']").closest('.full-width').hide();
	        }
		}else if(ocup_val == 'Fully Occupied'){
			$(".dev-phase[value='In Contract to Sell']").closest('.full-width').show();
			$(".dev-phase[value='Rehab Complete & Listed for Sale']").closest('.full-width').show();
			$(".dev-phase[value='Leasing']").closest('.full-width').show();
		}

	});

    //property infomation form validate
	$("#property-info-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {

			property_address:{required:true},
			property_city:{required:true},
			property_county:{required:true},
			property_state:{required:true},
			property_zip_code:{required:true,minlength:5},
			property_asset_type:{required:true},
			property_use:{required:true},
			original_purchase_date:{required:{depends:function(element) {return $(".ref-req").is(":checked");}}},
			original_purchase_price:{required:{depends:function(element) {return $(".ref-req").is(":checked");}}},
			start_construction:{required:{depends:function(element) {return $(".ref-req").is(":checked");}}},
			spent_amount:{required:"#start_construction_yes:checked"},
			paid_receipts:{required:"#start_construction_yes:checked"},
			purchase_price:{required:true},
			as_is_value:{required:true},
			acquisition_loan_request:{required:true},
			residential_units:{required:"#type_Residential:checked",min:1,max:4},
			multi_family_units:{required:"#type_Multi-Family:checked",min:5},
			mixed_use_commercial_units:{required:"#type_Mixed_Use:checked",min:1},
			mixed_use_residential_units:{required:"#type_Mixed_Use:checked",min:1},
			commercial_units:{required:"#type_Commercial:checked",min:1},
			portfolio_units:{required:"#type_Portfolio:checked",min:1},
			current_occupancy:{required:true},
			partial_percentage:{required:".partial-check:checked"},
			new_property_use:{required:".new-asset-req:checked"},
			investment_summary:{required:true},
			development_phase:{required:true},
			exit_strategy:{required:true},
			'cl[0][property_addres]':{required:"#additional_collateral_yes:checked"},
			'cl[0][city]':{required:"#additional_collateral_yes:checked"},
			'cl[0][state]':{required:"#additional_collateral_yes:checked"},
			'cl[0][zipcode]':{required:"#additional_collateral_yes:checked"},
			'cl[0][asset_type]':{required:"#additional_collateral_yes:checked"},
			'cl[0][occupancy]':{required:"#additional_collateral_yes:checked"},
			'cl[0][phase]':{required:"#additional_collateral_yes:checked"},
			'cl[0][as_is_property_value]':{required:"#additional_collateral_yes:checked"},
			'cl[0][is_this_property]':{required:"#additional_collateral_yes:checked"},
			'cl[0][is_this_property]':{required:"#additional_collateral_yes:checked"},
			'cl[0][loan_amount]':{required:"#encumbered1:checked"},
			'cl[0][loan_being]':{required:"#encumbered1:checked"},
			'cl[0][purchase_price]':{required:{depends:function(element) {if($("#purchase").is(":checked")&&$("#additional_collateral_yes").is(":checked")){return true}}}},
			'cl[0][original_purchase_date]':{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#additional_collateral_yes").is(":checked")){return true}}}},
			'cl[0][original_purchase_price]':{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#additional_collateral_yes").is(":checked")){return true}}}},
			'cl[0][start_construction]':{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#additional_collateral_yes").is(":checked")){return true}}}},
			'cl[0][spent_amount]':{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#additional_collateral_yes").is(":checked") && $("#start_construction_yes1").is(":checked")){return true}}}},
			'cl[0][paid_receipts]':{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#additional_collateral_yes").is(":checked") && $("#start_construction_yes1").is(":checked")){return true}}}},
			
		},
		messages: {
			property_address :{required:"Property Address is required"},
			property_city:{required:"Property City is required"},
			property_county:{required:"County is required"},
			property_state:{required:"Please select a State"},
			property_zip_code:{required:"Zip Code  is required",minlength:"Please enter at least 5 digits"},
			property_asset_type:{required:"Please select a value"},
			property_use:{required:"Please select a Property Use"},
			original_purchase_date:{required:"Original purchase date is required"},
			original_purchase_price:{required:"Original purchase price is required"},
			start_construction:{required:"Please select a value"},
			spent_amount:{required:"This field is required"},
			paid_receipts:{required:"Please select a value"},
			purchase_price:{ required:"Purchase Price is required"},
			as_is_value:{required:"As Is Value is required"},
			acquisition_loan_request:{required:"Acquisition Loan Request is required"},
			residential_units:{required:"Units is required"},
			multi_family_units:{required:"Units is required"},
			mixed_use_commercial_units:{required:"Units is required"},
			mixed_use_residential_units:{required:"Units is required"},
			commercial_units:{required:"Units is required"},
			portfolio_units:{required:"Units is required"},
			current_occupancy:{required:"Please select a value"},
			partial_percentage:{required:"Percentage is required"},
			current_goi:{required:"Current GOI is required"},
			current_expenses:{required:"Current Expenses is required"},
			current_noi:{required:"Current NOI is required"},
			stablized_goi:{required:"Stabilized GOI is required"},
			stablized_expenses:{required:"Stabilized Expenses is required"},
			stablized_noi:{required:"Stabilized NOI is required"},
			development_phase:{required:"Please select a value"},			
			exit_strategy:{required:"Please select a value"},
			doc_count: {min: "Please upload atleast one paid receipt"},
			doc_count1: {min: "Please upload atleast one paid receipt"},
			investment_summary:{required:"Investment summary is required"},
		},
		errorPlacement: function(error, element) {
			   
		    if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
		    	$(element).closest('.form-group').append(error);
		    }else if(element.hasClass('selectpicker') || element.parent().hasClass('input-group')){
				$(element).closest('.form-group').append(error);
			}else if(element.hasClass('unit') || element.hasClass('nw-unit') || element.attr("name")=='partial_percentage'){
				$(element).closest('li').append(error);
			}else{
				error.insertAfter(element);
			} 
		},
		invalidHandler: function(form, validator) {
        	var errors = validator.numberOfInvalids();
        	if (errors) {                    
            	validator.errorList[0].element.focus();
        	
    		} 
    	}
	});
	
	/*property zipcode change */
	$(document).on('focusout','#property_zip_code',function(){
		var prop_addrs = $(this).val();
		if(prop_addrs !='' ||prop_addrs !=null){
			//alert(prop_addrs);
			/*$.get(base_url+'quick_loan_application/get_address_info',{'address':prop_addrs},function(data){
				var addres_response = $.parseJSON(data); 
				if(addres_response.status==true){
					if($("#refinance-CEMA").prop('checked') == true && addres_response.state_id!= 5){
						swal("Warning!", "CEMA is applicable only for New York loans. Please choose address from New York.", "warning");
						$('#property_zip_code').val("");
						$('#property_city').val("");
						$('#property_county').val("");
						$('#property_state').val("").change();
					}else{
						$('#property_city').val(addres_response.city);
						$('#property_county').val(addres_response.county);
						$('#property_state').val(addres_response.state_id).change();;
						$('#property_zip_code').val(addres_response.zipcode);
					}
					
				}
			});*/
		}
	});

	/*$(document).on('click','#ctn-btn2',function(e){

		if($('#property-info-form').valid() == true){

			$('a[data-target="#borrower_info"]').removeClass('disabled');
			$('a[data-target="#borrower_info"]').attr('data-toggle','tab');

			$('a[data-target="#borrower_info"]').trigger('click');
		}
		return false;
	});
*/
	$(document).on('click','#back-btn2',function(e){
		$('a[data-target="#transaction_info"]').trigger('click');
	});

	//----------------------- Collateral Property-------------------------------------//
	//$("#more_collatral").hide();
	/*$(".add-more").hide();	
	$(".collateral-purchase").hide();
	$(".collateral-refinance").hide();
	$(".refin-spent1").hide();
	//$("#refin-file1").hide();
	$('#show-loan1').hide();*/
	$('.add-more').not(':last').hide();

	$(document).on('ifChecked','#additional_collateral_yes',function(){
		
		if($(this).prop('checked') == true){

			$("#more_collatral").show();
			$(".add-more").show();
			var checked_tr_type =$('input[name=transaction_type]:checked').val();
			collateral_action(checked_tr_type)


			if($("#type_Portfolio").prop('checked')== false){
				//$('.unit').val('');
				//port_flag = true;
			}

		}
	});

	$(document).on('ifChecked','#additional_collateral_no',function(){
		if($(this).prop('checked') == true){
			$("#more_collatral").hide();
			$(".add-more").hide();
			$('#more_collatral').find('input:text').val('');
			$('#more_collatral').find('select').val('');
			$(".collateral:gt(0)").remove();
			more_id = 1;
		}
	});

	$(document).on('ifChecked','.is-this-prop',function(){
		var show_loan_id = $(this).attr('data-id');
		var is_this_value = $(this).val();
		if($(this).prop('checked') == true && is_this_value == 'Encumbered'){
			$("#show-loan"+show_loan_id).show();
		}else{
			$("#show-loan"+show_loan_id).hide();
			$("#loan-amount"+show_loan_id).val('');
			$("#paying"+show_loan_id).prop('checked',false).iCheck('update');
			$("#taking"+show_loan_id).prop('checked',false).iCheck('update');
		}
	});

	/*collateral property address auto fill*/
	$(document).on('focus','.collateral_address',function(e){ 
	  	id =  $(this).attr("rel");
	  	//alert(id);
	    MultiAutocomplete(id);
	});

	$(document).on('change','.coll_asset_type',function(){
		var col_attr = $(this).attr('data-id');
        var closestuse= $(this).closest('.row').find('#col_as_is_property_use'+col_attr);
        if($(this).val()!=""){        	
			$.get(base_url+'quick_loan_application/get_property_use',{'asset_type':$(this).val()},function(data){
				var response = $.parseJSON(data);
				var props =  response.prop_use;
				if(response.status == true){
					closestuse.find('option').remove();
					closestuse.append('<option value="">--Select--</option>');
						$.each(props,function(key,name){
					       closestuse.append('<option value="' + name + '">' + name + '</option>');
					    });
					closestuse.selectpicker('refresh');
				}
			});		
		}
	});

	$(document).on('click','.add-more',function(){
		
		more_id = more_id+1;
		add_more_item(more_id);
		$(".collateral-purchase"+more_id).hide();
		$(".collateral-refinance"+more_id).hide();
		$(".refin-spent"+more_id+"").hide();
		//$("#refin-file"+more_id+"").hide();
		$("#show-loan"+more_id).hide();
		$("#property_addres"+more_id).rules('add',{required: true, messages:{required:"Property Address is required"}});
		$("#city"+more_id).rules('add',{required: true,messages:{required:"City is required"}});
		$("#state"+more_id).rules('add',{required: true,messages:{required:"Please select a State"}});
		$("#zipcode"+more_id).rules('add',{required:true,minlength:5,messages:{required:"Zip Code is required",minlength:"Please Enter a valid 5-digit Zip code"}});
		$("#asset_type"+more_id).rules('add',{required: true,messages:{required:"Please select a Asset Type"}});
		$("#occupancy"+more_id).rules('add',{required: true,messages:{required:"Please select a Current Occupancy"}});
		$("#phase"+more_id).rules('add',{required: true,messages:{required:"Please select a Development Phase"}});
		$("#as_is_property_value"+more_id).rules('add',{required: true,messages:{required:"As Is Property Value is required"}});
		$('[name="cl['+more_id+'][is_this_property]"]').rules('add',{required: true,messages:{required:"Please select a value"}});
		$("#loan-amount"+more_id).rules('add',{required:function(elem){
            return $("#encumbered"+more_id+":checked").length > 0},messages:{required:"Loan Amount is required"}});
		$('[name="cl['+more_id+'][loan_being]"]').rules('add',{required:function(elem){
            return $("#encumbered"+more_id+":checked").length > 0},messages:{required:"Please select a value"}});
		if($(".ref-req").is(":checked")){
			$(".collateral-purchase"+more_id+"").hide();
			$(".collateral-refinance"+more_id+"").show();
			$(".refin-spent"+more_id+"").hide();
			//$("#refin-file"+more_id+"").hide();
			$('[name="cl['+more_id+'][original_purchase_date]"]').rules('add',{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#additional_collateral_yes").is(":checked")){return true}}},messages:{required:"Original Purchase Date"}});
			$('[name="cl['+more_id+'][original_purchase_price]"]').rules('add',{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#additional_collateral_yes").is(":checked")){return true}}},messages:{required:"Original Purchase Price"}});
			$('[name="cl['+more_id+'][start_construction]"]').rules('add',{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#additional_collateral_yes").is(":checked")){return true}}},messages:{required:"Please select a value"}});
			$('[name="cl['+more_id+'][spent_amount]"]').rules('add',{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#start_construction_yes"+more_id+"").is(":checked")){return true}}},messages:{required:"This field is required"}});
			$('[name="cl['+more_id+'][paid_receipts]"]').rules('add',{required:{depends:function(element) {if($(".ref-req").is(":checked")&&$("#start_construction_yes"+more_id+"").is(":checked")){return true}}},messages:{required:"This field is required"}});
			$(".more_collater_datePicker").datepicker({
		        endDate:'today',
				format: 'mm/dd/yyyy',
				autoclose: true
		    }).on('changeDate', function(){
		           $(this).closest('.form-group').find('label.error').hide();
		    });
		    $('.icon-calender').click(function() {
	            $(this).closest('div').prev().focus();
	        });
	        
		}else{
			$("#purchase_price"+more_id).rules('add',{required: true,messages:{required:"Purchase Price is required"}});
			$(".collateral-purchase"+more_id+"").show();
			$(".collateral-refinance"+more_id+"").hide();
			$(".refin-spent"+more_id+"").hide();
			//$("#refin-file"+more_id+"").hide();
		}

	});

	$(document).on('click','.delete-more',function(){
		var element_id = $(this).attr('data-id');
		$("#more_collatral"+element_id).remove();
		//more_id = more_id-1;
		if($(".collateral").find('input:text').length == 0){
			$(".add-collateral-chk").prop('checked',false).iCheck('update');
			$("#additional_collateral_no").prop('checked',true).iCheck('update');
		}
		$(".collateral:last").find('.add-more').show();
		
	});

	/*---------------------------------------------Borroewer Info--------------------------------------------------------------------*/
	/*on load hide divs */
	/*$("#bnk-yr-div").hide();
	$("#bnk-dt-div").hide();
	$("#loan-dt-div").hide();
	$("#forclosure-dt-div").hide();
	$("#judegement-dt-div").hide();
	$("#felony-div").hide();
	$("#violations-div").hide();
	$(".channel_publication_borrower_div").hide();
	$(".channel_text_borrower_div").hide();*/


	//borrower form validation
	$("#borrower-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {

			borrower_first_name:{required:true},
			//entity_name:{required:true},
			borrower_last_name:{required:true},
			borrower_address:{required:true},
			//borrower_unit:{required:true},
			borrower_city:{required:true},
			borrower_zipcode:{required:true,minlength:5},
			borrower_state:{required:true},
			borrower_phone_no:{required:true,
				notEqual:"#broker_phone_no",
				remote:
                {
                	depends: function(){
			        return $('#user_id').val() == '';
			     },
                    url:base_url+'quick_loan_application/check_borrower_phone',
                    type: "post",
                    data:{'csrf_test_name':global_csrf_token_value}
                },
                minlength:12
				//user_phone_check:true
			},
			borrower_alt_phone_no:{minlength:12,},
			borrower_email:{required:true,email:true,remote:
            {
              //url: "<?php echo base_url().'New_settings1/check_user_email'; ?>",
              url:base_url+'backend/quick_loans/check_borrower_email',
              type: "post",
               data:{'user_id':user_id,'csrf_test_name':global_csrf_token_value}
            }},
			borrower_credit_score:{required:true},
			bankruptcy_type:{required:true},
			bankruptcy_year:{required:'#bankruptcy_Yes:checked'},
			bankruptcy_description:{required:'#bankruptcy_Yes:checked'},
			defaulted_loan:{required:true},
			defaulted_loan_description:{required:'#defaulted_loan_Yes:checked'},
			foreclosure:{required:true},
			foreclosure_description:{required:'#foreclosure_Yes:checked'},
			outstanding_judgments:{required:true},
			judgments_description:{required:'#outstanding_judgments_Yes:checked'},
			convicted_felony:{required:true},
			felony_description:{required:'#convicted_felony_yes:checked'},
			sec_violations:{required:true},
			violations_description:{required:'#sec_violations_yes:checked'},
			
        	channel_publication_borrower:{required: function (element) {
	        							var channel = $("#channel_borrower").val();	
	        							// console.log(channel);
					                    // if(channel!="search_engine" && channel!="social_media" && channel!="online" && channel!="conference"){
					                    if(channel=="search_engine"){
					                        var e = $("#channel_publication_borrower").val();
					                        // console.log(e);
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
             channel_text_borrower:{required: function (element) {
	        							var channel = $("#channel_borrower").val();	
					                     if(channel!="Repeat" && channel!="search_engine" && channel!="" ){
					                        var e = $("#channel_text_borrower").val();
					                 
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
			borrower_first_name:{required:"Borrower first name is required"},
			//entity_name:{required:"Entity name is required"},
			borrower_last_name:{required:"Borrower last  name is required"},
			borrower_address:{required:"Borrower home address is required"},
			//borrower_unit:{required:"Apt/Suite/Unitis required"},
			borrower_city:{required:"City is required"},
			borrower_state:{required:"State is required"},
			borrower_zipcode:{required:"Zip Code is required",minlength:"Please enter at least 5 digits"},
			borrower_phone_no:{required:"Phone number is required",
				notEqual:"Broker and Borrower phone numbers are same. Please use a different phone number",
				 //user_phone_check:"Please enter a valid phone number" ,
				remote:"Phone number is already exist!",
				minlength:"Not a valid 10-digit phone number"
			},
			borrower_alt_phone_no:{user_phone_check:"Please enter a valid phone number",minlength:"Not a valid 10-digit phone number"},
			borrower_email:{required:"Borrower email address is required",remote:"Email address is already exist!"},
			borrower_credit_score:{required:"Approximate Credit Score is required"},
			bankruptcy_type:{required:"Please select a value"},
			bankruptcy_year:{required:'Please select number of years'},
			bankruptcy_description:{required:'This field is required'},
			defaulted_loan:{required:"Please select a value"},
			foreclosure:{required:"Please select a value"},
			outstanding_judgments:{required:"Please select a value"},
			convicted_felony:{required:"Please select a value"},
			sec_violations:{required:"Please select a value"},
			//channel_borrower: {required:"Please select Channel"},
			channel_publication_borrower:{channel_check:"Please select Channel Publication"},
			channel_text_borrower:{channel_check:"Please select Channel Publication"},
		},
		errorPlacement: function(error, element) {
			   
		    if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
			    $(element).closest('.form-group').append(error);
			}else if(element.hasClass('selectpicker') || element.parent().hasClass('input-group')){
				$(element).closest('.form-group').append(error);
			}
			else{
				error.insertAfter(element);

			} 
		},
		invalidHandler: function(form, validator) {
        	var errors = validator.numberOfInvalids();
        	if (errors) {                    
            	validator.errorList[0].element.focus();
        	
    		} 
    	}
	});

	$(document).on('change', '#channel_borrower', function(){
	    var channel = $(this).val();
	     if(channel=="search_engine"){
	        $(".channel_publication_borrower_div").show();
	        $(".channel_text_borrower_div").hide();
	    }else if(channel!="" && channel!="Repeat"){
	        $(".channel_text_borrower_div").show();
	        $(".channel_publication_borrower_div").hide();
	    } else {
	        $(".channel_publication_borrower_div").hide();  
	        $(".channel_text_borrower_div").hide();              
	    }

	     if(channel=="search_engine"){
	        var searchengine_options = {"Select Search Engine": "",
	          "Bing": "bing",
	          "Google": "google"
	        };
	        //$("#channel_lebel_borrower").empty();
	        //$("#channel_lebel_borrower").html('Search Engine');

	        $("#channel_publication_borrower").empty(); // remove old options
	        $.each(searchengine_options, function(key, value) {
	           $("#channel_publication_borrower").append($("<option></option>").attr("value", value).text(key));
	        });
	        $('#channel_publication_borrower option').eq(0).prop('selected', true);
	        $("#channel_publication_borrower").selectpicker('refresh');
	    }else if(channel!="" && channel!="Repeat"){

	    	//$("#channel_lebeltext_borrower").empty();
	        //$("#channel_lebeltext_borrower").html('Source <span class="require-star">*</span>');
	    }  
	});

	/*Borrower zip change*/
	$('#borrower_zipcode').on('focusout',function(){
		
		var prop_addrs = $(this).val();
		if(prop_addrs !='' ||prop_addrs !=null){
			//alert(prop_addrs);
			/*$.get(base_url+'quick_loan_application/get_address_info',{'address':prop_addrs},function(data){
				var addres_response = $.parseJSON(data); 
				//console.log(addres_response);
				if(addres_response.status==true){
					$('#borrower_city').val(addres_response.city);
					//$('#county'+id).val(addres_response.county);
					$('#borrower_state').val(addres_response.state_id).change();
					$('#borrower_zipcode').val(addres_response.zipcode);
				}
			});*/
		}
	});

	$(document).on('ifChecked','#bankruptcy_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#bnk-yr-div").show();
			$("#bnk-dt-div").show();
		}
	});

	$(document).on('ifChecked','#bankruptcy_No',function(){
		if($(this).prop('checked') == true){
			$("#bankruptcy_year").val('');
			$("#bankruptcy_description").val('');
			$("#bnk-yr-div").hide();
			$("#bnk-dt-div").hide();
		}
	});

	$(document).on('ifChecked','#defaulted_loan_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#loan-dt-div").show();
		}
	});

	$(document).on('ifChecked','#defaulted_loan_No',function(){
		if($(this).prop('checked') == true){
			$("#defaulted_loan_description").val('');
			$("#loan-dt-div").hide();
		}
	});

	$(document).on('ifChecked','#foreclosure_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#forclosure-dt-div").show();
		}
	});

	$(document).on('ifChecked','#foreclosure_No',function(){
		if($(this).prop('checked') == true){
			$("#foreclosure_description").val('');
			$("#forclosure-dt-div").hide();
		}
	});

	$(document).on('ifChecked','#outstanding_judgments_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#judegement-dt-div").show();
		}
	});

	$(document).on('ifChecked','#outstanding_judgments_No',function(){
		if($(this).prop('checked') == true){
			$("#judgments_description").val('');
			$("#judegement-dt-div").hide();
		}
	});

	$(document).on('ifChecked','.felony-chk',function(){
		var felony_val = $(this).val()
		if($(this).prop('checked') == true && felony_val == 'Y'){
			$("#felony-div").show();
		}else{
			$("#felony_description").val('');
			$("#felony-div").hide();
		}
	});

	$(document).on('ifChecked','.sec-violations-chk',function(){
		var sec_val = $(this).val()
		if($(this).prop('checked') == true && sec_val == 'Y'){
			$("#violations-div").show();
		}else{
			$("#violations_description").val('');
			$("#violations-div").hide();
		}
	});

	/*borrower email auto complete*/
	/*$("#borrower_email" ).autocomplete({
	  source: base_url+'backend/quick_loans/get_user_list',
	  minLength: 1,
	  appendTo: $(".auto-append-user"),
	  select: function(event, ui) {      
	    if(ui.item == null || ui.item == undefined) {
	            alert("Invalid user");
	             $(this).val('');
	    }else {
	      id = ui.item.id;
	      value = ui.item.value;
	      $('#user_id').val(id);
	      $(".hear_abt_borrower").hide();
	      $('#channel_borrower').rules('remove');
	      $('#channel_publication_borrower').rules('remove');
	      repopulate_borrower_details(id); 
	    }
	  },
	  change: function(event,ui){
	  //$(this).val((ui.item ? ui.item.value : ""));
	    if(ui.item == null){
	  	
	      $('#user_id').val('');
	      if($(".broker_or_borrower").attr('data-value')=='BO' || $(".broker_or_borrower").attr('data-value')==''){
	           $(".hear_abt_borrower").show();
	           add_borrower_check_rule($(".broker_or_borrower").attr('data-value'));

	           //$('#channel_borrower').rules("add", {required:true});
	      }else{
	      	$(".hear_abt_borrower").hide();
	      	$('#channel_borrower').rules('remove');
	        $('#channel_publication_borrower').rules('remove');
	      }
	     $('.nav-tabs li:nth-child(5)').show();
	     $("#borrower-track-form").addClass('active-form');
	     $("#borrower-track-form").find("#no_of_borrower_transaction").val('');
	     $("#borrower-track-form").find("#borrower_transaction_total_amount").val('');
	     $("#borrower-track-form").find("#borrower_networth").val('');  
	    }
	  //console.log(ui);
	  }
	});*/

	$(document).on('focusout ','#borrower_email',function(){
	    var email_val = $(this).val();
	     if(email_val == '' || email_val == null){
	         $('#borrower-form')[0].reset();
	         $('#borrower-form').find("input[type='text']").prop('readonly',false);
	         $('#borrower-form').find('.selectpicker').selectpicker('refresh');
	         //$("input[type='radio']").prop('disabled',true);
	         $('#user_id').val('');
	         $('#entity_id').val('');

	     }
	});
	/*$(document).on('keypress ','#borrower_email',function(){
	  
	         //$('#borrower-form').find('input,select').not(this).val('');
	         $('#borrower-form').find('input[type="text"],select').not(this).val('');
	         $('#borrower-form').find('.selectpicker').selectpicker('refresh');
	         //$(
	         $('#borrower-form').find("input[type='text']").prop('readonly',false);
	         $('#borrower-form').find('#borrower_phone_no').rules('add', {minlength:12});
	         //$("input[type='radio']").prop('disabled',true);
	         $('#user_id').val('');
	         $('#entity_id').val('');

	   
	})*/

	//entity name auto complete function
	$("#entity_name1").autocomplete({
		source:function(request, response){
			var mainid = $('#user_id').val();
			postData =  {uid:mainid,term : request.term};
	    	postData['csrf_test_name']= global_csrf_token_value;
	    	$.ajax({
	            url: base_url+'backend/users/get_user_developer_entitylist',
	            dataType: "json",
	            data: postData,
	            success: function(data) {
	                response(data);
	            },
	            error: function () {
	                response([]);
	            }
	        });
		},
		minLength: 1,
		appendTo:'.auto-append-entity',
		select:function(event, ui) {
	        if(ui.item == null || ui.item == undefined) {
	            alert("Invalid user");
	            $(this).val('');
	        } else {
	      		id = ui.item.id;
	            value = ui.item.value;
	            maintype = ui.item.maintype;
	            $('#entity_id').val(id);
	        }
	    },
	    change: function(event,ui){
	       $(this).val((ui.item ? ui.item.value : ""));
	        if(ui.item == null){
	           $('#entity_id').val('');
	        }
	    }

	});

	/*already exist checking*/
	

	$(document).on('click','#ctn-btn3',function(e){

		if($('#borrower-form').valid() == true){
			if($(".broker_or_borrower").attr('data-value')=='BR'){
				$('a[data-target="#loan_broker_info"]').removeClass('disabled');
				$('a[data-target="#loan_broker_info"]').attr('data-toggle','tab');
				$('a[data-target="#loan_broker_info"]').trigger('click');

			}else if($("#borrower-track-form").hasClass('active-form') == true){
				$('a[data-target="#borrower_track_record"]').removeClass('disabled');
				$('a[data-target="#borrower_track_record"]').attr('data-toggle','tab');
				$('a[data-target="#borrower_track_record"]').trigger('click');
			}else{
				final_proceesing();
			}
		}
		return false;
	});

	$(document).on('click','#back-btn3',function(e){

		$('a[data-target="#property_info"]').trigger('click');
	});
	/*---------------------------------------------------broker info------------------------------------------------------------------*/
	/*on load hide divs */
	$("#nmls-div").hide();
	$(".channel_publication_broker_div").hide();
   	$(".channel_text_broker_div").hide();

	//broker form validation
	$("#broker-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			licensed_broker:{required:true},
			nmls:{required:"#licensed_broker_Yes:checked"},
			broker_firm_name:{required:true},
			broker_first_name:{required:true},
			broker_last_name:{required:true},
			broker_address:{required:true},
			//broker_unit:{required:true},
			broker_city:{required:true},
			broker_zipcode:{required:true,minlength:5},
			broker_state:{required:true},
			broker_phone_no:{required:true,
				// user_phone_check:true,
				notEqual:"#borrower_phone_no",
				minlength:12,
				remote:{
					depends: function(){
			        return $('#broker_id').val() == '';
			     },
                    url:base_url+'quick_loan_application/check_broker_phone',
                    type: "post",
                    data:{'csrf_test_name':global_csrf_token_value}
                }
			},
			broker_alt_phone_no:{minlength:12},
			broker_email:{required:true,email:true,notEqual:"#borrower_email",remote:
                   {
                      url:base_url+'backend/quick_loans/check_broker_email',
                      type: "post",
                       data:{'broker_id':broker_id,'csrf_test_name':global_csrf_token_value},
                   }},
			broker_fee_type:{required:true},
			broker_charge:{required:true},
			termsheet_logo_type:{required:true},
			
        	channel_publication_broker:{required: function (element) {
	        							var channel = $("#channel_broker").val();	
					                    // if(channel!="search_engine" && channel!="social_media" && channel!="online" && channel!="conference"){
					                    if(channel=="search_engine"){
					                        var e = $("#channel_publication_broker").val();
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
              					channel_text_broker:{required: function (element) {
	        							var channel = $("#channel_broker").val();	
					                    // if(channel!="search_engine" && channel!="social_media" && channel!="online" && channel!="conference"){
					                    if(channel!="search_engine" && channel!="Repeat" && channel!="") {
					                        var e = $("#channel_text_broker").val();
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
			licensed_broker:{required:'Please select a value'},
			nmls:{required:"NMLS is required"},
			broker_firm_name:{required:"Brokerage firm name is required"},
			broker_first_name:{required:"Agent  first name is required"},
			broker_last_name:{required:"Agent  last  name is required"},
			broker_address:{required:"Agent   address is required"},
			//broker_unit:{required:"Apt/Suite/Unitis required"},
			broker_city:{required:"City is required"},
			broker_state:{required:"State is required"},
			broker_zipcode:{required:"Zip Code is required",minlength:"Please enter at least 5 digits"},
			broker_phone_no:{required:"Phone number is required",
				notEqual:"Broker and Borrower phone numbers are same. Please use a different phone number",
				minlength:"Not a valid 10-digit phone number",
        		remote:"Phone number already exist!"
				// user_phone_check:"Please enter a valid phone number"
			},
			broker_alt_phone_no:{minlength:"Not a valid 10-digit phone number"},
			broker_email:{required:"Broker email address is required",remote:"Email address is already exist!"},
			broker_fee_type:{required:"Please select one"},
			broker_charge:{required:"Charge is required"},
			//channel_broker: {required:"Please select Channel"},
			channel_publication_broker:{channel_check:"Please select Channel Publication"},
			channel_text_broker:{channel_check:"Please select Channel Publication"},
			termsheet_logo_type:{required:"Please select one"},
		},
		errorPlacement: function(error, element) {
			   
		    if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
			    $(element).closest('.form-group').append(error);
			}else if(element.hasClass('selectpicker') || element.parent().hasClass('input-group')){
				$(element).closest('.form-group').append(error);
			}else{
				error.insertAfter(element);

			} 
		},
		invalidHandler: function(form, validator) {
        	var errors = validator.numberOfInvalids();
        	if (errors) {                    
            	validator.errorList[0].element.focus();
        	
    		} 
    	}
	});

	$.validator.addMethod("notEqual", function(value, element, param) {
			return this.optional(element) || value != $(param).val();
	}, "Please specify a different value");


	/*broker zip chnege */
	$('#broker_zipcode').on('focusout',function(){
		
		var prop_addrs = $(this).val();
		if(prop_addrs !='' ||prop_addrs !=null){
			//alert(prop_addrs);
			/*$.get(base_url+'quick_loan_application/get_address_info',{'address':prop_addrs},function(data){
				var addres_response = $.parseJSON(data); 
				//console.log(addres_response);
				if(addres_response.status==true){
					$('#broker_city').val(addres_response.city);
					//$('#county'+id).val(addres_response.county);
					$('#broker_state').val(addres_response.state_id).change();
					$('#broker_zipcode').val(addres_response.zipcode);
				}
			});*/
		}
	});

	$(document).on('ifChecked','#licensed_broker_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#nmls-div").show();
		}
	});

	$(document).on('ifChecked','#licensed_broker_No',function(){
		if($(this).prop('checked') == true){
			$("#nmls").val('');
			$("#nmls-div").hide();
		}
	});

	$(document).on('change', '#channel_broker', function(){
	    var channel = $(this).val();
	    if(channel=="search_engine"){
	     
	        $(".channel_publication_broker_div").show();
	        $(".channel_text_broker_div").hide();
	    }else if(channel!="" && channel!="Repeat"){
	        $(".channel_text_broker_div").show();
	        $(".channel_publication_broker_div").hide();
	    } else {
	        $(".channel_publication_broker_div").hide();  
	        $(".channel_text_broker_div").hide();              
	    }


	     if(channel=="search_engine"){
	        var searchengine_options = {"Select Search Engine": "",
	          "Bing": "bing",
	          "Google": "google"
	        };
	        $("#channel_lebel_broker").empty();
	        //$("#channel_lebel_broker").html('Search Engine');

	        $("#channel_publication_broker").empty(); // remove old options
	        $.each(searchengine_options, function(key, value) {
	           $("#channel_publication_broker").append($("<option></option>").attr("value", value).text(key));
	        });
	        $('#channel_publication_broker option').eq(0).prop('selected', true);
	        $("#channel_publication_broker").selectpicker('refresh');
	    }else if(channel!="" && channel!="Repeat"){

	    	$("#channel_lebeltext_broker").empty();
	        //$("#channel_lebeltext_broker").html('Source <span class="require-star">*</span>');
	    }
	});

	/**/
	//broker_email auto complete function
	$("#broker_email").autocomplete({
		source:function(request, response){
			var mainid = $('#broker_id').val();
			postData =  {uid:mainid,term : request.term};


	    	//postData['csrf_test_name']= global_csrf_token_value;
	    	$.ajax({
	            url: base_url+'backend/users/get_broker_list',
	            dataType: "json",
	            data: postData,
	            success: function(data) {
	                response(data);
	            },
	            error: function () {
	                response([]);
	            }
	        });
		},
		minLength: 1,
		appendTo: $(".auto-append-broker"),
		select:function(event, ui) {
	        if(ui.item == null || ui.item == undefined) {
	            alert("Invalid user");
	            $(this).val('');
	        } else {

	        	

	      		id = ui.item.id;
	            value = ui.item.value;
	            maintype = ui.item.maintype;
	            $(".hear_abt_broker").hide();
	            $('#broker_id_selected').val(id);
	            $('#broker_id').val(id);
	            $('#broker_first_name').val(ui.item.first_name);
	            if((ui.item.first_name!=null) && ((ui.item.first_name).length!=0))
	            {
	            	$('#broker_first_name').attr('readonly', true);
	           	}
	            $('#broker_last_name').val(ui.item.last_name);
	           	if((ui.item.last_name!=null) && ((ui.item.last_name).length!=0))
	            {
	            	$('#broker_last_name').attr('readonly', true);
	            }
	            $('#broker_address').val(ui.item.address);
	            if((ui.item.address!=null) && ((ui.item.address).length!=0))
	            {
	               $('#broker_address').attr('readonly', true);
	            }else{
                   	$('#broker_address').attr('readonly', false);
                }
	            $('#broker_city').val(ui.item.city);

	           	if((ui.item.city!=null) && ((ui.item.city).length!=0)){
	               $('#broker_city').attr('readonly', true);
	            }else{
                   	$('#broker_city').attr('readonly', false);
                }
	            $('#broker_state').val(ui.item.state).selectpicker('refresh');;
	            $('#broker_zipcode').val(ui.item.zipcode);
	            if((ui.item.zipcode!=null) && ((ui.item.zipcode).length!=0) && (ui.item.zipcode!='00000'))
	            {
	               $('#broker_zipcode').attr('readonly', true);
	            }
	            $('#broker_phone_no').val(ui.item.phone);
	            $('#broker_phone_no').rules('remove', 'minlength');
	          	if((ui.item.phone!=null) && ((ui.item.phone).length!=0))
	          	{
	           		//$('#broker_phone_no').attr('readonly', true);
	           	}
	            $('#broker_email').val(ui.item.email);
	            $('#broker_firm_name').val(ui.item.business_name);
	           	if((ui.item.business_name!=null) && ((ui.item.business_name).length!=0)){
	               $('#broker_firm_name').attr('readonly', true);
	            }
	            $("#broker_email" ).rules("remove","remote");
	            repopulate_broker_details(id);
	            
	        }
	    },
	   change: function(event,ui){ 

	        if(ui.item == null){
	            
	            $(".hear_abt_broker").show();
	           // $('#channel_broker').rules("add", {required:true});
	           	$('#broker_id').val('');
	           	$('#broker_first_name').val('');
	           	$("#broker_first_name").attr("readonly", false); 
	            $('#broker_last_name').val('');
	            $("#broker_last_name").attr("readonly", false); 
	            $('#broker_address').val('');
	            $("#broker_address").attr("readonly", false); 
	            $('#broker_unit').val('');
	            $("#broker_unit").attr("readonly", false); 
	            $('#broker_city').val('');
	            $("#broker_city").attr("readonly", false); 
	            $('#broker_state').val('');
	        	$('#broker_state').attr('disabled', false).selectpicker('refresh');
	            $('#broker_zipcode').val('');
	            $("#broker_zipcode").attr("readonly", false); 
	            $('#broker_phone_no').val('');
	            $("#broker_phone_no").attr("readonly", false); 
	            $('#broker_phone_no').rules('add', {minlength:12});
	            $('#broker_firm_name').val('');
	            $("#broker_firm_name").attr("readonly", false); 
	            $('#broker_charge').val('');
	        }else{
	        	$('#channel_broker').rules('remove');
	        	$("#channel_publication_broker").rules('remove');
	        }
	    }

	});

	/*$(document).on('click','#ctn-btn4',function(e){

		if($('#broker-form').valid() == true){

			if($("#borrower-track-form").hasClass('active-form') == true){
				//alert('dd');
				$('a[data-target="#borrower_track_record"]').removeClass('disabled');
				$('a[data-target="#borrower_track_record"]').attr('data-toggle','tab');
				$('a[data-target="#borrower_track_record"]').trigger('click');
			}else{
				final_proceesing();
			}
			
		}
		return false;
	});
*/
	$(document).on('click','#back-btn4',function(e){

		$('a[data-target="#borrower_info"]').trigger('click');
	});
	/*-----------------------------------------------Borrower Track Record------------------------------------------------------------*/

	/*borrower track record form*/
	$("#borrower-track-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			years_in_realestate:{required:true},
			no_of_borrower_transaction:{required:true},
			borrower_transaction_total_amount:{required:true},
			borrower_networth:{required:true},
		},
		messages: {
			years_in_realestate:{required:'Please select a year'},
			no_of_borrower_transaction:{required:"Please select a transaction"},
			borrower_transaction_total_amount:{required:"Total dollar amount is required"},
			borrower_networth:{required:"Please select Borrower's Net Worth"},
		},
		errorPlacement: function(error, element) {
			   
		    if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
			    $(element).closest('.form-group').append(error);
			}else if(element.hasClass('selectpicker') || $(element).attr("name")==""){
				$(element).closest('.form-group').append(error);
			}else{
				error.insertAfter(element);

			} 
		}
	});

	$(document).on('click','.term-loan-update',function(e){

		//if($('#borrower-track-form').valid() == true){
			
			final_proceesing();
		//}
		return false;
	});
	$(document).on('click','#back-btn5',function(e){

		$('a[data-target="#loan_broker_info"]').trigger('click');
	});

	/*----------------------------------------------------final processing-----------------------------------------------------------*/
	var broker_id = $("#broker_id").val();
	var valid = false;
	var valid_check = null;
	var agree_terms = false;

	function final_proceesing(){
		
		//ShwLoadingPanel();
		//return false;
		valid_check = false;
		var tot_li = $('.nav-tabs li:visible').length;
	  
	    var cur_li = $('.nav-tabs li.active:visible').index();

		$('.active-form').each(function(i,form){
			valid_check = false;
			valid = $(form).valid();
			var val = $(form).validate();
				
			if(valid == false){
				console.log("error list", val);
				var j = i+1;
				var check_val =$(".broker_or_borrower").attr('data-value');
				if(check_val == 'BO' || check_val == 'SB'){
					if(j == 4){
						j++;
					}
				}

	            $('.nav-tabs li:nth-child('+j+') a').trigger('click');
	           	return false;
				
			}else{
				var k = i+1;
				valid_check = true;
			}
		});

		
		if(valid_check == true){
			//alert('ddd');
			//return false;
			ShwLoadingPanel();
			
			var transaction_details = $("#transaction-form").serialize();
			var property_details  = $('#property-info-form').serialize();
			var borrower_details  = $('#borrower-form').serialize();
			var broker_details = $("#broker-form").serialize();
			var borrower_track_details = $("#borrower-track-form").serialize();

			var new_form = transaction_details +' & '+property_details +'&'+borrower_details+'&'+broker_details+'&'+borrower_track_details;
			
			if($("#refinance-CEMA").prop('checked') == true && $('#property_state').val()!=5 ){
				swal("Warning!", "CEMA is applicable only for New York loans. Please choose address from New York.", "warning");
				$('a[href="#property_info"]').trigger('click');
				$('#property_address').val("");
				$('#property_zip_code').val("");
				$('#property_city').val("");
				$('#property_county').val("");
				$('#property_state').val("").change();
				remvLoadingPanel();	
			}else{
				eraseCookie('pipeline_loan_pgm');
	    		$.post(base_url+'backend/term_loan/update_term_loan_data',new_form,function(data){
	    			var response = $.parseJSON(data);
	    			if(response.status == true){
	    				window.location.reload();	    				
	    			}
	    			remvLoadingPanel();
				});
	    	}
		}
	}

	/*percentage key up for number*/
	$(document).on("keyup",".percentage",function(e){
		var num = $(this).val();
	    if (e.which!=8) {
	        num = sortNumber(num);
	       	//if(isNaN(num)||num<0 ||num>100) {
	       	if(num>100) {
	           //alert("Please enter a number less than 100");
	           $(this).val(sortNumber(num.substr(0,num.length-1)));
	           //$(this).val(sortNumber(num.substr(0,num.length-1)) + "%");
	       	}
	    	else
	        	$(this).val(sortNumber(num));
	    }
	    else {
	        if(num < 2)
	            $(this).val("");
	        else
	        	$(this).val(sortNumber(num.substr(0,num.length-1)));
	            //$(this).val(sortNumber(num.substr(0,num.length-1)) + "%");
	    }
	});
	setInterval(function(){ $('#success_msg').hide(); }, 5000);

});

function sortNumber(n){
    var newNumber="";
    for(var i = 0; i<n.length; i++)
        if(n[i] != "%")
            newNumber += n[i];
    return newNumber;
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function collateral_action(transaction_type){
    if(transaction_type == 'P'){
		$(".collateral").find(".collateral-purchase").show();
		$(".collateral").find(".collateral-refinance").hide();
		$(".collateral").find('input[type="text"]').val('');
		$(".collateral").find('input[type="hidden"]').val('');
		$(".collateral").find('.collateral-receipt').html('');
		//$(".collateral").find('.collateral-proof').hide();
		
	}else{
		$(".collateral").find(".collateral-refinance").show();
		$(".collateral").find(".collateral-purchase").hide();
		$(".collateral").find('input[type="text"]').val('');
		$(".collateral").find('.collateral-proof').hide();
		$(".collateral").find(".more_collater_datePicker").datepicker({
	        endDate:'today',
			format: 'mm/dd/yyyy',
			autoclose: true
	    }).on('changeDate', function(){
	           $(this).closest('.form-group').find('label.error').hide();
	    });
		
	}
}

var striped_const_amt = 0;
var striped_spent_amt = 0
function calculate_construction_budget(){

	var spent_amount = $("#spent_amount").val();
	var re_const_budget = $("#remaining_construction_budget").val();

	if(spent_amount === undefined || spent_amount == ''){
		striped_spent_amt = parseFloat(0);
	}else{
		striped_spent_amt = parseFloat(spent_amount.replace(/,/g,'').replace('$','')).toFixed(2);
	}

	if(re_const_budget === undefined || re_const_budget == ''){
		striped_const_amt = parseFloat(0);

	}else{
	
		striped_const_amt = parseFloat(re_const_budget.replace(/,/g,'').replace('$','')).toFixed(2);
	}

	var tot_amount = parseFloat(striped_spent_amt) + parseFloat(striped_const_amt);
	if($("#rehab_component_no").prop('checked')== true){
		$("#construction_budget1").val('');
	}else{
		$("#construction_budget1").val(number_format_float(tot_amount,2,'.',','));
	}

}

function add_more_item(more_id){
	//alert('d');
	var html = null;
	html = '';
	$(".add-more").hide();

	html = '<div id="more_collatral'+more_id+'" class="collateral"><hr /><div class="row"><div class="col-md-12 col-lg-6"><div class="border-rt pr-3"><div class="row"><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label text-capitalize">Property Address <span class="text-danger">*</span></label><input type="text"name="cl['+more_id+'][property_addres]" id="property_addres'+more_id+'" class="form-control mt-auto collateral_address" rel="'+more_id+'" /></div></div><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label text-capitalize">City <span class="text-danger">*</span></label><input type="text" name="cl['+more_id+'][city]" id="city'+more_id+'" class="form-control mt-auto" /></div></div></div><div class="row"><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label text-capitalize">State <span class="text-danger">*</span></label><select class="selectpicker" id="state'+more_id+'" name="cl['+more_id+'][state]" data-size="5"><option value="">-- Select --</option></select></div></div><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label text-capitalize">Zip Code <span class="text-danger">*</span></label><input type="text" name="cl['+more_id+'][zipcode]" id="zipcode'+more_id+'" class="form-control mt-auto" onkeypress="return isNumberKey(event);" maxlength="5" /></div></div></div><div class="row"><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label text-capitalize">Current Occupancy <span class="text-danger">*</span></label><select class="selectpicker" id="occupancy'+more_id+'" name="cl['+more_id+'][occupancy]" data-size="5"><option value="">-- Select --</option></select></div></div><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label text-capitalize">Development Phase <span class="text-danger">*</span></label><select class="selectpicker phase'+more_id+'" id="phase'+more_id+'" name="cl['+more_id+'][phase]" data-rel="phase'+more_id+'" data-attr="'+more_id+'" data-size="5"><option value="">-- Select --</option></select></div></div></div></div></div><div class="col-md-12 col-lg-6"><div class="pad-box pl-md-3"><div class="row"><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label text-capitalize">As Is Property Type <span class="text-danger">*</span></label><select class="selectpicker coll_asset_type" id="asset_type'+more_id+'" name="cl['+more_id+'][asset_type]" data-size="5" data-id="'+more_id+'"><option value="">-- Select --</option></select></div></div><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label text-capitalize">As Is Property Use</label><select class="selectpicker col_as_is_property_use" id="col_as_is_property_use'+more_id+'" name="cl['+more_id+'][col_as_is_property_use]" data-size="5"><option value="">-- Select --</option></select></div></div></div><div class="row"><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label">As Is Property Units</label><input type="text" name="cl['+more_id+'][col_as_is_property_units]" id="col_as_is_property_unit'+more_id+'" class="form-control mt-auto" /></div></div><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label">As is Property value <span class="text-danger">*</span></label><input type="text" name="cl['+more_id+'][as_is_property_value]" id="as_is_property_value'+more_id+'" class="form-control mt-auto currency-doller" placeholder="$0.00" /></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label class="opacity-6 control-label">Is this Property? <span class="text-danger">*</span></label><ul class="icheck-list p-0 m-0"><li><div class="d-flex ws-nowrap align-items-start w-60"><input tabindex="7" type="radio" class="check is-this-prop" id="owned-free'+more_id+'" name="cl['+more_id+'][is_this_property]" value="Owned" data-radio="iradio_minimal-blue" data-id="'+more_id+'"><label class="m-b-0 " for="owned-free'+more_id+'">Owned Free and Clear</label></div></li><li><div class="d-flex align-items-start"><input tabindex="7" type="radio" class="check is-this-prop" id="encumbered'+more_id+'" name="cl['+more_id+'][is_this_property]" value="Encumbered" data-radio="iradio_minimal-blue" data-id="'+more_id+'"><label class="m-b-0 text-capitalize " for="encumbered'+more_id+'">Encumbered</label></div></li></ul></div></div></div><div class="row" id="show-loan'+more_id+'"><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label">What is the Loan Amount Currently on it? <span class="text-danger">*</span></label><input type="text" name="cl['+more_id+'][loan_amount]" id="loan-amount'+more_id+'" class="form-control mt-auto currency-doller" placeholder="$0.00" /></div></div><div class="col-md-6"><div class="form-group"><label class="opacity-6 control-label">Will our Loan Being? <span class="text-danger">*</span></label><ul class="icheck-list p-0 m-0"><li><div class="d-flex ws-nowrap align-items-start w-60"><input tabindex="7" type="radio" class="check loan-being" id="paying'+more_id+'" name="cl['+more_id+'][loan_being]" value="Paying" data-radio="iradio_minimal-blue"><label class="m-b-0 text-capitalize " for="paying'+more_id+'">Paying</label></div></li><li><div class="d-flex align-items-start"><input tabindex="7" type="radio" class="check loan-being" id="taking'+more_id+'" name="cl['+more_id+'][loan_being]" value="Taking a 2nd Position" data-radio="iradio_minimal-blue"><label class="m-b-0 " for="taking'+more_id+'">Taking a 2nd Position</label></div></li></ul></div></div></div><div class="row  collateral-purchase'+more_id+'"><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label">Purchase Price <span class="text-danger">*</span></label><input type="text" name="cl['+more_id+'][purchase_price]" id="purchase_price'+more_id+'" class="form-control mt-auto currency-doller" placeholder="$0.00" /></div></div></div><div class="row collateral-refinance'+more_id+'"><div class="col-md-6"><div class="form-group"><label class="opacity-6 control-label">When did you acquire the property? <span class="text-danger">*</span></label><div class="input-group small-text w-100"><input type="text" class="form-control mt-auto more_collater_datePicker" id="original_purchase_date'+more_id+'" name="cl['+more_id+'][original_purchase_date]" placeholder="mm/dd/yyyy" readonly><div class="input-group-append"><span class="input-group-text"><i class="icon-calender"></i></span></div></div></div></div><div class="col-md-6"><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label">Original Purchase Price <span class="text-danger">*</span></label><input type="text" name="cl['+more_id+'][original_purchase_price]" id="original_purchase_price'+more_id+'" class="form-control mt-auto currency-doller" placeholder="$0.00" /></div></div></div><div class="row collateral-refinance'+more_id+'"><div class="col-md-6"><div class="form-group"><label class="opacity-6 control-label">Have you made any improvements to the asset via rehab/construction? <span class="text-danger">*</span></label><ul class="icheck-list p-0 m-0"><li><div class="d-flex ws-nowrap align-items-center w-60"><input tabindex="7" type="radio" class="check start-const1" id="start_construction_yes'+more_id+'" name="cl['+more_id+'][start_construction]" value="Y" data-radio="iradio_minimal-blue" data-id="'+more_id+'"><label class="m-b-0 " for="start_construction_yes'+more_id+'">Yes</label></div></li><li><div class="d-flex align-items-center"><input tabindex="7" type="radio" class="check start-const1" id="start_construction_no'+more_id+'" name="cl['+more_id+'][start_construction]" value="N" data-radio="iradio_minimal-blue" data-id="'+more_id+'"><label class="m-b-0 text-capitalize " for="start_construction_no'+more_id+'">No</label></div></li></ul></div></div><div class="col-md-6 refin-spent'+more_id+'""><div class="form-group d-flex justify-content-start flex-column w100"><label class="opacity-6 control-label">How much have you spent to date? <span class="text-danger">*</span></label><input type="text" name="cl['+more_id+'][spent_amount]" id="spent_amount'+more_id+'" class="form-control mt-auto currency-doller cal-total" placeholder="$0.00" /></div></div></div><div class="row collateral-refinance'+more_id+' refin-spent'+more_id+' collateral-proof"><div class="col-md-6"><div class="form-group"><label class="opacity-6 control-label">Can you provide documented proof of the improvements? <span class="text-danger">*</span></label><ul class="icheck-list p-0 m-0"><li><div class="d-flex ws-nowrap align-items-center w-60"><input tabindex="7" type="radio" class="check paid-recpt" id="paid_receipts_yes'+more_id+'" name="cl['+more_id+'][paid_receipts]" value="Y" data-radio="iradio_minimal-blue" data-id="'+more_id+'"><label class="m-b-0 " for="paid_receipts_yes'+more_id+'">Yes</label></div></li><li><div class="d-flex align-items-center"><input tabindex="7" type="radio" class="check paid-recpt" id="paid_receipts_no'+more_id+'" name="cl['+more_id+'][paid_receipts]" value="N" data-radio="iradio_minimal-blue" data-id="'+more_id+'"><label class="m-b-0 text-capitalize " for="paid_receipts_no'+more_id+'">No</label></div></li></ul></div></div></div><div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><div class="form-group"><a href="javascript:void(0)" class=" delete-more text-danger pull-right" style="margin-left:5px" data-id="'+more_id+'">Remove</a><a href="javascript:void(0)" class="add-more pull-right">Add More</a><div class="clearfix"></div></div></div></div></div></div></div></div>';

	var inc = 1;
	if($("#state1").length == 0){
		inc = 0;
	}

	$("#more_collatral").append(html);
	$('body').find('#state' + more_id).html( $("#state"+inc).html()).val('').selectpicker('refersh');
	$('body').find('#asset_type' + more_id).html($("#asset_type"+inc).html()).val('').selectpicker('refersh');
	$('body').find('#occupancy' + more_id).html($("#occupancy"+inc).html()).val('').selectpicker('refersh');;
	$('body').find('#phase' + more_id).html($("#phase"+inc).html()).val('').selectpicker('refersh');;
	$('body').find('#col_comp_asset_type'+ more_id).html($("#asset_type"+inc).html()).val('').selectpicker('refersh');;
	$("#col_as_is_property_use"+more_id).selectpicker('refersh');

	$('input').iCheck({checkboxClass: 'icheckbox_minimal-blue',radioClass: 'iradio_minimal-blue'});
}

function add_borrower_check_rule(br_type){
	if(br_type=='BO'){
		$('#channel_borrower').rules("add", {required:true});
		// $('#channel_publication_borrower').rules("add", {required:true});
		$('#channel_broker').rules('remove');
	} else if(br_type=='BR'){
		$('#channel_broker').rules("add", {required:true});
		$('#channel_borrower').rules('remove');
		$('#channel_publication_borrower').rules('remove');
	}else{
		$('#channel_borrower').rules('remove');
		$('#channel_broker').rules('remove');
	    $('#channel_publication_borrower').rules('remove');
	}
}

function repopulate_borrower_details(user_id){

	var stat = check_existing_projects(user_id);
	if(stat==true){
                      	
 		$('.nav-tabs li:nth-child(5)').hide();
    	$("#borrower-track-form").removeClass('active-form');
      	//trakinfo = true;
   	}else{
   	  	$('.nav-tabs li:nth-child(5)').show();
      	$("#borrower-track-form").addClass('active-form');
      	//trakinfo = false;
   }

	$.get(base_url+'backend/quick_loans/get_user_data',{'user_id':user_id},function(data){

		var response = $.parseJSON(data);
	    var user =  response.user;
	    //console.log(user);
	    if(response.status == true && user.first_name !=''){
	    	$('#borrower-form').find("label.error").hide();
	    	$('#borrower-form').find('input:radio').prop('checked',false).iCheck('update');
	    	$('#borrower-form').find('#borrower_Mobile').prop('checked',true).iCheck('update');
	    	$('#borrower-form').find('#phone_type_mobile').prop('checked',true).iCheck('update');

	    	$("#borrower_last_name").val(user.last_name).prop('readonly',true);
	    	$("#borrower_last_name").val(user.last_name).prop('readonly',true);
	    	if(user.last_name == '' || user.last_name == null){
	    		$("#borrower_last_name").prop('readonly',false);
	    		//$(this).removeClass('error');
			   	//$(this).closest('.more-half-width').find('label.error').hide();
			   	//$(this).closest('.inputbox').next('label.error').hide();
	    	}
	    	$("#borrower_first_name").val(user.first_name).prop('readonly',true);
	    	if(user.first_name == '' || user.first_name == null){
	    		$("#borrower_first_name").prop('readonly',false);
	    	}
	    	//$("#entity_name1").val(user.developer_name).prop('readonly',true);
	    	if(user.developer_name == '' || user.developer_name == null){
	    		//$("#entity_name1").prop('readonly',false);
	    	}
	    	$("#borrower_address").val(user.user_address1).prop('readonly',true);
	    	if(user.user_address1 == '' || user.user_address1 == null){
	    		$("#borrower_address").prop('readonly',false);
	    	}
	    	if($("#borrower_email").val()==''){
	    		$("#borrower_email").val(user.user_email);
	    	}
	    	//$("#borrower_email").val(user.user_email).prop('readonly',true);
	    	$("#borrower_city").val(user.user_city).prop('readonly',true);
	    	if(user.user_city == '' || user.user_city == null){
	    		$("#borrower_city").prop('readonly',false);
	    	}
	    	$("#borrower_state").val(user.user_state).selectpicker('refresh');
	    	//if()
	    	//alert($("#borrower_state").find("option:selected").val());	    
	    	if($("#borrower_state").find("option:selected").val()== undefined){
	    		$("#borrower_state").val('').selectpicker('refresh');
	    	}
	    	//$("#borrower_state1").val(user.user_state);
	    	$("#borrower_phone_no").val(user.user_phone).prop('readonly',true);
	    	$('#borrower_phone_no').rules('remove', 'minlength');
	    	if(user.user_phone == '' || user.user_phone == null){
	    		$("#borrower_phone_no").prop('readonly',false);
	    		$('#borrower_phone_no').rules('add', {minlength:12});
	    	}
	    	var borrower_zipcode =  user.user_zip_code;
	    	borrower_zipcode = borrower_zipcode.trim();
	    	$("#borrower_zipcode").val(borrower_zipcode).prop('readonly',true);
	    	if(user.user_zip_code == '' || user.user_zip_code == null){
	    		$("#borrower_zipcode").prop('readonly',false);
	    	}
	    	$('#quik_borrower_id').val(user.quik_borrower_id);
	    	//$('#quik_borrower_track_id').val(user.quik_borrower_id);
	    	$("#borrower_email" ).rules("remove","remote");
	    	$("#years_in_realestate").val(user.years_in_realestate);
	    	$("#borrower_alt_phone_no").val(user.alternate_phone_number).prop('readonly',true);
	    	if(user.alternate_phone_number == '' || user.alternate_phone_number == null){
	    			$("#borrower_alt_phone_no").prop('readonly',false);
	    	}
	    	$("#borrower_unit").val(user.borrower_unit).prop('readonly',true);
	    	if(user.borrower_unit == '' || user.borrower_unit == null){
	    			$("#borrower_unit").prop('readonly',false);
	    	}
	    	// $("#no_of_borrower_transaction").val(user.no_of_borrower_transaction);
	    	$("#borrower_transaction_total_amount").val(user.borrower_transaction_total_amount);
	    	//new changes 
	    	$("#borrower_credit_score").val(user.borrower_credit_score).selectpicker('refresh');
	    	$("#no_of_borrower_transaction").val(user.no_of_borrower_transaction);
	    	$("#borrower_networth").val(user.borrower_networth);
	    	//$("#quik_borrower_id").val(user.quik_borrower_id)
	    	if(user.no_of_borrower_transaction == '' || user.no_of_borrower_transaction ==  0){
	    		$("#no_of_borrower_transaction").prop('readonly',false);
	    	}
	    	if(user.bankruptcy_type == 'Y'){
	    		$("#bankruptcy_Yes").prop('checked',true).iCheck('update');
	    		$("#bankruptcy_year").val(user.bankruptcy_year).selectpicker('refresh');;
	    		$("#bnk-yr-div").show();
	    		$("#bnk-dt-div").show();
	    		$("#bankruptcy_description").val(user.bankruptcy_description);
	    	}else if(user.bankruptcy_type == 'N'){
	    		$("#bankruptcy_No").prop('checked',true).iCheck('update');
	    		$("#bnk-yr-div").hide();
	    		$("#bnk-dt-div").hide();
	    		$("#bankruptcy_year").val('').selectpicker('refresh');;;
	    		//$("#bnk-yr-div").hide();
	    	}

	    	if(user.defaulted_loan =='Y'){
	    		$("#defaulted_loan_Yes").prop('checked',true).iCheck('update');
	    		$("#defaulted_loan_description").val(user.defaulted_loan_description);
	    		$("#loan-dt-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#defaulted_loan_No").prop('checked',true).iCheck('update');
	    		$("#defaulted_loan_description").val('');
	    		$("#loan-dt-div").hide();
	    	}

	    	if(user.foreclosure =='Y'){
	    		$("#foreclosure_Yes").prop('checked',true).iCheck('update');
	    		$("#foreclosure_description").val(user.foreclosure_description);
	    		$("#forclosure-dt-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#foreclosure_No").prop('checked',true).iCheck('update');
	    		$("#foreclosure_description").val('');
	    		$("#forclosure-dt-div").hide();
	    	}

	    	if(user.outstanding_judgments =='Y'){
	    		$("#outstanding_judgments_Yes").prop('checked',true).iCheck('update');
	    		$("#judgments_description").val(user.judgments_description);
	    		$("#judegement-dt-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#outstanding_judgments_No").prop('checked',true).iCheck('update');
	    		$("#judgments_description").val('');
	    		$("#judegement-dt-div").hide();
	    	}

	    	if(user.convicted_felony =='Y'){
	    		$("#convicted_felony_yes").prop('checked',true).iCheck('update');
	    		$("#felony_description").val(user.felony_description);
	    		$("#felony-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#convicted_felony_no").prop('checked',true).iCheck('update');
	    		$("#felony_description").val('');
	    		$("#felony-div").hide();
	    	}

	    	if(user.sec_violations =='Y'){
	    		$("#sec_violations_yes").prop('checked',true).iCheck('update');
	    		$("#violations_description").val(user.violations_description);
	    		$("#violations-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#sec_violations_no").prop('checked',true).iCheck('update');
	    		$("#violations_description").val('');
	    		$("#violations-div").hide();
	    	}
	    }
	});
}

function check_existing_projects(user_id){
 
	var postData ={uid:user_id};
 	postData['csrf_test_name']= global_csrf_token_value;
 	var status1;

	$.ajax({
       
       type:"POST",
       dataType:"json",
       data:postData,
       async: false,
       cache:false,
       url:base_url+"backend/quick_loans/check_existing_projects",
       
       success:function(res){
         status1 = res.status;
       	}


	});
	
    return status1;
}

function repopulate_broker_details(broker_id){
	$.get(base_url+'backend/quick_loans/get_broker_data',{'broker_id':broker_id},function(data){
		var response = $.parseJSON(data);
	    var broker =  response.broker;
	    $('#quik_broker_id').val(broker.quik_broker_id); 
	});
}

//loader functions()
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