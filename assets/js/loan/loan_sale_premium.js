var base_url = $("#base-url-1").val();
$(document).ready(function(){

	//investor broker data table list
	var myDataTable =  $('#loan-sale-premium-table').DataTable({
        "dom": '<<t>p>',
        "aLengthMenu":false,
        "paging":   true,
        "bLengthChange": true,
        "pageLength": 10,
        'bAutoWidth': false ,
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
            "url": base_url+'loan/loan_sale_premium/ajax_loan_sale_premium_list',
            "type": "GET",
            "data": function(d){
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { data: "share_holder_id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "project_extend_loan_number"},
                        { "data": "project_address"},
                        { "data": "share_holder"},    
                        { "data": "loan_sale_premium_amount"},
                        { "data": "loan_sale_premium_percentage"},
                        { "data": "premium_received_on"}                    
                        
                    ],
    });
    

    oTable = $('#loan-sale-premium-table').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#updated_date_from').change(function(){
        oTable.fnFilter($(this).val(), 1, null, false );
    });

    $('#updated_date_to').change(function(){
        oTable.fnFilter($(this).val(), 2, null, false );
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('.search').val('').trigger('change');
    });

    $("#updated_date_from").datepicker().on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('#updated_date_to').datepicker('setStartDate', minDate);
    });

    $("#updated_date_to").datepicker().on('changeDate', function (selected) {
        var maxdate = new Date(selected.date.valueOf());
        $('#updated_date_from').datepicker('setEndDate', maxdate);
    });

    $('#download-excel').on('click',function(){
        var search  = '';
        var date_from = '';
        var date_to = '';

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

        window.location.href = base_url + "loan/loan_sale_premium/export?search="+search+"&date_from="+date_from+"&date_to="+date_to;
    });
});
