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
    $('#collapseTwo').toggle('toggle');
    //TODO close current tab
    //Get data
    //Fill form on next tab
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
        var c = new X509();
        c.readCertPEM(sCert);
        c.getSerialNumberHex();
        c.getIssuerString();
        c.getNotBefore();
        c.getNotAfter();
        c.getSubjectString();
        var f = function(s) { return KJUR.crypto.Util.hashString(s, 'sha1'); }

        console.log(certificate);
    });
};