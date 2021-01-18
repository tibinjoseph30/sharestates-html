var base_url = $("#base-url-1").val();
$(document).ready(function(){


	function AllowNumbersOnly(e) {
	    var code = (e.which) ? e.which : e.keyCode;
	    if (code > 31 && (code < 48 || code > 57)) {
	        e.preventDefault();
	    }
	}

	// Date Picker
    jQuery('.mydatepicker, #datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
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

	$("#add_subuser_form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			firstname:{required:true},
			lastName:{required:true},
			address1:{required:true},
			city:{required:true},
			state:{required:true},
			zipcode:{required:true,validate_zip_code:true,number: true,maxlength: 5,minlength:5},
			phone:{required:true,phonecheck:true,
                // check_phone_exist:true
            },
			email:{required:true,
                email: true,
                check_email_exist:true
            },
		},
		messages: {
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

		},
		errorPlacement: function(error, element) {
				error.insertAfter(element);
		}
	});

	$.validator.addMethod("check_email_exist",function(value,element) {
        var userid = $('#settlement_agent_id').val();
        var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!==email_check){
            $.ajax({
                type: "POST",
                async:false,
                url: base_url + 'backend/settlementagent/check_email_exist',
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


    // $.validator.addMethod("check_phone_exist",function(value,element) {
    // 	var userid = $('#broker_id').val();
    // 	var phone_check = $('#phone_check').val();
    //     var postData ={phone:value.replace(/\D/g, '')};
    //     postData[global_csrf_token_name]= global_csrf_token_value;
    //     if(userid=="" || value.replace(/\D/g, '')!==phone_check){
	   //      $.ajax({
	   //          type: "POST",
	   //          async:false,
	   //          url: base_url+ 'backend/broker/check_phone_exist',
	   //          data: postData , 
	   //          success: function(msg){ 
	   //              result = (msg == "1") ? false : true;
	   //          }
	   //      });
	   //      return result;
    //     }
    // });

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

	// save broker
	$(document).on('click','#save_subuser',function(e){
		e.preventDefault();

		var form_valid = $("#add_subuser_form").valid();

		if(form_valid == true){
			var form = $('#add_subuser_form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/settlementagent/add_sub_user",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                	if(result.status = true){
                    	window.location.href = base_url+'backend/settlementagent';
                	}
                }
            });
		}
	});

    $(document).on('click','#cancel_subuser',function(e){
        window.location.href = base_url+'backend/settlementagent';
    });

    var data_property = {};
    var url_chart_property   = base_url + 'backend/settlementagent/loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val();
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var settlement_agent_id = $('#settlement_agent_id').val();
        data.settlement_agent_id  = settlement_agent_id;
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
                        x:20,
                        // labelFormatter: function() {
                        //     return '<span style="font-family:Verdana, Geneva, sans-serif; font-size:14px; font-weight: normal;color:'+this.color+';">' + this.name + ' </span> <span style="font-weight: bold; font-size:14px; color:'+this.color+';">' + this.y + ' <br/></span>';
                        // }
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
                            y: response.completed
                        }, {
                            name: 'In Progress:',
                            y: response.inProgress
                        },{
                            name: 'Dead/Denied:',
                            y: ( response.total - (response.inProgress+response.completed))
                        }]
                    }]
                });
            });
        });
    }



    var data_location= {};
    var url_chart_location   = base_url + 'backend/settlementagent/loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        // console.log(data_location);
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var settlement_agent_id = $('#settlement_agent_id').val();
        data.settlement_agent_id  = settlement_agent_id;
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
                            name: 'Completed:',
                            y: response.completed
                        }, {
                            name: 'In Progress:',
                            y: response.inProgress
                        },{
                            name: 'Dead/Denied:',
                            y: ( response.total - (response.inProgress+response.completed))
                        }]
                    }]
                });
            });
        });
    }

    

});
