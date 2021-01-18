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
        // alert($(this).attr('href'));
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

    get_all_policies('A');
});

$(document).on('click','#all_policies',function(){
    get_all_policies('A');
});

$(document).on('click','#allpolicies_h',function(){
    get_all_policies('H');
});

$(document).on('click','#allpolicies_f',function(){
    get_all_policies('F');
});

$(document).on('click','#expired_tab',function(){
    get_expired_policies('A');
});

$(document).on('click','#expired_hazard',function(){
    get_expired_policies('H');
});

$(document).on('click','#expired_flood',function(){
    get_expired_policies('F');
});

$(document).on('click','#completed_tab',function(){
    get_completed_policies('A');
});

$(document).on('click','#completed_hazard',function(){
    get_completed_policies('H');
});

$(document).on('click','#completed_flood',function(){
    get_completed_policies('F');
});

$(document).on('click','#missing_tab',function(){
    get_missing_policies('A');
});

$(document).on('click','#missing_hazard',function(){
    get_missing_policies('H');
});

$(document).on('click','#missing_flood',function(){
    get_missing_policies('F');
});

$(document).on('click','#expire_60_tab',function(){
    get_expired_60_policies('A');
});

$(document).on('click','#expire_60_hazard',function(){
    get_expired_60_policies('H');
});

$(document).on('click','#expire_60_flood',function(){
    get_expired_60_policies('F');
});

$(document).on('click','#expire_45_tab',function(){
    get_expired_45_policies('A');
});

$(document).on('click','#expire_45_hazard',function(){
    get_expired_45_policies('H');
});

$(document).on('click','#expire_45_flood',function(){
    get_expired_45_policies('F');
});

$(document).on('click','#expire_15_tab',function(){
    get_expired_15_policies('A');
});

$(document).on('click','#expire_15_hazard',function(){
    get_expired_15_policies('H');
});

$(document).on('click','#expire_15_flood',function(){
    get_expired_15_policies('F');
});

$(document).on('click','#fp_tab',function(){
    get_fp_policies('A');
});

$(document).on('click','#fp_hazard',function(){
    get_fp_policies('H');
});

$(document).on('click','#fp_flood',function(){
    get_fp_policies('F');
});

$(document).on('click','#cancelled_tab',function(){
    get_cancelled_policies('A');
});

$(document).on('click','#cancelled_hazard',function(){
    get_cancelled_policies('H');
});

$(document).on('click','#cancelled_flood',function(){
    get_cancelled_policies('F');
});

function get_all_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_all_policies',
        success:function(result){
            remvLoadingPanel();
            $("#allpolicies").html(result.all_policies_html);
        }
    });
}

function get_expired_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_expired_policies',
        success:function(result){
            remvLoadingPanel();
            $("#expiredpolicies").html(result.expired_policies_html);
        }
    });
}

function get_completed_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_completed_policies',
        success:function(result){
            remvLoadingPanel();
            $("#completedpolicies").html(result.completed_policies_html);
        }
    });
}

function get_missing_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_missing_policies',
        success:function(result){
            remvLoadingPanel();
            $("#missingpolicies").html(result.missing_policies_html);
        }
    });
}

function get_expired_60_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_expired_60_policies',
        success:function(result){
            remvLoadingPanel();
            $("#expired60policies").html(result.expired_60_policies_html);
        }
    });
}

function get_expired_45_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_expired_45_policies',
        success:function(result){
            remvLoadingPanel();
            $("#expired45policies").html(result.expired_45_policies_html);
        }
    });
}

function get_expired_15_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_expired_15_policies',
        success:function(result){
            remvLoadingPanel();
            $("#expired15policies").html(result.expired_15_policies_html);
        }
    });
}

function get_fp_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_fc_policies',
        success:function(result){
            remvLoadingPanel();
            $("#fcpolicies").html(result.fc_policies_html);
        }
    });
}

function get_cancelled_policies(type = ''){
    var postData    = {type:type};
    postData[global_csrf_token_name]= global_csrf_token_value;
    ShwLoadingPanel();
    $.ajax({
        type: "POST",
        dataType:"json",
        data:postData,
        url: base_url+'dashboard/insurance_dashboard/get_cancelled_policies',
        success:function(result){
            remvLoadingPanel();
            $("#cancelledpolicieshtml").html(result.cancelled_policies_html);
        }
    });
}

$(document).on('click','#view_cancel',function(){
    var insurance_id = $(this).attr('data-id');
    var ext_loan_no = $(this).attr('data-ext');
    var reason = $(this).attr('data-reason');
    $(".cancel-view-modal").find('#myLargeModalLabel').html('Reason for Cancel Insurance - '+ ext_loan_no);
    $(".cancel-view-modal").find('#inactive_reason').val(reason);
    $(".cancel-view-modal").modal('show');
    /*$(".cancel-view-modal").find('#insurance_id').val(insurance_id);
    $(".cancel-view-modal").find('#hazard_status').val(hazard_status);*/
});

$("#hazardcancel-form").validate({
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

$(document).on('click','.cancel_hazard',function(){
    $("#hazardcancel-form")[0].reset();
    var form_valid = $("#hazardcancel-form").validate();
        form_valid.resetForm();

    var insurance_id = $(this).attr('data-insurance');
    var hazard_status = $(this).attr('data-h_status');
    var ext_loan_no = $(this).attr('data-ext');
    $(".cancelhazard-modal").find('#myLabel').html('Reason for Cancel Insurance - '+ ext_loan_no);
    $(".cancelhazard-modal").find('#insurance_id').val(insurance_id);
    $(".cancelhazard-modal").find('#hazard_status').val(hazard_status);
    $(".cancelhazard-modal").modal('show');
});

$(document).on('click','#cancelhazard-subt',function(){
    var project_id = $('#project_id').val();
    var form_valid = $("#hazardcancel-form").valid();
    if(form_valid == true){
        $.post(base_url+'dashboard/insurance_dashboard/change_hazard_insurance_status',$("#hazardcancel-form").serialize(),function(response){
            var response = $.parseJSON(response);
            if(response.status == true){
                $(".cancelhazard-modal").modal('hide');
                swal("Updated!", "Hazard Insurance updated successfully.", "success");
            }else{
                swal("Cancelled", "Hazard Insurance is could not be updated", "error");
            }
        });
    }else{

    }
});

$("#floodcancel-form").validate({
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

$(document).on('click','.cancel_flood',function(){
    $("#floodcancel-form")[0].reset();
    var form_valid = $("#floodcancel-form").validate();
        form_valid.resetForm();

    var insurance_id = $(this).attr('data-insurance');
    var flood_status = $(this).attr('data-f_status');
    var ext_loan_no = $(this).attr('data-ext');
    $(".cancelflood-modal").find('#myLabel1').html('Reason for Cancel Insurance - '+ ext_loan_no);
    $(".cancelflood-modal").find('#insurance_id').val(insurance_id);
    $(".cancelflood-modal").find('#flood_status').val(flood_status);
    $(".cancelflood-modal").modal('show');
});

$(document).on('click','#cancelhazard-subt',function(){
    var project_id = $('#project_id').val();
    var form_valid = $("#floodcancel-form").valid();
    if(form_valid == true){
        $.post(base_url+'dashboard/insurance_dashboard/change_flood_insurance_status',$("#floodcancel-form").serialize(),function(response){
            var response = $.parseJSON(response);
            if(response.status == true){
                $(".cancelflood-modal").modal('hide');
                swal("Updated!", "flood Insurance updated successfully.", "success");
            }else{
                swal("Cancelled", "flood Insurance is could not be updated", "error");
            }
        });
    }else{

    }
});

$('#export_allpolicies').on('click',function(){
    var type        = $('#type').val();
    var search      = $('#allpolicies-search-input').val();
    window.location.href = base_url + "dashboard/insurance_dashboard/export_allpolicies?search="+search+"&type="+type;
});

$('#export_completed').on('click',function(){
    var type        = $('#c_type').val();
    var search      = $('#completedpolicies-search').val();
    window.location.href = base_url + "dashboard/insurance_dashboard/export_completed?search="+search+"&type="+type;
});

$('#export_missing').on('click',function(){
    var type        = $('#type_m').val();
    var search      = $('#missingpolicies-search').val();
    window.location.href = base_url + "dashboard/insurance_dashboard/export_missing?search="+search+"&type="+type;
});

$('#export_60').on('click',function(){
    var type        = $('#type_60').val();
    var search      = $('#expired60policies-search').val();
    var expire_in   = '60';
    window.location.href = base_url + "dashboard/insurance_dashboard/export_between?search="+search+"&type="+type+"&expire_in="+expire_in;
});

$('#export_45').on('click',function(){
    var type        = $('#type_45').val();
    var search      = $('#expired45policies-search').val();
    var expire_in   = '45';
    window.location.href = base_url + "dashboard/insurance_dashboard/export_between?search="+search+"&type="+type+"&expire_in="+expire_in;
});

$('#export_15').on('click',function(){
    var type        = $('#type_15').val();
    var search      = $('#expired15policies-search').val();
    var expire_in   = '15';
    window.location.href = base_url + "dashboard/insurance_dashboard/export_between?search="+search+"&type="+type+"&expire_in="+expire_in;
});

$('#export_expired').on('click',function(){
    var type        = $('#type_e').val();
    var search      = $('#expiredpolicies-search').val();
    window.location.href = base_url + "dashboard/insurance_dashboard/export_expired?search="+search+"&type="+type;
});

$('#export_forced').on('click',function(){
    var type        = $('#type_fp').val();
    var search      = $('#fcpolicies-search').val();
    window.location.href = base_url + "dashboard/insurance_dashboard/export_forced?search="+search+"&type="+type;
});

$('#export_cancel').on('click',function(){
    var type        = $('#type_c').val();
    var search      = $('#cancelledpolicies-search').val();
    window.location.href = base_url + "dashboard/insurance_dashboard/export_cancel?search="+search+"&type="+type;
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