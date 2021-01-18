//google.maps.event.addDomListener(window, 'load', initAutocomplete);
 var base_url = $("#base_url").val(); 
 var placeSearch, autocomplete;
 var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        administrative_area_level_2: 'long_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

	function initAutocomplete() {
			 var options = {
				    // bounds : boundsByCity,
				     types: ["geocode"],
				     componentRestrictions: { country: "US" } 
				};
        // Create the autocomplete object, restricting the search to geographical
        // location types.
       autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('property_address')),
            options);
        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        //autocomplete.addListener('place_changed', fillInAddress); 
         autocomplete.addListener('place_changed', function() {
          fillInAddress1(autocomplete, "");
        });

        var location1 = $("#borrower_address").val();
        if (location1 === undefined ){} else {

          autocomplete1 = new google.maps.places.Autocomplete(
              /** @type {!HTMLInputElement} */(document.getElementById('borrower_address')),
              options);

          autocomplete1.addListener('place_changed', function() {
            fillInAddress(autocomplete1, "0");
          });
        }
        var location2= $("#broker_address").val();
        if (location2 === undefined ){} else {

          autocomplete2 = new google.maps.places.Autocomplete(
              /** @type {!HTMLInputElement} */(document.getElementById('broker_address')),
              options);

          autocomplete2.addListener('place_changed', function() {
            fillInAddress(autocomplete2, "1");
          }); 
        }

      }

      function fillInAddress1(autocomplete, unique) { 
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace(); 
 
        // for (var component in componentForm) {
        //   document.getElementById(component).value = '';
        //   document.getElementById(component).disabled = false;
        // }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.

        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
       
          if (componentForm[addressType]) {
            if(addressType == 'street_number'){
              var val = place.address_components[i][componentForm[addressType]];
              var add1 = val;
              //$('.address'+unique).val(val);
            }
            if(addressType == 'route'){
              var val = place.address_components[i][componentForm[addressType]]; 
              // var address = $('.address'+unique).val(); 
              if(add1) 
                var new_add = add1 +' '+ val; 
              else
               var new_add =  val; 
           // else  var new_add =  val; 
              $('.address'+unique).val(new_add);
            }
            if(addressType == 'locality'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.city'+unique).val(val);
            }
            if(addressType == 'administrative_area_level_2'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.county'+unique).val(val);
            }
            if(addressType == 'postal_code'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.zip'+unique).val(val);
            }
            
            if(addressType == 'administrative_area_level_1'){
              var val = place.address_components[i][componentForm[addressType]];
              var flag = 0;
              if((val != 'New York') && ($("#refinance-CEMA").prop('checked') == true)){
                swal("Warning!", "CEMA is applicable only for New York loans. Please choose address from New York.", "warning");
                //alert("CEMA is applicable only for New York loans. Please choose address from New York.ddd");
                $('.address'+unique).val('');
                $('.city'+unique).val('');
                $('.county'+unique).val('');
                $('.state'+unique).val('').change();
                setTimeout(function(){ 
                  $('.zip'+unique).val(""); 
                },500);
                flag=1;
              }
              if(flag == 0){
                $.get(base_url+'quick_loan_application/get_state_info',{'state':val},function(data){ 
                  var addres_response = $.parseJSON(data);
                  if(addres_response.location_id){
                    $('.state'+unique).val(addres_response.location_id).change();
                    //check_project_street();
                  }
                });
              }
            }
            

           // document.getElementById(addressType).value = val;
          }

        }

      }

      function fillInAddress(autocomplete, unique) {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace(); 
 
        // for (var component in componentForm) {
        //   document.getElementById(component).value = '';
        //   document.getElementById(component).disabled = false;
        // }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.

        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
       
          if (componentForm[addressType]) {
            if(addressType == 'street_number'){
              var val = place.address_components[i][componentForm[addressType]];
              var add1 = val;
              //$('.address'+unique).val(val);
            }
            if(addressType == 'route'){
              var val = place.address_components[i][componentForm[addressType]]; 
              // var address = $('.address'+unique).val(); 
              if(add1) 
                var new_add = add1 +' '+ val; 
              else
               var new_add =  val; 
           // else  var new_add =  val; 
              $('.address'+unique).val(new_add);
            }
            if(addressType == 'locality'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.city'+unique).val(val);
            }
            if(addressType == 'administrative_area_level_2'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.county'+unique).val(val);
            }
            if(addressType == 'postal_code'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.zip'+unique).val(val);
            }
            if(addressType == 'administrative_area_level_1'){
              var val = place.address_components[i][componentForm[addressType]];
              // var flag = 0;
              // if((val != 'New York') && ($("#refinance-CEMA").prop('checked') == true)){
              //   alert("CEMA application can be submitted only for New York loans. Please choose address from New York.");
              //   $('.address'+unique).val('');
              //   $('.city'+unique).val('');
              //   $('.county'+unique).val('');
              //   $('.zip'+unique).val('');
              //   flag=1;
              // }
              // if(flag == 0){
                $.get(base_url+'quick_loan_application/get_state_info',{'state':val},function(data){ 
                  var addres_response = $.parseJSON(data);
                  if(addres_response.location_id){
                    $('.state'+unique).val(addres_response.location_id).change();
                    //check_project_street();
                  }
                });
             // }
            }

           // document.getElementById(addressType).value = val;
          }

        }

      }

      

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {  
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }

      function check_project_street() {  
        var street = $('#property_address').val();
        var city = $('#property_city').val();
        var state = $('#property_state').val();
        var zipcode = $('#property_zip_code').val();
        $("#msg_loan").html('');

        var post_data =  {street:street, city:city, state:state, zipcode:zipcode};
          post_data['csrf_test_name']= global_csrf_token_value;

        $.ajax({
        type: 'POST',
            url: base_url+'quick_loan_application/check_project_street',
            dataType: "json",
            data: post_data,
            success: function(data) {
                if(data.status==true){
                  swal("Warning!", "There's a loan ("+data.loan_no+") matching with this address in the system.", "warning");
                  //$("#msg_loan").html("There's a loan ("+data.loan_no+") matching with this address in the system.");
                  //$(".popupbg").show();
                  //$(".loan_popup").show();
                }
            }
        });
      }

      function MultiAutocomplete(b){
        id =  'property_addres'+b;
         var options = {
            // bounds : boundsByCity,
             types: ["geocode"],
             componentRestrictions: { country: "US" } 
        };
        autocomplete5 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(id)),
            options);

        autocomplete5.addListener('place_changed', function() {
          fillInMultiAddress(autocomplete5,b);
        });
      }

      function fillInMultiAddress(autocomplete, d) { 
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();


        // Get each component of the address from the place details
        // and fill the corresponding field on the form.

        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
         
          if (componentForm[addressType]) {
            if(addressType == 'street_number'){
              var val = place.address_components[i][componentForm[addressType]];
              var add2 = val; 
              //$('#property_address'+d).val(val);
            }
            if(addressType == 'route'){
              var val = place.address_components[i][componentForm[addressType]];
            //  var address = $('#property_address'+d).val();
            if(add2) 
              var new_add = add2 +' '+ val; //
            else
               var new_add = val; 
              $('#property_addres'+d).val(new_add); //console.log('#property_address'+d);
            }
            if(addressType == 'locality'){
              var val = place.address_components[i][componentForm[addressType]];
              $('#city'+d).val(val);
            }
         
            if(addressType == 'postal_code'){
              var val = place.address_components[i][componentForm[addressType]];
              $('#zipcode'+d).val(val);
            }
            if(addressType == 'administrative_area_level_1'){
              var val = place.address_components[i][componentForm[addressType]];
              var flag = 0;
              if((val != 'New York') && ($("#refinance-CEMA").prop('checked') == true)){
                swal("Warning!", "CEMA is applicable only for New York loans. Please choose address from New York.", "warning");
                //alert("CEMA application can be submitted only for New York loans. Please choose address from New York.sss");
                $('#property_addres'+d).val('');
                $('#city'+d).val('');
                $('#zipcode'+d).val('');
                $('#state'+d).val('').change();
                flag=1;
              }
              if(flag == 0){
                $('#state'+d).val(val).change();
              }
              // $.get(base_url+'quick_loan_application/get_state_info',{'state':val},function(data){ 
              //   var addres_response = $.parseJSON(data);
              //   if(addres_response.location_id){  console.log(addres_response.location_id)
              //    $('#state2').val(addres_response.location_id);//.change();
              //     //check_project_street();
              //   }
              // });
            }

           // document.getElementById(addressType).value = val;
          }

        }

      }

$(document).on('focusout','.state',function(){
    var state = $(this).val();
    // if(state !=5 && $("#refinance-CEMA").prop('checked') == true){
    //   swal("Warning!", "CEMA is applicable only for New York loans. Please choose address from New York.", "warning");
    //   $('.state').val("").change();
    // }
});