var base_url = $("#base-url-1").val();
$(document).ready(function(){
	//alert('dd');
	$("#add-buyer-attorney-form").validate({
		onkeyup: false,
		ignore : false,
		rules: {
			lenders_business_name:{required:true},
			lenders_first_name:{required:true},
			lenders_last_name:{required:true},
			lenders_address:{required:true},
			lenders_city:{required:true},
			lenders_state:{required:true},
			lenders_zipcode:{required:true,minlength:5},
			lenders_phone:{required:true,user_phone_check:true,minlength:12
                // check_phone_exist:true
            },
			lenders_email:{required:true,email:true,remote:
                   {
                      //url: "<?php echo base_url().'New_settings1/check_user_email'; ?>",
                      url:base_url+'backend/buyer_attorney/check_email_edit_exist',
                      type: "post",
                      data:{'lenders_attorney_id':$("#lenders_attorney_id").val(),'csrf_test_name':global_csrf_token_value}
                   }},
            lenders_additional_email:{email:true},
            lenders_fax:{minlength:12},
            lenders_ein_dummy:{minlength:10},
            geoarea:{required:true},
            //lenders_ein:{ein_format:true},
		},
		messages: {
			lenders_business_name:{required:"Buyer Law Firm Name is required"},
			lenders_first_name:{required:"First Name is required"},
			lenders_last_name:{required:"Last Name is required"},
			lenders_address:{required:"Address is required"},
			lenders_city:{required:"City is required"},
			lenders_state:{required:"State is required"},
			lenders_zipcode:{required:"Zip Code is required",minlength:"Please enter at least 5 digits"},
			lenders_phone:{required:"Phone Number is required",
              		user_phone_check:"Phone number is invalid.",
                    minlength:"Not a valid 10-digit phone number"
                },
			lenders_email:{required:"Email is required",remote:"Email address is already exist!"},
            lenders_fax:{minlength:"Not a valid 10-digit Fax number"
                },
            lenders_ein_dummy:{minlength:"EIN is invalid"},
            geoarea:{required:"Geographic Areas Covered is required"},
			//lenders_ein:{ein_format:"EIN is invalid"},

		},
		errorPlacement: function(error, element) {
				if(element.attr("name") == 'lenders_state'){
					error.insertAfter(element.parent("div").parent("div"));
				}else if(element.attr("name") == 'geoarea'){
                    //alert('dd');
                    error.insertAfter(element.parent("div"));   
                }else{
					error.insertAfter(element);	
				}
				
		}
	});

	//
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
			$("#geoarea").val('0');
            $.each(loc, function(i,element){
                html +='<li>'+element+'</li>';
            });
			html +='</ul>';
		}else{
            $("#geoarea").val('');
        }
		$('#areas_div').html(html);
        $('#areas_div').parent('div').find('#geoarea-error').remove();
	});

	$("#lenders_ein_dummy").keyup(function(){
	    var va = $(this).val();
	    $("#lenders_ein").val(va);
	});

	$("#lenders_ein_dummy").blur(function(){
	    var val1 = $("#lenders_ein").val();
	    var last = val1.slice(0,-4);
	    var last2 = val1.slice(-4);
	    hidden = val1.replace(/./gi, "*"); 
	    if(hidden.length > 10) hidden = hidden.substring(0,10);
	    $(this).val(hidden);
	    if(val1!=''){
	      
	    }
	});

    $(document).on('change', '#lenders_state', function(){
        
        val = $(this).val();

        if(val.length)
        {
            $(this).parent().parent().parent().children('label.error').hide();
        }
    });

	$(document).on('click','#update-buyer-attorney',function(e){
		//e.preventDefault(e);

		var appraiser_form_valid = $("#add-buyer-attorney-form").valid();
        var children = $("#add-buyer-attorney-form").find('input[readonly]');
        children.prop('readonly', false);

		if(appraiser_form_valid == true){

			$.post(base_url+'backend/buyer_attorney/edit_buyer_attorney',$("#add-buyer-attorney-form").serialize(),function(response){
				var response = $.parseJSON(response);
    			if(response.status == true){
    				//alert(response.lenders_attorney_id);
    				//swal("Updated!", 'Buyer Attorney Updated Succesfully', "success");
    				//window.location.reload()
    				window.location.href = base_url+'backend/buyer_attorney/edit_buyer_attorney/'+response.lenders_attorney_id;
    			}

			});           
		}else{
            return false;
        }
        children.prop('readonly', true);
	});

    $('#selectall').on('ifChanged',function() {
        if($(this).is(":checked")) {
            $("[name='area_check[]']").iCheck('check');
        } else {   
            $("[name='area_check[]']").iCheck('uncheck');
        }
    });

    $(document).on('click','#cancel-buyer',function(e){
        window.location.href = base_url+'backend/buyer_attorney';
    });

	var data_property = {};
    var url_chart_property   = base_url + 'backend/buyer_attorney/loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val();
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var appraiser_id = $('#lenders_attorney_id').val();
        data.appraiser_id  = appraiser_id;
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
                    colors: ['#43d570','#cdcdcd','#ff6666']
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
                                name: 'Completed: ',
                                y: response.completed
                            }, {
                                name: 'In Progress: ',
                                y: response.inProgress
                            },{
                            name: 'Dead/Denied: ',
                            y: ( response.total - (response.inProgress+response.completed))
                        }]
                    }]
                });
            });
        });
    }



    var data_location= {};
    var url_chart_location   = base_url + 'backend/buyer_attorney/loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        // console.log(data_location);
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var appraiser_id = $('#lenders_attorney_id').val();
        data.appraiser_id  = appraiser_id;
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
                    //colors: ['#ffaf46', '#cdcdcd','#ff6666']
                    colors: ['#43d570','#cdcdcd','#ff6666']
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
                            name: 'Completed: ',
                            y: response.completed
                        }, {
                            name: 'In Progress: ',
                            y: response.inProgress
                        },{
                            name: 'Dead/Denied: ',
                            y: ( response.total - (response.inProgress+response.completed))
                        }]
                    }]
                });
            });
        });
    }

    // $(document).on('click','#att-deactivate',function(){
    //     var attorney_id = $(this).attr('data-id');
    //     var type = $(this).attr('data-type');
    //     status_update_refresh({'status':type,'lenders_attorney_id':attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/buyer_attorney/change_status',"Do you really want to change status of this buyer attorney?","Buyer attorney status updated successfully.","Buyer attorney status is could not be updated",'buyer-attorney-table-list');
    
    // });

    // Active - Inactive
    $("#buyer-inactive-form").validate({
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

    $(document).on('click','#att-deactivate',function(){
        $("#buyer-inactive-form")[0].reset();
        var form_valid = $("#buyer-inactive-form").validate();
            form_valid.resetForm();
        var lenders_attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#lenders_attorney_id').val(lenders_attorney_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#buyer-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'backend/buyer_attorney/change_status',$("#buyer-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    // window.location.reload();
                    swal("Updated!", "Buyer attorney status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Buyer attorney status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','#att-activate',function(){
        var attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'lenders_attorney_id':attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/buyer_attorney/change_status',"Do you really want to change status of this buyer attorney?","Buyer attorney status updated successfully.","Buyer attorney status is could not be updated",'buyer-attorney-table-list');
    });


    $("#buyer-attorney-block-form").validate({
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
        $("#buyer-attorney-block-form")[0].reset();
        var form_valid = $("#buyer-attorney-block-form").validate();
            form_valid.resetForm();
        var attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".block-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".block-user-modal").modal('show');
        $(".block-user-modal").find('#type').val(type);
        $(".block-user-modal").find('#lenders_attorney_id').val(attorney_id);


    });
    $(document).on('click','#blk-user-subt',function(){
        var block_form_valid = $("#buyer-attorney-block-form").valid();

        if(block_form_valid == true){

            $.post(base_url+'backend/buyer_attorney/change_block_status',$("#buyer-attorney-block-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".block-user-modal").modal('hide');
                    // window.location.reload();
                    swal("Updated!", "Buyer Attorney  Blocked Successfully", "success");

                }else{
                     swal("Cancelled", "Buyer Attorney  could not be blocked ", "error");
                }
            });

        }else{

        }
       


    });

    $(document).on('click','#unblock-user',function(){
        var attorney_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update_refresh({'status':type,'lenders_attorney_id':attorney_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/buyer_attorney/change_block_status',"Do you really want to unblock this buyer attorney?","Buyer Attorney  Unblocked Successfully.","Buyer attorney could not be unblocked",'buyer-attorney-table-list');
    
    });

    $(document).on('click','.confirm',function(){
        window.location.reload();
    });
    

});