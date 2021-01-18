var base_url = $("#base-url-1").val();
$(document).ready(function(){



   // var url_vendor_status   = base_url + 'backend/appraiser/vendor_status';

	//appraiser data table list
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
            "url": base_url+'ware_house/whl/ajax_whl_list',
            "type": "GET",
            "data": function(d){

                var loc_id  = $(".loctaion-search").find("option:selected").val();
                var pr_type = $(".property-search").find("option:selected").val();
                var status  = $(".status-search").find("option:selected").val();
                
                i=1;
                d['location']       = loc_id;
                d['property_type']  = pr_type;
                d['status']         = status;
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        { data: "wh_id","orderable": false,  "visible": false},
                        { "data": "c_count","orderable": false},
                        { "data": "wh_warehouse_id"},
                        { "data": "wh_entity_name"},
                        { "data": "wh_point_of_contact"},
                        { "data": "wh_email"},
                        { "data": "wh_phone"},
                        { "data": "wh_max_promised_amount" ,render: function(d) {
                                   return '$'+number_format(d,2);
                                }},
                        { "data": "wh_term_promised"},
                        { "data": "wh_available_cash_balance" ,render: function(d) {
                                   return '$'+number_format(d,2);
                                }},
                        { "data": "wh_interest_type"},
                        
                       
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

                            if(data.wh_interest_type_alphabet == 'F'){
                                    var title1 = 'Distribution';
                                    var active_icons1 = 'fa fa-usd color-green';
                                    active_class1 = 'br-yellow mr-1 app-distribution';

                                    var title2 = 'View Projects';
                                    var active_icons2 = 'fa fa-home color-green';
                                    active_class2 = 'br-yellow mr-1 app-view-projects';
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
//sir asked to hide distribution & view projects in new design
                            if(data.wh_IsDeleted=='N' && data.wh_interest_type_alphabet == 'F')
                           return '<a href="'+base_url+'ware_house/whl/edit/'+data.wh_id+'" title="Edit"><i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="whl-delete danger-outline"  title="Delete" data-id="'+data.wh_id+'" data-name="'+data.wh_point_of_contact+'"  > <i class="fa fa-trash-o text-danger"></i> </a> <a href="javascript:void(0)" class="'+active_class+'"  title="'+title+'" data-type="'+data.wh_status+'" data-id="'+data.wh_id+'" data-name="'+data.wh_point_of_contact+'"> <i class="'+active_icons+'"></i> </a>';

/*                            return '<a href="'+base_url+'ware_house/whl/edit/'+data.wh_id+'" title="Edit"><i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="whl-delete danger-outline"  title="Delete" data-id="'+data.wh_id+'" data-name="'+data.wh_point_of_contact+'"  > <i class="fa fa-trash-o text-danger"></i> </a> <a href="javascript:void(0)" class="'+active_class+'"  title="'+title+'" data-type="'+data.wh_status+'" data-id="'+data.wh_id+'" data-name="'+data.wh_point_of_contact+'"> <i class="'+active_icons+'"></i> </a> <a href="'+base_url+'backend/warehouse/flat_distribution/'+data.wh_id+'" class="'+active_class1+'"  title="'+title1+'" data-type="'+data.wh_status+'" data-id="'+data.wh_id+'" data-name="'+data.wh_point_of_contact+'"> <i class="'+active_icons1+'"></i> </a> <a href="'+base_url+'backend/warehouse/project_distribution/'+data.wh_id+'" class="'+active_class1+'"  title="'+title2+'" data-type="'+data.wh_status+'" data-id="'+data.wh_id+'" data-name="'+data.wh_point_of_contact+'"> <i class="'+active_icons2+'"></i> </a>';
*/                            else if(data.wh_IsDeleted=='N')
                            return '<a href="'+base_url+'ware_house/whl/edit/'+data.wh_id+'" title="Edit"><i class="fa fa-pencil"></i> </a> <a href="javascript:void(0)" class="whl-delete danger-outline"  title="Delete" data-id="'+data.wh_id+'" data-name="'+data.wh_point_of_contact+'"  > <i class="fa fa-trash-o text-danger"></i> </a> <a href="javascript:void(0)" class="'+active_class+'"  title="'+title+'" data-type="'+data.wh_status+'" data-id="'+data.wh_id+'" data-name="'+data.wh_point_of_contact+'"> <i class="'+active_icons+'"></i> </a>';
                            else
                            return '<a href="'+base_url+'ware_house/whl/edit/'+data.wh_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a>';
                        }}
                        
                    ],
    });

$(document).on('click','.whl-delete',function(){
        $("#whl-delete-form")[0].reset();
        var form_valid = $("#whl-delete-form").validate();
        form_valid.resetForm();
        var whl_id = $(this).attr('data-id');
        $(".delete-user-modal").find('#myLargeModalLabel').html('Delete - '+$(this).attr('data-name')+'');
        $(".delete-user-modal").modal('show');
        $(".delete-user-modal").find('#whl_id').val(whl_id);

});

$(document).on('click','#inactive',function(){
 $('.status-search').val('I').trigger('change');
 $('#header').text('List of Warehouse - Inactive');
});

$(document).on('click','#active',function(){
 $('.status-search').val('A').trigger('change');
 $('#header').text('List of Warehouse - Active');
});

$(document).on('click','#deleted',function(){
 $('.status-search').val('Y').trigger('change');
 $('#header').text('List of Warehouse - Deleted');
});

$(document).on('click','#total_warehouse',function(){
 $('.status-search').val('').trigger('change');
 $('#header').text('List of Warehouse');
});



    $(document).on('click','#delete-user-subt',function(){
        var delete_form_valid = $("#whl-delete-form").valid();
        if(delete_form_valid == true){
            $.post(base_url+'ware_house/whl/delete',$("#whl-delete-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".delete-user-modal").modal('hide');
                    $('#whl-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Warehouse Deleted Successfully", "success");
                    
                    if((response.total)!= undefined)
                        $('#total').find('h3').html(response.total);
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
                    if((response.blocked_count)!= undefined)
                        $('#blocked').find('span').html(response.blocked_count)
                }else{
                     swal("Cancelled", "whl  could not be deleted ", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.app-deactivate',function(){
        $("#whl-inactive-form")[0].reset();
        var form_valid = $("#whl-inactive-form").validate();
        form_valid.resetForm();
        var wh_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $(".inactive-user-modal").find('#myLargeModalLabel').html('Block - '+$(this).attr('data-name')+'');
        $(".inactive-user-modal").modal('show');
        $(".inactive-user-modal").find('#status').val(type);
        $(".inactive-user-modal").find('#wh_id').val(wh_id);
    });

    $(document).on('click','#inact-user-subt',function(){
        var form_valid = $("#whl-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'ware_house/whl/change_status',$("#whl-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-user-modal").modal('hide');
                    $('#whl-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Warehouse status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Warehouse status is could not be updated", "error");
                }
            });
        }else{

        }
    });

    $(document).on('click','.app-activate',function(){ 
        var wh_id = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        status_update({'status':type,'wh_id':wh_id,'csrf_test_name':global_csrf_token_value},base_url+'ware_house/whl/change_status',"Do you really want to change status of this warehouse?","Warehouse status updated successfully.","Warehouse status is could not be updated",'whl-table-list');
    });


    oTable = $('#whl-table-list').dataTable();

    $('#search-input').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('.status-search').change(function(){
        oTable.fnFilter($(this).val(), 1, null, false );
    });
    

    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#property-id').val('').trigger('change');
        $('#status').val('').trigger('change');
        $('#location-id').val('').trigger('change');
        $('#header').html('List of Warehouse');
    });


    function number_format (number, decimals, dec_point, thousands_sep) 
    {
    
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
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

    $("#download-excel").click(function(){ 
        var search = $("#search-input").val();
        var status = $("#status").val();
        window.location.href = base_url+"ware_house/whl/export_excel?search="+search+"&status="+status;
    });
});