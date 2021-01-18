var base_url = null;
var more_id = 1;
var trakinfo = false;
var port_flag = false;
$(document).ready(function(){
	 base_url = $("#base-url-1").val();
	 // $('#channel_borrower').rules('remove');
  //   $('#channel_publication_borrower').rules('remove');

	$(".channel_publication_borrower_div").hide();
	$(".channel_text_borrower_div").hide();
	$('body').on('change', '#channel_borrower', function(){
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
	        $("#channel_lebel_borrower").empty();
	        $("#channel_lebel_borrower").html('Search Engine');

	        $("#channel_publication_borrower").empty(); // remove old options
	        $.each(searchengine_options, function(key, value) {
	           $("#channel_publication_borrower").append($("<option></option>").attr("value", value).text(key));
	        });
	    }else if(channel!="" && channel!="Repeat"){

	    	$("#channel_lebeltext_borrower").empty();
	        $("#channel_lebeltext_borrower").html('Source <span class="require-star">*</span>');
	    }

	    // if(channel=="social_media"){
	    //     var socialmedia_options = {"Select Social Media": "",
	    //       	"Facebook": "facebook",
	    //       	"Instagram": "instagram",
	    //       	"LinkedIn": "linkedIn",
	    //       	"Twitter": "twitter",
	    //       	"YouTube": "youTube"
	    //     };
	    //     $("#channel_lebel_borrower").empty();
	    //     $("#channel_lebel_borrower").html('Social Media');

	    //     $("#channel_publication_borrower").empty(); // remove old options
	    //     $.each(socialmedia_options, function(key, value) {
	    //        $("#channel_publication_borrower").append($("<option></option>").attr("value", value).text(key));
	    //     });
	    // }

	    // if(channel=="online"){
	    //     var online_options = {"Select Online Banner Ad, Email/Newsletter or Print Ad": "",
	    //       	"American Association of Private Lenders": "american_association_lenders",
	    //       	"American Banker": "american_banker",
	    //       	"BOMA": "boma",
	    //       	"Bisnow": "bisnow",
	    //       	"Builder": "builder",
	    //       	"CCIM": "ccim",
	    //       	"Commercial Property Executive": "cpe",
	    //       	"Globe Street": "globe_street",
	    //       	"HousingWire": "housingwire",
	    //       	"IREM": "irem",
	    //       	"MBA": "mba",
	    //       	"Mortgage Professional America": "mpa",
	    //       	"Multi-Housing News": "multi_housing_news",
	    //       	"Multifamily Executive": "multifamily_executive",
	    //       	"NAA": "naa",
	    //       	"NAIOP": "naiop",
	    //       	"NMHC": "nmhc",
	    //       	"National Mortgage News": "nmn",
	    //       	"National Mortgage Professional": "nmp",
	    //       	"National Real Estate Investor": "nrei",
	    //       	"Other": "other",
	    //       	"Real Deal": "real_deal",
	    //       	"Real Estate Forum": "real_estate_forum",
	    //       	"Scotsman Guide": "scotsman_guide",
	    //       	"ULI": "uli",
	    //     };
	    //     $("#channel_lebel_borrower").empty();
	    //     $("#channel_lebel_borrower").html('Association');

	    //     $("#channel_publication_borrower").empty(); // remove old options
	    //     $.each(online_options, function(key, value) {
	    //        $("#channel_publication_borrower").append($("<option></option>").attr("value", value).text(key));
	    //     });
	    // }

	    // if(channel=="conference"){
	    //     var conference_options = {"Select Conference": "",
	    //       	"AAPL": "aapl",
	    //       	"Atlanta Mortgage Expo": "ame",
	    //       	"BOMA Internatinal Conference & Expo": "boma_ice",
	    //       	"Bankers Associations": "bankers_associations",
	    //       	"Bisnow": "bisnow",
	    //       	"Great Northwest Mortgage Expo": "gnme",
	    //       	"Mortgage Star Conference": "msc",
	    //       	"Motor City Mortgage Expo": "mcme",
	    //       	"Multifamily Executive Conference": "mec",
	    //       	"NE Conference of Mortgage Brokers and Professionals": "ne_cmbp",
	    //       	"NMHC OPTECH Conference & Exposition": "nmhc_oce",
	    //       	"NY Build Expo": "ny_be",
	    //       	"NYAMB's": "nyamb",
	    //       	"NYC Real Estate Expo": "nyc_ree",
	    //       	"National Alliance of Commercial Brokers": "nacb",
	    //       	"National Private Lender": "npl",
	    //      	"National Private Lender Expo": "nple",
	    //       	"National Settlement": "ns",
	    //       	"New England Women in Banking": "newb",
	    //       	"Only Brooklyn.® Real Estate Conference": "obrec",
	    //       	"Originator Connect": "oc",
	    //       	"Other": "other",
	    //       	"Pitbull": "pitbull",
	    //       	"Real Estate Expo & Conference": "reec",
	    //       	"Real Estate Showcase +Forum": "resf",
	    //       	"Real Share": "real_share",
	    //       	"Regional Conference of Mortgage": "rcm",
	    //       	"Services Summit (NS3)": "ns_ns3",
	    //       	"TerraCRG’s": "terracrg",
	    //       	"Texas Mortgage Roundup": "tmr",
	    //       	"The Arizona Mortgage Expo": "tame",
	    //       	"The California Mortgage Expo": "tcme",
	    //       	"The Chicago Mortgage Originators Expo": "tcmoe",
	    //       	"The Colorado Mortgage Summit": "tcms",
	    //       	"The New England Mortgage Expo": "tneme",
	    //       	"The New York Mortgage Expo": "tnyme",
	    //       	"The Real Deal": "trd",
	    //       	"Triple Play Relator Convention & Trade Expo": "tprcte",
	    //       	"Ultimate Mortgage Expo": "ulme",
	    //       	"Utah Mortgage Expo": "utme",
	    //       	"Wholesale Conference & Tradeshow": "wct"
	    //     };
	    //     $("#channel_lebel_borrower").empty();
	    //     $("#channel_lebel_borrower").html('Conference');

	    //     $("#channel_publication_borrower").empty(); // remove old options
	    //     $.each(conference_options, function(key, value) {
	    //        $("#channel_publication_borrower").append($("<option></option>").attr("value", value).text(key));
	    //     });
	    // }
	});


   //channel for broker

   $(".channel_publication_broker_div").hide();
   $(".channel_text_broker_div").hide();
	$('body').on('change', '#channel_broker', function(){
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
	        $("#channel_lebel_broker").html('Search Engine');

	        $("#channel_publication_broker").empty(); // remove old options
	        $.each(searchengine_options, function(key, value) {
	           $("#channel_publication_broker").append($("<option></option>").attr("value", value).text(key));
	        });
	    }else if(channel!="" && channel!="Repeat"){

	    	$("#channel_lebeltext_broker").empty();
	        $("#channel_lebeltext_broker").html('Source <span class="require-star">*</span>');
	    }

	    // if(channel=="social_media"){
	    //     var socialmedia_options = {"Select Social Media": "",
	    //       	"Facebook": "facebook",
	    //       	"Instagram": "instagram",
	    //       	"LinkedIn": "linkedIn",
	    //       	"Twitter": "twitter",
	    //       	"YouTube": "youTube"
	    //     };
	    //     $("#channel_lebel_broker").empty();
	    //     $("#channel_lebel_broker").html('Social Media');

	    //     $("#channel_publication_broker").empty(); // remove old options
	    //     $.each(socialmedia_options, function(key, value) {
	    //        $("#channel_publication_broker").append($("<option></option>").attr("value", value).text(key));
	    //     });
	    // }

	    // if(channel=="online"){
	    //     var online_options = {"Select Online Banner Ad, Email/Newsletter or Print Ad": "",
	    //       	"American Association of Private Lenders": "american_association_lenders",
	    //       	"American Banker": "american_banker",
	    //       	"BOMA": "boma",
	    //       	"Bisnow": "bisnow",
	    //       	"Builder": "builder",
	    //       	"CCIM": "ccim",
	    //       	"Commercial Property Executive": "cpe",
	    //       	"Globe Street": "globe_street",
	    //       	"HousingWire": "housingwire",
	    //       	"IREM": "irem",
	    //       	"MBA": "mba",
	    //       	"Mortgage Professional America": "mpa",
	    //       	"Multi-Housing News": "multi_housing_news",
	    //       	"Multifamily Executive": "multifamily_executive",
	    //       	"NAA": "naa",
	    //       	"NAIOP": "naiop",
	    //       	"NMHC": "nmhc",
	    //       	"National Mortgage News": "nmn",
	    //       	"National Mortgage Professional": "nmp",
	    //       	"National Real Estate Investor": "nrei",
	    //       	"Other": "other",
	    //       	"Real Deal": "real_deal",
	    //       	"Real Estate Forum": "real_estate_forum",
	    //       	"Scotsman Guide": "scotsman_guide",
	    //       	"ULI": "uli",
	    //     };
	    //     $("#channel_lebel_broker").empty();
	    //     $("#channel_lebel_broker").html('Association');

	    //     $("#channel_publication_broker").empty(); // remove old options
	    //     $.each(online_options, function(key, value) {
	    //        $("#channel_publication_broker").append($("<option></option>").attr("value", value).text(key));
	    //     });
	    // }

	    // if(channel=="conference"){
	    //     var conference_options = {"Select Conference": "",
	    //       	"AAPL": "aapl",
	    //       	"Atlanta Mortgage Expo": "ame",
	    //       	"BOMA Internatinal Conference & Expo": "boma_ice",
	    //       	"Bankers Associations": "bankers_associations",
	    //       	"Bisnow": "bisnow",
	    //       	"Great Northwest Mortgage Expo": "gnme",
	    //       	"Mortgage Star Conference": "msc",
	    //       	"Motor City Mortgage Expo": "mcme",
	    //       	"Multifamily Executive Conference": "mec",
	    //       	"NE Conference of Mortgage Brokers and Professionals": "ne_cmbp",
	    //       	"NMHC OPTECH Conference & Exposition": "nmhc_oce",
	    //       	"NY Build Expo": "ny_be",
	    //       	"NYAMB's": "nyamb",
	    //       	"NYC Real Estate Expo": "nyc_ree",
	    //       	"National Alliance of Commercial Brokers": "nacb",
	    //       	"National Private Lender": "npl",
	    //      	"National Private Lender Expo": "nple",
	    //       	"National Settlement": "ns",
	    //       	"New England Women in Banking": "newb",
	    //       	"Only Brooklyn.® Real Estate Conference": "obrec",
	    //       	"Originator Connect": "oc",
	    //       	"Other": "other",
	    //       	"Pitbull": "pitbull",
	    //       	"Real Estate Expo & Conference": "reec",
	    //       	"Real Estate Showcase +Forum": "resf",
	    //       	"Real Share": "real_share",
	    //       	"Regional Conference of Mortgage": "rcm",
	    //       	"Services Summit (NS3)": "ns_ns3",
	    //       	"TerraCRG’s": "terracrg",
	    //       	"Texas Mortgage Roundup": "tmr",
	    //       	"The Arizona Mortgage Expo": "tame",
	    //       	"The California Mortgage Expo": "tcme",
	    //       	"The Chicago Mortgage Originators Expo": "tcmoe",
	    //       	"The Colorado Mortgage Summit": "tcms",
	    //       	"The New England Mortgage Expo": "tneme",
	    //       	"The New York Mortgage Expo": "tnyme",
	    //       	"The Real Deal": "trd",
	    //       	"Triple Play Relator Convention & Trade Expo": "tprcte",
	    //       	"Ultimate Mortgage Expo": "ulme",
	    //       	"Utah Mortgage Expo": "utme",
	    //       	"Wholesale Conference & Tradeshow": "wct"
	    //     };
	    //     $("#channel_lebel_broker").empty();
	    //     $("#channel_lebel_broker").html('Conference');

	    //     $("#channel_publication_broker").empty(); // remove old options
	    //     $.each(conference_options, function(key, value) {
	    //        $("#channel_publication_broker").append($("<option></option>").attr("value", value).text(key));
	    //     });
	    // }
	});



	var broker_id = $("#broker_id").val();
	var user_id  = $("#user_id").val();
	//alert(broker_id+user_id);
	var valid = false;
	var valid_check = null;
	var agree_terms = false;
	//var transaction_prop = false;
	//var prop_info = false;
	//var brw_info = false;
	//var trakinfo = false;

	/*$('a[href="#transaction-tab"]').click(function(){
		transaction_prop = true;
	});

	$('a[href="property-tab"]').click(function(){
		prop_info = true;
	});
	$('a[href="#borrower-tab"]').click(function(){
		brw_info = true;
	});*/
	$('a[data-target="#brw-track-tab"]').click(function(){
		trakinfo = true;
	});

	$(".broker_or_borrower").click(function(){
		if($(this).val()=='BR'){
			
			$(".hear_abt_borrower").hide();
			$('#channel_borrower').rules('remove');
			$('#channel_publication_borrower').rules('remove');
			
			
		}
		if($(this).val()=='BO'){
			
			$(".hear_abt_borrower").show();

			// add_borrower_check_rule($(".broker_or_borrower").attr('data-value'));
			// $('#channel_borrower').rules("add", {required:true});
		}
		add_borrower_check_rule($(this).val());

	});

	$(document).on('click','#ctn-btn1',function(e){

		if($('#transaction-form').valid() == true){

			$('a[data-target="#property-tab"]').parent('li').removeClass('disabled');
			$('a[data-target="#property-tab"]').attr('data-toggle','tab');

			$('a[data-target="#property-tab"]').trigger('click');
		}
		return false;
	});

	$(document).on('click','#ctn-btn2',function(e){

		if($('#property-info-form').valid() == true){

			$('a[data-target="#borrower-tab"]').parent('li').removeClass('disabled');
			$('a[data-target="#borrower-tab"]').attr('data-toggle','tab');

			$('a[data-target="#borrower-tab"]').trigger('click');
		}
		return false;
	});

	$(document).on('click','#ctn-btn3',function(e){

		if($('#borrower-form').valid() == true){
			//var cur_bo_li = $('.nav-tabs li.active:visible').index();
			//alert(cur_bo_li);
			if($(".broker_or_borrower").attr('data-value')=='BR'){

				$('a[data-target="#broker-tab"]').parent('li').removeClass('disabled');
				$('a[data-target="#broker-tab"]').attr('data-toggle','tab');
				$('a[data-target="#broker-tab"]').trigger('click');
			}else if($("#borrower-track-form").hasClass('active-form') == true){
				//alert('dd');
				$('a[data-target="#brw-track-tab"]').parent('li').removeClass('disabled');
				$('a[data-target="#brw-track-tab"]').attr('data-toggle','tab');
				$('a[data-target="#brw-track-tab"]').trigger('click');
			}else{
				final_proceesing();
			}
			
		}
		return false;
	});

	$(document).on('click','#ctn-btn4',function(e){

		if($('#broker-form').valid() == true){

			if($("#borrower-track-form").hasClass('active-form') == true){
				//alert('dd');
				$('a[data-target="#brw-track-tab"]').parent('li').removeClass('disabled');
				$('a[data-target="#brw-track-tab"]').attr('data-toggle','tab');
				$('a[data-target="#brw-track-tab"]').trigger('click');
			}else{
				final_proceesing();
			}
			
		}
		return false;
	});

	$(document).on('click','#ctn-btn5',function(e){

		if($('#borrower-track-form').valid() == true){
			
			final_proceesing();
		}
		return false;
	});

	function final_proceesing(){
		valid_check = false;
		var tot_li = $('.nav-tabs li:visible').length;
      
        var cur_li = $('.nav-tabs li.active:visible').index();

		/*var transfrom_valid = $("#transaction-form").valid();
		if(transfrom_valid == false){
			$('a[href="#transaction-tab"]').trigger('click');
		}else{
		
			$('a[href="#property-tab"]').trigger('click');
		}

		if(transfrom_valid == true){
			var propform_valid = $("#property-info-form").valid();
			if(propform_valid == false){
				$('a[href="#property-tab"]').trigger('click');		
			}else{
				$('a[href="#borrower-tab"]').trigger('click');
			}
		}

		if(propform_valid == true){
			alert(true);
		}*/

		check_project_street();

		$('.active-form').each(function(i,form){
			valid_check = false;
			valid = $(form).valid();
			//alert(valid + '/'+i);
			var val = $(form).validate();
 			
			if(valid == false){
				console.log("error list", val);
				var j = i+1;
				//alert(j)
				var check_val =$(".broker_or_borrower").attr('data-value');
				if(check_val == 'BO' || check_val == 'SB'){
					if(j == 4){
						j++;
					}
				}
				// $('.nav-tabs li:nth-child('+j+') a').trigger('click');
				// return false;
				 // if(cur_li<(tot_li-1) && !check_existing_projects(user_id)){
				 	
     //           	 $('.nav-tabs li:nth-child('+j+') a').trigger('click');
     //           	 return false;
     //           }
                $('.nav-tabs li:nth-child('+j+') a').trigger('click');
				 if(cur_li<(tot_li-1) && !check_existing_projects(user_id)){
				 }else{
               
               	  $("#brw-track-tab").removeClass('active');
				  $("#borrower-track-form").removeClass('active-form');
			      $('.nav-tabs li:nth-child(5)').hide();
               }
               return false;
				//$(".nav nav-tabs li:nth-child(2)" ).addClass('active');
				//$(".nav nav-tabs li:nth-child(2)" ).addClass('active');
				//$(".tab-content").addClass('a')

				//$('#panel_'+j).collapse('show');
				//for (var pa_tab = 1; pa_tab <= 5; pa_tab++) {
					//if(pa_tab != j){
						//console.log(pa_tab);
						//$('#panel_'+pa_tab).collapse('hide');
					//}
				//}
				
			}else{
				var k = i+1;
				//$('#panel_'+k).collapse('hide');
				valid_check = true;
			}
		});

		/*if($("#i_agree_terms").prop('checked') == false){
			$("#agree-error").show();
			agree_terms = false;
			return false;
		}else{
			$("#agree-error").hide();
			agree_terms = true;
		}*/
		
		if(valid_check == true){
			
			//alert('check');
			//if(trakinfo == false && cur_li<(tot_li-1) && !check_existing_projects(user_id)){
				//alert(1);
		  if(trakinfo == false){
				$('a[data-target="#brw-track-tab"]').trigger('click');
				return false;
			}
			ShwLoadingPanel();
			//return false;
			
			var transaction_details = $("#transaction-form").serialize();
    		var property_details  = $('#property-info-form').serialize();
    		var borrower_details  = $('#borrower-form').serialize();
    		var broker_details = $("#broker-form").serialize();
    		var borrower_track_details = $("#borrower-track-form").serialize();

    		var new_form = transaction_details +' & '+property_details +'&'+borrower_details+'&'+broker_details+'&'+borrower_track_details;
    		//console.log(borrower_details);
    		
    		if($("#refinance-CEMA").prop('checked') == true && $('#property_state').val()!=5 ){
    			alert("CEMA is applicable only for New York loans. Please choose address from New York.");
    			$('a[href="#property-tab"]').trigger('click');
    			$('#property_address').val("");
    			$('#property_zip_code').val("");
				$('#property_city').val("");
				$('#property_county').val("");
				$('#property_state').val("").change();
				remvLoadingPanel();	
    		}else{
    			eraseCookie('admin_loan_pgm');
	    		$.post(base_url+'backend/quick_loans/save_quik_loan_data',new_form,function(data){
	    			//remvLoadingPanel();
	    			var response = $.parseJSON(data);
	    			if(response.status == true){
	    				//alert('asfasf');
	    				window.location.href = base_url+'pipeline/loan_pipeline';
	    				//window.location.href = base_url+'backend/projects/pending_projects/0';
	    			}
	    			remvLoadingPanel();
				});
	    	}

		}

	}

	var exists = 0;
	$(".already_exist").blur(function(){
		var phone = $('#borrower_phone_no').val();
		var address = $('#borrower_address').val();
		var first_name = $('#borrower_first_name').val();
		var last_name = $('#borrower_last_name').val();
		var user_id = $('#user_id').val();

		var post_data = {user_phone:phone,user_address:address,user_first_name:first_name,user_last_name:last_name};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type:"post",
            dataType:"json",
            data:post_data,
            async: false,
            url:base_url + 'backend/quick_loans/borrower_already_exist',
            success:function(res){
            	if(res.exist=='yes' && exists==0 && user_id==''){
            		//$(".popupbg").show();
            		

		            $("#already_exist").html(res.developer_details);
		            $("#already_exist_modal").modal('show');
            	}else{
            		$("#already_exist").html('');
            	}
            }
        });

	});

	$(document).on(
	{
	    click: function()
	    { 
			if($("#user_id_exist").prop('checked') == true){
				var id = $('#user_id_exist').val();
				repopulate_borrower_details(id);
				$("#already_exist_modal").modal('hide');
				$(".popupbg").hide();
				exists = 1;
			}else{
				$("#already_exist_msg").html('Please select borrower');
			}
	      
	    }
	}, '#submit_borrower');

	//check borrower or broker
	$(document).on('click','#borrower',function(){
		if($(this).prop('checked') == true){
			$("#broker-form").removeClass('active-form');
			$('.nav-tabs li:nth-child(4)').hide();
			$(".broker_or_borrower").attr('data-value','BO');
			$("#shareline-div").hide();
			

		}
	});

	$(document).on('click','#broker',function(){
		if($(this).prop('checked') == true){
			$("#broker-form").addClass('active-form');
			$('.nav-tabs li:nth-child(4)').show();
			$(".broker_or_borrower").attr('data-value','BR');
			

		}
	});

	$(document).on('click','#shareline',function(){
		if($(this).prop('checked') == true){
			$("#broker-form").removeClass('active-form');
			$('.nav-tabs li:nth-child(4)').hide();
			$(".broker_or_borrower").attr('data-value','SB');
			$("#shareline-div").show();
			$("#channel option[value='broker']").remove();
		}
	});
	$('#doc_count').val($('input[name="receipt_files[]"]').length);
	//alert($('input[name="receipt_files[]"]').length);
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
			original_purchase_date:{required:".ref-req:checked"},
			original_purchase_price:{required:".ref-req:checked"},
			existing_mortgage:{required:".ref-req:checked"},
			current_mortgage_name:{required:"#existing_mortgage_yes:checked"},
			current_mortgage_balance:{required:"#existing_mortgage_yes:checked"},
			start_construction:{required:".ref-req:checked"},
			spent_amount:{required:"#start_construction_yes:checked"},
			paid_receipts:{required:"#start_construction_yes:checked"},
			loan_purpose:{required:true},
			rehab_component:{required:".rehab-comp:checked"},
			rehab_begun:{required:"#rehab_component_yes:checked"},
			rehab_budget_completed:{required:"#rehab_begun_yes:checked"},
			construction_begun:{required:"#construction:checked"},
			construction_budget_completed:{required:"#construction_begun_yes:checked"},
			lien_position:{required:true},
			//lean_holders_name:{required:"#second_lien:checked"},
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
			//second_lien_laon_amount:{required:"#second_lien:checked"},
			third_lean_holders_name:{required:"#third_lien:checked"},
			third_lien_loan_amount:{required:"#third_lien:checked"},
			purchase_price:{required:true},
			as_is_value:{required:true},
			acquisition_loan_request:{required:true},
			construction_budget:{required:true},
			final_value:{required:true},
			construction_loan_request:{required:true},
			loan_term_request:{required:true},
			more_term:{required:true},
			more_than_12:{required:true},
			loan_term:{required:"#more_Yes:checked"},
			desired_funding_date:{required:true},
			toe_transaction:{required:true},
			toe_closing_date:{required:"#toe_transaction_yes:checked"},
			shortsale_transaction_type:{required:"#purchase:checked"},
			shortsale_approved:{required:"#short_Sale_Yes:checked"},
			assignment_flip_type:{required:"#purchase:checked"},
			//assignment_description:{required:"#membership_units_Yes:checked"},
			contract_assigned:{required:'#membership_units_Yes:checked'},
			assignor:{required:'#membership_units_Yes:checked'},
			assignor_affiliate:{required:'#membership_units_Yes:checked'},
			affiliate_description:{required:"#assignor_Yes:checked"},
			llc_transaction_type:{required:true},
			entity_type:{required:"#llc_transaction_Yes:checked"},
			entity_name:{required:"#llc_transaction_Yes:checked"},
			doc_count: {required:"#paid_receipts_yes:checked",min:{param:2, depends: function(element) {return $("#paid_receipts_yes").is(":checked");
        	}}},
        	// channel:{required:true},
        	// channel_publication:{required: function (element) {
	        // 							var channel = $("#channel").val();	
					    //                 // if(channel!="search_engine" && channel!="social_media" && channel!="online" && channel!="conference"){
					    //                 if(channel=="search_engine" || channel=="social_media" || channel=="online" || channel=="conference"){
					    //                     var e = $("#channel_publication").val();
					    //                     if(e==""){
					    //                     	return true; 
					    //                     }else{
					    //                     	return false;
					    //                     }                           
					    //                 }else{
					    //                 	return false;
					    //                 } 
				     //              	}  
         //      					}
			//loan_type:
		},
		messages: {
			loan_type :{required:"Please select a value "},
			sales_rep :{required:"Please select a value "},
			citizenship_type :{required:"Please select a value "},
			sales_person:{required:"Please Select a Sales Person"},
			shareline_user:{required:"Please Select a Shareline User"},
			transaction_type:{required:"Please select a transaction type"},
			original_purchase_date:{required:"Original purchase date is required"},
			original_purchase_price:{required:"Original purchase price is required"},
			existing_mortgage:{required:"Please select a value"},
			current_mortgage_name:{required:"Please enter current mortgage name"},
			current_mortgage_balance:{required:"Please enter current mortgage balance"},
			start_construction:{required:"Please select a value"},
			spent_amount:{required:"This field is required"},
			paid_receipts:{required:"Please select a value"},
			loan_purpose:{required:"Please select a loan purpose"},
			rehab_component:{required:"Please Select a value"},
			rehab_begun:{required:"Please Select a value"},
			rehab_budget_completed:{required:"Please enter a value"},
			construction_budget_completed:{required:"Please enter a value"},
			construction_begun:{required:"Please Select a value"},
			lien_position:{required:"Please Select a value"},
			lean_holders_name:{required:"Lien Holder's Name is required"},
			second_lien_laon_amount:{required:"Loan Amount from Second Lien is required"},
			third_lean_holders_name:{required:"Lien Holder's Name is required"},
			third_lien_loan_amount:{required:"Loan Amount from Third Lien is required"},
			purchase_price:{ required:"Purchase price is required"},
			as_is_value:{required:"As Is Value is required"},
			acquisition_loan_request:{required:"Acquisition loan request require"},
			construction_budget:{required:"Construction budget required"},
			final_value:{required:"Final value is required"},
			construction_loan_request:{required:"Construction loan request required"},
			loan_term_request:{required:"Please select loan term request"},
			more_term:{required:"Please select a value"},
			more_than_12:{required:"Please select a value"},
			loan_term:{required:"Please select a value"},
			desired_funding_date:{required:"Please enter desired funding date"},
			toe_transaction:{required:"Please select a value"},
			toe_closing_date:{required:"Please enter T.O.E. closing date"},
			shortsale_transaction_type:{required:"Please select a value"},
			shortsale_approved:{required:"Please Select a value"},
			assignment_flip_type:{required:"Please select a value"},
			assignment_description:{required:"This field is required"},
			contract_assigned:{required:"Please enter desired funding date"},
			assignor:{required:"Assignor is required"},
			assignor_affiliate:{required:"Please select a value"},
			affiliate_description:{required:"This field is required"},
			llc_transaction_type:{required:"Please select a value"},
			entity_type:{required:"Please select a Entity Type"},
			entity_name:{required:"Entity name is required"},
			doc_count: {min: "Please upload atleast one paid receipt"},
			// channel: {required:"Please select Channel"},
			// channel_publication:{channel_check:"Please select Channel Publication"},


		},
		errorPlacement: function(error, element) {
			   
		    if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
			    if(element.attr("name") == "loan_purpose"){
		    		 error.insertAfter(element.parent("div").parent("div").parent("div").parent("div"));
		    	}else if(element.attr("name") == "rehab_component"){
		    		error.insertAfter(element.parent("div").parent("div").parent("div").parent("div").parent("div"));
		    	}else if(element.attr("name") == "construction_begun"){
		    		error.insertAfter(element.parent("div"));
		    	}else if(element.attr("name") == "start_construction"){
		    		error.insertAfter(element.parent("div").parent("div").parent("div").parent("div"));
		    	}else if(element.attr("name") == "paid_receipts"){
		    		error.insertAfter(element.parent("div").parent("div").parent("div").parent("div"));
		    	}else{
		    		error.insertAfter(element.parent("div").parent("div"));
		    	}
			}/*else if(element.attr("name") == "original_purchase_date" || element.attr("name") == "toe_closing_date"){
				error.insertAfter(element.parent("div"));
			}*/
			/*else if(element.attr("name") == "commercial_unit" ||element.attr("name") == "mixed_commercial_unit" || element.attr("name") == "res_unit" || element.attr("name") == "multi_multi_unit" || element.attr("name") == "residential_unit") {
			    error.insertAfter((".assetType"));
			}else if(element.closest(".proplist")){
				error.insertAfter(element);
			}*/else{
				error.insertAfter(element);

			} 
		}
	});

	//on load hide divs
	$("#shareline-div").hide();
	$("#refin-div").hide();
	$("#rehab-div").hide();
	$("#rehab-div2").hide();
	$("#rehab-begun").hide();
	$("#time-need").hide();
	//$("#sale-div").hide();
	$("#entity-div").hide();
	$("#affi-ass-div").hide();
	$("#mem-des-div").hide();
	$("#toe-div").hide();
	$("#lien-div").hide();
	$("#third-lien-div").hide();
	//$("#new-asset-type-div").hide();
	$("#ref_amounts").hide();
	$(".refin-const").hide();
	$(".refin-spent").hide();
	$("#refin-file").hide();
	$("#const-div").hide();
	$("#const-per").hide();
	$(".short-sale-div").hide();
	$("#short-sale-approved").hide();
	$("#current_mortgage").hide();

	if($('#sale_rep_yes').prop('checked') == true){
		$("#sale-div").show();
	}else{
		$("#sale-div").hide();
	}

	//refinance change
	var tr_type = null;
	$(document).on('click','.transaction_type',function(){
		if($(this).prop('checked') == true){
			tr_type  = $(this).val();
			if(tr_type == 'R' || tr_type == 'RA'){
				$("#refin-div").show();
				$("#purchase_price" ).rules("remove" );
				$("#purchase_price" ).val('').prop('disabled',true);
				$("#acquisition_loan_request").parent('.inputbox').prev('.form-label').html('Refinance Loan Request<span class="require-star">*</span>');

				//new changes
				$("#ref_amounts").show();
				$("#pr_amounts").hide();
				$("#construction_budget" ).rules("remove" );
				$("#remaining_construction_budget" ).rules("add",{required:true,messages:{required:'Current Remaining Construction Budget is required'}});
				$("#purchase_price").val('');
				$("#construction_budget").val('');
				$(".refin-const").show();
				$(".short-sale-div").hide();
				$("#short-sale-approved").hide();
				$(".short-sale").prop('checked',false);
				$(".short-sale-approved").prop('checked',false);
				$("#mem-des-div").hide();
				$('input[name="assignment_flip_type"]').prop('checked',false);
				$("#affiliate_description").val('');
				$("#contract_assigned").val('');
				$("#assignor").val('');
				$('input[name="assignor_affiliate"]').prop('checked',false);

				
			}else{
				$("#acquisition_loan_request").parent('.inputbox').prev('.form-label').html('Acquisition Loan Request<span class="require-star">*</span>');
				$("#refin-div").hide();
				$("#current_mortgage").hide();
				$("#original_purchase_date").val('');
				$("#original_purchase_price").val('');
				$("#purchase_price" ).rules("add",{required:true,messages:{required:'Purchase price is required'}});
				$("#purchase_price" ).val('').prop('disabled',false);
				$(".exist-mort").prop('checked',false);
				$("#construction_budget" ).val('').prop('disabled',false);
				$("#construction_loan_request" ).val('').prop('disabled',false);
				$('.total_loan').trigger("keyup");

				//new changes
				$("#ref_amounts").hide();
				$("#pr_amounts").show();
				$("#remaining_construction_budget" ).rules("remove");
				$("#remaining_construction_budget").val('');
				$("#construction_budget1").val('');
				$("#construction_budget" ).rules("add",{required:true,messages:{required:'Construction budget is required'}});
				$(".refin-const").hide();
				$(".start-const").prop('checked',false);
				$(".paid-recpt").prop('checked',false);
				$("#spent_amount").val('');
				$(".recpt-list").html('');
				$('input[name="receipt_files[]"]').val('');
				$(".refin-spent").hide();
				$("#refin-file").hide();
				$(".short-sale-div").show();
			}
		}
	});

	$(document).on('click','.start-const',function(){
		if($(this).prop('checked') == true){
			var const_value  = $(this).val();
			if(const_value == 'Y'){
				$(".refin-spent").show();
			}else{
				$(".refin-spent").hide();
				$("#spent_amount").val('');
				$("#refin-file").hide();
				$('input[name="receipt_files[]"]').val('');
				$(".recpt-list").html('');
				$(".paid-recpt").prop('checked',false);
			}
		}
	});

	$(document).on('click','.paid-recpt',function(){
		if($(this).prop('checked') == true){
			var paid_value  = $(this).val();
			if(paid_value == 'Y'){
				$("#refin-file").show();
			}else{
				$("#refin-file").hide();
				$('input[name="receipt_files[]"]').val('');
				$(".recpt-list").html('');
				//$("#spent_amount").val('');
			}
		}
	});

	var fileList = new Array;
    var file_count  =0;
	$(document).on('change','#receipts_file',function(){
		//alert($(this).val())
		ShwLoadingPanel();
		if($(this).val() != null || $(this).val() !=''){
			var data = new FormData($('#transaction-form')[0]);
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
			//alert(delete_fie_id);
			$.get(base_url+'backend/quick_loans/delete_receipt_file',{'file_name':delete_file_name,'file_id':''},function(data){
				var response = $.parseJSON(data);

				if(response.status == true){
					//alert(delete_file_id);
					$('#'+delete_file_id).remove();
					$(element).parent('li').remove();
					$('#doc_count').val($('input[name="receipt_files[]"]').length);
				}
			});
			//$('#'+delete_fie_id).remove();
			//$(this).parent('li').remove();
		}
	});

	$(document).on('blur','.cal-total',function(){	
    	calculate_construction_budget();
    });

	$(document).on('click','.lien-position',function(){
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
				//$("#lean_holders_name").val('');
				//$("#second_lien_laon_amount").val('');
			}else{
				$("#lien-div").hide();
				$("#lean_holders_name").val('');
				$("#second_lien_laon_amount").val('');

				$("#third-lien-div").hide();
				$("#third_lean_holders_name").val('');
				$("#third_lien_loan_amount").val('');
			}
		}
	});

	$(document).on('click','.toe-check',function(){
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

	$(document).on('click','.loan_purpose',function(){
		if($(this).prop('checked') == true){
			var loan_purpose_type  = $(this).val();
			if(loan_purpose_type == 'C' || loan_purpose_type == 'B'){
				$("#rehab-div").show();
				$("#const-div").hide();
				$("#const-per").hide();
				$(".constn-check").prop('checked',false);
			}else{
				$("#rehab-div").hide();
				$("#rehab-div2").hide();
				$(".rehab-check").prop('checked',false);
				if(tr_type == 'P'){

					$("#construction_budget" ).rules("add",{required:true,messages:{required:'Construction budget is required'}});
					$("#construction_budget" ).val('').prop('disabled',false);	
				}else if(tr_type == 'R' || tr_type == 'RA'){
					$("#construction_budget" ).rules("remove" );
					//$("#construction_budget1" ).rules("add",{required:true,messages:{required:'Construction budget is required'}});
					$("#construction_budget1" ).val('').prop('disabled',false);
				}
				$("#construction_loan_request" ).rules("add",{required:true,messages:{required:'Construction loan request required'}});
				$("#construction_loan_request" ).val('').prop('disabled',false);
				$('.total_loan').trigger("keyup");
				if(loan_purpose_type == 'CN'){
					$("#const-div").show();
				}
			}
		}
	});

	$(document).on('click','.rehab-check',function(){
		if($(this).prop('checked') == true){
			var rehab_val  = $(this).val();
			if(rehab_val == 'Y'){
				$("#rehab-div2").show();
			}else{
				$("#rehab-div2").hide();
			}
		}
	});

	$(document).on('click','.constn-check',function(){
		if($(this).prop('checked') == true){
			var constn_val  = $(this).val();
			if(constn_val == 'Y'){
				$("#const-per").show();
			}else{
				$("#const-per").hide();
				$("#const-per").find('input').val('');
			}
		}
	});

	$(document).on('click','.rehab-begun',function(){
		if($(this).prop('checked') == true){
			var rehab_begun  = $(this).val();
			if(rehab_begun == 'Y'){
				$("#rehab-begun").show();
			}else{
				$("#rehab-begun").hide();
			}
		}
	});

	$(document).on('click','#rehab_component_no',function(){
		
		if(tr_type == 'P'){
			//alert('yes');
			$("#construction_budget" ).rules("remove" );
			$("#construction_budget" ).val('').prop('disabled',true);
		}else if(tr_type == 'R' || tr_type == 'RA'){
			//alert('no');
			//$("#construction_budget1" ).rules("remove" );
			$("#construction_budget1" ).val('').prop('disabled',true);
			$("#remaining_construction_budget" ).rules("remove" );
			$("#remaining_construction_budget" ).val('').prop('disabled',true);
		}
		$("#construction_loan_request" ).rules( "remove" );
		$("#construction_loan_request" ).val('').prop('disabled',true);
		$('.total_loan').trigger("keyup");
		$("#rehab_begun_no").prop('checked',true);
		$("#rehab-begun").hide();
		//$(".dev-phase").prop('checked',false);
		//$(".dev-phase").closest('.full-width').hide();
		//$(".dev-phase[value='Leasing']").closest('.full-width').show();
	});

	$(document).on('click','#rehab_component_yes',function(){

		if(tr_type == 'P'){

			$("#construction_budget" ).rules("add",{required:true,messages:{required:'Construction budget is required'}});
			$("#construction_budget" ).val('').prop('disabled',false);
		}else if(tr_type == 'R' || tr_type == 'RA'){
			//$("#construction_budget1" ).rules("add",{required:true,messages:{required:'Construction budget is required'}});
			$("#construction_budget1" ).val('').prop('disabled',false);
			$("#remaining_construction_budget" ).rules("add",{required:true,messages:{required:'Construction budget is required'}});
			$("#remaining_construction_budget" ).val('').prop('disabled',false);
		}
		$("#construction_loan_request" ).rules("add",{required:true,messages:{required:'Construction loan request required'}});
		$("#construction_loan_request" ).val('').prop('disabled',false);
		$('.total_loan').trigger("keyup");
		//$(".dev-phase").closest('.full-width').show();
	});
	//salesperson div
	$(document).on('click','#sale_rep_yes',function(){
		if($(this).prop('checked') == true){
			$("#sale-div").show();
		}
	});

	$(document).on('click','#sale_rep_no',function(){
		if($(this).prop('checked') == true){
			$("#sales_person_first_name").val('');
			$("#sales_person_last_name").val('');
			$("#sale-div").hide();
		}
	});

	//more than 12 month term
	$(document).on('click','#more_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#time-need").show();
		}
	});

	$(document).on('click','#more_No',function(){
		if($(this).prop('checked') == true){
			$("#time-need").hide();
			$(".loan_term").prop('checked',false);
		}
	});

	$(document).on('click','#membership_units_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#mem-des-div").show();
		}
	});
	$(document).on('click','#membership_units_No',function(){
		if($(this).prop('checked') == true){
			$("#mem-des-div").hide();
			$("#assignment_description").val('');
		}
	});


	//assignor text area
	$(document).on('click','#assignor_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#affi-ass-div").show();
		}
	});

	$(document).on('click','#assignor_No',function(){
		if($(this).prop('checked') == true){
			$("#affi-ass-div").hide();
			$("#affiliate_description").val('');
		}
	});

	//LLC transaction details
	$(document).on('click','#llc_transaction_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#entity-div").show();
		}
	});
	$(document).on('click','#llc_transaction_No',function(){
		if($(this).prop('checked') == true){
			$("#entity-div").hide();
			$("#entity_name").val('');
			//$("#entity_name1").val('');
		}
	});

	/*$(document).on('blur','#entity_name',function(){

			$("#entity_name1").val($("#entity_name").val());
	});*/

	$(document).on('click','#short_Sale_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#short-sale-approved").show();
		}
	});
	$(document).on('click','#short_Sale_No',function(){
		if($(this).prop('checked') == true){;
			$("#short-sale-approved").hide();
		}
	});

	$(document).on('click','#existing_mortgage_yes',function(){
		if($(this).prop('checked') == true){;
			$("#current_mortgage").show();
		}
	});
	$(document).on('click','#existing_mortgage_no',function(){
		if($(this).prop('checked') == true){;
			$("#current_mortgage").hide();
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
			//property_unit:{required:true},
			property_state:{required:true},
			property_zip_code:{required:true,minlength:5},
			property_asset_type:{required:true},
			property_use:{required:true},
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
			//current_goi:{required:".occup-valid:checked"},
			//current_expenses:{required:".occup-valid:checked"},
			//current_noi:{required:".occup-valid:checked"},
			//stablized_goi:{required:".occup-valid:checked"},
			//stablized_expenses:{required:".occup-valid:checked"},
			//stablized_noi:{required:".occup-valid:checked"},
			development_phase:{required:true},
			development_phase_other:{required:"#dev-other:checked"},
			exit_strategy:{required:true},
			approved_plan:{required:".app-plan-chk:checked"},
			approved_plan_date:{required:"#approved_plan_no:checked"},
			new_asset_type:{required:".new-asset-req:checked"},
			new_asset_residential_units:{required:"#new-asset-type-residential:checked",min:1},
			new_asset_multi_family_units:{required:"#new-asset-type-multi-family:checked",min:5},
			new_asset_mixed_use_commercial_units:{required:"#new-asset-type-mixed-use:checked",min:1},
			new_asset_mixed_use_residential_units:{required:"#new-asset-type-mixed-use:checked",min:1},
			new_asset_commercial_units:{required:"#new-asset-type-commercial:checked"},
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

			//loan_type:
		},
		messages: {
			property_address :{required:"Property Address is required"},
			property_city:{required:"Property City is required"},
			property_county:{required:"County is required"},
			//property_unit:{required:"Apt/Suite/Unit  is required"},
			property_state:{required:"Please select a State"},
			property_zip_code:{required:"Zip Code  is required",minlength:"Please enter at least 5 digits"},
			property_asset_type:{required:"Please select a value"},
			property_use:{required:"Please select a Property Use"},
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
			approved_plan:{required:"Please select a value"},
			approved_plan_date:{required:"This field is required"},
			new_asset_type:{required:"Please select a value"},
			new_asset_residential_units:{required:"Units is required"},
			new_asset_multi_family_units:{required:"Units is required"},
			new_asset_mixed_use_commercial_units:{required:"Units is required"},
			new_asset_mixed_use_residential_units:{required:"Units is required"},
			new_asset_commercial_units:{required:"Units is required"},
			investment_summary:{required:"Investment summary is required"},
		},
		errorPlacement: function(error, element) {
			   
		    if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
		    	if(element.hasClass("is-this-prop") || element.hasClass("loan-being")){
		    		//alert('fasf');
		    			 error.insertAfter(element.parent("div").parent("div"));
		    	}else{
		    		error.insertAfter(element.parent("div").parent("div").parent("div"));
		    	}
			    
			}else if(element.hasClass('selectpicker')){
				//alert('afs');
				error.insertAfter(element.parent("div"));
			}
			/*else if(element.attr("name") == "commercial_unit" ||element.attr("name") == "mixed_commercial_unit" || element.attr("name") == "res_unit" || element.attr("name") == "multi_multi_unit" || element.attr("name") == "residential_unit") {
			    error.insertAfter((".assetType"));
			}else if(element.closest(".proplist")){
				error.insertAfter(element);
			}*/else{
				error.insertAfter(element);

			} 
		}
	});
$(document).on('click','.new-asset-chk',function(){
        
		if($(this).prop('checked')== true){
			$('.nw-unit').val('');
		}

		$.get(base_url+'quick_loan_application/get_property_use',{'asset_type':$(this).val()},function(data){
			
			var response = $.parseJSON(data);
	    	var props =  response.prop_use;
	    	if(response.status == true){
				$("#new_property_use").html('');
				$("#new_property_use").append('<option value="">--Select--</option>');
				$.each(props,function(key,name){
			       $("#new_property_use").append('<option value="' + name + '">' + name + '</option>');
			    });
			}

		});
	});
$(document).on('change','.coll_asset_type',function(){
        var closestuse= $(this).closest('.prevdiv').next('div').find('.col_as_is_property_use');
        var closestunit = $(this).closest('.prevdiv').next('div').next('div').find('input');
        var assetvlue   = $(this).val();
        if($(this).val()!=""){
        	
		$.get(base_url+'quick_loan_application/get_property_use',{'asset_type':$(this).val()},function(data){
			var response = $.parseJSON(data);
			var props =  response.prop_use;
			//console.log(props)
			if(response.status == true){
			
			closestuse.html('');
			closestuse.append('<option value="">--Select--</option>');
				$.each(props,function(key,name){

			       closestuse.append('<option value="' + name + '">' + name + '</option>');
			    });
			}
			
           
		});
		/*closestunit.rules('add',{
				required:true,
                min: function(element){
                    if(assetvlue=='Multi-Family'){
                        return 5;
                    }else if(assetvlue=='Land'){
                        return 0;
                    }else{
                    	return 1;
                    }
                },
                max: function(element){
                    if(assetvlue=='Residential'){
                        return 4;
                    }
                }
            });*/
		}
	});
$(document).on('change','.coll_com_asset_type',function(){
        var closestuse= $(this).closest('.prevdiv').next('div').find('.col_as_com_property_use');
        var closestunit = $(this).closest('.prevdiv').next('div').next('div').find('input');
        var assetvlue   = $(this).val();
        if($(this).val()!=""){
        	
		$.get(base_url+'quick_loan_application/get_property_use',{'asset_type':$(this).val()},function(data){
			var response = $.parseJSON(data);
			var props =  response.prop_use;
			//console.log(props)
			if(response.status == true){
			
			closestuse.html('');
			closestuse.append('<option value="">--Select--</option>');
				$.each(props,function(key,name){

			       closestuse.append('<option value="' + name + '">' + name + '</option>');
			    });
			}
			
           
		});
		/*closestunit.rules('add',{
				required:true,
                min: function(element){
                    if(assetvlue=='Multi-Family'){
                        return 5;
                    }else if(assetvlue=='Land'){
                        return 0;
                    }else{
                    	return 1;
                    }
                },
                max: function(element){
                    if(assetvlue=='Residential'){
                        return 4;
                    }
                }
            });*/
		}
	});
$('body').on('change','.phase1',function(){
		var dev_phase = $(this).val();
		var phaseval  = $(this).data('rel');
		var moreid    = $(this).data('attr');

		if(dev_phase!=""){
		if(dev_phase == 'Conversion' || dev_phase == 'Conversion & Extension/Addition' || dev_phase == 'Ground Up Construction'){
			$(".col_com_"+phaseval).show();
			$(".col_com_"+phaseval).find('input').rules('add',{required: true});
            $('body').find('#as_com_property_value'+moreid).rules('add',{required: true});
            $('body').find('#col_as_com_property_use'+moreid).rules('add',{required: true});
            $('body').find('#col_comp_asset_type'+moreid).rules('add',{required: true});
		}else{
			$(".col_com_"+phaseval).hide();	
			$('body').find('#as_com_property_value'+moreid).rules("remove");
            $('body').find('#col_as_com_property_use'+moreid).rules("remove");
            $('body').find('#col_comp_asset_type'+moreid).rules("remove");
            $('body').find('#col_as_com_property_unit'+moreid).rules("remove");	
		}

		if(dev_phase == 'Other'){
			$(".col_com_dev_"+phaseval).show();
			$('body').find('#development_phase_other'+moreid).rules('add',{required: true});
		}else{
			$(".col_com_dev_"+phaseval).hide();
			$('body').find('#development_phase_other'+moreid).rules("remove");
		}
	  }
	});
	/*$(document).on('focusout','#property_address',function(){
		var prop_addrs = $(this).val();
		if(prop_addrs !='' ||prop_addrs !=null){
			//alert(prop_addrs);
			$.get(base_url+'quick_loan_application/get_address_info',{'address':prop_addrs},function(data){
				var addres_response = $.parseJSON(data);
				if(addres_response.status==true){
					$('#property_city').val(addres_response.city);
					$('#property_county').val(addres_response.county);
					$('#property_state').val(addres_response.state_id);
					$('#property_zip_code').val(addres_response.zipcode);
				}
			});
		}
	}); */
	$(document).on('focusout','#property_zip_code',function(){
		var prop_addrs = $(this).val();
		if(prop_addrs !='' ||prop_addrs !=null){
			//alert(prop_addrs);
			/*$.get(base_url+'quick_loan_application/get_address_info',{'address':prop_addrs},function(data){
				var addres_response = $.parseJSON(data); 
				if(addres_response.status==true){
					if($("#refinance-CEMA").prop('checked') == true && addres_response.state_id!= 5){
						alert("CEMA is applicable only for New York loans. Please choose address from New York.");
						$('#property_zip_code').val("");
						$('#property_city').val("");
						$('#property_county').val("");
						$('#property_state').val("").change();
					}else{
						$('#property_city').val(addres_response.city);
						$('#property_county').val(addres_response.county);
						$('#property_state').val(addres_response.state_id);
						$('#property_zip_code').val(addres_response.zipcode);
					}
					
				}
			});*/
		}
	});
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
					$('#borrower_state').val(addres_response.state_id);
					$('#borrower_zipcode').val(addres_response.zipcode);
				}
			});*/
		}
	});
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
					$('#broker_state').val(addres_response.state_id);
					$('#broker_zipcode').val(addres_response.zipcode);
				}
			});*/
		}
	});

    $('.postal_code').on('focusout',function(){
		var id = $(this).attr("rel");  
		//console.log(id);
		var prop_addrs = $(this).val();
		if(prop_addrs !='' ||prop_addrs !=null){
			//alert(prop_addrs);
			/*$.get(base_url+'quick_loan_application/get_address_info',{'address':prop_addrs},function(data){
				var addres_response = $.parseJSON(data); 
				//console.log(addres_response);
				if(addres_response.status==true){
					$('#city'+id).val(addres_response.city);
					$('#county'+id).val(addres_response.county);
					$('#state'+id).val(addres_response.state);
					$('#zip'+id).val(addres_response.zipcode);
				}
			});*/
		}
	});
	

	$(document).on('click','.as-is-chck',function(){
		

		if($(this).prop('checked')== true){
			$('.unit').val('');
		}
		$.get(base_url+'quick_loan_application/get_property_use',{'asset_type':$(this).val()},function(data){
			var response = $.parseJSON(data);
	    	var props =  response.prop_use;
	    	if(response.status == true){
				$("#property_use").html('');
				$("#property_use").append('<option value="">Select</option>');
				$.each(props,function(key,name){
			       $("#property_use").append('<option value="' + name + '">' + name + '</option>');
			    });
			}

		});

		if($(this).val() == 'Portfolio'){
			$("#additional_collateral_yes").trigger('click');
			if($("#additional_collateral_yes").prop('checked') == true){
				port_flag = true;
				//alert('dd');
				$("#more_collatral").show();
				$(".add-more").show();
				$("#portfolio-unit-div").show();

				//$("#additional_collateral_no").prop('disabled',true);
			}
		}else{
			if(port_flag == true){
				//alert('d');
				//$("#additional_collateral_no").prop('disabled',false);
				//$("#additional_collateral_no").trigger('click');
				if($("#additional_collateral_no").prop('checked') == true){
					$("#more_collatral").hide();
					$(".add-more").hide();
					$('#more_collatral').find('input:text').val('');
					$('#more_collatral').find('select').val('');
					$(".collateral:gt(0)").remove();
					
					more_id = 1;
					/*if(more_id > 1){

						for()
					}*/
				}
			}
			$("#portfolio-unit-div").hide();
			$("#portfolio_units").val('');
		}
	});

	/*$(document).on('click','.new-asset-chk',function(){
		if($(this).prop('checked')== true){
			$('.nw-unit').val('');
		}
	});*/

	$('#current-div').hide();
	$(document).on('click','.occupancy-chk',function(){

		var ocup_val = $(this).val();
		if($(this).prop('checked')== true && ocup_val == 'Partially Occupied' || ocup_val == 'Fully Occupied'){
			$('#current-div').show();
		}else{
			$("#current-div").find('input:text').val('');;
			$('#current-div').hide();
		}

		$(".dev-phase").prop('checked',false);
		$(".dev-phase").closest('.full-width').hide();
		$(".app-plan").prop('checked',false);
		$("#app-plan-div").hide();
		$("#app-plan-date-div").hide();
		if(ocup_val == 'Vacant'){
			$(".dev-phase").closest('.full-width').show();
			$(".dev-phase[value='Leasing']").closest('.full-width').hide();
			$(".dev-phase[value='Stabilized']").closest('.full-width').hide();
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

	$(document).on({
	    keyup: function()
	    {
	        var per  = $(this).val();
	        per      =  parseFloat(per.replace(/[^0-9-.]/g, ''));
	        $(".dev-phase").prop('checked',false);
			$(".dev-phase").closest('.full-width').hide();
			$(".app-plan").prop('checked',false);
			$("#app-plan-div").hide();
			$("#app-plan-date-div").hide();
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
	        }
	    }
	}, '#partial_percentage');

	$(document).on({
	    keyup: function()
	    {
	    	var acq_loan_request = $("#acquisition_loan_request").val();
	    	acq_loan_request =  parseFloat(acq_loan_request.replace(/[^0-9-.]/g, ''));
	    	if(isNaN(acq_loan_request)){ acq_loan_request = 0 }
	    	var con_loan_request = $("#construction_loan_request").val();
	    	con_loan_request =  parseFloat(con_loan_request.replace(/[^0-9-.]/g, ''));
	    	if(isNaN(con_loan_request)){ con_loan_request = 0 }

	    	var total_loan_request = parseFloat(acq_loan_request) + parseFloat(con_loan_request);
			$("#total_loan_request").val(number_format_float(total_loan_request,2,'.',','));
	    }
	}, '.total_loan');

	$("#new-asset-type-div").hide();
	$("#app-plan-div").hide();
	$("#app-plan-date-div").hide();
	$("#dev-other-opt-div").hide();
	$(document).on('click','.dev-phase',function(){
		if($(this).prop('checked') == true){
			var dev_phase = $(this).val();
			if(dev_phase == 'Conversion' || dev_phase == 'Conversion & Extension/Addition' || dev_phase == 'Ground Up Construction'){
				$(".new-asset-type-div").show();
			}else{
				$(".new-asset-type-div").hide();
				$(".new-asset-chk").prop('checked',false);
			}

			if(dev_phase == 'Full Renovation' || dev_phase == 'Full Renovation and Extension' || dev_phase == 'Conversion' || dev_phase == 'Conversion & Extension/Addition' || dev_phase == 'Ground Up Construction'){
				$("#app-plan-div").show();
			}else{
				$("#app-plan-div").hide();
				$(".app-plan").prop('checked',false);
				$("#app-plan-date-div").hide();
				$("#approved_plan_date").val('');
			}

			if(dev_phase == 'Other'){
				$("#dev-other-opt-div").show();
			}else{
				$("#dev-other-opt-div").hide();
				$("#development_phase_other").val('');
			}
		}
	});

	$(document).on('click','.app-plan',function(){
		if($(this).prop('checked') == true){
			var app_plan = $(this).val()

			if(app_plan == 'N'){
				$("#app-plan-date-div").show();
			}else{
				$("#app-plan-date-div").hide();
				$("#approved_plan_date").val('');
			}

		}
	});


	//for add more functionality
	$("#more_collatral").hide();
	$(".add-more").hide();

	$(document).on('click','#additional_collateral_yes',function(){
		
		if($(this).prop('checked') == true){

			$("#more_collatral").show();
			$(".add-more").show();

			if($("#type_Portfolio").prop('checked')== false){
				//$("#type_Portfolio").prop('checked',true);
				$('.unit').val('');
				$.get(base_url+'quick_loan_application/get_property_use',{'asset_type':$("#type_Portfolio").val()},function(data){
					var response = $.parseJSON(data);
			    	var props =  response.prop_use;
			    	if(response.status == true){
						$("#property_use").html('');
						$("#property_use").append('<option value="">Select</option>');
						$.each(props,function(key,name){
					       $("#property_use").append('<option value="' + name + '">' + name + '</option>');
					    });
					}

				});
				//$("#additional_collateral_no").prop('disabled',true);
				port_flag = true;
			}

		}
	});

	$(document).on('click','#additional_collateral_no',function(){
		//alert('cc');
		if($(this).prop('checked') == true){
			$("#more_collatral").hide();
			$(".add-more").hide();
			$('#more_collatral').find('input:text').val('');
			$('#more_collatral').find('select').val('');
			$(".collateral:gt(0)").remove();
			more_id = 1;
			/*if(more_id > 1){

				for()
			}*/
		}
	});

	$(document).on('click','.delete-more',function(){
		var element_id = $(this).attr('data-id');
		//alert(element_id);
		$("#more_collatral"+element_id).remove();
		more_id = more_id-1;
		$(".collateral:last").find('.add-more').show();
		
	});

	$(document).on('click','.add-more',function(){
		
		//if(more_id <=3){
			more_id = more_id+1;
			add_more_item(more_id);
			$("#property_addres"+more_id).rules('add',{required: true});
			$("#city"+more_id).rules('add',{required: true});
			$("#state"+more_id).rules('add',{required: true});
			$("#zipcode"+more_id).rules('add',{required: true});
			$("#asset_type"+more_id).rules('add',{required: true});
			$("#occupancy"+more_id).rules('add',{required: true});
			$("#phase"+more_id).rules('add',{required: true});
			$("#as_is_property_value"+more_id).rules('add',{required: true});
			$('[name="cl['+more_id+'][is_this_property]"]').rules('add',{required: true});
			//var t = $('#encumbered'+more_id+':checked',true);
			$("#loan-amount"+more_id).rules('add',{required:function(elem){
                return $("#encumbered"+more_id+":checked").length > 0}});
			$('[name="cl['+more_id+'][loan_being]"]').rules('add',{required:function(elem){
                return $("#encumbered"+more_id+":checked").length > 0}});
		//}

	});
	$(document).on('focus','.collateral_address',function(e){ 
	  	
	  	id =  $(this).attr("rel"); 
	    MultiAutocomplete(id);
	});

	//new asset type 
	/*$(document).on('click','#full_renovation',function(){
		if($(this).prop('checked') == true){
			$("#new-asset-type-div").show();
		}
	})

	$(document).on('click','#conversion,#ground_construction',function(){
		
		if($(this).prop('checked') == true){
			if($("#new-asset-type-div").length >0){
				//alert('fsasf');
				$("#new-asset-type-div").hide();
				$(".new-asset-chk").prop('checked',false);
			}
		}
	});*/

	//bankreptucy  div hide on  loag
	//$("#bnk-yr-div").hide();
	//$("#bnk-dt-div").hide();
	$("#bnk-yr-div").hide();
	$("#bnk-dt-div").hide();
	$("#loan-dt-div").hide();
	$("#forclosure-dt-div").hide();
	$("#judegement-dt-div").hide();
	$("#felony-div").hide();
	$("#violations-div").hide();

	$(document).on('click','#bankruptcy_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#bnk-yr-div").show();
			$("#bnk-dt-div").show();
		}
	});

	$(document).on('click','#bankruptcy_No',function(){
		if($(this).prop('checked') == true){
			$("#bankruptcy_year").val('');
			$("#bankruptcy_description").val('');
			$("#bnk-yr-div").hide();
			$("#bnk-dt-div").hide();
		}
	});

	$(document).on('click','#defaulted_loan_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#loan-dt-div").show();
		}
	});

	$(document).on('click','#defaulted_loan_No',function(){
		if($(this).prop('checked') == true){
			$("#defaulted_loan_description").val('');
			$("#loan-dt-div").hide();
		}
	});

	$(document).on('click','#foreclosure_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#forclosure-dt-div").show();
		}
	});

	$(document).on('click','#foreclosure_No',function(){
		if($(this).prop('checked') == true){
			$("#foreclosure_description").val('');
			$("#forclosure-dt-div").hide();
		}
	});

	$(document).on('click','#outstanding_judgments_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#judegement-dt-div").show();
		}
	});

	$(document).on('click','#outstanding_judgments_No',function(){
		if($(this).prop('checked') == true){
			$("#judgments_description").val('');
			$("#judegement-dt-div").hide();
		}
	});

	$(document).on('click','.felony-chk',function(){
		var felony_val = $(this).val()
		if($(this).prop('checked') == true && felony_val == 'Y'){
			$("#felony-div").show();
		}else{
			$("#felony_description").val('');
			$("#felony-div").hide();
		}
	});

	$(document).on('click','.sec-violations-chk',function(){
		var sec_val = $(this).val()
		if($(this).prop('checked') == true && sec_val == 'Y'){
			$("#violations-div").show();
		}else{
			$("#violations_description").val('');
			$("#violations-div").hide();
		}
	});

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
                }
				// user_phone_check:true
			},
			borrower_alt_phone_no:{user_phone_check:true},
			borrower_email:{required:true,email:true,remote:
            {
              //url: "<?php echo base_url().'New_settings1/check_user_email'; ?>",
              url:base_url+'backend/quick_loans/check_borrower_email_add',
              type: "post",
               data:{'csrf_test_name':global_csrf_token_value}
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
				// user_phone_check:"Please enter a valid phone number"
				remote:"Phone number is already exist!"
			},
			borrower_alt_phone_no:{user_phone_check:"Please enter a valid phone number"},
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
			    error.insertAfter(element.parent("div").parent("div"));
			}else if(element.attr("name") == "borrower_state" || element.attr("name") == "borrower_credit_score" || element.attr("name") == "bankruptcy_year"){
				error.insertAfter(element.parent("div").parent("div"));
			}
			/*else if(element.attr("name") == "commercial_unit" ||element.attr("name") == "mixed_commercial_unit" || element.attr("name") == "res_unit" || element.attr("name") == "multi_multi_unit" || element.attr("name") == "residential_unit") {
			    error.insertAfter((".assetType"));
			}else if(element.closest(".proplist")){
				error.insertAfter(element);
			}*/else{
				error.insertAfter(element);

			} 
		}
	});

	//nmls div hide on on load
	$("#nmls-div").hide();

	$(document).on('click','#licensed_broker_Yes',function(){
		if($(this).prop('checked') == true){;
			$("#nmls-div").show();
		}
	})

	$(document).on('click','#licensed_broker_No',function(){
		if($(this).prop('checked') == true){
			$("#nmls").val('');
			$("#nmls-div").hide();
		}
	})
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
				remote:{
					depends: function(){
			        return $('#broker_id').val() == '';
			     },
                    url:base_url+'quick_loan_application/check_broker_phone',
                    type: "post",
                    data:{'csrf_test_name':global_csrf_token_value}
                }
			},
			broker_alt_phone_no:{user_phone_check:true},
			broker_email:{required:true,email:true,notEqual:"#borrower_email",remote:
                   {
                      url:base_url+'backend/quick_loans/check_broker_email_add',
                      type: "post",
                       data:{'csrf_test_name':global_csrf_token_value},
                   }},
			broker_fee_type:{required:true},
			broker_charge:{required:true},
			
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
        		remote:"Phone number already exist!"
				// user_phone_check:"Please enter a valid phone number"
			},
			broker_alt_phone_no:{user_phone_check:"Please enter a valid phone number"},
			broker_email:{required:"Broker email address is required",remote:"Email address is already exist!"},
			broker_fee_type:{required:"Please select one"},
			broker_charge:{required:"Charge is required"},
			//channel_broker: {required:"Please select Channel"},
			channel_publication_broker:{channel_check:"Please select Channel Publication"},
			channel_text_broker:{channel_check:"Please select Channel Publication"},
		},
		errorPlacement: function(error, element) {
			   
		    if(element.attr("type") == "radio" || element.attr("type") == "checkbox") {
			    error.insertAfter(element.parent("div").parent("div"));
			}else if(element.attr("name") == "broker_state"){
				error.insertAfter(element.parent("div").parent("div"));
			}
			/*else if(element.attr("name") == "commercial_unit" ||element.attr("name") == "mixed_commercial_unit" || element.attr("name") == "res_unit" || element.attr("name") == "multi_multi_unit" || element.attr("name") == "residential_unit") {
			    error.insertAfter((".assetType"));
			}else if(element.closest(".proplist")){
				error.insertAfter(element);
			}*/else{
				error.insertAfter(element);

			} 
		}
	});


	//broker form validation
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
			    error.insertAfter(element.parent("div").parent("div"));
			}else if(element.attr("name") == "years_in_realestate" || element.attr("name") == "no_of_borrower_transaction" || element.attr("name") == "borrower_transaction_total_amount"){
				error.insertAfter(element.parent("div").parent("div"));
			}
			/*else if(element.attr("name") == "commercial_unit" ||element.attr("name") == "mixed_commercial_unit" || element.attr("name") == "res_unit" || element.attr("name") == "multi_multi_unit" || element.attr("name") == "residential_unit") {
			    error.insertAfter((".assetType"));
			}else if(element.closest(".proplist")){
				error.insertAfter(element);
			}*/else{
				error.insertAfter(element);

			} 
		}
	});



	$.validator.addMethod("notEqual", function(value, element, param) {
  		return this.optional(element) || value != $(param).val();
	}, "Please specify a different value");
	//phone number validation
	// phone number validation
	$.validator.addMethod("user_phone_check",function(value,element) {
		cntry_code 	= parseFloat(value.replace(/[^0-9-.]/g, ''));
		var codeReg =/^(?!.*(\d)\1{2}).*$/;
		if (!codeReg.test(cntry_code)) {
			//return false;
			return true;
		} else {
			var pattern1 = '01234567890123456789' //to match circular sequence as well.
			if (pattern1.indexOf(cntry_code) == -1) {
				return true;
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

	var format = function(num){
  		var str = num.toString(). replace(/[$,]/g,''), parts = false, output = [], i = 1, formatted = null;
   		if(isNaN(str))
    	{
        	return;
    	}
  		if(str.indexOf(".") > 0) {
    		parts = str.split(".");
    		str = parts[0];
  		}
  		str = str.split("").reverse();
  		for(var j = 0, len = str.length; j < len; j++) {
    		if(str[j] != ",") {
      			output.push(str[j]);
      			if(i%3 == 0 && j < (len - 1)) {
        			output.push(",");
      			}
      			i++;
   	 		}
  		}
  		formatted = output.reverse().join("");
  		return("$" + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
	};

	//currency
	$(document).on(
	{
	    keyup: function()
	    {
	        var val = $(this).val();
	        var val1 = $(this).val();

	         val  =  parseFloat(val.replace(/[^0-9-.]/g, ''));
	   
	        if(val==0 || val1=='$')
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
	        $(this).val(format($(this).val()));
	    }
	}
	, '.currency-money');

	$(document).on({
	    keyup: function()
	    {
	        var val  = $(this).val();
	        var val1 = $(this).val();
	        val      =  parseFloat(val.replace(/[^0-9-.]/g, ''));
	        $(this).val(format($(this).val()));
	    }
	}, '.currency_wo_error');

	$(document).on({
	    blur: function(){
	        var val = $(this).val();
	        // var val1 = $(this).val();
	       // val=  parseFloat(val.replace(/[^0-9-.]/g, ''));
	   
	        if(val==''){
	          return false;
	        }else if(val==0 || val=='$'){
	           $("#err-labl").remove();
	           $(this).addClass('error');
	               $(this).val('');
	               $(this).parent().append('<label class="error" id="err-labl">Please enter value greater than 0</label>');
	               return false;
	        
	        }else{
	          
	          $("#err-labl").remove();  
	          $(this).removeClass('error');
	          $(this).val(number_format_float($(this).val(),2));
	        }
	        
	    }
	}
	, '.currency');


	$(document).on({
	    blur: function(){
	        var val = $(this).val();
	        // var val1 = $(this).val();
	       // val=  parseFloat(val.replace(/[^0-9-.]/g, ''));
	 
	        if(val==''){
	          return false;
	        }
	        else if(val=='$'){
	           $("#err-labl").remove();
	           $(this).addClass('error');
	               $(this).val('');
	               $(this).parent().append('<label class="error" id="err-labl">Please enter a valid value</label>');
	               return false;
	        
	        }
	        else{
	          
	          $("#err-labl").remove();  
	          $(this).removeClass('error');
	          $(this).val(number_format_float($(this).val(),2));
	        }
	        
	    }
	}
	, '.currency_zero');

	$(document).keypress(function(e) {
		
	    if(e.which == 13) {
	    	$(':focus').next('input').focus();
	    }
	});

	/*$(document).on('blur','.percentage',function(){  
	    if($(this).val()!=""){
	    	var per_val = parseFloat($(this).val()); 
	    	
	    	$(this).val(number_format(per_val,2,'.','')+'%');
	    }
	});*/
	$(document).on({
	    keyup: function(e){
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
	    },
	    blur: function(){
	        var val = $(this).val();
	        if(val==''){
	          	return false;
	        }else{
	          	$(this).val(number_format($(this).val(),2)+'%');
	        }
	    }
	}
	, '.percentage');

	$("#borrower_email" ).autocomplete({
            source: base_url+'backend/quick_loans/get_user_list',
            minLength: 1,
            select: function(event, ui) {

                    if(ui.item == null || ui.item == undefined) {

                         alert("Invalid user");
                         $(this).val('');

                    } else {

                         id    = ui.item.id;
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
                      //alert(1);
                       $(".hear_abt_borrower").show();
                       add_borrower_check_rule($(".broker_or_borrower").attr('data-value'));

                       //$('#channel_borrower').rules("add", {required:true});
                  }else{
                  	//alert(2);
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

	});

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

	//broker_firm_name name auto complete function
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
		select:function(event, ui) {
            if(ui.item == null || ui.item == undefined) {
                alert("Invalid user");
                $(this).val('');
            } else {

            	

          		id = ui.item.id;
                value = ui.item.value;
                maintype = ui.item.maintype;
                $(".hear_abt_broker").hide();
               // $('#channel_broker').rules('remove');


                $('#broker_id_selected').val(id);
                $('#broker_id').val(id);
                
                 //alert((ui.item.address).length);
                
                   $('#broker_first_name').val(ui.item.first_name);

                  if((ui.item.first_name!=null) && ((ui.item.first_name).length!=0))
                  {
                   $('#broker_first_name').attr('readonly', true);
                   }
                $('#broker_last_name').val(ui.item.last_name);
               // if(ui.item.last_name!=null)

               if((ui.item.last_name!=null) && ((ui.item.last_name).length!=0))
                  {
                   $('#broker_last_name').attr('readonly', true);
                   }
                $('#broker_address').val(ui.item.address);
                  if((ui.item.address!=null) && ((ui.item.address).length!=0))
                  {
                   $('#broker_address').attr('readonly', true);
                   }
               

               
                $('#broker_city').val(ui.item.city);
               // if(ui.item.city!=null)

               if((ui.item.city!=null) && ((ui.item.city).length!=0))
                  {
                   $('#broker_city').attr('readonly', true);
                   }
                $('#broker_state').val(ui.item.state);

                  //alert(jQuery.type(ui.item.state));

                //  var br_state = parseInt(ui.item.state);

           //  $("#broker_state").selectpicker('val', br_state);
            
              	//$('#broker_state').selectpicker('refresh');

             


                 
             //$('#broker_state').selectpicker('val', [ui.item.state]);
              
                    /*  $("#broker_state option").filter(function() {
                    return this.val == br_state; 
                 }).attr('selected', true);*/

         
      
           
                
               /*if ((ui.item.state).length===0) 
                  {

                 //  $('#broker_state').prop('disabled', false);
                   $('#broker_state').attr('disabled', false).selectpicker('refresh');

                  }*/

                   //  alert((ui.item.state).length);

               /* if ((ui.item.state!=null)&&((ui.item.state).length!=0)) 
                  {
                    
                  	//$('#broker_state').prop('disabled', true);
                  	  $('#broker_state').attr('disabled', true).selectpicker('refresh');
                  }*/

                $('#broker_zipcode').val(ui.item.zipcode);

               
                 //if(ui.item.zipcode!=null)
                if((ui.item.zipcode!=null) && ((ui.item.zipcode).length!=0) && (ui.item.zipcode!='00000'))
                {
                   $('#broker_zipcode').attr('readonly', true);
                }
                $('#broker_phone_no').val(ui.item.phone);

                 //if(ui.item.phone!=null)
              	if((ui.item.phone!=null) && ((ui.item.phone).length!=0))
              	{
               		//$('#broker_phone_no').attr('readonly', true);
               	}
                $('#broker_email').val(ui.item.email);
               
               /// $("#broker_state select").val(ui.item.state);



                $('#broker_firm_name').val(ui.item.business_name);

                //if(ui.item.business_name!=null)

               if((ui.item.business_name!=null) && ((ui.item.business_name).length!=0))
                  
                  {
                   $('#broker_firm_name').attr('readonly', true);
                   }
                  $("#broker_email" ).rules("remove","remote");
                repopulate_broker_details(id);
                
            }
        },
       change: function(event,ui){
        //   $(this).val((ui.item ? ui.item.value : ""));
           
           
           

      
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
                $('#broker_firm_name').val('');
                $("#broker_firm_name").attr("readonly", false); 
                $('#broker_charge').val('');
            }else{
            	$('#channel_broker').rules('remove');
            	$("#channel_publication_broker").rules('remove');
            }
        }

	});

	$(document).on('click','.is-this-prop',function(){
		var show_loan_id = $(this).attr('data-id');
		var is_this_value = $(this).val();
		if($(this).prop('checked') == true && is_this_value == 'Encumbered'){
			$("#show-loan"+show_loan_id).show();
		}else{
			$("#show-loan"+show_loan_id).hide();
			$("#loan-amount"+show_loan_id).val('');
			$("#paying"+show_loan_id).prop('checked',false);
			$("#taking"+show_loan_id).prop('checked',false);
		}
		//alert(show_loan_id);
	});

	var loan_pgm_ck = readCookie('admin_loan_pgm');
	if(loan_pgm_ck){
		$('input[name="loan_program"][value="'+loan_pgm_ck+'"]').trigger('click');
	}

	
});

$(document).on(
{
    click: function()
    {
      	$(".loan_popup").hide();
      	$(".modal-backdrop").hide();
      	$(".popupbg").hide();
      	$('#borrower_phone_no').val('');
    }
}, '.modal_close');

function repopulate_broker_details(broker_id){
	$.get(base_url+'backend/quick_loans/get_broker_data',{'broker_id':broker_id},function(data){
		var response = $.parseJSON(data);
	    var broker =  response.broker;
	    $('#quik_broker_id').val(broker.quik_broker_id);

	    ///$('#broker_state').val(broker.quik_broker_id);
	    
	});
}

function sortNumber(n){
    var newNumber="";
    for(var i = 0; i<n.length; i++)
        if(n[i] != "%")
            newNumber += n[i];
    return newNumber;
}

function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57))
	 return false;
	else
	return true;
}


function number_format(number, decimals, dec_point, thousands_sep) {
    
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  
}

function number_format_float(number, decimals, dec_point, thousands_sep) {
    
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return '$'+s.join(dec);
  
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

function add_more_item(more_id){

	
	var html = null;
	html = '';
	$(".add-more").hide();
	//html = '<div id="more_collatral'+more_id+'" class="collateral"><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Property Address<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control collateral_address" id="property_addres'+more_id+'" name="cl['+more_id+'][property_addres]" rel="'+more_id+'"></div></div></div> <div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">City<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control" id="city'+more_id+'" name="cl['+more_id+'][city]"></div></div></div> <div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">State<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker" name="cl['+more_id+'][state]" id="state'+more_id+'"><option value="">--Select--</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Zip Code <span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control postal_code" id="zipcode'+more_id+'" rel="'+more_id+'" name="cl['+more_id+'][zipcode]" maxlength=" 5" onkeypress="return isNumberKey(event);"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Asset Type<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker" name="cl['+more_id+'][asset_type]" id="asset_type'+more_id+'"><option value="">--Select--</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Current Occupancy<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker" name="cl['+more_id+'][occupancy]" id="occupancy'+more_id+'"><option value="">--Select--</option>></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Development Phase<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker" name="cl['+more_id+'][phase]" id="phase'+more_id+'"><option value="">--Select--</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">As is Property value<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control currency" id="as_is_property_value'+more_id+'" name="cl['+more_id+'][as_is_property_value]" placeholder="$"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group  marg-bot0"><label class="form-label">Is this Property?<span class="require-star">*</span></label><div class="radio radio-inline"><input type="radio" id="owned-free'+more_id+'" name="cl['+more_id+'][is_this_property]" value="Owned" class="is-this-prop" data-id="'+more_id+'"><label for="owned-free'+more_id+'">Owned Free and Clear</label></div><div class="radio radio-inline"><input type="radio" id="encumbered'+more_id+'" name="cl['+more_id+'][is_this_property]" value="Encumbered" class="is-this-prop" data-id="'+more_id+'"><label for="encumbered'+more_id+'">Encumbered</label></div></div></div><div id="show-loan'+more_id+'" style="display:none;"><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">What is the Loan Amount Currently on it?<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control currency" id="loan-amount'+more_id+'" name="cl['+more_id+'][loan_amount]" placeholder="$"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group  marg-bot0"><label class="form-label">Will our Loan Being?<span class="require-star">*</span></label><div class="radio radio-inline"><input type="radio" id="paying'+more_id+'" name="cl['+more_id+'][loan_being]" value="Paying" class="loan-being"><label for="paying'+more_id+'">Paying</label></div><div class="radio radio-inline"><input type="radio" id="taking'+more_id+'" name="cl['+more_id+'][loan_being]" value="Taking a 2nd Position" class="loan-being"><label for="taking'+more_id+'">Taking a 2nd Position</label></div></div></div></div><div class="col-lg-12"><div class="form-group marg-bot0"><a class=" delete-more pull-right" style="margin-left:5px" data-id="'+more_id+'">Remove</a> <a href="javascript:void(0)" class="add-more pull-right">Add More</a><div class="clearfix"></div></div></div></div>';
	//html = '<div id="more_collatral'+more_id+'" class="collateral"><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Property Address<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control collateral_address" id="property_addres'+more_id+'" rel ="'+more_id+'" name="cl['+more_id+'][property_addres]"></div></div></div> <div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">City<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control" id="city'+more_id+'" name="cl['+more_id+'][city]"></div></div></div> <div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">State<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker" name="cl['+more_id+'][state]" id="state'+more_id+'"><option value="">--Select--</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Zip Code <span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control" id="zipcode'+more_id+'" name="cl['+more_id+'][zipcode]" maxlength=" 5" onkeypress="return isNumberKey(event);"></div></div></div><div class="col-xs-12 col-sm-6 prevdiv"><div class="form-group marg-bot0"><label class="form-label">As Is Property Type<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker coll_asset_type" name="cl['+more_id+'][asset_type]" id="asset_type'+more_id+'"><option value="">--Select--</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">As Is Property Use</label><div class="inputbox"><select class="form-control col_as_is_property_use" name="cl['+more_id+'][col_as_is_property_use]" id="col_as_is_property_use"><option value="">-- Select --</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">As Is Property Units</label><div class="inputbox"><input type="text" class="form-control" id="col_as_is_property_unit" name="cl['+more_id+'][col_as_is_property_units]"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">As is Property value<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control currency" id="as_is_property_value'+more_id+'" name="cl['+more_id+'][as_is_property_value]" placeholder="$"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Current Occupancy<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker" name="cl['+more_id+'][occupancy]" id="occupancy'+more_id+'"><option value="">--Select--</option>></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Development Phase<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker phase1" name="cl['+more_id+'][phase]" id="phase'+more_id+'" data-rel="phase'+more_id+'"><option value="">--Select--</option></select></div></div></div> <div style="display:none" class="col-xs-12 col-sm-6 col_com_phase'+more_id+' col-complete-div prevdiv"><div class="form-group marg-bot0"><label class="form-label">As Complete Property Type</label><div class="inputbox"><select class="selectpicker coll_com_asset_type" name="cl['+more_id+'][col_com_asset_type]" id="col_comp_asset_type'+more_id+'"><option value="">--Select--</option></select></div></div></div><div style="display:none" class="col-xs-12 col-sm-6 col-complete-div col_com_phase'+more_id+'"><div class="form-group marg-bot0"><label class="form-label">As Complete Property Use</label><div class="inputbox"><select class="form-control col_as_com_property_use" name="cl['+more_id+'][col_as_com_property_use]" id="col_as_com_property_use"><option value="">-- Select --</option></select></div></div></div></div><div style="display:none" class="col-xs-12 col-sm-6 col-complete-div col_com_phase'+more_id+'"><div class="form-group marg-bot0"><label class="form-label">As Complete Property Units</label><div class="inputbox"><input type="text" class="form-control" id="col_as_com_property_unit" name="cl['+more_id+'][col_as_com_property_units]"></div></div></div><div style="display:none" class="col-xs-12 col-sm-6 col-complete-div col_com_phase'+more_id+'"><div class="form-group marg-bot0"><label class="form-label">As Complete Property value</label><div class="inputbox"><input type="text" class="form-control currency" id="as_com_property_value1" name="cl['+more_id+'][col_as_com_property_value]" placeholder="$"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group  marg-bot0"><label class="form-label">Is this Property?<span class="require-star">*</span></label><div class="radio radio-inline"><input type="radio" id="owned-free'+more_id+'" name="cl['+more_id+'][is_this_property]" value="Owned" class="is-this-prop" data-id="'+more_id+'"><label for="owned-free'+more_id+'">Owned Free and Clear</label></div><div class="radio radio-inline"><input type="radio" id="encumbered'+more_id+'" name="cl['+more_id+'][is_this_property]" value="Encumbered" class="is-this-prop" data-id="'+more_id+'"><label for="encumbered'+more_id+'">Encumbered</label></div></div></div><div id="show-loan'+more_id+'" style="display:none;"><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">What is the Loan Amount Currently on it?<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control currency" id="loan-amount'+more_id+'" name="cl['+more_id+'][loan_amount]" placeholder="$"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group  marg-bot0"><label class="form-label">Will our Loan Being?<span class="require-star">*</span></label><div class="radio radio-inline"><input type="radio" id="paying'+more_id+'" name="cl['+more_id+'][loan_being]" value="Paying" class="loan-being"><label for="paying'+more_id+'">Paying</label></div><div class="radio radio-inline"><input type="radio" id="taking'+more_id+'" name="cl['+more_id+'][loan_being]" value="Taking a 2nd Position" class="loan-being"><label for="taking'+more_id+'">Taking a 2nd Position</label></div></div></div></div><div class="col-lg-12"><div class="form-group marg-bot0"><a class=" delete-more pull-right" style="margin-left:5px" data-id="'+more_id+'">Remove</a> <a href="javascript:void(0)" class="add-more pull-right">Add More</a><div class="clearfix"></div></div></div></div>';
    html = '<div id="more_collatral'+more_id+'" class="collateral"><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Property Address<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control collateral_address" id="property_addres'+more_id+'" rel ="'+more_id+'" name="cl['+more_id+'][property_addres]"></div></div></div> <div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">City<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control" id="city'+more_id+'" name="cl['+more_id+'][city]"></div></div></div> <div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">State<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker" name="cl['+more_id+'][state]" id="state'+more_id+'"><option value="">--Select--</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Zip Code <span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control" id="zipcode'+more_id+'" name="cl['+more_id+'][zipcode]" maxlength=" 5" onkeypress="return isNumberKey(event);"></div></div></div><div class="col-xs-12 col-sm-6 prevdiv"><div class="form-group marg-bot0"><label class="form-label">As Is Property Type<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker coll_asset_type" name="cl['+more_id+'][asset_type]" id="asset_type'+more_id+'"><option value="">--Select--</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">As Is Property Use</label><div class="inputbox"><select class="form-control col_as_is_property_use" name="cl['+more_id+'][col_as_is_property_use]" id="col_as_is_property_use'+more_id+'"><option value="">-- Select --</option></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">As Is Property Units</label><div class="inputbox"><input type="text" class="form-control" id="col_as_is_property_unit'+more_id+'" name="cl['+more_id+'][col_as_is_property_units]"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">As is Property value<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control currency" id="as_is_property_value'+more_id+'" name="cl['+more_id+'][as_is_property_value]" placeholder="$"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Current Occupancy<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker" name="cl['+more_id+'][occupancy]" id="occupancy'+more_id+'"><option value="">--Select--</option>></select></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">Development Phase<span class="require-star">*</span></label><div class="inputbox"><select class="selectpicker phase1" name="cl['+more_id+'][phase]" id="phase'+more_id+'" data-rel="phase'+more_id+'" data-attr='+more_id+'><option value="">--Select--</option></select></div></div></div> <div style="display:none" class="col-xs-12 col-sm-6 col_com_phase'+more_id+' col-complete-div prevdiv"><div class="form-group marg-bot0"><label class="form-label">As Complete Property Type</label><div class="inputbox"><select class="selectpicker coll_com_asset_type" name="cl['+more_id+'][col_as_com_property_type]" id="col_comp_asset_type'+more_id+'"><option value="">--Select--</option></select></div></div></div><div style="display:none" class="col-xs-12 col-sm-6 col-complete-div col_com_phase'+more_id+'"><div class="form-group marg-bot0"><label class="form-label">As Complete Property Use</label><div class="inputbox"><select class="form-control col_as_com_property_use" name="cl['+more_id+'][col_as_com_property_use]" id="col_as_com_property_use'+more_id+'"><option value="">-- Select --</option></select></div></div></div><div style="display:none" class="col-xs-12 col-sm-6 col-complete-div col_com_phase'+more_id+'"><div class="form-group marg-bot0"><label class="form-label">As Complete Property Units</label><div class="inputbox"><input type="text" class="form-control" id="col_as_com_property_unit'+more_id+'" name="cl['+more_id+'][col_as_com_property_units]"></div></div></div><div style="display:none" class="col-xs-12 col-sm-6 col-complete-div col_com_phase'+more_id+'"><div class="form-group marg-bot0"><label class="form-label">As Complete Property value</label><div class="inputbox"><input type="text" class="form-control currency as_com_property_value" id="as_com_property_value'+more_id+'" name="cl['+more_id+'][col_as_com_property_value]" placeholder="$"></div></div></div><div class="col-xs-12 col-sm-6  col_com_dev_phase'+more_id+'" style="display: none;"><div class="form-group marg-bot0"><label class="form-label">Please Explain</label><div class="inputbox"><input type="text" class="form-control " id="development_phase_other'+more_id+'" name="cl['+more_id+'][development_phase_other]"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group  marg-bot0"><label class="form-label">Is this Property?<span class="require-star">*</span></label><div class="radio radio-inline"><input type="radio" id="owned-free'+more_id+'" name="cl['+more_id+'][is_this_property]" value="Owned" class="is-this-prop" data-id="'+more_id+'"><label for="owned-free'+more_id+'">Owned Free and Clear</label></div><div class="radio radio-inline"><input type="radio" id="encumbered'+more_id+'" name="cl['+more_id+'][is_this_property]" value="Encumbered" class="is-this-prop" data-id="'+more_id+'"><label for="encumbered'+more_id+'">Encumbered</label></div></div></div><div id="show-loan'+more_id+'" style="display:none;"><div class="col-xs-12 col-sm-6"><div class="form-group marg-bot0"><label class="form-label">What is the Loan Amount Currently on it?<span class="require-star">*</span></label><div class="inputbox"><input type="text" class="form-control currency" id="loan-amount'+more_id+'" name="cl['+more_id+'][loan_amount]" placeholder="$"></div></div></div><div class="col-xs-12 col-sm-6"><div class="form-group  marg-bot0"><label class="form-label">Will our Loan Being?<span class="require-star">*</span></label><div class="radio radio-inline"><input type="radio" id="paying'+more_id+'" name="cl['+more_id+'][loan_being]" value="Paying" class="loan-being"><label for="paying'+more_id+'">Paying</label></div><div class="radio radio-inline"><input type="radio" id="taking'+more_id+'" name="cl['+more_id+'][loan_being]" value="Taking a 2nd Position" class="loan-being"><label for="taking'+more_id+'">Taking a 2nd Position</label></div></div></div></div><div class="col-lg-12"><div class="form-group marg-bot0"><a class=" delete-more pull-right" style="margin-left:5px" data-id="'+more_id+'">Remove</a> <a href="javascript:void(0)" class="add-more pull-right">Add More</a><div class="clearfix"></div></div></div></div>';

	$("#more_collatral").append(html);
	$('body').find('#state' + more_id).html( $("#state1").html()).val('');
	$('body').find('#asset_type' + more_id).html($("#asset_type1").html()).val('');
	$('body').find('#occupancy' + more_id).html($("#occupancy1").html()).val('');
	$('body').find('#phase' + more_id).html($("#phase1").html()).val('');
	//$('body').find('#col_comp_asset_type'+ more_id).html($("#asset_type1"+inc).html()).val('');
	$('body').find('#col_comp_asset_type'+ more_id).html($("#asset_type1").html()).val('');

	$('.selectpicker').selectpicker();
}

function repopulate_borrower_details(user_id){
	//alert('dd');
	var stat = check_existing_projects(user_id);


	if(stat==true){
                      	
 	  $('.nav-tabs li:nth-child(5)').hide();
      $("#borrower-track-form").removeClass('active-form');
      trakinfo = true;
   }else{
   	  $('.nav-tabs li:nth-child(5)').show();
      $("#borrower-track-form").addClass('active-form');
      trakinfo = false;
   }

	$.get(base_url+'backend/quick_loans/get_user_data',{'user_id':user_id},function(data){

		var response = $.parseJSON(data);
	    var user =  response.user;
	    //console.log(user);
	    if(response.status == true && user.first_name !=''){
	    	$('#borrower-form').find("label.error").hide();
	    	//$(this).removeClass('error');
	    	//alert(user.alternate_phone_number);

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
	    	$("#borrower_state").val(user.user_state);
	    	/*if(user.user_state == ''){
	    		$("#borrower_city").prop('readonly',false);
	    	}*/
	    	//$("#borrower_state1").val(user.user_state);
	    	$("#borrower_phone_no").val(user.user_phone).prop('readonly',true);
	    	if(user.user_phone == '' || user.user_phone == null){
	    		$("#borrower_phone_no").prop('readonly',false);
	    	}
	    	$("#borrower_zipcode").val(user.user_zip_code).prop('readonly',true);
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
	    	$("#borrower_credit_score").val(user.borrower_credit_score);
	    	$("#no_of_borrower_transaction").val(user.no_of_borrower_transaction);
	    	$("#borrower_networth").val(user.borrower_networth);
	    	//$("#quik_borrower_id").val(user.quik_borrower_id)
	    	if(user.no_of_borrower_transaction == '' || user.no_of_borrower_transaction ==  0){
	    		//alert('sfaf')
	    		$("#no_of_borrower_transaction").prop('readonly',false);
	    	}
	    	if(user.bankruptcy_type == 'Y'){
	    		$("#bankruptcy_Yes").prop('checked',true);
	    		$("#bankruptcy_year").val(user.bankruptcy_year);
	    		$("#bnk-yr-div").show();
	    		$("#bnk-dt-div").show();
	    		$("#bankruptcy_description").val(user.bankruptcy_description);
	    	}else if(user.bankruptcy_type == 'N'){
	    		$("#bankruptcy_No").prop('checked',true);
	    		//$("#bankruptcy_year").val('');
	    		//$("#bnk-yr-div").hide();
	    	}

	    	if(user.defaulted_loan =='Y'){
	    		$("#defaulted_loan_Yes").prop('checked',true);
	    		$("#defaulted_loan_description").val(user.defaulted_loan_description);
	    		$("#loan-dt-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#defaulted_loan_No").prop('checked',true);
	    	}

	    	if(user.foreclosure =='Y'){
	    		$("#foreclosure_Yes").prop('checked',true);
	    		$("#foreclosure_description").val(user.foreclosure_description);
	    		$("#forclosure-dt-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#foreclosure_No").prop('checked',true);
	    	}

	    	if(user.outstanding_judgments =='Y'){
	    		$("#outstanding_judgments_Yes").prop('checked',true);
	    		$("#judgments_description").val(user.judgments_description);
	    		$("#judegement-dt-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#outstanding_judgments_No").prop('checked',true);
	    	}

	    	if(user.convicted_felony =='Y'){
	    		$("#convicted_felony_yes").prop('checked',true);
	    		$("#felony_description").val(user.felony_description);
	    		$("#felony-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#convicted_felony_no").prop('checked',true);
	    	}

	    	if(user.sec_violations =='Y'){
	    		$("#sec_violations_yes").prop('checked',true);
	    		$("#violations_description").val(user.violations_description);
	    		$("#violations-div").show();
	    	}else if(user.defaulted_loan =='N'){
	    		$("#sec_violations_no").prop('checked',true);
	    	}
	    }
	});
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


function add_borrower_check_rule(br_type){
	//alert(2);
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