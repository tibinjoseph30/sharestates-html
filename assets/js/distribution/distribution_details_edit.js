var base_url = $("#base-url-1").val();
$(document).ready(function(){

 $(".distribution-edit-form").validate({
          onkeyup: false,
        ignore : false,
        rules: {
            'distribution_amount':{required:true,valid_fee:true},

        }

});

 	   /*paper check -start*/

		$("#paper_check_date").datepicker({

            dateFormat: 'mm/dd/yy',
            defaultDate: "+w",
            changeMonth: true,

        });


         $('#paper_check_on').on('ifChanged', function(event){
	   	var paper_check_on= $(this).is(':checked');
	   	if(paper_check_on==true){
	   		$(".paper_check_date").show();
	   	}else{
	   		$(".paper_check_date").hide();
	   	}
	});
         
	    /*paper check issue date - end*/


});