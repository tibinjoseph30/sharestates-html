var base_url = $("#base-url-1").val();
$(document).ready(function(){

alert('hai');


var myDataTable =  $('#distribution-table-list').DataTable({
        "dom": '<<t>p>',
        "aLengthMenu":false,
        "paging":   true,
        "bLengthChange": true,
        "pageLength": 10,
        'bAutoWidth': false ,
        "drawCallback": function( settings ) {
            var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate'); 
            pagination.toggle(this.api().page.info().pages > 1);
        },
        "oLanguage": {
           //"sProcessing": "Loading products...",
            //"sLengthMenu": "_MENU_"
         },
        bInfo: false,
        responsive: {
            details: {
                type: 'column'
            }
        },

        order: [0, 'desc' ],
        "processing": true,
        "serverSide": true,
        //"ajax": window.location.href,
        "ajax": {
            "url": base_url+'backend/distribution_details/ajax_distribution_list',
            "type": "GET",
          
            "data": function(d){

            //for Each loop code
/*$.each(d, function(index,value,list) { 
  alert(JSON.stringify(value)); //if you want to alert each object then use
  //data will not be accessible inside $.each you can access the same using 3rd parameter which list
  alert(JSON.stringify(list));
})*/

            	console.log(d);
            }
        },
        "targets": [ 0 ],
        "columns": [    
                       

                     
                        { "data": "no"},
                        { "data": "parent_name"},
                        { "data": "account_type","orderable": false},    
                        { "data": "distribution_amount"},     

                         { "data": "parent_distribution_amount"}, 
                        { "data": "reinvested_amount"}, 
                         { "data": "cash_out_amount"}, 

                         { "data": "bank_account"}, 
                         { "data": "bank_account_number"}, 

                         { "data": "paper_check"}, 

                          { "data": "date"}, 

                           { "data": "note"}, 

                        { 


                           data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){
                                actions = '<a href="'+base_url+'backend/investor_broker/add/'+data.user_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> ';
                                actions += '<a href="'+base_url+'backend/investor_broker/funding_source/'+data.user_id+'" title="Funding Source"> <i class="fa fa-briefcase"></i> </a> ';
                                actions += '<a href="'+base_url+'backend/investor_broker/commission/'+data.user_id+'" title="Commission Settings/Add Investors"> <i class="fa fa-usd"></i> </a> ';
                                actions += '<a href="'+base_url+'backend/brokers/payments/'+data.user_id+'" title="Commissions" class="icon-Investor"> <img src="'+base_url+'images/icons/payments.png"></i> </a> ';
                                actions += '<a href="'+base_url+'backend/investor_broker/transactions/'+data.user_id+'" title="Transaction History" class="icon-Investor"> <img src="'+base_url+'images/icons/distributions.png"> </a> ';
                                actions += '<a href="'+base_url+'backend/investor_broker/monthly_report/'+data.user_id+'" title="Monthly Report" class="icon-Investor"> <img src="'+base_url+'images/icons/survey.png"> </a> ';
                                return  actions;                               
                          
                        }




                    }                        
                    ],


    });

    });