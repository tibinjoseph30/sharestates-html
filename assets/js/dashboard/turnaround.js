var base_url = $("#base-url-1").val();

$(document).ready(function(){

    $.getJSON(base_url+'admin_template/assets/json/turnaround.json', function(data) {
        $("#dt-test").html(data.trunaround_html);
        $('[data-toggle="tooltip"]').tooltip();
    });

});