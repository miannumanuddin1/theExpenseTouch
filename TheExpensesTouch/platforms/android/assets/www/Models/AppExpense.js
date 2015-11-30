/// <reference path="../Scripts/jquery-2.1.3.js" />
/// <reference path="../Scripts/jquery-2.1.3.intellisense.js" />
/// <reference path="../js/kendo.all.min.js" />

/// <reference path="../Controller/Index.js" />
var ConnectionStatus;
function checkConnection() {
  }

function checkConnectionCall(callback) {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';

    //    getconstatus = states[networkState];
    callback(states[networkState]);
    //alert('Connection type: ' + states[networkState]);
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    var startTime = new Date().getTime();
    //  checkConnection();

     // document.addEventListener("backbutton", onBackKeyDown, false);
    var exitApp = false, intval = setInterval(function () { exitApp = false; }, 1000);
    document.addEventListener("backbutton", function (e) {

        e.preventDefault();
        if (exitApp) {

            clearInterval(intval);
            navigator.notification.confirm(
                'Are You Sure You Want To Exit ?', // message
                onConfirm, // callback to invoke with index of button pressed
                'The Expenses Touch', // title
                'CANCEL,OK'         // buttonLabels
            );
            //
        } else {
            exitApp = true;
            console.log(localStorage.getItem("UserId") != "");
            console.log("------------------------------");
            console.log(localStorage.getItem("UserId") != null);
            var hash = window.location.hash;
            console.log(hash);
            if (hash != "Login-home") {
                //    if (localStorage.getItem("UserId") != null) {
                //  exitApp = false;
                history.back(1);
            }
            //   }
        }
    }, false);



    document.addEventListener("menubutton", onMenuKeyDown, false);
    localStorage.removeItem("a");
    var pause = localStorage.getItem("a");

    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;   // alert(getconstatus);p
    checkConnectionCall(function (NetworkStatus) {
        if (NetworkStatus == "No network connection") {
            function alertDismissed() {

            }

            navigator.notification.alert(
                'No network connection! First connect with your internet.', // message
                alertDismissed, // callback
                ' Connection error', // title
                'Ok'                  // buttonName
            );

        }
    });

};

$("#Login-home").ready(function () {
    
    $("#EmailAddress").val(localStorage.getItem("e"));
    $("#Password").val(localStorage.getItem("p"));
    // $("#btnlogin").click(function () {
    $("#btnlogin").kendoButton({
        click: btnLoginClickEvent
        //   });
    });

});
function btnLoginClickEvent() {

    var username = $("#EmailAddress").val();
    var Password = $("#Password").val();
    console.log(username);
    console.log(Password);
    localStorage.setItem("e", username);
    localStorage.setItem("p", Password);
    //   alert("loginclick");
    if (username == "") {

        LoginError("Enter your email address.");
    }
    else if (Password == "") {

        LoginError("Enter your password.");
    }
    else {
        checkConnectionCall(function (NetworkStatus) {
            if (NetworkStatus == "No network connection") {
               // alert("no");
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
                //    $("#Loader").show();
                kendoMobileApp.pane.loader.show();
                getuser(username, Password);
            }
        });
    }
}
//Error Display for Login Page
function LoginError(Msg) {
    $("#Login-home .Error").html(Msg)
    //  $("#Login-home .Error").css("display", "block");
    // alert("error")
    // setTimeout(function () {

    $("#Login-home .Error").fadeIn(2000);
    $("#Login-home .Error").fadeOut(2000);

    // }, 4000);
}
//Error Display for Login Page ENd
function getuser(email, password) {

    $.ajax({
        type: "POST",
        // url: 'http://mosquemobile.intouchcommunicator.com/WebService.asmx/MobileAppGetSchoolUserByEmailAndPassword',
        //url: "http://projectxmobile.2bvision.com/webservice.asmx/MobileAppGetSchoolUserByEmailAndPassword",

        url: "https://theexpensestouch.com/ExpensesTouchMobile.asmx/GetLogin",
        data: "{'EmailId': '" + email + "','Password':'" + password + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //alert("succs");
            if (response.d != null && response.d != "") {
                var prods = response.d;
        //        $("#btnlogin").css("display", "block");
                //  $(".LoginFrieldsContainer #Loader").css("display", "none");
                kendoMobileApp.pane.loader.hide();
                // alert(lengt);
                var query = response.d;
                if (query != null && query != "") {

                    var userid = query[0].UserId;
                    // alert(userid);bna
                    localStorage.setItem("UserId", userid);

                    var countryid = query[0].CountryId.split(',');
               //    alert(countryid[0]);
                    localStorage.setItem("CountryId", countryid[0]);
                    selectcountry(userid);
                    var orgid = query[0].OrgId;
             //       alert(orgid);
                    localStorage.setItem("OrgId", orgid);

                    var email = query[0].Email;
                    // alert(email);
                    sessionStorage.setItem("UserEmail", email);
                    var name = query[0].UserName;
                    //   alert(name);
                    sessionStorage.setItem("UserName", name);
                    var currency = query[0].Currency;
                    //  alert(currency);
                    sessionStorage.setItem("UserCurrency", currency);

                    window.location.replace("#homelandingpage");
                   //window.location.replace("#Countrieslandingpage");

                 //   window.location.replace("#viewmytravel-layout");


                }
            }
            else {
                //alert("hides")
                kendoMobileApp.pane.loader.hide();
                // navigator.notification.alert("Wrong username and password", alertDismissed, 'The Expense Touch', 'OK');
                LoginError("Wrong username and password.");
                $("#btnlogin").css("display", "block");

            }

        }

    });


}

function getTodaydate() {
    var today = new Date().toISOString().split('T')[0];
    return today;
   // return month + "," + day + "," + year;
   // return day + "-" + month + "-" + year;
}


$("#PrepareMyTravels-layout").ready(function () {

     // $("#datepicker").attr("min",getTodaydate());
     // $("#datepickerto").attr("min", getTodaydate());
      $("#datepicker").change(function () {
          var date = $(this).val();
         // alert(date);
          //var dsplit = date.split(",");
          //console.log(dsplit);
          //var d = new Date(dsplit[0], dsplit[1] - 1, dsplit[2]);
          //console.log(d);
          //var de= d.toISOString().split('T')[0];
          //console.log(de)
          $("#datepickerto").attr("min", date);

      });

        //$("#datepicker").attr("type", "date");
        //$("#datepickerto").attr("type", "date");

        $("#btnsave").click(function () {

          //  checkConnection();
            checkConnectionCall(function (NetworkStatus) {
                //   alert(NetworkStatus);
                if (NetworkStatus == "No network connection") {
                    function alertDismissed() {

                    }

                    navigator.notification.alert(
                        'No network connection! First connect with your internet.', // message
                        alertDismissed, // callback
                        ' Connection error',  // title
                          'Ok'                  // buttonName
                    );
                }
                else {
                    //        document.getElementById("btnsave").className += "";
                    //  $("#btnsave").css("display", "none"); //= true; //   alert("click");
                    var travelname = $("#TravelName").val();
                    var datefrom = $("#datepicker").val();
                    //var objdatefrom = new Date(datefrom).getMonth() + '/' + new Date(datefrom).getDate() + "/"  +new Date(datefrom).getFullYear();
                    var dateto = $("#datepickerto").val();
                    //var objdateto =new Date(dateto).getMonth() + '/' + new Date(dateto).getDate() + "/" + new Date(dateto).getFullYear();
                    var descriptions = $("#Description").val();
                    //   alert(dateto);

                    document.getElementById("TravelName").style.backgroundColor = "";
                    document.getElementById("datepicker").style.backgroundColor = "";
                    document.getElementById("datepickerto").style.backgroundColor = "";
                    document.getElementById("Description").style.backgroundColor = "";
                    if (travelname == "") {
                        document.getElementById("TravelName").style.backgroundColor = "red";
                        //$("#TravelName").css("background-color", "red");
                    } else if (datefrom == "") {
                        document.getElementById("datepicker").style.backgroundColor = "red";
                        //$("#datepicker").css("background-color", "red");
                    } else if (dateto == "") {
                        document.getElementById("datepickerto").style.backgroundColor = "red";
                        //$("#datepickerto").css("background-color", "red");
                    } else if (descriptions == "") {
                        document.getElementById("Description").style.backgroundColor = "red";
                        //$("#Description").css("background-color", "red");
                    }
                    else {
                        document.getElementById("btnsave").disable = true;
                        $(this).addClass("disable");

                        insertTravelstrans(travelname, datefrom, dateto, descriptions);
                    }


                }
            });
        });
    });
    function insertTravelstrans(travelname, datefrom, dateto, descriptions) {
        $("#TravelName").val('');
        $("#datepicker").val('');
        $("#datepickerto").val('');
        $("#Description").val('');
        // console.log(window.localStorage["UserId"]);
        var userid = window.localStorage["UserId"];
        console.log(window.localStorage["CountryId"]);
        var countryid = window.localStorage["CountryId"];

        $.get("https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/InsertTravel?TravelName=" + travelname + "&DateFrom=" + datefrom + "&DateTo=" + dateto + "&Description=" + descriptions + "&UserId=" + userid + "&CountryId=" + countryid, function (response, status) {
            // document.getElementById('btnsave').classList.remove('k-state-disabled');

            // alert(lengt);

        }, "json").always(function() {
            $("#btnsave").removeClass("disable");
            document.getElementById("btnsave").disable = false;
           // alert("save");

            //  document.getElementById("btnsave").className += "";
            //        document.getElementById("btnsave").className =
            //document.getElementById(".km-android .km-button").className.replace
            //    (/(?:^|\s)MyClass(?!\S)/g, '')
            // $("#btnsave").css("display", "block");
            // console.log(data);
            navigator.notification.alert("Successfully Inserted", alertDismissed, 'The Expense Touch', 'OK');
            $("#TravelName").val('');
            $("#datepicker").val('');
            $("#datepickerto").val('');
            $("#Description").val('');
            //  alert("view");
            //  window.location = "#viewmytravel-layout";
            window.location.replace("#viewmytravel-layout");
        });
            ;
        //$.ajax({
        //    type: "GET",

        //    //url: "http://theexpensestouch.com/ExpensesTouchMobile.asmx/InsertTravel",
        //    //  url: "http://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/InsertTravel",
        //    url: "http://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/InsertTravel?TravelName=" + travelname + "&DateFrom=" + datefrom + "&DateTo=" + dateto + "&Description=" + descriptions + "&userId=" + userid + "&countryid=" + countryid,
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    success: function (response) {


        //    },
        //    failure: function (errMsg) {
        //        //   $("#btnsave").css("display", "block");
        //        alert("Failure Contacts.");

        //    }

        //});
    }
    //function initPull(e) {
    //    kendoMobileApp.pane.loader.show();
    //    getTravelTrans();

    //}
    function viewTravelAfterShow(e) {
      //  alert("viewTravelShow");
        var flag = localStorage.getItem("flag");
        $("#viewtravelflag").attr("src", flag);
        checkConnectionCall(function (NetworkStatus) {
         //   alert(NetworkStatus);
            if (NetworkStatus == "No network connection") {
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
                //if(action=="Delete"){
                //    DeleteTravelll(TID);
                //    $("#t01 tbody").html("");
                //    //  alert("viewTravelAfterShow");
                //    getTravelTrans();
                //}else if(action=="Submit"){
                //    SubmitTravel(TID);
                //    $("#t01 tbody").html("");
                //    //  alert("viewTravelAfterShow");
                //    getTravelTrans();
                //}else{
              //  $("#t01 tbody").html("");
                //  alert("viewTravelAfterShow");
                getTravelTrans();
                // }

                // alert("yes");


            }
        });
    }
    function initPullToRefreshScroller(e) {
        //getTravelTrans();

        //var scroller = e.view.scroller;

        //scroller.setOptions({
        //    pullToRefresh: true,
        //    pull: function() {
        //        SyncFn();
        //        $("#t01 tbody").html("");
        //        //  alert("viewTravelAfterShow");
        //        getTravelTrans();
        //   setTimeout(function() { scroller.pullHandled(); }, 2000);
        //    }
        //})
    }
    function getTravelTrans() {



        console.log(window.localStorage["UserId"]);
        console.log(window.localStorage["CountryId"]);
            $.ajax({
                type: "POST",
                // url: "http://theexpensestouch.com/ExpensesTouchMobile.asmx/GetAllTravelByUserId",
                url: "https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/GetAllTravelByUserId",
                data: "{'UserId': " + window.localStorage["UserId"] + ",'CountryId':"+window.localStorage["CountryId"]+"}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    $("#travelrep").html('');
                    console.log(response.d);
                    kendoMobileApp.pane.loader.hide();

                    if (response.d != null && response.d != "") {

                        var prods = response.d;

                        for (var i = 0; i < prods.length; i++) {
                            var htm = $("#travelrepeat").clone().html();
                            htm = htm.replace("{{travelName}}",prods[i].Name )
                                .replace("{{datefrom}}", getJsonDate(prods[i].DateFrom))
                                .replace("{{dateto}}", getJsonDate(prods[i].DateTo))
                                .replace("{{desc}}", prods[i].Description)
                                .replace("{{tid}}", prods[i].TravelId);
                            $("#travelrep").append(htm);
                        }
                    }
                }
            });
}

    function getJsonDate(date) {
        if (date == null) {
            return date;
        }
        else {
            //var d = new Date(date);
            //var d = new Date(parseInt(jsonDate.substr(date)));

            var d = date.replace(/\/Date\((-?\d+)\)\//, '$1');
            d = new Date(parseInt(d)).format("yyyy-mm-dd");
            return d;

        }
    }
    function alertDismissed() {
        // do something
    }
    function insertExpensetransaction(travelid, date, description, amount, expensetypeid, currencytype, fileUri)
    {
      
        kendoMobileApp.pane.loader.show();
       
        //var data = '{"travelId":'+travelid+',"Date":'+date+',"Description":'+description+',"amount":'+amount+',"expensetypeid":'+expensetypeid+',"currencytype":'+currencytype+',"img":'+img+'}';
        //console.log(data);
        var data1 = {
            travelId: travelid,
            Date: date,
            Description: description,
            amount: amount,
            expensetypeid: expensetypeid,
            currencytype: currencytype,
            img: fileUri,
            UserId: window.localStorage["UserId"]
        };
        console.log(data1);
      
        console.log(window.localStorage["UserId"]);

        $.post("http://theexpensestouch.com/ExpensesTouchMobile.asmx/InsertExpenses", data1, function (data, status) {
            //  console.log("Data: " + jQuery.parseJSON(data) + "\nStatus: " + status);
            kendoMobileApp.pane.loader.hide();

            if (status == "success") {
                var travelid = localStorage.getItem("TravelIdForRedirection");
                $("#date").val('');
                $("#txtDescription").val('');
                $("#amount").val('');
                $("#ddlExpenseType").val('');
                $("#ddlCurrency").val('');
                $("#image").attr('src', '');
                navigator.notification.alert("Expense Submited Successfully...", alertDismissed, 'Expense', 'Done');
                window.location = "#viewExpensesOfTravelByDate?TID=" + travelid;

            }
        }
    );
    }
    function viewTravelById(id) {
        //var data = {
        //    TravelId: id
        //};
        //console.log(data);
        //$.ajax({

        //    type: "GET", //Personally i prefer using post, you can swap this to get if you want.
        //    url: "http://theexpensestouch.com/ExpensesTouchMobile.asmx/GetExpensesAmountByTravelId?TravelId="+id,
        //    dataType: "json", //Note the dataType has been changed from default here.
        //    error: function (error) {
        //        console.log(error);  //You can do a fallback here
        //    },
        //    success: function (data) { //Note the data variable here. This is your returned data
        //         //I also swapped .attr to .val below
        //        console.log(data);
        //   var result = JSON.parse(data);
        $.get("https://theexpensestouch.com/ExpensesTouchMobile.asmx/GetExpensesAmountByTravelId?TravelId=" + id, function (response, status) {
            console.log(response);
            console.log(response[0].Amount);
            var lengt = response.length;
            // console.log(results.rows.item);
            $(".travelofexpense").html("");
            if (lengt > 0) {
                var html = $("#travelview").clone().html();
                //console.log(results);
                html = html.replace("{{Name}}", response[0].Name)
                           .replace("{{todate}}", getJsonDate(response[0].DateTo))
                           .replace("{{datefrom}}", getJsonDate(response[0].DateFrom))
                           .replace("{{amount}}", response[0].Amount + " " + response[0].Currency)
                           .replace("{{descr}}", response[0].Description);

                $(".travelofexpense").append(html);
                console.log(html);
            }

        }, "json");



        //$.get("http://theexpensestouch.com/ExpensesTouchMobile.asmx/GetTravelbyTravelId?TravelId="+id, function (data, status) {

        //    console.log("Data: " + data.d + "\nStatus: " + status);
        //},"json");
    }
    function getJsonDate(date) {
        if (date == null) {
            return date;
        }
        else {
            //var d = new Date(date);
            //var d = new Date(parseInt(jsonDate.substr(date)));

            var d = date.replace(/\/Date\((-?\d+)\)\//, '$1');
            d = new Date(parseInt(d)).format("yyyy-mm-dd")
            return d;

        }
    }
    function edittravelexpens(expenseid) {


        $.get("https://theexpensestouch.com/ExpensesTouchMobile.asmx/GetExpensesByExpensesId?ExpensesId=" + expenseid, function (response, status) {
            console.log(response);// +
            var expenseid = response.ExpenseId;
            var description = response.Description;
            var amount = response.Amount;
            var currency = response.CurencyType;
            var travelid = response.TravelId;
            var expensetypeid = response.ExpenseTypeId;
            var date = response.Date;
            console.log(expenseid);
            console.log(description);
            console.log(amount);
            console.log(currency);
            console.log(travelid);
            console.log(expensetypeid);
            console.log(getDateOnly(date));
            $("#ddlTravel").val(travelid);
            $("#txtdate").val(getDateOnly(date));
            $("#txtDesc").val(description);
            $("#txtamount").val(amount);
            $("#ddlExpense").val(expensetypeid);
            $("#ddlCur").val(currency);
            $("#btn-cancel").attr("href", "#viewExpensesOfTravelByDate?TID=" + travelid);
            $("#btn-update").attr("data-id", expenseid);
            window.sessionStorage.setItem("from", "Edit");
            //  localStorage.setItem('from', 'Edit');

        }, "json");

    }
    function getExpensebytravelid(tid)
    {
        var data = {
            TravelId: tid
        };
        console.log(data);
        $.get("https://theexpensestouch.com/ExpensesTouchMobile.asmx/GetExpensesByTravelId?TravelId=" + tid, function (response, status)
        {
            kendoMobileApp.pane.loader.hide();
            console.log(response);// +
            //  console.log("\nStatus: " + status);
            // var result = JSON.parse(response);

            //alert("GetExpensesByTravelId");
            if(status == "success")
                var lengt = response.length;
            console.log(lengt);

            console.log(response);


            $("#expensescontainer").empty();
            if (lengt > 0) {

                for (i = 0; i < lengt; i++) {
                    var html = $("#expense").clone().html();

                    html = html.replace("{{expensetype}}", response[i].ExpenseName)
                               .replace("{{date}}", getJsonDate(response[i].uex.Date))
                               .replace("{{amount}}", response[i].uex.Amount)
                               .replace("{{currency}}", response[i].uex.CurencyType)
                               .replace("{{view}}", response[i].uex.ExpenseId)
                               .replace("{{delete}}", response[i].uex.ExpenseId)
                               .replace("{{edit}}", response[i].uex.ExpenseId)
                               .replace("{{TID}}", response[i].uex.TravelId)
                    .replace("{{TID}}", response[i].uex.TravelId);

                    console.log("[" + response[i].uex.ExpenseDocument + "]");
                    console.log(response[i].uex.ExpenseDocument != null);
                    console.log(response[i].uex.ExpenseDocument != '');
                    if (response[i].uex.ExpenseDocument != null && response[i].uex.ExpenseDocument != '') {
                        html = html.replace("{{display}}", "display:block;")
                                 .replace("{{src}}", response[i].uex.ExpenseDocument.replace("~", "http://theexpensestouch.com"));
                    } else {
                        html = html.replace("{{display}}", "display:none;")
                                   .replace("{{src}}", "null");
                    }
                    $("#expensescontainer").append(html);
                }
            }
        }, "json");
    }
    function getTravelByUserId(usid)
    {

        $.get("https://theexpensestouch.com/ExpensesTouchMobile.asmx/GetTravelbyTravelId?TravelId=" + usid, function (response, status)
        {
            console.log(response.TravelId);
            $("#ddlTravelName").html('');
            if(status == "success")
            {

                var html = $("#ETravel").clone().html();
                html = html.replace("{{id}}", response.TravelId)
                                     .replace("{{Name}}", response.Name);
                $("#ddlTravelName").append(html);
                $("#date").attr("min", getJsonDate(response.DateFrom));
                $("#date").attr("max", getJsonDate(response.DateTo));

            }


        }, "json");

    }
    function EgetTravelByUserId(usid) {

        $.get("https://theexpensestouch.com/ExpensesTouchMobile.asmx/GetTravelbyTravelId?TravelId=" + usid, function (response, status) {
            console.log(response.TravelId);
            $("#ddlTravel").html('');
            if (status == "success") {

                var html = $("#ETravel").clone().html();
                html = html.replace("{{id}}", response.TravelId)
                                     .replace("{{Name}}", response.Name);
                $("#ddlTravel").append(html);
                $("#txtdate").attr("min", getJsonDate(response.DateFrom));
                $("#txtdate").attr("max", getJsonDate(response.DateTo));
            }


        }, "json");
    }
    //function EgetTravelByUserId(usid) {

    //    $.ajax({
    //        type: "POST",
    //        url: "http://theexpensestouch.com/ExpensesTouchMobile.asmx/GetAllTravelByUserId",
    //        data: "{'UserId': '" + window.localStorage["UserId"] + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (response) {
    //            // alert("succs");
    //            $("#ddlTravel").html('');
    //         //   kendoMobileApp.pane.loader.hide();
    //            if (response.d != null && response.d != "") {

    //                var prods = response.d;

    //                for (var i = 0; i < prods.length; i++) {


    //                            var html = $("#ETravel").clone().html();
    //                            html = html.replace("{{id}}", prods[i].TravelId)
    //                                       .replace("{{Name}}", prods[i].Name);
    //                            $("#ddlTravel").append(html);

    //                    }


    //                }
    //            }

    //    });

    //    $.get("http://theexpensestouch.com/ExpensesTouchMobile.asmx/GetTravelbyTravelId?TravelId=" + usid, function (response, status) {
    //        console.log(response.TravelId);

    //        if (status == "success") {

    //            var html = $("#ETravel").clone().html();
    //            html = html.replace("{{id}}", response.TravelId)
    //                                 .replace("{{Name}}", response.Name);
    //            $("#ddlTravel").append(html);
    //        }


    //    }, "json");
    //}

    function getExpenseType() {
        var orgid = localStorage.getItem("OrgId");
        var countryid = localStorage.getItem("CountryId");
        $.get("https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/GetAllExpenseTypes?OrgId=" + orgid + "&CountryId=" + countryid, function (response, status) {
            console.log(response[0].CommentsRequired);
            console.log(response[0].ExpenseName);
            console.log(response[0].ExpenseTypeId);
            console.log(response);// +
            //  console.log("\nStatus: " + status);
            // var result = JSON.parse(response);

            //alert("GetExpensesByTravelId");
           $("#ddlExpenseType").html('');
            if (status == "success")
                //   var lengt = response.length;
                //   console.log(lengt);
             //   alert("success");
            var lengt = response.length;
            console.log(lengt);
            if (lengt > 0) {

                for ( var i = 0; i < lengt; i++) {
                    var html = $("#ssExpensetypeoption").clone().html();
                    html = html.replace("{{id}}", response[i].ExpenseTypeId)
                               .replace("{{Name}}", response[i].ExpenseName)
                               .replace("{{CommentRequired}}", response[i].CommentsRequired);

                    $("#ddlExpenseType").append(html);
                }
            }
        }, "json"
        );
    }

    function EgetExpenseType() {
        var orgid = localStorage.getItem("OrgId");
        var countryid = localStorage.getItem("CountryId");
        $.get("https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/GetAllExpenseTypes?OrgId=" + orgid + "&CountryId=" + countryid, function (response, status)
        {
            console.log(response);
            $("#ddlExpense").html('');
            if(status == "success") {

                var lengt = response.length;

                if (lengt > 0) {
                    for (i = 0; i < lengt; i++) {
                        //   alert(response[i].ExpenseName);
                        var html = $("#Expenses").clone().html();
                        html = html.replace("{{id}}", response[i].ExpenseTypeId)
                                   .replace("{{Name}}", response[i].ExpenseName)
                                   .replace("{{CommentRequired}}", response[i].CommentsRequired);

                        $("#ddlExpense").append(html);
                    }
                }
            }
        },"json");
    }
    function edittravelexpens(expenseid) {
        $.get("https://theexpensestouch.com/ExpensesTouchMobile.asmx/GetExpensesByExpensesId?ExpensesId=" + expenseid, function (response, status) {
            console.log(response);
            //  $('#btn-update').css("display","block");
            if (status == "success") {

                var expenseid = response[0].ExpenseId;
                var description = response[0].Description;
                var amount = response[0].Amount;
                var currency = response[0].CurencyType;
                var travelid = response[0].TravelId;
                var expensetypeid = response[0].ExpenseTypeId;
                var date = response[0].Date;
                console.log(expenseid);
                console.log(description);
                console.log(amount);
                console.log(currency);
                console.log(travelid);
                console.log(expensetypeid);
                console.log(getJsonDate(date));
                $("#ddlTravel").val(travelid);
               $("#txtdate").val(getJsonDate(date));
                $("#txtDesc").val(description);
                $("#txtamount").val(amount);
                $("#ddlExpense").val(expensetypeid);
                $("#ddlCur").val(currency);
                $("#btn-cancel").attr("href", "#viewExpensesOfTravelByDate?TID=" + travelid);
                $("#btn-update").attr("data-id", expenseid);


            }

        },"json");

    }
    function UpadateExpensetransaction(expenseid, travelid, date, descr, amount, expenseTypeid, currency, image) {
     //   document.getElementById("btn-update").style.pointerEvents = "none";
        kendoMobileApp.pane.loader.show();
        // !! Assumes variable fileURI contains a valid URI to a text file on the device
       // app.pane.loader.show();
        //var data = '{"travelId":'+travelid+',"Date":'+date+',"Description":'+description+',"amount":'+amount+',"expensetypeid":'+expensetypeid+',"currencytype":'+currencytype+',"img":'+img+'}';
        //console.log(data);
        var data1 = {
            travelId: travelid,
            Date: date,
            Description: descr,
            amount: amount,
            expensetypeid: expenseTypeid,
            currencytype: currency,
            img: image,
            UserId: window.localStorage["UserId"]
        };
        console.log(data1);
       
        console.log(window.localStorage["UserId"]);

        $.post("http://theexpensestouch.com/ExpensesTouchMobile.asmx/InsertExpenses", data1, function (data, status) {
            //  console.log("Data: " + jQuery.parseJSON(data) + "\nStatus: " + status);
            kendoMobileApp.pane.loader.hide();

            if (status == "success") {
                var travelid = localStorage.getItem("TravelIdForRedirection");
                $("#date").val('');
                $("#txtDescription").val('');
                $("#amount").val('');
                $("#ddlExpenseType").val('');
                $("#ddlCurrency").val('');
                $("#image").attr('src', '');
                navigator.notification.alert("Expense Submited Successfully...", alertDismissed, 'Expense', 'Done');
                window.location = "#viewExpensesOfTravelByDate?TID=" + travelid;

            }
        }
    );
    }
    function initMySubmission(e) {
        // alert("initMySubmission")
        var flag = localStorage.getItem("flag");
        $("#initmysubmission").attr("src", flag);

        checkConnectionCall(function (NetworkStatus) {
            if (NetworkStatus == "No network connection") {
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

                $("#travel_status_ tbody").html("");

                kendoMobileApp.pane.loader.show();
                GetAllTravelByUserIdS();
            }
            });
        }

// function mysubmissionpulltorefresh(e) {


    //    //var scroller = e.view.scroller;

    //    //scroller.setOptions({
    //    //    pullToRefresh: true,
    //    //    pull: function () {
    //    //        SyncFn();
    //    //        $("#t02 tbody").html("");
    //    GetAllTravelByUserIdS();
    //    //        setTimeout(function () { scroller.pullHandled(); }, 2000);
    //    //    }
    //    //})
    //}
    function mysubmissionpulltorefresh(e) {

        checkConnectionCall(function (NetworkStatus) {
            if (NetworkStatus == "No network connection") {
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
                //var scroller = e.view.scroller;

                //scroller.setOptions({
                //    pullToRefresh: true,
                //    pull: function () {
                //        SyncFn();
                //        $("#t02 tbody").html("");
                GetAllTravelByUserIdS();
                //        setTimeout(function () { scroller.pullHandled(); }, 2000);
                //    }
                //})
            }
        });

    }
    function GetAllTravelByUserIdS() {
        var userid = window.localStorage["UserId"];
        var countryid = window.localStorage["CountryId"];
        var url="https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/Getsubmitedextravel?UserId=" + userid + "&CountryId=" + countryid;
        //var data = {
        //    TravelId: tid
        //};
        //alert(data);
        // $.get("http://theexpensestouch.com/ExpensesTouchMobile.asmx/Getsubmitedextravel?UserId=" + userid + "&CountryId" +countryid, function (response, status) {

       $.get("https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/Getsubmitedextravel?UserId=" + userid + "&CountryId=" + countryid, function (response, status) {
            console.log(response);// +
            //  console.log("\nStatus: " + status);
            // var result = JSON.parse(response);
            kendoMobileApp.pane.loader.hide();
            //alert("GetExpensesByTravelId");
            if (status == "success") {

                var lengt = response.length;
                //$("#t02").find("tbody").html('');
                $("#travel_status_").find("tbody").html('');
                if (lengt > 0) {

                    for (i = 0; i < lengt; i++) {
                        var newrow = '<tr><td>' + response[i].Name + '</td>';
                        newrow += '<td>' + getJsonDate(response[i].StatusDate) + '</td>';
                        if (response[i].Status.substring(0, 3) == "Sub") {
                            newrow += '<td class="t_status s_pending">' + response[i].Status.substring(0, 3) + '</td>';
                        }
                        if (response[i].Status.substring(0, 3) == "App") {
                            newrow += '<td class="t_status s_approved">' + response[i].Status.substring(0, 3) + '</td>';
                        }
                        if (response[i].Status.substring(0, 3) == "Rej") {
                            newrow += '<td class="t_status s_rejected">' + response[i].Status.substring(0, 3) + '</td>';
                        }
                        ///    newrow += '<td> <a data-id=' + results.rows.item(i).Travelid + ' class="travelbuttons" href="#SubmissionExpensesOFTravel-layout?TID=' + results.rows.item(i).TravelId + '">View</a> </td></tr>';
                        newrow += '<td>' + (response[i].Amount).toFixed(2) + '</td>';
                        $("#travel_status_").find("tbody").append(newrow);
                    }
                }
            }
        }, "json");
    }
    /// extra function for keys
    function onMenuKeyDown() {

        //if ($("#Home-layout").css("display") == "none") {
        //    if ($("#Login-home").css("display") != "none") {
        //        return false;
        //    }
        //    else {
        //        window.location = "#Home-layout";
        //    }
        //}

    }

    function onConfirm(buttonIndex) {
        if (buttonIndex == 2) {
            (navigator.app && navigator.app.exitApp()) || (device && device.exitApp());
        }
    }


    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
    function ChoosePhoto(e) {
        console.log("gggg");
        getPhoto(pictureSource.PHOTOLIBRARY);
    }
    function getPhoto(source) {
   //     var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
    //    var options = { quality: 20, targetWidth: 500, targetHeight: 500, correctOrientation: true, destinationType: Camera.DestinationType.DATA_URL, sourceType: Camera.PictureSourceType.PHOTOLIBRARY, popoverOptions: popover };

      //  navigator.camera.getPicture(onPhotoDataSuccess, onFail, options);

        //   navigator.camera.getPicture(onPhotoURISuccess, onFail, options);
        console.log("photo upload");
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 60,
            // destinationType: Camera.DestinationType.DATA_URL,
            destinationType: destinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            mediaType: Camera.MediaType.ALLMEDIA,
            targetWidth: 800,
            targetHeight: 800,
            encodingType: Camera.EncodingType.PNG,
            correctOrientation: false
          });

    }
    function onPhotoDataSuccess(base64Img) {
        // Uncomment to view the base64-encoded image data
        //  console.log(base64Img);

        // Get image handle
        //
        console.log(base64Img);
        var cameraImage;

        var edit = window.sessionStorage["from"];//, "Edit")
      //  alert(edit);
        if (edit === "Edit")
         cameraImage = document.getElementById('Img');
        else
        cameraImage = document.getElementById('image');
         window.sessionStorage.removeItem("from");




        //    alert("in");

        //   // window.localStorage.removedItems(
        //    sessionStorage.removeItem("from");
        //}



        // Unhide image elements
        //
            cameraImage.style.display = 'block';
        //    cameraImageEdit.style.display = 'block';
        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
            cameraImage.src =  base64Img;
          //  cameraImageEdit.src = "data:image/png;base64," + base64Img;
        //localStorage.setItem("base64Image", base64Img);
        // Base64DataURL

        // Show the captured photo
        // The in-line CSS rules are used to resize the image
        //
        // smallImage.src = "data:image/png;base64," + imageData;
    }

    function convertImgToBase64URL(url, callback, outputFormat) {
        //    var img = new Image();
        //    img.crossOrigin = 'Anonymous';
        //    img.onload = function () {
        //    var canvas = document.createElement('CANVAS'),
        //    ctx = canvas.getContext('2d'), dataURL;
        //    canvas.height = this.height;
        //    canvas.width = this.width;
        //    ctx.drawImage(img, 0, 0, img.width, img.height);
        //    console.log((0.5*parseInt(img.height)),(0.5*parseInt(img.height)));
        //    ctx.scale(300/this.width, 300/this.height);
        //    dataURL = canvas.toDataURL(outputFormat);

        //    callback(dataURL);
        //    canvas = null;
        //};
        console.log(url);
        var MAX_HEIGHT = 400;
        var image = new Image();
        image.onload = function () {
            var canvas = document.createElement('CANVAS');
            if (image.height > MAX_HEIGHT) {
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);

        };
        image.src = url;
    }
    function onPhotoURISuccess(imageURI) {
        // Uncomment to view the base64-encoded image data
        //  alert("success");
        console.log(imageURI);
       
        convertImgToBase64URL(imageURI, function (base64Img) {
        //    console.log(base64Img);
            var cameraImage;

            var edit = window.sessionStorage["from"];//, "Edit")
            //  alert(edit);
            if (edit === "Edit")
                cameraImage = document.getElementById('Img');
            else
                cameraImage = document.getElementById('image');
            window.sessionStorage.removeItem("from");
               cameraImage.style.display = 'block';
            
            cameraImage.src = base64Img;
            //  cameraImageEdit.src = "data:image/png;base64," + base64Img;

        });
        //} else {
        //    alert("Image should not be greater than 8 mb");
        //}
        //var cameraImage = document.getElementById('image');
        // Unhide image elements
        //
        //   cameraImage.style.display = 'block';
        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //
        // cameraImage.src = imageURI;
    }
    function onFail(evt) {
        console.log(evt.target.error.code);
    }
    function GetAllTravelByUserIdForHomePage() {
        kendoMobileApp.pane.loader.show();
        var userid = window.localStorage["UserId"];
        $.get("https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/GetPendingApprovals?UserId=" + userid + "&countryid=" + window.localStorage["CountryId"], function (response, status) {
            kendoMobileApp.pane.loader.hide();
            console.log(response);
            var lengt = response.length;
            response = JSON.parse(response);
            // alert("lentth " + lengt);
            var flag = localStorage.getItem("flag");
            $("#flag").attr("src", flag);
            var pending = 0, approved = 0, submitted = 0, rejected = 0;
            if (lengt > 0) {

                pending = response.Pending;
                approved = response.Approved;
                submitted = response.Submitted;
                rejected = response.Rejected;
                drawpaichart(pending, approved, submitted, rejected);


                $("#lblsubmit").html("Submitted Travel&nbsp;&nbsp;&nbsp;" + response.Submittedpercentage);
                $("#lblapproved").html("Approved Travel&nbsp;&nbsp;&nbsp;&nbsp;" + response.Approvedpercentage);
                $("#lblreject").html("Rejected Travel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + response.Rejectedpercentage);
                $("#lblpendng").html("Pending Travel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + response.Pendingpercentage);

            }
        });
    }
    function drawpaichart(pending, approved, submitted, rejected) {
        var ctx = document.getElementById("myChart").getContext("2d");
        var data = [
             {
                 value: approved,
                 color: "#356BAC;",
                 highlight: "#356BAC;",
                 label: "Approved"
             },
             {
                 value: rejected,
                 color: "#B73734",
                 highlight: "#B73734",
                 label: "Rejected"
             },
             {
                 value: pending,
                 color: "#88AC40",
                 highlight: "#88AC40",
                 label: "Pending"
             }
        ];

        var options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke: true,

            //String - The colour of each segment stroke
            segmentStrokeColor: "#fff",

            //Number - The width of each segment stroke
            segmentStrokeWidth: 2,

            //Number - The percentage of the chart that we cut out of the middle
            //   percentageInnerCutout: 50, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps: 100,

            //String - Animation easing effect
            animationEasing: "easeOutBounce",

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate: true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale: false,

           //String - A legend template
            //   legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

        };
        var myPieChart = new Chart(ctx).Pie(data, options);
    }
// country loading page

    function selectcountry(userid) {
        console.log(userid);
        $.get("https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/GetAllCountryImagesByUserId?UserId=" + userid, function (response, status) {
           // alert(status);
           console.log("test");
           $(".top-grid1").html('');
            var countryid = localStorage.getItem("CountryId");
            for (var i = 0;i < response.length;i++) {
             var html = '<div class="flag_img"><img class="Selectcountry flag__"   data-id=' + response[i].id + ' src=" ' + response[i].url + '" /><h2>' + response[i].name + '</h2>';
                $(".top-grid1").append(html);

                if (parseInt(countryid) == parseInt(response[i].id)) {
                  //  alert(response[i].url);
                    localStorage.setItem("flag", response[i].url);
                }
            }
               // alert(Kewords[0].Flag_Image);
               // var htm = ' <div><img src="http://theexpensestouch.com/images/as.gif" /></div>  ';

        }, "json");
    }
// end country loading page

    function CurrencyList() {
        var orgid = localStorage.getItem("OrgId");
        var countryid = localStorage.getItem("CountryId");
        $.get("https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/GetAllNewCurrency?OrgId="+orgid+"&Countryid="+countryid, function (response, status) {
//            debugger;
            console.log(response, status);
            if (status == "success") {
                var array = JSON.parse(response);
                $("#ddlCurrency").html('');
                for (var i = 0; i < array.length; i++) {
                    $("#ddlCurrency").append('<option value="' + array[i].Cur.replace(/ *\([^)]*\) */g, "") + '" >' + array[i].Cur.replace(/ *\([^)]*\) */g, "") + '</option>');
                }
               $("#ddlCurrency").val("USD");
            }
        });
    }
    function EditCurrencyList() {
        var orgid = localStorage.getItem("OrgId");
        var countryid = localStorage.getItem("CountryId");
        $.get("https://theexpensestouch.com/NewExpenseCountry_Orgwise.asmx/GetAllNewCurrency?OrgId=" + orgid + "&Countryid=" + countryid, function (response, status) {
//            debugm ,ger;
            console.log(response, status);
            if (status == "success") {
                var array = JSON.parse(response);
                $("#ddlCur").html('');
                for (var i = 0; i < array.length; i++) {
                    $("#ddlCur").append('<option value="' + array[i].Cur.replace(/ *\([^)]*\) */g, "") +'" >' + array[i].Cur.replace(/ *\([^)]*\) */g, "") + '</option>');
                }

            }
        });
    }
