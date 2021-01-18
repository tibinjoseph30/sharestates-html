$(function() {

      var base_url =  $("#base-url-1").val();
      $.getJSON(base_url+'admin_template/assets/js/dashboard/closing_dashboard.json', function(data) {
            $('#closing_dashboard').html(data.html);
            $('#total_investors').html(data.total_investors);
            $('#active_investors').html(data.active_investors);
            $('#investment_amount').html(data.total_amount_life_time);
            $('#total_individual').html(data.total_individual);
            $('#active_individual').html(data.active_individual);
            $('#individual_amount').html(data.individual_amount);
            $('#total_institutional').html(data.total_institutional);
            $('#active_institutional').html(data.active_institutional);
            $('#institutional_amount').html(data.institutional_amount);
            $('#total_foriegn').html(data.total_foriegn);
            $('#active_foriegn').html(data.active_foriegn);
            $('#foriegn_amount').html(data.foriegn_amount);

            //Borrowers
            $('#total_borrower').html(data.total_borrower);
            $('#active_borrower').html(data.active_borrower);
            $('#active_borrower2').html(data.active_borrower);
            $('#borrower_amount').html(data.total_amount_life_time);
            $('#num_one_loans').html(data.num_one_loans);
            $('#new_borrowers').html(data.num_one_loans);
            $('#total_one_loans').html(data.total_one_loans);
            $('#num_two_loans').html(data.num_two_loans);
            $('#total_two_loans').html(data.total_two_loans);
            $('#num_three_loans').html(data.num_three_loans);
            $('#total_three_loans').html(data.total_three_loans);
            $('#num_four_loans').html(data.num_four_loans);
            $('#total_four_loans').html(data.total_four_loans);
            $('#num_five_loans').html(data.num_five_loans);
            $('#total_five_loans').html(data.total_five_loans);

            //Vendors
            $('#total_vendors').html(data.total_vendors);
            $('#active_vendors').html(data.active_vendors);
            $('#total_brokers').html(data.total_brokers);
            $('#total_appraiser').html(data.total_appraiser);
            $('#total_title_company').html(data.total_title_company);
            $('#total_bank_attorney').html(data.total_bank_attorney);
            $('#total_foreclosure').html(data.total_foreclosure);
            $('#total_settlement_agent').html(data.total_settlement_agent);

            $('#life_time').html(data.total_amount_life_time.replace('$',''));
            $('#year_to_date').html(data.total_amount_YTD.replace('$',''));

            $('#total_loans_closed').html(data.total_loans_closed);
            $('#total_loans_closed_volume').html(data.total_amount_life_time);

            $('#purchase_loans_count').html(data.purchase_loans_count);
            $('#purchase_loans_volume').html(data.purchase_loans_volume);
            $('#purchase_loans_per').html(data.purchase_loans_per);
            $('#purchase_loans_width').css('width',data.purchase_loans_per);

            $('#refinance_loans_count').html(data.refinance_loans_count);
            $('#refinance_loans_volume').html(data.refinance_loans_volume);
            $('#refinance_loans_per').html(data.refinance_loans_per);
            $('#refinance_loans_width').css('width',data.refinance_loans_per);

            $('#ss_origination_count').html(data.ss_origination_count);
            $('#ss_origination_volume').html(data.ss_origination_volume);
            $('#broker_origin_count').html(data.broker_origin_count);
            $('#broker_origin_volume').html(data.broker_origin_volume);

            $('#capital_deployed_indi').html(data.capital_deployed_indi);
            $('#capital_deployed_inst').html(data.capital_deployed_inst);
            $('#capital_deployed_whole').html(data.capital_deployed_whole);
            $('#capital_deployed_whole_per').html(data.capital_deployed_whole_per);
            $('#whole_per').css('width',data.capital_deployed_whole_per);
            $('#capital_deployed_fractional').html(data.capital_deployed_fractional);
            $('#capital_deployed_fractional_per').html(data.capital_deployed_fractional_per);
            $('#fractional_per').css('width',data.capital_deployed_fractional_per);

            $('#lft_capital_deployed_indi').html(data.LFT_capital_deployed_indi);
            $('#lft_capital_deployed_inst').html(data.LFT_capital_deployed_inst);
            $('#lft_capital_deployed_whole').html(data.LFT_capital_deployed_whole);
            $('#lft_capital_deployed_whole_per').html(data.LFT_capital_deployed_whole_per);
            $('#lft_whole_per').css('width',data.LFT_capital_deployed_whole_per);
            $('#lft_capital_deployed_fractional').html(data.LFT_capital_deployed_fractional);
            $('#lft_capital_deployed_fractional_per').html(data.LFT_capital_deployed_fractional_per);
            $('#lft_fractional_per').css('width',data.LFT_capital_deployed_fractional_per);

            $('#repeat_borrowers').html(data.repeat_borrowers);

      });

});

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
