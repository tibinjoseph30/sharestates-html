var base_url = $("#base-url-1").val();

$(document).ready(function(){

    $('#borrowers_div').show();
    $('#brokers_div').hide();
    $('#closing_div').hide();
    $('#denied_div').hide();
    $('#dead_div').hide();

    localStorage.clear();
    $('#borrower_select').val('0').trigger('change');
    // $('#broker_select').val('0').trigger('change');
    
    $(".borrow_tab,.broker_tab").click(function(){
    
        currtab = localStorage.getItem("currtab");  
        
        if(localStorage.getItem("order_"+currtab+"")!=null) 
        {
            gethref = $( this ).find( 'a' ).attr('href');
            
            //currtab = localStorage.getItem("currtab");
            adtag = "";
            if(currtab=="brokers_div")
            {
                starttag = "broker_";
                adtag = "_broker";
            }
            
            if(gethref=="#dollarVolumeClosed"+adtag+"") {
                id = ""+starttag+"dvc_id";
            }
            else if(gethref=="#No_OfLoansClosed"+adtag+"") {
                id = ""+starttag+"lc_id";
            }
            else if(gethref=="#revenueGenerated"+adtag+"") {
                id = ""+starttag+"r_id";
            }
            else if(gethref=="#totalApplication"+adtag+"") {
                id = ""+starttag+"ta_id";
            }
            else if(gethref=="#closingRatio"+adtag+"") {
                id = ""+starttag+"cr_id";
            }
            
            //assigning id to tables start
            $(document).ajaxSuccess(function(){ //after table data loaded successfully
            $("#"+currtab+" div "+gethref+" table.salesAnalytics").attr("id",id);
            add_classtotr(id);
            });

            
            //assigning id to tables end
            
        }
    
    });

    $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
        $("#volume_closed").html(data.volume_closed_html);
        $("#loan_closed").html(data.loan_closed_html);
        $("#revenue").html(data.revenue_html);
        $("#total_application").html(data.total_application_html);
        $("#closing_ratio").html(data.closing_ratio_html);


        $("#borrower_vol_closed").html('$'+data.borrower_vol_closed);
        $("#broker_vol_closed").html('$'+data.broker_vol_closed);

    });

    $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
        $("#borrower_closed_loans").html(data.borrower_closed_loans);
        $("#broker_closed_loans").html(data.broker_closed_loans);
    });

    $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
        $("#borrower_revenue_generated").html('$'+data.borrower_revenue_generated);
        $("#broker_revenue_generated").html('$'+data.broker_revenue_generated);
    });

    $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
        $("#borrower_application_submitted").html(data.borrower_application_submitted);
        $("#broker_application_submitted").html(data.broker_application_submitted);
    });




    $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
        
        $('[data-toggle="tooltip"]').tooltip();

        // $("#borrower_vol_closed").html('$'+data.borrower_vol_closed);
        // $("#borrower_closed_loans").html(data.borrower_closed_loans);
        // $("#borrower_revenue_generated").html('$'+data.borrower_revenue_generated);
        // $("#borrower_application_submitted").html(data.borrower_application_submitted);

        // $("#broker_vol_closed").html('$'+data.broker_vol_closed);
        // $("#broker_closed_loans").html(data.broker_closed_loans);
        // $("#broker_revenue_generated").html('$'+data.broker_revenue_generated);
        // $("#broker_application_submitted").html(data.broker_application_submitted);

        $("#total_closing").html(data.total_closing);
        $("#avg_lf_tym_ratio").html(data.avg_lf_tym_ratio);
        $("#avg_ytd_ratio").html(data.avg_ytd_ratio);
        $("#avg_quarter_ratio").html(data.avg_quarter_ratio);
        $("#avg_month_ratio").html(data.avg_month_ratio);

        $("#total_denied_count").html(data.total_denied_loans);
        $("#total_denied_loans").html(data.denied_ratio_L);
        $("#denied_ytd_ratio").html('$'+data.denied_ratio_YTD);
        $("#denied_q_ratio").html(data.denied_q_ratio);
        $("#avg_denied_ratio_m").html(data.avg_denied_ratio_m);

        $("#total_dead_count").html(data.total_dead_loans);
        $("#dead_ratio_l").html(data.dead_ratio_l);
        $("#dead_ratio_ytd").html('$'+data.ratio_Dead_ytd);
        $("#dead_ratio_q").html(data.ratio_Dead_q);
        $("#dead_ratio_t").html(data.ratio_Dead_t);

        
        $('[data-toggle="tooltip"]').tooltip();


    });
    
    $('.card_select').click(function(){ 
        var type = $(this).attr('alt'); 
        
        if(localStorage.getItem("currtab")!=null)
        {
            localStorage.setItem("currtab",type+"_div");
        }   
    
    });


    $('.borrow_tab').click(function(){ 
        var param = $(this).attr('alt');
        var main_tab = $("#borrower_select").val();

        if(main_tab == 0){

            if(param == 'volume_closed'){
                // ShwLoadingPanel();
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#volume_closed").html(data.volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
                // remvLoadingPanel();
            }

            if(param == 'loan_closed') {
                // ShwLoadingPanel();
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#loan_closed").html(data.loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
                // remvLoadingPanel();
            }

            if(param == 'revenue') {
                // ShwLoadingPanel();
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#revenue").html(data.revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
                // remvLoadingPanel();
            }

            if(param == 'application_submitted') {
                // ShwLoadingPanel();
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#total_application").html(data.total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
                // remvLoadingPanel();
            }

            if(param == 'closing_ratio') {
                // ShwLoadingPanel();
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#closing_ratio").html(data.closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
                // remvLoadingPanel();
            }
        } else if(main_tab == 1){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#volume_closed").html(data.volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#loan_closed").html(data.loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#revenue").html(data.revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#total_application").html(data.total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#closing_ratio").html(data.closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        } else if(main_tab == 2){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#volume_closed").html(data.volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#loan_closed").html(data.loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#revenue").html(data.revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#total_application").html(data.total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#closing_ratio").html(data.closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        } else if(main_tab == 3){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#volume_closed").html(data.volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#loan_closed").html(data.loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#revenue").html(data.revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#total_application").html(data.total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#closing_ratio").html(data.closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        } else if(main_tab == 4){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#volume_closed").html(data.volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#loan_closed").html(data.loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#revenue").html(data.revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#total_application").html(data.total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#closing_ratio").html(data.closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        }

    });

    $('.broker_tab').click(function(){ 
        var param = $(this).attr('alt');
        var main_tab = $("#broker_select").val();

        if(main_tab == 0){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#broker_volume_closed").html(data.broker_volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#broker_loan_closed").html(data.broker_loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#broker_revenue").html(data.broker_revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#broker_total_application").html(data.broker_total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
                    $("#broker_closing_ratio").html(data.broker_closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        } else if(main_tab == 1){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#broker_volume_closed").html(data.broker_volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#broker_loan_closed").html(data.broker_loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#broker_revenue").html(data.broker_revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#broker_total_application").html(data.broker_total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
                    $("#broker_closing_ratio").html(data.broker_closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        } else if(main_tab == 2){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#broker_volume_closed").html(data.broker_volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#broker_loan_closed").html(data.broker_loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#broker_revenue").html(data.broker_revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#broker_total_application").html(data.broker_total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
                    $("#broker_closing_ratio").html(data.broker_closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        } else if(main_tab == 3){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#broker_volume_closed").html(data.broker_volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#broker_loan_closed").html(data.broker_loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#broker_revenue").html(data.broker_revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#broker_total_application").html(data.broker_total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
                    $("#broker_closing_ratio").html(data.broker_closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        } else if(main_tab == 4){

            if(param == 'volume_closed'){
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#broker_volume_closed").html(data.broker_volume_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'loan_closed') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#broker_loan_closed").html(data.broker_loan_closed_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'revenue') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#broker_revenue").html(data.broker_revenue_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'application_submitted') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#broker_total_application").html(data.broker_total_application_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }

            if(param == 'closing_ratio') {
                $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
                    $("#broker_closing_ratio").html(data.broker_closing_ratio_html);
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        } 

    });

   

    $('.card_select').click(function(){ 
        $('.card_select').removeClass('active')
        $(this).addClass('active');
        var type = $(this).attr('alt');
        
        if(type == 'borrowers'){
            $( ".borrow_tab" ).trigger( "click" );
            $('#borrowers_div').show();

            $('#brokers_div').hide();
            $('#closing_div').hide();
            $('#denied_div').hide();
            $('#dead_div').hide();
        }

        if(type == 'brokers') {
            $( ".broker_tab" ).trigger( "click" );

            $('#brokers_div').show();

            $('#borrowers_div').hide();
            $('#closing_div').hide();
            $('#denied_div').hide();
            $('#dead_div').hide();
        }

        if(type == 'closing') {

            $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
                $("#closingconversionratio").html(data.closingconversion_html);
                $('[data-toggle="tooltip"]').tooltip();
            });


            
            $('#closing_div').show();
            $('#borrowers_div').hide();
            $('#brokers_div').hide();
            $('#denied_div').hide();
            $('#dead_div').hide();
        }

        if(type == 'denied') {

            $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
                $("#deniedfiles").html(data.denied_html);
                $('[data-toggle="tooltip"]').tooltip();
            });

            $('#denied_div').show();
            $('#borrowers_div').hide();
            $('#brokers_div').hide();
            $('#closing_div').hide();
            $('#dead_div').hide();
        }

        if(type == 'died') {

            $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
                $("#deadfiles").html(data.dead_html);
                $('[data-toggle="tooltip"]').tooltip();
            });

            $('#dead_div').show();
            $('#denied_div').hide();
            $('#borrowers_div').hide();
            $('#brokers_div').hide();
            $('#closing_div').hide();
        }
    });

    // $('.borrow_tab').click(function(){ 
    //     var param = $(this).attr('alt');

    //     if(param == 'volume_closed'){
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#volume_closed").html(data.volume_closed_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }

    //     if(param == 'loan_closed') {
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#loan_closed").html(data.loan_closed_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }

    //     if(param == 'revenue') {
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#revenue").html(data.revenue_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }

    //     if(param == 'application_submitted') {
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#total_application").html(data.total_application_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }

    //     if(param == 'closing_ratio') {
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#closing_ratio").html(data.closing_ratio_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }
    // });

    // $('.broker_tab').click(function(){ 
    //     var param = $(this).attr('alt');

    //     if(param == 'volume_closed'){
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#broker_volume_closed").html(data.broker_volume_closed_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }

    //     if(param == 'loan_closed') {
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#broker_loan_closed").html(data.broker_loan_closed_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }

    //     if(param == 'revenue') {
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#broker_revenue").html(data.broker_revenue_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }

    //     if(param == 'application_submitted') {
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#broker_total_application").html(data.broker_total_application_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }

    //     if(param == 'closing_ratio') {
    //         $.getJSON(base_url+'admin_template/assets/json/sales_analytics.json', function(data) {
    //             $("#broker_closing_ratio").html(data.broker_closing_ratio_html);
    //             $('[data-toggle="tooltip"]').tooltip();
    //         });
    //     }
    // });






    
    var table = $('#investorList').DataTable({
       "columnDefs": [{
            // "visible": false,
            // "targets": 2
            "orderable": false, "targets": 0,
            "width": "5%", "targets": 0 ,
        }],
        "order": [
            [2, 'desc'],[7, 'asc']
        ],
        "displayLength": 25,
    });


    $(".drptab a").click(function(){
        $(this).closest('ul').toggleClass('open');
    });
    // $(".drptab a").click(function(){
    //     if($(this).hasClass('active')){
    //         Tabs.toggleMobileMenu(event, this);
    //         event.preventDefault();
    //     }else{
    //         Tabs.changeTab(this.hash);
    //         event.preventDefault();
    //     }
    //     $(this).parent().removeClass('show');
    // });

    var fixOwl = function(){
        var $stage = $('.owl-stage'),
            stageW = $stage.width(),
            $el = $('.owl-item'),
            elW = 0;
        $el.each(function() {
            elW += $(this).width()+ +($(this).css("margin-right").slice(0, -2))
        });
        if ( elW > stageW ) {
            $stage.width( elW );
        };
    }
    $(".sale-analytics-slider-block").owlCarousel({
        loop:false,
        margin:5,
        dots:false,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            },
            1310:{
                items:3
            },
            1400:{
                items:3
            },
            1600:{
                items:4
            }
        },
         onInitialized: fixOwl,
        onRefreshed: fixOwl
    });

});




//adding class names without spaces for each tr (class names are first column "name") for sorting
function add_classtotr(tabcat){
    var rows;
    tables = document.getElementById(tabcat);
    rows = tables.rows;
    currtab = localStorage.getItem("currtab");
    var x = $("#"+currtab+" table#"+tabcat+" tbody tr");

    for (i = 0; i < x.length;i++) {
        
    allnames = rows[(i+1)].getElementsByTagName("td")[0].getElementsByTagName("div")[0].innerHTML.trim();
    //allnames=allnames.replace(" ", "");//remove spaces
    allnames=allnames.split(' ').join('');
    allnames=allnames.split('(').join('');
    allnames=allnames.split(')').join('');

    $( "#"+currtab+" table#"+tabcat+" tbody tr:nth-child("+(i+1)+")" ).addClass( allnames );    

    }
    arrange_rows(tabcat);  
}

//arranging sort for column "name" based on the first tab that we selected in dropdown
function arrange_rows(tabcat){
    currtab = localStorage.getItem("currtab");
    getstoredsort = JSON.parse(localStorage.getItem("order_"+currtab+""));
    var order = getstoredsort; 
    var $table = $("#"+currtab+" table#"+tabcat+" tbody");        

    for (var i = order.length; --i >= 0; ) {

        $table.prepend($table.find('.' + order[i]));
    }
    
}

//after sorting the selected tab data we are storing "names" in array
function store_sortnames(str){
    var rows;
    tables = document.getElementById(str);
    rows = tables.rows;
    currtab = localStorage.getItem("currtab");
        
    var x = $("#"+currtab+" table#"+str+" tbody tr")

    var all = [];
    for (i = 0; i < x.length;i++) {
        
    allnames = rows[(i+1)].getElementsByTagName("td")[0].getElementsByTagName("div")[0].innerHTML.trim();
    //allnames=allnames.replace(" ", "");//remove spaces
    allnames=allnames.split(' ').join('');
    allnames=allnames.split('(').join('');
    allnames=allnames.split(')').join('');
    all[i]=allnames;
        
    }   
    localStorage.setItem("order_"+currtab+"",JSON.stringify(all));//after sorting ordered names storing in storage
}


$(".selectcat").change(function(){
    currtab = $( this ).parents().eq(4).attr( "id" );
    localStorage.setItem("currtab",currtab)
    presentval = this.value;
    dataupdate(presentval,currtab);
    
    
    if(currtab=="borrowers_div")
    {
    allstrings = ["Dollar Volume Closed:dollarVolumeClosed:volume_closed","Number of Loans Closed:No_OfLoansClosed:loan_closed","Revenue Generated:revenueGenerated:revenue","Total Application Submitted:totalApplication:application_submitted","Closing Ratio:closingRatio:closing_ratio"];
    }
    else if(currtab=="brokers_div")
    {
    allstrings = ["Dollar Volume Closed:dollarVolumeClosed_broker:volume_closed","Number of Loans Closed:No_OfLoansClosed_broker:loan_closed","Revenue Generated:revenueGenerated_broker:revenue","Total Application Submitted:totalApplication_broker:application_submitted","Closing Ratio:closingRatio_broker:closing_ratio"];   
    }
    
    /*allstrings = ["Dollar Volume Closed:dollarVolumeClosed:volume_closed","Number of Loans Closed:No_OfLoansClosed:loan_closed","Revenue Generated:revenueGenerated:revenue","Total Application Submitted:totalApplication:application_submitted","Closing Ratio:closingRatio:closing_ratio"];*/
            
    split_for_f = allstrings[presentval].split(":");
    
    //check "active" class and remove for div table data
    $('#'+currtab+' div').removeClass('active show')
    
    //add "active" class to display data div
    $("#"+currtab+" #"+split_for_f[1]).addClass("active show"); 
    
    //comment this later start
    $("#"+currtab+" ul.custom-tab-primary li:nth-child(1)").attr("alt", split_for_f[2]);
    $("#"+currtab+" ul.custom-tab-primary li:nth-child(1) a").attr("href", "#"+split_for_f[1]);
    //$("#"+currtab+" ul.custom-tab-primary li:nth-child(1) a span:nth-child(2)").text(split_for_f[0]);
    
    //comment this later end
    
    //remove selected value from the array      
    allstrings.splice(presentval, 1);
    
    j = 2;
    
    for(var i=0;i<allstrings.length;i++)
    {
        splitdata = allstrings[i].split(":");
        startsfrom = parseInt(i)+2;
        
        $("#"+currtab+" ul.custom-tab-primary li:nth-child("+j+")").attr("alt", splitdata[2]);
        $("#"+currtab+" ul.custom-tab-primary li:nth-child("+j+") a").attr("href", "#"+splitdata[1]);   
        $("#"+currtab+" ul.custom-tab-primary li:nth-child("+j+") a span:nth-child(2)").text(splitdata[0]);
        j++;
    }
});
    
function dataupdate(param,currtab){ 
    starttag = "";
    if(currtab=="brokers_div"){
        starttag = "broker_";
    }

    if(param == '0'){
        $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_dollarvolumeclosed.json', function(data) {
            if(currtab=="brokers_div"){
                data.volume_closed_html = data.broker_volume_closed_html;
            }
            $("#"+starttag+"volume_closed").html(data.volume_closed_html);
            
            $(document).ajaxSuccess(function(){ //after table data loaded successfully
                $("#"+starttag+"volume_closed table.salesAnalytics").attr("id",""+starttag+"dvc_id");//assigning id to active data table for sorting
                sortTable(""+starttag+"dvc_id"); //sorting active table rows for second column(life time)
            });
            $('[data-toggle="tooltip"]').tooltip();
        });
    }

    if(param == '1') {
        // console.log('Heyyyy');
        $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_loanclosed.json', function(data) {
            if(currtab=="brokers_div"){
                data.loan_closed_html = data.broker_loan_closed_html;
            }
            $("#"+starttag+"loan_closed").html(data.loan_closed_html);
            
            $(document).ajaxSuccess(function(){ //after table data loaded successfully
            $("#"+starttag+"loan_closed table.salesAnalytics").attr("id",""+starttag+"lc_id");//assigning id to active table
            sortTable(""+starttag+"lc_id"); //sorting active table rows for second column(life time)
            });
            $('[data-toggle="tooltip"]').tooltip();
        });
    }

    if(param == '2') {
        $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_revenue.json', function(data) {
            if(currtab=="brokers_div"){
                data.revenue_html = data.broker_revenue_html;
            }
            $("#"+starttag+"revenue").html(data.revenue_html);
            
            $(document).ajaxSuccess(function(){ //after table data loaded successfully
            $("#"+starttag+"revenue table.salesAnalytics").attr("id",""+starttag+"r_id");//assigning id to active table
            sortTable(""+starttag+"r_id"); //sorting active table rows for second column(life time)
            });
            $('[data-toggle="tooltip"]').tooltip();
        });
    }

    if(param == '3') {
        $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_applicationsubmitted.json', function(data) {
            if(currtab=="brokers_div"){
                data.total_application_html = data.broker_total_application_html;
            }
            $("#"+starttag+"total_application").html(data.total_application_html);
            
            $(document).ajaxSuccess(function(){ //after table data loaded successfully
            $("#"+starttag+"total_application table.salesAnalytics").attr("id",""+starttag+"ta_id");//assigning id to active table
            sortTable(""+starttag+"ta_id"); //sorting active table rows for second column(life time)
            });
            
            
            $('[data-toggle="tooltip"]').tooltip();
        });
    }

    if(param == '4') {
        $.getJSON(base_url+'admin_template/assets/json/sa_borrowers_closingratio.json', function(data) {
            if(currtab=="brokers_div"){
                data.closing_ratio_html = data.broker_closing_ratio_html;
            }
            $("#"+starttag+"closing_ratio").html(data.closing_ratio_html);
            
            
            $(document).ajaxSuccess(function(){ //after table data loaded successfully
            $("#"+starttag+"closing_ratio table.salesAnalytics").attr("id",""+starttag+"cr_id");//assigning id to active table
            sortTable(""+starttag+"cr_id"); //sorting active table rows for second column(life time)
            });
            $('[data-toggle="tooltip"]').tooltip();
        });
    }   
}
    
function sortTable(dynidname) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(dynidname);
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[1].querySelectorAll("span");
      y = rows[i + 1].getElementsByTagName("TD")[1].querySelectorAll("span");
      //check if the two rows should switch place:
      xval = x[0].innerHTML;
      yval = y[0].innerHTML;
      if (Number(parseFloat(xval.replace(/[^\d.]/g, ''))) < Number(parseFloat(yval.replace(/[^\d.]/g, '')))) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
    }
    store_sortnames(dynidname);
}


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




