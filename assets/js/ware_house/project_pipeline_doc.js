var baseUrl =  $("#base-url-1").val();
$(document).ready(function(){
	//pipeline documents
	$('body').on('click', '#submit_addpipelinedoc', function(){
		var developerId = $("#developer_id").val();
		var post_data   =  new FormData($('#addpipelinedocForm_'+developerId)[0]);
		$("#submit_addpipelinedoc").attr("disabled", true);
		$('#load_image').html('Please wait... <img src="'+baseUrl+'images/loading36.gif" />');
		$.ajax({
			type:"POST",
			dataType: "html",
			url:baseUrl + 'backend/developers/pipeline_documents',
			data:post_data,
			cache: false,
			contentType: false,
			processData: false,
			success:function(res){ 
				location.reload();
				// window.location.href=baseUrl+"backend/pipeline_documents/index/";
			}
        });

	});
	$('body').on('click', '#sponsor_addpipelinedoc', function(){
		var developerId = $("#developer_id").val();
		var parent_id = $("#parent_id").val();
		var ein = $("#e_EIN").val();
		var subtype = $("#sub_user_type").val();
    var project_id = $("#project_id").val();
		var errflg=0;
		/*if(ein.length!=10 && subtype=='E'){
			errflg=1;
			$("#e_EIN").addClass('redbox');
			var err="Please enter at least 9 characters";
			$("#ein_error").html(err);
			return false;
    }*/
    if(errflg==0){ 
			var post_data   =  new FormData($('#addpipelinedocForm_'+developerId)[0]);
			$("#sponsor_addpipelinedoc").attr("disabled", true);
			$('#load_image').html('Please wait... <img src="'+baseUrl+'images/loading36.gif" />');
			$.ajax({
				type:"POST",
				dataType:"html",
				url:baseUrl + 'backend/developers/sponsor_pipeline_documents/'+developerId+'/'+parent_id,
				data:post_data,
				async: false,
				cache: false,
				contentType: false,
				processData: false,
				success:function(res){ 
				 if(project_id!=""){
           window.location.href=baseUrl+"backend/projects/pending_projects/0/"+project_id; 
         }else{
          location.reload();
         }
					// window.location.href=baseUrl+"backend/pipeline_documents/index/";
				}
	        });
	    }
	});
	$('body').on('click', '.delete_doc', function(){
		 var id    		  = this.id;

		 var developer_id =$(this).attr('alt');
		 var confirmation =confirm("Are you sure want to delete this document?");
		 if(confirmation==true){
		 	var post_data = {id:id,developer_id:developer_id};
                post_data[global_csrf_token_name]= global_csrf_token_value;
		 	$.ajax({
		 		 type:"POST",
		          dataType:"json",
		          url:baseUrl + 'backend/developers/delete_pending_docs',
		          data:post_data,
		          success:function(res){ 
		          	location.reload();
		          }
		 	});
		}else{
			return false;
		}
	});
	//Pipe line vendor

	//Broker
	$("#broker_name").autocomplete({
            source: baseUrl+'backend/projects/get_broker',
            minLength: 1,
            select: function(event, ui) {  
              if(ui.item == null || ui.item == undefined) {
               alert("Invalid user");
               $(this).val('');
              }      
            },
            change: function(event,ui){
              $(this).val((ui.item ? ui.item.value : ""));
              $("#broker_id").val((ui.item.id));
            }
    }).blur(function() {
        if($(this).val() == "") {
			$('#broker_id').val('');
        }
    });

	$( "#processor" ).autocomplete({
	  	source: baseUrl+'backend/projects/get_processor',
	  	minLength: 1,
	    select: function(event, ui) { 
		    if(ui.item == null || ui.item == undefined) {
		     	alert("Invalid user");
		     	$(this).val('');
		    }      
	    },
	    change: function(event,ui){
			$(this).val((ui.item ? ui.item.value : ""));
			$("#processor_id").val((ui.item.id));
		}
	}).blur(function() {
        if($(this).val() == "") {
			$('#processor_id').val('');
        }
    });

    // attorney search
	$("#attorney_name").autocomplete({
          source: baseUrl+'backend/projects/get_attorney',
          minLength: 1,
            select: function(event, ui) { 
	            if(ui.item == null || ui.item == undefined) {
	             alert("Invalid user");
	             $(this).val('');
	            }      
            },
            change: function(event,ui){
		        $(this).val((ui.item ? ui.item.value : ""));
		        $("#bank_attorney_id").val((ui.item.id));
		    }
	}).blur(function() {
        if($(this).val() == "") {
			$('#bank_attorney_id').val('');
        }
    });

    // under writer search
	$("#under_writer").autocomplete({
          source: baseUrl+'backend/projects/get_all_admin',
          minLength: 1,
            select: function(event, ui) { 
	            if(ui.item == null || ui.item == undefined) {
	             alert("Invalid user");
	             $(this).val('');
	            }      
            },
            change: function(event,ui){
		        $(this).val((ui.item ? ui.item.value : ""));
		        $("#under_writer_id").val((ui.item.id));
		    }
	}).blur(function() {
        if($(this).val() == "") {
			$('#under_writer_id').val('');
        }
    });

    $("#submit_pipe_vendor").click(function(){
		
		var broker_name = $('#broker_name').val();
		var sales_person = $('#sales_person').val();
		var processor = $('#processor').val();
		var under_writer = $('#under_writer').val();
		var attorney_name = $('#attorney_name').val();
		if(broker_name=='' && sales_person=='' && processor=='' && under_writer=='' && attorney_name==''){
			$('#error_msg').html('Please select atleast one user.');
		}else{
    		$("#pipelinevendorForm").submit();
		}
    	
	});  

	$(".nik_input").keypress(function () {
        
        $(".nik_input_div").css("border-color", "");
        $(".nick_er").hide();
        $("#j_nick_error").hide();
        $("#e_nick_error").hide();

    });

	// add warehouse Form validation
	/*$("#pipelinevendorForm").validate({
			rules:  {
						broker_name:{required:true},
						attorney_name:{required:true},
					},
			messages: {		
					  },
			success: function (label) {
				           label.closest('.control-group').removeClass('error');
				           label.remove();
                      },		  

	});*/

	//vendors
   /*var flag=0;
	$("#pipelinevendorForm").on("input", function() {
	 flag=1;	
});
	 $("#change_content").click(function(){
	 	var devid=$('#developer_id').val();
		if(flag==1){
			backMSG(devid);
		}else{
			window.location.href = baseUrl+"backend/projects/add_broker/"+devid;

		}
	});  */




   

    var flag=0;
    $('input').keyup(function() { 
    	var rel_val = $(this).attr('rel');
    	var this_val =$(this).val();

       if (rel_val != this_val) {

          flag=1;	
        }else{
        	flag=0;
        }

        
    });

 $("#change_content").click(function(){
	 	var devid=$('#developer_id').val();
		if(flag==1){
			backMSG();
		}else{
			window.location.href = baseUrl+"backend/projects/add_broker";

		}
	});
 $("#add_attorney").click(function(){
 	//alert(flag);
	 	var devid=$('#developer_id').val();
		if(flag==1){
			backMSG2();
		}else{

			window.location.href = baseUrl+"backend/projects/add_bank_attorney";

		}
	});


function backMSG() {

if (confirm("Do you want to leave the page without saving the data?") == true) {
window.location.href = baseUrl+"backend/projects/add_broker";
} else {
return false;
}

}

function backMSG2() {

if (confirm("Do you want to leave the page without saving the data?") == true) {
window.location.href = baseUrl+"backend/projects/add_bank_attorney";
} else {
return false;
}

}


$("#e_EIN").change(function(){
  var va = $(this).val();
  $("#e_EIN_hid").val(va);
});

$("#e_EIN").focusin(function(){
  var val1 = $("#e_EIN_hid").val();
  $(this).val(''); 
});

$("#e_EIN").blur(function(){
  var val1 = $("#e_EIN_hid").val();
  var last = val1.slice(0,-4);
  var last2 = val1.slice(-4);
  hidden = val1.replace(/./gi, "*"); 
  if(hidden.length > 10) hidden = hidden.substring(0,10);
  $(this).val(hidden);   
});

$("#e_EIN").keyup(function(){
    
 	var val = this.value.replace(/\D/g, '');
	var newVal = '';
	if(val.length > 3) {
	 	this.value = val;
	}
	if((val.length > 2)) {
	 	newVal += val.substr(0, 2) + '-';
	 	val = val.substr(2);
	}
	newVal += val;
	this.value = newVal;
	$("#e_EIN_hid").val(newVal);
});


/*credit score starts*/

var dev = $("#developer_id").val();
var creditlistdata = {dev:dev};
var creditlistUrl = baseUrl+'backend/developers/credit_list_ajax';
get_creditlist(creditlistdata,creditlistUrl);


$(".borrower_credit_date").datepicker({
         dateFormat: "mm/dd/yy",
        changeMonth: true,
        yearRange: "-100:+0",
        changeYear: true,
       // maxDate: new Date(),
        maxDate :0,

    });

var j=$('.remove_credit:last').attr('rel');
      
      if(j==0){ 
         $("#remove_credit0").hide();
      }

 var i = 1;
$(".add_credit").click(function(e){
      
       e.preventDefault();
       var cr =  $(".credit_div:first").clone().insertAfter("div.credit_div:last");
       $("div.credit_div:last").attr('id','credit_div'+i);
       cr.find(".remove_credit:last").attr('id','remove_credit'+i);
       cr.find(".remove_credit:last").attr('rel',i);
       cr.find('.remove_credit:last').show();
        $(".credit_div .borrower_credit_date:last").val('');
        $(".credit_div .borrower_credit_score:last").val('');
        $(".credit_div .file_name:last").val('');
        $(".credit_div .credit_docs:last").val('');
        $(".credit_div").find('.error').html('');
       // $("<span>Upload File</span>").insertAfter('.fa-upload:last');
       
        
        $(".credit_div").find('input.borrower_credit_date').attr("id", "").removeClass('hasDatepicker').removeData('datepicker').unbind().datepicker({
        dateFormat: "mm/dd/yy",
        changeMonth: true,
        yearRange: "-100:+0",
        changeYear: true,
       // maxDate: new Date(),
        maxDate :0,
        showButtonPanel: false,
        beforeShow: function() {
            setTimeout(function() {
                $('.ui-datepicker').css('z-index', 99999999999999);

            }, 0);
        }
    });;
    
          i++;
      });


 $("#save_credit").click(function(){
       
        if($("#creditScoreForm").valid()){
          //var credit_count = $("#credit_count").val();
          //var file_name = $(".file_name").val();

         /* if((credit_count=='' || credit_count==0 || typeof credit_count=='undefined')&&(file_name=='')){
            $(".credit_err").html('Please upload document');
            return false;
          }else{
*/            $(".credit_err").html('');
            var post_data = new FormData($('#creditScoreForm')[0]);
            post_data[global_csrf_token_name]= global_csrf_token_value;
            $.ajax({
                type: 'POST',
                url: baseUrl + 'backend/developers/credit_score_save',
                dataType: "json", 
                data: post_data,
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                success:function(res){
                  
                  
                  $(".credit_score_success").html('Credit score details saved successfully');
                  $(".credit_div").find('input').val('');
                  $(".credit_div").find('select').val('');
                  $("div.credit_div:not(:first)").hide();
                  get_creditlist(creditlistdata,creditlistUrl);
                
              }
         });
      //}
       }
    });


 $("#creditScoreForm").validate({
    onkeyup:false,
    onchange:false,
     ignore:false,
     
     rules:{
         'borrower_credit_date[]':{required:true},
         'borrower_credit_score[]':{required:true},
         /*'file_name_credit[]':{required:true}*/
     },
     messages:{
         'borrower_credit_date[]':{required:"please fill this field"},
         'borrower_credit_score[]':{required:"please fill this field"},
         /*'file_name_credit[]':{required:"please upload a document"}*/
     }


   });
 var page_name = $("#page_name").val();
 if(page_name=='credit_score'){
    $('input[name^="credit_docs"]').rules('add', {
        required: true,
        messages : { required : 'Please upload a Document' }
        
    });
 }
 

$('body').on('click', '.remove_credit', function(){ 

     var rem = $(this).attr('rel');
     if(rem!=0)
     var rem_confirm = confirm('Are you sure you dont want to add a new Credit Check Score?');
     if(rem_confirm){
        $("#credit_div"+rem).remove();
        
     }
  });


$('body').on('click', '.delete_creditscore', function(){ 
  
    var $creditid           = $(this).attr('rel');
    var concredit = confirm("Are you sure you want to delete this item?");
    if(concredit){
      var post_data = {creditid:$creditid};
      post_data[global_csrf_token_name]= global_csrf_token_value;
     $.ajax({
             
          type:"post",
          dataType:"json",
          async: false,
          data:post_data,
          url:baseUrl + 'backend/developers/delete_creditscore',
          success:function(res){
           
            get_creditlist(creditlistdata,creditlistUrl,function(){
            
            $(".clist_success").html('Creditscore deleted successfully');
            
          });
         }
      });
         
     }
    
    });


function get_creditlist(data,url,callback){ 
  data[global_csrf_token_name]= global_csrf_token_value;
  $.post(url, data, function(response){
      
      var response = $.parseJSON(response);
      $(".credit_list").html(response.creditdata);
      
      if(typeof(callback)=='function'){
        callback();
      }
      // pagination
      $(".pagination a").click(function(e){   
          e.preventDefault();
          url = $(this).attr('href');
          get_creditlist(data,url);
      });
    });
}

/*credit score ends*/



/*background check starts*/

var dev = $("#developer_id").val();
var bglistdata = {dev:dev};
var bglistUrl = baseUrl+'backend/developers/bgcheck_list_ajax';

get_bglist(bglistdata,bglistUrl);


$(".borrower_bg_date").datepicker({
        dateFormat: "mm/dd/yy",
        changeMonth: true,
        yearRange: "-100:+0",
        changeYear: true,
        maxDate :0,
    });

var j=$('.remove_bg:last').attr('rel');
      
      if(j==0){ 
         $("#remove_bg0").hide();
      }

 var i = 1;
$(".add_bg").click(function(e){
      
       e.preventDefault();
       var cr =  $(".bg_div:first").clone().insertAfter("div.bg_div:last");
       $("div.bg_div:last").attr('id','bg_div'+i);
       cr.find(".remove_bg:last").attr('id','remove_credit'+i);
       cr.find(".remove_bg:last").attr('rel',i);
       cr.find('.remove_bg:last').show();
        $(".bg_div .borrower_bg_date:last").val('');
        $(".bg_div .borrower_bg_score:last").val('');
        $(".bg_div .file_name:last").val('');
        $(".bg_div .bg_docs:last").val('');
        $(".bg_div").find('.error').html('');
       // $("<span>Upload File</span>").insertAfter('.fa-upload:last');
       
        
        $(".bg_div").find('input.borrower_bg_date').attr("id", "").removeClass('hasDatepicker').removeData('datepicker').unbind().datepicker({
        dateFormat: "mm/dd/yy",
        changeMonth: true,
        yearRange: "-100:+0",
        changeYear: true,
        maxDate: 0,
        showButtonPanel: false,
        beforeShow: function() {
            setTimeout(function() {
                $('.ui-datepicker').css('z-index', 99999999999999);

            }, 0);
        }
    });;
    
          i++;
      });


 $("#save_bg").click(function(){
       
        if($("#bgForm").valid()){
          //var credit_count = $("#credit_count").val();
          //var file_name = $(".file_name").val();

         /* if((credit_count=='' || credit_count==0 || typeof credit_count=='undefined')&&(file_name=='')){
            $(".credit_err").html('Please upload document');
            return false;
          }else{
*/            $(".bg_err").html('');
            var post_data = new FormData($('#bgForm')[0]);
           
            $.ajax({
                type: 'POST',
                url: baseUrl + 'backend/developers/background_check_save',
                dataType: "json", 
                data: post_data,
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                success:function(res){
                  
                  
                  $(".bg_success").html('Background check details saved successfully');
                  $(".bg_div").find('input').val('');
                  $(".bg_div").find('select').val('');
                  $("div.bg_div:not(:first)").hide();
                  get_bglist(bglistdata,bglistUrl);

                
              }
         });
      //}
       }
    });


 
   $("#bgForm").validate({
     
     rules:{
         'borrower_bg_date[]':{required:true},
         'borrower_bg_score[]':{required:true},
        // 'credit_docs[]':{required:true},
         
     },
     messages:{
         'borrower_bg_date[]':{required:"please fill this field"},
         'borrower_bg_score[]':{required:"please fill this field"},
         //'credit_docs[]':{required:"Please upload a Document"},
         
     }


   });
  if(page_name=='bgcheck'){
   $('input[name^="bg_docs"]').rules('add', {
        required: true,
        messages : { required : 'Please upload a Document' }
        //accept: "image/jpeg, image/pjpeg"
    });

 }
$('body').on('click', '.remove_bg', function(){ 

     var rem = $(this).attr('rel');
     if(rem!=0)
     var rem_confirm = confirm('Are you sure you dont want to add a new Background check?');
     if(rem_confirm){
        $("#bg_div"+rem).remove();
        
     }
  });


 $('body').on('click', '.delete_bgcheck', function(){ 
  
    var $bgid           = $(this).attr('rel');
    var conbg = confirm("Are you sure you want to delete this item?");
    var post_data = {bgid:$bgid};
      post_data[global_csrf_token_name]= global_csrf_token_value;
    if(conbg){
     $.ajax({
             
          type:"post",
          dataType:"json",
          async: false,
          data:post_data,
          url:baseUrl + 'backend/developers/delete_bgcheck',
          success:function(res){
            
            get_bglist(bglistdata,bglistUrl,function(){
            
            $(".bglist_success").html('Backgroundcheck deleted successfully');
            
          });
          }
      });
         
     }
    
    });


function get_bglist(data,url,callback){ 
  data[global_csrf_token_name]= global_csrf_token_value;
  $.post(url, data, function(response){
      
      var response = $.parseJSON(response);

      $(".bg_list").html(response.bgdata);
      
      if(typeof(callback)=='function'){
        callback();
      }
      // pagination
      $(".pagination a").click(function(e){   
          e.preventDefault();
          url = $(this).attr('href');
          get_bglist(data,url);
      });
    });
}

/*background check ends*/


/* Track record */

$('body').on('click', '.delete_track_doc', function(){
var dev_id = $("#dev_id").val();
 var track_id = $(this).prop('id');
 var post_data = {track_id:track_id};
      post_data[global_csrf_token_name]= global_csrf_token_value;
var condl = confirm("Are you sure you want to delete this Document?");
    if(condl){
     $.ajax({
             
          type:"post",
          dataType:"json",
          async: false,
          data:post_data,
          url:baseUrl + 'backend/developers/delete_track_document',
          success:function(res){
            
            window.location.href=base_url+"backend/developers/pipeline_documents/"+dev_id;
            
         
          }
      });
         
     }

})

$('body').on('change', '.sup_docs', function(){ 
          
          var name = $(this).val();
          var fname = name.replace(/^.*[\\\/]/, '');
        
          // $(this).closest('.sup_docs_div').prev('.doc_upload').find('.file_name').val(fname); 
        

         $(this).closest('.sup_docs_div').prev('.doc_upload').find('span .spanerr').empty().remove();
         
          
      });

var jc=$('.remove_tr1:last').attr('rel');
    
      if(jc==0){ 
         $(".remove_tr1").hide();
      }
 var hc=$('.remove_tr2:last').attr('rel');
     
      if(hc==0){ 
         $(".remove_tr2").hide();
      }

       var kc=$('.remove_tr3:last').attr('rel');
     
      if(kc==0){ 
         $(".remove_tr3").hide();
      }
 var trc = 1;
      
$(".add_more1").click(function(e){
     
      	//e.preventDefault();
     
       var tr = $(this).closest('.file-form').find(".div_upload1:last").after($(this).closest('.file-form').find('.div_upload1:last').clone());//.insertAfter(".div_upload:last");
      
      $(this).closest('.file-form').find('.div_upload1:last').attr('id','div_upload1'+trc);
       // $("div.div_upload:last").attr('id','div_upload'+trc);
        $(this).closest('.file-form').find(".remove_tr1:last").attr('id','remove_tr1'+trc);
        $(this).closest('.file-form').find(".remove_tr1:last").attr('rel',trc);
        $(this).closest('.file-form').find('.remove_tr1:last').show();
        // $(this).closest('.file-form').find('.div_upload1:last').find('.file_name').val('');
         $(this).closest('.file-form').find('.div_upload1:last').find('.sup_docs').val('');
        trc++;
      });

 var trtw = 1;
      $(".add_more2").click(function(e){
     
      	e.preventDefault();
      
       var tr = $(this).closest('.file-form').find(".div_upload2:last").after($(this).closest('.file-form').find('.div_upload2:last').clone());//.insertAfter(".div_upload:last");
      
      $(this).closest('.file-form').find('.div_upload2:last').attr('id','div_upload2'+trtw);
       // $("div.div_upload:last").attr('id','div_upload'+trc);
        $(this).closest('.file-form').find(".remove_tr2:last").attr('id','remove_tr2'+trtw);
        $(this).closest('.file-form').find(".remove_tr2:last").attr('rel',trtw);
        $(this).closest('.file-form').find('.remove_tr2:last').show();
        $(this).closest('.file-form').find('.div_upload2:last').find('.file_name').val('');
        
        trtw++;
      });

        var trth = 1;
      $(".add_more3").click(function(e){
     
      	e.preventDefault();
      
       var tr = $(this).closest('.file-form').find(".div_upload3:last").after($(this).closest('.file-form').find('.div_upload3:last').clone());//.insertAfter(".div_upload:last");
      
      $(this).closest('.file-form').find('.div_upload3:last').attr('id','div_upload3'+trth);
       // $("div.div_upload:last").attr('id','div_upload'+trc);
        $(this).closest('.file-form').find(".remove_tr3:last").attr('id','remove_tr3'+trth);
        $(this).closest('.file-form').find(".remove_tr3:last").attr('rel',trth);
        $(this).closest('.file-form').find('.remove_tr3:last').show();
        $(this).closest('.file-form').find('.div_upload3:last').find('.file_name').val('');
        
        trth++;
      });


 $('body').on('click', '.remove_tr1', function(){ 

     var rem = $(this).attr('rel');
     if(rem!=0)
     var rem_confirm = confirm('Are you sure you want to delete the Supportive Document?');
     if(rem_confirm){
        $("#div_upload1"+rem).remove();
     }
  });

  $('body').on('click', '.remove_tr2', function(){ 

     var rem = $(this).attr('rel');
     if(rem!=0)
     var rem_confirm = confirm('Are you sure you want to delete the Supportive Document?');
     if(rem_confirm){
        $("#div_upload2"+rem).remove();
     }
  });

   $('body').on('click', '.remove_tr3', function(){ 

     var rem = $(this).attr('rel');
     if(rem!=0)
     var rem_confirm = confirm('Are you sure you want to delete the Supportive Document?');
     if(rem_confirm){
        $("#div_upload3"+rem).remove();
     }
  });

   $('body').on('change', '#experience', function(e){ 
        var i;
        var flag = 0;
        var exp_min = $('#experience option:selected').attr('min');
        var exp_max = $('#experience option:selected').attr('max');
        var years = $("#invested_years").val();
       
        if(years>exp_max||years<exp_min){
          
         // $("#invested_years").parent().find('span').empty().remove();
          

           
           // $("#invested_years").parent().append('<span class="spanerr" style="color:red;">Please enter valid No.of years <span>');
           $("#invested_years").css('border-color','red');
        }else{
          //$("#invested_years").parent().find('span').empty().remove();
          $("#invested_years").css('border-color','');
        }


    });
/* Track record ends*/


});