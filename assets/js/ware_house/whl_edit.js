var baseUrl =  $("#base-url-1").val();
$(document).ready(function(){
	
     $(".remove_row:first").hide();

	var whInterestType = $("#wh_interest_type").val();
		if(whInterestType=='F'){
			$(".flat").show();
			$('.project_based').hide();
			// $('.feestructure_div').hide();
		}else{
			$(".flat").hide();
			$('.project_based').show();
			// $('.feestructure_div').show();
			// usage fee
			if($('#proj_usage_fee_type_Y').is(':checked')){
				$(".usage_fee_div").show();
			}else{
				$(".usage_fee_div").hide();
			}
			// setup rate
			if($('#proj_step_up_rate_type_Y').is(':checked')){ 
				$(".step_up_div").show();
			}else{
				$(".step_up_div").hide();
			}

		}
		// apply fee structure
		if($('#applyfee_Y').is(':checked')){
			$(".fee_structure").show();
		}else{
			$(".fee_structure").hide();
		}

	// Minimum Usage Fee -project based
		$('.proj_usage_fee_type').on('ifChanged',function() {
		var checkdUsageFee = $(this).val();
		if(checkdUsageFee=='Y'){
			$(".usage_fee_div").show();
		}else{
			$(".usage_fee_div").hide();
			$("#wh_proj_floor_rate").val('');
		}		
	});
	// Step up rate
		$('.proj_step_up_rate_type').on('ifChanged',function() {
		var stepuptype = $(this).val();
		if(stepuptype=='Y'){
			$(".step_up_div").show();
		}else{
			$(".step_up_div").hide();
			$(".step_up_div input").val('');
		}	
	});
	// Apply fee structure
	$('.wh_apply_fee_structure').on('ifChanged',function() {
		var applyFeeStucture = $(this).val();
		if(applyFeeStucture=='Y'){
			$(".fee_structure").show();
		}else{
			$(".fee_structure input").val('');
			$(".fee_structure").hide();
		}
	});
	// project Interest rate change
	var projInterestRate =$("#wh_project_interest_type").val();
	if(projInterestRate=="G"){
		$(".proj_intrst_rate_div").hide();
		$("#wh_project_interest_rate").val('');
	}else{
		$(".proj_intrst_rate_div").show();
	}
	$("#wh_project_interest_type").change(function(e){ 
		var projInterestRate =$(this).val();
		if(projInterestRate==""){
			$("#wh_project_interest_rate").val('');
		}else if(projInterestRate=="G"){
			$(".proj_intrst_rate_div").hide();
			$("#wh_project_interest_rate").val('');
		}else{
			$(".proj_intrst_rate_div").show();
		}
	});
	$("#wh_interest_type").change(function(){
		var whInterestType = $(this).val();
		if(whInterestType=='F'){
			$(".flat").show();
			$('.project_based').hide();
			$('.feestructure_div').hide();
		}else{
			$(".flat").hide();
			$('.project_based').show();
			$('.feestructure_div').show();
			
		}
	});



	var promised_count = $(".count_promised").val();
	var i=parseInt(promised_count);

	$("#add_row").click(function(){
			
		i++;
		var wh = $("#edit_promised_draw").clone().appendTo('#end_promised_div');	
		$(".edit_promised_draw:last").removeClass().addClass('edit_promised_draw edit_promised_draw_'+i);
	     wh.find('.remove_row:last').show();
	    $(".wha_promised_amount:last,.wha_recieved_date:last,.wha_payment_method:last,.wha_promised_id:last").val('');
	    wh.find('.wha_promised_amount:last').attr('id','wha_promised_amount'+i);
	    wh.find('.wha_payment_method:last').attr('id','wha_payment_method'+i);
	    wh.find('.wha_recieved_date:last').datepicker('destroy').removeAttr('id').datepicker();
		total_av_balance();
	});
	//$(".remove_row").click(function(){
$('body').on('click', '#remove_row1', function(){ 
        	if($(".edit_promised_draw").length != 1){
        		var con_del = confirm('Do you really want to delete this item?');
        		if(con_del){
        			$(".edit_promised_draw:last").remove();
        			$('.wha_promised_amount').trigger('blur');
        		}
        	}else{
        		return false;
        	}
        
	});

	// $(".wha_promised_amount").blur(function(){
		$('body').on('blur', '.wha_promised_amount', function(e){ 
		var promisedAmount   = total_av_balance();//$(this).val();
		var dbpamt           = $(this).data('dbpamt');
		// 	promisedAmount   = promisedAmount.replace(/[^0-9-.]/g, '');
		var dbPromised       = parseFloat($(".db_amount_promised").val());//parseFloat($(this).data('dbpromised'));
		
		var dbBalance        = parseFloat($("#edit_wh_available_cash_balance").data('dbbalance'));
		var availableBalance = parseFloat($(".edit_wh_available_cash_balance_dbval").val().replace(/[^0-9-.]/g, ''));
		var balancePromise;
		var totalbalance;
		if(dbPromised<=parseFloat(promisedAmount)){
			balancePromise = parseFloat(promisedAmount)-dbPromised;
		    totalbalance   = availableBalance+balancePromise; 
		    $("#edit_wh_available_cash_balance").val('$'+number_format(totalbalance,2));
		    //$("#edit_wh_available_cash_balance").val('$'+number_format(promisedAmount,2));
		}else if(parseFloat(promisedAmount)<availableBalance){
				alert("Promised amount should be greater than or equal to available balance");
				$(this).val("$"+number_format(dbpamt,2));
		}
		
	});
	
	// max.no of week
   	$("#wh_term_promised_type").change(function(e){
   		var termType = $(this).val();
   		var oldType  = $(this).data('oldprotype');
   		var noTerm   = $("#wh_term_promised").val();
   		if(termType=="Weeks" && noTerm!="" && parseInt(noTerm)>4){
   			alert("Week should be less than 5");
   			$("#wh_term_promised_type").val(oldType);
   			return false;
   		}
   	});
   	$("#wh_term_promised").blur(function(){
   		var noTerm = $(this).val();
   		var oldTerm  = $(this).data('oldterm');
   		var termType   = $("#wh_term_promised_type").val();
   		if(termType=="Weeks" && noTerm!="" && parseInt(noTerm)>4){
   			alert("Week should be less than 5");
   			$("#wh_term_promised").val(oldTerm);
   			return false;
   		}
   	});

	// edit form
	$("#submit_editwh").click(function(){
		if($('#editWarehoseForm').valid()) {
    		$("#editWarehoseForm").submit();
    	}
	});
	// add warehouse Form validation
	$("#editWarehoseForm").validate({
			onkeyup: false,
			rules:  {
						wh_entity_name:{required:true},
						wh_point_of_contact:{required:true},
						wh_email:{required:true,email:true},
						wh_phone:{
								  required:true,       
                                  maxlength: 12,
                                  minlength: 12,
                                  user_phone_check:true },
						
						"wha_promised_amount[]":{required:true},
						"wha_recieved_date[]":{required:true},
						"wha_payment_method[]":{required:true},
						wh_term_promised:{required:true},
						wh_term_promised_type:{required:true},
						wh_interest_type:{required:true},
						
    					

    					wh_proj_floor_rate:{required: "#proj_usage_fee_type_Y:checked"},
    					step_up_rate_days:{required: "#proj_step_up_rate_type_Y:checked"},		
    					step_up_interest_rate:{required: "#proj_step_up_rate_type_Y:checked"},				        		        
    					
								},
			messages: {
						wh_phone:{
							user_phone_check:"Please enter a valid phone number",
							maxlength:"Please enter a valid phone number",
                            minlength:"Please enter a valid phone number",
                        },
                        
					  },
			success: function (label) {
           label.closest('.control-group').removeClass('error');
           label.remove();
       },		  

	});
   

function total_av_balance(){
	var sum=0;
		$('.wha_promised_amount').each(function() {
			var totalamt = $(this).val();
			if(totalamt!=""){
				totalamt1 = totalamt.replace(/[^0-9-.]/g,'');
				sum+=parseInt(totalamt1);
			}
			
		});
		return sum;
}

 // phone number validation
    $.validator.addMethod("user_phone_check",function(value,element) {
   cntry_code = parseFloat(value.replace(/[^0-9-.]/g, ''));
  
   var codeReg =/^(?!.*(\d)\1{2}).*$/;
    if (!codeReg.test(cntry_code)) {
     return false;
    } else {
       
       var pattern1 = '01234567890123456789' //to match circular sequence as well.
      if (pattern1.indexOf(cntry_code) == -1) {
       
                   cntry_code2 = value.split('-');
            
                var codeReg2 =/^(?!.*(\d)\1{2}).*$/;
                   if (!codeReg2.test(cntry_code2[1])) {
               return false;
              } else {
                
                 cntry_code2 = value.split('-');
                        var pattern2 = '01234567890123456789' //to match circular sequence as well.
                      if (pattern2.indexOf(cntry_code2[1]) == -1) {
                       
                              value = value.replace(/-/g, '');
   
                               var pattern = '01234567890123456789' //to match circular sequence as well.
                            if (pattern.indexOf(value) == -1) 
                              return true;
                            else
                               return false;
                      }else{
                         
                        return false;
                      }
                 }
      }
      else{
         return false;
      }
        

    }
      
});
	

	// format
    $('.phone_format').keydown(function (e) {

            var key = e.charCode || e.keyCode || 0;

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

    $('.numbers_only').keydown(function (event) {

	        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9
	                || event.keyCode == 27 || event.keyCode == 13
	                || (event.keyCode == 65 && event.ctrlKey === true)
	                || (event.keyCode >= 35 && event.keyCode <= 39)) {
	            return;
	        } else {

	            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
	                event.preventDefault();
	            }
	        }
    });
    $('.numbers_length').keyup(function (event) {
    	var num =($(this).val());
    	if(num % 1 === 0){

    		if((parseInt(num)>100 ) || (parseInt(num)==0)){
    			$(this).val('');
    		}else{
    			$(this).attr('maxlength','4');
    		}
    	}else{
    		$(this).attr('maxlength','6');
    	}
    });



$(".wha_recieved_date").datepicker({
        dateFormat: 'mm/d/yy',
        defaultDate: "+w",
        changeMonth: true,
        autoclose: true
});
});
    $(document).on(
{
    keyup: function()
    {
        var val = $(this).val();
        var val1 = $(this).val();
         val=  parseFloat(val.replace(/[^0-9-.]/g, ''));
        if(val==0)
        {
           $("#err-labl").remove();
           $(this).addClass('error');
               $(this).val('');
               $(this).parent().append('<label class="error" id="err-labl">Please enter value greater than 0</label>');
               return false;
        }
        else
        {
          $("#err-labl").remove();  
          $(this).removeClass('error');
        }
       $(this).val(($(this).val()));
    }
}
, '.nonzero');

