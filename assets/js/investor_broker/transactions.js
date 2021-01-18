var base_url = $("#base-url-1").val();
$(document).ready(function(){

    var user_id = $('#user_id').val();
	//Transaction history data table list
	var myDataTable =  $('#transaction-history-list').DataTable({
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

        order: [2, 'asc' ],
        "processing": true,
        "serverSide": true,
        //"ajax": window.location.href,
        "ajax": {
            "url": base_url+'backend/investor_broker/ajax_transaction_history_list/'+user_id,
            "type": "GET",
            "data": function(d){
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { data: "id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "txn_date"},
                        { "data": "project_name"},
                        { "data": "distribution_amount"},    
                        { "data": "type"}, 
                        { "data": "commission_type"},        
                        
                    ],
    });
    

    oTable = $('#transaction-history-list').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#updated_date_from').change(function(){
        oTable.fnFilter($(this).val(), 1, null, false );
    });

    $('#updated_date_to').change(function(){
        oTable.fnFilter($(this).val(), 2, null, false );
    });

    $('#TXN_type').change(function(){
        oTable.fnFilter($(this).val(), 0, null, false );
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('.search').val('').trigger('change');
    });

    $("#updated_date_from").on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#updated_date_to').datepicker('setStartDate', minDate);
    });

    $("#updated_date_to").on('changeDate', function (selected) {
        var maxdate = new Date(selected.date.valueOf());
        $('#updated_date_from').datepicker('setEndDate', maxdate);
    });

    $('#download-excel').on('click',function(){
        var user_id = $('#user_id').val();
        var search  = '';
        var date_from = '';
        var date_to = '';
        var type = '';

        search_val = $('#search-input').val();
        if(search_val.length)
        {
            search = encodeURIComponent(search_val);
        }

        date_from_val = $('#updated_date_from').val();
        if(date_from_val.length)
        {
            date_from = encodeURIComponent(date_from_val);
        }

        date_to_val = $('#updated_date_to').val();
        if(date_to_val.length)
        {
            date_to = encodeURIComponent(date_to_val);
        }

        type = $('#TXN_type option:selected').val();
        if(type.length)
        {
            type = encodeURIComponent(type);
        }

        window.location.href = base_url + "backend/investor_broker/transaction_export?user_id="+user_id+"&search="+search+"&date_from="+date_from+"&date_to="+date_to+"&type="+type;
    });
});
