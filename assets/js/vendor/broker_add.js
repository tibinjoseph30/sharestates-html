var base_url = $("#base-url-1").val();
$(document).ready(function(){
 
	$(".channelpublication").hide();
    $(".channelpublicationtext").hide();
	var user_channel = $("#channel").val();
  	// var user_channel_value = $("#channel_value").val();

  	if(user_channel == "search_engine"){
     	$(".channelpublication").show();
        $(".channelpublicationtext").hide();
        $("#channel_publication_text").val('');
  	} else if(user_channel==""){
        $(".channelpublication").hide();
        $(".channelpublicationtext").hide();
        $("#channel_publication").val('');
        $("#channel_publication_text").val('');
    } else {
     	$(".channelpublication").hide();
     	$("#channel_publication").val('');
        $(".channelpublicationtext").show();
  	}

	$('body').on('change', '#channel', function(){
        $("#channel_publication_text").val('');
     	var channel = $(this).val();
     	if(channel=="search_engine"){
        	$(".channelpublication").show();
            $(".channelpublicationtext").hide();
            $("#channel_publication_text").val('');
     	} else if(channel==""){
            $(".channelpublication").hide();
            $(".channelpublicationtext").hide();
            $("#channel_publication").val('');
            $("#channel_publication_text").val('');
        } else {
        	$(".channelpublication").hide();
        	$("#channel_publication").val('');
            $(".channelpublicationtext").show();            
     	}
  	});

    $('#selectall').on('ifChanged',function() {
        if($(this).is(":checked")) {
            $("[name='area_check[]']").iCheck('check');
        } else {   
            $("[name='area_check[]']").iCheck('uncheck');
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
		$('#broker_area_id').remove();
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

    $('body').on('change', 'select', function(){
        val = $(this).val();
        if(val.length){
            // $(this).parent().children('label.error').hide();
            $(this).parent().parent().children('label.error').hide();
        }
    });

    $("#ein").keyup(function(){
        var va = $(this).val();
        $("#ein").val(va);
    });

    $("#ein").blur(function(){
        var val1 = $("#ein").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = val1.replace(/./gi, "*"); 
        if(hidden.length > 10) hidden = hidden.substring(0,10);
        $(this).val(hidden);
        if(val1!=''){
          
        }
    });

	$('#ein').keypress(function () {
	    $("#ein").mask("99-9999999");
	});

	$("#ein").change(function(){
	    var va = $(this).val();
	    $("#ein_hid").val(va);
	});

	// $("#ein").blur(function(){
	//     var val1 = $("#ein_hid").val();
	//     var last = val1.slice(0,-4);
	//     var last2 = val1.slice(-4);
	//     hidden = val1.replace(/./gi, "*"); 
	//     if(hidden.length > 10) hidden = hidden.substring(0,10);
	//     $(this).val(hidden);
	//     if(val1!=''){
	      
	//     }
	// });

	// Date Picker
    jQuery('.mydatepicker, #datepicker').datepicker({
        autoclose: true,
        todayHighlight: true,
        format: "mm-dd-yyyy",
           startDate: "+1d",
           minViewMode: "days",
           maxViewMode: "years"
    });

    $('.icon-calender').click(function() {
        $(this).closest('div').prev().focus();
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

    $('#eo_amount').on('change',function(){
        var contribution = parseFloat($(this).val().replace(/[^0-9-.]/g, ''));
        if(isNaN(contribution)) {
          $(this).val('');
        }else{
          var amt ='$'+contribution.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          $(this).val(amt);
        }
    })

	$('body').on('click', '.delete_doc_broker', function(){  

        var id   = $(this).attr('id');
        var type = $(this).attr('alt');
        var project_confirm = confirm('Are you sure you want to delete this document?');
        var post_data = {id:id,type:type};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        if(project_confirm==true){
            $.ajax({
              	type: 'POST',
              	data: post_data,
              	url:  '<?php echo base_url(); ?>backend/broker/broker_delete_doc',
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

	$("#add-broker-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			businessname:{required:true},
			firstname:{required:true},
			lastName:{required:true},
			address1:{required:true},
			city:{required:true},
			state:{required:true},
			zipcode:{required:true,validate_zip_code:true,number: true,maxlength: 5,minlength:5},
			phone:{
                required:true,
                phonecheck:true
                // check_phone_exist:true
            },
			email:{
                required:true,
                email: true,
                check_email_exist:true,
                borrower_email_exist:true
            },
			channel:{required:true},
			channel_publication:{required: function (element) {
					var channel = $("#channel").val();	
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
            ein:{required:true,eincheck:true},
            eo_amount:{required:true,min:function (element) {
                var eo_amount = $("#eo_amount").val();
                if(eo_amount !=''){
                    eo_amount =  parseFloat(eo_amount.replace(/,/g,'').replace('$','')).toFixed(2);
                }
                //alert(eo_amount); 
                if(eo_amount >= 1000000){
                }else{
                    return false;
                }
            }},
            eo_date:{required:true,
               },

		},
		messages: {
			businessname:{required:"Broker‘s Business Name is required"},
			firstname:{required:"Broker‘s First Name is required"},
			lastName:{required:"Broker‘s Last Name is required"},
			address1:{required:"Address is required"},
			city:{required:"City is required"},
			state:{required:"State is required"},
			zipcode:{required:"Zip Code is required",
              		validate_zip_code: "Please enter a valid Zip Code.",
              		number: "Zip Code should contains numbers Only.,",
                    minlength:"Zip Code should be in 5 digits."},
			phone:{required:"Phone Number is required",
              		phonecheck:"Phone number is invalid."
              		// check_phone_exist:"This Phone already exists please use another one."
                },
			email:{required:"Email is required",
					email:"Please enter a valid email address.",
              		check_email_exist:"This email already exists please use another one.",
                    borrower_email_exist:"Broker and Borrower emails are same. Please use a different email"
                },
			channel: {required:"Please select Channel"},
            channel_publication:{channel_check:"Please select Channel Publication"},
			channel_publication_text:{required:"Source is required"},
			ein:{required:"EIN is required",
                    eincheck:"EIN is invalid"
                },
            eo_amount:{required:"Amount of Coverage on the E&O Policy is required",min:"Amount must be greater than or equal to $1,000,000.00"},
            eo_date:{required:"E&O Expiration Date is required",
            }

		},
        errorPlacement: function(error, element) {
            if(element.is('select') ||(element.attr("name") == 'eo_date'))
                error.insertAfter(element.parent());
            else
                error.insertAfter(element);
        }
	});

	$.validator.addMethod("check_email_exist",function(value,element) {
		var userid = $('#broker_id').val();
  		var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!=email_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url + 'backend/broker/check_email_exist',
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

    $.validator.addMethod("borrower_email_exist",function(value,element) {
        var userid = $('#broker_id').val();
        var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!=email_check){
            $.ajax({
                type: "POST",
                async:false,
                url: base_url + 'backend/broker/check_email_exist_borrower',
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
    	var userid = $('#broker_id').val();
    	var phone_check = $('#phone_check').val();
        var postData ={phone:value.replace(/\D/g, '')};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value.replace(/\D/g, '')!==phone_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url+ 'backend/broker/check_phone_exist',
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

    $.validator.addMethod("eincheck", function(value, element) {
        ein_hid = $('[name=ein_hid]').val();
        if(ein_hid.match(/^\(?([0-9]{2})\)?[-. ]?([0-9]{7})$/))
            return true;
        else
            return false;
    });

	// save broker
	$(document).on('click','#save_broker',function(e){ 
		e.preventDefault();
		var broker_form_valid = $("#add-broker-form").valid();
        
        var loctn = [];
        $('input[name="area_check[]"]:checked').each(function(){
            id = $(this).val();
            loctn.push(id);

        }); 
        // alert(loctn.length);
        if(loctn.length == 0){ 
            $("#geo").removeAttr("style").hide();
            $('#geo').show();
            $('#geo').html('Geographic Areas is required');


        }
        var appl_type = $(this).attr('data-type');

		if(broker_form_valid == true && loctn.length != 0){

			var form = $('#add-broker-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/broker/add",
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
                    	   window.location.href = base_url+'backend/broker';
                        else 
                           window.location.href = base_url+'backend/broker/edit_broker/'+response.broker_id; 
                	}
                }
            });
		}
	});

    $(document).on('click','#cancel_broker',function(e){
        window.location.href = base_url+'backend/broker';
    });

    var data_property = {};
    var url_chart_property   = base_url + 'backend/broker/broker_loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val();
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var broker_id = $('#broker_id').val();
        data.broker_id  = broker_id;
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
                            }, {
                                name: 'Dead/Denied',
                                y: ( response.total - (response.inProgress+response.completed))
                            }]
                    }]
                });
            });
        });
    }

    var data_location= {};
    var url_chart_location   = base_url + 'backend/broker/broker_loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        // console.log(data_location);
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var broker_id = $('#broker_id').val();
        data.broker_id  = broker_id;
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


                                    // console.log( seriesitem.name);
                                    // console.log(this.y);

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
    var url_chart_sub = base_url + 'backend/broker/broker_loan_chart_sub';
    get_loan_chart_sub(data_sub, url_chart_sub);

    $('body').on('change', '#sub_broker', function(){
        var sub_id = $(this).val();
        data_sub.sub_id  = sub_id;
        get_loan_chart_sub(data_sub, url_chart_sub);
    });

    function get_loan_chart_sub(data, url){
        var broker_id = $('#broker_id').val();
        data.broker_id  = broker_id;
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
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


                                    // console.log( seriesitem.name);
                                    // console.log(this.y);

                                html += '<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + seriesitem.y + '</span></div></div>';


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

    $(".client_library").click(function(){
        var broker_id = $(this).attr('data-id');
        var post_data = {broker_id : broker_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/broker/ajax_client_library_table_list',
            data: post_data,
            dataType: "json",
            success: function (response) {
                if(response.client_library){
                    $('#client_library').html(response.client_library);

                    var client_table =$('#client-library-table-list').DataTable({
                        "bInfo" : false,
                        "lengthChange": false,
                        "aoColumnDefs" : [ {
                            'bSortable' : false,
                            'aTargets' : [0]
                            } ,
                            // { "targets": [0],"orderable": false,  "visible": false},
                        ]
                    });
                    $('#client-library-table-list_filter').hide();
                    $('input#searchKey').on( 'keyup click', function () {
                        filterGlobal();
                    } );
                    if(response.count_client_library <= 10){
                        $('#client-library-table-list_paginate').hide();
                    }
                }
            }
        });
    });

    oTable = $('#client-library-table-list').dataTable();

    function filterGlobal() {
        $("#client-library-table-list").DataTable().search(
            $('#searchKey').val()
        ).draw();
    }

    $('#search-reset').click(function(){
        // oTable.fnFilter('');
        oTable.fnFilter('');
        $('#searchKey').val('');
    });

    $(".broker_portfolio a").click(function(){
        var broker_id = $('.broker_portfolio').attr('data-id');
        window.location.href = base_url+'backend/sub_broker/broker_portfolio/'+broker_id;
    });

    $(".funding_source a").click(function(){
        var broker_id = $('.funding_source').attr('data-id');
        var post_data = {broker_id : broker_id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'backend/broker/ajax_funding_source_table_list',
            data: post_data,
            dataType: "json",
            success: function (response) {
                if(response.funding_source){
                    $('#funding_source').html(response.funding_source);

                    var client_table =$('#funding-source-table-list').DataTable({
                        "bInfo" : false,
                        "lengthChange": false,
                        "aoColumnDefs" : [ {
                            'bSortable' : false,
                            'aTargets' : [0]
                            } ,
                            // { "targets": [0],"orderable": false,  "visible": false},
                        ]
                    });
                    $('#funding-source-table-list_filter').hide();
                    $('input#searchKey_funding').on( 'keyup click', function () {
                        filterGlobal1();
                    } );
                    if(response.count_funding_source <= 10){
                        $('#funding-source-table-list_paginate').hide();
                    }
                }
            }
        });
    });



    function filterGlobal1() {
        $("#funding-source-table-list").DataTable().search(
            $('#searchKey_funding').val()
        ).draw();
    }

    if($(location).attr('href').split('/').reverse()[0] == 'funding'){
        $(".funding_source a").trigger("click");
    }
   

     $(document).on('click','.broker_funding-delete',function(){
        var bank_id = $(this).attr('data-id');
        // alert(bank_id);
        delete_table_row(bank_id,base_url+'backend/broker/funding_delete',"Do you really want to delete this funding source ?","Funding source details deleted successfully","Funding source is could not be deleted",'');
    
    });

    // $(document).on('click','#broker-deactivate',function(){
    //     var broker_id = $(this).attr('data-id');
    //     var type = $(this).attr('data-type');
    //     status_update_refresh({'status':type,'broker_id':broker_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/broker/change_status',"Do you really want to change status of this broker?","Broker status updated successfully.","Broker status is could not be updated",'broker-table-list');
    
    // });

    // Active - Inactive
    $("#broker-inactive-form").validate({
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

    $(document).on('click','#broker-deactivate',function(){
        $("#broker-inactive-form")[0].reset();
        var form_valid = $("#broker-inactive-form").validate();
            form_valid.resetForm();
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#broker_id').val(broker_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#broker-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/broker/change_status',$("#broker-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    // window.location.reload();
                    swal("Updated!", "Broker status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Broker status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#broker-activate',function(){
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'broker_id':broker_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/broker/change_status',"Do you really want to change status of this broker?","Broker status updated successfully.","Broker status is could not be updated",'broker-table-list');
    });


    $(document).on('click','#block-user',function(){
        $("#broker-block-form")[0].reset();
        var form_valid = $("#broker-block-form").validate();
            form_valid.resetForm();
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#broker_id').val(broker_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#broker-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/broker/change_block_status',$("#broker-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    // window.location.reload();
                    swal("Updated!", "Broker  Blocked Successfully", "success");
                }else{
                     swal("Cancelled", "Broker  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#unblock-user',function(){
        var broker_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'broker_id':broker_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/broker/change_block_status',"Do you really want to unblock this broker?","Broker  Unblocked Successfully.","Broker could not be unblocked",'broker-table-list');
    
    });
    $("#broker-block-form").validate({
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
    $(document).on('click','.confirm',function(){
        window.location.reload();
    });



});
