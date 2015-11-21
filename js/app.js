$(document).on("click", ".authButton", function(event) {
    event.preventDefault();
    console.log("auth button pressed");
    auth();
});

var user = {
    fullName: "Mati Kask",
    idCode: "234234234323",
    address: "Veerenni 23, Tallinn, Estonia",
    nationality: "EST",
    email: "coolemail@transferwise.com"
};

var requestUserData = function(){
    var queriesToMake = getCheckedBoxes();
    $('#collapseOne').collapse('toggle');
    $('#collapseOne').removeAttr('data-toggle');
    $('.my-data').css('color','#3c763d');
    $('.my-data').css('background-color','#dff0d8');

    user = JSON.parse(getCookie('user'));

    //Fill user data
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

var sign = function() {
    var cert;
    window.hwcrypto.getCertificate({lang: 'en'}).then(function(certificate) {
        cert = certificate;
        var b64encoded = btoa(String.fromCharCode.apply(null, certificate.encoded));
        return fetchHash(b64encoded);
    }).then(function(digest) {
        console.log("digest " + digest);
        return window.hwcrypto.sign(cert, {type: 'SHA-256', hex: digest.hex}, {lang: 'en'});
    }).then(function(signature) {
        console.log("signature " + signature);
        return createContainer(signature.hex);
    });
};

var auth = function() {
    window.hwcrypto.getCertificate({lang: 'en'}).then(function(certificate) {
        var b64encoded = btoa(String.fromCharCode.apply(null, certificate.encoded));
        var c = new X509();
        c.readCertPEM(b64encoded);
        var f = function(s) { return KJUR.crypto.Util.hashString(s, 'sha1'); }
        //Fill user data
        var data = c.getSubjectString().split('/');
        for(var i=0;i<data.length;i+=1){
            var parts = data[i].split('=');
            if(parts[0]==='CN'){
                user.fullName = parts[1];
            }else if(parts[0]==='SN'){
                user.idCode = parts[1];
            }
        }
        setCookie('user',JSON.stringify(user),1);
    });
};

var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}