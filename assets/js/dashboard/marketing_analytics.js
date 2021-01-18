var base_url = $("#base-url-1").val();

$(document).ready(function(){

    $.getJSON(base_url+'admin_template/assets/json/marketing_analytics.json', function(data) {
        $("#marketing-analytics-table").html(data.marketing_analytics_html);
        $('[data-toggle="tooltip"]').tooltip();

        //Investors
        $('#active_investors').html(data.active_investors);
        $('#investment_amount').html(data.total_amount_life_time);
        $('#active_individual').html(data.active_individual);
        $('#individual_amount').html(data.individual_amount);
        $('#active_institutional').html(data.active_institutional);
        $('#institutional_amount').html(data.institutional_amount);
        $('#active_foriegn').html(data.active_foriegn);
        $('#foriegn_amount').html(data.foriegn_amount);

         //Borrowers
        $('#total_borrower').html(data.total_borrower);
        $('#active_borrower').html(data.active_borrower);
        $('#borrower_amount').html(data.total_amount_life_time);
       	$('#active_borrower_amount').html(data.total_amount_life_time);
         /*$('#total_one_loans').html(data.total_one_loans);
        $('#num_two_loans').html(data.num_two_loans);
        $('#total_two_loans').html(data.total_two_loans);
        $('#num_three_loans').html(data.num_three_loans);
        $('#total_three_loans').html(data.total_three_loans);
        $('#num_four_loans').html(data.num_four_loans);
        $('#total_four_loans').html(data.total_four_loans);
        $('#num_five_loans').html(data.num_five_loans);
        $('#total_five_loans').html(data.total_five_loans);*/

        $('#total_loans_closed').html(data.total_loans_closed);
        $('#total_loans_closed_volume').html(data.total_amount_life_time);

        $('#total_loans_completed').html(data.total_loans_completed);
        $('#total_loans_completed_vloume').html(data.total_amount_completed_life_time);

        $('#total_loans_cashflowing').html(data.total_loans_cashflowing);
        $('#total_loans_cashflowing_volume').html(data.total_amount_cashflowing_life_time);

        $('#total_bridge_loans').html(data.total_bridge_loans);
        $('#total_portfolio_loans').html(data.total_pf_loans);

        $('#total_residential_loans').html(data.total_residential_loans);
        $('#total_residential_volume').html(data.total_residential_volume);

        $('#total_multifamily_loans').html(data.total_multifamily_loans);
        $('#total_multifamily_volume').html(data.total_multifamily_volume);

        $('#total_mixeduse_loans').html(data.total_mixeduse_loans);
        $('#total_mixeduse_volume').html(data.total_mixeduse_volume);

        $("#residential-asset-perc").html($('.avg_res_loan_size').html());
        $("#multifamily-asset-perc").html($('.avg_mf_loan_size').html());
        $("#mixeduse-asset-perc").html($('.avg_mu_loan_size').html());

        $('#total_residential_loans_duration').html(data.total_residential_loans_duration);
        $('#total_residential_loans_duration_volume').html(data.total_residential_loans_duration_volume);

        $('#total_multifamily_loans_duration').html(data.total_multifamily_loans_duration);
        $('#total_multifamily_loans_duration_volume').html(data.total_multifamily_loans_duration_volume);

        $('#total_mixeduse_loans_duration').html(data.total_mixeduse_loans_duration);
        $('#total_mixeduse_loans_duration_volume').html(data.total_mixeduse_loans_duration_volume);

        $("#residential-duration-perc").html($('.avg_res_loan_duration').html());
        $("#multifamily-duration-perc").html($('.avg_mf_loan_duration').html());
        $("#mixeduse-duration-perc").html($('.avg_mu_loan_duration').html());

        $('#total_extension').html(data.total_extension);
        $('#total_extension_volume').html(data.total_extension_volume);


        $('[data-toggle="tooltip"]').tooltip();
        
    });

});