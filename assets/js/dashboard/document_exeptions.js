var base_url = $("#base-url-1").val();



var tab_type = $('ul#tab_ul li a.active').parent().attr('rel');

// var loan_buyer_type = $('#loan_buyer_type').val();
if(tab_type == 'bridge'){
    var jason_calender_url = 'admin_template/assets/json/all_sales_calender.json';
    //var jason_dashboard_url = 'admin_template/assets/json/sales_dashboard_investors.json';
    //var sub_investor_ajax = 'dashboard/loan_sales_dashboard/sub_investors_dashboard';
}else if(tab_type == 'term'){
    var jason_calender_url = 'admin_template/assets/json/all_sales_calender.json';
    //var jason_dashboard_url = 'admin_template/assets/json/sales_dashboard_investors.json';
    //var sub_investor_ajax = 'dashboard/loan_sales_dashboard/sub_investors_dashboard_term';
}


$(document).ready(function(){

    

    $("#eventCalendarDefault").eventCalendar({ 
        eventsjson: base_url + 'admin_template/assets/json/all_sales_calender.json',
    });

    $("#eventCalendarDefault_term").eventCalendar1({
        eventsjson: base_url + 'admin_template/assets/json/all_sales_term_calender.json',
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


