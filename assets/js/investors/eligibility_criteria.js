var base_url =  $("#base-url-1").val();
var main_id =  $("#user_id").val();
$(document).ready(function(){

    var cred_box = $('#cred_box_count').val();
    if(cred_box>0){
        $('.show_div').hide();
    }else{
        $('.show_div').show();
    }
  
    $("#add_new_criteria").click(function(){
        $('.show_div').show();
        criteria_details(main_id,'');
    });

    //$('[data-toggle="tooltip"]').tooltip(); 

    $(".edit-acc").click(function(){ 
        remove_user();
        var id = $(this).attr('id');
        var criteria_id = $(this).attr('alt');
        var name = $('#user_'+id).html();
        //$('#user_account_id').val(id);
        //$("#account_id").append('<option value="'+id+'" >'+name+'</option>');
        //$('#account_id').val(id);
        var post_data = { id:id,criteria_id:criteria_id };
            post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: "POST",
            url:base_url+"backend/investors/edit_criteria",
            data: post_data,
            //cache: true,  
            dataType : 'json',
            success : function(data){ 
                if(data.msg!="error"){
                    criteria_details(main_id,criteria_id);
                    $('.show_div').show();
                }
            }
        });

        if(id!=''){
            $(".delete-acc").attr("id", criteria_id);
        }else{
            $('.show_div').hide();
        }

    });


    $(document).on('click','.delete-acc',function(){
        var criteria_id = $(this).attr('alt');
        // var type = $(this).attr('data-type');
        status_update({'criteria_id':criteria_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/investors/criteria_delete',"Are you sure you want to delete this criteria?","Criteria delete successfully.","Criteria could not be deleted",'saved_criteria');
    });

    //development_phase
    $(document).on('ifChanged','#dp_check_box',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.developmentphase').iCheck('check');
        } else{
            $('.developmentphase').iCheck('uncheck');
        }
    });

    var dp_val = [];
    $("input:checkbox[name=development_phase]:checked").each(function () {
        var val = $(this).val();
        dp_val.push(val);
    });
    $('#development_phases').val(dp_val);

    $(document).on('ifChanged','.developmentphase',function(){
        var dp_val = [];
        $("input:checkbox[name=development_phase]:checked").each(function () {
            var val = $(this).val();
            dp_val.push(val);
        });
        $('#development_phases').val(dp_val);
    });

    //loan_purpose
    $(document).on('ifChanged','#lp_check_box',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.loanpurpose').iCheck('check');
        } else{
            $('.loanpurpose').iCheck('uncheck');
        }
    });

    var lp_val = [];
    $("input:checkbox[name=loan_purpose]:checked").each(function () {
        var val = $(this).val();
        lp_val.push(val);
    });
    $('#loan_purposes').val(lp_val);

    $(document).on('ifChanged','.loanpurpose',function(){
        var lp_val = [];
        $("input:checkbox[name=loan_purpose]:checked").each(function () {
            var val = $(this).val();
            lp_val.push(val);
        });
        $('#loan_purposes').val(lp_val);
    });

    //sponsor_record
    $(document).on('ifChanged','#sr_check_box',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.sponsorrecord').iCheck('check');
        } else{
            $('.sponsorrecord').iCheck('uncheck');
        }
    });

    var sr_val = [];
    $("input:checkbox[name=sponsor_record]:checked").each(function () {
        var val = $(this).val();
        sr_val.push(val);
    });
    $('#sponsor_records').val(sr_val);

    $(document).on('ifChanged','.sponsorrecord',function(){
        var sr_val = [];
        $("input:checkbox[name=sponsor_record]:checked").each(function () {
            var val = $(this).val();
            sr_val.push(val);
        });
        $('#sponsor_records').val(sr_val);
    });

    //property_types
    $(document).on('ifChanged','#pt_check_box',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.propertytype').iCheck('check');
        } else{
            $('.propertytype').iCheck('uncheck');
        }
    });

    var pt_val = [];
    $("input:checkbox[name=property_type]:checked").each(function () {
        var val = $(this).val();
        pt_val.push(val);
    });
    $('#property_types').val(pt_val);

    $(document).on('ifChanged','.propertytype',function(){
        var pt_val = [];
        $("input:checkbox[name=property_type]:checked").each(function () {
            var val = $(this).val();
            pt_val.push(val);
        });
        $('#property_types').val(pt_val);
    });

    //project_loan_types
    $(document).on('ifChanged','#plt_check_box',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.projectloantype').iCheck('check');
        } else{
            $('.projectloantype').iCheck('uncheck');
        }
    });

    var plt_val = [];
    $("input:checkbox[name=project_loan_type]:checked").each(function () {
        var val = $(this).val();
        plt_val.push(val);
    });
    $('#project_loan_types').val(plt_val);

    $(document).on('ifChanged','.projectloantype',function(){
        var plt_val = [];
        $("input:checkbox[name=project_loan_type]:checked").each(function () {
            var val = $(this).val();
            plt_val.push(val);
        });
        $('#project_loan_types').val(plt_val);
    });

    //sponsor_credit_scores
    $(document).on('ifChanged','#scs_check_box',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.sponsorcreditscore').iCheck('check');
        } else{
            $('.sponsorcreditscore').iCheck('uncheck');
        }
    });

    var scs_val = [];
    $("input:checkbox[name=sponsor_credit_score]:checked").each(function () {
        var val = $(this).val();
        scs_val.push(val);
    });
    $('#sponsor_credit_scores').val(scs_val);

    $(document).on('ifChanged','.sponsorcreditscore',function(){
        var scs_val = [];
        $("input:checkbox[name=sponsor_credit_score]:checked").each(function () {
            var val = $(this).val();
            scs_val.push(val);
        });
        $('#sponsor_credit_scores').val(scs_val);
    });


    function criteria_details(main_id,criteria_id) { 
        ShwLoadingPanel();
        $('#save_invest').val('Save Changes');
        $('#cancel_invest').hide();
        $('.cancel_back').show();
        var post_data = [];
        post_data[global_csrf_token_name]= global_csrf_token_value;

        $.ajax({
            type: "POST",
            url:base_url+"backend/investors/criteria_details"+'/'+main_id+'/'+criteria_id,
            cache: true,  
            dataType : 'json',
            data: post_data,
            success : function(data){ 
                remvLoadingPanel();
                $('#eligibility_criteria').html('');
                $('#eligibility_criteria').html(data.html);
                $('.show_div').show();
                remove_user();
                $('.selectpicker').selectpicker();
                $('input').iCheck({ checkboxClass: 'icheckbox_minimal-blue' });
            }
        });
    }

});

function remove_user() {
    $.each($(".edit_account"), function(){            
        var id = $(this).val();
        if(id!=''){
             $("#account_id option[value='"+id+"']").remove();
        }   
    });
}

$(document).on( {
    change: function() {  
        var id = $(this).val();
        $(':input','#eligibility_criteria_form')
         .not(':button, :submit, :reset, :hidden,.developmentphase,.loanpurpose,.sponsorrecord,.propertytype,.projectloantype,.sponsorcreditscore')
         .val('')
         .removeAttr('checked')
         .removeAttr('selected');

        $('.developmentphase').iCheck('uncheck');
        $('.loanpurpose').iCheck('uncheck');
        $('.sponsorrecord').iCheck('uncheck');
        $('.propertytype').iCheck('uncheck');
        $('.projectloantype').iCheck('uncheck');
        $('.sponsorcreditscore').iCheck('uncheck');
        $('.sel_all').iCheck('uncheck');

        $('#account_id').val(id);
        $('#user_account_id').val(id);
        $('.show_div').hide();
        remove_user();
        $("#criteria_id").val('');
        if(id!=''){ 
            $('.show_div').show();
        }
    },
}
, '#account_id');

$(document).on( {
    ifChanged: function() { 
        var CBox = $(this).attr("id");
        if ($(this).is(':checked')) {
            $("."+CBox).iCheck('check');
        }else{
            $("."+CBox).iCheck('uncheck');
        }
        //$("."+CBox).prop('checked', $(this).prop("checked"));

        $("."+CBox).each(function(){
            var CBox_id = $(this).attr("id");
            if ($(this).is(':checked')) {
                $("."+CBox_id).show( "slow" );
            }else{
                $("."+CBox_id).hide( "slow" );
            }
        });
    },
}, '.selectall');

$(document).on( {
    ifChanged: function() { 
        var CBox_id = $(this).attr("id");
        if ($(this).is(':checked')) {
          $("."+CBox_id).show( "slow" );
        }else{
          $("."+CBox_id).hide( "slow" );
        }
    },
}, '.check_box1,.check_box2,.check_box3,.check_box4,.check_box5,.check_box6');

// $(document).on( {
//     click: function(e) {
//         e.preventDefault();
//         $("#eligibility_criteria_form").valid();
//         $("#risk_type_err").html('');
//         var min_size = $("#minimum_loan_size").val();
//         min_size = parseFloat(min_size.replace(/[^0-9-.]/g, ''));
//         var max_size = $("#maximum_loan_size").val();
//         max_size = parseFloat(max_size.replace(/[^0-9-.]/g, ''));
//         var min_invest = $("#min_invest").val();
//         var flag1 = 0;

//         if(max_size<min_size){
//             $("#err-labl2").remove();
//             $("#maximum_loan_size").parent().append('<label class="error" id="err-labl2">Maximum Loan Size should be greater than Minimum Loan Size.</label>');
//             $('#maximum_loan_size').focus();
//             flag1=1;
//             return false;
//         }

//         var num1 = $("#eligibility_criteria input:checked").length;
//         if(num1==0){
//             $("#risk_type_err").html('Please choose one option');
//             $("#risk_type_err").show();
//             flag1=1;
//             return false;
//         }

//         if(flag1==0) {   
//             if($('#eligibility_criteria_form').valid()) {
//                 $("#save_invest").attr("disabled", true);
//                 // $('#eligibility_criteria_form').submit();

//                 ShwLoadingPanel();
//                 var form = $('#eligibility_criteria_form')[0];
//                 var data = new FormData(form);
//                 $.ajax({
//                     url:base_url + "backend/investors/add_eligibility_criteria",
//                     enctype: 'multipart/form-data',
//                     processData: false,  // Important!
//                     contentType: false,
//                     cache: false,
//                     data: data,       
//                     type:'POST',
//                     success:function(result){
//                         remvLoadingPanel();
//                         var response = $.parseJSON(result);  
//                         if(response.status = true){
//                             $("#credboxcriteriapage a" ).trigger( "click" );
//                         }
//                     }
//                 });


//             }
//         }
    
//     },

// }, '#save_cred');

$(document).on( {
    click: function() {   
        $('.show_div').hide();
        return false;
    },
}, '#cancel_cred');

//////////////validate currency format/////////////////
var format = function(num){
    // var str = num.toString().replace("$", ""), parts = false, output = [], i = 1, formatted = null;
    var str = num.toString(). replace(/[$,]/g,''), parts = false, output = [], i = 1, formatted = null;
    //replace(/[#_]/g,'');
    if(isNaN(str)) {
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

$(document).on( {
    keyup: function(){
        var val = $(this).val();
        var val1 = $(this).val();
        val=  parseFloat(val.replace(/[^0-9-.]/g, ''));
     
        if(val==0 || val1=='$' || isNaN(val)){
            $("#err-labl").remove();
            $(this).addClass('error');
            $(this).val('');
            $(this).parent().append('<label class="error" id="err-labl">Please enter value greater than 0</label>');
            return false;
        } else{
            $("#err-labl").remove();  
            $(this).removeClass('error');
        }
        $(this).val(format($(this).val()));
    },
    blur: function(){
      var val = $(this).val();
      var val1 = $(this).val();
      val=  parseFloat(val.replace(/[^0-9-.]/g, ''));
      
      if(val==0 || val1=='$' || isNaN(val)){
        $("#err-labl").remove();
        $(this).addClass('error');
        $(this).val('');
        $(this).parent().append('<label class="error" id="err-labl">Please enter value greater than 0</label>');
        return false;
      }else{
        $("#err-labl").remove();  
        $(this).removeClass('error');
        $(this).val(format($(this).val(),2));
      }
    }
}
, '.currency_format');

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
        $(this).val(format($(this).val(),2));
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

///////////validate decimal point and number only/////
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

