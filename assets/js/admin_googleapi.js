//google.maps.event.addDomListener(window, 'load', initAutocomplete);
 
 var base_url = $("#base-url-1").val(); 
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

        var input = document.getElementsByClassName('address');

        for (var x = 0; x < input.length; x++) {
          if(input[x].id == 'per_address')
            addPersonalInfoListener(input[x],options);
          else if(input[x].id == 'cmp_address')
            addCompanyInfoListener(input[x],options);
          else
            addListener(input[x],options);
        }
  
      }

      function addListener(el,options) { // common listener
        var autocomplete = new google.maps.places.Autocomplete(el,options);

        google.maps.event.addListener(autocomplete, 'place_changed', function(){
          var place = autocomplete.getPlace();
          for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
         
          if (componentForm[addressType]) {
            if(addressType == 'street_number'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.address').val(val);
              $('.address').parent().find('label.error').hide();
            }
            if(addressType == 'route'){
              var val = place.address_components[i][componentForm[addressType]];
              var address = $('.address').val(); 
              var new_add = address +' '+ val;
              $('.address').val(new_add);
              $('.address').parent().find('label.error').hide();
            }
            if(addressType == 'locality'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.city').val(val);
              $('.city').parent().find('label.error').hide();
            }
            if(addressType == 'administrative_area_level_2'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.county').val(val);
              $('.county').parent().find('label.error').hide();
            }
            if(addressType == 'postal_code'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.zip').val(val);
              $('.zip').parent().find('label.error').hide();
            }
            if(addressType == 'administrative_area_level_1'){
              var val = place.address_components[i][componentForm[addressType]];
              $.get(base_url+'backend/location/get_state_info',{'state':val},function(data){ 
                var addres_response = $.parseJSON(data); 
               
                if(addres_response.location_id){
                  $('.state').val(addres_response.location_id).change();
                  $('.state').parent().find('label.error').hide();
                  //check_project_street();
                }
              });
            }



          }

        }
        });
      }

      function addPersonalInfoListener(el,options) {  // personal info listener
        var autocomplete = new google.maps.places.Autocomplete(el,options);

        google.maps.event.addListener(autocomplete, 'place_changed', function(){
          var place = autocomplete.getPlace();
          for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
         
          if (componentForm[addressType]) {
            if(addressType == 'street_number'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.address-1').val(val);
              $('.address-1').parent().find('label.error').hide();
            }
            if(addressType == 'route'){
              var val = place.address_components[i][componentForm[addressType]];
              var address = $('.address-1').val(); 
              var new_add = address +' '+ val;
              $('.address-1').val(new_add);
              $('.address-1').parent().find('label.error').hide();
            }
            if(addressType == 'locality'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.city-1').val(val);
              $('.city-1').parent().find('label.error').hide();
            }
            if(addressType == 'administrative_area_level_2'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.county-1').val(val);
              $('.county-1').parent().find('label.error').hide();
            }
            if(addressType == 'postal_code'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.zipcode-1').val(val);
              $('.zipcode-1').parent().find('label.error').hide();
            }
            if(addressType == 'administrative_area_level_1'){
              var val = place.address_components[i][componentForm[addressType]];
              $.get(base_url+'backend/location/get_state_info',{'state':val},function(data){ 
                var addres_response = $.parseJSON(data); 
               
                if(addres_response.location_id){
                  $('.state-1').val(addres_response.location_id).change();
                  $('.state-1').parent().find('label.error').hide();
                  //check_project_street();
                }
              });
            }



          }

        }
        });
      }

      function addCompanyInfoListener(el,options) { // conpany info listener
        var autocomplete = new google.maps.places.Autocomplete(el,options);

        google.maps.event.addListener(autocomplete, 'place_changed', function(){
          var place = autocomplete.getPlace();
          for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
         
          if (componentForm[addressType]) {
            if(addressType == 'street_number'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.address-2').val(val);
              $('.address-2').parent().find('label.error').hide();
            }
            if(addressType == 'route'){
              var val = place.address_components[i][componentForm[addressType]];
              var address = $('.address-2').val(); 
              var new_add = address +' '+ val;
              $('.address-2').val(new_add);
              $('.address-2').parent().find('label.error').hide();
            }
            if(addressType == 'locality'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.city-2').val(val);
              $('.city-2').parent().find('label.error').hide();
            }
            if(addressType == 'administrative_area_level_2'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.county-2').val(val);
              $('.county-2').parent().find('label.error').hide();
            }
            if(addressType == 'postal_code'){
              var val = place.address_components[i][componentForm[addressType]];
              $('.zipcode-2').val(val);
              $('.zipcode-2').parent().find('label.error').hide();
            }
            if(addressType == 'administrative_area_level_1'){
              var val = place.address_components[i][componentForm[addressType]];
              $.get(base_url+'backend/location/get_state_info',{'state':val},function(data){ 
                var addres_response = $.parseJSON(data); 
               
                if(addres_response.location_id){
                  $('.state-2').val(addres_response.location_id).change();
                  $('.state-2').parent().find('label.error').hide();
                  //check_project_street();
                }
              });
            }



          }

        }
        });
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
