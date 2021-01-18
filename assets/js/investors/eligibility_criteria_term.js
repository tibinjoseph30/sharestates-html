var base_url =  $("#base-url-1").val();
var main_id =  $("#user_id").val();
$(document).ready(function(){
    
    var cred_box = $('#cred_box_count_term').val();
    if(cred_box>0){
        $('.show_div_term').hide();
    }else{
        $('.show_div_term').show();
    }
  
    $("#add_new_criteria_term").click(function(){
        $('.show_div_term').show();
        criteria_details(main_id,'');
    });

    //$('[data-toggle="tooltip"]').tooltip(); 

    $(".edit-acc_term").click(function(){ 
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
            url:base_url+"backend/investors/edit_term_criteria",
            data: post_data,
            //cache: true,  
            dataType : 'json',
            success : function(data){ 
                if(data.msg!="error"){
                    criteria_details(main_id,criteria_id);
                    $('.show_div_term').show();
                }
            }
        });

        if(id!=''){
            $(".delete-acc_term").attr("id", criteria_id);
        }else{
            $('.show_div_term').hide();
        }

    });


    $(document).on('click','.delete-acc_term',function(){
        var criteria_id = $(this).attr('alt');
        // var type = $(this).attr('data-type');
        status_update({'criteria_id':criteria_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/investors/term_criteria_delete',"Are you sure you want to delete this criteria?","Criteria delete successfully.","Criteria could not be deleted",'saved_criteria_term');
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

    
    //loan_purpose
    $(document).on('ifChanged','#lp_check_box',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.loanpurpose').iCheck('check');
        } else{
            $('.loanpurpose').iCheck('uncheck');
        }
    });

    $(document).on('ifChanged','#term_check_box',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.termcheck').iCheck('check');
        } else{
            $('.termcheck').iCheck('uncheck');
        }
    });

    $(document).on('ifChanged','#interestype',function(){
        var noa= $(this).is(':checked');
        if(noa==true){
            $('.interesttype').iCheck('check');
        } else{
            $('.interesttype').iCheck('uncheck');
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
        // ShwLoadingPanel();
        $('#save_invest').val('Save Changes');
        $('#cancel_invest').hide();
        $('.cancel_back').show();
        var post_data = [];
        post_data[global_csrf_token_name]= global_csrf_token_value;

        $.ajax({
            type: "POST",
            url:base_url+"backend/investors/criteria_details_term"+'/'+main_id+'/'+criteria_id,
            cache: true,  
            dataType : 'json',
            data: post_data,
            success : function(data){ 
                // remvLoadingPanel();
                $('#eligibility_criteria_term').html('');
                $('#eligibility_criteria_term').html(data.html);
                $('.show_div_term').show();
                remove_user();
                $('.selectpicker').selectpicker();
                $('input').iCheck({ checkboxClass: 'icheckbox_minimal-blue' });

                $('input').iCheck({
                   checkboxClass: 'icheckbox_minimal-blue',
                   radioClass: 'iradio_minimal-blue'
                });

            }
        });
    }

});


$('body').on('change','#loan_prgm',function(){
    $("#term_div_update").hide();
    var loan_prgm = $(this).val();
    $("#loan_pgm_type").val(loan_prgm);

    if (loan_prgm == "BL" || loan_prgm == "JB") {
        $(".long_term_criteria_div").hide();
        $('.show_div').show();
        // $("#minimum_credit_div").hide();
    } else{
        $('.show_div').hide();
        var current_terms = $("#terms_val").val().split(',');
        
        if(loan_prgm == "ML") {
            var terms = ["12 Months","18 Months","24 Months","30 Months","36 Months"];
        } else if(loan_prgm == "RL") {
            var terms = ["3/1 Arm-30 Year Term","5/1 Arm-30 Year Term","7/1 Arm-30 Year Term","10 Year Fixed-30 Year Term","30 Year Fixed"];
        } else if(loan_prgm == "PL") {
            var terms = ["3/1 Arm-30 Year Term","5/1 Arm-30 Year Term","7/1 Arm-30 Year Term","10 Year Fixed-30 Year Term","30 Year Fixed"];
        }

        var html = '<li class="p-b-0 d-flex"> <input class="check selectall sel_all" data-checkbox="icheckbox_minimal-blue" id="term_check_box" type="checkbox"/> <label class="m-b-0" for="term_check_box">Select All</label> </li>';
        // var opt = "<option value=''>select term</option>";
        var selected  = "";
        if(terms && terms.length>0) {
            for (var i = terms.length - 1; i >= 0; i--) {
                if(jQuery.inArray(terms[i],current_terms)!== -1) {
                    selected = "checked"; 
                } else{
                    selected  = "";
                }
                html = html+'<li class="p-b-0 mt-4"> <div class="row"> <div class="col-lg-4"> <div class=" d-inline-flex align-items-center"> <input type="checkbox" name="terms[]" id="'+i+'" value="'+terms[i]+'" class="check check_box2 termcheck" data-checkbox="icheckbox_minimal-blue" '+selected+' /> <label class="m-b-0" for="'+i+'">'+ terms[i] +'</label> </div> </div> </div> </li>';


                // html = html+'<label><input type="checkbox" name="terms[]" id="" value="'+terms[i]+'" class="sel_all check_box_term mrgn_btm20" '+selected+' ><span for=""></span> '+ terms[i] +'</label><br>';
                // opt = opt+"<option value='"+terms[i]+"'>"+terms[i]+"</option>";
            }
            // $(".long_term_criteria_div").show("slow", function() {
          
            // });

            $("#term_div").html(html);
            $('input').iCheck({ checkboxClass: 'icheckbox_minimal-blue' });
            $('input').iCheck({
               checkboxClass: 'icheckbox_minimal-blue',
               radioClass: 'iradio_minimal-blue'
            });
        }
    }
});


function remove_user() {
    $.each($(".edit_account_term"), function(){            
        var id = $(this).val();
        if(id!=''){
             $("#account_id_term option[value='"+id+"']").remove();
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

        $('.propertytype').iCheck('uncheck');
        // $('.developmentphase').iCheck('uncheck');
        $('.loanpurpose').iCheck('uncheck');
        $('.sponsorrecord').iCheck('uncheck');
        $('.interesttype').iCheck('uncheck');
        $('.projectloantype').iCheck('uncheck');
        $('.sponsorcreditscore').iCheck('uncheck');
        $('.sel_all').iCheck('uncheck');

        $('#account_id').val(id);
        $('#long_user_account_id').val(id);
        $('.show_div_term').hide();
        remove_user();
        $("#criteria_id").val('');
        if(id!=''){ 
            $('.show_div_term').show();
        }
    },
}
, '#account_id_term');


$(document).on(
{
  change: function() 
  {  
    var id = $(this).val();
    //var encode_user= $('option:selected', "#account_id").attr('mytag');
    $(':input','#auto_investment_form')
     .not(':button, :submit, :reset, :hidden')
     .val('')
     .removeAttr('checked')
     .removeAttr('selected');

    $('#account_id').val(id);
    $('#long_user_account_id').val(id);
    // $('#long_account_id').val(id);
    // $('#long_user_account_id').val(id);
    $('.show_div').hide();
    remove_user();
    $("#criteria_id").val('');
    if(id!=''){ 
      $("#edit_div").hide();
      // $('.show_div').show();
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
}, '.check_box1,.check_box2,.check_box3,.check_box4,.check_box5,.check_box6,.purchase_all');

$('body').on('click','.check_box2,.check_box10,.check_box11,.check_box1,.check_box12,.check_box13,.check_box14,.check_box_term,.purchase_all,.refinance_selectall',function(e){
    // alert("in long term");
    var CBox_id = $(this).attr("id");
    if(CBox_id) {
        if ($(this).is(':checked')) {
            console.log(CBox_id);
            if($("."+CBox_id).length>0) {
                $("."+CBox_id).show( "slow" );
            }
        }else{
            if($("."+CBox_id).length>0) {
                $("."+CBox_id).hide( "slow" );
            }
        }
    }
  
});

$(document).on( {
    click: function() {   
        $('.show_div_term').hide();
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
    return('$'+formatted + ((parts) ? "." + parts[1].substr(0, 2) : ""));
};

var format_per = function(num){
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
    return(formatted+'%');
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
        $(this).val(format_per($(this).val(),2));
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

