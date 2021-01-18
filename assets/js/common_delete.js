 $(function() {
    var base_url =  $("#base-url-1").val();
 });
 function delete_table_row(deleted_table_id,request_url,delete_msg,succes_msg,error_msg,reload_table_id){
    swal({   
            title: "Are you sure?",   
            text: delete_msg,   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            cancelButtonText: "No, cancel plx!",   
            closeOnConfirm: false,   
            closeOnCancel: true 
        }, function(isConfirm){ 

        if (isConfirm) {

            $.ajax({
                url:request_url,
                type: 'POST',
                data: {request_id:deleted_table_id,'csrf_test_name':global_csrf_token_value}, 
                dataType: 'json',
                success: function(response){
                    if(response.status == true){
                        swal("Deleted!", succes_msg, "success");
                        if(reload_table_id !=null && reload_table_id !=''){
                            $('#'+reload_table_id).DataTable().ajax.reload(null,false);
                        }

                        if((response.total)!= undefined)
                          $('#total').find('h3').html(response.total);
                        if((response.inactive_count)!= undefined)
                            $('#inactive').find('span').html(response.inactive_count);
                        if((response.active_count)!= undefined)
                            $('#active').find('span').html(response.active_count);
                        if((response.blocked_count)!= undefined)
                            $('#blocked').find('span').html(response.blocked_count);
                        if((response.expired_licence)!= undefined)
                            $('#expired').find('span').html(response.expired_licence);
                    }else{
                       swal("Cancelled", error_msg, "error");  
                    }

                    if(response.source == 'funding'){
                        window.location.href = base_url+'backend/broker/edit_broker/'+response.broker_id+ '/funding';
                    }
                    
                }
            });
             //swal("Deleted!", "Administrator details deleted successfully", "success");
               
        } else {     
            swal("Cancelled", error_msg, "error");   
        } 
    });
}

function status_update(posted_data,request_url,delete_msg,succes_msg,error_msg,reload_table_id){
    swal({   
            title: "Are you sure?",   
            text: delete_msg,   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#f59522",   
            confirmButtonText: "Yes update it!",   
            cancelButtonText: "No, cancel",   
            closeOnConfirm: false,   
            closeOnCancel: true 
        }, function(isConfirm){ 

        if (isConfirm) {

            $.ajax({
                url:request_url,
                type: 'POST',
                data: posted_data, 
                dataType: 'json',
                success: function(response){

                    if(response.status == true){
                        swal("Updated!", succes_msg, "success");

                        if(reload_table_id == 'VendorBrokerList'){
                            $("#funding_sources" ).trigger( "click" );
                        }

                        if(reload_table_id == 'investmentaccounts'){
                            $("#investment_accounts" ).trigger( "click" );
                        }

                        if(reload_table_id == 'saved_criteria'){
                            $("#credboxcriteriapage a" ).trigger( "click" );
                        }

                        if(reload_table_id == 'saved_criteria_term'){
                            $("#c_b_c_term a" ).trigger( "click" );
                        }
                        
                        if(reload_table_id !=null && reload_table_id !='' && reload_table_id != 'VendorBrokerList' && reload_table_id != 'saved_criteria' && reload_table_id != 'saved_criteria_term'){
                            $('#'+reload_table_id).DataTable().ajax.reload(null,false);
                        }

                        if((response.inactive_count)!= undefined)
                          $('#inactive').find('span').html(response.inactive_count);
                        if((response.active_count)!= undefined)
                            $('#active').find('span').html(response.active_count)
                        if((response.blocked_count)!= undefined)
                            $('#blocked').find('span').html(response.blocked_count)

                    }else{
                       swal("Cancelled", error_msg, "error");  
                    }
                }
            });
             //swal("Deleted!", "Administrator details deleted successfully", "success");
               
        } else {     
            swal("Cancelled", error_msg, "error");   
        } 
    });
}



function status_update_refresh(posted_data,request_url,delete_msg,succes_msg,error_msg,reload_table_id){
    swal({   
            title: "Are you sure?",   
            text: delete_msg,   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#f59522",   
            confirmButtonText: "Yes update it!",   
            cancelButtonText: "No, cancel",   
            closeOnConfirm: false,   
            closeOnCancel: true 
        }, function(isConfirm){ 

        if (isConfirm) {

            $.ajax({
                url:request_url,
                type: 'POST',
                data: posted_data, 
                dataType: 'json',
                success: function(response){

                    window.location.reload();

                }
            });
             //swal("Deleted!", "Administrator details deleted successfully", "success");
               
        } else {     
            swal("Cancelled", error_msg, "error");   
        } 
    });
}


