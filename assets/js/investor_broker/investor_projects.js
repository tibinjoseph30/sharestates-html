var base_url = $("#base-url-1").val();
$(document).ready(function(){
    var investor_id = $('#investor_id').val();
	//investor broker data table list
	var myDataTable =  $('#investor-project-list').DataTable({
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
            "url": base_url+'backend/investor_broker/ajax_investor_project_list/'+investor_id,
            "type": "GET",
            "data": function(d){
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { data: "share_holder_id","orderable": false,  "visible": false},
                        { "data": "count","orderable": false},
                        { "data": "project_name"},
                        { "data": "developer_name"},
                        { "data": "project_goal"},    
                        { "data": "project_type"},              
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){
                               actions = '<a href="'+base_url+'backend/projects/share_holders/'+data.project_id+'" title="View Shareholders" class="icon-Investor"> <img src="'+base_url+'images/image/Shareholders-new.png"> </a> ';
                                return  actions;                               
                          
                        }}                        
                    ],
    });
    

    oTable = $('#investor-project-list').dataTable();


    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
    });
    
});
