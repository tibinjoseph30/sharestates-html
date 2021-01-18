var base_url =  $("#base-url-1").val();
$(document).ready(function(){

var myDataTable =  $('#appraiser-table-list').DataTable({
        "dom": '<<t>p>',
        "aLengthMenu":false,
        "paging":   true,
        "bLengthChange": true,
        "pageLength": 15,
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
     $('#header').text('List of Loans - Inactive');
    });

    $(document).on('click','#active',function(){
     $('.project_status').val('A').trigger('change');
     $('#header').text('List of Loans - Active');
    });

    $(document).on('click','#total_loans',function(){
     $('.project_status').val('').trigger('change');
     $('#header').text('List of Loans');
    });



    $('#search-reset').click(function(){
        oTable.fnFilter('');
        $('#search-input').val('');
        $('#loan_no').val('').trigger('keyup');
        $('.search').val('').trigger('change');
        
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
            $('#close_date_from').datepicker('setStartDate', maxdate);
        });

       $("#create_date_from").datepicker({
        dateFormat: 'mm/dd/yy', 
        defaultDate: "+w",
        changeMonth: true,
        numberOfMonths: 1,
        autoclose: true,
        }).on('changeDate', function (selected) {
            var minDate = new Date(selected.date.valueOf());
            $('#create_date_to').datepicker('setStartDate', minDate);
        });
        
       $("#create_date_to").datepicker({
        dateFormat: 'mm/dd/yy', 
        defaultDate: "+w",
        changeMonth: true,
        numberOfMonths: 1,
        autoclose: true,
        }).on('changeDate', function (selected) {
            var maxdate = new Date(selected.date.valueOf());
            $('#create_date_from').datepicker('setStartDate', maxdate);
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
          
                var post_data = {project_id:projectId,project_type:projectType};
                post_data[global_csrf_token_name]= global_csrf_token_value;
                $.ajax({
                type: "POST",
                dataType:"json",
                async: false,
                data:post_data,
                url :  base_url + 'backend/pipeline/project_status_log',
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
                        source: base_url + 'backend/pipeline/get_autocomplete_user',
                        minLength: 1,
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
        }else{
          
            var con            = confirm("Are you sure you want to continue?");
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
        //var project_type = $("#project_type").val();
        var project_const = $("#project_const").val();
        
        window.location.href = base_url+"loan/project_export/export_excel?searchKey="+search+"&loan_no="+loan_no+"&close_date_from="+close_date_from+"&close_date_to="+close_date_to+"&create_date_from="+create_date_from+"&create_date_to="+create_date_to+"&project_const="+project_const;
    });




});