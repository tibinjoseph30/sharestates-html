var base_url = $("#base-url-1").val();
$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip();
    
    var userEmail       = $("#user_email").val();
    var countryCode     = $("#country_code").val();
    var radios          = $('input[name="master"]:checked').val();
    var main_user_id    = $("#main_user_id").val();
    
    if(radios=="on"){
        radios = 'Y';
    }else{
        radios ='N';
        $('input[name="accountType"]').prop( "disabled", true );
    }

    var acntstat = $("#acntstat").val();
    if(acntstat != "Y"){
        $("#myDiv").addClass("disabledbutton");
    }


    $('.bulk_date').datepicker({
        dateFormat: 'dd',
        defaultDate: "+w",
        changeMonth: false,
        changeYear: false,
        inline: true,
        sideBySide: true,
        orientation:"bottom"
        // container:'bulk_date'
    }).on('changeDate', function(e) {
        var a    = new Date(e.date);
        var  day = '' + a.getDate();
        var abb = [' th',' st',' nd',' rd',' th',' th',' th',' th',' th',' th'];
        if ((day %100) >= 11 && (day%100) <= 13){
            var abbreviation = day;
        }else{
            var abbreviation = day+abb[day % 10];
        }
      
        $(this).next('.selectday').html(abbreviation+" of every month");
        $(this).next().next('.bulkday').val(day);
    });

    // $(document).on('ifChecked','.aw',function(){ 
    $(document).on('click','.aw',function(e){
    // $(".aw").click(function(){
        var radios = $('input[name="master"]:checked').val();
        if(radios=="on"){
            radios = 'Y';
            $("#myDiv").removeClass("disabledbutton");
        }else{
            $("#myDiv").addClass("disabledbutton");
            radios ='N';
        }

        // alert(radios);

        $('.autowithdraw_success').html('');
        var invest_confirm = confirm('Are you sure you want to change the settings?');
        if(invest_confirm==true){
            var post_data = {status:radios,main_user_id:main_user_id};
            post_data[global_csrf_token_name]= global_csrf_token_value;
            $.ajax({
                type: "POST",
                url : base_url +"backend/investors/master_set",
                data :post_data,
                dataType:'JSON',
                success : function(response){
                    if(response.master_status=='Y' && response.status=='I') {
                        
                    }else{
                        
                    }
                }
            });
        }else{
            return false;
        }
    });







});
