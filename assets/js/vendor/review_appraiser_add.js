var base_url = $("#base-url-1").val();
$("#add-appraiser-form").validate({
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
			phone:{required:true,phonecheck:true
                // check_phone_exist:true
            },
			email:{required:true,email: true,
                check_email_exist:true
            },
            ein:{required:true, minlength:10},
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
            property_type:{required:true},
            price_range:{required:true},
            commercial_price_range:{required: function (element) {
                    var type = $("#property_type").val();  
                    if(type == 'A'){
                        var e = $("#commercial_price_range").val();
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
            turn_around_time:{required:true},
            appraiser_eo_amount:{required:true,min:function (element) {
                var eo_amount = $("#appraiser_eo_amount").val();
                if(eo_amount !=''){
                    eo_amount =  parseFloat(eo_amount.replace(/,/g,'').replace('$','')).toFixed(2);
                }
                //alert(eo_amount); 
                if(eo_amount >= 1000000){
                }else{
                    return false;
                }
            }},
            appraiser_eo_date:{required:true},
		},
		messages: {
			businessname:{required:"Appraiser‘s Business Name is required"},
			firstname:{required:"First Name is required"},
			lastName:{required:"Last Name is required"},
			address:{required:"Address is required"},
			city:{required:"City is required"},
			state:{required:"State is required"},
			zipcode:{required:"Zip Code is required",
              		validate_zip_code: "Please enter a valid Zip Code.",
              		number: "Zip Code should contains numbers Only.",
                    minlength:"Zip Code should be 5 digits."},
			phone:{required:"Phone Number is required",
              		phonecheck:"Phone number is invalid."
              		// check_phone_exist:"This Phone already exists please use another one."
                },
			email:{required:"Email is required",
					email:"Please enter a valid email address.",
              		check_email_exist:"This email already exists please use another one."
                },
            ein:{required:"EIN is required",
                    minlength:"EIN is invalid"
                },
            channel: {required:"Please select Channel"},
            channel_publication:{channel_check:"Please select Channel Publication"},
            channel_publication_text:{required:"Source is required"},
            property_type:{required:"Property Type is required"},
            price_range:{required:"Price range is required"},
            commercial_price_range:{required:"Price range is required"},
			turn_around_time:{required:"Turnaround Time is required"},
            appraiser_eo_amount:{required:"Amount of Coverage on the E&O Policy is required",min:"Amount must be greater than or equal to $1,000,000.00"},
            appraiser_eo_date:{required:"E&O Expiration Date is required"}

		},
		errorPlacement: function(error, element) {
            if(element.is('select')){
                error.insertAfter(element.parent());
            }else if((element.attr("name") == 'appraiser_eo_date')){
                error.insertAfter(element.parent());
            }
            else{
				error.insertAfter(element);
            }
		}
});
    $.validator.addMethod("check_email_exist",function(value,element) {
		var userid = $('#appraiser_id').val();
  		var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!==email_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url + 'backend/review_appraiser/check_email_exist',
	            data: postData , 
	            success: function(msg){ 
	                result = (msg.trim() == "1") ? false : true;
	            }
	        });
        }else{
            result = true;
        }
        return result;
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
    	var userid = $('#appraiser_id').val();
    	var phone_check = $('#phone_check').val();
        var postData ={phone:value.replace(/\D/g, '')};
        postData[global_csrf_token_name]= global_csrf_token_value;

        if(userid=="" || value.replace(/\D/g, '')!==phone_check){
	        $.ajax({
	            type: "POST",
	            async:false,
	            url: base_url+ 'backend/review_appraiser/check_phone_exist',
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

    // save review appraiser
	$(document).on('click','#save_appraiser',function(e){ 
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
        var appl_type = $(this).attr('data-type');
        
		var appraiser_form_valid = $("#add-appraiser-form").valid();

		if(appraiser_form_valid == true && loctn.length != 0){ 

            $(this).prop('disabled',true);
            
			var form = $('#add-appraiser-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/review_appraiser/add",
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
                    	   window.location.href = base_url+'backend/review_appraiser';
                        else 
                            window.location.href = base_url+'backend/review_appraiser/edit_appraiser/'+response.appraiser_id;
                	}
                }
            });
		}
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
	jQuery('.mydatepicker,#datepicker').datepicker({
        autoclose: true,
        todayHighlight: true
    });
    $('.icon-calender').click(function() {
        $(this).closest('div').prev().focus();
    });

     $('#eo_chk').on('ifChanged', function(event){
	   	var is_eo= $(this).is(':checked');
	   	if(is_eo==true){
	   		$("#appraiser_eo_date").attr('disabled','disabled');
           	$("#appraiser_eo_amount").attr('disabled','disabled');
	   	}else{
	   		$("#appraiser_eo_date").removeAttr('disabled');
          	$("#appraiser_eo_amount").removeAttr('disabled');
	   	}
	});

    $('#licence_chk').on('ifChanged', function(event){
	   	var islicence= $(this).is(':checked');
	   	if(islicence==true){
	   		$("#appraiser_license_date").attr('disabled','disabled');
	   	}else{
	   		$("#appraiser_license_date").removeAttr('disabled');
	   	}
	});

    $('#price_range,#appraiser_eo_amount,#commercial_price_range').on('change',function(){
        var contribution = parseFloat($(this).val().replace(/[^0-9-.]/g, ''));
        if(isNaN(contribution)) {
          $(this).val('');
        }else{
          var amt ='$'+contribution.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
          $(this).val(amt);
        }
    });

    $(".channelpublication").hide();
    $(".channelpublicationtext").hide();
	var user_channel = $("#channel").val();

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

  	$('body').on('change', '#property_type', function(){
        var type = $(this).val(); 
        $('.commercial').hide();
        $('#price_range').val('');
        if(type == 'R'){ 
           // $(this).closest('.col-sm-6').next().find('label ').html('Price(Residential)<span class="text-danger">*</span>');
            $(this).closest('.col-sm-6').next().find('label:first-child').html('Price(Residential)<span class="text-danger">*</span>');

        }else if(type == 'C'){ 
            $(this).closest('.col-sm-6').next().find('label:first-child').html('Price(Commercial)<span class="text-danger">*</span>')
        }else
        if(type == 'A'){ 
            $('#commercial_price_range').val('');
            $(this).closest('.col-sm-6').next().find('label:first-child').html('Price(Residential)<span class="text-danger">*</span>');
            $('.commercial').show();
            $('.commercial').find('label:first-child').html('Price(Commercial)<span class="text-danger">*</span>');
        }
        //data_property.type  = type;
        //get_loan_chart_property(data_property, url_chart_property);
    }); 

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

    $('body').on('click', '.delete-doc', function(){  
        var type = $(this).attr('alt');
        var id   = $(this).attr('id');
        var post_data = {id:id,type:type};
        post_data[global_csrf_token_name]= global_csrf_token_value;
          
        var project_confirm = confirm('Are you sure you want to delete this document?');
        if(project_confirm==true){
            $.ajax({
                type: 'POST',
                data: post_data,
                url:  base_url + 'backend/review_appraiser/appraiser_delete_doc',
                dataType: "html",
                success: function (response) {
                    $('#'+type+'_'+id).remove();
                }
            });
        } else {
            return false;
        }
    });
    $('body').on('click', '.delete-ea', function(){  
       
        var id   = $(this).attr('data-id');
        var post_data = {id:id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
          
        var project_confirm = confirm('Are you sure you want to delete this document?');
        if(project_confirm==true){
            $.ajax({
                type: 'POST',
                data: post_data,
                url:  base_url + 'backend/review_appraiser/appraiser_delete_ea',
                dataType: "html",
                success: function (response) {
                    $('#doc_'+id).remove();
                }
            });
        } else {
            return false;
        }
    });

    $(document).on('click','#cancel_appraiser',function(e){
        window.location.href = base_url+'backend/review_appraiser';
    });

    $(document).on('click','#app-activate',function(){
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'appraiser_id':appr_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/review_appraiser/change_status',"Do you really want to change status of this review appraiser?","Review Appraiser status updated successfully.","Review Appraiser status is could not be updated",'appraiser-table-list');
    });

    $(document).on('click','#block-user',function(){
        $("#appraiser-block-form")[0].reset();
        var form_valid = $("#appraiser-block-form").validate();
            form_valid.resetForm();
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#appraiser_id').val(appr_id);
    });

    $(document).on('click','#app-deactivate',function(){
        $("#appraiser-inactive-form")[0].reset();
        var form_valid = $("#appraiser-inactive-form").validate();
            form_valid.resetForm();
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#appraiser_id').val(appr_id);
    });
     $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#appraiser-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/review_appraiser/change_status',$("#appraiser-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#appraiser-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Review Appraiser status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Review Appraiser status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#appraiser-block-form").valid();
        if(block_form_valid == true){
            $.post(base_url+'backend/review_appraiser/change_block_status',$("#appraiser-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    //$('#appraiser-table-list').DataTable().ajax.reload();
                    // window.location.reload();
                    swal("Updated!", "Review Appraiser  Blocked Successfully", "success");
                }else{
                     swal("Cancelled", "Review Appraiser  could not be blocked ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#unblock-user',function(){
        var appr_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'appraiser_id':appr_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/review_appraiser/change_block_status',"Do you really want to unblock this review appraiser?","Review Appraiser  Unblocked Successfully.","Review Appraiser could not be unblocked",'appraiser-table-list');
    
    });

    var data_property = {};
    var url_chart_property   = base_url + 'backend/review_appraiser/loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val(); 
        $('.commercial').hide();
        $('#price_range').val('');
        if(type == 'R'){ 
           // $(this).closest('.col-sm-6').next().find('label ').html('Price(Residential)<span class="text-danger">*</span>');
            $(this).closest('.col-sm-6').next().find('label:first-child').html('Price(Residential)<span class="text-danger">*</span>');

        }else if(type == 'C'){ 
            $(this).closest('.col-sm-6').next().find('label:first-child').html('Price(Commercial)<span class="text-danger">*</span>')
        }else
        if(type == 'A'){ 
            $('#commercial_price_range').val('');
            $(this).closest('.col-sm-6').next().find('label:first-child').html('Price(Residential)<span class="text-danger">*</span>');
            $('.commercial').show();
            $('.commercial').find('label:first-child').html('Price(Commercial)<span class="text-danger">*</span>');
        }
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var appraiser_id = $('#appraiser_id').val();
        data.appraiser_id  = appraiser_id;
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
    var url_chart_location   = base_url + 'backend/review_appraiser/loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        // console.log(data_location);
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var appraiser_id = $('#appraiser_id').val();
        data.appraiser_id  = appraiser_id;
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


    