var base_url = $("#base-url-1").val();
/*
function number_format_new (number, decimals, dec_point, thousands_sep) 
{

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
*/
$(document).ready(function(){

	$("#ein").mask("99-9999999");
	
	$(".channelpublication").hide();
    
	var user_channel = $("#channel").val();
  	// var user_channel_value = $("#channel_value").val();

  	if(user_channel == "search_engine"){
     	$(".channelpublication").show();
  	} else {
     	$(".channelpublication").hide();
     	$("#channel_publication").val('');
  	}

	$('body').on('change', '#channel', function(){
     	var channel = $(this).val();
     	if(channel=="search_engine"){
        	$(".channelpublication").show();
     	} else {
        	$(".channelpublication").hide();
        	$("#channel_publication").val('');                
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
		
        


		$('#foreclosure_attorney_area_id').remove();
		

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
                 
                if(!ele_len)
                {
                    license_details = $('#license-details>.row:eq(0)').clone();

                    if(license_details.hasClass('first-row'))
                        license_details_copy = license_details.removeClass('first-row');
                    else
                        license_details_copy = license_details;

                    license_details_copy.find('input').val('');
                    license_details_copy.find('.geographical-area-name').text(element);
                    license_details_copy.attr('data-geographical-area-name', element);

                    license_details_copy.find('label.error').remove();

                    location_id = loc_name_and_id.indexOf(element);
                    license_details_copy.find("[name='location_id[]']").val(location_id);
                    license_details_copy.find('input[name="license_valid_until[]"]').attr('id',"license_valid_until["+location_id+"]");
                    license_details_copy.find('input[name="bar_licence_num[]"]').attr('id',"bar_licence_num_"+location_id);

                    license_details_copy.insertAfter("#license-details>.row:last");

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


        $('#license-details').find('.valid').each(function (q) {
            $(this).rules('add', {
                required: true,
                messages: {
                    required: "This field is required"
                }
            });
        });
        
               
		// if(loc.length==52){
		// 	$("#select_all_broker_area").prop('checked',true);
		// }else{
		// 	$("#select_all_title_area").prop('checked',false);
		// }
	});

    // $('.valid').each(function (e) { alert(e)
    //     $(this).rules('add', {
    //         required: true,
    //         messages: {
    //             required: "This field is required"
    //         }
    //     });
    // });

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

	$('body').on('click', '.delete_doc', function(){  

        var id   = $(this).attr('id');
        var type = $(this).attr('alt');
        var project_confirm = confirm('Are you sure you want to delete this document?');
        var post_data = {id:id,type:type};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        if(project_confirm==true){
            $.ajax({
              	type: 'POST',
              	data: post_data,
              	url:  base_url + 'backend/foreclosure_attorney/foreclosure_attorney_delete_doc',
              	dataType: "html",
              	success: function (response) {
                	$('#'+type+'_'+id).remove();
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

	$("#add-foreclosure-attorney-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			businessname:{required:true},
			first_name:{required:true},
			last_name:{required:true},
			address1:{required:true},
			city:{required:true},
			state:{required:true},
            bar_licence_num:{required:true},
            check:{required:true},
			zipcode:{required:true,validate_zip_code:true,number: true,maxlength: 5,minlength:5},
            phone:{required:true,phonecheck:true,check_phone_exist:true},
			fax:{required:true,phonecheck:true},
			email:{required:true,email: true,check_email_exist:true},
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
            ein:{required:true},
            amount_of_coverage:{required:true,min:function (element) {
                var eo_amount = $("#amount_of_coverage").val();
                if(eo_amount !=''){
                    eo_amount =  parseFloat(eo_amount.replace(/,/g,'').replace('$','')).toFixed(2);
                }
                //alert(eo_amount); 
                if(eo_amount >= 1000000){
                }else{
                    return false;
                }
            }},
            error_licence_valid:{required:true,
               },
		},
		messages: {
			businessname:{required:"Foreclosure Law Firm Name is required"},
			first_name:{required:"First Name is required"},
			last_name:{required:"Last Name is required"},
			address1:{required:"Address is required"},
			city:{required:"City is required"},
			state:{required:"State is required"},
            fax:{required:"Fax is required",
                phonecheck:"Fax is invalid."},
			zipcode:{required:"Zip Code is required",
                    validate_zip_code: "Please enter a valid Zip Code.",
                    number: "Zip Code should contains numbers Only.,",
                    minlength:"Zip Code should be in 5 digits."},
			phone:{required:"Phone Number is required",
              		phonecheck:"Phone number is invalid.",
              		check_phone_exist:"This Phone already exists please use another one."},
			email:{required:"Email is required",
					email:"Please enter a valid email address.",
              		check_email_exist:"This email already exists please use another one."},
			channel: {required:"Please select Channel"},
			channel_publication:{channel_check:"Please select Channel Publication"},
			ein:{required:"EIN is required"},
            amount_of_coverage:{required:"Amount of Coverage on the E&O Policy is required",min:"Amount must be greater than or equal to $1,000,000.00"},
            error_licence_valid:{required:"E&O Expiration Date is required"
            }

		},
		errorPlacement: function(error, element) {

            if (element.attr("name") == "license_valid_until[]" ||(element.attr("name") == "error_licence_valid"))
                element.parent().parent('.form-group').append(error);
            else if(element.is('select'))
                error.insertAfter(element.parent());
            else
				error.insertAfter(element);
            
		}
	});

	$.validator.addMethod("check_email_exist",function(value,element) {
		var userid = $('#foreclosure_attorney_id').val();
  		var email_check = $('#email_check').val();

        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;

        
        if( (userid=="") || (value != email_check) ){

            // Either on insertion or on updating by changing the current email

	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url + 'backend/foreclosure_attorney/check_email_exist',
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

    $.validator.addMethod("check_phone_exist",function(value,element) {
    	var userid = $('#foreclosure_attorney_id').val();
    	var phone_check = $('#phone_check').val();
        var postData ={phone:value.replace(/\D/g, '')};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || (value != phone_check)) {
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url+ 'backend/foreclosure_attorney/check_phone_exist',
	            data: postData , 
	            success: function(msg){ 
	                result = (msg == "1") ? false : true;
	            }
	        });
	        return result;
        }
        else
        {
            console.log('bottom');
            return true;
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

	// save foreclosure attorney
	$(document).on('click','#save_foreclosure_attorney',function(e){
		e.preventDefault();

        var loctn = [];
        $('input[name="area_check[]"]:checked').each(function(){
            id = $(this).val();
            loctn.push(id);

        }); 
       
        if(loctn.length == 0){
            $('#geo').show();
            $('#geo').html('Geographic Areas is required');
        }
        
		var foreclosure_attorney_form_valid = $("#add-foreclosure-attorney-form").valid();
		if(foreclosure_attorney_form_valid == true && loctn.length!=0){

			var form = $('#add-foreclosure-attorney-form')[0];
            var data = new FormData(form);
            var appl_type = $(this).attr('data-type');
            $.ajax({
                url:base_url + "backend/foreclosure_attorney/add",
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
                    	   window.location.href = base_url+'backend/foreclosure_attorney';
                        else
                            window.location.href = base_url+'backend/foreclosure_attorney/edit_foreclosure_attorney/'+response.fc_attorney_id;
                	}
                }
            });
            
		}
	});

    var fc_attorney_id = $('#fc_attorney_id').val();

    var data_property = {fc_attorney_id:fc_attorney_id};
    
    var url_chart_property   = base_url + 'backend/foreclosure_attorney/loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val();
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var foreclosure_attorney_id   = $('#foreclosure_attorney_id').val();
        data.foreclosure_attorney_id  = foreclosure_attorney_id;
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
                        events: {
                            load: function(event) {
                                var chart = this,
                                points = chart.series[0].points,
                                len = points.length,
                                total = 0,
                                i = 0;

                                console.log(chart.series[0].points);

                                for (; i < len; i++) {
                                    total += points[i].y;
                                }

                                console.log(total);

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


                                    console.log( seriesitem.name);
                                    console.log(this.y);

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
                        name: 'Browsers',
                            data: [{
                                name: 'Completed',
                                y: response.completed
                            }, {
                                name: 'In Progress',
                                y: response.inprogress
                            }, {
                                name: 'Dead/Denied',
                                y: ( response.total - (response.inprogress+response.completed))
                            }]
                    }]
                });
            });
        });
    }

    var data_location= {};
    var url_chart_location   = base_url + 'backend/foreclosure_attorney/loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        // console.log(data_location);
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var foreclosure_attorney_id = $('#foreclosure_attorney_id').val();
        data.foreclosure_attorney_id  = foreclosure_attorney_id;
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


                                console.log( seriesitem.name);
                                console.log(this.y);

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
                      floating: true,
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
                        y: response.inprogress
                      }, {
                                name: 'Dead/Denied',
                                y: ( response.total - (response.inprogress+response.completed))
                            }]
                    }]
                });
            });
        });
    }


    $("#amount_of_coverage").blur(function(e){
        if($(this).val()!=0)
         {
            $(this).val('$'+number_format($(this).val(), 2 ) );
        }else{
            $(this).val('');
            return false;
        }        
    });


	// propertyType
    

    $('body').on('click','.datepicker-show',function(){
        $(this).parent().find('.mydatepicker').datepicker('show');
    });

    // $(document).on('click','#foreclosure-attorney-deactivate',function(){
    //     //alert('c');
    //     var fc_attorney_id = $(this).attr('data-id');
    //     var type = $(this).attr('data-type');
    //     status_update({'status':type,'fc_attorney_id':fc_attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/foreclosure_attorney/change_status',"Do you really want to change status of this foreclosure attorney?","foreclosure attorney status updated successfully.","foreclosure attorney status is could not be updated",'foreclosure-attorney-table-list');
    
    // });
    $(document).on('click','.confirm',function(){
        window.location.reload();
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

    $('#license-details').find('.valid').each(function (q) {
        $(this).rules('add', {
            required: true,
            messages: {
                required: "This field is required"
            }
        });
    });

    $('body').on('changeDate','.mydatepicker',function(){
        
        if($(this).val().length)
            $(this).parent().parent().find('label.error').hide();
        
    });


        // Active - Inactive
    $("#foreclosure-inactive-form").validate({
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

    $(document).on('click','#foreclosure-attorney-deactivate',function(){
        $("#foreclosure-inactive-form")[0].reset();
        var form_valid = $("#foreclosure-inactive-form").validate();
            form_valid.resetForm();
        var fc_attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#fc_attorney_id').val(fc_attorney_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#foreclosure-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/foreclosure_attorney/change_status',$("#foreclosure-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    // window.location.reload();
                    swal("Updated!", "Foreclosure attorney status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Foreclosure attorney status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#foreclosure-attorney-activate',function(){
        //alert('c');
        var fc_attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'fc_attorney_id':fc_attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/foreclosure_attorney/change_status',"Do you really want to change status of this foreclosure attorney?","foreclosure attorney status updated successfully.","foreclosure attorney status is could not be updated",'foreclosure-attorney-table-list');
    });


    $("#foreclosure-block-form").validate({
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
        $("#foreclosure-block-form")[0].reset();
        var form_valid = $("#foreclosure-block-form").validate();
            form_valid.resetForm();
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#fc_attorney_id').val(broker_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#foreclosure-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/foreclosure_attorney/change_block_status',$("#foreclosure-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    $('#foreclosure-attorney-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Foreclosure Attorney Blocked Successfully", "success");
                    $('#blocked').find('span').html(response.blocked_count);
                                         
                }else{
                     swal("Cancelled", "Foreclosure Attorney could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#unblock-user',function(){
        var fc_attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'fc_attorney_id':fc_attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/foreclosure_attorney/change_block_status',"Do you really want to unblock this Foreclosure Attorney?","Title Company  Unblocked Successfully.","Foreclosure Attorney could not be unblocked",'foreclosure-attorney-table-list');
    });


});
