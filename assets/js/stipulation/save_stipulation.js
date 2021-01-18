var base_url =  $("#base-url-1").val();
$(document).on('click','.add_more',function(){
	var add =$(this);
	var stip =$(this).attr('alt'); 
  var sub_stip_id = $(this).attr('data-sub-stipid');  
     var post_data ={stip:stip,sub_stip_id:sub_stip_id}; 
                     post_data[global_csrf_token_name]= global_csrf_token_value; 
                 
	$.ajax({
              type: "POST",
              data: post_data,
              url: base_url+'backend/titlestipulation/add_more',
              //dataType: "html",
              success: function (response) {  
                add.before(response);
              }
          });

	var str = $(this).siblings('div').children('.stipulation_outer').attr('data-stipulationkey');
	// var table = $(this).siblings('div').children('table:first'); console.log(table)
	// var html = table.clone();
	// var table1 = $(this).siblings('div').children('table:last');

	
	// html.insertAfter(table1)

});

$(document).on('click','.uw_stip',function(){ 
//$('.uw_stip').on('click',function(){ 

    // stext= $(this).closest('.stipulation_outer').find('h4').text(); 
    // if(stext==''){
    //     stext= $(this).closest('.stipulation_outer').find('h6').text(); 
    // }
    stipulation = $(this).attr('rel'); 
    but = $(this); 
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
    //if(confirm('Please confirm to change the status of '+stext.trim()))

          data = but.attr('alt'); 
          
          sub_stip_id = but.attr('data-sub-stipid');  


          project_id = $('#dev_project_id').val(); 



          $.ajax({
              type:'POST',
              data:{'status':data,'stipulation':stipulation,sub_stip_id:sub_stip_id,csrf_test_name:global_csrf_token_value},
              url:base_url+'backend/titlestipulation/update_status/'+project_id,
              success:function(resp){

                 
                  if(data == 'P'){
                    but.removeClass('mr-2 uw_stip');
                    but.addClass('mb-1 border-0');
                    but.next('button').addClass('uw_stip');
                    but.next('button').html('<i class="fas fa-circle mr-2"></i>Clear');
                  }else if(data == 'C'){
                    but.removeClass('pr-3 uw_stip');
                    but.addClass('border-0');
                    but.prev('button').addClass('uw_stip');
                    but.html('<i class="fas fa-circle mr-2"></i>Cleared');
                  }
                  // but.parent().find('a').addClass('fdeout').removeClass('red-clr green-clr');
                  // but.parent().find('a span').removeClass('ball-result');
                  // but.parent().find('a[alt='+data+'] span').addClass('ball-result');

                  // if(data == 'P')
                  //     cl = 'red-clr';
                  // else if(data == 'C')
                  //     cl = 'green-clr';

                  // but.removeClass('fdeout').addClass(cl);
                  //window.location.reload();

              }

          });
      }
    });

  });