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
    var last = val1.slice(0,-4);
    var last2 = val1.slice(-4);
    hidden = last.replace(/./gi, "*"); 
    $(this).val(hidden+last2); 
  });

  $("#PR_bank_acc_no").change(function(){
    var va = $(this).val();
    $("#PR_bank_acc_no_hid").val(va);
  });
  
  $("#PR_bank_acc_no").blur(function(){
 
    var val1 = $("#PR_bank_acc_no_hid").val();
    var last = val1.slice(0,-4);
    var last2 = val1.slice(-4);
    hidden = last.replace(/./gi, "*"); 
    $(this).val(hidden+last2);
  });

  $("#PR_con_bank_acc_no").blur(function(){
 
    var val1 = $("#PR_con_bank_acc_no").val();
    var last = val1.slice(0,-4);
    var last2 = val1.slice(-4);
    hidden = last.replace(/./gi, "*"); 
    $(this).val(hidden+last2);
  });

    $(".cmp").focusin(function(){
            $(this).closest('.text-box').css("border-color","blue");  //change border color
    })
    $(".cmp").focusout(function(){       //change border color
            $(this).closest('.text-box').css("border-color","");     
    })

    $("#bank_account" ).validate({
      onkeyup: false,
      onclick: false,
      onfocusout: false,
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
          bank_acc_no:{ bank_account_check:"Bank account already exist. Please enter another account number." },
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
        url:base_url + 'ware_house/whl/bank_account_check',
        success:function(res){ //console.log(res);return false;
          str = res.exist;
        }
      });
     // return false;
      if(str=='Y'){ 
        return false;
      }else{
        return true;
      }
    });

    $("#PR_bank" ).validate({
      onkeyup: false,
      onclick: false,
      onfocusout: false,
        rules: {
          PR_bank_nickname: {
          required: true,
          },
          PR_bank_acc_no: {
          required: true,
          maxlength:17
          //number:true
          },
          PR_con_bank_acc_no: {
          equalTo: "#PR_bank_acc_no"
          }
          
        }
    });

      $("#save_PR_bank").click(function(){
         if( $("#PR_bank" ).valid()){
         var data = $("#PR_bank").serialize();
         var main_user = $("#main_user_id").val();
         $.ajax({
             type:"POST",
             dataType:"json",
             data:data,
             url:base_url + 'backend/portfolio/add_perfect_receivable_bank',
             success:function(res){
                window.location.href = base_url + "backend/portfolio/funding_source/" + main_user;
             }
 
         });
        }
      });

      $('#bank_routing_num').on('keyup blur',function(){
        val = $('#bank_routing_num').val();
        //alert(val);
        $('#bank_routing_num-error').html('');
        if(val.trim().length == 9){
            $.ajax({
                url:base_url +'ware_house/whl/check_routing_number/'+val.trim(),
                dataType:'json',
                success:function(resp){
                if(resp.code==200){ 
                    $('#bank_name').val(resp.customer_name);
                } else {
                    if(resp.message == 'not found')
                        $('#bank_routing_num-error').html('Bank '+resp.message).css('color','red').show(); $('#bank_name').val('');
                    }
                }
            });
        }
    });


});