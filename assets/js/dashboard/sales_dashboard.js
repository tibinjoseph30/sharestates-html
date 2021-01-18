var base_url = $("#base-url-1").val();



var tab_type = $('ul#tab_ul li a.active').parent().attr('rel');



// var loan_buyer_type = $('#loan_buyer_type').val();
if(tab_type == 'bridge'){
    var jason_calender_url = 'admin_template/assets/json/sales_calender.json';
    var jason_dashboard_url = 'admin_template/assets/json/sales_dashboard_investors.json';
    var sub_investor_ajax = 'dashboard/loan_sales_dashboard/sub_investors_dashboard';
}else if(tab_type == 'term'){
    var jason_calender_url = 'admin_template/assets/json/sales_term_calender.json';
    var jason_dashboard_url = 'admin_template/assets/json/sales_dashboard_term_investors.json';
    var sub_investor_ajax = 'dashboard/loan_sales_dashboard/sub_investors_dashboard_term';
}


$(document).ready(function(){

    var month = $('#month_sel').val();
    if(month == 0){
        var header_month = 'Janaury';
    } else if(month == 1){
        var header_month = 'February';
    } else if(month == 2){
        var header_month = 'March';
    } else if(month == 3){
        var header_month = 'April';
    } else if(month == 4){
        var header_month = 'May';
    } else if(month == 5){
        var header_month = 'June';
    } else if(month == 6){
        var header_month = 'July';
    } else if(month == 7){
        var header_month = 'August';
    } else if(month == 8){
        var header_month = 'September';
    } else if(month == 9){
        var header_month = 'October';
    } else if(month == 10){
        var header_month = 'November';
    } else if(month == 11){
        var header_month = 'December';
    }
    $('#header_month').html('<b>Projects With Loan Sale Date in '+header_month+'</b>');

    var loan_buyer_type = $('#loan_buyer_type').val();
    if(loan_buyer_type == 'bridge'){
        get_total_info_term();
    }

    $("#eventCalendarDefault").eventCalendar({
        eventsjson: base_url + 'admin_template/assets/json/sales_calender.json',
    });

    $("#eventCalendarDefault_term").eventCalendar1({
        eventsjson: base_url + 'admin_template/assets/json/sales_term_calender.json',
    });

    $("#loansaledashbord").click(function(){
        $.getJSON(base_url + 'admin_template/assets/json/sales_dashboard_investors.json' , function(data) {
            $('#loanSaleDashboard').html(data.html);
            $('#total_loans_closed').html(data.total_loans_closed);
            $('#total_amount_life_time').html(data.total_amount_life_time);
            $('#active_institutional').html(data.active_institutional);
            $('#institutional_amount').html(data.institutional_amount);
            $('[data-toggle="tooltip"]').tooltip();
        });
    });

    $("#term_loansaledashbord").click(function(){
        $.getJSON(base_url + 'admin_template/assets/json/sales_dashboard_term_investors.json' , function(data) {
            $('#termloanSaleDashboard').html(data.html);
            $('#term_total_loans_closed').html(data.total_loans_closed);
            $('#term_total_amount_life_time').html(data.total_amount_life_time);
            $('#term_active_institutional').html(data.active_institutional);
            $('#term_institutional_amount').html(data.institutional_amount);
            $('[data-toggle="tooltip"]').tooltip();
        });
    });

    var stable = $('#loanSalecalendar').DataTable({
       "columnDefs": [{
            // "visible": false,
            // "targets": 2
            "orderable": true, "targets": 0,
            "width": "5%", "targets": 0 ,
            "orderable": false, "targets": 0,
        }],
        



        "displayLength": 10,
        "dom":"<t>",
    });

    // Add event listener for opening and closing details
    $('#loanSalecalendar tbody').on('click', 'td.link_tapes', function () {
        var tr = $(this).closest('tr');
        var row = stable.row( tr );
        var id = $(this).data('id');
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            var post_data = {userid:id};
            post_data[global_csrf_token_name]= global_csrf_token_value;
            $.ajax({
                type: 'POST',
                url: base_url + 'dashboard/loan_sales_dashboard/view_tapes_ajax',
                data: post_data,
                dataType: "json",
                success: function (response) {
                    row.child(response.loans).show();
                    tr.addClass('shown');
                }
            });
        }
    } );

    var ttable ='';
    $("#term_loansalecalender").click(function(){
        var userid = '14238';
        var post_data = {userid:userid};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'dashboard/loan_sales_dashboard/term_loan_buyers_ajax',
            data: post_data,
            dataType: "json",
            success: function (response) {
               $('#term_loan_Sale_calendar').html(response.tape_list);

                ttable = $('#termloanSalecalendar').DataTable({
                   "columnDefs": [{
                        // "visible": false,
                        // "targets": 2
                        "orderable": true, "targets": 0,
                        "width": "5%", "targets": 0 ,
                        "orderable": false, "targets": 0,
                    }],
                    "displayLength": 10,
                    "dom":"<t>",
                });
            }
        });

        $("#eventCalendarDefault_term").eventCalendar1({
            eventsjson: base_url + 'admin_template/assets/json/sales_term_calender.json',
        });

        gettotalinfoterm('','');


    });

    $('body').on('click', 'td.term_link_tapes', function () {
        var tr = $(this).closest('tr');
        var row = ttable.row( tr );
        var id = $(this).data('id');

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            var post_data = {userid:id};
            post_data[global_csrf_token_name]= global_csrf_token_value;
            $.ajax({
                type: 'POST',
                url: base_url + 'dashboard/loan_sales_dashboard/view_tapes_term_ajax',
                data: post_data,
                dataType: "json",
                success: function (response) {
                    row.child(response.loans).show();
                    tr.addClass('shown');
                }
            });
        }
    } );
    
    $("#loansalecalender").click(function(){
        $("#eventCalendarDefault").eventCalendar({
            eventsjson: base_url + 'admin_template/assets/json/sales_calender.json',
        });
    });

    function get_total_info_term(){
        $.getJSON(base_url+'admin_template/assets/json/sales_dashboard_investors.json', function(data) {
            var total_invested_loans = data.total_invested_loans
            var data = data.pie;
            var data_v = [];
            $.each(data.M_perc_parent,function(k, asset){ 
                // console.log(k);

                if(k == 'Peter Raith'){
                    var pname = 'LRML';
                } else{
                    var pname = k;
                }

                if ( k in data.sub_perc){
                    // $.each(data.sub_perc[k],function(p, sub){
                        // console.log(data.sub_perc_amt[k][p]);
                        // data_v.push({name: p, y: sub, color: '#3f8ce4'});
                        // data_v +='<li> '+p+': '+data.sub_perc_amt[k][p]+' and '+sub+' % </li>'
                    // });
                    if(asset != 0){
                        data_v.push({name: pname, y: asset}); 
                    }
                }else if(k!="NO"){ 
                    if(asset != 0){
                        data_v.push({name: pname, y: asset}); 
                    }
                } else {
                    if(asset != 0){
                        data_v.push({name: "Platform", y: asset}); 
                    }
                }
            });


            var data_value = [];
            $.each(data_v,function(key1, asset1){
                if(asset1.name != 'Platform'){
                    data_value.push({name: asset1.name, y: asset1.y}); 
                } 
            });

            $.each(data_v,function(key2, asset2){
                if(asset2.name == 'Platform'){
                    data_value.push({name: asset2.name, y: asset2.y}); 
                } 
            });


            $('#container-35').highcharts({
                colors: ['#3f8ce4', '#fe9d1e', '#f4284a', '#716aca', '#1f4e85', '#36c8fe', '#34bf5b', '#f46e01', '#b900fe','#64E572'],
                chart: {
                          type: 'pie',
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
                                    text: '<span style="font-weight:bold; color:#1a2942; font-size:35px;">'+total_invested_loans+'</span>' + '<br>Total<br>' + 'Invested Loans',
                                    align: 'center',
                                    verticalAlign: 'middle',
                                     x: -132,
                                    y: -10,
                                    style: {
                                        color: '#a7aab1',
                                        fontSize:'17px'
                                    },
                                });
                                $(chart.series[0].data).each(function (j, seriesitem) {
                                   $('<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + this.y + '</span></div></div>').click(function () {
                                    seriesitem.visible ? seriesitem.hide() : seriesitem.show();
                                }).appendTo('#items');
                            });
                            }
                          }
                        },
                      x:20,
                credits:{enabled: false},

                title:{text: null},
                plotOptions: {
                          pie: {
                            shadow: false,
                            showInLegend: true,
                            dataLabels: {
                                enabled: false
                            },
                              legend: {
                                 position: 'right'
                              },
                            width:'100%',
                            innerSize: '90%',
                          }
                        },
                tooltip: {
                            formatter: function() {
                                return '<b>' + this.point.name + '</b>:' + this.y+'%';
                            }
                        },

                legend: {
                    enabled: true,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    useHTML: true,
                            width: 250,
                    itemMarginBottom: 5,     
                    labelFormatter: function() {
                        return '<div style="text-align: left; width:160px;float:left;color:'+this.color+'">' + this.name + '</div><div style="width:40px; margin-right:5px; float:left;text-align:right;color:#f00;color:'+this.color+'">' + this.y + '%</div>';
                    }
                },
                series: [{
                            innerSize: '85%',
                            data: data_value
                        }]
            });
        });
    }

    function gettotalinfoterm(month, year){
        var id = $(this).data('id');
        var post_data = {month:month, year:year};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        // $('#container-35').append('<div id="loadingPnl"></div>');
        // $(".chart-loader").parent().css('display','table');

        $('#container-40').html('<div class="chart-loader"><span>Loading... </span><img src="'+baseURL+'images/loading36.gif" /></div>');
        $.ajax({
            type: 'POST',
            url: base_url + 'dashboard/loan_sales_dashboard/salesdashboardinvestors',
            data: post_data,
            dataType: "json",
            success: function (response) {
                // console.log(response);

                var total_invested_loans = response.total_invested_loans
                var data = response.pie;
                var data_v = [];
                $.each(data.M_perc_parent,function(k, asset){ 
                    // console.log(k);

                    if(k == 'Peter Raith'){
                        var pname = 'LRML';
                    } else{
                        var pname = k;
                    }

                    if ( k in data.sub_perc){
                        // $.each(data.sub_perc[k],function(p, sub){
                            // console.log(data.sub_perc_amt[k][p]);
                            // data_v.push({name: p, y: sub, color: '#3f8ce4'});
                            // data_v +='<li> '+p+': '+data.sub_perc_amt[k][p]+' and '+sub+' % </li>'
                        // });
                        if(asset != 0){
                            data_v.push({name: pname, y: asset}); 
                        }
                    }else if(k!="NO"){ 
                        if(asset != 0){
                            data_v.push({name: pname, y: asset}); 
                        }
                    } else {
                        if(asset != 0){
                            data_v.push({name: "Platform", y: asset}); 
                        }
                    }
                });
                var data_value = [];
                $.each(data_v,function(key1, asset1){
                    if(asset1.name != 'Platform'){
                        data_value.push({name: asset1.name, y: asset1.y}); 
                    } 
                });

                $.each(data_v,function(key2, asset2){
                    if(asset2.name == 'Platform'){
                        data_value.push({name: asset2.name, y: asset2.y}); 
                    } 
                });
                $('#container-40').html('');
                $('#container-40').highcharts({
                    colors: ['#3f8ce4', '#fe9d1e', '#f4284a', '#716aca', '#1f4e85', '#36c8fe', '#34bf5b', '#f46e01', '#b900fe','#64E572'],
                    chart: {
                              type: 'pie',
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
                                        text: '<span style="font-weight:bold; color:#1a2942; font-size:35px;">'+total_invested_loans+'</span>' + '<br>Total<br>' + 'Invested Loans',
                                        align: 'center',
                                        verticalAlign: 'middle',
                                         x: -132,
                                        y: -10,
                                        style: {
                                            color: '#a7aab1',
                                            fontSize:'17px'
                                        },
                                    });
                                    $(chart.series[0].data).each(function (j, seriesitem) {
                                       $('<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + this.y + '</span></div></div>').click(function () {
                                        seriesitem.visible ? seriesitem.hide() : seriesitem.show();
                                    }).appendTo('#items');
                                });
                                }
                              }
                            },
                          x:20,
                    credits:{enabled: false},

                    title:{text: null},
                    plotOptions: {
                              pie: {
                                shadow: false,
                                showInLegend: true,
                                dataLabels: {
                                    enabled: false
                                },
                                  legend: {
                                     position: 'right'
                                  },
                                width:'100%',
                                innerSize: '90%',
                              }
                            },
                    tooltip: {
                                formatter: function() {
                                    return '<b>' + this.point.name + '</b>:' + this.y+'%';
                                }
                            },

                    legend: {
                        enabled: true,
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        useHTML: true,
                                width: 250,
                        itemMarginBottom: 5,     
                        labelFormatter: function() {
                            return '<div style="text-align: left; width:160px;float:left;color:'+this.color+'">' + this.name + '</div><div style="width:40px; margin-right:5px; float:left;text-align:right;color:#f00;color:'+this.color+'">' + this.y + '%</div>';
                        }
                    },
                    series: [{
                                innerSize: '85%',
                                data: data_value
                            }]
                });
            }
        });
    }

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

    // $('[data-toggle="tooltip"]').tooltip();
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

    $(".loanSale-slider-block").owlCarousel({
        loop:false,
        margin:5,
        dots:false,
        nav:true,
        //autoWidth:true,
        items:4,
        responsive:{
            0:{
                items:1
            },
            500:{
                items:2
            },
            1300:{
                items:2
            },
            1400:{
                items:3
            },
             1600:{
                items:3
            }
        },
         onInitialized: fixOwl,
        onRefreshed: fixOwl
    });

});

$('body').on("click","#loan_sale_ytd", function(){ 
    var inv = $("#project_withYTD  a:first").data('alt');
    $(".item>a").removeClass('active');
    $("#project_withYTD  a:first").addClass('active');

    ShwLoadingPanel()
    var post_data = {userid:inv};
    post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type: 'POST',
        url: base_url + 'dashboard/loan_sales_dashboard/investors_ytd_percentage',
        data: post_data,
        dataType: "json",
        success: function (response) {
            // response.get_ytd_volume.sort();
            // response.get_ytd_volume.sort(function(a, b){return a - b});

            /*var ytd_html='';
            $.each(response.get_ytd_volume, function(key, event) {
                var name = key;
                if(key=='PrimeMeridian'){
                    name = 'Prime Meridian';
                } else if(key =='SmithGraham'){
                    name = 'Smith Graham';
                }else if(key =='SmithGraham'){
                    name = 'Smith Graham';
                }
                
                ytd_html +=''

            });*/

            $('#ytd_volume_per').html(response.ytd_html);
            $('#inv_head').html(response.owl_html);
            
            $('.button-list-slider-block').owlCarousel('destroy');
            $('.button-list-slider-block').owlCarousel({
                margin:10,
                nav:true,
                autoWidth: true,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:5
                    }
                }
            })

            var item =[];
            item.push($('#inv_head a').first().data('alt'));
            $('#inv_head a').first().toggleClass('active');
            get_inv_ytd(item);
            remvLoadingPanel()
        }
    });
});

$('body').on("click",".item>a", function(){
    $(this).toggleClass('active');
    var item =[];
    $( "#inv_head a" ).each(function( index ) {
        if($( this ).hasClass('active')){
            item.push($(this ).data('alt'));  
        }
    });
    get_inv_ytd(item);
});

function get_inv_ytd(item){
    ShwLoadingPanel()
    var post_data = {item};
    post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type: 'POST',
        url: base_url + 'dashboard/loan_sales_dashboard/investors_ytd',
        data: post_data,
        dataType: "json",
        success: function (response) {
            remvLoadingPanel()
            $(function () {
                $('#loanSale_YTD').highcharts({
                    chart: {
                        backgroundColor: null,
                        plotBackgroundColor: null,
                        type: 'area',
                    },
                    legend: {
                        labelFormatter: function() {
                            return '<div style="text-align: left; width:160px;float:left;color:'+this.color+'">' + this.name+'</div>';
                        }   
                    },

                    xAxis: {
                        // categories: ['Months', 'January', 'February', 'March', 'April', 'May', 'June','July'],
                        // categories: response.inv_keys,
                        gridLineWidth: .5,
                        gridLineColor: '#4f77a8',
                        lineWidth: 1,
                        tickWthth: 0,
                        tickLength: 0,
                        lineColor:'#5078a8',
                        crosshair: {
                            width: 0,
                            color: "#47a17a",
                        },
                        labels: {
                            style: {
                                color: '#77a2d5'
                            }
                        },
                        min:Date.UTC(response.year, 0, 0),
                        max:Date.UTC(response.year, response.month-1, 0),
                        allowDecimals: false,
                        type           : 'datetime',
                        tickInterval   : 24 * 3600 * 1000*30, //one day
                    },
                    yAxis: {
                        // tickInterval: 100000,
                        gridLineWidth: 0.5,
                        gridLineColor: '#4f77a8',
                        lineColor:'#5078a8',
                        lineWidth: 1,
                        title: {                
                            text: null
                        },
                        labels: {
                            style: {
                                color: '#77a2d5'
                            },
                            formatter: function () {
                                return '$'+million_conversion(this.value);
                            }
                        }
                    },
                    title: {
                        text: null,
                        align: 'left',
                        style: {
                            fontSize:'13px',
                            color: '#fff',  
                        }    
                    },
                    credits: {
                       enabled: false,
                    },
                    tooltip: {
                        borderWidth: 1,
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        formatter: function () {
                            return this.series.name + '<br/>' +
                                '<b>' +'$'+million_conversion(this.y) + '</b>';
                        },
                        style: {
                            color: this.color
                        }
                    },
                    plotOptions: {
                        series: {
                            fillOpacity: 0.1,
                            pointStart: Date.UTC(response.year, 0, 0),
                            pointInterval   : 24 * 3600 * 1000*30
                        }
                    },
                    series: response.inv_values
                });
            });
        }
    });
}

$('body').on("click",".investor_parent", function(){
    var id = $(this).data('id');
    var post_data = {userid:id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + sub_investor_ajax,
            data: post_data,
            dataType: "json",
            success: function (response) {
                $('#show_details'+id).html(response.html);
            }
        });
    
});

$('body').on("click",".link_tapes123", function(){
    var id = $(this).data('id');
    var post_data = {userid:id};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type: 'POST',
            url: base_url + 'dashboard/loan_sales_dashboard/view_tapes_ajax',
            data: post_data,
            dataType: "json",
            success: function (response) {
                $('.tr_'+id).after(response.loans);
                //$('#show-tapes'+id).html(response.loans);
                // $('.view_loan_table').DataTable();
            }
        });
    
});


$('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
});

function million_conversion (labelValue){
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));
}

$('#calendar-container div').datepicker(
   'setDates', [new Date(2019, 2, 4), new Date(2019, 2, 6),  new Date(2019, 2, 7), new Date(2019, 2, 11), new Date(2019, 2, 13), new Date(2019, 2, 14)],{
    weekStart: 1,
    todayBtn: true,
    multidate: true,
    multidateSeparator: false,
    keyboardNavigation: false,
    forceParse: false,
    //daysOfWeekDisabled: "3",
    todayHighlight: true,
});

var ShwPnl = false;
function ShwLoadingPanel(){
    if(!ShwPnl){
        var lDPnl = jQuery(document.createElement('div'))
        lDPnl.attr("id","loadingPnl");    
        lDPnl.attr("class","animsition-loading");    
        lDPnl.css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px").css("opacity",0);
        lDPnl.css("background","url("+baseURL+"images/ajax-loader.gif) no-repeat center rgba(255, 255, 255, 0.4)").css("position","fixed").css("left","0px").css("top","0px").css("z-index","10000"); 
        jQuery(lDPnl).appendTo("body");
        lDPnl.fadeTo(550, 1);
        ShwPnl = true;
    }else
        jQuery("#loadingPnl").fadeIn(550);
}
        
function remvLoadingPanel(){
    jQuery("#loadingPnl").fadeOut(100);
}

// change number to number format
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

$("#total_unsold_loans").click(function(){
    ShwLoadingPanel();
    $.getJSON(base_url+'admin_template/assets/json/sales_calender.json', function(data) {
        var html = '';
        $.each(data, function(key, event) {
            html +='<tr><td>'+event.title+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td><td>$'+number_format(event.loanamt, 2)+'</td><td>'+event.plan_popup+'</td></tr>';
        
        });
        remvLoadingPanel();
        $('#unsold_loan_body').html(html);

        if ( ! $.fn.DataTable.isDataTable( '#unsold_loan_table' ) ) {
            var table = $('#unsold_loan_table').DataTable({
                "columnDefs": [{
                    // "visible": false,
                    // "targets": 2
                    "orderable": false, "targets": 0,
                    "width": "5%", "targets": 0 ,
                }],
                "order": [
                       [2, 'desc'],[1, 'asc']
                ],
                "bFilter": false,
                "bInfo": false,
                "bLengthChange": false,
                "displayLength": 10,
            });
        }
        
    });
});

$("#total_unallocated_loans").click(function(){
    ShwLoadingPanel();
    $.getJSON(base_url+'admin_template/assets/json/sales_calender.json', function(data) {
        var html1 = '';
        $.each(data, function(key, event) {
            if((event.colorCode != '') && (event.sale_type == 'tobeallocated')){


                html1 +='<tr><td>'+event.title+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td><td>$'+number_format(event.loanamt, 2)+'</td><td>'+event.plan_popup+'</td></tr>';
            }
        
        });
        // console.log(html1);
        remvLoadingPanel();
        $('#unallocatedloans').html(html1);
        if ( ! $.fn.DataTable.isDataTable( '#unallocated_table' ) ) {
            var table1 = $('#unallocated_table').DataTable({
                "columnDefs": [{
                    // "visible": false,
                    // "targets": 2
                    "orderable": false, "targets": 0,
                    "width": "5%", "targets": 0 ,
                }],
                "order": [
                       [2, 'desc'],[1, 'asc']
                ],
                "bFilter": false,
                "bInfo": false,
                "bLengthChange": false,
                "displayLength": 10,
            });
        }

    });
});

$("#allocatedloans").click(function(){
    ShwLoadingPanel();
    $.getJSON(base_url+'admin_template/assets/json/sales_calender.json', function(data) {
        var html2 = '';
        $.each(data, function(key, event) {
            if(event.sale_type != 'tobeallocated'){
                // console.log(event);
                html2 +='<tr><td>'+event.title+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td><td>$'+number_format(event.loanamt, 2)+'</td><td>'+event.plan_popup+'</td></tr>';
            }
        
        });
        remvLoadingPanel();
        // console.log(html1);
        $('#allocatedloanstbody').html(html2);

        if ( ! $.fn.DataTable.isDataTable( '#allocated_loan_table' ) ) {
            var table2 = $('#allocated_loan_table').DataTable({
                "columnDefs": [{
                    // "visible": false,
                    // "targets": 2
                    "orderable": false, "targets": 0,
                    "width": "5%", "targets": 0 ,
                }],
                "order": [
                       [2, 'desc'],[1, 'asc']
                ],
                "bFilter": false,
                "bInfo": false,
                "bLengthChange": false,
                "displayLength": 10,
            });
        }

    });
});

$("#term_total_unsold_loans").click(function(){
    ShwLoadingPanel();
    $.getJSON(base_url+'admin_template/assets/json/sales_term_calender.json', function(data) {
        var html = '';
        $.each(data, function(key, event) {
            html +='<tr><td>'+event.title+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td><td>$'+number_format(event.loanamt, 2)+'</td><td>'+event.plan_popup+'</td></tr>';
        
        });
        remvLoadingPanel();
        $('#term_unsold_loan_body').html(html);

        if ( ! $.fn.DataTable.isDataTable( '#term_unsold_loan_table' ) ) {
            var table = $('#term_unsold_loan_table').DataTable({
                "columnDefs": [{
                    // "visible": false,
                    // "targets": 2
                    "orderable": false, "targets": 0,
                    "width": "5%", "targets": 0 ,
                }],
                "order": [
                       [2, 'desc'],[1, 'asc']
                ],
                "bFilter": false,
                "bInfo": false,
                "bLengthChange": false,
                "displayLength": 10,
            });
        }
        
    });
});

$("#term_total_unallocated_loans").click(function(){
    ShwLoadingPanel();
    $.getJSON(base_url+'admin_template/assets/json/sales_term_calender.json', function(data) {
        var html1 = '';
        $.each(data, function(key, event) {
            if((event.colorCode != '') && (event.sale_type == 'tobeallocated')){


                html1 +='<tr><td>'+event.title+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td><td>$'+number_format(event.loanamt, 2)+'</td><td>'+event.plan_popup+'</td></tr>';
            }
        
        });
        // console.log(html1);
        remvLoadingPanel();
        $('#term_unallocatedloans').html(html1);
        if ( ! $.fn.DataTable.isDataTable( '#term_unallocated_table' ) ) {
            var table1 = $('#term_unallocated_table').DataTable({
                "columnDefs": [{
                    // "visible": false,
                    // "targets": 2
                    "orderable": false, "targets": 0,
                    "width": "5%", "targets": 0 ,
                }],
                "order": [
                       [2, 'desc'],[1, 'asc']
                ],
                "bFilter": false,
                "bInfo": false,
                "bLengthChange": false,
                "displayLength": 10,
            });
        }

    });
});

$("#term_allocatedloans").click(function(){
    ShwLoadingPanel();
    $.getJSON(base_url+'admin_template/assets/json/sales_term_calender.json', function(data) {
        var html2 = '';
        $.each(data, function(key, event) {
            if(event.sale_type != 'tobeallocated'){
                // console.log(event);
                html2 +='<tr><td>'+event.title+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td><td>$'+number_format(event.loanamt, 2)+'</td><td>'+event.plan_popup+'</td></tr>';
            }
        
        });
        remvLoadingPanel();
        // console.log(html1);
        $('#term_allocatedloanstbody').html(html2);

        if ( ! $.fn.DataTable.isDataTable( '#term_allocated_loan_table' ) ) {
            var table2 = $('#term_allocated_loan_table').DataTable({
                "columnDefs": [{
                    // "visible": false,
                    // "targets": 2
                    "orderable": false, "targets": 0,
                    "width": "5%", "targets": 0 ,
                }],
                "order": [
                       [2, 'desc'],[1, 'asc']
                ],
                "bFilter": false,
                "bInfo": false,
                "bLengthChange": false,
                "displayLength": 10,
            });
        }

    });
});
