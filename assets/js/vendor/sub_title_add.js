var base_url = $("#base-url-1").val();
$(document).ready(function(){
	//$("#ein").mask("99-9999999");
	/*$("#save_loc").click(function(){
        var loc = [];
        $('input[name="area_check[]"]:checked').each(function(){
            $(this).val();
            loc.push($(this).closest('.st').find('.states').text());
        });
        loc.sort();
        var html ='';
        html +='<ul id="">';
        if(loc.length>0){
            loc.forEach(element => {
                 html +='<li>'+element+'</li>';
            });
            html +='</ul>';
        }
        $('#title_area_id').remove();
        $('#areas_div').html(html);
        // if(loc.length==52){
        //  $("#select_all_broker_area").prop('checked',true);
        // }else{
        //  $("#select_all_title_area").prop('checked',false);
        //  }
    });*/
    $("#save_loc").click(function(){

        var loc = [];
        var loc_name_and_id = [];
        $('input[name="area_check[]"]:checked').each(function(){
            
            id = $(this).val();
            state_name = $(this).closest('.st').find('.states').text();

            loc.push($(this).closest('.st').find('.states').text());

            loc_name_and_id[id] = state_name;

        });
        loc.sort();
        
        


        //$('#foreclosure_attorney_area_id').remove();
        

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
                
                //license_details_copy.find("[name='poc_fname[]']").attr("id","poc_fname_"+i);

                license_details_copy.find('input:not([type=checkbox])').val('');
                license_details_copy.find('.upload-list').html('');
                

                
                license_details_copy.find('.geographical-area-name').text(element);
                license_details_copy.attr('data-geographical-area-name', element);

                
                //html = license_details_copy.html();
                //console.log(html);
                //$('#license-details').append("<div class='row'>"+ html +"</div>");
                
                
                location_id = loc_name_and_id.indexOf(element);
                license_details_copy.find("[name='location_id[]']").val(location_id);

                license_details_copy.find('.main_poc').attr('name',"main_poc["+location_id+"]");
                license_details_copy.find('.settlement').attr('name',"settlement["+location_id+"]");
                license_details_copy.find('.title_insurance').attr('name',"title_insurance["+location_id+"]");

                license_details_copy.find('input[name="poc_fname[]"]').attr('id',"poc_fname_["+location_id+"]");
                license_details_copy.find('input[name="poc_lname[]"]').attr('id',"poc_lname_["+location_id+"]");
                license_details_copy.find('input[name="poc_phone[]"]').attr('id',"poc_phone_["+location_id+"]");
                license_details_copy.find('input[name="poc_email[]"]').attr('id',"poc_email_["+location_id+"]");
                license_details_copy.find('input[name="state_licence[]"]').attr('id',"state_licence_["+location_id+"]");
                license_details_copy.find('input[name="title_license_date[]"]').attr('id',"title_license_date_["+location_id+"]");

                
                license_details_copy.insertAfter("#license-details>.row:last");

                $('#areas_div>ul').append('<li  data-geographical-area-name="'+ element +'" >'+element+'</li>');
                
            }


            });

            jQuery('.mydatepicker, #datepicker').datepicker({
                autoclose: true,
                todayHighlight: true
            });
            $('.icon-calender').click(function() {
                $(this).closest('div').prev().focus();
            });
            
        }

        $('.first-row').remove();
        
        

        diff_areas = $(current_areas).not(new_areas).get();
        
        $.each(diff_areas,function(i, area_to_remove){
            $("[data-geographical-area-name='"+ area_to_remove +"']").remove();
        });
        
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

	$("#add-sub_title-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            firstname:{required:true},
            lastName:{required:true},
            // address1:{required:true},
            // city:{required:true},
            // state:{required:true},
            // zipcode:{required:true,validate_zip_code:true,number: true},
            phone:{required:true,
                phonecheck:true,
                // check_phone_exist:true
            },
            email:{required:true,
                email: true,
                 check_email_exist:true
            },
           // ein:{required:true},
            //fax:{required:true},
        },
        messages: {
            firstname:{required:"First Name is required"},
            lastName:{required:"Last Name is required"},
            // address1:{required:"Address is required"},
            // city:{required:"City is required"},
            // state:{required:"State is required"},
            // zipcode:{required:"Zip Code is required",
                   // validate_zip_code: "Please enter a valid Zip Code.",
                   // number: "Zip Code should contains numbers Only."},
            phone:{required:"Phone Number is required",
                    phonecheck:"Phone number is invalid.",
                    // check_phone_exist:"This Phone already exists please use another one."
                },
            email:{required:"Email is required",
                    email:"Please enter a valid email address.",
                     check_email_exist:"This email already exists please use another one."
                },
            //ein:{required:"EIN is required"},
            //fax:{required:"Fax is required"},

        },
        errorPlacement: function(error, element) {
                error.insertAfter(element);
        }
    });
    // $('.valid').each(function () {
    //     $(this).rules('add', {
    //         required: true,
    //         messages: {
    //             required: "This field is required"
    //         }
    //     });
    // });

	$.validator.addMethod("check_email_exist",function(value,element) {
        var userid = $('#title_company_id').val();
        var email_check = $('#email_check').val();
        var postData ={email:value};
        postData[global_csrf_token_name]= global_csrf_token_value;
        if(userid=="" || value!==email_check){
            $.ajax({
                type: "POST",
                async:false,
                url: base_url + 'backend/titlecompany/check_email_exist',
                data: postData , 
                success: function(msg){ 
                    result = (msg == "1") ? false : true;
                }
            });
            
        }else{
            result =true;

        }
        return result;
    });

    $.validator.addMethod("phonecheck", function(value, element) {
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

	// save broker
	$(document).on('click','#save_title_sub',function(e){
		e.preventDefault(e);

		var title_form_valid = $("#add-sub_title-form").valid();

		if(title_form_valid == true){
			var form = $('#add-sub_title-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/titlecompany/add_subaccount",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                	if(result.status = true){
                    	window.location.href = base_url+'backend/titlecompany';
                	}
                }
            });
		}
	});

    $(document).on('click','#cancel_title_sub',function(e){
        window.location.href = base_url+'backend/titlecompany';
    });

    var data_property = {};
    var url_chart_property   = base_url + 'backend/titlecompany/title_loan_chart_property';
    get_loan_chart_property(data_property, url_chart_property);

    $('body').on('change', '#property_type', function(){
        var type = $(this).val();
        data_property.type  = type;
        get_loan_chart_property(data_property, url_chart_property);
    });    
    
    function get_loan_chart_property(data, url){
        var title_company_id = $('#title_company_id').val();
        data.title_company_id  = title_company_id;
        data.user_type ='sub';
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
                        floating: true,
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
                        name: 'Browsers',
                            data: [{
                                name: 'Completed',
                                y: response.completed
                            }, {
                                name: 'In Progress',
                                y: response.inProgress
                            }, {
                                name: 'Dead/Denied',
                                y: ( response.total - (response.inProgress+response.completed))
                            }],
                        // size: '60%',
                        // innerSize: '90%',
                        // showInLegend: true,
                        // dataLabels: {
                        //     enabled: false
                        // }
                    }]
                });
                //function(chart) { // on complete
                //         var textX = chart.plotLeft + (chart.plotWidth * 0.5);
                //         var textY = chart.plotTop + (chart.plotHeight * 0.5);

                //         // var span = '<span id="pieChartInfoText" style="position:absolute;left:53px;top:58px; text-align:center; display:table;">';
                //         // span += '<span style="font-size: 14px; display:table-cell; vertical-align:top; text-align:right;">Turnaround Time <br>(Days)</span>';
                //         // span += '<span style="font-size: 14px;display:table-cell; vertical-align:top; font-weight:bold;">10</span>';
                //         // span += '</span>';

                //         // $("#legend").append(span);
                //         // span = $('#pieChartInfoText');
                //         // span.css('left', textX + (span.width() * -0.5));
                //         // span.css('top', textY + (span.height() * -0.5));
                // });
            });
        });
    }

    var data_location= {};
    var url_chart_location   = base_url + 'backend/titlecompany/title_loan_chart_location';
    get_loan_chart_location(data_location, url_chart_location);

    $('body').on('change', '#location_search', function(){
        var loc_id = $(this).val();
        data_location.location_id  = loc_id;
        get_loan_chart_location(data_location, url_chart_location);
    });

    function get_loan_chart_location(data, url){
        var title_company_id = $('#title_company_id').val();
        data.title_company_id  = title_company_id;
        data.user_type ='sub';
        data[global_csrf_token_name]= global_csrf_token_value;
        $.post(url, data, function(response){
            var response = $.parseJSON(response);
            $(function() {
                Highcharts.setOptions({
                    //colors: ['#ffaf46', '#cdcdcd','#ff6666']
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
                                    text: '<span style="font-weight:bold; color:#1a2942; font-size:35px;">'+total+'</span>' + '<br>Total<br>' + 'Assigned Loans',
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
                        }],
                        // size: '60%',
                        // innerSize: '90%',
                        // showInLegend: true,
                        // dataLabels: {
                        //     enabled: false
                        // }
                    }]
                });
                //  function(chart) { // on complete
                //     var textX = chart.plotLeft + (chart.plotWidth * 0.5);
                //     var textY = chart.plotTop + (chart.plotHeight * 0.5);

                //     // var span = '<span id="pieChartInfoText" style="position:absolute; text-align:center; display:table;">';
                //     // span += '<span style="font-size: 14px; display:table-cell; vertical-align:top; text-align:right;">Turnaround Time <br>(Days)</span>';
                //     // span += '<span style="font-size: 14px;display:table-cell; vertical-align:top; font-weight:bold;">10</span>';
                //     // span += '</span>';
                //     // $(".highcharts-legend").append(span);
                // });
            });
        });
    }

    // var data_sub = {};
    // var url_chart_sub = base_url + 'backend/titlecompany/title_loan_chart_sub';
    // get_loan_chart_sub(data_sub, url_chart_sub);

    // $('body').on('change', '#sub_accounts', function(){
    //     var sub_id = $(this).val();
    //     data_sub.sub_id  = sub_id;
    //     get_loan_chart_sub(data_sub, url_chart_sub);
    // });

    // function get_loan_chart_sub(data, url){
    //     var title_company_id = $('#title_company_id').val();
    //     data.title_company_id  = title_company_id;
    //     data[global_csrf_token_name]= global_csrf_token_value;
    //     $.post(url, data, function(response){
    //         var response = $.parseJSON(response);
    //         $(function() {
    //             Highcharts.setOptions({
    //                 colors: ['#43bbf7', '#cdcdcd']
    //             });
    //             chart = new Highcharts.Chart({
    //                 chart: {
    //                     renderTo: 'subuserType',
    //                     type: 'pie',
    //                     events: {
    //                         load: function(event) {
    //                             var chart = this,
    //                             points = chart.series[0].points,
    //                             len = points.length,
    //                             total = 0,
    //                             i = 0;

    //                             for (; i < len; i++) {
    //                                 total += points[i].y;
    //                             }

    //                             chart.setTitle({
    //                                 text: '<span style="font-weight:bold; color:#1a2942; font-size:35px;">'+total+'</span>' + '<br>Total<br>' + 'Assigned Loans',
    //                                 align: 'center',
    //                                 verticalAlign: 'middle',
    //                                 y: -10,
    //                                 style: {
    //                                     color: '#a7aab1',
    //                                     fontSize:'17px'
    //                                 },
    //                             });
    //                         }
    //                     }
    //                 },
    //                 tooltip: {
    //                     formatter: function() {
    //                         return '<b>' + this.point.name + '</b>:' + this.y;
    //                     }
    //                 },
    //                 legend: {
    //                     enabled: true,
    //                     floating: true,
    //                     borderWidth: 0,
    //                     align: 'right',
    //                     layout: 'vertical',
    //                     verticalAlign: 'middle',
    //                     itemMarginBottom: 5,
    //                     x:20,
    //                     useHTML: true,
    //                     labelFormatter: function() {
    //                         return '<span style="font-family:Verdana, Geneva, sans-serif; font-size:14px; font-weight: normal;color:'+this.color+';">' + this.name + ' </span> <span style="font-weight: bold; font-size:14px; color:'+this.color+';">' + this.y + ' <br/></span>';
    //                     }
    //                 },
    //                 yAxis: {
    //                     title: {
    //                         text: ''
    //                     }
    //                 },
    //                 plotOptions: {
    //                     pie: {
    //                         shadow: false
    //                     }
    //                 },
    //                 credits:false,
    //                 series: [{
    //                     name: 'Browsers',
    //                     data: [{
    //                         name: 'Completed',
    //                         y: response.completed
    //                     }, {
    //                         name: 'In Progress',
    //                         y: response.inProgress
    //                     }],
    //                     size: '60%',
    //                     innerSize: '90%',
    //                     showInLegend: true,
    //                     dataLabels: {
    //                         enabled: false
    //                     }
    //                 }]
    //             }, function(chart) { // on complete
    //                 var textX = chart.plotLeft + (chart.plotWidth * 0.5);
    //                 var textY = chart.plotTop + (chart.plotHeight * 0.5);

    //                 // var span = '<span id="pieChartInfoText" style="position:absolute; text-align:center; display:table;">';
    //                 // span += '<span style="font-size: 14px; display:table-cell; vertical-align:top; text-align:right;">Turnaround Time <br>(Days)</span>';
    //                 // span += '<span style="font-size: 14px;display:table-cell; vertical-align:top; font-weight:bold;">10</span>';
    //                 // span += '</span>';
    //                 // $(".highcharts-legend").append(span);
    //             });
    //         });
    //     });
    // }

    $(document).on('click','.main_poc',function(){ 
        var l = $(this).closest('.form-group').parent().next();
        if($(this).prop('checked')==true){
          
          l.find("[name='poc_fname[]']").val($('#firstname').val());
          l.next().find("[name='poc_lname[]']").val($('#lastName').val());
          l.next().next().find("[name='poc_phone[]']").val($('#phone').val());
          l.next().next().next().find("[name='poc_email[]']").val($('#email').val());
        }else{
          l.find("[name='poc_fname[]']").val('');
          l.next().find("[name='poc_lname[]']").val('');
          l.next().next().find("[name='poc_phone[]']").val('');
          l.next().next().next().find("[name='poc_email[]']").val('');
        }
    });

    $(document).on('click','.delete-doc',function(){ 
        var type = $(this).attr('alt');
        var id   = $(this).attr('id');
        var postData ={type:type,id:id};
        postData[global_csrf_token_name]= global_csrf_token_value;
        var project_confirm = confirm('Are you sure you want to delete this document?');
        if(project_confirm==true){
            $.ajax({
                type: "POST",
                async:false,
                url: base_url + "backend/titlecompany/title_delete_doc",
                data: postData , 
                success: function (response) {
                    $('#'+type+'_'+id).remove();
                }
            });
        }
        
    });

    

});
