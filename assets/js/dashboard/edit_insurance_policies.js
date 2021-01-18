var base_url = $("#base-url-1").val();

$(document).ready(function () {
    // ScrollTab
    var tabAnchor = $('.scrlTab a');
    var tabSlider = $('.loanServicing-slider');
    tabSlider.owlCarousel({
        items: 5,
        loop: false,
        margin: 7,
        merge: true,
        dots: false,
        nav: true,
        autoWidth: true,
        responsive: {
            678: {
                mergeFit: true
            },
            1000: {
                mergeFit: false
            }
        }
    });

    $('body').find('.scrlTab li').addClass('nav-item');
    
    $(tabAnchor).click(function () {
        // alert($(this).attr('href'));
        $(this).tab('show');
        $(this).addClass('active');
        $(tabAnchor).not(this).removeClass("active")
    });
    // ScrollTab 

    $(".drptab a").click(function () {
        $(this).closest('ul').toggleClass('open');
    });

    $(".drptab a").click(function () {
        if ($(this).hasClass('active')) {
            Tabs.toggleMobileMenu(event, this);
            event.preventDefault();
        } else {
            Tabs.changeTab(this.hash);
            event.preventDefault();
        }
        $(this).parent().removeClass('show');
    });

    // Delegation toggle tab mobile view

    $('[data-toggle="tooltip"]').tooltip();

    var fixOwl = function () {
        var $stage = $('.owl-stage'),
            stageW = $stage.width(),
            $el = $('.owl-item'),
            elW = 0;
        $el.each(function () {
            elW += $(this).width() + +($(this).css("margin-right").slice(0, -2))
        });
        if (elW > stageW) {
            $stage.width(elW);
        };
    }

    // tooltip color changes
    function changeTooltipColorTo(color) {
        $('.tooltip-inner').css({ "color": color, "border-color": color, "box-shadow": "0 2px 4px 0 rgba(0,0,0,0.10)" });
        $('<style type="text/css">.tooltip.bs-tooltip-auto[x-placement^=left] .arrow::before, .tooltip.tooltip.bs-tooltip-left .arrow::before {border-right-color: ' + color + '; border-top-color: ' + color + '}</style>').appendTo($('head'));
    };

    function changeTooltiptextColorTo(textcolor) {
        $('.tooltip-inner').css({ "color": textcolor });
    };
    
    $('[data-toggle="tooltip"]').tooltip();

    $('.tooltip-primary').hover(function () {
        changeTooltipColorTo('#ccc')
    });
    $('.tooltip-primary').hover(function () {
        changeTooltiptextColorTo('#2e5788')
    });
    $('.tooltip-danger').hover(function () {
        changeTooltipColorTo('#de1919')
    });

    var project_id = $('#project_id').val();
    insurance(project_id);

});

function insurance(project_id, msg){
    ShwLoadingPanel(); 
    var project_id   = project_id;
    var post_data    = {project_id:project_id};
    $('.insurance_alert').hide();
    post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        url: base_url + "dashboard/insurance_dashboard/edit_insurance_ajax",
        type: "POST",
        data:post_data,
        success: function(response){
            remvLoadingPanel();
            var response = $.parseJSON(response);
            $("#insurance_form").html(response.insurance_form_html);
            $('input').iCheck({
                checkboxClass: 'icheckbox_minimal-blue',
                radioClass: 'iradio_minimal-blue'
            });
            $('[data-toggle="tooltip"]').tooltip();
            $('#hazard_date').datepicker();
            $('#flood_date').datepicker();
            $("#hazard_broker").selectpicker('refresh');
            $("#flood_broker").selectpicker('refresh');
            if(msg=='1'){
                $('.insurance_alert').show();
                $('html, body').animate({
                    scrollTop: $('.insurance_div').offset().top - 20
                }, 'slow');
            }
        }
    });
}


$(document).on('ifChanged', '#check_na1', function(event){
     $(this).closest('div .row').find('input[type=text]').val('N/A').prop('readonly',true);
      if($(this).prop('checked')== true){    
        $(this).closest('div .row').find('input[type=text]').val('N/A').prop('readonly',true);
      }else{
        $(this).closest('div .row').find('input[type=text]').val('').prop('readonly',false);
      }
});

$(document).on('ifChanged', '#check_na12', function(event){
     $(this).closest('div .row').find('input[type=text]').val('N/A').prop('readonly',true);
      if($(this).prop('checked')== true){    
        $(this).closest('div .row').find('input[type=text]').val('N/A').prop('readonly',true);
      }else{
        $(this).closest('div .row').find('input[type=text]').val('').prop('readonly',false);
      }
});

$('body').on('ifChanged', '.hazard_required', function(){
    var str1 = $(this).val();
    if(str1=='Y'){
        $(".hazard_required_td").show();
    }else{
        $(".hazard_required_td").hide();
    }
});

$('body').on('ifChanged', '.flood_required', function(){
    var str3 = $(this).val();
    if(str3=='Y'){
        $(".flood_required_td").show();
    }else{
        $(".flood_required_td").hide();
    }
});

$(document).on('change','#hazard_broker',function(){ 
    if($(this).val() != ''){
        var post_data = {insurance_id:$(this).val()};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        // ShwLoadingPanel();
        $.ajax({
            type: "POST",
            dataType:"json",
            data:post_data,
            url: base_url+'dashboard/insurance_dashboard/get_company_details',
            success:function(response){
                if(response.status = true){
                    $('#insurance_hazard_name').val(response.company_details.insurance_first_name+' '+response.company_details.insurance_last_name);
                    $('#insurance_hazard_phone').val(response.company_details.insurance_phone);
                    $('#insurance_hazard_grade').html(response.company_details.grade);
                    $('#hazard_grade_div').removeClass('hide');
                    
                }
            }
        });
    } else {
        $('#hazard_grade_div').addClass('hide');
    }
});

$(document).on('change','#flood_broker',function(){
    if($(this).val() != ''){
        var post_data = {insurance_id:$(this).val()};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        // ShwLoadingPanel();
        $.ajax({
            type: "POST",
            dataType:"json",
            data:post_data,
            url: base_url+'dashboard/insurance_dashboard/get_company_details',
            success:function(response){
                if(response.status = true){
                    $('#insurance_flood_name').val(response.company_details.insurance_first_name+' '+response.company_details.insurance_last_name);
                    $('#insurance_flood_phone').val(response.company_details.insurance_phone);
                    $('#insurance_flood_grade').html(response.company_details.grade);
                    $('#flood_grade_div').removeClass('hide');
                }
            }
        });

    } else{
        $('#flood_grade_div').addClass('hide');
    }
});

$(document).on('click','#save_insurance',function(e){ 
    e.preventDefault();
    var dev_project_id = $("#dev_project_id").val();
    var post_data = new FormData($('#insurance-form')[0]);
    post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type:"POST",
        dataType:"json",
        data:post_data,
        processData:false,
        contentType: false,
        cache: false,
        url:base_url+"dashboard/insurance_dashboard/save_insurance",
        success:function(res){
            window.location.replace(base_url + "dashboard/insurance_dashboard/edit_insurance/"+dev_project_id);
            // insurance(res.project_id,'1');
        }
    });
});

$(document).on('click','#cancel_insurance',function(e){ 
    e.preventDefault();
    window.location.replace(base_url + "dashboard/insurance_dashboard");
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

// Active - Inactive
$("#hazard-cancel-form").validate({
    onkeyup: false,
    ignore : false,
    rules: {
        inactive_reason:{required:true},
    },
    messages: {
        inactive_reason:{required:"Reason For Cancellation is required"},

    },
    errorPlacement: function(error, element) {
        if(element.attr("name") == 'lenders_state'){
            error.insertAfter(element.parent("div").parent("div"));
        }else{
            error.insertAfter(element); 
        }
    }
});

$(document).on('click','#cancel_hazard',function(){
    $("#hazard-cancel-form")[0].reset();
    var form_valid = $("#hazard-cancel-form").validate();
        form_valid.resetForm();
    var insurance_id = $(this).attr('data-insurance');
    var hazard_status = $(this).attr('data-h_status');
    $(".cancel-hazard-modal").modal('show');
    $(".cancel-hazard-modal").find('#insurance_id').val(insurance_id);
    $(".cancel-hazard-modal").find('#hazard_status').val(hazard_status);
});

$(document).on('click','#cancel-hazard-subt',function(){
    var project_id = $('#project_id').val();
    var form_valid = $("#hazard-cancel-form").valid();
    if(form_valid == true){
        $.post(base_url+'dashboard/insurance_dashboard/change_hazard_insurance_status',$("#hazard-cancel-form").serialize(),function(response){
            var response = $.parseJSON(response);
            if(response.status == true){
                $(".cancel-hazard-modal").modal('hide');
                insurance(project_id);
                swal("Updated!", "Hazard Insurance updated successfully.", "success");
            }else{
                swal("Cancelled", "Hazard Insurance is could not be updated", "error");
            }
        });
    }else{

    }
});

$("#flood-cancel-form").validate({
    onkeyup: false,
    ignore : false,
    rules: {
        inactive_reason:{required:true},
    },
    messages: {
        inactive_reason:{required:"Reason For Cancellation is required"},

    },
    errorPlacement: function(error, element) {
        if(element.attr("name") == 'lenders_state'){
            error.insertAfter(element.parent("div").parent("div"));
        }else{
            error.insertAfter(element); 
        }
    }
});

$(document).on('click','#cancel_flood',function(){
    $("#flood-cancel-form")[0].reset();
    var form_valid = $("#flood-cancel-form").validate();
        form_valid.resetForm();
    var insurance_id = $(this).attr('data-insurance');
    var flood_status = $(this).attr('data-f_status');
    $(".cancel-flood-modal").modal('show');
    $(".cancel-flood-modal").find('#insurance_id').val(insurance_id);
    $(".cancel-flood-modal").find('#flood_status').val(flood_status);
});

$(document).on('click','#cancel-flood-subt',function(){
    var project_id = $('#project_id').val();
    var form_valid = $("#flood-cancel-form").valid();
    if(form_valid == true){
        $.post(base_url+'dashboard/insurance_dashboard/change_flood_insurance_status',$("#flood-cancel-form").serialize(),function(response){
            var response = $.parseJSON(response);
            if(response.status == true){
                $(".cancel-flood-modal").modal('hide');
                insurance(project_id);
                swal("Updated!", "flood Insurance updated successfully.", "success");
            }else{
                swal("Cancelled", "flood Insurance is could not be updated", "error");
            }
        });
    }else{

    }
});

$("#fp-form").validate({
    onkeyup: false,
    ignore : false,
    rules: {
        fp_reason:{required:true},
        hazard_broker_fp:{required:true},
        insurance_hazard_name_fp:{required:true},
        insurance_hazard_phone_fp:{required:true},
    },
    messages: {
        fp_reason:{required:"Reason For Force Place"},
        hazard_broker_fp:{required:"Select a Broker"},
        insurance_hazard_name_fp:{required:"Name is required"},
        insurance_hazard_phone_fp:{required:"Phone Number is required"},

    },
    errorPlacement: function(error, element) {
        if(element.attr("name") == 'hazard_broker'){
            error.insertAfter(element.parent("div"));
        }else{
            error.insertAfter(element); 
        }
    }
});

$(document).on('click','#fp_hazard',function(){
    $("#fp-form")[0].reset();
    var insurance_id = $(this).attr('data-insurance');
    var hazard_status = $(this).attr('data-h_status');
    $(".fp-hazard-modal").modal('show');
    $(".fp-hazard-modal").find('#insurance_id').val(insurance_id);
});

$(document).on('click','#save-fp',function(){
    var project_id = $('#project_id').val();
    var form_valid = $("#fp-form").valid();
    if(form_valid == true){
        $.post(base_url+'dashboard/insurance_dashboard/hazard_force_place_policies',$("#fp-form").serialize(),function(response){
            var response = $.parseJSON(response);
            if(response.status == true){
                $(".fp-hazard-modal").modal('hide');
                insurance(project_id);
                swal("Updated!", "Insurance updated successfully.", "success");
            }else{
                swal("Cancelled", "Insurance is could not be updated", "error");
            }
        });
    }else{

    }
});

$(document).on('change','#hazard_broker_fp',function(){ 
    if($(this).val() != ''){
        var post_data = {insurance_id:$(this).val()};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        // ShwLoadingPanel();
        $.ajax({
            type: "POST",
            dataType:"json",
            data:post_data,
            url: base_url+'dashboard/insurance_dashboard/get_company_details',
            success:function(response){
                if(response.status = true){
                    $('#insurance_hazard_name_fp').val(response.company_details.insurance_first_name+' '+response.company_details.insurance_last_name);
                    $('#insurance_hazard_phone_fp').val(response.company_details.insurance_phone);
                }
            }
        });
    } else {
        $('#hazard_grade_div').addClass('hide');
    }
});

$("#fp-form-flood").validate({
    onkeyup: false,
    ignore : false,
    rules: {
        fp_reason_flood:{required:true},
        flood_broker_fp:{required:true},
        insurance_flood_name_fp:{required:true},
        insurance_flood_phone_fp:{required:true},
    },
    messages: {
        fp_reason_flood:{required:"Reason For Force Place"},
        flood_broker_fp:{required:"Select a Broker"},
        insurance_flood_name_fp:{required:"Name is required"},
        insurance_flood_phone_fp:{required:"Phone Number is required"},

    },
    errorPlacement: function(error, element) {
        if(element.attr("name") == 'hazard_broker'){
            error.insertAfter(element.parent("div"));
        }else{
            error.insertAfter(element); 
        }
    }
});

$(document).on('click','#fp_flood',function(){
    $("#fp-form-flood")[0].reset();
    var insurance_id = $(this).attr('data-insurance');
    var hazard_status = $(this).attr('data-h_status');
    $(".fp-flood-modal").modal('show');
    $(".fp-flood-modal").find('#insurance_id').val(insurance_id);
});

$(document).on('click','#save-flood-fp',function(){
    var project_id = $('#project_id').val();
    var form_valid = $("#fp-form-flood").valid();
    if(form_valid == true){
        $.post(base_url+'dashboard/insurance_dashboard/flood_force_place_policies',$("#fp-form-flood").serialize(),function(response){
            var response = $.parseJSON(response);
            if(response.status == true){
                $(".fp-flood-modal").modal('hide');
                insurance(project_id);
                swal("Updated!", "Insurance updated successfully.", "success");
            }else{
                swal("Cancelled", "Insurance is could not be updated", "error");
            }
        });
    }else{

    }
});

$(document).on('change','#flood_broker_fp',function(){ 
    if($(this).val() != ''){
        var post_data = {insurance_id:$(this).val()};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        // ShwLoadingPanel();
        $.ajax({
            type: "POST",
            dataType:"json",
            data:post_data,
            url: base_url+'dashboard/insurance_dashboard/get_company_details',
            success:function(response){
                if(response.status = true){
                    $('#insurance_flood_name_fp').val(response.company_details.insurance_first_name+' '+response.company_details.insurance_last_name);
                    $('#insurance_flood_phone_fp').val(response.company_details.insurance_phone);
                }
            }
        });
    } else {
        $('#hazard_grade_div').addClass('hide');
    }
});



$('.datepicker').datepicker();

// auto col width adjust
var winWidth = $(window).width();
var cardColumn = $('.wap-select');
var coLength = $('.wap-select').length;
var newWidth = $('.auto-col').width() / coLength
function listenWidth(e) {

    if (winWidth > 768) {
        $('.auto-col').each(
            function () {
                if (coLength > 1) {
                    cardColumn.width(newWidth)
                };
            }
        );
    }
};
$(window).ready(listenWidth);
$(window).resize(listenWidth);
$(window).resize(function () {
    // console.log(newWidth);
});

// Date Picker
jQuery('.mydatepicker, #datepicker').datepicker({
    autoclose: true,
    todayHighlight: true
});
jQuery('.input-daterange input').each(function () {
    $(this).datepicker('clearDates');
});
$("body").on("click", "#btn", function () {

    $("#pendingStatus").modal("show");
    var parentHolder = $(this).parent('td');

    parentHolder.addClass("after_modal_appended");

    //appending modal background inside the blue div
    $('.modal-backdrop').appendTo(parentHolder);

    //remove the padding right and modal-open class from the body tag which bootstrap adds when a modal is shown

    $('body').removeClass("modal-open")
    $('body').css("padding-right", "");
});

$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
});




var ShwPnl = false;
function ShwLoadingPanel(){
    if(!ShwPnl){
        var lDPnl = jQuery(document.createElement('div'))
        lDPnl.attr("id","loadingPnl");    
        lDPnl.attr("class","animsition-loading");    
        lDPnl.css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px").css("opacity",0);
        lDPnl.css("background","url("+base_url+"images/ajax-loader.gif) no-repeat center rgba(255, 255, 255, 0.4)").css("position","fixed").css("left","0px").css("top","0px").css("z-index","10000"); 
        jQuery(lDPnl).appendTo("body");
        lDPnl.fadeTo(550, 1);
        ShwPnl = true;
    }else
        jQuery("#loadingPnl").fadeIn(550);
}
        
function remvLoadingPanel(){
    jQuery("#loadingPnl").fadeOut(100);
}