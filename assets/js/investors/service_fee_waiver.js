var base_url = $("#base-url-1").val();
$(document).ready(function(){
    $("#baserate_error").html('');

    $("#base_rate_form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            sharestate_base_rate:{required:true},
            user_base_rate:{required:true}

        },
        messages: {
            sharestate_base_rate:{required:"This field is required"},
            user_base_rate:{required:"This field is required"}
        },
        errorPlacement: function(error, element) {
            if(element.is('select') ||(element.attr("name") == 'eo_date'))
                error.insertAfter(element.parent());
            else
                error.insertAfter(element);
        }
    });

    $(".share_fee").change(function(){
        var share_fee = $(this).val();
        var inv_fee = 100 - share_fee;
        inv_fee = (inv_fee).toFixed(2);
        $(this).closest('div').parent('div').parent('div').find('.inv_fee').val(inv_fee);
    });


    
    $("#override_effective_date").datepicker({
        dateFormat: 'mm/dd/yy',
        changeMonth: true,
        changeYear:true,
        yearRange: "-5:+10",
        minDate: 0,
    });

    $('[data-toggle="tooltip"]').tooltip();


    var perc_sfee  = $("#gross_interest_rate").val();
    var waive_sfee = $("#user_servicefee_override").val();
    $(".user_floor_rate_div").hide();
    if((perc_sfee!="" && perc_sfee!=0) ||(waive_sfee!="" && waive_sfee!=0)){
        $(".user_floor_rate_div").show();
    }else{
        $("#user_floor_rate").val('');
        $(".user_floor_rate_div").hide();
    }

    $(".first_third_div").keyup(function(){
        var vl =$(this).val();
        if(vl!="" && vl!=0){
            $(".user_floor_rate_div").show();
        }else{
            $("#user_floor_rate").val('');
            $(".user_floor_rate_div").hide();
        }
    });

    //Percent Waived Based Service Fee
    $("#user_servicefee_override").blur(function(){
        $("#user_interest_rate_span,#gross_interest_rate_span").hide();
        var uid             = $("#user_id").val();
        var override_fee    = $(this).val();
        var user_intrst_fee = $("#user_interest_rate").val();
        var gross_fee       = $("#gross_interest_rate").val();
        var ovdate          = $("#override_effective_date").val();
  
        if(override_fee!=0){
            if(user_intrst_fee!=0 && user_intrst_fee!=""){
                $("#user_servicefee_override").val('');
                $("#error_span").show();
                $("#user_floor_rate").val('');
                $(".user_floor_rate_div").hide();
                $('html, body').animate({
                    scrollTop: $('.error').offset().top - 20
                }, 'slow');
            }else if(gross_fee!=0 && gross_fee!=""){
                $("#user_servicefee_override").val('');
                $("#error_span").show();
                $("#user_floor_rate").val('');
                $(".user_floor_rate_div").hide();
                $('html, body').animate({
                    scrollTop: $('.error').offset().top - 20
                }, 'slow');
            }else{
                $("#error_span").hide();
            }
        }else{
          $("#error_span").hide();
        }
    });

    //Fixed Based Service Fee
    $("#user_interest_rate").blur(function(){
        $("#gross_interest_rate_span").hide();
        var user_intrst_fee = $(this).val();
        var override_fee    = $("#user_servicefee_override").val();
        var gross_fee       = $("#gross_interest_rate").val();
        var uid             = $("#user_id").val();
        var ovdate          = $("#override_effective_date").val();
        var er_flag=0;

        if(user_intrst_fee!=0){
          if(override_fee!=0 && override_fee!=""){
            $("#user_interest_rate").val('');       
            $("#error_span").show();  
            er_flag=1;      
          }else if(gross_fee!=0 && gross_fee!=""){
            $("#user_interest_rate").val('');
            $("#error_span").show();
            er_flag=1;
          }else{
            $("#user_interest_rate_span").hide();
          }
          if(er_flag==0){
            $("#user_floor_rate").val('');
          }
        }else{
          $("#error_span").hide();
        }
    });

    //Percentage Based Service Fee
    $("#gross_interest_rate").blur(function(){
        $("#user_interest_rate_span").hide();
        var gross_fee       = $(this).val();
        var override_fee    = $("#user_servicefee_override").val();
        var user_intrst_fee = $("#user_interest_rate").val();
        var ovdate          = $("#override_effective_date").val();

        if(gross_fee!=0){
          if(override_fee!=0 && override_fee!=""){
            $("#gross_interest_rate").val('');
            $("#error_span").show();
            $("#user_floor_rate").val('');
            $(".user_floor_rate_div").hide();
          }else if(user_intrst_fee!=0 && user_intrst_fee!=""){
            $("#gross_interest_rate").val('');
            $("#error_span").show();
            $("#user_floor_rate").val('');
            $(".user_floor_rate_div").hide();
          }else{
            $("#error_span").hide();
          }
        }else{
          $("#error_span").hide();
        }
    });

    $(".percentage").blur(function(){
        var waive_flag = 0;
        var ovdate     = $("#override_effective_date").val();
        var i=0; 
        $('.percentage').each(function(){
            if($(this).val()!="" && $(this).val()!=0){
                waive_flag=1;
                i++;
            }
        });

        if(waive_flag==1 && (ovdate=="")){
            $("#error_span_date").show();
            $("#error_span_date").html('Please enter override effective date');
            $('#news_submit').prop('disabled', true);
            return false; 
        }else{
            $("#error_span_date").html('');
            $("#error_span_date").hide();
            $('#news_submit').prop('disabled', false);
            return true; 
        }
    });

    $("#override_effective_date").change(function(){
        var ovdate          = $(this).val();
        var override_fee    = $("#user_servicefee_override").val();
        var user_intrst_fee = $("#user_interest_rate").val();
        var gross_fee       = $("#gross_interest_rate").val();
        if((override_fee==0 || override_fee=='') && (user_intrst_fee=0 || user_intrst_fee=="") && (gross_fee=="" || gross_fee==0)){
            $("#error_span_date").show();
            $("#error_span_date").html('Please set atleast one value for service fee waiver');
            $("#override_effective_date").val('');
            return false;
        }else{
            $("#error_span_date").html('');
            $("#error_span_date").hide();
            if(ovdate==""){
                $("#error_span_date").show();
                $("#error_span_date").html('Please enter override effective date');
                $('#news_submit').prop('disabled', true);
                return false; 
            }else{
                $("#error_span_date").html('');
                $("#error_span_date").hide();
                $('#news_submit').prop('disabled', false);
                return true; 
            }
        }
    });

    $(".over_ride").click(function(){
        $(".section2 .percentage").val('');
    });



});

function validate_FloatKeyPress(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');

    if (charCode != 45 && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
        return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
        return false;
    }
    return true;
}

function getSelectionStart(o) {
    if (o.createTextRange) {
        var r = document.selection.createRange().duplicate()
        r.moveEnd('character', o.value.length)
        if (r.text == '') return o.value.length
        return o.value.lastIndexOf(r.text)
    } else return o.selectionStart
}

//Percentage Format
$(document).on({
    keyup: function(e){
        var num = $(this).val();
        if (e.which!=8) {
            num = sortNumber(num);
            //if(isNaN(num)||num<0 ||num>100) {
            if(num>100) {
               alert("Please enter a number less than 100");
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
            $(this).val(number_format($(this).val(),2));
        }
    }
}
, '.percentage');

function sortNumber(n){
    var newNumber="";
    for(var i = 0; i<n.length; i++)
        if(n[i] != "%")
            newNumber += n[i];
    return newNumber;
}

function number_format(number, decimals, dec_point, thousands_sep) {

    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
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
