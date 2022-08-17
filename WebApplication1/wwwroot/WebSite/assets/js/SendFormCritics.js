function valideInput(value, type) {
    if (value.length == 0) {
        $(`#${type}Valid`).show();
    } else {
        $(`#${type}Valid`).hide();
    }
}
function AjaxFormSubmit() {
    var nameFamily = document.getElementById("NameFamily").value.length;
    var mobileLength = document.getElementById("Mobile").value.length;
    var mobileValue = $("#Mobile").val();


    if (nameFamily == '')
    {
        return $("#lblName").html("نام و نام خانوادگی الزامی است");
    }


    if (mobileValue != '')
    {
        if (mobileLength != 11) {
            return $("#lblName").html("شماره موبایل باید 11 رقم باشد");
        } else if (mobileLength == 11) {
            var mobileStartWith = mobileValue.substring(0, 2);
            if (mobileStartWith != '09') {
                return $("#lblName").html("شماره موبایل باید با 09 شروع شود");
            }
        }
    }



    //Set the URL.
    var url = "/NoAuthorizeAction/CreateCritic"; //$("#FormCritics").attr("Action");

    //Add the Field values to FormData object.
    var formData = new FormData();
    formData.append("NameFamily", $("#NameFamily").val());
  
    formData.append("Mobile", $("#Mobile").val());
    
    formData.append("Message", $("#Message").val());


    

    $.ajax({
        type: 'POST',
        url: url,
        data: formData,
        processData: false,
        contentType: false
    }).done(function (response) {
        response = response.Data;
        if (response[0].IsSuccessed) {
            alert(response[0].Message);
            $("#NameFamily").val('');
            $("#Mobile").val('');
            $("#Message").val('');
            $("#lblName").html("");


        } else {
            var msg = "";
            for (var i = 0; i < response.length; i++) {
                msg += response[i].Message + " ";
            }

            $("#lblName").html(msg);
        }
    });
}