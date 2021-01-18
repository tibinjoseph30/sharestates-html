var base_url = $("#base-url-1").val();
$(document).ready(function(){

    $('#investment_accountsModal').on('shown.bs.modal', function () {
        $('[data-toggle="tooltip"]').tooltip();   
    });

    $("#date_of_birth_joint").datepicker({
       todayHighlight: true,
       endDate: '-18y', 
       startDate: '01/01/1950',
       autoclose : true ,
       default : 'MM/DD/YYYY' 
    });

    $("#date_of_formation_entity").datepicker({
        startDate: '01/01/1950',
        autoclose : true ,
        default : 'MM/DD/YYYY', 
        endDate: "+0d"
    });
    $("#date_of_formation_trust").datepicker({
        startDate: '01/01/1950',
        autoclose : true ,
        default : 'MM/DD/YYYY', 
        endDate: "+0d"
    });


    var actype     = $("#account_type").val();
    if (actype == 'E'){
        $("#entity_account").show();
        $("#joint_account").hide();
        $("#trust_account").hide();
    } else if(actype == 'J'){
        $("#joint_account").show();
        $("#entity_account").hide();
        $("#trust_account").hide();
    } else if(actype == 'T'){
        $("#trust_account").show();
        $("#entity_account").hide();
        $("#joint_account").hide();
    }


    $("#account_type").change(function () {
        var actype     = $("#account_type").val();
        if (actype == 'E'){
            $("#entity_account").show();
            $("#joint_account").hide();
            $("#trust_account").hide();
        } else if(actype == 'J'){
            $("#joint_account").show();
            $("#entity_account").hide();
            $("#trust_account").hide();
        } else if(actype == 'T'){
            $("#trust_account").show();
            $("#entity_account").hide();
            $("#joint_account").hide();
        }
    });

    $(document).on('focus','#e_entityAddress',function(e){ 
        // console.log(1);
        initAutocomplete();
    });

    $('#e_EIN').keypress(function () {
        $("#e_EIN").mask("99-9999999");
    });

    $("#e_EIN").change(function(){
        var va = $(this).val();
        $("#e_EIN_hid").val(va);
    });

    $("#e_EIN").focusin(function(){
        var val1 = $("#e_EIN_hid").val();
        $(this).val('');
    });

   $("#e_EIN").blur(function(){
        var val1 = $("#e_EIN_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = val1.replace(/./gi, "*"); 
        if(hidden.length > 10) hidden = hidden.substring(0,10);
            $(this).val(hidden);
    });


   $('#tax_id').keypress(function () {
        $("#tax_id").mask("99-9999999");
    });

    $("#tax_id").change(function(){
        var va = $(this).val();
        $("#taxid_hid").val(va);
    });

    $("#tax_id").focusin(function(){
        var val1 = $("#taxid_hid").val();
        $(this).val('');
    });

   $("#tax_id").blur(function(){
        var val1 = $("#taxid_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = val1.replace(/./gi, "*"); 
        if(hidden.length > 10) hidden = hidden.substring(0,10);
            $(this).val(hidden);
    });
   


    $('#j_userSSN2').keypress(function () {
        $("#j_userSSN2").mask("999-99-99999");
    });

    $("#j_userSSN2").change(function(){
        var va = $(this).val();
        $("#j_userSSN2_hid").val(va);
    });

    $("#j_userSSN2").focusin(function(){
        var val1 = $("#j_userSSN2_hid").val();
        $(this).val('');
    });
  
    $("#j_userSSN2").blur(function(){
        var val1 = $("#j_userSSN2_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = val1.replace(/./gi, "*"); 
        if(hidden.length > 11) hidden = hidden.substring(0,11);
            $(this).val(hidden);
    });

    $('#t_userSSN').keypress(function () {
        $("#t_userSSN").mask("999-99-99999");
    });

    $("#t_userSSN").change(function(){
        var va = $(this).val();
        $("#t_userSSN_hid").val(va);
    });
    
    $("#t_userSSN").focusin(function(){
        var val1 = $("#t_userSSN_hid").val();
        $(this).val('');
    });

    $("#t_userSSN").blur(function(){
     
        var val1 = $("#t_userSSN_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = val1.replace(/./gi, "*"); 
        if(hidden.length > 11) hidden = hidden.substring(0,11);
            $(this).val(hidden);
        if(val1!=''){
            //$("#t_userein").prop('disabled',true);
            $("#t_userein").val('');
            $("#t_userein_hid").val('');
            $("#truct_ein_error").html('');
        }
       
    });



    $('#t_userein').keypress(function () {
        $("#t_userein").mask("99-9999999");
    });

    $("#t_userein").change(function(){
        var va = $(this).val();
        $("#t_userein_hid").val(va);
    });


    $("#t_userein").focusin(function(){
        var val1 = $("#t_userein_hid").val();
        $(this).val('');
       
    });

    $("#t_userein").blur(function(){
        var val1 = $("#t_userein_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = val1.replace(/./gi, "*"); 
        if(hidden.length > 10) hidden = hidden.substring(0,10);
            $(this).val(hidden);
        if(val1!=''){
            // $("#t_userSSN").prop('disabled',true);
            $("#t_userSSN").val('');
            $("#t_userSSN_hid").val('');
            $("#truct_ein_error").html('');
        }
       
    });


    $("#e_entityAddress").keypress(function(){
        initAutocomplete();
    });

    $("#j_jointAddress1").keypress(function(){
        initAutocomplete();
    });

    $("#t_trustAddress").keypress(function(){
        initAutocomplete();
    });


    $("#form_master_sub").validate({
        onkeyup: false,
        // ignore : false,
        ignore:":not(:visible)",
        rules: {
            account_type:{required:true},

            e_entityType:{required:true},
            e_entityName:{required:true},
            e_useremail:{required:true},
            e_EIN:{required:true},
            tax_id:{required:true},
            e_entityAddress:{required:true},
            e_userCity:{required:true},
            e_state_foreign:{required:true},
            e_state:{required:true},
            e_userZipcode:{
                required:true,
                validate_zip_code:true,
                number: true,
                maxlength: 5,
                minlength:5
            },
            e_entityPhone:{
                required:true,
                phonecheck: true
            },


            joint_ac_type:{required:true},
            j_useremail:{required:true},
            j_jointName2:{required:true},
            j_jointAddress1:{required:true},
            j_userCity2:{required:true},
            j_state_foreign:{required:true},
            j_state2:{required:true},
            j_userZipcode2:{
                required:true,
                validate_zip_code:true,
                number: true,
                maxlength: 5,
                minlength:5
            },
            j_jointPhone2:{
                required:true,
                phonecheck: true
            },
            j_userSSN2:{required:true},


            t_trustName:{required:true},
            t_usermail:{required:true},
            t_trustName:{required:true},
            t_juri:{required:true},
            t_trustAddress:{required:true},
            t_userCity:{required:true},
            t_state_foreign:{required:true},
            t_state:{required:true},
            t_userZipcode:{
                required:true,
                validate_zip_code:true,
                number: true,
                maxlength: 5,
                minlength:5
            },
            t_trustPhone:{
                required:true,
                phonecheck: true
            },
            

        },
        messages: {
            account_type:{required:"This field is required"},

            e_entityType:{required:"This field is required"},
            e_entityName:{required:"This field is required"},
            e_useremail:{required:"This field is required"},
            e_EIN:{required:"This field is required"},
            tax_id:{required:"This field is required"},
            e_entityAddress:{required:"This field is required"},
            e_userCity:{required:"This field is required"},
            e_state_foreign:{required:"This field is required"},
            e_state:{required:"This field is required"},
            e_userZipcode:{
                required:"Zip Code is required",
                validate_zip_code: "Please enter a valid Zip Code.",
                number: "Zip Code should contains numbers Only.,",
                minlength:"Zip Code should be in 5 digits."
            },
            e_entityPhone:{
                required:"This field is required",
                phonecheck:"Phone number is invalid",
            },

            joint_ac_type:{required:"This field is required"},
            j_useremail:{required:"This field is required"},
            j_jointName2:{required:"This field is required"},
            j_jointAddress1:{required:"This field is required"},
            j_userCity2:{required:"This field is required"},
            j_state_foreign:{required:"This field is required"},
            j_state2:{required:"This field is required"},
            j_userZipcode2:{
                required:"Zip Code is required",
                validate_zip_code: "Please enter a valid Zip Code.",
                number: "Zip Code should contains numbers Only.,",
                minlength:"Zip Code should be in 5 digits."
            },
            j_jointPhone2:{
                required:"This field is required",
                phonecheck:"Phone number is invalid",
            },
            j_userSSN2:{required:"This field is required"},

            t_trustName:{required:"This field is required"},
            t_usermail:{required:"This field is required"},
            t_trustName:{required:"This field is required"},
            t_juri:{required:"This field is required"},
            t_trustAddress:{required:"This field is required"},
            t_userCity:{required:"This field is required"},
            t_state_foreign:{required:"This field is required"},
            t_state:{required:"This field is required"},
            t_userZipcode:{
                required:"Zip Code is required",
                validate_zip_code: "Please enter a valid Zip Code.",
                number: "Zip Code should contains numbers Only.,",
                minlength:"Zip Code should be in 5 digits."
            },
            t_trustPhone:{
                required:"This field is required",
                phonecheck:"Phone number is invalid",
            },
            
        },
        errorPlacement: function(error, element) {
            if(element.is('select') ||(element.attr("name") == 'eo_date'))
                error.insertAfter(element.parent());
            else
                error.insertAfter(element);
        }
    });

    $.validator.addMethod("phonecheck", function(value, element) {

        if(value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
            return true;
        else
            return false;
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



});
