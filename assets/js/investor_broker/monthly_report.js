var base_url = $("#base-url-1").val();
$(document).ready(function(){
    var user_id = $('#user_id').val();
    disable_months();

    $('#report_type').on('change',function(){
    	var type = $('#report_type option:selected').val();
    	if(type == 'months'){
    		$('.month_range').addClass('hide');
    		$('.monthly').removeClass('hide');
            $('.monthly').find('label').html('Month');
    	}else if(type == 'years'){
    		$('.month_range').addClass('hide');
    		$('.monthly').addClass('hide');
    	}else if(type == 'month_range'){
    		$('.month_range').removeClass('hide');
    		$('.monthly').removeClass('hide');
            $('.monthly').find('label').html('Month To');
    	}
    });


    $(".investor-broker-report-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            'report_type':{required:true},
            'year':{required:true},
            'month':{valid_monthly:true},
            'frommonth':{valid_month_range:true},
        },
        messages: {
        	'report_type':{required:'Report Type is required'},
        	'year':{required:'Year is required'},
        	'month':{valid_monthly:'Month is required'},
        	'frommonth':{valid_month_range:'Month From is required'},
        },
        errorPlacement: function(error, element) {
        	if(element.is('select')){
                error.insertAfter(element.parent());
            }else{
               error.insertAfter(element); 
            }
        }
    });

    $.validator.addMethod("valid_monthly", function(value, element) {
    	var type = $('#report_type option:selected').val();
        if((type == 'months' || type == 'month_range') && value == '')
            return false;
        else
            return true;
    });

    $.validator.addMethod("valid_month_range", function(value, element) {
    	var type = $('#report_type option:selected').val();
        if(type == 'month_range' && value == '')
            return false;
        else
            return true;
    });

    $(document).on('click','#investor_broker_report_download',function(e){
        e.preventDefault();
        var edit_form_valid = $(".investor-broker-report-form").valid();
        if(edit_form_valid == true){
            $('.investor-broker-report-form').submit();
        }else{

        }
    });

    $(document).on('change','#year',function(){
        disable_months();
    });
    
});

function disable_months(){
    var year = $('#year').val();
    var month = $('#month').val();
    var from_month = $('#from_month').val();

    var c_year = new Date().getFullYear();
    var c_month = new Date().getMonth()+1;
        
    if(year == c_year){
        if( month > c_month )
            $('#month').val(c_month).trigger('change');
        $('#month').find('option').each(function(index,element){
            if(element.value > c_month)
                $('#month option[value="'+element.value+'"]').hide();
        });

        if( from_month > c_month )
            $('#from_month').val(c_month).trigger('change');
        $('#from_month').find('option').each(function(index,element){
            if(element.value > c_month)
                $('#from_month option[value="'+element.value+'"]').hide();
        });
    }
    else{
        $('#month').find('option').each(function(index,element){
                $('#month option[value="'+element.value+'"]').show();
        });

        $('#from_month').find('option').each(function(index,element){
                $('#from_month option[value="'+element.value+'"]').show();
        });
    }
    $('.selectpicker').selectpicker('refresh');
}
