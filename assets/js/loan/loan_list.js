var base_url =  $("#base-url-1").val();
$(document).ready(function(){

        $('#search-input').val('');
        $('#loan_no').val('');
        $('.search').val('');

        

var myDataTable =  $('#appraiser-table-list').DataTable({
        "dom": '<<t>p>',
        "aLengthMenu":false,
        "paging":   true,
        "bLengthChange": true,
        "pageLength": 15,
        'bAutoWidth': false ,
        "drawCallback": function( settings ) {
            var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate'); 
            pagination.toggle(this.api().page.info().pages > 1);
        },

         "createdRow": function ( row, data, index ) {
            // Add an class to each <tr>
            $(row).addClass('text-nowrap');
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
            "url": base_url+'loan/loan_details/ajax_manage_project/',
            "type": "GET",
            "data": function(d){

                var loc_id 	= $(".loctaion-search").find("option:selected").val();
                var pr_type = $(".property-search").find("option:selected").val();
                var status 	= $(".status-search").find("option:selected").val();
                
                //var role_status = $(".role-status").find("option:selected").val();
                //var dept_status = $(".dept-status").find("option:selected").val();
                i=1;
                d['location'] = loc_id;
                d['property_type'] = pr_type;
                d['status'] = status;
                //d['dept_status'] = dept_status;
                //alert(sort_status);
            }
        },
        "targets": [ 0 ],
        "columns": [    
                        {  data : "project_id","orderable": false,  "visible": false},
                        { "data": "c_count","orderable": false},
                        { "data": "project_extend_loan_number"},
                        { "data": "project_name"},
                        { "data": "developer_name"},
                        { "data": "project_goal"},
                        { "data": "total_invested_amount","orderable": false},
                        { "data": "active_investment","orderable": false},
                        { "data": "select","orderable": false},
                    
                        { data:null,"orderable": false,className:"text-nowrap ",render:function(data){

                        
                            return data.actions;

                        }},
                        
                    ],
    });

 oTable = $('#appraiser-table-list').dataTable();

    $('#project_const').change(function(){
        oTable.fnFilter($(this).val(), 8, null, false );
    });


    $('#close_date_from').change(function(){
        oTable.fnFilter($(this).val(), 1, null, false );
    });

    $('#searchKey').keyup(function(){
        oTable.fnFilter($(this).val());
    });

    $('#loan_no').keyup(function(){
        oTable.fnFilter( $(this).val(), 2, null, false );
    });
    
    $('#close_date_to').change(function(){
        oTable.fnFilter($(this).val(), 3, null, false );
    });

    $('#create_date_from').change(function(){
        oTable.fnFilter($(this).val(), 4, null, false );
    });

    $('#create_date_to').change(function(){
        oTable.fnFilter($(this).val(), 5, null, false );
    });

    $('#project_type_search').change(function(){
        oTable.fnFilter($(this).val(), 6, null, false );
    });

    $('#project_construction').change(function(){
        oTable.fnFilter($(this).val(), 7, null, false );
    });
    $('#project_status').change(function(){
        oTable.fnFilter($(this).val(), 0, null, false );
    });

    $(document).on('click','#inactive',function(){
     $('.project_status').val('I').trigger('change');
     $('#header').text('Loan List - Inactive');
    });

    $(document).on('click','#active',function(){
     $('.project_status').val('A').trigger('change');
     $('#header').text('Loan List - Active');
    });

    $(document).on('click','#total_loans',function(){
     $('.project_status').val('').trigger('change');
     $('#header').text('Loan List');
    });



    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#loan_no').val('').trigger('keyup');
        $('.search').val('').trigger('change');
        $('.project_status').val('').trigger('change');
        $('#header').text('Loan List');
        $('#close_date_from').datepicker('refresh');
        $('#close_date_to').datepicker('refresh');

    });


//datepicker
	
      $("#close_date_from").datepicker({
        dateFormat: 'mm/dd/yy', 
        defaultDate: "+w",
        changeMonth: true,
        numberOfMonths: 1,
        autoclose: true,
        }).on('changeDate', function (selected) {
            var minDate = new Date(selected.date.valueOf());
            $('#close_date_to').datepicker('setStartDate', minDate);
        });

      $("#close_date_to").datepicker({
        dateFormat: 'mm/dd/yy', 
        defaultDate: "+w",
        changeMonth: true,
        numberOfMonths: 1,
        autoclose: true,
        }).on('changeDate', function (selected) {
            var maxdate = new Date(selected.date.valueOf());
            $('#close_date_from').datepicker('setEndDate', maxdate);
        });

       $("#create_date_from").datepicker({
        dateFormat: 'mm/dd/yy', 
        defaultDate: "+w",
        changeMonth: true,
        numberOfMonths: 1,
        autoclose: true,
        }).on('changeDate', function (selected) {
            var minDate2 = new Date(selected.date.valueOf());
            $('#create_date_to').datepicker('setStartDate', minDate2);
        });
        
       $("#create_date_to").datepicker({
        dateFormat: 'mm/dd/yy', 
        defaultDate: "+w",
        changeMonth: true,
        numberOfMonths: 1,
        autoclose: true,
        }).on('changeDate', function (selected) {
            var maxdate2 = new Date(selected.date.valueOf());
            $('#create_date_from').datepicker('setEndDate', maxdate2);
        });

    
});
$(function() {
    $("body").delegate(".reo_date", "focusin", function(){
        $(this).datepicker({
        dateFormat: 'mm/dd/yy',
        yearRange: '2000:2025',
        defaultDate: "+w",
        changeYear: true,
        autoclose: true,
        });
    });

    $('body').on('change', '.project_type', function(e){

        var projectType    = $(this).val();
        var oldProjectType = $(this).attr('rel');
        var projectId      = $(this).attr('param');
        
            if(projectType=='R' || projectType=='RS'){
              var con = confirm("Are you sure you want to continue?");
              if(con == true){
          
                var post_data = {project_id:projectId,project_type:projectType};
                post_data[global_csrf_token_name]= global_csrf_token_value;
                $.ajax({
                type: "POST",
                dataType:"json",
                async: false,
                data:post_data,
                url :  base_url + 'loan/loan_details/project_status_log',
                success : function(response){
                    $(".status-popup").html(response.disvalue);
                    if(projectType=='RS'){
                    $('.reo_sold').show();
                    $('.reolabel').html('REO Sold Date');
                    }
                    $('#create_date_from').datepicker();
                    $('.project_stattype').val(projectType);

                    $("#mystatusModal").modal('show');
                    $('.reo_sold_to').show();
                    $( "#reo_sold_to" ).autocomplete({
                        source: base_url + 'loan/loan_details/get_autocomplete_user',
                        minLength: 1,
                        appendTo: ".searchlister",
                        select: function(event, ui) {
                         $('#sold_to').val('');
                        if(ui.item == null || ui.item == undefined) {
                        alert("Invalid user");
                        $(this).val('');

                        } else {
                        id    = ui.item.id;
                        value = ui.item.value;
                        $('.sold_to').val(id);

                        }         

                        },
                        change: function(event,ui){
                        
                        }

                   });

                 }
                });
              }
              else{
                $(this).val(oldProjectType);
                return false;
              }
            }else if(projectType=='F'){
                alert('You cannot manually change the loan status to Funded');
                $(this).val(oldProjectType);
            }/*else if(projectType=='CF'){
                alert('You cannot manually change the loan status to Cash Flowing');
                $(this).val(oldProjectType);
            }*/
            else{
              var con = confirm("Are you sure you want to continue?");
              if(con == true){
                window.location.href=base_url+"loan/loan_details/change_type_status/"+projectId+"/"+projectType+"/B";
              }else{
                $(this).val(oldProjectType);
                return false;
              }   
            }        
            
    
        /*var projectType    = $(this).val();
        var oldProjectType = $(this).attr('rel');
        var projectId      = $(this).attr('param');
        var con            = confirm("Are you sure you want to continue?");
        if(con == true){
            window.location.href=base_url+"loan/loan_details/change_type_status/"+projectId+"/"+projectType+"/B";            
        }else{
            $(this).val(oldProjectType);
            return false;
        }*/
    });

$("#excel").click(function(){ 
        var search = $("#searchKey").val();
        var loan_no = $("#loan_no").val();
        var close_date_from = $("#close_date_from").val();
        var close_date_to = $("#close_date_to").val();
        var create_date_from = $("#create_date_from").val();
        var create_date_to = $("#create_date_to").val();
        var project_type = $("#project_type_search").val();
        var project_const = $("#project_const").val();
        
        window.location.href = base_url+"loan/project_export/export_excel?searchKey="+search+"&loan_no="+loan_no+"&close_date_from="+close_date_from+"&close_date_to="+close_date_to+"&create_date_from="+create_date_from+"&create_date_to="+create_date_to+"&project_const="+project_const+"&project_type="+project_type;
    });

$(document).on({
    click: function() {  
    var project_id = $(this).attr('id');
    var con = confirm('Do you want to send draw request form to the borrower?');
    if(con){
        var post_data = {project_id:project_id};
      $.ajax({
          type: 'POST',
          data: post_data,
          url: base_url+'backend/draw_request/request_draw_email',
          dataType: "html",
          success: function (response) {
            alert("Email sent successfully.");
          }
      });
    }
    },
}
, '.request_draw');



$(document).on(
{
    click: function() 
    {  
      //var base_url = '<?=base_url().index_page()?>';
      var reg = new RegExp("(\\w+)(\\s+)(\\w+)");
      var project_id = $("#project_id").val();
      var msg = $("#reason_for_deletion").val();
      msg = $.trim(msg);
      var val = reg.test(msg);
      $("#show_errmsg").html('');
      if(msg=="") {
        $("#reason_for_deletion").css("border-color",'red'); 
        $("#show_errmsg").html('Please enter a valid reason.');
        return false;
      }
      else if(msg.match(/^\d+$/)) {
        $("#reason_for_deletion").css("border-color",'red');
        $("#show_errmsg").html('Please enter a valid reason.');
        return false;
      }
      else if(!/[a-z]/.test(msg)) {
        $("#reason_for_deletion").css("border-color",'red');
        $("#show_errmsg").html('Please enter a valid reason.');
        return false;
      }
      else if(val==false) {
        $("#reason_for_deletion").css("border-color",'red');
        $("#show_errmsg").html('Please enter a valid reason.');
        return false;
      }
      else if (/(.)\1\1/.test(msg)) {
      //else if(/([A-Za-z0-9])(.*?\1){3}/.test(msg) ) {
        $("#reason_for_deletion").css("border-color",'red');
        $("#show_errmsg").html('Please enter a valid reason.');
        return false;
      }
      else{ 
        $("#delete-popup").hide();
        var post_data = {project_id:project_id,message:msg};
        $.ajax({
          type: 'POST',
          url: base_url +'backend/projects/delete_status',
          // data: 'project_id=' + project_id + '&message=' + msg,
          data:post_data,
          dataType: "html",
          success: function (response) {
            window.location.href = base_url+'loan/loan_details';
          }
        });
      }
    },
}
, '#ok-btn');


    //Save
    $('body').on('click', '#save_reo', function(){ 
            var reo_date    = $('#reo_date').val();
            var reo_sold_to = $('#reo_sold_to').val();
            var projectType = $('#project_stattype').val();
            var projectId  =  $('#project_id_reo').val();
           
            var flag = 0;
            $("#reo-errordis").html('');
            $("#reosold-errordis").html('');
            if(projectType=='R' || projectType=='RS'){
                if(reo_date==""){
                    if(projectType=='RS'){
                        $("#reo-errordis").html('REO Sold Date is required');
                    }else{
                        $("#reo-errordis").html('REO Date is required');
                    }
                    var flag=1;
                    return false;
                }
             
            }
            if(projectType=='RS'){
                if(reo_sold_to==""){
                    $("#reosold-errordis").html('REO Sold To is required');
                    var flag=1;
                    return false;
                }
             
            }
           
            if(flag==0){

              var regen_formdata  = new FormData($('#reo_save')[0]);
              $(this).attr('disabled', 'disabled');
             
              $.ajax({
                  type: 'POST',
                  data: regen_formdata,
                  url:  base_url + 'loan/loan_details/save_reo_details',
                  dataType: "json",
                  async:false,
                  contentType: false,
                  processData: false,
                  success: function (response) {
                   $('#mystatusModal').modal('hide');
                   window.location.href=base_url+"loan/loan_details/change_type_status/"+projectId+"/"+projectType+"/B";
                  }
              });

           }
      });

//function deletepop(id,str,num){ 
 $('body').on('click', '.deletepopclass', function(){ 
  $("#appraiser-delete-form")[0].reset();
  $("#reason_for_deletion").css("border-color",'');
  $("#show_errmsg").html('');
  var id   = $(this).attr('rel');
  var str  = $(this).data('id');
  var num  = $(this).data('value');

  if(str=="A"){
    alert('Active projects cannot be deleted. Please change the status to inactive before deleting it.');
  }
  else if(num>0){
    alert('This project is already having active investors. Please delete investors before deleting the project.');
  }
  else{
    $("#delete-popup").modal().fadeIn(888);
    $("#project_id").val(id);
    //window.location.href="#delete-popup";
  }
});

  $('body').on('click', '#reo_view', function(){
    var reo_type      = $(this).attr('rel');
    var project_id    = $(this).data('project');
    var post_data = {reo_type:reo_type,project_id:project_id};
    post_data[global_csrf_token_name]= global_csrf_token_value;
        
    $.ajax({
      type: 'POST',
      data: post_data,
      url:  base_url + 'loan/loan_details/view_reo_details',
      dataType: "json",
      
      success: function (response) {
       $(".reo-popup").html(response.disvalue);
       $("#reo-modal").modal('show');
      
      }
    });
         
  });

  $('body').on('click', '#reo_cancel', function(){

    var curent=$('#curent_type').val();
    //alert(curent);

    var pro_id=$('#project_id_reo').val();

    $("#reo-modal").modal('hide');


   $("#"+pro_id).val(curent);

    


    });

  $('body').on('click', '.auto_invest', function(){

    
    var project_id    = $(this).attr('id');
    var post_data = {project_id:project_id};
    post_data[global_csrf_token_name]= global_csrf_token_value;
        
    $.ajax({
      type: 'POST',
      data: post_data,
      url:  base_url + 'loan/loan_details/investor_list',
      dataType: "json",
      
      success: function (response) {
        console.log(response);
       $(".auto_invest-popup").html(response.disvalue);
       $("#auto-popup").modal('show');
      
      }
    });
         
  });


      // Active - Inactive
    $("#project-inactive-form").validate({
        onkeyup: false,
        ignore : false,
        rules: {
            inactive_reason:{required:true},
        },
        messages: {
            inactive_reason:{required:"Reason For Inactivating is required"},

        },
        errorPlacement: function(error, element) {
              error.insertAfter(element); 
        }
    });

    $(document).on('click','.activate-deactivate',function(){
        var p_id = $(this).attr('data-id');
        var type = $(this).attr('data-value');
        if(type=="I"){
          status_update({'status':type,'project_id':p_id,'csrf_test_name':global_csrf_token_value},base_url+'loan/loan_details/change_status',"Do you really want to change status of this project?","Project status updated successfully.","Project status is could not be updated",'appraiser-table-list');
        }else{
          $("#project-inactive-form")[0].reset();
          var form_valid = $("#project-inactive-form").validate();
              form_valid.resetForm();
          $(".inactive-project-modal").find('#myLargeModalLabel').html('Deactivate Project');
          $(".inactive-project-modal").modal('show');
          $(".inactive-project-modal").find('#project_status').val(type);
          $(".inactive-project-modal").find('#project_id').val(p_id);
        }
    });

    $(document).on('click','#inact-project',function(){
        var form_valid = $("#project-inactive-form").valid();
        if(form_valid == true){
            $.post(base_url+'loan/loan_details/change_status',$("#project-inactive-form").serialize(),function(response){
                var response = $.parseJSON(response);
                if(response.status == true){
                    $(".inactive-project-modal").modal('hide');
                    $('#appraiser-table-list').DataTable().ajax.reload();
                    swal("Updated!", "Project status updated successfully.", "success");
                    
                    if((response.inactive_count)!= undefined)
                        $('#inactive').find('span').html(response.inactive_count);
                    if((response.active_count)!= undefined)
                        $('#active').find('span').html(response.active_count);
       
                }else{
                     swal("Cancelled", "Project status is could not be updated", "error");
                }
            });
        }else{

        }
    });

});

