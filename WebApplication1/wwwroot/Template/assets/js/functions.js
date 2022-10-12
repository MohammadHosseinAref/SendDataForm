$(document).ready(function () {


    //$('#btnSearchNeedForIdea').on('click', function () {
    //    alert('clicked')
    //    $('#search-for-need-modal').modal("show");
    //})
    var entity = $('#HiddenEntityType').val();

    // alert(entity.toString())
    $('#EntityTypeId').val(entity)
    if (entity == "Need") {
        $('#flexCheckDefaultNeed').attr('checked', 'checked');
        $('#active-need-accordion').removeAttr('hidden');


        $('#ideaneedbroker4765').attr('hidden', 'hidden');
        $('#ideaneedbroker4360').attr('hidden', 'hidden');

        $('#ideaneedbroker4364').removeAttr('hidden');
        $('#ideaneedbroker4366').removeAttr('hidden');
        $('#ideaneedbroker4367').removeAttr('hidden');
        $('#ideaneedbroker4383').removeAttr('hidden');
        $('#ideaneedbroker4459').removeAttr('hidden');
        $('#ideaneedbroker4766').removeAttr('hidden');
        $('#ideaneedbroker4854').removeAttr('hidden');
        $('#ideaneedbroker5802').removeAttr('hidden');
        $('#ideaneedbroker5885').removeAttr('hidden');
        $('#ideaneedbroker5792').removeAttr('hidden');
        $('#ideaneedbroker6901').removeAttr('hidden');


    }
    if (entity == "Idea") {
        $('#flexCheckDefaultIdea').attr('checked', 'checked');
        $('#active-need-accordion').attr('hidden', 'hidden');


        $('#ideaneedbroker4765').removeAttr('hidden');
        $('#ideaneedbroker4360').removeAttr('hidden');

        $('#ideaneedbroker4364').attr('hidden', 'hidden');
        $('#ideaneedbroker4366').attr('hidden', 'hidden');
        $('#ideaneedbroker4367').attr('hidden', 'hidden');
        $('#ideaneedbroker4383').attr('hidden', 'hidden');
        $('#ideaneedbroker4459').attr('hidden', 'hidden');
        $('#ideaneedbroker4766').attr('hidden', 'hidden');
        $('#ideaneedbroker4854').attr('hidden', 'hidden');
        $('#ideaneedbroker5792').attr('hidden', 'hidden');
        $('#ideaneedbroker5885').attr('hidden', 'hidden');
        $('#ideaneedbroker5802').attr('hidden', 'hidden');
        $('#ideaneedbroker6901').attr('hidden', 'hidden');



    }

    //$('#search-for-need-modal').on('shown.bs.modal', function (e) {
    //    //  var input = $(this).find("#SrchCatsInpt"); //// // cache the variable
    //    ////// // input.removeAttr('disabled'); //if it is disabled, enable it first, so it can get focus
    //    //  input.focus(); ////// focus it
    //    // alert('clicked')
    //    jQuery.post('/Ideas/SearchNeedForIdeaInModal', function (value) {
    //        $('#SearchNeedForIdeaPlc').html(value);
    //    })

    //})
    ///radinmehr's functions:

    $("#subjectarea-idea-select").on('change', function () {

        var CatLvl1 = $(this).val();


        jQuery.post('/Categories/FetchLevel2CatsPartial', { CategoryId: CatLvl1 }, function (value) {
            $('#CatLvl2Plc').html(value);
            $('#CatLvl3Plc').html(`<select  class="form-select select-option" id="major-idea-select"   style="width: 100%"  name="CatLevel3Id">
            <option></option>
             </select>`);
            $(".select-option").select2({
                language: "fa",
                dir: "rtl",
                width: "resolve",
                placeholder: "انتخاب نمایید",
            });

        })

    })


    //nan in creating new need or new Idea:
    var SelectedCategories = [];


    var CategoryObj = { CategoryName: "", Id: null, ParentId: null };


    SelectedCategories = [CategoryObj];

    //lvl1  
    $("#subjectarea-idea-select-lvl1-multiple").on('select2:select', function (e) {

        var CatLvl1SelectedValue = e.params.data.id;



        jQuery.post('/Categories/FetchChildrenCatsString', { CategoryId: CatLvl1SelectedValue }, function (value) {
            var parsedValue = JSON.parse(value)

            $.each(parsedValue, function (i, v) {


                var NewCatObj = { Id: v.Id, CategoryName: v.CategoryName, ParentId: v.ParentId }
                SelectedCategories.push(NewCatObj)



                var newCatLvl2Option = new Option(v.CategoryName, v.Id, false, false);
                $('#branch-idea-select-lvl2-multiple').append(newCatLvl2Option).trigger('change');

            })


        })

    })

    $("#subjectarea-idea-select-lvl1-multiple").on('select2:unselect', function (e) {

        var CatLvl1UnSelectedValue = e.params.data.id;




        $.each(SelectedCategories, function (key, value) {
            if (value.ParentId == CatLvl1UnSelectedValue) {

                //remove from option lvl2:
                $("#branch-idea-select-lvl2-multiple option[value=" + value.Id + "]").remove().trigger('change');


                //remove from option lvl3:
                $.each(SelectedCategories, function (key2, value3) {
                    if (value3.ParentId == value.Id) {

                        //remove from option:
                        $("#major-idea-select-lvl2-multiple option[value=" + value3.Id + "]").remove().trigger('change');

                    }
                });





            }





        });



        var resultSelectedCategories = $.grep(SelectedCategories, function (e) {
            return e.ParentId != CatLvl1UnSelectedValue;
        });

        SelectedCategories = resultSelectedCategories;



    })



    //lvl2

    $("#branch-idea-select-lvl2-multiple").on('select2:select', function (e) {

        var CatLvl1SelectedValue = e.params.data.id;



        jQuery.post('/Categories/FetchChildrenCatsString', { CategoryId: CatLvl1SelectedValue }, function (value) {
            var parsedValue = JSON.parse(value)

            $.each(parsedValue, function (i, v) {


                var NewCatObj = { Id: v.Id, CategoryName: v.CategoryName, ParentId: v.ParentId }
                SelectedCategories.push(NewCatObj)



                var newCatLvl2Option = new Option(v.CategoryName, v.Id, false, false);
                $('#major-idea-select-lvl2-multiple').append(newCatLvl2Option).trigger('change');

            })


        })

    })

    $("#branch-idea-select-lvl2-multiple").on('select2:unselect', function (e) {

        var CatLvl1UnSelectedValue = e.params.data.id;




        $.each(SelectedCategories, function (key, value) {
            if (value.ParentId == CatLvl1UnSelectedValue) {

                //remove from option:
                $("#major-idea-select-lvl2-multiple option[value=" + value.Id + "]").remove().trigger('change');

            }
        });



        var resultSelectedCategories = $.grep(SelectedCategories, function (e) {
            return e.ParentId != CatLvl1UnSelectedValue;
        });

        SelectedCategories = resultSelectedCategories;



    })








    //mop categories in creating new need or new Idea:

    var MopSelectedCategoriesInCreatingNeedAndIdea = [];


    var MopCategoryObjInCreatingNeedAndIdea = { CategoryName: "", Id: null, ParentId: null };


    MopSelectedCategoriesInCreatingNeedAndIdea = [MopCategoryObjInCreatingNeedAndIdea];



    //lvl1  
    $("#mop-technologytree-idea-select-lvl1-multiple").on('select2:select', function (e) {

        var CatLvl1SelectedValue = e.params.data.id;



        jQuery.post('/Categories/FetchMopChildrenCatsString', { CategoryId: CatLvl1SelectedValue }, function (value) {
            var parsedValue = JSON.parse(value)

            $.each(parsedValue, function (i, v) {


                var NewCatObj = { Id: v.Id, CategoryName: v.CategoryName, ParentId: v.ParentId }
                MopSelectedCategoriesInCreatingNeedAndIdea.push(NewCatObj)



                var newCatLvl2Option = new Option(v.CategoryName, v.Id, false, false);
                $('#mop-technologytree-idea-select-lvl2-multiple').append(newCatLvl2Option).trigger('change');

            })


        })

    })

    $("#mop-technologytree-idea-select-lvl1-multiple").on('select2:unselect', function (e) {

        var CatLvl1UnSelectedValue = e.params.data.id;

        var CatsToBeRemoved = [];


        $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key1, value1) {
            if (value1.ParentId == CatLvl1UnSelectedValue) {
                CatsToBeRemoved.push(value1.Id);
                //remove from option lvl2:
                $("#mop-technologytree-idea-select-lvl2-multiple option[value=" + value1.Id + "]").remove().trigger('change');


                //remove from option lvl3:
                $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key2, value2) {
                    if (value2.ParentId == value1.Id) {

                        CatsToBeRemoved.push(value2.Id);
                        //remove from option:
                        $("#mop-technologytree-idea-select-lvl3-multiple option[value=" + value2.Id + "]").remove().trigger('change');



                        //remove from option lvl4:
                        $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key3, value3) {
                            if (value3.ParentId == value2.Id) {
                                CatsToBeRemoved.push(value3.Id);
                                //remove from option:
                                $("#mop-technologytree-idea-select-lvl4-multiple option[value=" + value3.Id + "]").remove().trigger('change');



                                //remove from option lvl5:
                                $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key4, value4) {
                                    if (value4.ParentId == value3.Id) {
                                        // alert(JSON.stringify(value4))

                                        CatsToBeRemoved.push(value4.Id);
                                        //remove from option:
                                        $("#mop-technologytree-idea-select-lvl5-multiple option[value=" + value4.Id + "]").remove().trigger('change');


                                        //remove data from array
                                        var index = MopSelectedCategoriesInCreatingNeedAndIdea.findIndex(function (o) {
                                            return o.Id === value1.Id
                                                && o.Id === value2.Id
                                                && o.Id === value3.Id
                                                && o.Id == value4.Id;
                                        })
                                        if (index !== -1) MopSelectedCategoriesInCreatingNeedAndIdea.splice(index, 1);


                                        ///

                                    }
                                });

                            }
                        });



                    }
                });





            }





        });

        $.each(CatsToBeRemoved, function (key, value) {
            var foundIndexToBeRemoved = MopSelectedCategoriesInCreatingNeedAndIdea.findIndex(x => x.Id == value);
            MopSelectedCategoriesInCreatingNeedAndIdea.splice(foundIndexToBeRemoved, 1);

        })


    })



    //lvl2

    $("#mop-technologytree-idea-select-lvl2-multiple").on('select2:select', function (e) {

        var CatLvl1SelectedValue = e.params.data.id;




        jQuery.post('/Categories/FetchMopChildrenCatsString', { CategoryId: CatLvl1SelectedValue }, function (value) {
            var parsedValue = JSON.parse(value)

            $.each(parsedValue, function (i, v) {


                var NewCatObj = { Id: v.Id, CategoryName: v.CategoryName, ParentId: v.ParentId }
                MopSelectedCategoriesInCreatingNeedAndIdea.push(NewCatObj)



                var newCatLvl2Option = new Option(v.CategoryName, v.Id, false, false);
                $('#mop-technologytree-idea-select-lvl3-multiple').append(newCatLvl2Option).trigger('change');

            })


        })

    })

    $("#mop-technologytree-idea-select-lvl2-multiple").on('select2:unselect', function (e) {

        var CatLvl1UnSelectedValue = e.params.data.id;

        var CatsToBeRemoved = [];


        $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key3, value3) {
            if (value3.ParentId == CatLvl1UnSelectedValue) {
                CatsToBeRemoved.push(value3.Id);
                //remove from option Lvl3:
                $("#mop-technologytree-idea-select-lvl3-multiple option[value=" + value3.Id + "]").remove().trigger('change');

                //remove from option lvl4:
                $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key4, value4) {
                    if (value4.ParentId == value3.Id) {

                        CatsToBeRemoved.push(value4.Id);
                        //remove from option:
                        $("#mop-technologytree-idea-select-lvl4-multiple option[value=" + value4.Id + "]").remove().trigger('change');



                        //remove from option lvl5:
                        $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key5, value5) {
                            if (value5.ParentId == value4.Id) {
                                CatsToBeRemoved.push(value5.Id);
                                //remove from option:
                                $("#mop-technologytree-idea-select-lvl5-multiple option[value=" + value5.Id + "]").remove().trigger('change');





                            }
                        });



                    }
                });



            }
        });



        $.each(CatsToBeRemoved, function (key, value) {
            var foundIndexToBeRemoved = MopSelectedCategoriesInCreatingNeedAndIdea.findIndex(x => x.Id == value);
            MopSelectedCategoriesInCreatingNeedAndIdea.splice(foundIndexToBeRemoved, 1);

        })



    })





    //lvl3

    $("#mop-technologytree-idea-select-lvl3-multiple").on('select2:select', function (e) {

        var CatLvl1SelectedValue = e.params.data.id;



        jQuery.post('/Categories/FetchMopChildrenCatsString', { CategoryId: CatLvl1SelectedValue }, function (value) {
            var parsedValue = JSON.parse(value)

            $.each(parsedValue, function (i, v) {


                var NewCatObj = { Id: v.Id, CategoryName: v.CategoryName, ParentId: v.ParentId }
                MopSelectedCategoriesInCreatingNeedAndIdea.push(NewCatObj)



                var newCatLvl2Option = new Option(v.CategoryName, v.Id, false, false);
                $('#mop-technologytree-idea-select-lvl4-multiple').append(newCatLvl2Option).trigger('change');

            })


        })

    })

    $("#mop-technologytree-idea-select-lvl3-multiple").on('select2:unselect', function (e) {

        var CatLvl1UnSelectedValue = e.params.data.id;

        var CatsToBeRemoved = [];


        $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key4, value4) {
            if (value4.ParentId == CatLvl1UnSelectedValue) {
                CatsToBeRemoved.push(value4.Id);
                //remove from option:
                $("#mop-technologytree-idea-select-lvl4-multiple option[value=" + value4.Id + "]").remove().trigger('change');

                //remove from option lvl5:
                $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key5, value5) {
                    if (value5.ParentId == value4.Id) {
                        CatsToBeRemoved.push(value5.Id);
                        //remove from option:
                        $("#mop-technologytree-idea-select-lvl5-multiple option[value=" + value5.Id + "]").remove().trigger('change');





                    }
                });

            }
        });



        $.each(CatsToBeRemoved, function (key, value) {
            var foundIndexToBeRemoved = MopSelectedCategoriesInCreatingNeedAndIdea.findIndex(x => x.Id == value);
            MopSelectedCategoriesInCreatingNeedAndIdea.splice(foundIndexToBeRemoved, 1);

        })




    })





    //lvl4

    $("#mop-technologytree-idea-select-lvl4-multiple").on('select2:select', function (e) {

        var CatLvl1SelectedValue = e.params.data.id;



        jQuery.post('/Categories/FetchMopChildrenCatsString', { CategoryId: CatLvl1SelectedValue }, function (value) {
            var parsedValue = JSON.parse(value)

            $.each(parsedValue, function (i, v) {


                var NewCatObj = { Id: v.Id, CategoryName: v.CategoryName, ParentId: v.ParentId }
                MopSelectedCategoriesInCreatingNeedAndIdea.push(NewCatObj)



                var newCatLvl2Option = new Option(v.CategoryName, v.Id, false, false);
                $('#mop-technologytree-idea-select-lvl5-multiple').append(newCatLvl2Option).trigger('change');

            })


        })

    })

    $("#mop-technologytree-idea-select-lvl4-multiple").on('select2:unselect', function (e) {

        var CatLvl1UnSelectedValue = e.params.data.id;

        var CatsToBeRemoved = [];


        $.each(MopSelectedCategoriesInCreatingNeedAndIdea, function (key5, value5) {
            if (value5.ParentId == CatLvl1UnSelectedValue) {
                CatsToBeRemoved.push(value5.Id);
                //remove from option:
                $("#mop-technologytree-idea-select-lvl5-multiple option[value=" + value5.Id + "]").remove().trigger('change');

            }
        });



        $.each(CatsToBeRemoved, function (key, value) {
            var foundIndexToBeRemoved = MopSelectedCategoriesInCreatingNeedAndIdea.findIndex(x => x.Id == value);
            MopSelectedCategoriesInCreatingNeedAndIdea.splice(foundIndexToBeRemoved, 1);

        })



    })








    //to get provinces
    $('#select-country').on('change', function () {
        var CountryId = $(this).val();


        jQuery.post('/Location/FetchProvinces', { CountryId: CountryId }, function (value) {
            $('#select-province').prepend(value);
        })

    })



    //to get cities
    //$('#select-province').on('change', function () {
    //    var ProvinceId = $(this).val();


    //    jQuery.post('/Location/FetchCities', { ProvinceId: ProvinceId }, function (value) {
    //        $('#select-city').append(value);
    //    })

    //})


    //to get cities 2:
    $('#select-province').on('select2:select', function (e) {
        var data = e.params.data;
        //  alert(data['text']);
        var ProvinceId = data['id'];
        jQuery.post('/Location/FetchCities', { ProvinceId: ProvinceId }, function (value) {
            $('#select-city').append(value);
        })

    });


    //to get cities for user register
    $('#select-user-province').on('change', function () {
        var ProvinceId = $(this).val();


        jQuery.post('/Location/FetchCities', { ProvinceId: ProvinceId }, function (value) {
            $('#select-user-city').html(value);
        })

    })


    //$('#TimeLineModal').on('shown.bs.modal', function () {
    //    alert('shown')
    //})

    //$('#TimeLineModal').modal('show');





    //to select Iran (id is 1) and trigger change to loade provinces when page is ready:
    // $('#select-country').val(1).trigger('change');
    $('#select-country').trigger('change');

    ////end of radinmehr's






    $("#email-inp").on("keyup change input", function () {
        var a = $(this).val();

        var filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (filter.test(a)) {
            /////console.log('success');
            $("#send-code-to-email-btn").prop("disabled", false);
            $(this).addClass("is-valid");
            $(this).removeClass("is-invalid");
            $("#send-code-to-email-btn").addClass("btn-outline-success");
            $("#send-code-to-email-btn").removeClass("btn-outline-primary");
        } else {
            $("#send-code-to-email-btn").prop("disabled", true);
            $(this).addClass("is-invalid");
            $(this).removeClass("is-valid");
            $("#send-code-to-email-btn").addClass("btn-outline-primary");
            $("#send-code-to-email-btn").removeClass("btn-outline-success");
        }
    });




    $("#mobile-inp").on("keyup change input", function () {
        var a = $(this).val();

        var filter = /^09\d{9}$/;
        if (filter.test(a)) {
            /////console.log('success');
            $("#sendcode-btn").prop("disabled", false);
            $(this).addClass("is-valid");
            $(this).removeClass("is-invalid");
            $("#sendcode-btn").addClass("btn-outline-success");
            $("#sendcode-btn").removeClass("btn-outline-primary");
        } else {
            $("#sendcode-btn").prop("disabled", true);
            $(this).addClass("is-invalid");
            $(this).removeClass("is-valid");
            $("#sendcode-btn").addClass("btn-outline-primary");
            $("#sendcode-btn").removeClass("btn-outline-success");
        }
    });

    $("#sendcode-btn").on("click", function () {

        // $('#resend-code-btn').removeAttr('hidden');



        var phonenumber = $('#mobile-inp').val();
        // alert(phonenumber)
        jQuery.post('/Account/SendCodeSMS', { PhoneNumber: phonenumber }, function (vl) {
            var parsedToast = JSON.parse(vl);

            $('#toast-title-strong').html(parsedToast.TitleStrong.toString())
            $('#toast-title-muted').html(parsedToast.TitleMuted.toString())
            $('#toast-body').html(parsedToast.ToastBody.toString())



            $("#toast-body").removeClass(function (index, css) {
                return (css.match(/\bbg-\S+/g) || []).join(' '); // removes anything that starts with "bg-"
            });



            $('#toast-body').addClass(parsedToast.ToastColor.toString());

            if (parsedToast.Done == true) {
                //  $('#mobile-inp').attr('disabled', 'disabled');
                //  $('#mobile-inp').attr('readonly', 'readonly');
            } else {
                //   $('#mobile-inp').prop('disabled', false);
                // $('#mobile-inp').prop('readonly', false);
                // $('#resend-code-btn').attr('hidden','hidden');

                startConfirmTimer(1);
            }

            var myToast = document.getElementById("alert-toast");
            if (myToast) {
                var bsAlert = new bootstrap.Toast(myToast);
                bsAlert.show();
            }


            startConfirmTimer(300);




        })

        //$('#toast-title-strong').html('ارسال کد تایید')
        //$('#toast-title-muted').html('چند لحظه پیش')
        //$('#toast-body').html(`کد تایید به شماره ${phonenumber} ارسال شد`)
        //$('#toast-body').addClass('bg-danger');



        $(this).prop("disabled", true);
        // startTimer(120);
    });



    $("#send-code-to-email-btn").on("click", function () {

        //  $('#resend-code-btn').removeAttr('hidden');



        var phonenumber = $('#mobileNumber-inp').val();
        var email = $('#email-inp').val();

        // alert(phonenumber)
        jQuery.post('/Account/SendCodeEmail', { PhoneNumber: phonenumber, email: email }, function (vl) {
            var parsedToast = JSON.parse(vl);

            $('#toast-title-strong').html(parsedToast.TitleStrong.toString())
            $('#toast-title-muted').html(parsedToast.TitleMuted.toString())
            $('#toast-body').html(parsedToast.ToastBody.toString())



            $("#toast-body").removeClass(function (index, css) {
                return (css.match(/\bbg-\S+/g) || []).join(' '); // removes anything that starts with "bg-"
            });



            $('#toast-body').addClass(parsedToast.ToastColor.toString());

            if (parsedToast.Done == true) {
                //  $('#mobile-inp').attr('disabled', 'disabled');
                //  $('#mobile-inp').attr('readonly', 'readonly');
            } else {
                //   $('#mobile-inp').prop('disabled', false);
                // $('#mobile-inp').prop('readonly', false);
                //  $('#resend-code-btn').attr('hidden','hidden');

                startConfirmTimer(1);
            }

            var myToast = document.getElementById("alert-toast");
            if (myToast) {
                var bsAlert = new bootstrap.Toast(myToast);
                bsAlert.show();
            }

            $(this).prop("disabled", true);
            startConfirmTimer(300);




        })

        //$('#toast-title-strong').html('ارسال کد تایید')
        //$('#toast-title-muted').html('چند لحظه پیش')
        //$('#toast-body').html(`کد تایید به شماره ${phonenumber} ارسال شد`)
        //$('#toast-body').addClass('bg-danger');



        $(this).prop("disabled", true);
        // startTimer(120);
    });

    ///////////  SEARCH PAGE
    function cropLongTexts() {
        $(".header-crop-text").each(function (index) {
            let currentText = $(this).text();

            if (currentText.trim().length > 80) {
                $(this).text(currentText.trim().substring(0, 80) + " ...");
            }
        });

        $(".short-description-results").each(function (index) {
            let currentText = $(this).text();

            if (currentText.trim().length > 300) {
                $(this).text(currentText.trim().substring(0, 300) + " ...");
            }
        });

        $(".mop-header-crop-text").each(function (index) {
            let currentText = $(this).text();

            if (currentText.trim().length > 40) {
                $(this).text(currentText.trim().substring(0, 40) + " ...");
            }
        });
    }
    cropLongTexts();

    $(".header-crop-text-long").each(function (index) {
        let currentText = $(this).text();
        if (currentText.length > 70) {
            $(this).text(currentText.substring(0, 70) + " ...");
        }
    });

    // $(".search-blure").hide();
    ////$(".search-blure-image-container").hide();
    //// $(".search-blure").show();
    ///$(".search-blure-image-container").show();

    /////////////////
    ////// SELECT2
    $(".select-option").select2({
        language: "fa",
        dir: "rtl",
        width: "resolve",
        placeholder: "انتخاب نمایید",
    });

    $(".select-option-sf").select2({
        language: "fa",
        dir: "rtl",
        minimumResultsForSearch: -1,
        width: "resolve",
        placeholder: "انتخاب نمایید",
    });

    $(".select-option-multi").select2({
        language: "fa",
        dir: "rtl",
        width: "resolve",
        multiple: true,
        //  minimumResultsForSearch: 2,
        placeholder: "انتخاب نمایید",
    });

    $(".select-option-tag").select2({
        language: "fa",
        dir: "rtl",
        width: "resolve",
        tags: true,
        placeholder: "انتخاب نمایید",
        multiple: false,
        //  minimumResultsForSearch: 2,
    });


    $(".select-option-tag-multi").select2({
        language: "fa",
        dir: "rtl",
        width: "resolve",
        tags: true,
        placeholder: "انتخاب نمایید",
        multiple: true,
        tokenSeparators: [',', ' ']
        //  minimumResultsForSearch: 2,
    });


    /////////////////

    //////////// DATEPICKER
    kamaDatepicker("register-date");
    kamaDatepicker("birth-date");
    ////////////////
});

// Radinmehr's functions:
function FetchLevel3Categories(CategoryId) {

    jQuery.post('/Categories/FetchLevel3CatsPartial', { CategoryId: CategoryId }, function (value) {
        $('#CatLvl3Plc').html(value);


    })
}

function showTimeline(entity, entityId) {
    // alert(`entity is ${entity.toString()} and entity Id is: ${entityId}`)
    if (entity == "True" && entityId != null) {
        jQuery.post('/Needs/NeedTimelinePartial', { NeedId: entityId }, function (value) {
            $('#timelinePlc').html(value);
            $('#TimeLineModal').modal('toggle');

            //$('#TimeLineModal').on('shown.bs.modal', function () {
            //    alert('shown')
            //})

        })
    }
    else if (entity == "False" && entityId != null) {
        jQuery.post('/Needs/IdeaTimelinePartial', { IdeaId: entityId }, function (value) {
            $('#timelinePlc').html(value);
            $('#TimeLineModal').modal('toggle');

            //$('#TimeLineModal').on('shown.bs.modal', function () {
            //    alert('shown')
            //})

        })
    }
}



function AssignNeedDORToIdea(NeedDOR, id) {
    // if (confirm('این نیاز انتخاب شود؟')) {

    $('#need-for-idea-search-inp').val(NeedDOR).trigger('change');
    // $("#search-for-need-modal").modal("toggle");

    ////// Search For Need Table
    //  }

}
function AssignNeedDORToIdea2(NeedDOR, id) {
    // if (confirm('این نیاز انتخاب شود؟')) {

    $('#need-for-idea-search-inp2').val(NeedDOR).trigger('change');



    ////// Search For Need Table
    //  }

}



function SuggestAssignNeedDORToIdea(NeedDOR, id) {
    if (confirm('این نیاز انتخاب شود؟')) {

        $('#need-for-idea-search-inp').val(NeedDOR);

        $('#' + id).css('background-color', 'lightgreen')

    }

}


function AssignIdeaDORToNeed(IdeaDOR, id) {
    // if (confirm('این نیاز انتخاب شود؟')) {

    $('#need-for-idea-search-inp').val(IdeaDOR).trigger('change');
    // $("#search-for-need-modal").modal("toggle");

    ////// Search For Need Table
    //  }

}
function AssignIdeaDORToNeed2(IdeaDOR, id) {
    // if (confirm('این نیاز انتخاب شود؟')) {

    $('#need-for-idea-search-inp2').val(IdeaDOR).trigger('change');



    ////// Search For Need Table
    //  }

}
function SuggestAssignIdeaDORToNeed(IdeaDOR, id) {
    if (confirm('این نیاز انتخاب شود؟')) {

        $('#need-for-idea-search-inp').val(IdeaDOR);

        $('#' + id).css('background-color', 'lightgreen')

    }

}
//End of  Radinmehr's functions


////// Functions
//function startTimer(duration) {
//    var timer = duration,
//        minutes,
//        seconds;
//    var interval = setInterval(function () {
//        minutes = parseInt(timer / 60, 10);
//        seconds = parseInt(timer % 60, 10);

//        minutes = minutes < 10 ? "0" + minutes : minutes;
//        seconds = seconds < 10 ? "0" + seconds : seconds;

//        $("#sendcode-btn").html(minutes + ":" + seconds);

//        if (--timer < 0) {
//            $("#sendcode-btn").prop("disabled", false);
//            $("#sendcode-btn").html("ارسال مجدد");
//            clearInterval(interval);
//        }
//    }, 1000);
//}

///// Tooltips
var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

///////////// STEPS NEED
let tabIndex = 0;
let tabsListNeed = ["basics-tab", "confirm-tab", "tracking-tab"];
$(".need-register-card .nav-link").click(function (event) {
    if ($(this).hasClass("disabled")) {
        return false;
    } else {
        let elementId = tabsListNeed.indexOf(this.id);
        tabIndex = elementId;
        $("#step-number").text(`گام ${tabIndex + 1} از 3`);
    }
});

function showData() {
    var isIdeaForm = $("#steps-form").hasClass("idea-frm");
    console.log(isIdeaForm);

    $("#title-idea-view").text($("#title-idea-inp").val());
    $("#keywords-idea-view").text($("#keywords-idea-inp").val());
    $("#abstract-idea-view").text($("#abstract-idea-inp").val());
    $("#description-idea-view").text($("#description-idea-inp").val());
    $("#costs-inp-view").text($("#costs-inp").val());

    ///// COST FOR
    if ($("#costfor-idea-cb1").is(":checked")) {
        $("#costfor-idea-view").text($("#costfor-idea-cb1").next().text());
    } else if ($("#costfor-idea-cb2").is(":checked")) {
        $("#costfor-idea-view").text($("#costfor-idea-cb2").next().text());
    } else if ($("#costfor-idea-cb3").is(":checked")) {
        $("#costfor-idea-view").text($("#costfor-idea-cb3").next().text());
    }

    /////

    ////
    $("#subjectarea-idea-view").text(
        $("#subjectarea-idea-select option:selected").text()
    );
    $("#branch-idea-view").text(
        $("#branch-idea-select option:selected").text()
    );
    $("#major-idea-view").text($("#major-idea-select option:selected").text());
    $("#trl-idea-view").text($("#trl-idea-select option:selected").text());

    //added codes:
    ////  Country View
    $("#select-country-view").text($("#select-country option:selected").text());

    let provinces = "";

    $.each($("#select-province option:selected"), function (key, val) {
        provinces += val.text + " ";
    });

    $("#select-province-view").text(provinces);

    let cities = "";

    $.each($("#select-city option:selected"), function (key, val) {
        cities += val.text + " ";
    });

    $("#select-city-view").text(cities);

    /////
    /////

    /////
    if ($("#private-idea-cb").prop("checked") == true) {
        $("#private-idea-view").text("انحصاری");
    } else {
        $("#private-idea-view").text("عمومی");
    }

    var ideaDuration = $("#duration-idea-inp option:selected").text();
    $("#neededtime-idea-view").text(
        $("#neededtime-idea-inp").val() + " " + ideaDuration
    );

    $("#teamcount-idea-view").text($("#teamcount-idea-inp").val());

    $("#targetgroup-idea-view").text(
        $("#targetgroup-idea-select option:selected").text()
    );
    $("#solution-idea-view").text(
        $("#solution-idea-select option:selected").text()
    );

}
let confirmFormSubmit = false;

//$("#next-step-btn").on("click", function () {
//    alert('clicked')
//});
$(".need-register-card #next-step-btn").on("click", function () {
    //var dorplc = $('#need-for-idea-search-inp').val();
    //alert(dorplc.toString())

    tabIndex++;

    //// TO CHECK DOR
    if ($("#need-find-search-alert").hasClass("text-danger")) {
        $("#need-for-idea-search-inp").val("");
    }
    //// CHECK OTHERS //create new need high level  page
    confirmFormSubmit = false;
    if (tabIndex == 1) {
        var required = $("input,textarea").filter("[required]");
        var allRequired = true;

        var select2required = $("select").filter("[required]");
        var select2allRequired = true;

        required.each(function () {
            $(this).removeClass("is-invalid");
            $(this).removeClass("validate-border-red");

            //   $(".select2-selection").css("border-color", "#2E8B57"); sabz    #15c2f4 آبی

            if (($(this).val() == "") || $(this).val() == "0") {
                allRequired = false;
                $(this).addClass("is-invalid");
                $(this).addClass("validate-border-red");

            }
        });

        //if (!allRequired) {
        //    validationError();
        //    tabIndex--;
        //} else {
        //    showData();
        //}


        select2required.each(function () {
            $(this).removeClass("is-invalid");

            $(this).siblings('.select2').children('.selection').children('.select2-selection').css('border-color', '#15c2f4')
            //   $(".select2-selection").css("border-color", "#2E8B57"); sabz    #15c2f4 آبی

            if (($(this).val() == "") || $(this).val() == "0") {
                select2allRequired = false;
                $(this).addClass("is-invalid");

                $(this).siblings('.select2').children('.selection').children('.select2-selection').css('border-color', 'red')
            }
        });

        if (!allRequired || !select2allRequired) {
            validationError();
            tabIndex--;
        } else {
            showData();
        }
    }

    if (tabIndex == 2) {
        $("#saveConfirmationModal").modal("show");
        tabIndex--;
    }
    var someTabTriggerEl = document.querySelector("#" + tabsListNeed[tabIndex]);
    ////$(someTabTriggerEl).removeClass("disabled");

    var tab = new bootstrap.Tab(someTabTriggerEl);

    tab.show();
});

$(".need-register-card #confirmSubmitIdeaBtn").on("click", function () {
    var someTabTriggerEl = document.querySelector("#tracking-tab");
    var tab = new bootstrap.Tab(someTabTriggerEl);
    tab.show();
});

function validationError() {
    var errorToast = document.getElementById("validation-fail");
    if (errorToast) {
        var bsAlert = new bootstrap.Toast(errorToast);
        bsAlert.show();
    }
}

$(".need-register-card #prev-step-btn").on("click", function () {
    tabIndex--;
    $("#step-number").text(`گام ${tabIndex + 1} از 3`);
    var someTabTriggerEl = document.querySelector("#" + tabsListNeed[tabIndex]);
    var tab = new bootstrap.Tab(someTabTriggerEl);

    tab.show();

    if (tabIndex < 1) {
        $("#next-step-btn").html("گام بعد");
    }
    if (tabIndex == 0) {
        $("#prev-step-btn").attr("disabled", "disabled");
    }
});

$('.need-register-card button[data-bs-toggle="tab"]').on(
    "show.bs.tab",
    function (event) {
        tabIndex = tabsListNeed.indexOf(event.target.id);
        $("#step-number").text(`گام ${tabIndex + 1} از 3`);
        if (tabIndex == 0) {
            $("#prev-step-btn").hide();
            $("#next-step-btn").html("گام بعد");
        }

        if (tabIndex == 1) {
            $("#basics-tab").addClass("disabled");
            $("#prev-step-btn").removeAttr("disabled");
            $("#prev-step-btn").show();
            $("#next-step-btn").html("تایید و ثبت نهایی");
        }

        if (tabIndex == 2) {
            $("#next-prev-group").addClass("d-none");
        }
    }
);

$('.need-register-card button[data-bs-toggle="tab"]').on(
    "shown.bs.tab",
    function (event) {
        $(".nav-link.disabled").css("background", "#fff");
        if ($("#register-type-select").val() == 1) {
            $(".nav-link.disabled.active").css("background", "#2E8B57");
        } else {
            $(".nav-link.disabled.active").css("background", "#15c2f4");
        }
    }
);
//////////////// Idea form On submit
$(".idea-form-main").on("submit", function (event) {


    var required = $("input,textarea").filter("[required]");
    var allRequired = true;

    var select2required = $("select").filter("[required]");
    var select2allRequired = true;



    required.each(function () {
        $(this).removeClass("is-invalid");
        $(this).removeClass("validate-border-red");
        if ($(this).val() == "" || $(this).val() == "0") {
            allRequired = false;
            $(this).addClass("is-invalid");
            $(this).addClass("validate-border-red");
        }
    });



    select2required.each(function () {
        $(this).removeClass("is-invalid");
        $(this).siblings('.select2').children('.selection').children('.select2-selection').css('border-color', '#2E8B57')
        if ($(this).val() == "" || $(this).val() == "0") {
            select2allRequired = false;
            $(this).addClass("is-invalid");
            $(this).siblings('.select2').children('.selection').children('.select2-selection').css('border-color', 'red')
        }
    });

    if (!allRequired || !select2allRequired) {
        validationError();
        event.preventDefault();
    }
    else {
        event.preventDefault()
        $(".search-blure-image-container").show();
        $(".search-blure").show();
        event.currentTarget.submit();
    }





});

////show loader on form submit
//$('#searchIdeaNeedId').on('submit', function (e) {

//    e.preventDefault()
//    $(".search-blure-image-container").show();
//    $(".search-blure").show();
//    e.currentTarget.submit();

//})



//$('#createNewIdeaForNeedId').on('submit', function (e) {

//    e.preventDefault()
//    $(".search-blure-image-container").show();
//    $(".search-blure").show();
//    e.currentTarget.submit();

//})



$(".needformmain").on("submit", function (event) {

    var required = $("input,textarea").filter("[required]");
    var allRequired = true;


    var select2required = $("select").filter("[required]");
    var select2allRequired = true;

    required.each(function () {
        $(this).removeClass("is-invalid");
        $(this).removeClass("validate-border-red");
        if ($(this).val() == "" || $(this).val() == "0") {
            allRequired = false;
            $(this).addClass("is-invalid");
            $(this).addClass("validate-border-red");
        }
    });

    select2required.each(function () {
        $(this).removeClass("is-invalid");
        $(this).siblings('.select2').children('.selection').children('.select2-selection').css('border-color', '#15c2f4')
        if ($(this).val() == "" || $(this).val() == "0") {
            select2allRequired = false;

            $(this).addClass("is-invalid");
            $(this).siblings('.select2').children('.selection').children('.select2-selection').css('border-color', 'red')
        }
    });

    if (!allRequired || !select2allRequired) {
        validationError();
        event.preventDefault();
    }
    else {
        event.preventDefault()
        $(".search-blure-image-container").show();
        $(".search-blure").show();
        event.currentTarget.submit();
    }
});
////// STEPS IDEA
let tabIndexIdea = 1;
let tabsListIdea = [
    "need-select-tab",
    "basics-tab",
    "confirm-tab",
    "tracking-tab",
];
$(".idea-register-card .nav-link").click(function (event) {
    if ($(this).hasClass("disabled")) {
        return false;
    } else {
        let elementId = tabsListIdea.indexOf(this.id);
        tabIndexIdea = elementId;
        $("#step-number").text(`گام ${tabIndexIdea + 1} از 4`);
    }
});

let confirmFormSubmitIdea = false;
$(".idea-register-card #next-step-btn").on("click", function () {
    tabIndexIdea++;

    //// TO CHECK DOR
    if ($("#need-find-search-alert").hasClass("text-danger")) {
        $("#need-for-idea-search-inp").val("");
    }
    //// CHECK OTHERS
    confirmFormSubmitIdea = false;
    if (tabIndexIdea == 1) {
        //// VALIDATE DOR
    }

    if (tabIndexIdea == 2) {

        // قالب پارسا
        var parsaTemplate = $('#parsaTemplate').val();
        if (parsaTemplate == 'true') {
            $('#file-to-load').attr('required', 'required');
            $(this).addClass("is-invalid");


         //   $('#file-tag-suggestion').val("صورتجلسه تایید شورای پژوهشی موسسه")
            $('#file-tag-suggestion').select2('val', ['صورتجلسه تایید شورای پژوهشی موسسه']);

        }

        //قالب طرح پژوهشی
        var ResearchTemplate = $('#ResearchTemplate').val();
        if (ResearchTemplate == 'true') {
            $('#file-to-load').attr('required', 'required');
            $(this).addClass("is-invalid");

          //  $('#file-tag-suggestion').val("صورتجلسه تایید شورای پژوهشی موسسه")
            $('#file-tag-suggestion').select2('val', ['صورتجلسه تایید شورای پژوهشی موسسه']);

        }




        //var parsaSelected = 'false';
        //$("#type-idea-select :selected").each(function () {
        //    if (this.value == 1) // 1 is parsa
        //    {
        //        parsaSelected = 'true'
        //    };
        //});



        //if ((parsaTemplate == 'true') && ($('#file-to-load').get(0).files.length === 0)) {

        //    var errorToast = document.getElementById("parsa-validation-fail");
        //    if (errorToast) {
        //        var bsAlert = new bootstrap.Toast(errorToast);
        //        bsAlert.show();
        //    }
        //    tabIndexIdea--;



        //} else


            //if (parsaSelected == 'false' && parsaTemplate == 'true') {
            //    var errorToast = document.getElementById("parsa-validation-fail");
            //    if (errorToast) {
            //        var bsAlert = new bootstrap.Toast(errorToast);
            //        bsAlert.show();
            //    }
            //    tabIndexIdea--;

            //} else {


                // create new Idea high level page:



                var required = $("input,textarea").filter("[required]");
                var allRequired = true;


                var select2required = $("select").filter("[required]");
                var select2allRequired = true;

        
        var FoundTemplateFileRequired = $("#file-to-load").filter("[required]");
                var TemplateFileRequired = true;





        FoundTemplateFileRequired.each(function () {
                    $(this).removeClass("is-invalid");
                $('#file-to-load').siblings('input').css('border-color', '#2E8B57');
                    if ($(this).val() == "" || $(this).val() == "0") {
                        varTemplateFileRequired = false;
                        $(this).addClass("is-invalid");
                        $('#file-to-load').siblings('input').css('border-color', 'red');
                    }
                });
        

                required.each(function () {
                    $(this).removeClass("is-invalid");
                    $(this).removeClass("validate-border-red");
                    if ($(this).val() == "" || $(this).val() == "0") {
                        allRequired = false;
                        $(this).addClass("is-invalid");
                        $(this).addClass("validate-border-red");
                    }
                });



                select2required.each(function () {
                    $(this).removeClass("is-invalid");

                    $(this).siblings('.select2').children('.selection').children('.select2-selection').css('border-color', '#2E8B57')


                    if (($(this).val() == "") || $(this).val() == "0") {
                        select2allRequired = false;
                        $(this).addClass("is-invalid");

                        $(this).siblings('.select2').children('.selection').children('.select2-selection').css('border-color', 'red')
                    }
                });




        if (!allRequired || !select2allRequired || !TemplateFileRequired) {

                    validationError();
                    tabIndexIdea--;
                } else {
                    showData();
                }
          //  }
    }





    if (tabIndexIdea == 3) {
        $("#saveConfirmationModal").modal("show");
        tabIndexIdea--;
    }
    var someTabTriggerEl = document.querySelector(
        "#" + tabsListIdea[tabIndexIdea]
    );
    ////$(someTabTriggerEl).removeClass("disabled");

    var tab = new bootstrap.Tab(someTabTriggerEl);

    tab.show();
});

$(".idea-register-card #confirmSubmitIdeaBtn").on("click", function () {
    var someTabTriggerEl = document.querySelector("#tracking-tab");
    var tab = new bootstrap.Tab(someTabTriggerEl);
    tab.show();
});

function validationError() {
    var errorToast = document.getElementById("validation-fail");
    if (errorToast) {
        var bsAlert = new bootstrap.Toast(errorToast);
        bsAlert.show();
    }
}

$(".idea-register-card #prev-step-btn").on("click", function () {
    tabIndexIdea--;
    $("#step-number").text(`گام ${tabIndexIdea + 1} از 4`);
    var someTabTriggerEl = document.querySelector(
        "#" + tabsListIdea[tabIndexIdea]
    );
    var tab = new bootstrap.Tab(someTabTriggerEl);

    tab.show();

    if (tabIndexIdea < 2) {
        $("#next-step-btn").html("گام بعد");
    }
    if (tabIndexIdea == 0) {
        $("#prev-step-btn").attr("disabled", "disabled");
    }
});

$('.idea-register-card button[data-bs-toggle="tab"]').on(
    "show.bs.tab",
    function (event) {
        tabIndexIdea = tabsListIdea.indexOf(event.target.id);
        $("#step-number").text(`گام ${tabIndexIdea + 1} از 4`);
        if (tabIndexIdea == 0) {
            $("#prev-step-btn").hide();
            $("#save-step-btn").hide();
            $("#next-step-btn").html("گام بعد");
        }

        if (tabIndexIdea == 1) {
            $("#need-select-tab").addClass("disabled");
            $("#prev-step-btn").removeAttr("disabled");
            $("#prev-step-btn").show();
            $("#save-step-btn").show();
            $("#next-step-btn").html("گام بعد");
        }

        if (tabIndexIdea == 2) {
            $("#basics-tab").addClass("disabled");
            $("#prev-step-btn").removeAttr("disabled");
            $("#prev-step-btn").show();
            $("#next-step-btn").html("تایید و ثبت نهایی");
        }

        if (tabIndexIdea == 3) {
            $("#next-prev-group").addClass("d-none");
        }
    }
);

$('.idea-register-card button[data-bs-toggle="tab"]').on(
    "shown.bs.tab",
    function (event) {
        $(".nav-link.disabled").css("background", "#fff");
        if ($("#register-type-select").val() == 1) {
            $(".nav-link.disabled.active").css("background", "#2E8B57");
        } else {
            $(".nav-link.disabled.active").css("background", "#15c2f4");
        }
    }
);

////// FILE ADD
let upFileCount = 0;
$("#add-new-file-btn").on("click", function () {
    upFileCount++;
    var createdUpFileCount = $("#upfile-inp-group").children().length;
    //////createdUpFileCount < 10
    if (upFileCount < 10) {
        $("#upfile-inp-group").append(
            `<tr>
        <td>
          <input
            type="file"
            class="form-control"
            name="IdeaRelatedfiles"
          />
        </td>
        <td>
          <select
            type="text"
            class="form-select select-option-tag"
            style="width: 100%" name="IdeaRelatedfilesTags[]"
          >

            <option></option>
            <option>صورت جلسه شورای پژوهشی موسسه</option>
            <option>مقاله</option>
            <option>کتاب</option>
            <option><pre> </pre><span class="Parsa-Spn">پارسا</span> (پایان نامه+<span class="Dissertation-Spn">رساله</span>)</option>
            <option>پایان نامه</option>
            <option><span class="Dissertation-Spn">رساله</span></option>
            <option>شیوه نامه</option>
          </select>
        </td>
        <td>
        <button class="btn btn-outline-danger remove-upfile-btn" type="button"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`
        );
        $(".select-option-tag").select2({
            language: "fa",
            dir: "rtl",
            width: "resolve",
            //  multiple: false,
            //   minimumResultsForSearch: 2,
            tags: true,
            placeholder: "انتخاب نمایید",
        });
    } else {

        var errorToast = document.getElementById("max-link-error");
        if (errorToast) {
            var bsAlert = new bootstrap.Toast(errorToast);
            bsAlert.show();
        }
    }
});
$("#Need-add-new-file-btn").on("click", function () {
    upFileCount++;
    var createdUpFileCount = $("#upfile-inp-group").children().length;
    //////createdUpFileCount < 10
    if (upFileCount < 10) {
        $("#upfile-inp-group").append(
            `<tr>
        <td>
          <input
            type="file"
            class="form-control"
            name="IdeaRelatedfiles"
          />
        </td>
        <td>
          <select
            type="text"
            class="form-select select-option-tag"
            style="width: 100%" name="IdeaRelatedfilesTags[]"
          >

            <option></option>
            <option>صورت جلسه شورای پژوهشی موسسه</option>
            <option>مقاله</option>
            <option>کتاب</option>
            <option><pre> </pre><span class="Parsa-Spn">پارسا</span> (پایان نامه+<span class="Dissertation-Spn">رساله</span>)</option>
            <option>پایان نامه</option>
            <option><span class="Dissertation-Spn">رساله</span></option>
            <option>شیوه نامه</option>
          </select>
        </td>
        <td>
        <button class="btn btn-outline-danger remove-upfile-btn" type="button"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`
        );
        $(".select-option-tag").select2({
            language: "fa",
            dir: "rtl",
            width: "resolve",
            //  multiple: false,
            //   minimumResultsForSearch: 2,
            tags: true,
            placeholder: "انتخاب نمایید",
        });
    } else {

        var errorToast = document.getElementById("max-link-error");
        if (errorToast) {
            var bsAlert = new bootstrap.Toast(errorToast);
            bsAlert.show();
        }
    }
});

$("#upfile-inp-group").on("click", ".remove-upfile-btn", function () {
    $(this).parent().parent().remove();
});

///// LINK ADD
let linkCount = 0;
$("#add-new-link-btn").on("click", function () {
    linkCount++;
    var createdLinkCount = $("#link-inp-group").children().length;
    ////////  createdLinkCount < 10
    if (linkCount < 10) {
        $("#link-inp-group").append(
            `<tr>
        <td>
          <input
            type="text"
            class="form-control"
            placeholder="https://www ..."
            style="direction: ltr"
            name="IdeaRelatedLinks[]"
          />
        </td>
        <td>
          <select
            type="text"
            class="form-select select-option-tag"
            style="width: 100%" name="IdeaRelatedLinksTags[]"
          >
            <option></option>
            <option>صورت جلسه شورای پژوهشی موسسه</option>
            <option>مقاله</option>
            <option>کتاب</option>
            <option><pre> </pre><span class="Parsa-Spn">پارسا</span> (پایان نامه+<span class="Dissertation-Spn">رساله</span>)</option>
            <option>پایان نامه</option>
            <option><span class="Dissertation-Spn">رساله</span></option>
            <option>شیوه نامه</option>
          </select>
        </td>
        <td>
        <button class="btn btn-outline-danger remove-link-btn" type="button"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`
        );
        $(".select-option-tag").select2({
            language: "fa",
            dir: "rtl",
            width: "resolve",
            //  multiple: true,
            //   minimumResultsForSearch: 2,
            tags: true,
            placeholder: "انتخاب نمایید",
        });
    } else {
        var errorToast = document.getElementById("max-link-error");
        if (errorToast) {
            var bsAlert = new bootstrap.Toast(errorToast);
            bsAlert.show();
        }
    }
});

let linkCount2 = 0;
$("#Need-add-new-link-btn").on("click", function () {
    linkCount2++;
    var createdLinkCount = $("#link-inp-group").children().length;
    ////////  createdLinkCount < 10
    if (linkCount2 < 10) {
        $("#link-inp-group").append(
            `<tr>
        <td>
          <input
            type="text"
            class="form-control"
            placeholder="https://www ..."
            style="direction: ltr"
            name="IdeaRelatedLinks[]"
          />
        </td>
        <td>
          <select
            type="text"
            class="form-select select-option-tag"
            style="width: 100%" name="IdeaRelatedLinksTags[]"
          >
            <option></option>
            <option> صورت جلسه شورای پژوهشی موسسه</option>
            <option>مقاله</option>
            <option>کتاب</option>
            <option><pre> </pre><span class="Parsa-Spn">پارسا</span> (پایان نامه+<span class="Dissertation-Spn">رساله</span>)</option>
            <option>پایان نامه</option>
            <option><span class="Dissertation-Spn">رساله</span></option>
            <option>شیوه نامه</option>
            
          </select>
        </td>
        <td>
        <button class="btn btn-outline-danger remove-link-btn" type="button"><i class="bi bi-trash"></i></button>
        </td>
      </tr>`
        );
        $(".select-option-tag").select2({
            language: "fa",
            dir: "rtl",
            width: "resolve",
            //  multiple: true,
            //   minimumResultsForSearch: 2,
            tags: true,
            placeholder: "انتخاب نمایید",
        });
    } else {
        var errorToast = document.getElementById("max-link-error");
        if (errorToast) {
            var bsAlert = new bootstrap.Toast(errorToast);
            bsAlert.show();
        }
    }
});

$("#link-inp-group").on("click", ".remove-link-btn", function () {
    $(this).parent().parent().remove();
});

$("#idea-for-place-checkbox").on("change", function (e) {
    if ($(this).prop("checked") == true) {
        $(".idea-place-row").show();
    } else {
        $("#select-country").val(0).trigger("change");
        $("#select-province").val("").trigger("change");
        $("#select-city").val("").trigger("change");

        $(".idea-place-row").hide();
    }
});

$("#smart-similar-list-checkbox").on("change", function (e) {
    if ($(this).prop("checked") == true) {
        $("#smart-similar-list-row").show();
    } else {
        $("#smart-similar-list-row").hide();
    }
});

//////////// IMAGEPREVIEW
$("#preview-img-inp").on("change", function () {

    const [file] = $(this).prop("files");
    $("#selected-default-image").val(null);
    if (file) {

        $("#preview-img").attr("src", URL.createObjectURL(file));
    }
});

$("#selected-default-image").on("change", function () {
    var imgSrc = $("#selected-default-image").val();
    if (imgSrc) {
        $("#preview-img").attr("src", imgSrc);
    }
});

$("#select-default-image-btn").on("click", function () {
    var subjectAreaValue = $("#subjectarea-idea-select").val();
    console.log(subjectAreaValue);
    switch (subjectAreaValue) {
        case "25":
            $("#select-biology-bx").show();
            $("#select-health-bx").hide();
            $("#select-liberal-bx").hide();
            $("#select-physics-bx").hide();
            $("#select-social-bx").hide();
            $(".default-image-select-divider").hide();
            break;
        case "26":
            $("#select-biology-bx").hide();
            $("#select-health-bx").hide();
            $("#select-liberal-bx").show();
            $("#select-physics-bx").hide();
            $("#select-social-bx").hide();
            $(".default-image-select-divider").hide();
            console.log("ewwerwerw");
            break;
        case "27":
            $("#select-biology-bx").hide();
            $("#select-health-bx").hide();
            $("#select-liberal-bx").hide();
            $("#select-physics-bx").show();
            $("#select-social-bx").hide();
            $(".default-image-select-divider").hide();
            break;
        case "29":
            $("#select-biology-bx").hide();
            $("#select-health-bx").hide();
            $("#select-liberal-bx").hide();
            $("#select-physics-bx").hide();
            $("#select-social-bx").show();
            $(".default-image-select-divider").hide();
            break;
        case "28":
            $("#select-biology-bx").hide();
            $("#select-health-bx").show();
            $("#select-liberal-bx").hide();
            $("#select-physics-bx").hide();
            $("#select-social-bx").hide();
            $(".default-image-select-divider").hide();
            break;
        default:
            $("#select-biology-bx").show();
            $("#select-health-bx").show();
            $("#select-liberal-bx").show();
            $("#select-physics-bx").show();
            $("#select-social-bx").show();
            $(".default-image-select-divider").show();
    }

    $("#image-select-modal").modal("show");
});

$(".default-logo-img").on("click", function () {
    var reader = new FileReader();
    $("#preview-img-inp").val(null)
    $("#preview-img").attr("src", $(this).attr("src"));
    $("#selected-default-image").val($(this).attr("src"));
    $("#image-select-modal").modal("hide");
});

(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on(
            "input keydown keyup mousedown mouseup select contextmenu drop",
            function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            }
        );
    };
})(jQuery);
$("#costs-inp , #needed-time-inp").inputFilter(function (value) {
    return /^\d*$/.test(value);
});
$("#share-percent-inp").inputFilter(function (value) {
    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 100);
});

//////////// DATEPICKER
kamaDatepicker("thesis-approval-idea-inp");
kamaDatepicker("thesis-defence-idea-inp");

///// IDEA FORM CHANGES

$(document).ready(function () {

    const ideaOrNeedInputs = function () {
        if ($("#register-type-select").val() == 1) {
            $(".idea-inp").show();
            $(".need-inp").hide();

            //// input border
            $("#steps-form :input").css("border-color", "#2E8B57");
            $("#steps-form .accordion-body").css("background-color", "#f5fff5");
            $(".select2-selection,.input-group-text").css("border-color", "#2E8B57");
            if ($("#basics-tab").hasClass("active")) {
                $("#basics-tab").css("background", "#2E8B57");
            }

            $(".accordion-button").not(".collapsed").css("background", "#dcfbdb");
            //// refresh inputs

            if ($("#type-idea-select").val() && $("#type-idea-select").val().includes("1")) {
                $("#status-idea-inp-block").show();
                $("#thesis-approval-idea-inpblock").show();
            } else {

                $("#status-idea-inp-block").hide();
                $("#thesis-approval-idea-inpblock").hide();

                $("#thesis-defence-idea-inpblock").hide();
                $("#thesis-grade-idea-inpblock").hide();
            }

            //// THESIS ON IDEAS

            if ($("#status-idea-select").val() == 1) {
                $("#thesis-approval-idea-inpblock").hide();
                $("#thesis-defence-idea-inpblock").hide();
                $("#thesis-grade-idea-inpblock").hide();
            } else if (($("#status-idea-select").val() == 2)) {
                if ($("#status-idea-select").attr("display", "none") == true) {

                    $("#thesis-approval-idea-inpblock").show();
                }
                $("#thesis-defence-idea-inpblock").hide();
                $("#thesis-grade-idea-inpblock").hide();
            } else if ($("#status-idea-select").val() == 3) {
                $("#thesis-approval-idea-inpblock").hide();
                $("#thesis-defence-idea-inpblock").show();
                $("#thesis-grade-idea-inpblock").show();
            }

            //// DOR REQUIRED
            $("#need-for-idea-search-inp").prop("required", true);

            //// IDEA PRIVACY
            if ($("#new-idea-stat").val() == 2) {
                $("#ideaPeopleCountBx").show();
            } else {
                $("#ideaPeopleCountBx").hide();
            }

            /////
        }
        else {
            $(".idea-inp").hide();
            $(".need-inp").show();

            //// input border
            $("#steps-form :input").css("border-color", "#15c2f4");
            $("#steps-form .accordion-body").css("background-color", "#f7fafb");
            $(".select2-selection,.input-group-text").css("border-color", "#15c2f4");
            if ($("#basics-tab").hasClass("active")) {
                $("#basics-tab").css("background", "#15c2f4");
            }
            $(".accordion-button").not(".collapsed").css("background", "#c5e5ee");

            if ($("#type-need-select").val().includes("1")) {
                $("#status-need-inp-block").show();
                $("#thesis-approval-need-inpblock").show();

            } else {
                $("#status-need-inp-block").hide();
                $("#thesis-approval-need-inpblock").hide();
            }
            //// THESIS ACCEPTED NEED

            $("#thesis-approval-need-inpblock").hide();
            $("#thesis-defence-need-inpblock").hide();
            $("#thesis-grade-need-inpblock").hide();

            if ($("#status-thesis-need-select").val().includes("2") && $("#status-thesis-need-select").attr('hidden') == 'hidden') {
                var vl = $("#status-thesis-need-select").val();

                $("#thesis-approval-need-inpblock").show();
            }

            if ($("#status-thesis-need-select").val().includes("3")) {
                $("#thesis-defence-need-inpblock").show();
                $("#thesis-grade-need-inpblock").show();
            }

            //// DOR UN REQUIRE
            $("#need-for-idea-search-inp").prop("required", false);
        }
        ///// BOTH
        if (
            $("#register-need-radio").is(":checked") &&
            $("#needIsLimitedChb").is(":checked")
        ) {
            $(".needLimitBx").show();
        } else {
            $(".needLimitBx").hide();
        }
        //// CREDIT IDEAS
        if ($("#ideaNeedCreditChb").is(":checked")) {
            $(".ideaNeedCreditBx").show();
        } else {
            $(".ideaNeedCreditBx").hide();
        }

        /// CREDIT NEED
        if ($("#needCanCreditChb").is(":checked")) {
            alert($(this).val().toString())
            $(".needCanCreditBx").show();
        } else {
            $(".needCanCreditBx").hide();
        }
    };

    if ($("#register-type-select").length) {
        ideaOrNeedInputs();
    }

    $("#moreDescriptionChb").on("change", function () {
        if (this.checked) {
            $("#more-description-idea-inpblock").show();
        } else {
            $("#more-description-idea-inpblock").hide();
        }
    });

    $("#type-idea-select").on("change", function () {
        if ($(this).val().includes("1")) {
            $("#status-idea-inp-block").show();
            $("#thesis-approval-idea-inpblock").show();
            //// THESIS ON IDEAS
            if ($("#status-idea-select").val() == 1) {
                $("#thesis-approval-idea-inpblock").hide();
                $("#thesis-defence-idea-inpblock").hide();
                $("#thesis-grade-idea-inpblock").hide();
            } else if ($("#status-idea-select").val() == 2) {
                $("#thesis-approval-idea-inpblock").show();
                $("#thesis-defence-idea-inpblock").hide();
                $("#thesis-grade-idea-inpblock").hide();
            } else if ($("#status-idea-select").val() == 3) {
                $("#thesis-approval-idea-inpblock").hide();
                $("#thesis-defence-idea-inpblock").show();
                $("#thesis-grade-idea-inpblock").show();
            }
        } else {
            $("#status-idea-inp-block").hide();

            $("#thesis-approval-idea-inpblock").hide();
            $("#thesis-defence-idea-inpblock").hide();
            $("#thesis-grade-idea-inpblock").hide();
        }
    });

    $("#status-idea-select").on("change", function () {
        if ($(this).val() == 1) {
            $("#thesis-approval-idea-inpblock").hide();
            $("#thesis-defence-idea-inpblock").hide();
            $("#thesis-grade-idea-inpblock").hide();
        } else if ($(this).val() == 2) {
            $("#thesis-approval-idea-inpblock").show();
            $("#thesis-defence-idea-inpblock").hide();
            $("#thesis-grade-idea-inpblock").hide();
        } else if ($(this).val() == 3) {
            $("#thesis-approval-idea-inpblock").hide();
            $("#thesis-defence-idea-inpblock").show();
            $("#thesis-grade-idea-inpblock").show();
        }
    });

    $("#type-need-select").on("change", function () {

        if ($(this).val().includes("1")) {
            $("#status-need-inp-block").show();

            //// THESIS ON IDEAS
            $("#thesis-approval-need-inpblock").show();
            $("#thesis-defence-need-inpblock").hide();
            $("#thesis-grade-need-inpblock").hide();

            if ($("#status-idea-select").val() && $("#status-idea-select").val().includes("2")) {

                $("#thesis-approval-need-inpblock").show();
            }
            if ($("#status-idea-select").val() && $("#status-idea-select").val().includes("3")) {
                $("#thesis-defence-need-inpblock").show();
                $("#thesis-grade-need-inpblock").show();
            }
        } else {
            $("#status-need-inp-block").hide();
            $("#thesis-approval-need-inpblock").hide();
            $("#thesis-defence-need-inpblock").hide();
            $("#thesis-grade-need-inpblock").hide();
        }
    });

    $("#status-thesis-need-select").on("change", function () {
        $("#thesis-approval-need-inpblock").hide();
        $("#thesis-defence-need-inpblock").hide();
        $("#thesis-grade-need-inpblock").hide();

        if ($(this).val().includes("2")) {

            $("#thesis-approval-need-inpblock").show();
        }
        if ($(this).val().includes("3")) {
            $("#thesis-defence-need-inpblock").show();
            $("#thesis-grade-need-inpblock").show();
        }
    });
    var TitleLanguageCounter = 2;
    $(".add-title-lang-btn").on("click", function () {

        //var chosenlanguageIdStr = 'LanguageTitleId' + TitleLanguageCounter;
        //var chosenLanguageId = $('#' + chosenlanguageIdStr).val();

        TitleLanguageCounter++;

        //
        var ChosenLanguageElements = document.getElementsByClassName("langSelect");

        var chosenLanguagesIds = [];
        for (var i = 0; i < ChosenLanguageElements.length; i++) {
            chosenLanguagesIds.push(ChosenLanguageElements[i].value);

        }


        //




        //const titleLangInp = `
        //<div class="input-group input-group-sm mb-3">
        //  <select class="form-select-search">
        //    <option value="1">عربی</option>
        //    <option value="2">روسی</option>
        //    <option value="3">چینی</option>
        //  </select>
        //  <input type="text" class="form-control" id="title-idea-inp" />
        //  <button class="btn btn-outline-danger remove-lang-inp-btn" type="button">
        //    <i class="bi bi-trash"></i>
        //  </button>
        //</div>
        //`;
        const parentDiv = $(this).parent().parent();
        if (parentDiv.children().length < 7) {
            jQuery.post('/Language/AddTitleLanguagePartial', { Counter: TitleLanguageCounter, chosenLanguagesIds: chosenLanguagesIds }, function (titleLangInp) {

                parentDiv.append(titleLangInp);
                ideaOrNeedInputs();
                disableLanguage()
            })

        }

    });



    //function disableLanguage() {
    //  //  alert('closed')
    //    var ChosenLanguageElements = document.getElementsByClassName("langSelect");

    //    var chosenLanguagesIds = [];
    //    for (var i = 0; i < ChosenLanguageElements.length; i++) {
    //        chosenLanguagesIds.push(ChosenLanguageElements[i].value);

    //        document.querySelectorAll(".langSelect option").forEach(x => {
    //            if (x.value == ChosenLanguageElements[i].value) {
    //                x.disabled = true;
    //            }
    //        });



    //    }


    //}

    $("#title-inp-group-bx").on("click", ".remove-lang-inp-btn", function () {
        TitleLanguageCounter--;



        // var languageIdToRemove = $(this).parent().children('.form-select-search').val();
        //alert(languageIdToRemove.toString());

        $(this).parent().remove();

        disableLanguage()
    });

    //$(".add-more-time-btn").on("click", function () {
    //  const titleLangInp = `
    //  <div class="input-group input-group-sm mb-3">
    //    <input type="text" class="form-control" />
    //    <span class="input-group-text">ماه</span>
    //    <select class="form-select">
    //      <option>تمام وقت</option>
    //      <option>پاره وقت</option>
    //      <option>هیچ کدام</option>
    //    </select>
    //    <button class="btn btn-outline-danger remove-time-need-btn" type="button">
    //      <i class="bi bi-trash"></i>
    //    </button>
    //  </div>
    //  `;
    //  const parentDiv = $(this).parent().parent();
    //  if (parentDiv.children().length < 6) {
    //    parentDiv.append(titleLangInp);
    //    ideaOrNeedInputs();
    //  }
    //});

    $("#time-need-group-bx").on("click", ".remove-time-need-btn", function () {
        $(this).parent().remove();
    });

    $("#ideaFullFormAccordion").on("shown.bs.collapse", function () {
        $(this).find(".accordion-button").css("background", "#fff");
        if ($("#register-type-select").val() == 1) {
            $(this)
                .find(".accordion-button")
                .not(".collapsed")
                .css("background", "#dcfbdb");
        } else {
            $(this)
                .find(".accordion-button")
                .not(".collapsed")
                .css("background", "#c5e5ee");
        }
    });

    ///// IDEA NEED CREDIT
    $("#ideaNeedCreditChb").on("change", function () {
        if (this.checked) {
            $(".ideaNeedCreditBx").show();
        } else {
            $(".ideaNeedCreditBx").hide();
        }
    });
    //// NEED CAN CREDIT
    $("#needCanCreditChb").on("change", function () {
        if (this.checked) {
            $(".needCanCreditBx").show();
        } else {
            $(".needCanCreditBx").hide();
        }
    });
    //// NEED IS LIMITED
    $("#needIsLimitedChb").on("change", function () {
        if (this.checked) {
            $(".needLimitBx").show();
        } else {
            $(".needLimitBx").hide();
        }
    });

    ///// IDEA PRIVATE CHAGE

    $("#new-idea-stat").on("change", function () {
        if ($(this).val() == 2) {
            $("#ideaPeopleCountBx").show();
        } else {
            $("#ideaPeopleCountBx").hide();
        }
    });

    ////// Search For Need Table
    $("#search-for-need-tbl").on("click", "tr", function () {
        let selectedDor = $(this).children("td").eq(1).text();
        $("#search-for-need-modal").modal("toggle");
        $("#need-for-idea-search-inp").val(selectedDor).change();
    });

    $("#need-for-idea-search-inp").on("keyup change", function () {

        let dorVal = $(this).val();

        $("#need-find-search-alert").hide();
        if (dorVal.length >= 17) {
            //// AJAX Request
            jQuery.post('/Ideas/FindNeedIdeaToCreate', { DOR: dorVal }, function (json) {
                /////FINDED
                ////json.status == "success"
                if (json != "Not Found") {

                    var parsedJson = JSON.parse(json);
                    var imgSrc = (parsedJson.NeedImage != null ? imageSourse = `data:image/jpeg;base64,${parsedJson.NeedImage}` : imageSourse = "/Template/assets/images/no-image.jpg")

                    $("#need-find-search-alert").show();
                    $("#need-find-search-alert").removeClass("text-danger");
                    $("#need-find-search-alert").addClass("text-success");
                    $("#need-find-search-alert").text(parsedJson.Title);
                    needCardFill("success", {

                        imageSourse: imgSrc,
                        //   imageSourse : `data:image/jpeg;base64,${parsedJson.NeedImage}`,
                        title: parsedJson.Title,


                        dor: parsedJson.DOR,
                        subject: parsedJson.Category,
                    });
                }

                //not found:
                else {


                    $("#need-find-search-alert").show();
                    $("#need-find-search-alert").removeClass("text-success");
                    $("#need-find-search-alert").addClass("text-danger");
                    $("#need-find-search-alert").text("شناسه نیاز یافت نگردید");
                    needCardFill("error", 1);

                }

            })
            $("#need-find-search-alert").show();
            $("#need-find-search-alert").removeClass("text-danger");
            $("#need-find-search-alert").addClass("text-success");
            $("#need-find-search-alert").text(" تامین نسوز مکانیزیم کشویی تاندیش");
            needCardFill("success", {
                imageSourse: "assets/images/no-image.jpg",
                title: "ایده شماره 1",
                //date: "1400/09/28",
                //owner: "مهندس رادین مهر",
                dor: "20.0010.1.0.71376",
                subject: "علوم مهندسی",
            });
            // $("#need-find-search-alert").show();
            // $("#need-find-search-alert").removeClass("text-success");
            // $("#need-find-search-alert").addClass("text-danger");
            // $("#need-find-search-alert").text(" کد dor شما در سامانه ثبت نشده است");
        }
        else {
            $("#need-find-search-alert").show();
            $("#need-find-search-alert").removeClass("text-success");
            $("#need-find-search-alert").addClass("text-danger");
            // $("#need-find-search-alert").text("کد DOR باید حداقل 17 کاراکتر باشد");
            needCardFill("error", 1);
        }
    });

    ////// RE TYPE SELECT
    $("#re-type-selectChb").on("change", function () {

        if ($("#re-type-selectChb").is(":checked")) {


            $("#register-own-re-bx").show();

        }
        else {

            $("#register-own-re-bx").hide();
        }


        //  $("#registered-re-bx").hide();
        //$("#register-own-re-bx").hide();
        //if ($(this).val().includes("2")) {
        //$("#registered-re-bx").show();
        //}
        //if ($(this).val().includes("3")) {
        //$("#register-own-re-bx").show();
        // }
    });
    $(".add-more-own-re-btn").on("click", function () {
        const titleLangInp = `
    <div
      class="input-group input-group-sm mb-3"
    >
      <input
        type="text"
        class="form-control"
        placeholder="نام"  name="SuggestedJudgeFirstName[]"
      />
<input
        type="text"
        class="form-control"
        placeholder="نام خانوادگی"  name="SuggestedJudgeLastName[]"
      />
      <input
        type="text"
        class="form-control"
        placeholder="شماره تلفن"   name="SuggestedJudgePhoneNumber[]"
      />
     <input type="text"
     class="form-control"
     placeholder="ایمیل" name="SuggestedJudgeEmail[]" />

  
      <button class="btn btn-outline-danger remove-own-re-btn" type="button">
        <i class="bi bi-trash"></i>
      </button>
                                      </div>
    `;
        const parentDiv = $(this).parent().parent();
        if (parentDiv.children().length < 6) {
            parentDiv.append(titleLangInp);
            ideaOrNeedInputs();
        }
    });

    $("#register-own-re-bx").on("click", ".remove-own-re-btn", function () {
        $(this).parent().remove();
    });
});

//// FILL NEED CARD
function needCardFill(type, data) {
    if (type == "success") {
        let cardInnerHtml = `
    <img src="${data.imageSourse}" class="card-img-top" />
    <ul class="list-group list-group-flush">
      <li class="list-group-item fs-7">
        عنوان نیاز : ${data.title}
      </li>
      
      <li id="list-group-item-DOR-Id" class="list-group-item fs-7">شناسه (DOR) : ${data.dor}</li>
      <li class="list-group-item fs-7">
        حوزه موضوعی اصلی : ${data.subject}
      </li>
    </ul>
    `;
        $(".view-need-for-idea-card").html(cardInnerHtml);
    } else {
        //// Not Found

        $(".view-need-for-idea-card").html(`
    <div class="card-body">
      <div class="alert alert-warning fs-7" role="alert">
        <p>نیازی برای ایده شما انتخاب نشده است.</p>
        <hr />
        <p class="mb-0">
          امکان ثبت ایده غیر مرتبط با نیاز های ثبت شده در سیستم
          محدود شده است.
        </p>
      </div>
    </div>
    `);
    }
}



//// FILL MOP NEED CARD
function MOPNeedCardFill(type, data) {
    if (type == "success") {
        let cardInnerHtml = `
    <img src="${data.imageSourse}" class="card-img-top" />
    <ul class="list-group list-group-flush">
      <li class="list-group-item fs-7">
        عنوان تقاضا : ${data.title}
      </li>
      
      <li id="list-group-item-DOR-Id" class="list-group-item fs-7">شناسه (DOR) : ${data.dor}</li>
      <li class="list-group-item fs-7">
        درخت فناوری : ${data.subject}
      </li>
    </ul>
    `;
        $(".view-need-for-idea-card").html(cardInnerHtml);
    } else {
        //// Not Found

        $(".view-need-for-idea-card").html(`
    <div class="card-body">
      <div class="alert alert-warning fs-7" role="alert">
        <p>تقاضایی برای عرضه شما انتخاب نشده است.</p>
        <hr />
        <p class="mb-0">
          امکان ثبت عرضه غیر مرتبط با تقاضاهای های ثبت شده در سیستم
          محدود شده است.
        </p>
      </div>
    </div>
    `);
    }
}

//// NEED & IDEA INPUT MONEY
$(".money-inp").keyup(function (event) {
    if (event.which >= 37 && event.which <= 40) return;
    $(this).val(function (index, value) {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
});

//////////// ANIMATE NUMBER

var counters = document.querySelectorAll(".animate-number");
var speed = 400;

counters.forEach((counter) => {
    const animate = () => {
        const value = +counter.getAttribute("animate-to");
        const data = +counter.getAttribute("animate-from");

        const time = value / speed;
        if (data < value) {
            counter.setAttribute("animate-from", Math.ceil(data + time));
            counter.innerText = toFarsiNumber(Math.ceil(data + time));
            setTimeout(animate, 1);
        } else {
            counter.innerText = toFarsiNumber(value);
        }
    };
    animate();
});
function toFarsiNumber(n) {
    return n;
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    //return n
    //    .toString()
    //    .split("")
    //    .map((x) => farsiDigits[x])
    //    .join("");
}

///////// PROFILE PAGE
$(document).ready(function () {
    $("#preview-profile-img").on("click", function () {
        $("#profile-img-inp").trigger("click");
    });

    $("#profile-img-inp").on("change", function () {
        const [file] = $(this).prop("files");
        if (file) {
            $("#preview-profile-img").attr("src", URL.createObjectURL(file));
        }
    });

    //////////// FORM BASIC INFO
    $("#basic-profile-info-btn").on("click", function () {
        $("#basic-profile-info-frm").submit();
    });

    $("#basic-profile-info-frm").on("submit", function (event) {
        event.preventDefault();
        //// FORM BASIC SUBMIT
        console.log("submit");
    });

    //////////// FORM POST INFO
    $("#postal-profile-info-btn").on("click", function () {
        $("#postal-profile-info-frm").submit();
    });

    $("#postal-profile-info-frm").on("submit", function (event) {
        event.preventDefault();
        //// FORM POST SUBMIT
        console.log("submit");
    });

    //////////// FORM FAVORITE
    $("#favorite-profile-info-btn").on("click", function () {
        $("#favorite-profile-info-frm").submit();
    });

    $("#favorite-profile-info-frm").on("submit", function (event) {
        event.preventDefault();
        //// FORM FAVORITE SUBMIT
        console.log("submit");
    });

    //////////// FORM PASSWORD
    $("#password-profile-btn").on("click", function () {
        $("#password-profile-frm").submit();
    });

    $("#password-profile-frm").on("submit", function (event) {
        event.preventDefault();
        //// FORM FAVORITE SUBMIT
        console.log("submit");
    });
});

////// NEW IDEA PAGE
$(document).ready(function () {
    $("#new-idea-stat").on("change", function () {
        let ideaStat = $(this).val();
        if (ideaStat == 2) {
            $("#targetgroup-idea-div").show();
            $("#teamcount-idea-div").show();
        } else {
            $("#targetgroup-idea-div").hide();
            $("#teamcount-idea-div").hide();
        }
    });

    let filledIdeaForm = 0;
    let titleIdeaInp = false;
    let keywordsIdeaInp = false;
    let abstractIdeaInp = false;

    $("#title-idea-inp").keyup(function () {
        if (this.value.length > 0) titleIdeaInp = true;
        else titleIdeaInp = false;
        progressUpdate();
    });
    $("#keywords-idea-inp").keyup(function () {
        if (this.value.length > 0) keywordsIdeaInp = true;
        else keywordsIdeaInp = false;
        progressUpdate();
    });

    $("#abstract-idea-inp").keyup(function () {
        if (this.value.length > 0) abstractIdeaInp = true;
        else abstractIdeaInp = false;
        progressUpdate();
    });

    function progressUpdate() {
        filledIdeaForm = 0;
        // if (inpPreviewImgIdea) filledIdeaForm += 25;
        if (titleIdeaInp) filledIdeaForm += 33.333;
        if (abstractIdeaInp) filledIdeaForm += 33.333;
        if (keywordsIdeaInp) filledIdeaForm += 33.333;
        console.log("progress updated", filledIdeaForm);
        $("#new-idea-progress").attr("aria-valuenow", filledIdeaForm);
        $("#new-idea-progress").css({ width: `${filledIdeaForm}%` });
        ////$("#new-idea-progress").text(`${filledIdeaForm}%`);
    }
});

$(document).ready(function () {
    $("#preview-organization-img").on("click", function () {
        $("#organization-img-inp").trigger("click");
    });

    $("#organization-img-inp").on("change", function () {
        const [file] = $(this).prop("files");
        if (file) {
            $("#preview-organization-img").attr("src", URL.createObjectURL(file));
        }
    });
});
///// AutoCompelete
//const keywordInput = document.getElementById("keyword-input");
//if (keywordInput) {
//    const ac = new Autocomplete(keywordInput, {
//        maximumItems: 5,
//        onInput: (userInput) => {
//            $.get("nan ajax endpoint ", function (res) {
//                ac.setData(res);
//                // ac.setData([
//                //   { label: "عنوان 1", value: "1" },
//                //   { label: "عنوان 2", value: "2" },
//                // ]);
//            });
//        },
//    });
//}

//////// LOGIN CONFIRM
$(".agreement-input-chb").click(function () {
    if ($(this).is(":checked")) {
        $(this).prop("checked", false);
        $("#termsAndConditionsModal").modal("show");
    }
});

$("#confirm-terms-and-conditions-modal").on("click", function () {
    $(".agreement-input-chb").prop("checked", true);
    $("#termsAndConditionsModal").modal("hide");
});


// input type file (persian)
$(document).ready(function () {
    $("#upfile-inp-group").on(
        "change",
        '.farsi-file-button input[type="file"]',
        function (e) {
            $(this).siblings('input[type="text"]').val(e.target.files[0].name);
        }
    );

    $("#upfile-inp-group").on(
        "click",
        ".farsi-file-button input[type='text'],.farsi-file-button .input-group-text",
        function () {
            $(this).siblings('input[type="file"]').trigger("click");
        }
    );
});


//////// AJAX FOR RESEND 
var resendSmsCounter = 0;
$(document).ready(function () {
    $("#resend-code-btn").on("click", function () {
        resendSmsCounter += 1;
        if (resendSmsCounter >= 2) {
            $('#email-confirm-input-bx').removeAttr('hidden')
            $('#email-inp').removeAttr('hidden')

        }

        $(this).prop("disabled", true);
        var phonenumber = $('#mobileNumber-inp').val();
        // alert(phonenumber)
        jQuery.post('/Account/SendCodeSMS', { PhoneNumber: phonenumber }, function (vl) {
            var parsedToast = JSON.parse(vl);

            $('#toast-title-strong').html(parsedToast.TitleStrong.toString())
            $('#toast-title-muted').html(parsedToast.TitleMuted.toString())
            $('#toast-body').html(parsedToast.ToastBody.toString())



            $("#toast-body").removeClass(function (index, css) {
                return (css.match(/\bbg-\S+/g) || []).join(' '); // removes anything that starts with "bg-"
            });



            $('#toast-body').addClass(parsedToast.ToastColor.toString());

            if (parsedToast.Done == true) {
                //  $('#mobile-inp').attr('disabled', 'disabled');
                //  $('#mobile-inp').attr('readonly', 'readonly');
            } else {
                //   $('#mobile-inp').prop('disabled', false);
                // $('#mobile-inp').prop('readonly', false);
                // $('#resend-code-btn').attr('hidden','hidden');

                startConfirmTimer(1);
            }

            var myToast = document.getElementById("alert-toast");
            if (myToast) {
                var bsAlert = new bootstrap.Toast(myToast);
                bsAlert.show();
            }


            startConfirmTimer(300);




        })
        //  startConfirmTimer(300);

        //////// AJAX FOR RESEND
    });

    startConfirmTimer(300);
});

function startConfirmTimer(duration) {
    var timer = duration,
        minutes,
        seconds;
    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#resend-code-btn").html(minutes + ":" + seconds);

        if (--timer < 0) {
            $("#resend-code-btn").prop("disabled", false);
            //  $('#mobile-inp').prop('disabled', false);
            //  $('#mobile-inp').prop('readonly', false);



            $("#resend-code-btn").html("ارسال مجدد کد به تلفن همراه");
            clearInterval(interval);
        }
    }, 1000);
}




$(document).ready(function () {
    $("#item-view-dislike").on("click", function () {
        ////$(".btn-dislike-item").children("span").text();
    });
    $("#item-view-like").on("click", function () {
        ////$(".btn-like-item").children("span").text();
    });

    ///
    AOS.init({
        offset: 120,
        duration: 900,
        easing: "ease",
        once: true,
    });
    //
});



$(".dropdown-menu a.dropdown-toggle").on("click", function (e) {
    if (!$(this).next().hasClass("show")) {
        $(this)
            .parents(".dropdown-menu")
            .first()
            .find(".show")
            .removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass("show");

    $(this)
        .parents("li.nav-item.dropdown.show")
        .on("hidden.bs.dropdown", function (e) {
            $(".dropdown-submenu .show").removeClass("show");
        });

    return false;
});
$("#showSameIdeasBtn").on("click", function () {
    $("#sameIdeasErrBox").hide();
    let ideasHasError = false;
    let titleIdeaInp = $("#title-idea-inp").val();
    let keywordIdeaInp = $("#keywords-idea-inp").val();
    let abstractIdeaInp = $("#abstract-idea-inp").val();

    if (titleIdeaInp.length == 0) ideasHasError = true;
    if (keywordIdeaInp.length == 0) ideasHasError = true;
    if (abstractIdeaInp.length == 0) ideasHasError = true;

    ////// reauest
    if (!ideasHasError) {


        var title = $('.idea-title-for-similarity').val();
        //var keywords = $('.idea-keywords-for-similarity').val();
        //var abstract = $('.idea-abstract-for-similarity').val();


        $(".search-blure-image-container").show();
        $(".search-blure").show();


        jQuery.post('/Ideas/SimilarIdeasPartial', { SearchText: title }, function (v) {

            $("#show-same-ideas-inpblock").html(v);
            // $("#show-same-ideas-inpblock").show();

            $(".search-blure").hide();
            $(".search-blure-image-container").hide();
            $("#showSameIdeasModal").modal("toggle");
        })


    } else {
        $("#sameIdeasErrBox").show();
    }
});

$('#thinking-Room-chb').change(function () {
    //if ($(this).checked) {
    //    alert('checked')
    //    $('#thinking-room-select-div').removeAttr('hidden')

    //}
    //else {
    //    $('#thinking-room-select-div').attr('hidden', 'hidden')
    //}
    if ($(this).prop("checked") == true) {
        $('#thinking-room-select-div').removeAttr('hidden')
    } else {
        $('#thinking-room-select-div').attr('hidden', 'hidden')
        // $("#thinking-room-select").select2("val", "").trigger('change');
        $("#owner-of-thinking-room-select").val('').trigger('change')
        $("#thinking-room-select").val('').trigger('change')
    }
})





$("#showSameNeedsBtn").on("click", function () {
    $("#sameNeedsErrBox").hide();
    let needsHasError = false;
    let titleIdeaInp = $("#title-idea-inp").val();
    let keywordIdeaInp = $("#keywords-idea-inp").val();
    let abstractIdeaInp = $("#abstract-idea-inp").val();

    if (titleIdeaInp.length == 0) needsHasError = true;
    if (keywordIdeaInp.length == 0) needsHasError = true;
    if (abstractIdeaInp.length == 0) needsHasError = true;

    ////// reauest
    if (!needsHasError) {

        var title = $('.need-title-for-similarity').val();
        //var keywords = $('.need-keywords-for-similarity').val();
        //var abstract = $('.need-abstract-for-similarity').val();
        $(".search-blure-image-container").show();
        $(".search-blure").show();


        jQuery.post('/Needs/SimilarNeedsPartial', { SearchText: title }, function (v) {

            $("#show-same-needs-inpblock").html(v);
            // $("#show-same-needs-inpblock").show();

            $(".search-blure").hide();
            $(".search-blure-image-container").hide();
            $("#showSameNeedsModal").modal("toggle");
        })

    } else {
        $("#sameNeedsErrBox").show();
    }
});


//




$(document).ready(function () {
    $(".login-type-radio").on("change", function (event) {
        if (event.target.value == "mobile") {
            $(".login-by-mobile-bx").show();
            $(".login-by-mail-bx").hide();
        } else {
            $(".login-by-mail-bx").show();
            $(".login-by-mobile-bx").hide();
        }
    });
});


$(document).ready(function () {
    $("#password-toggle-btn").on("click", function () {
        if ($("#password-toggle-inp").attr("type") == "password") {
            $("#password-toggle-inp").attr("type", "text");
            $("#password-toggle-btn").html('<i class="bi bi-eye-slash-fill"></i>');
        }
        else {
            $("#password-toggle-inp").attr("type", "password");
            $("#password-toggle-btn").html('<i class="bi bi-eye-fill"></i>');
        }
    });
});
