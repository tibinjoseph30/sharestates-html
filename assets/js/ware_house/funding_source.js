 $(document).ready(function(){
    var base_url            = $("#base-url-1").val();
    var wh_id = $('#wh_id').val(); 
    /* delete funding source*/    

    $(document).on('click','.del_bank',function(){
            $("#whl-delete-form")[0].reset();
            var form_valid = $("#whl-delete-form").validate();
            form_valid.resetForm();
            var b_id = $(this).attr('rel');
            $(".delete-user-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
            $(".delete-user-modal").modal('show');
            $(".delete-user-modal").find('#whl_id').val(wh_id);
            $(".delete-user-modal").find('#b_id').val(b_id);

    });

     $(document).on('click','#delete-user-subt',function(){  

                var wh_id    = $(".delete-user-modal").find('#whl_id').val();
                var b_id    = $(".delete-user-modal").find('#b_id').val();
                var deleting_reason = $(".delete-user-modal").find('#deleting_reason').val();

                var post_data = {b_id:b_id,wh_id:wh_id,deleting_reason:deleting_reason};
                post_data[global_csrf_token_name]= global_csrf_token_value;
                $.ajax({
                    type: 'POST',
                    url: base_url + 'ware_house/whl/delete_bank',
                    data: post_data,
                    dataType: "html",
                    success: function (response) {
                        if(response.trim()=="error"){
                            window.location ="";
                        }else{
                            //window.location = base_url + 'backend/portfolio/funding_source/'+user_id;
                            swal("Deleted!", "Warehouse bank deleted successfully.", "success");
                            location.reload();
                        }
                    }
                });
                
            
    });


    var myDataTable =  $('#whl-table-list').DataTable({
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
            "url": base_url+'ware_house/whl/ajax_funding_list/'+wh_id,
            "type": "GET",
            "data": function(d){

            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { "data":"wh_id","orderable": false,  "visible": false},
                        { "data": "w_count","orderable": false},
                        { "data": "wh_entity_name"},
                        { "data": "wh_point_of_contact"},
                        { "data": "bank_name"},
                        { "data": "bank_acc_type"},
                        { "data": "bank_acc_no2","orderable": false},
                        { "data": "bank_routing_num" },
                        { "data": "bank_nickname"},
                        
                       
                        { data:null,"orderable": false,className:"text-nowrap action-icons",render:function(data){

                            if(data.wh_status == 'A'){
                                var active_icons = 'fa fa-power-off color-green';
                                active_class = 'br-green mr-1 app-deactivate';
                                var title = 'Deactivate';
                            }else{
                               
                                    var title = 'Activate';
                                    var active_icons = 'fa fa-ban color-yellow';
                                    active_class = 'br-yellow mr-1 app-activate';

                            }

                            if(data.blocked_status == 'N'){
                                var block_icon = 'userUnblock';
                                var block_title = 'Block';
                                var block_class = 'br-green mr-1 block-user';
                            }else{
                                var block_icon = 'userBlock';
                                var block_class = 'br-red unblock-user';
                                if(data.blocked_reason){
                                    var block_title = data.blocked_reason;
                                } else {
                                    var block_title = 'Unblock';
                                }
                            }

                            return '<a href="'+base_url+'ware_house/whl/edit_bank/'+data.wh_bank_id+'/'+data.wh_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="del_bank danger-outline"  title="Delete" rel="'+data.wh_bank_id+'" data-name="'+data.bank_name+'"  > <i class="fa fa-trash-o text-danger"></i> </a>';
                        }}
                        
                    ],
    });

    oTable = $('#whl-table-list').dataTable();
   
    
    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#header').html('List of Funding Source');
    });

    



});