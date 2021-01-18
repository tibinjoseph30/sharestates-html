var base_url = $("#base-url-1").val();
$(document).ready(function(){

	//investor broker data table list
	var myDataTable =  $('#investor-broker-table-list').DataTable({
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
            "url": base_url+'backend/investor_broker/ajax_investor_broker_list',
            "type": "GET",
            "data": function(d){
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { data: "user_id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "name"},
                        { "data": "user_email"},
                        { "data": "user_phone","orderable": false},    
                        { "data": "user_zip_code"},                    
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){
                                actions = '<a href="'+base_url+'backend/investor_broker/add/'+data.user_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> ';
                                actions += '<a href="'+base_url+'backend/investor_broker/funding_source/'+data.user_id+'" title="Funding Source"> <i class="fa fa-briefcase"></i> </a> ';
                                actions += '<a href="'+base_url+'backend/brokers/commission/'+data.user_id+'" title="Commission Settings/Add Investors"> <i class="fa fa-usd"></i> </a> ';
                               // actions += '<a href="'+base_url+'backend/brokers/payments/'+data.user_id+'" title="Commissions" class="icon-Investor"> <img src="'+base_url+'images/icons/payments.png"></i> </a> ';
                               // actions += '<a href="'+base_url+'backend/brokers/transactions/'+data.user_id+'" title="Transaction History" class="icon-Investor"> <img src="'+base_url+'images/icons/distributions.png"> </a> ';
                                actions += '<a href="'+base_url+'backend/brokers/monthly_report/'+data.user_id+'" title="Monthly Report" class="icon-Investor"> <img src="'+base_url+'images/icons/survey.png"> </a> ';
                                return  actions;                                 
                          
                        }}                        
                    ],
    });
    

    oTable = $('#investor-broker-table-list').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
    });

    $('#download-excel').on('click',function(){
        var search  = '';

        search_val = $('#search-input').val();
        if(search_val.length)
        {
            search = encodeURIComponent(search_val);
        }
        
        window.location.href = base_url + "backend/investor_broker/export?search="+search;
    });
});
