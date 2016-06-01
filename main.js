var data_input;

function get_data(login,password) {

    $.ajax({
        url: 'https://kc.msf.org/api/v1/data/21',
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        headers: {
            "Authorization": "Basic " + btoa(login + ':' + password)
        }
    }).complete(function (data) {
        console.log(data.responseJSON);
        data_input = data.responseJSON;

        proceed(data_input);

    }).fail(function () {
        console.log('Failed to collect data from from pk:21.')
    }).success(function() {
        console.log('Successfuly collected data from from pk:21.')
    });

}

function proceed(data_input) {
    var data_formatted = [];

    data_input.forEach(function(rec){
        console.log(rec);

        var pat_aggregate = {
            male$:0,
            female$:0,

        };

        if(rec.patient){
            rec.patient.forEach(function(pat){
                //pat.
            });
        }

        var rec_formatted = {
            loc$region: rec.region,
            loc$inkhundla: rec.inkhundla,
            loc$site_name: rec.site_name,
            loc$umphakatsi: rec.umphakatsi,
            loc$coord: rec.coordinates, 
            date$: rec.date,
            act$type1: rec.activity_type,
            act$type2: rec.hiv_test,
        };
    });
}

generate_display();

function generate_display() {
    var html = '<section class="container">';
    html+= '<div>';
    html+= '  <h2>Login to KoBo</h2>';
    html+= '    <p><input type="text" id="login" value="" placeholder="Username"></p>';
    html+= '    <p><input type="password" id="password" value="" placeholder="Password"></p>';
    html+= '    <p class="submit"><input type="submit" name="commit" value="Login"></p>';
    html+= '</div>';

    html+= '<div class="login-help">';
    html+= '  <p> <small>Forgot your password?<br><a href="">Contact the Administrator</a></small></p>';
    html+= '</div>';
    html+= '</section>';
    $('.modal-content').html(html);

    $('.submit').on('click',function(){
        login = $('#login').val();
        console.log(login);
        password = $('#password').val();
        console.log(password);
        $('#modal').modal('hide');

        get_data(login,password);
    });
}