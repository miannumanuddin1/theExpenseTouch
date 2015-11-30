/// <reference path="../Scripts/jquery-2.1.3.js" />
/// <reference path="../Models/Main.js" />
/// <reference path="../js/kendo.all.min.js" />
/// <reference path="../Models/AppExpense.js" />


// login page
//alert("yes");
//$("#Login-home").ready(function () {
//                     //  alert("alet");
//    $("#EmailAddress").val(localStorage.getItem("e"));
//    $("#Password").val(localStorage.getItem("p"));
//   // $("#btnlogin").click(function () {
//        $("#btnlogin").kendoButton({
//            click: btnLoginClickEvent
//    //   });
//    });

//});


//function btnLoginClickEvent () {

//    var username = $("#EmailAddress").val();
//    var Password = $("#Password").val();
//    console.log(username);
//    console.log(Password);
//    localStorage.setItem("e", username);
//    localStorage.setItem("p", Password);
// //   alert("loginclick");
//    if (username == "") {
//        LoginError("Enter your email address.");
//    }
//    else if (Password == "") {
//        LoginError("Enter your password.");
//    }
//    else {
//        checConnection();
//        if (ConnectionStat == "No network connection") {
//            LoginError("No network connection.");
//        }
//        else {
//           // alert("user");
//            getuser(username, Password);
//        }
//    }
//}
var ConnectionStat;

function checConnection() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    ConnectionStat = states[networkState];
}

function checkConnectionCal(callback) {
    var networkStat = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';

    //    getconstatus = states[networkState];
    callback(states[networkStat]);
    //alert('Connection type: ' + states[networkState]);
}

//// end of login page

//$("#PrepareMyTravels-layout").ready(function () {
//    //$("#datepicker").attr("type", "date");
//    //$("#datepickerto").attr("type", "date");

//    $("#btnsave").click(function () {
//        $("#btnsave").kendoButton({
//            enable: false
//        });
//    //   alert("click");
//        var travelname  = $("#TravelName").val();
//        var datefrom = $("#datepicker").val();
//        //var objdatefrom = new Date(datefrom).getMonth() + '/' + new Date(datefrom).getDate() + "/"  +new Date(datefrom).getFullYear();
//        var dateto = $("#datepickerto").val();
//       //var objdateto =new Date(dateto).getMonth() + '/' + new Date(dateto).getDate() + "/" + new Date(dateto).getFullYear();
//        var descriptions = $("#Description").val();
//      //   alert(dateto);
//        insertTravelstrans(travelname, datefrom, dateto, descriptions);

//    });
//    });

// End of Prepare My Travels
// View Travel
//$("#viewmytravel-layout").ready(function () {
//                                //$("#datepicker").attr("type", "date");
//                              //  //$("#datepickerto").attr("type", "date");
//                               // $( ".deleteTravel").live("click", function () {
//                                 //                        alert("click");
//
//
//                                   //                      });
//
//                                });a

function initPullToRefreshScroller(e) {


    //var scroller = e.view.scroller;

    //scroller.setOptions({
    //    pullToRefresh: true,
    //    pull: function() {
    //        SyncFn();
    //        $("#t01 tbody").html("");
            //  alert("viewTravelAfterShow");
            getTravelTrans();
       //setTimeout(function() { scroller.pullHandled(); }, 2000);
       // }
  //  })
}

// View Travel end
//Prepare My Travels
function addtravelshow() {
    var flag = localStorage.getItem("flag");
    $("#addtravelflag").attr("src", flag);
    $("#TravelName").val('');
    $("#datepicker").val('');
    $("#datepickerto").val('');
    $("#Description").val('');
    document.getElementById("TravelName").style.backgroundColor = "";
    document.getElementById("datepicker").style.backgroundColor = "";
    document.getElementById("datepickerto").style.backgroundColor = "";
    document.getElementById("Description").style.backgroundColor = "";
}
/// upload my expensee


function uploadExpensePageLoad(e) {
    var flag = localStorage.getItem("flag");
    $("#uploadExpenseflag").attr("src", flag);
    $("#date").val('');
    $("#txtDescription").val('');
    $("#amount").val('');
    $("#ddlExpenseType").val('');
    $("#ddlCurrency").val("USD");
    $("#image").attr('src', '');

    document.getElementById("date").style.backgroundColor = "";
    document.getElementById("amount").style.backgroundColor = "";
    document.getElementById("ddlCurrency").style.backgroundColor = "";
    document.getElementById("txtDescription").style.backgroundColor = "";
    checkConnectionCal(function (NetworkStat) {
        if (NetworkStat == "No network connection") {
            function alertDismissed() {

            }

            navigator.notification.alert(
                'No network connection! First connect with your internet.', // message
                alertDismissed, // callback
                ' Connection error', // title
                'Ok'                  // buttonName
            );
        }
        else {
            CurrencyList();
            // Support: Safari, iOS Safari, default Android browser
            //document.getElementById("formvalidate").addEventListener("submit", function (event) {
            //    if (this.checkValidity()) {
            //        alert("Successful submission");
            //    } else {
            //        event.preventDefault();
            //    }
            //});
            var id = e.view.params.TID;


      //      alert(id);s
            getTravelByUserId(id); //getTravelByUserId(id);
            getExpenseType();
            //  $("table").kendoGrid();

        }
    });
}

function UploadExpense(e) {


        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
           //    $ = document.getElementById();
                //alert("click");
                var travelid = $("#ddlTravelName").val();
                localStorage.setItem("TravelIdForRedirection", travelid);
                var date = $("#date").val();
                var descr = $("#txtDescription").val();
                var amount = $("#amount").val();
                var expenseid = $("#ddlExpenseType").val();
                var currency = $("#ddlCurrency").val();
                //   var img = $("#image").attr("src");
                var im = $("#image").attr("src");
                var ima = im.split(',');
                var image = "";
                if (ima.length > 1) {
                    image = ima[1];
                }
                $("#Img").attr("src", '');
                $("#Img").css("display", "none");
                //
                //   var img = localStorage.getItem("base64Image");//, base64Img);
                $("#image").hide();
                var commentRequired = $("#ddlExpenseType option:selected").attr("data-commentrequired");


                document.getElementById("date").style.backgroundColor = "";
                document.getElementById("amount").style.backgroundColor = "";
                document.getElementById("ddlCurrency").style.backgroundColor = "";
                document.getElementById("txtDescription").style.backgroundColor = "";
                if (date == "") {
                    document.getElementById("date").style.backgroundColor = "red";
                    //    $("#date"). .style.background["#,##0 ;[Red](#,##0)"]; .css("background","red !important");
                } else if (amount == "") {
                    document.getElementById("amount").style.backgroundColor = "red";
                    //$("#amount").css("background", "red !important");
                } else if (currency == "") {
                    document.getElementById("ddlCurrency").style.backgroundColor = "red";
                    //$("#ddlCurrency").css("background", "red !important");
                } else {
                    if (commentRequired == "true") {
                        if (descr == "") {
                            document.getElementById("txtDescription").style.backgroundColor = "red";
                        //    $("#txtDescription").css("background", "red !important");
                        }
                        else {
                            insertExpensetransaction(travelid, date, descr, amount, expenseid, currency, image);
                        }
                    }
                    else {
                        insertExpensetransaction(travelid, date, descr, amount, expenseid, currency, image);
                    }




                }
            }
        });

    }
//    function getPhoto(source) {
//        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
//            quality: 50,
//            destinationType: destinationType.FILE_URI,
//            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
//            mediaType: navigator.camera.MediaType.ALLMEDIA,
//            sourceType: source
//        });
//
//    }
function ChoosePhoto() {
  //  alert("gggg");
    getPhoto(pictureSource.PHOTOLIBRARY);
}
function ChoosePhotoEdit() {

    window.sessionStorage.setItem("from", "Edit");

    getPhoto(pictureSource.PHOTOLIBRARY);
}
function CapturePhotoUpload() {
    var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
    var options = {
        quality: 60, targetWidth: 800,targeHeight: 800,correctOrientation: true, destinationType: Camera.DestinationType.FILE_URI, encodingType: Camera.EncodingType.PNG, sourceType: Camera.PictureSourceType.CAMERA, saveToPhotoAlbum: false, popoverOptions: popover
    };

    navigator.camera.getPicture(onPhotoURISuccess, onFail, options);
  ///  window.sessionStorage.setItem("from", "Edit")

    //navigator.camera.getPicture(onPhotoDataSuccess, onFail, {

    //    encodingType: Camera.EncodingType.PNG,
    //    destinationType: destinationType.DATA_URL,
    //   targetWidth: 800,
    //    sourceType: Camera.PictureSourceType.CAMERA,
    //    saveToPhotoAlbum: false
    //});
}
function CapturePhotoEdit() {

    window.sessionStorage.setItem("from", "Edit");
    var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
    var options = {
        quality: 60, targetWidth: 800, targetHeight: 800, correctOrientation: true, destinationType: Camera.DestinationType.FILE_URI, encodingType: Camera.EncodingType.PNG, sourceType: Camera.PictureSourceType.CAMERA, saveToPhotoAlbum: false, popoverOptions: popover
    };

    navigator.camera.getPicture(onPhotoURISuccess, onFail, options);
    //navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
    //    quality: 100,
    //    encodingType: Camera.EncodingType.PNG,
    //    destinationType: destinationType.DATA_URL,
    //    targetWidth: 800,
    //    sourceType: Camera.PictureSourceType.CAMERA,
    //    saveToPhotoAlbum: false
    //});
}
/// upload my expensee
///View My Expense
    function initExpanse(e) {

        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                GetAllTravelByUserId();
            }
        });
    }
    function SubmitExpense(e) {
        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {
                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                var TravelId = $(this).data("Tid");
                //   alert(Tid);
                SubmitExpensebyTravelId(TravelId);
            }
        });
    }

    function ExpenseDelete() {
        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                var expenseid = $(this).data("data-Did");
                deletetravelexpens(expenseid);
            }
        });
    }

    function EditExpensePageLoad(e) {

        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {

                var id = localStorage.getItem("UserId");
                var tid = e.view.params.TID;
                EgetTravelByUserId(tid);
                EgetExpenseType();


            }
        });
    }
    function EditExpensePageshow(e) {
        EditCurrencyList();
        var flag = localStorage.getItem("flag");
        $("#editexpenseflag").attr("src", flag);
        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                var expenseid = e.view.params.ID;

                edittravelexpens(expenseid);
            }
        });
    }
    function UpdateExpense(e) {

        // alert("yes");

        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {

                var expenseid = $('#btn-update').attr("data-id");
                // $('#btn-update').css("display", "none");
                var travelid = $("#ddlTravel").val();
                var date = $("#txtdate").val();
                var descr = $("#txtDesc").val();
                var amount = $("#txtamount").val();
                var expenseTypeid = $("#ddlExpense").val();
                var currency = $("#ddlCur").val();
                var im = $("#Img").attr("src");
                var ima = im.split(',');
                var image = "";
                if (ima.length > 1) {
                    image = ima[1];
                }
                $("#Img").attr("src", '');
                $("#Img").css("display", "none");

                console.log(expenseid);
                console.log(travelid);
                console.log(date);
                console.log(descr);
                console.log(amount);
                console.log(expenseTypeid);
                console.log(currency);
                var commentRequired = $("#ddlExpense option:selected").attr("data-commentrequired");
                //  alert(expenseid);
                //$("#btn-update").attr("data-id", expenseid);

                document.getElementById("txtdate").style.backgroundColor = "";
                document.getElementById("txtamount").style.backgroundColor = "";
                document.getElementById("ddlCur").style.backgroundColor = "";
                document.getElementById("txtDesc").style.backgroundColor = "";
                if (date == "") {
                    document.getElementById("txtdate").style.backgroundColor = "red";
                    //$("#txtdate").css("background-color", "red");
                } else if (amount == "") {
                    document.getElementById("txtamount").style.backgroundColor = "red";
                    //$("#txtamount").css("background-color", "red");

                    return false;
                } else if (currency == "") {
                    document.getElementById("ddlCur").style.backgroundColor = "red";
                    //$("#ddlCur").css("background-color", "red");
                } else {

                    if (commentRequired == "true") {
                        if (descr == "") {
                            document.getElementById("txtDesc").style.backgroundColor = "red";
                            //$("#txtDesc").css("background-color", "red");
                         kendoMobileApp.pane.loader.hide();
                        }
                        else {
                            UpadateExpensetransaction(expenseid, travelid, date, descr, amount, expenseTypeid, currency, image);
                        }
                    } else {
                        UpadateExpensetransaction(expenseid, travelid, date, descr, amount, expenseTypeid, currency, image);
                    }



                }
                kendoMobileApp.pane.loader.hide();

            }
        });
    }
// End My Expense
/// view expenses of Travel by expenseid
    function getExpensesofTravelInit(e) {
        //  alert("in getExpensesofTravelInit");

        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                var expenseid = e.view.params.EID;
                // alert(expenseid);
                getexpensebyexpenseid(expenseid);
            }
        });
    }

/// End view expenses of Travel
/// my submission ////

    //function mysubmissionpulltorefresh(e) {


    //    //var scroller = e.view.scroller;

    //    //scroller.setOptions({
    //    //    pullToRefresh: true,
    //    //    pull: function () {
    //    //        SyncFn();
    //    //        $("#t02 tbody").html("");
    //            GetAllTravelByUserIdS();
    //    //        setTimeout(function () { scroller.pullHandled(); }, 2000);
    //    //    }
    //    //})
    //}
    //function initMySubmission(e) {
    // // alert("initMySubmission")
    //      $("#t02 tbody").html("");
    //    GetAllTravelByUserIdS();
    //}




//// end my submission
    /// Submission expenses of Travel
    function SubmissionExpensesofTravelInit(e) {

        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                //  alert("last Submission");
                var TID = e.view.params.TID;
                //     alert(TID);
                var comment = e.view.params.comments;
                if (comment != null || '') {
                    $("#comments").html(comment);
                } else {
                    $("#comments").html("No Comment Available");
                }
                // var travelid = e.view.params.TID;
                //alert(travelid);
                viewSubmitTravelById(TID);
                submissionExpensesByTID(TID);
            }
        });
    }

    /// End submission expenses of Travel
//// Edit Travel//
    function EditMyTravelInit(e) {
        var flag = localStorage.getItem("flag");
        $("#edittravelflag").attr("src", flag);

        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                // alert("in edit")
                console.log(e.view.params);
                var TID = e.view.params.id;
                TID = $.trim(TID);
                console.log("[" + TID + "]");
                //  alert(TID);
                EditTravelById(TID);
            }
        });
    }

/// Edit Travel //////
/////update Travel
    $("#btn-travelupdate").kendoButton({
        click: btnupdateTravelClickEvent
    });

    function btnupdateTravelClickEvent() {


        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                //    alert("click");
                var Name = $("#txt-TravelName").val();

                var datefrom = $("#txt-datepickerrr").val();
                var dateto = $("#txt-datepickertooo").val();
                var desc = $("#txt-Descript").val();
                var TravelId = $("#btn-travelupdate").attr("data-id");
                console.log(TravelId);
                UpdateTravelstrans(TravelId, Name, datefrom, dateto, desc);
            }
        });
    }
///// Update travel

    // view my travel  Delete
//    function Deletetravel(e) {
//    alert("click");
//       // var data = e.button.data();
//       // var id = data.id;
//        //DeleteTravel(id);
//    }
    function submittravel(e) {

        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {
                var tid = $("#btn-subm").attr("data-id");
                SubmitTravel(tid);
            }
        });
    }
//$("viewmytravel-layout").ready(function(){
//            $(".deleteTravel").click(function(){
//                                     alert("aldelete");
//                                     });
//            });
    //function viewTravelAfterShow(e) {

    //    //if(action=="Delete"){
    //    //    DeleteTravelll(TID);
    //    //    $("#t01 tbody").html("");
    //    //    //  alert("viewTravelAfterShow");
    //    //    getTravelTrans();
    //    //}else if(action=="Submit"){
    //    //    SubmitTravel(TID);
    //    //    $("#t01 tbody").html("");
    //    //    //  alert("viewTravelAfterShow");
    //    //    getTravelTrans();
    //    //}else{
    //        $("#t01 tbody").html("");
    //        //  alert("viewTravelAfterShow");
    //        getTravelTrans();
    //   // }

    //   // alert("yes");


    //}
// End of view my travel Delete

      //view  my Expense by date


    function viewexpensepulltorefresh(e) {



    }
    function initExpansedate(e) {
        var flag = localStorage.getItem("flag");
        $("#initexpenseflag").attr("src", flag);
        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {

                kendoMobileApp.pane.loader.show();
                var travelid = e.view.params.TID;
            //    alert(travelid);
                $("#btnadd").attr("href", "#uploadmyexpense-layout?TID=" + travelid);
                viewTravelById(travelid);
                getExpensebytravelid(travelid);
            }
        });
    }
// END view  my Expense by date

//delete expense
    function Deleteexpense(e) {
        checkConnectionCal(function (NetworkStat) {
            if (NetworkStat == "No network connection") {
                function alertDismissed() {

                }

                navigator.notification.alert(
                    'No network connection! First connect with your internet.', // message
                    alertDismissed, // callback
                    ' Connection error', // title
                    'Ok'                  // buttonName
                );
            }
            else {

                var expenseid = $("#deleteexpenses").attr(data - id);
                DeleteExpense(expenseid);
            }
        });
    }

// end Delete

//logout
    function LogoutFunction() {


}
//end logout

///Action Start
function viewActionShow(e)
{
   // action=Submit&ID='+results.rows.item(i).TravelId+'&Page=viewmytravel-layout
    var action=e.view.params.action;
    console.log(action);
    var id=e.view.params.ID;
    console.log(id);
    var Page = e.view.params.Page;
    console.log(Page);
    if(Page=="viewmytravel-layout"&& action=="Delete")
    {
        console.log("in Delete");
        DeleteTravelll(id);
    }
    else if (Page == "viewmytravel-layout" && action == "Submit") {
        console.log("in Submt");
        SubmitTravel(id);
        Page="#" + Page;
    }
    else if (Page == "viewExpensesOfTravelByDate" && action == "Delete") {
        console.log("Expense Delete");
        DeleteExpense(id);
        var tid=e.view.params.TID;
        Page = "#" + Page + "?TID=" + tid;
    }
//    else if(page=="" &&  action=""){}
//    else if(page=="" &&  action=""){}
    //    else if(page=="" &&  action=""){}
    console.log(Page);
    window.location = Page;

}
/// end Action Start

//pie chart home page
function piecharthomepage() {

    GetAllTravelByUserIdForHomePage();
}

//pie chart home page
function countryshow() {
    console.log("in");

    var userid = localStorage.getItem("UserId");
    selectcountry(userid);

}
