var base_url = $("#base-url-1").val();

$(document).ready(function(){

  var actions;

 $("#amount").on("keypress keyup blur",function (event) {
          
     $(this).val($(this).val().replace(/[^0-9\.]/g,''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) 
            {
                event.preventDefault();
            }
            else
            {
              myDataTable.search(this.value).draw();
            }
        });


var myDataTable =  $('#distribution-table-list').DataTable({
        "dom": '<<tr>p>',
        "aaSorting": "[[2, 'asc']]",
        "aLengthMenu":false,
        "paging": true,
        "bLengthChange": true,
        "pageLength": 15,
        "bAutoWidth": false ,
        "bSortable": true,
 
          "language":{
                "processing": "<div id='loader'></div>",
                 "infoEmpty": "No records found ",
            },

           
        bInfo: false,
        responsive: {
            details: {
                type: 'column'
            }
        },

       order: [10, 'desc' ],
        
        "processing": true,
        "serverSide": true,
        //"ajax": window.location.href,

        
        "ajax": {
            "url": base_url+'backend/distribution_details/ajax_distribution_list',
            "type": "GET",
          "dataType": "json",
            "cache": false,

            "data": function(d){


                 var project_name   = $("#project_name").val();
                var investment_account     = $("#investment_account").val();
                var account_number  = $("#account_number").val();
                var amount = $("#amount").val();


                d['project_name'] = project_name;
                d['investment_account'] = investment_account;
                d['account_number'] = account_number;
                d['amount'] = amount;
            
            	console.log(d);

               
            }


        },
        "targets": [ 0 ], 
        "aoColumns": [ 


                        { "data": "no","bSortable": false},

                        { "data": "parent_name","bSortable": false},

                         { "data": "project_name","bSortable": true},  

                        { "data": "account_type","orderable": false},  

                        
                        { "data": "distribution_amount","bSortable": false},     

                         { "data": "reinvested_amount","bSortable": false}, 
                       
                         { "data": "cash_out_amount","bSortable": false}, 

                         { "data": "bank_account"}, 
                         { "data": "bank_account_number","bSortable": true}, 

                         { "data": "paper_check"}, 

                          { "data": "date"}, 

                           { "data": "notes"}, 
                          { "data": "total_principal_outstanding"}, 

                          { "data": "total_distributions"}, 
                          { "data": "total_principal_outstanding_master"},
                         { "data": "total_distributions_master"},


                        { 


                      data:null,"orderable":false,className:"text-nowrap action-icons",render:function(data){

                      actions ='<a href="'+base_url+'backend/distribution_details/edit/'+data.distribution_id+'" title="Edit"> <i class="fa fa-pencil"></i> </a> ';
                      actions +='<a class="distribution-delete danger-outline distribution-delete mr-1" data-toggle="tooltip" data-original-title="Delete" data-id="'+data.distribution_id+'" data-share_holder_id= "'+data.share_holder_id+'" data-user_id="'+data.user_id+'" data-project_id="'+data.project_id+'"title="Delete"> <i class="fa fa-trash-o text-danger"></i> </a> ';
                                
                      return  actions;                               
                          
                        }




                    }                        
                    ],


    });





$('#project_name').keyup(function(){
 myDataTable.search(this.value).draw();
});

$('#investment_account').keyup(function(){
 myDataTable.search(this.value).draw();
});

$('#account_number').keyup(function(){
 myDataTable.search(this.value).draw();
});


/*$('#amount').keyup(function(){
 myDataTable.search(this.value).draw();
});*/



$('#search-reset').click(function(){
        //$('#distribution-table-list').DataTable.fnFilter('');
         myDataTable.search('').draw();
        $('#project_name').val('');
        $('#investment_account').val('');
        $('#account_number').val('');
        $('#amount').val('');
     
        $('#distribution-table-list').DataTable().ajax.reload();



    });

 //actions +='<a class="distribution-delete danger-outline distribution-delete mr-1" data-toggle="tooltip" data-original-title="Delete" data-id="'+data.distribution_id+'" data-share_holder_id= "'+data.share_holder_id+'" data-user_id="'+data.user_id+'" data-project_id="'+data.project_id+'"title="Delete"> <i class="fa fa-trash-o text-danger"></i> </a> ';
                                
    $(document).on('click','.distribution-delete',function(){
        var distribution_id = $(this).attr('data-id');

      var share_holder_id = $(this).attr('data-share_holder_id');
      var project_id = $(this).attr('data-project_id');

      var user_id = $(this).attr('data-user_id');

    status_update({'user_id':user_id,'share_holder_id':share_holder_id,'project_id':project_id,'distribution_id':distribution_id,'csrf_test_name':global_csrf_token_value},base_url+'backend/distribution_details/delete',"Do you really want to delete this distribution?","Distribution deleted successfully.","Distribution could not be deleted",'distribution-table-list');
    });


 


    });





 $(document).on('click','.view_note',function(){

  var distribution_id = $(this).attr('data-id');

 // alert(project_id);


    var post_data = {};
    post_data = {distribution_id : distribution_id};
    post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({
        type: 'POST',
        data: post_data,
        url:  base_url+'backend/distribution_details/get_note',
        success: function (result) {
            var response = $.parseJSON(result); 
            if(response.status == true){
                 $(".note-modal").modal('show');

                 $("#distri_note").html(response.note);
                 

            }

        }
    });








  });
   





var ShwPnl = false;
function ShwLoadingPanel(){
    if(!ShwPnl){
        var lDPnl = jQuery(document.createElement('div'))
        lDPnl.attr("id","loadingPnl");    
        lDPnl.attr("class","animsition-loading");    
        lDPnl.css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px").css("opacity",0);
        lDPnl.css("background","url("+base_url+"images/ajax-loader.gif) no-repeat center rgba(255, 255, 255, 0.4)").css("position","fixed").css("left","0px").css("top","0px").css("z-index","10000"); 
        jQuery(lDPnl).appendTo("body");
        lDPnl.fadeTo(550, 1);
        ShwPnl = true;
    }else
        jQuery("#loadingPnl").fadeIn(550);
}
        
function remvLoadingPanel(){
    jQuery("#loadingPnl").fadeOut(100);
}