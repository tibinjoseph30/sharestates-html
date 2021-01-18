var base_url = $("#base-url-1").val();

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
		$('#bank_attorney_area_id').remove();
		$('#areas_div').html(html);
		// if(loc.length==52){
		// 	$("#select_all_broker_area").prop('checked',true);
		// }else{
		// 	$("#select_all_title_area").prop('checked',false);
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

	$('body').on('click', '.delete_doc_bank_attorney', function(){  

        var id   = $(this).attr('id');
        var type = $(this).attr('alt');
        var project_confirm = confirm('Are you sure you want to delete this document?');
        var post_data = {id:id,type:type};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        if(project_confirm==true){
            $.ajax({
              	type: 'POST',
              	data: post_data,
              	url:  '<?php echo base_url(); ?>backend/bank_attorney/bank_attorney_delete_doc',
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

	$("#add-bank-attorney-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			first_name:{required:true},
			last_name:{required:true},
			phone:{required:true,phonecheck:true,check_phone_exist:true},
			email:{required:true,email: true,check_email_exist:true},
		    
		},
		messages: {
			first_name:{required:"First Name is required"},
			last_name:{required:"Last Name is required"},
			phone:{required:"Phone Number is required",
              		phonecheck:"Phone number is invalid.",
              		check_phone_exist:"This Phone already exists please use another one."},
			email:{required:"Email is required",
					email:"Please enter a valid email address.",
              		check_email_exist:"This email already exists please use another one."},
		},
		errorPlacement: function(error, element) {
            if(element.is('select'))
                error.insertAfter(element.parent());
            else
				error.insertAfter(element);
		}
	});

	$.validator.addMethod("check_email_exist",function(value,element) {
		
        var userid = $('#bank_attorney_id').val();
  		var email_check = $('#email_check').val();
        var postData = {email:value};

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

            console.log('top');
        	return result;
        }
        else
        {
            console.log('bottom');
            return true;
        }
        
    });


    $.validator.addMethod("phonecheck", function(value, element) {
        
        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
            return true;
        else
            return false;

    });


    $.validator.addMethod("check_phone_exist",function(value,element) {
    	var userid = $('#bank_attorney_id').val();
    	var phone_check = $('#phone_check').val();
        var postData ={phone:value.replace(/\D/g, '')};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value.replace(/\D/g, '')!==phone_check){
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

	// save bank attorney
	$(document).on('click','#save_bank_attorney',function(e){
		e.preventDefault();
        
		var bank_attorney_form_valid = $("#add-bank-attorney-form").valid();
		if(bank_attorney_form_valid == true){

			var form = $('#add-bank-attorney-form')[0];
            var data = new FormData(form);
            $.ajax({
                url: base_url + "backend/bank_attorney/add_sub_attorney",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    window.location.href = base_url+'backend/bank_attorney';
                	/*if(result.status = true){
                    	window.location.href = base_url+'backend/bank_attorney';
                	}*/
                }
            });
            
		}
	});

    var data_property = {};
    var url_chart_property   = base_url + 'backend/bank_attorney/loan_chart_property/1';
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
                        floating: true,
                        borderWidth: 0,
                        align: 'right',
                        layout: 'vertical',
                        verticalAlign: 'middle',
                        itemMarginBottom: 5,
                        useHTML: true,
                        x:20,
                        labelFormatter: function() {
                            return '<span style="font-family:Verdana, Geneva, sans-serif; font-size:14px; font-weight: normal;color:'+this.color+';">' + this.name + ' </span> <span style="font-weight: bold; font-size:14px; color:'+this.color+';">' + this.y + ' <br/></span>';
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        pie: {
                            shadow: false,
                        }
                    },
                    credits:false,
                    series: [{
                        name: 'Browsers',
                            data: [{
                                name: 'Completed:',
                                y: response.completed
                            }, {
                                name: 'In Progress:',
                                y: response.inprogress
                            }, {
                                name: 'Dead/Denied:',
                                y: ( response.total - (response.inprogress+response.completed))
                            }],
                        size: '60%',
                        innerSize: '90%',
                        showInLegend: true,
                        dataLabels: {
                            enabled: false
                        }
                    }]
                }, function(chart) { // on complete
                        var textX = chart.plotLeft + (chart.plotWidth * 0.5);
                        var textY = chart.plotTop + (chart.plotHeight * 0.5);

                        var span = '<span id="pieChartInfoText" style="position:absolute;left:53px;top:58px; text-align:center; display:table;">';
                        span += '<span style="font-size: 14px; display:table-cell; vertical-align:top; text-align:right;">Turnaround Time <br>(Days)</span>';
                        span += '<span style="font-size: 14px;display:table-cell; vertical-align:top; font-weight:bold;">10</span>';
                        span += '</span>';

                        // $("#legend").append(span);
                        // span = $('#pieChartInfoText');
                        // span.css('left', textX + (span.width() * -0.5));
                        // span.css('top', textY + (span.height() * -0.5));
                });
            });
        });
    }

    var data_location= {};
    var url_chart_location   = base_url + 'backend/bank_attorney/loan_chart_location/1';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        // console.log(data_location);
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
                    colors: ['#ffaf46', '#cdcdcd','#ff6666']
                });
                chart = new Highcharts.Chart({
                    chart: {
                      renderTo: 'locationType',
                      type: 'pie',
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
                      useHTML: true,
                      labelFormatter: function() {
                        return '<span style="font-family:Verdana, Geneva, sans-serif; font-size:14px; font-weight: normal;color:'+this.color+';">' + this.name + ' </span> <span style="font-weight: bold; font-size:14px; color:'+this.color+';">' + this.y + ' <br/></span>';
                      }
                    },
                    yAxis: {
                      title: {
                        text: ''
                      }
                    },
                    plotOptions: {
                      pie: {
                        shadow: false
                      }
                    },
                    credits:false,
                    series: [{
                      name: 'Browsers',
                      data: [{
                        name: 'Completed:',
                        y: response.completed
                      }, {
                        name: 'In Progress:',
                        y: response.inprogress
                      }, {
                            name: 'Dead/Denied:',
                            y: ( response.total - (response.inprogress+response.completed))
                        }],
                      size: '60%',
                      innerSize: '90%',
                      showInLegend: true,
                      dataLabels: {
                        enabled: false
                      }
                    }]
                }, function(chart) { // on complete
                    var textX = chart.plotLeft + (chart.plotWidth * 0.5);
                    var textY = chart.plotTop + (chart.plotHeight * 0.5);

                    /*var span = '<span id="pieChartInfoText" style="position:absolute; text-align:center; display:table;">';
                    span += '<span style="font-size: 14px; display:table-cell; vertical-align:top; text-align:right;">Turnaround Time <br>(Days)</span>';
                    span += '<span style="font-size: 14px;display:table-cell; vertical-align:top; font-weight:bold;">10</span>';
                    span += '</span>';
                    $(".highcharts-legend").append(span);*/
                });
            });
        });
    }





	// propertyType
   

    
    var data_sub = {};
    var url_chart_sub = base_url + 'backend/bank_attorney/loan_chart_sub';
    get_loan_chart_sub(data_sub, url_chart_sub);

    $('body').on('change', '#sub_bank_attorney', function(){
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
                    colors: ['#43bbf7', '#cdcdcd', '#ff6666']
                });
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'subuserType',
                        type: 'pie',
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
                        floating: true,
                        borderWidth: 0,
                        align: 'right',
                        layout: 'vertical',
                        verticalAlign: 'middle',
                        itemMarginBottom: 5,
                        x:20,
                        useHTML: true,
                        labelFormatter: function() {
                            return '<span style="font-family:Verdana, Geneva, sans-serif; font-size:14px; font-weight: normal;color:'+this.color+';">' + this.name + ' </span> <span style="font-weight: bold; font-size:14px; color:'+this.color+';">' + this.y + ' <br/></span>';
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        pie: {
                            shadow: false
                        }
                    },
                    credits:false,
                    series: [{
                        name: 'Browsers',
                        data: [{
                            name: 'Completed:',
                            y: response.completed
                        }, {
                            name: 'In Progress:',
                            y: response.inprogress
                        }, {
                            name: 'Dead/Denied:',
                            y: ( response.total - (response.inprogress+response.completed))
                        }],
                        size: '60%',
                        innerSize: '90%',
                        showInLegend: true,
                        dataLabels: {
                            enabled: false
                        }
                    }]
                }, function(chart) { // on complete
                    var textX = chart.plotLeft + (chart.plotWidth * 0.5);
                    var textY = chart.plotTop + (chart.plotHeight * 0.5);

                    // var span = '<span id="pieChartInfoText" style="position:absolute; text-align:center; display:table;">';
                    // span += '<span style="font-size: 14px; display:table-cell; vertical-align:top; text-align:right;">Turnaround Time <br>(Days)</span>';
                    // span += '<span style="font-size: 14px;display:table-cell; vertical-align:top; font-weight:bold;">10</span>';
                    // span += '</span>';
                    // $(".highcharts-legend").append(span);
                });
            });
        });
    }

     $('body').on('change', 'select', function(){
        
        val = $(this).val();

        if(val.length)
        {
            $(this).parent().children('label.error').hide();
        }
    });

    $('button[type=reset]').on('click',function(){
        
        window.location.href = base_url+'backend/bank_attorney';
        
    });



});
