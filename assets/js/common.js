 $(function() {
    var base_url =  $("#base-url-1").val();

    /* phone number format -start */
    $('.phone_format').keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;

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
        return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)); 
    });

    $('.ein_format').keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        $phone = $(this);

        // Auto-format- do not expose the mask as the user begins to type
        if (key !== 8 && key !== 9) {
          if ($phone.val().length === 2) {
            $phone.val($phone.val() + '-');
          }
        }

        // Allow numeric (and tab, backspace, delete) keys only
        return (key == 8 || key == 9 ||key == 46 ||(key >= 48 && key <= 57) ||(key >= 96 && key <= 105)); 
  });

    /* ssn format -start */
    $('.ssn_format').keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;

        $ssn = $(this);
        // Auto-format- do not expose the mask as the user begins to type
        if (key !== 8 && key !== 9) {
            if ($ssn.val().length === 3) {
                $ssn.val($ssn.val() + '-');
            }
            if ($ssn.val().length === 6) {
                $ssn.val($ssn.val() + '-');
            }     
        }
        // Allow numeric (and tab, backspace, delete) keys only
        return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105)); 
    });

   /* $.validator.addMethod("user_phone_check",function(value,element) {
        cntry_code  = parseFloat(value.replace(/[^0-9-.]/g, ''));
        var codeReg =/^(?!.*(\d)\1{2}).*$/;
        if(!codeReg.test(cntry_code)) {
            return false;
        } else {
            var cntry_code2 = value.split('-');
            var codeReg2 =/^(?!.*(\d)\1{3}).*$/;
            if(!codeReg2.test(cntry_code2[1])) {
                return false;
            }
            else{
                return true;
            } 
        }
    });
*/
    $.validator.addMethod("user_phone_check",function(value,element) {
       // cntry_code  = parseFloat(value.replace(/[^0-9-.]/g, ''));
        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
            return true;
        else
            return false;
        /*var codeReg =/^(?!.*(\d)\1{2}).*$/;
        if (!codeReg.test(cntry_code)) {
            return false;
        } else {
            var pattern1 = '01234567890123456789' //to match circular sequence as well.
            if (pattern1.indexOf(cntry_code) == -1) {
                return true;
            }
            else{
                return false;
            } 
        }*/

    });

    $.validator.addMethod("validate_zip_code", function(value, element) {
        if(value.length<5){
          return false;
        }
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
        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
            return true;
        else
            return false;
    });

    
});
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

 $(document).on(
{
    keyup: function()
    {
        var val = $(this).val();
        var val1 = $(this).val();
         val=  parseFloat(val.replace(/[^0-9-.]/g, ''));
   
        if(val==0 || val1=='$')
        {
           $("#err-labl").remove();
           $(this).addClass('error');
               $(this).val('');
               $(this).parent().append('<label class="error" id="err-labl">Please enter value greater than 0</label>');
               return false;
        }
        else
        {
          $("#err-labl").remove();  
          $(this).removeClass('error');
        }
        $(this).val(format($(this).val()));
    }
}
, '.currency');


         var format = function(num){
  // var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
  var str = num.toString(). replace(/[$,]/g,''), parts = false, output = [], i = 1, formatted = null;
  //replace(/[#_]/g,'');
   if(isNaN(str))
        
    {
        return;
    }
  if(str.indexOf(".") > 0) {
    parts = str.split(".");
    str = parts[0];
  }
  str = str.split("").reverse();
  for(var j = 0, len = str.length; j < len; j++) {
    if(str[j] != ",") {
      output.push(str[j]);
      if(i%3 == 0 && j < (len - 1)) {
        output.push(",");
      }
      i++;
    }
  }
  formatted = output.reverse().join("");
  return("$" + formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
};

$(document).on({
    blur: function(){
        var val = $(this).val();
   
        if(val==''){
          return false;
        }else{
          $("#err-labl").remove(); 
          $(this).removeClass('error');
          $(this).val(number_format_float($(this).val(),2));
        }
    }
}
, '.currency-doller');

function number_format_float (number, decimals, dec_point, thousands_sep) {
    
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
        return '$'+s.join(dec);
      
    }

function isNumberKey(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
         return false;
        else
        return true;
}

   function number_format (number, decimals, dec_point, thousands_sep) 
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

    //trim the left and right spaces -email field
    $('body').on('keyup','.email',function(){
        $(this).val($.trim($(this).val()));
        return true;
    });

    //trim the left and right spaces -name field 
    $('body').on('blur','.name',function(){
        $(this).val($.trim($(this).val()));
        return true;
    });

    $(document).on('keypress','.decimal',function(e){
      var charCode = (e.which) ? e.which : event.keyCode;
      if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
      return true;

    });     

    $(document).on('blur','.percentage',function(){  
        if($(this).val()!=""){
            var per_val = parseFloat($(this).val()); 
            $(this).val(number_format(per_val,2,'.','')+'%');
        }
    }); 

    $('.percentage').each(function(){
        if($(this).val()!=""){
            var per_val = parseFloat($(this).val()); 
            $(this).val(number_format(per_val,2,'.','')+'%');
        }
    });

    $(document).on('blur','.annual_intrest_percentage',function(){  
        if($(this).val()!=""){
            var per_val = parseFloat($(this).val()); 
            $(this).val(number_format(per_val,6,'.','')+'%');
        }
    }); 

    $('.annual_intrest_percentage').each(function(){
        if($(this).val()!=""){
            var per_val = parseFloat($(this).val()); 
            $(this).val(number_format(per_val,6,'.','')+'%');
        }
    });


