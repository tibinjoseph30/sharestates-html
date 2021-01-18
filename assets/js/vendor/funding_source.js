var base_url =  $("#base-url-1").val();
$(document).ready(function(){
    //var base_url = $("#baseurl").val();
    var base_url =  $("#base-url-1").val();

    $("#bank_acc_no").change(function(){
        var va = $(this).val();
        $("#bank_acc_no_hid").val(va);
    });

    $("#bank_acc_no").focusin(function(){
        var val1 = $("#bank_acc_no_hid").val();
        $("#con_bank_acc_no").val('');
        $(this).val('');
    });

    $("#bank_acc_no").blur(function(){
        var val1 = $("#bank_acc_no_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = last.replace(/./gi, "*"); 
        $(this).val(hidden+last2);
    });

    $("#con_bank_acc_no").blur(function(){
        var val1 = $("#con_bank_acc_no").val();
        var bank_no = $("#bank_acc_no_hid").val();
        var last = val1.slice(0,-4);
        var last2 = val1.slice(-4);
        hidden = last.replace(/./gi, "*"); 
        $(this).val(hidden+last2);
        if(val1 == bank_no){
            $(this).parent().children('label.error').hide();
        } 
    });

    $("#edit-funding_source-form").validate({
        onkeyup: false,
        ignore : false,
        onFocusout : false,
        rules: {
            bank_acc_type: {
                required: true,
            },
            bank_acc_no: {
                required: true,
                bank_account_check:true,
                //number:true
            },
            con_bank_acc_no: {
                required: true,
                equalTo: "#bank_acc_no"
            },
            bank_name: {
                required: true,
            },
            bank_routing_num: {
                required: true,
                maxlength: 10,
            },
            bank_nickname:{
                required: true,
            },
        },
        messages: {
            bank_acc_no:{ bank_account_check:"Bank account already exist. Please enter another account number.",
            equalTo:"Please enter the same value bank account." },
        },
    });

    $.validator.addMethod("bank_account_check",function(value,element) {
        var acc_no = $("#bank_acc_no_hid").val();
        var routing_num = $("#bank_routing_num").val();
        var bankid = $("#bankid").val();
        var str = "";
        var post_data = {bank_acc_no:acc_no,bank_routing_num:routing_num,bank_id:bankid};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        $.ajax({
            type:"post",
            dataType:"json",
            async: false,
            data:post_data,
            url:base_url+'backend/broker/bank_account_check',
            success:function(res){ 
                //alert('reslt');alert(res);
                str = res.exist;
            }
        });
      
        if(str=='Y'){ 
            return false;
        }else{
            return true;
        }
    });

    $('#bank_routing_num').on('keyup blur',function(){
        val = $('#bank_routing_num').val();
        //alert(val);
        $('#bank_routing_num-error').html('');
        if(val.trim().length == 9){
            $.ajax({
                url:base_url +'backend/broker/check_routing_number/'+val.trim(),
                dataType:'json',
                success:function(resp){
                if(resp.code==200){ 
                    $('#bank_name').val(resp.customer_name);
                } else {
                    if(resp.message == 'not found')
                        $('#bank_routing_num-error').html('Bank'+resp.message).show();
                    }
                }
            });
        }
    });


    $(document).on('click','#save_funding',function(e){
        e.preventDefault();
        var funding_form_valid = $("#edit-funding_source-form").valid();
        var broker_id = $("#broker_id").val();
        if(funding_form_valid == true){
            var form = $('#edit-funding_source-form')[0];
            var data = new FormData(form);
            $.ajax({
                url:base_url + "backend/broker/add_funding_source",
                enctype: 'multipart/form-data',
                processData: false,  // Important!
                contentType: false,
                cache: false,
                data: data,       
                type:'POST',
                success:function(result){
                    if(result.status = true){
                        window.location.href = base_url+'backend/broker/edit_broker/' + broker_id + '/funding';
                        $("#funding_source_a").addClass("active");
                        // draw_funding_source(broker_id);
                    }
                }
            });
        }
    });

    $(document).on('click','#cancel_funding',function(e){
        var broker_id = $("#broker_id").val();
        window.location.href = base_url+'backend/broker/edit_broker/' + broker_id + '/funding';
    });

    function draw_funding_source($broker_id){
        console.log($broker_id);
        // $(".funding_source").click(function(){
            var post_data = {broker_id : broker_id};
            post_data[global_csrf_token_name]= global_csrf_token_value;
            $.ajax({
                type: 'POST',
                url: base_url + 'backend/broker/ajax_funding_source_table_list',
                data: post_data,
                dataType: "json",
                success: function (response) {
                    if(response.funding_source){
                        $('#funding_source').html(response.funding_source);

                        var client_table =$('#funding-source-table-list').DataTable({
                            "bInfo" : false,
                            "lengthChange": false,
                            "aoColumnDefs" : [ {
                                'bSortable' : false,
                                'aTargets' : [0]
                                } ,
                                // { "targets": [0],"orderable": false,  "visible": false},
                            ]
                        });
                        $('#funding-source-table-list_filter').hide();
                        $('input#searchKey').on( 'keyup click', function () {
                            filterGlobal1();
                        } );
                        if(response.count_funding_source <= 10){
                            $('#funding-source-table-list_paginate').hide();
                        }
                    }
                }
            });
        // });
    }


    // $(document).on('click','#cancel_broker_sub',function(e){
    //     window.location.href = base_url+'backend/broker';
    // });


 });