var base_url =  $("#base-url-1").val();
$('.disabled').iCheck('disable');
//$('.underwriter').click(function(){ 
$(document).on('ifClicked','.underwriter',function(){ 
  var uw_check = $(this);
  if($(this).prop("checked")==true){ 
    var stip =$(this).attr("id"); 
    uw_check.parent().next('.uncheck_underwriter').val(stip);
  
  }
});
$(document).on('ifClicked','.title_stip',function(){
  if($(this).is(':checked')){
    var status = 1; 
  }else{
    var status = 0;
  } 
  if($(this).is(':checked') == false){ 
    $(this).parent().parent().next('.stipulation_data').show();
  }else{
    var cmmt = $(this).parent().parent().next('.stipulation_data').children('textarea').val();
    var stip =$(this).val(); 
    if(cmmt!='' ){
      var stip_check = $(this);
      swal({
            title: "Are you sure?",
            text: "Do you want to change the status?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: true,
            closeOnCancel: true
          }, function(isConfirm) {
          if (isConfirm){ 
            stip_check.parent().next('.unchecked_stip').val(stip);
            stip_check.parent().parent().next('.stipulation_data').hide();
            stip_check.parent().parent().next('.stipulation_data').children('.stip_text').val('');
            stip_check.parent().parent().next('.stipulation_data').children('textarea').val('');
          }else{
            if(status == "1"){
              $('#'+stip).prop('checked',true).iCheck('update');

            }else{
              $(this).prop('checked',false).iCheck('update');
              $(this).parent().parent().next('div').children("textarea").hide()
            }
          }
      });
    }else{
      var stip =$(this).val(); 
      $(this).parent().next('.unchecked_stip').val(stip);
      $(this).parent().parent().next('.stipulation_data,.stip_txt').hide();
      $(this).parent().parent().next('.stipulation_data').children('.stip_text').val('');
      $(this).parent().parent().next('.stip_txt').children('textarea').val('');

   }
  }

});
    $(document).on("ifClicked",".project_condo_documents",function(){
      
      if($(this).is(':checked') == true){ 
      
        $('.codo_stips').hide();
       
        $('.codo_label_check_box').each(function(){
          if ($(this).is(':checked')) {
            $(this).parent().removeClass('checked');
            $(this).parent().parent().next('.stipulation_data').hide();
          } 
          var codo_stip = $(this).val(); 
          $(this).parent().next('.unchecked_stip').val(codo_stip);
        })

      }else{
        
        $('.codo_stips').show();


       }

     });

    $(document).on("ifClicked",".projects_foreclosure_documents",function(){
      
      if($(this).is(':checked') == true){ 
      
        $('.foreclosure_stips').hide();
       
        $('.foreclosure_label_check_box').each(function(){
          if ($(this).is(':checked')) {
            $(this).parent().removeClass('checked');
            $(this).parent().parent().next('.stipulation_data').hide();
          } 
          var codo_stip = $(this).val(); 
          $(this).parent().next('.unchecked_stip').val(codo_stip);
        })

      }else{
        
        $('.foreclosure_stips').show();


       }

     });

    $(document).on("ifChanged","#project_seller_entity_documents",function(){
      if($(this).is(':checked')){
        var status = 1; 
      }else{
        var status = 0;
      } 
      if($(this).is(':checked') == true){ 
        $('.seller_stip').show();
        $('.stip_repeat_saved').show();
      }else{
         // $('.sub_title').prop('checked',false);

          var entity_involve = $('#entities_involved').val();
          if(entity_involve!=''){
            var entity = $(this).val();
            var project_id= $('#project_id').val();
            swal({
                title: "Are you sure?",
                text: "Are you sure you want to clear this data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, I am sure!',
                cancelButtonText: "No, cancel it!",
                closeOnConfirm: true,
                closeOnCancel: true
              }, function(isConfirm) {
              if (isConfirm){ 
                 var post_data ={entity:entity,project_id:project_id}; 
                     post_data[global_csrf_token_name]= global_csrf_token_value; 
                 $.ajax({
                      type: "POST",
                      data: post_data,
                      url: base_url+'backend/titlestipulation/clear_sub_stipulaion',
                      //dataType: "html",
                      success: function (response) {  //alert(response)
                        $('.stip_repeat_saved').html('');
                      }
                  });
                  $('#entities_involved').val('');
                  $('#entities_involved').removeAttr("readonly")
                  $('.seller_stip').hide();
                  $('.stip_repeat').hide();
                  $('.stip_repeat_saved').hide();
              }else{
                  if(status == "0"){
                    $('#project_seller_entity_documents').prop('checked',true).iCheck('update');

                  }else{
                    $(this).prop('checked',false).iCheck('update');
                    $('.seller_stip').hide();
                    $('.stip_repeat').hide();
                    $('.stip_repeat_saved').hide();
                  }

              }
            });

          /* var stip_confirm =confirm('Are you sure you want to clear this data?');
            if(stip_confirm==true){
              var entity = $(this).val();
              var project_id= $('#project_id').val();
              var post_data ={entity:entity,project_id:project_id}; 
                post_data[global_csrf_token_name]= global_csrf_token_value;

              $.ajax({
                type: "POST",
                data: post_data,
                url: base_url+'backend/titlestipulation/clear_sub_stipulaion',
                //dataType: "html",
                success: function (response) {  //alert(response)

               //$('.seller_stip').html('');
                     $('.stip_repeat_saved').html('');
                   
                }
            });
            $('#entities_involved').val('');
            $('#entities_involved').removeAttr("readonly")
            $('.seller_stip').hide();
            $('.stip_repeat').hide();
            $('.stip_repeat_saved').hide();
            }else{
              $(this).prop('checked',true);
              $('.seller_stip').show();
              $('.stip_repeat').show();
            $('.stip_repeat_saved').show();
            $('#entities_involved').val('<?=$details_stp[0]?>');
            }  */
          }else{
            $('.seller_stip').hide();
            $('.stip_repeat').hide();
            $('.stip_repeat_saved').hide();
          }
          
          
        }

    });
    $(document).on("change","#entities_involved",function(){
        
        var count = $(this).val();  
        var post_data ={count:count}; 
        post_data[global_csrf_token_name]= global_csrf_token_value;

        $.ajax({
            type: "POST",
            data: post_data,
            url: base_url+'backend/titlestipulation/show_entity_name',
            dataType: "html",
            success: function (response) {  //alert(response)
                $('.stip_repeat').show();
                $('.stip_repeat').html(response);
               
            }
        });
    });

  $(document).on("change",".entity_type",function(){ 
        var entity      = $(this).val(); 
        var count       = $(this).attr("rel"); 
        var prev_select = $(this).next('.prev_seleted_entity').val();
        var sub_stip_id = $(this).siblings('.entity_type_id').val();
        var project_id  = $('#project_id').val(); 
        var post_data = {entity:entity,count:count}; 
        post_data[global_csrf_token_name]= global_csrf_token_value;
        
        if(prev_select!=null && prev_select!=''){
          post_data['prev_select']= prev_select;
          post_data['sub_stip_id']= sub_stip_id;

          swal({
              title: "Are you sure?",
              text: "Are you sure you want to clear all selected values?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Yes, I am sure!',
              cancelButtonText: "No, cancel it!",
              closeOnConfirm: true,
              closeOnCancel: true
            }, function(isConfirm) {
            if (isConfirm){ 
               $.ajax({
                  type: "POST",
                  data: post_data,
                  url: base_url+'backend/titlestipulation/delete_seller_entity',
                  dataType: "html",
                  success: function (response) {  //alert(response)
                     $(this).next('.prev_seleted_entity').val('');
                     
                  }
              });
              
            }else{ 
              var prev_val = $('.prev_seleted_entity').val();
              $(".entity_type").val(prev_val);
            }
            $.ajax({
                  type: "POST",
                  data: post_data,
                  url: base_url+'backend/titlestipulation/show_stipulation',
                  dataType: "html",
                  success: function (response) {  //alert(response)
                     $('#entity_'+count).html(response)

                     $('#entity_'+count).iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal'
                    });
                  }
              });
        });


         /* var entity_confirm =confirm('Are you sure you want to clear all selected values?');
        if(entity_confirm==true){
            $.ajax({
                type: "POST",
                data: post_data,
                url: base_url+'backend/titlestipulation/delete_seller_entity',
                dataType: "html",
                success: function (response) {  //alert(response)
                   $(this).next('.prev_seleted_entity').val('');
                   
                }
            });

            $.ajax({
                type: "POST",
                data: post_data,
                url: base_url+'backend/titlestipulation/show_stipulation',
                dataType: "html",
                success: function (response) {  //alert(response)
                   $('#entity_'+count).html(response)

                   $('#entity_'+count).iCheck({
                      checkboxClass: 'icheckbox_minimal-blue',
                      radioClass: 'iradio_minimal'
                  });
                }
            });
          } */
        }else{

          $.ajax({
                  type: "POST",
                  data: post_data,
                  url: base_url+'backend/titlestipulation/show_stipulation',
                  dataType: "html",
                  success: function (response) {  //alert(response)
                     $('#entity_'+count).html(response)

                     $('#entity_'+count).iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal'
                    });
                  }
              });
        }
        
        
        
  });  

   $(document).on("ifChanged",".sub_title",function(){
    var element = $(this);
      if($(this).is(':checked')){
        var status = 1; 
      }else{
        var status = 0;
      }
       if($(this).prop("checked")==true ){ 
        //$(this).next().show();
        $(this).parent().parent().next('.stipulation_data').show();
       
       }else{
        var cmt = $(this).siblings('.stip_txt').children('textarea').val(); 
        var sub_stipval = $(this).val(); 
        // $(this).next().children('textarea').val(); console.log(cmt);
        if(cmt!=''){
            swal({
            title: "Are you sure?",
            text: "Are you sure you want to clear this data?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: true,
            closeOnCancel: true
          }, function(isConfirm) {
          if (isConfirm){ 
            
            if(sub_stipval){
              element.parent().next('.uncheck_substip').val(sub_stipval);
            }
            element.parent().parent().next('.stipulation_data').hide();
          
            element.parent().parent().next('.stipulation_data').children('textarea').val('');
            element.parent().parent().next('.stipulation_data').children('input:text').val('');
          }else{
            element.parent().next('.uncheck_substip').val('');
            $('#'+sub_stipval).prop("checked",true).iCheck('update');
          }
        });
        /*var sub_confirm =confirm('Are you sure you want to clear this data?');
          if(sub_confirm==true){ 
            var sub_stipval = $(this).val(); 
            if(sub_stipval){
              $(this).parent().next('.uncheck_substip').val(sub_stipval);
            }
            $(this).parent().parent().next('.stipulation_data').hide();
          
            $(this).parent().parent().next('.stipulation_data').children('textarea').val('');
            $(this).parent().parent().next('.stipulation_data').children('input:text').val('');
          // $(this).next().hide();
          // $(this).next().children('textarea').val('');
         }else{
          $(this).parent().next('.uncheck_substip').val('');
          $(this).prop("checked",true);
         }*/
        }else{
          var sub_stipval = $(this).children('.saved').val(); 
          if(sub_stipval){
              $(this).parent().next('.uncheck_substip').val(sub_stipval);
            }
          $(this).parent().parent().next('.stipulation_data').hide();
            $(this).siblings('.stip_txt').hide();
            $(this).siblings('.stip_txt').children('textarea').val('');
            $(this).parent().parent().next('.stipulation_data').children('input:text').val('');
          // $(this).next().hide();
         //   $(this).next().children('textarea').val('');
        }
       }
  });

  $(document).on("ifChanged",".trust_check",function(){
           
    if($(this).prop("checked")==false){  

      $('.trust_label').hide();
      
      $(".trust_child_label").prop('checked', false);

      $(".trust_child_text_area").hide();

      $('.trust_child_label').each(function(){
        var trust_stip = $(this).val(); 
        if($(this).prop("checked")==false){  
          $(this).parent().next('.unchecked_stip').val(trust_stip); 
        }
      
      });
      $(this).parent().next('.unchecked_stip').val($(this).val()); 

    }else{
          
      $('.trust_label').show();

    }

  }); 

  $(document).on("ifChanged",".trust_child_label",function(){
    var val = $(this);
    if($(this).prop("checked")==false){ 
      var cmmt = $(this).parent().parent().next('div').children('textarea').val();
      var stip =$(this).val();
      if($(this).is(':checked')){
        var status = 1; 
      }else{
        var status = 0;
      }
      if(cmmt!=''){
        swal({
          title: "Are you sure?",
          text: "Do you want to change the status?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, I am sure!',
          cancelButtonText: "No, cancel it!",
          closeOnConfirm: true,
          closeOnCancel: true
        }, function(isConfirm) {
        if (isConfirm){ 
            val.parent().parent().next('div').children("textarea").hide()
            val.parent().parent().next('div').children("textarea").val('');
             
            val.parent().next('.unchecked_stip').val(stip);
          }else{
            
            if(status == "0"){
              $('#'+stip).prop('checked',true).iCheck('update');

            }else{
              $(this).prop('checked',false).iCheck('update');
              $(this).parent().parent().next('div').children("textarea").hide()
            }
          }
        });
      }
     
    }else{
      
      $(this).parent().parent().next('div').children("textarea").show()

    }

  });

  $(document).on('click','#add_more',function(){
    $('.seller_stip1').show();
  });

  $(document).on('change','#add_entities_involved',function(){
      var count = $(this).val(); 
      var added_entity = $('#entities_involved').val();  
      if(count){
          $("#add_more").hide();
      }else{
        $("#add_more").show();  
        $('.seller_stip1').hide();
      }

      var post_data = {count:count,added_entity:added_entity}; 
        post_data[global_csrf_token_name]= global_csrf_token_value;

      $.ajax({
          type: "POST",
          data: post_data,
          url: base_url+'backend/titlestipulation/show_entity_name',
          dataType: "html",
          success: function (response) {  //alert(response)
              $('#stip_repeat').show();
              $('#stip_repeat').html(response);
             
          }
      });

  })