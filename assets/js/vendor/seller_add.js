var base_url = $("#base-url-1").val();
$(document).ready(function(){
	//$("#ein").mask("99-9999999");
	
	// $(".channelpublication").hide();
	// var user_channel = $("#channel").val();
 //  	// var user_channel_value = $("#channel_value").val();

 //  	if(user_channel == "search_engine"){
 //     	$(".channelpublication").show();
 //  	} else {
 //     	$(".channelpublication").hide();
 //     	$("#channel_publication").val('');
 //  	}
	// $('body').on('change', '#channel', function(){
 //     	var channel = $(this).val();
 //     	if(channel=="search_engine"){
 //        	$(".channelpublication").show();
 //     	} else {
 //        	$(".channelpublication").hide();
 //        	$("#channel_publication").val('');                
 //     	}
 //  	});

    $('body').on('change', 'select', function(){
        val = $(this).val();
        if(val.length){
            // $(this).parent().children('label.error').hide();
            $(this).parent().parent().children('label.error').hide();
        }
    });

    $('#selectall').on('ifChanged',function() {
        if($(this).is(":checked")) {
            $("[name='area_check[]']").iCheck('check');
        } else {   
            $("[name='area_check[]']").iCheck('uncheck');
        }
    });

    $('#attorney_fax').on('blur',function(){
        var value = $(this).val();
        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
            $('#fax').hide();
        else
            $('#fax').show();
    })

	$("#save_loc").click(function(){
        $('#geo').hide();
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
		$('#appraiser_area_id').remove();
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
    jQuery('.mydatepicker,#datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
    });
    $('.icon-calender').click(function() {
        $(this).closest('div').prev().focus();
    });
    

    $('body').on('keydown', '.phone_format', function(e){   
        var key = e.charCode || e.keyCode || 0;
        $phone = $(this);
        if (key !== 8 && key !== 9) {
            if ($phone.val().length === 3) {
                $phone.val($phone.val() + '-');
            }
            if ($phone.val().length === 7) {
                $phone.val($phone.val() + '-');
            }     
        }
        return (key == 8 || 
            key == 9 ||
            key == 46 ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105)); 
    });

	$("#add-seller-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			businessname:{required:true},
			firstname:{required:true},
			lastName:{required:true},
			address:{required:true},
			city:{required:true},
			state:{required:true},
			zipcode:{required:true,validate_zip_code:true,number: true,maxlength: 5,minlength:5},
			phone:{required:true,phonecheck:true,minlength:10,
                // check_phone_exist:true
            },
			email:{required:true,email: true,
                check_email_exist:true
            },
            lenders_ein:{required:true,minlength:10},
            // attorney_fax:{required:true,phonecheck:true},
            // bar_licence_num:{required:true},
		},
		messages: {
			businessname:{required:"Seller's Business Name is required"},
			firstname:{required:"First Name is required"},
			lastName:{required:"Last Name is required"},
			address1:{required:"Address is required"},
			city:{required:"City is required"},
			state:{required:"State is required"},
			zipcode:{required:"Zip Code is required",
              		validate_zip_code: "Please enter a valid Zip Code.",
              		number: "Zip Code should contains numbers Only.",
                    minlength:"Zip Code number should be in 5 digits."},
			phone:{required:"Phone Number is required",
              		phonecheck:"Phone Number is invalid.",
              		// check_phone_exist:"This Phone already exists please use another one."
                },
			email:{required:"Email is required",
					email:"Please enter a valid email address.",
              		check_email_exist:"This email already exists please use another one."
                },
            lenders_ein:{required:"EIN is required",
                    minlength:"EIN is invalid"},
            // attorney_fax:{required:"Fax Number is required",
            //         phonecheck:"Fax number is invalid.",
            //     },
            // bar_licence_num:{required:"Bar License Number is required"},

		},
		errorPlacement: function(error, element) {
            if(element.is('select'))
                error.insertAfter(element.parent());
            else
				error.insertAfter(element);
		}
	});

	$.validator.addMethod("check_email_exist",function(value,element) {
		var userid = $('#lenders_attorney_id').val();
  		var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!==email_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url + 'backend/sellers_attorney/check_email_exist',
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
    	var userid = $('#appraiser_id').val();
    	var phone_check = $('#phone_check').val();
        var postData ={phone:value.replace(/\D/g, '')};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value.replace(/\D/g, '')!==phone_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url+ 'backend/appraiser/check_phone_exist',
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
        ein_hid = $('[name=ein]').val();
        if(ein_hid.match(/^\(?([0-9]{2})\)?[-. ]?([0-9]{7})$/))
            return true;
        else
            return false;
    });

    

	// save appraiser
	$(document).on('click','#save_seller',function(e){
		e.preventDefault(e);
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
		var seller_form_valid = $("#add-seller-form").valid();
		if(seller_form_valid == true && loctn.length != 0){ 

            $(this).prop('disabled',true);
            
			var form = $('#add-seller-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/sellers_attorney/add",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                dataType:'json',
                success:function(result){
                    if(result.status == true){
                    	window.location.href = base_url+'backend/sellers_attorney/edit_seller/'+result.id;
                	}
                }
            });
		}
	});
    
    $(document).on('click','#cancel_seller',function(e){
        window.location.href = base_url+'backend/sellers_attorney';
    });


    var data_property = {};
    var url_chart_property   = base_url + 'backend/sellers_attorney/loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val();
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var lenders_attorney_id = $('#lenders_attorney_id').val();
        data.lenders_attorney_id  = lenders_attorney_id;
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
    var url_chart_location   = base_url + 'backend/sellers_attorney/loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var lenders_attorney_id = $('#lenders_attorney_id').val();
        data.lenders_attorney_id  = lenders_attorney_id;
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

    


    $('body').on('change', 'select', function(){
        
        val = $(this).val();

        if(val.length)
        {
            $(this).parent().parent().children('label.error').hide();
        }
    });

    $("#seller-block-form").validate({
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
        $("#seller-block-form")[0].reset();
        var form_valid = $("#seller-block-form").validate();
            form_valid.resetForm();
        var seller_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#lenders_attorney_id').val(seller_id);
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#seller-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/sellers_attorney/change_block_status',$("#seller-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    // $('#seller-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Seller  Blocked Successfully", "success");
                    // window.location.reload();
                }else{
                     swal("Cancelled", "Seller  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#unblock-user',function(){
        var seller_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        console.log(base_url);
        status_update_refresh({'status':type,'lenders_attorney_id':seller_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/sellers_attorney/change_block_status',"Do you really want to unblock this seller attorney?","Seller attorney  Unblocked Successfully.","Seller attorney could not be unblocked",'seller-table-list');
        
    });

    //    $(document).on('click','#app-deactivate',function(){
    //     var seller_id = $(this).attr('data-id');
    //     var type = $(this).attr('data-type');
    //     status_update_refresh({'status':type,'seller_id':seller_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/sellers_attorney/change_status',"Do you really want to change status of this Seller Attorney?","Seller attorney status updated successfully.","Seller attorney status is could not be updated",'seller-table-list');
       
    // });

        // Active - Inactive
    $("#seller-inactive-form").validate({
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

    $(document).on('click','#app-deactivate',function(){
        $("#seller-inactive-form")[0].reset();
        var form_valid = $("#seller-inactive-form").validate();
            form_valid.resetForm();
        var seller_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#seller_id').val(seller_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#seller-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/sellers_attorney/change_status',$("#seller-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    // window.location.reload();
                    swal("Updated!", "Seller attorney status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Seller attorney status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#app-activate',function(){
        var seller_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'seller_id':seller_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/sellers_attorney/change_status',"Do you really want to change status of this Seller Attorney?","Seller attorney status updated successfully.","Seller attorney status is could not be updated",'seller-table-list');
    });

    $(document).on('click','.confirm',function(){
        window.location.reload();
    });


});
