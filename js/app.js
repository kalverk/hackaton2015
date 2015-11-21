$(document).on("click", ".authButton", function(event) {
    event.preventDefault();
    console.log("auth button pressed");
    auth();
});

var requestUserData = function(){
    var queriesToMake = getCheckedBoxes();
    $('#collapseOne').collapse('toggle');
    $('#collapseOne').removeAttr('data-toggle');
    $('.my-data').css('color','#3c763d');
    $('.my-data').css('background-color','#dff0d8');

    //TODO request user data
    //Fill in

    var user = {
        fullName: "Mati Kask",
        idCode: "234234234323",
        address: "Veerenni 23, Tallinn, Estonia",
        nationality: "EST",
        email: "mati.kask@transferwise.com"
    };

    $('#fullName').val(user.fullName);
    $('#idCode').val(user.idCode);
    $('#address').val(user.address);
    $('#nationality').val(user.nationality);
    $('#email').val(user.email);

    $('#collapseTwo').toggle('toggle');
}

var getCheckedBoxes = function(){
    var result = [];
    var checkBoxes = $('.queries').find('[type=checkbox]');
    for(var i=0,len=checkBoxes.length;i<len;i+=1){
        if(checkBoxes[i].checked){
            result.push(checkBoxes[i].getAttribute('data-name'));
        }
    }
    return result;
}

var auth = function() {
    window.hwcrypto.getCertificate({lang: 'en'}).then(function(certificate) {
        var b64encoded = btoa(String.fromCharCode.apply(null, certificate.encoded));
        console.log(certificate);
    });
};