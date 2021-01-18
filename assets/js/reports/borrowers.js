var base_url = $("#base-url-1").val();
$(document).ready(function(){
    
    //alert('ff')
    var myDataTable =  $('#investorList').DataTable({
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

        order: [4, 'asc' ],
        "processing": true,
        "serverSide": true,
        //"ajax": window.location.href,
        "ajax": {
            "url": base_url+'report/borrowers/ajax_borrower_list',
            "type": "GET",
            "data": function(d){

                var from_date = $("#from_date").val();
                var to_date = $("#to_date").val();
                var date_range = $("#dateranges").find('.btn-primary').val();
                var status = $(".status-search").find("option:selected").val();

                var state = $('#state').find("option:selected").val();
                var asset_type = $("#asset_types").val();
                var cities = $("#cities").val();

                i=1;
                //d['from_date']  = from_date;
                //d['to_date']    = to_date;
                //d['date_range'] = date_range;
                //d['status']     = status;

                d['state']     = state;
                d['asset_type']     = asset_type;
                d['cities']     = cities;
            }
        },
        "targets": [ 0 ],
        "columns": [
                
            { data: "project_id","orderable": false,  "visible": false},
            // { "data": "count","orderable": false},
            // { "data": "join_date"},
            { "data": "project_extend_loan_number"},
            { "data": "project_name"},
            { "data": "project_asset_type"},
            { "data": "project_city"},
            { "data": "state"},
            { "data": "developer_name",},
            { "data": "developer_email"},
            { "data": "user_phone"},
            { "data": "type","orderable": false},

           
        ],
    });

    oTable = $('#investorList').dataTable();


    $(document).on('change','#state',function(){
        //alert('dd')
        //show_or_hide_reset();
        //$(".preloader").show();
        $('#investorList').DataTable().ajax.reload();
        //$(".preloader").hide();
    });
    var city = null;
    $.getJSON(base_url+'admin_template/assets/json/cities.json', function(response) {
        city = response.city;
    });

    function split( val ) {
        return val.split( /,\s*/ );
    }
    function extractLast( term ) {
        // alert();
    
        return split( term ).pop();
    }
    $( "#cities" )
    // don't navigate away from the field on tab when selecting an item
    .on( "keydown", function( event ) {
    if ( event.keyCode === $.ui.keyCode.TAB &&
        $( this ).autocomplete( "instance" ).menu.active ) {
        event.preventDefault();
    }
    })
    .autocomplete({
        minLength: 0,
        source: function( request, response ) {
        // delegate back to autocomplete, but extract the last term
        response( $.ui.autocomplete.filter(
            city, extractLast( request.term ) ) );
        },
        focus: function() {
        // prevent value inserted on focus
        return false;
        },
        select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        $('#investorList').DataTable().ajax.reload('',true);
        //myDataTable.DataTable().ajax.reload();
        return false;
        }
    });

    var asset_types = ["Multi-Family","Commercial","Portfolio","Residential","Mixed Use","Land"];
    $( "#asset_types" )
    // don't navigate away from the field on tab when selecting an item
    .on( "keydown", function( event ) {
    if ( event.keyCode === $.ui.keyCode.TAB &&
        $( this ).autocomplete( "instance" ).menu.active ) {
        event.preventDefault();
    }
    })
    .autocomplete({
        minLength: 0,
        source: function( request, response ) {
        // delegate back to autocomplete, but extract the last term
        response( $.ui.autocomplete.filter(
            asset_types, extractLast( request.term ) ) );
        },
        focus: function() {
        // prevent value inserted on focus
        return false;
        },
        select: function( event, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.value );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );
        $('#investorList').DataTable().ajax.reload('',true);
        //myDataTable.DataTable().ajax.reload();
        return false;
        }
    });

    $('#search-reset').click(function(){
        //alert('dd');
        oTable.fnFilter('');
        $('#asset_types').val('');
        $('#cities').val('');
        $('#state').val('').trigger('change');
        $('#investorList').DataTable().ajax.reload();

    });

    $(document).on('click','#export-borrower-list',function(){
        var state = $('#state').find("option:selected").val();
        var asset_type = $("#asset_types").val();
        var cities = $("#cities").val();
        window.location.href = base_url+"report/borrowers/export_borrower_list?&state="+state+"&cities="+cities+"&asset_type="+asset_type;
    });
});