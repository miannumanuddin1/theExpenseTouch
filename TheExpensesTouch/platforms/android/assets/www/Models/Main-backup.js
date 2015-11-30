/// <reference path="../Scripts/jquery-2.1.3.js" />

var db;
var tx;
//var kendoMobileApp = new kendo.mobile.Application(document.body);
//
//$(document).ready(function () {
//                  
//                 
//                  $("#txtEmail").val(localStorage.getItem("e"));
//                  $("#txtPassword").val(localStorage.getItem("p"));
//                  $(".LoginContainer").on("click", "#btnlogin", function () {
//                                          //alert("click");
//                                          var email = $("#txtEmail").val();
//                                          var password = $("#txtPassword").val();
//                                          
//                                          localStorage.setItem("e", email);
//                                          localStorage.setItem("p", password);
//                                          getuser(email, password)
//                                          // kendoMobileApp.navigate("users/Expense.html");
//                                          //kendoMobileApp.navigate("users/Expense.html");
//                                   //       window.location.href="users/Expense.html";
//                                          
//                                          });
//                  
//                  });

function updatelastsync() {
    db.transaction(function (txt) { updatesync(txt) }, errorHandler, successCB);
}
function updatesync(txt) {
    var d = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate() + " " + new Date().getHours + ":" + new Date().getMonth + ":" + new Date().getSeconds;
    console.log(d);
    var updatequery = "UPDATE Sync SET LastSync=?, WHERE id=?";
    txt.executeSql(updatequery, [d,1], SyncUpdateSucess, errorHandler);
}
function SyncUpdateSucess(txt,results) {
    console.log(results);
    if (results.rows.rowsAffected > 0) {
        console.log("last Sync time updates");
    }
}

function InsertExchangeRateForSync(CurrencyTypeId, CurrencyCode, USD, GBP, EUR, CHF, JPY, CNY, BHD, RUB, DKK, AUD, SEK, HKD, KRW, MXN, SGD, AED, ZAR, ARS, LastModified, Deleted, GUID) {

    db.transaction(function (txt) {
        var syncstat = "INSERT INTO ExchangeRate (CurrencyTypeId,CurrencyCode,USD,GBP,EUR,CHF,JPY,CNY,BHD,RUB,DKK,AUD,SEK,HKD,KRW,MXN,SGD,AED,ZAR,ARS,LastModified,Deleted,GUID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        txt.executeSql(syncstat, [CurrencyTypeId, CurrencyCode, USD, GBP, EUR, CHF, JPY, CNY, BHD, RUB, DKK, AUD, SEK, HKD, KRW, MXN, SGD, AED, ZAR, ARS, LastModified, Deleted, GUID], function (txt, results) {
            if (results.rowsAffected == 1) {
                console.log("ExchangbeRates Sync Record Inserted");
            }
        }, errorHandler);

    }, errorHandler, successCB);
}
function InsertUsersForSync(UserId, FirstName, LastName, UserName, Email, Password, IsActive) {
   // alert("InsertUsersForSync");
    var a= [UserId, FirstName, LastName, UserName, Email, Password, IsActive];
    console.log(a);
    db.transaction(function (txt) {
        var syncstat = "INSERT INTO Users (UserId,FirstName,LastName,UserName,Email,Password,IsActive) VALUES (?,?,?,?,?,?,?)";
        console.log(syncstat);
        txt.executeSql(syncstat, [UserId, FirstName, LastName, UserName, Email, Password, IsActive], function (txt, results) {
            console.log(results);
            if (results.rowsAffected == 1) {
                console.log("User Sync Record Inserted");
            }
        }, errorHandler);

    }, errorHandler, successCB);
}
function InsertExpenseTypesForSync(ExpenseTypeId, ExpenseName, ImageRequired, CommentsRequired, AccountingNo, IsDelete, LastModified, GUID) {

    db.transaction(function (txt) {
        var syncstat = "INSERT INTO ExpenseTypes (ExpenseTypeId,ExpenseName,ImageRequired,CommentsRequired,AccountingNo,IsDelete,LastModified,GUID) VALUES (?,?,?,?,?,?,?,?)";
        txt.executeSql(syncstat, [ExpenseTypeId, ExpenseName, ImageRequired, CommentsRequired, AccountingNo, IsDelete, LastModified, GUID], function (txt, results) {
            if (results.rowsAffected == 1) {
                console.log("ExpenseType Sync Record Inserted");
            }
        }, errorHandler);

    }, errorHandler, successCB);
}
function InsertUsersExpenseForSync(ExpenseId, TravelId, Date, Description, Amount, ExpenseTypeId, ExpenseDocument, Duration, CurencyType, AmountToReimburse, LastModified, GUID, Deleted) {
   // console.log(GUID);
   // alert(GUID);
    db.transaction(function (txt) {
        alert(Deleted);
     //   var Syncstat = "INSERT INTO UserExpenses (ExpenseId,TravelId,Date,Description,Amount,ExpenseTypeId,ExpenseDocument,Duration,CurencyType,AmountToReimburse,LastModified,GUID,Deleted) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var Syncstat = "Update UserExpenses SET Date=?,Description=?,Amount=?,ExpenseTypeId=?,ExpenseDocument=?,Duration=?,CurencyType=?,AmountToReimburse=?,LastModified=?,Deleted=? where GUID=?";
        txt.executeSql(Syncstat, [Date, Description, Amount, ExpenseTypeId, ExpenseDocument, Duration, CurencyType, AmountToReimburse, LastModified, Deleted, GUID], function (txt, results) {
            if (results.rowsAffected == 0) {
                alert("sssssss")
                var Syncstat = "INSERT INTO UserExpenses (ExpenseId,TravelId,Date,Description,Amount,ExpenseTypeId,ExpenseDocument,Duration,CurencyType,AmountToReimburse,LastModified,GUID,Deleted) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
                txt.executeSql(Syncstat, [ExpenseId, TravelId, Date, Description, Amount, ExpenseTypeId, ExpenseDocument, Duration, CurencyType, AmountToReimburse, LastModified, GUID, Deleted], function (txt, results) {
                }, errorHandler)
                console.log("User Expense Sync Record Inserted");
            }
        }, errorHandler);

    }, errorHandler, successCB);
}



function insertTravelForSyc(TravelId, UserId, Name, DateFrom, DateTo, Description, Status, StatusDate, ApprovalDate, RejectedDate, Comments, SubmittedDate, LastModified, Deleted, GUID) {
    db.transaction(function (txt) {

        var Syncstat = "Update Travels set Name=?,DateFrom=?,DateTo=?,Description=?,Status=?,StatusDate=?,ApprovalDate=?,RejectedDate=?,Comments=?,SubmittedDate=?,LastModified=?,Deleted=? WHERE GUID=?";
        //   var Syncstat = "INSERT INTO Travels (TravelId,UserId,Name,DateFrom,DateTo,Description,Status,StatusDate,ApprovalDate,RejectedDate,Comments,SubmittedDate,LastModified,Deleted,GUID) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
        txt.executeSql(Syncstat, [Name, getTDateOnly(DateFrom), getTDateOnly(DateTo), Description, Status, getTDateOnly(StatusDate), getTDateOnly(ApprovalDate), getTDateOnly(RejectedDate), Comments, getTDateOnly(SubmittedDate), LastModified, Deleted, GUID], function (txt, results) {
            if (results.rowsAffected == 0) {

                var arry = [TravelId, UserId, Name, DateFrom, DateTo, Description, Status, StatusDate, ApprovalDate, RejectedDate, Comments, SubmittedDate, LastModified, Deleted, GUID]
          
                //    var Syncstat = "Update Travels set TravelId=?,UserId=?,Name=?,DateFrom=?,DateTo=?,Description=?,Status=?,StatusDate=?,ApprovalDate=?,RejectedDate=?,Comments=?,SubmittedDate=?,LastModified=?,Deleted=?,GUID=?";
                var Syncstat1 = "INSERT INTO Travels (TravelId,UserId,Name,DateFrom,DateTo,Description,Status,StatusDate,ApprovalDate,RejectedDate,Comments,SubmittedDate,LastModified,Deleted,GUID) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                console.log(Syncstat1);
                txt.executeSql(Syncstat1, [TravelId, UserId, Name, getTDateOnly(DateFrom), getTDateOnly(DateTo), Description, Status, getTDateOnly(StatusDate), getTDateOnly(ApprovalDate), getTDateOnly(RejectedDate), Comments, getTDateOnly(SubmittedDate), LastModified, Deleted, GUID], function (txt, results) {
                    if (results.rowsAffected == 1) {
                        console.log("Travels Sync Record Inserted");
                    }
                }, errorHandler);

                console.log("Sync Record Inserted")
            }
        }, errorHandler);

    }, errorHandler, successCB);
}

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}
function getSyncTime(callback) {
    db.transaction(function (txt) {
        var Syncstat = "SELECT LastSync from Sync";
        console.log(Syncstat);
        txt.executeSql(Syncstat, [], function (txt, results) {
            var lenth = results.rows.length;
            var jsonstr = ""
            if (lenth > 0) {
               

                    var row = results.rows.item(0);
                    jsonstr = row.LastSync;
            }
           
            callback(jsonstr);



        }, errorHandler);

    }, errorHandler, successCB);
}
function getTravelForSyc(callback) {
    db.transaction(function (txt) {
        var Syncstat = "SELECT * FROM travels WHERE LastModified >(SELECT LastSync from Sync)";
        console.log(Syncstat);
        txt.executeSql(Syncstat, [], function (txt, results) {
        //    alert("total lent of travel:" + results);
            var lenth = results.rows.length;
            console.log("total lent of travel:"+lenth);
            var jsonstr="["
            if (lenth > 0) {
                for (var k = 0; k < results.rows.length; k++) {

                    var row = results.rows.item(k);

                    //     jsonstr += '{"TravelId":"' + row.TravelId + '","UserId":"' + row.UserId + '","Name":"' + row.Name + '","DateFrom":"' + row.DateFrom + '","DateTo":"' + row.DateTo + '", "Description":"' + row.Description + '","Status":"' + row.Status + '", "StatusDate":"' + row.StatusDate + '", "ApprovalDate":"' + row.ApprovalDate + '", "RejectedDate":"' + row.RejectedDate + '", "Comments":"' + row.Comments + '", "SubmittedDate":"' + row.SubmittedDate + '"}';

                    jsonstr += '{TravelId:' + row.TravelId + ',UserId:' + row.UserId + ',Name:' + row.Name + ',DateFrom:' + getDateOnly(row.DateFrom) + ',DateTo:' + getDateOnly(row.DateTo) + ', Description:' + row.Description + ',Status:' + row.Status + ', StatusDate:' + getDateOnly(row.StatusDate) + ', ApprovalDate:' + getDateOnly(row.ApprovalDate) + ', RejectedDate:' + getDateOnly(row.RejectedDate) + ', Comments:' + row.Comments + ', SubmittedDate:' + row.SubmittedDate + ', LastModified:' + getDateOnly(row.LastModified) + ', GUID:' +row.GUID +', Deleted:' + row.Deleted +'}';
                    if (k != lenth - 1) { 
                        jsonstr += ",";
                    }

                }

            }
            jsonstr += "]";
            console.log("jsonstr="+jsonstr);
            callback(jsonstr);



        }, errorHandler);

    }, errorHandler, successCB);
}
function getUserExpenseForSyc(callback) {
    db.transaction(function (txt) {
        var Syncstat = "SELECT a.*, b.GUID as TravelGUID FROM UserExpenses a inner join Travels b  on b.TravelId = a.TravelId WHERE a.LastModified >(SELECT LastSync from Sync)";
        txt.executeSql(Syncstat, [], function (txt, results) {
            var lenth = results.rows.length;
            console.log("total lent of travel:" + lenth);
            var jsonstr = "[";
            if (lenth > 0) {
                console.log("total Expense lent of travel:" + lenth);
                for (var k = 0; k < results.rows.length; k++) {
                    var row = results.rows.item(k);
                    //jsonstr += '{ "ExpenseId":"' + row.ExpenseId + '", "TravelId":"' + row.TravelId + '", "Date":"' + row.Date + '", "Description":"' + row.Description + '", "Amount":"' + row.Amount + '", "ExpenseTypeId":"' + row.ExpenseTypeId + '","ExpenseDocument":"' + row.ExpenseDocument + '", "Duration":"' + row.Duration + '", "CurencyType":"' + row.CurencyType + '", "AmountToReimburse":"' + row.AmountToReimburse + '"}';
                    jsonstr += '{ ExpenseId:' + row.ExpenseId + ', TravelId:' + row.TravelId + ', Date:' + getDateOnly(row.Date) + ', Description:' + row.Description + ', Amount:' + row.Amount + ', ExpenseTypeId:' + row.ExpenseTypeId + ',ExpenseDocument:' + row.ExpenseDocument + ', Duration:' + row.Duration + ', CurencyType:' + row.CurencyType + ', AmountToReimburse:' + row.AmountToReimburse + ', LastModified:' + getDateOnly(row.LastModified) + ', GUID:' + row.GUID + ', Deleted:' + row.Deleted + ',TravelGUID:' + row.TravelGUID + '}';
                    if (k != lenth - 1) {
                        jsonstr+= ",";
                    }
                }
            }
            jsonstr += "]";
            callback(jsonstr);
        }, errorHandler);

    }, errorHandler, successCB);
}
function SyncFn()

{
    getTravelForSyc(function (travel) {
      
    //   alert(travel);
        //console.log("Travels:" + ':"[{TravelId:1,UserId:4,Name:TestTravel,DateFrom:2015-03-21 00:00:00,DateTo:2015-03-27 00:00:00, Description:djfdlksjflkdsjflkdsjf,Status:Appoved}]"');
        console.log("Travels:" + travel);
        $.ajax({
            url: 'http://theexpensestouch.com/syncservice.asmx/InsertSyncTravels',
            //url: 'http://travel.intouchcommunicator.com/syncservice.asmx/InsertSyncTravels',
            
            type: 'POST',
           data: '{"travels": "' + travel + '"}',
            //data: '{"travels":"[{TravelId:1,UserId:4,Name:TestTravel,DateFrom:2015-03-21 00:00:00,DateTo:2015-03-27 00:00:00, Description:djfdlksjflkdsjflkdsjf,Status:Appoved, StatusDate:2015-03-20 12:25:52.643, Comments:sdsdsdsds}]"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
            //    alert(1);
                Sync1();
            },
            failure: function (errMsg) {
               // alerst(errMsg.data);
                console.log(errMsg); //errorMessage is id of the div
            },
            error: function (err) {
               // alert(err.status);
            }
        });

    });
}

function Sync1() {
   // alert("sync1");
    getUserExpenseForSyc(function (data) {
        console.log("Expense:" + data);
     //   alert("before ajax");
        $.ajax({
            url: 'http://theexpensestouch.com/syncservice.asmx/InsertSyncExpenses',
            type: 'POST',
            data: "{'Expenses': '" + data + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
              
                Sync3();
            },
            failure: function (errMsg) {
           //     alert(errMsg.data);
                console.log(errMsg); //errorMessage is id of the div
            },
            error: function (err) {
             //   alert(err.error);
            }
        });

    });
}



function Sync3()
{
      getSyncTime(function (SyncTime) {
      //  alert(SyncTime);
        $.ajax({
            url: 'http://theexpensestouch.com/syncservice.asmx/GetAllTravels',
            type: 'POST',
            data: "{'EmailId':'" + localStorage.getItem("e") + "', 'LastModified':'" + SyncTime +"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var Kewords = {};
                Kewords = response.d;
                       //   alert(4);
                          console.log(Kewords);
                // TruncateTravels();

                for (var i = 0; i < Kewords.length; i++) {
                    insertTravelForSyc(Kewords[i].TravelId, Kewords[i].UserId, Kewords[i].Name, getJsonDate(Kewords[i].DateFrom), getJsonDate(Kewords[i].DateTo), Kewords[i].Description, Kewords[i].Status, getJsonDate(Kewords[i].StatusDate), getJsonDate(Kewords[i].ApprovalDate), getJsonDate(Kewords[i].RejectedDate), Kewords[i].Comments, getJsonDate(Kewords[i].SubmittedDate), Kewords[i].LastModified, Kewords[i].Deleted, Kewords[i].GUID);
                }
                Sync4();
               // alert(new Date().getTime() - startTime);
                            SyncExchangeRates();
                            SyncUsers();
                            SyncExpenseType();

                            updatelastsync();
                       
            },
            failure: function (errMsg) {
                //         alert(errMsg.data);
                console.log(errMsg); //errorMessage is id of the div
            },
            error: function (err) {
                //       alert(err.error);
            }
        });



    });
    

}

function Sync4() {
    getSyncTime(function (SyncTime) {
      alert(SyncTime);
    $.ajax({
        url: 'http://theexpensestouch.com/syncservice.asmx/GetAllUserExpenses',
        type: 'POST',
        data: "{'EmailId':'" + localStorage.getItem("e") + "', 'LastModified':'" + SyncTime + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var Kewords1 = {};
            Kewords1 = response.d;
            //              console.log(response.d);
       //     alert(5);
          //  TruncateExpenses();

            for (var i = 0; i < Kewords1.length; i++) {

                console.log(Kewords1[i].ExpenseId);
                console.log(Kewords1[i].TravelId);
                console.log(getJsonDate(Kewords1[i].Date));
                console.log(Kewords1[i].Description);
                console.log(Kewords1[i].Amount);
                console.log(Kewords1[i].ExpenseTypeId);
                console.log(Kewords1[i].ExpenseDocument);
                console.log(Kewords1[i].Duration);
                console.log(Kewords1[i].CurencyType);
                console.log(Kewords1[i].AmountToReimburse);

                InsertUsersExpenseForSync(Kewords1[i].ExpenseId, Kewords1[i].TravelId, getJsonDate(Kewords1[i].Date), Kewords1[i].Description, Kewords1[i].Amount, Kewords1[i].ExpenseTypeId, Kewords1[i].ExpenseDocument, Kewords1[i].Duration, Kewords1[i].CurencyType, Kewords1[i].AmountToReimburse, Kewords1[i].LastModified, Kewords1[i].GUID, Kewords1[i].Deleted);

            }

        },
        failure: function (errMsg) {
         //   alert(700);
     //       alert(errMsg.data);
            console.log(errMsg); //errorMessage is id of the div
        },
        error: function (err) {
           // alert(800);
            //alert(err.error);
        }
    });

    });
}
function SyncExpenseType() {
//  alert("SyncExpenseType");
    $.ajax({
        url: 'http://theexpensestouch.com/syncservice.asmx/GetAllExpenseTypes',
        type: 'POST',
        //data: "{'EmailId':'" + localStorage.getItem("e") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var Kewords1 = {};
            Kewords1 = response.d;
            //              console.log(response.d);
            //     alert(5);
            TruncateExpenseType();

            for (var i = 0; i < Kewords1.length; i++) {

                InsertExpenseTypesForSync(Kewords1[i].ExpenseTypeId, Kewords1[i].ExpenseName, Kewords1[i].ImageRequired, Kewords1[i].CommentsRequired, Kewords1[i].AccountingNo, Kewords1[i].IsDelete);

            }

        },
        failure: function (errMsg) {
            //   alert(700);
         //   alert(errMsg.data);
            console.log(errMsg); //errorMessage is id of the div
        },
        error: function (err) {
            // alert(800);
            //alert(err.error);
        }
    });
}
function SyncUsers() {
  //  alert("SyncUsers");
    $.ajax({
        url: 'http://theexpensestouch.com/syncservice.asmx/GetAllUsers',
        type: 'POST',
        //data: "{'EmailId':'" + localStorage.getItem("e") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var Kewords1 = {};
            Kewords1 = response.d;
                     console.log(response.d);
    //         alert(Kewords1.length);
            TruncateUsers();
      //      alert("aftertrucate");
            for (var i = 0; i < Kewords1.length; i++) {
        //        alert("in loop");
                InsertUsersForSync(Kewords1[i].UserId, Kewords1[i].FirstName, Kewords1[i].LastName, Kewords1[i].UserName, Kewords1[i].Email, Kewords1[i].Password, Kewords1[i].IsActive);
          //      alert("after insertion");
            }

        },
        failure: function (errMsg) {
            //   alert(700);
     //       alert(errMsg.data);
            console.log(errMsg); //errorMessage is id of the div
        },
        error: function (err) {
            // alert(800);
            //alert(err.error);
        }
    });
}
function SyncExchangeRates() {
   // alert("SyncExchangeRates");
    $.ajax({
        url: 'http://theexpensestouch.com/syncservice.asmx/GetExchangeRate',
        type: 'POST',
        //data: "{'EmailId':'" + localStorage.getItem("e") + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var Kewords1 = {};
            Kewords1 = response.d;
           // console.log(response.d);
            //     alert(5);
            TruncateExchangeRates();

            for (var i = 0; i < Kewords1.length; i++) {

                InsertExchangeRateForSync(Kewords1[i].CurrencyTypeId, Kewords1[i].CurrencyCode, Kewords1[i].USD, Kewords1[i].GBP, Kewords1[i].EUR, Kewords1[i].CHF, Kewords1[i].JPY, Kewords1[i].CNY, Kewords1[i].BHD, Kewords1[i].RUB, Kewords1[i].DKK, Kewords1[i].AUD, Kewords1[i].SEK, Kewords1[i].HKD, Kewords1[i].KRW, Kewords1[i].MXN, Kewords1[i].SGD, Kewords1[i].AED, Kewords1[i].ZAR, Kewords1[i].ARS);

            }

        },
        failure: function (errMsg) {
            //   alert(700);
       //     alert(errMsg.data);
            console.log(errMsg); //errorMessage is id of the div
        },
        error: function (err) {
            // alert(800);
            //alert(err.error);
        }
    });
}


document.addEventListener("deviceready", onDeviceReady, false);




function onFail(evt) {
    console.log(evt.target.error.code);
}
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
function ChoosePhoto(e) {
    console.log("gggg");
    getPhoto(pictureSource.PHOTOLIBRARY);
}
function getPhoto(source) {
    
    console.log("photo upload");
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                                quality: 50,
                                destinationType: destinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                mediaType: navigator.camera.MediaType.ALLMEDIA,
                                sourceType: source,
                                correctOrientation: true
                                });
    
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
    var MAX_HEIGHT = 500;
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
   // alert("success");
    console.log(imageURI);
    // Get image handle
    //
    var size;
    var a = "8096962";
    window.resolveLocalFileSystemURL(imageURI, function (fileEntry) {
        fileEntry.file(function (fileObj) {
            console.log("Size = " + fileObj.size);
            size = fileObj.size;
         
        });
    });
    console.log(parseInt(size) <parseInt(a));
//    if (parseInt(size) < parseInt(a)) {
        convertImgToBase64URL(imageURI, function (base64Img) {
            console.log(base64Img);
            var cameraImage;
            var edit = window.sessionStorage.getItem("from");//, "Edit")
            if (edit == "Edit") {
                cameraImage = document.getElementById('Img');
                sessionStorage.removeItem("from");
            } else {
                cameraImage = document.getElementById('image');
            }// Unhide image elements
            //
            cameraImage.style.display = 'block';
            // Show the captured photo
            // The inline CSS rules are used to resize the image
            //
                cameraImage.src = base64Img;
            //localStorage.setItem("base64Image", base64Img);
            // Base64DataURL
        });
//    } else {
  //      alert("Image should not be greater than 8 mb");
  //  }
        //var cameraImage = document.getElementById('image');
    //// Unhide image elements
    ////
    //cameraImage.style.display = 'block';
    //// Show the captured photo
    //// The inline CSS rules are used to resize the image
    ////
    //cameraImage.src = imageURI;
}

function onDeviceReady() {
    var startTime = new Date().getTime();
    checkConnection();
   
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;   // alert(getconstatus);
   
    if (ConnectionStatus != "No network connection") {
        ///  db = window.sqlitePlugin.openDatabase("TravelExpense.db");
        db = window.sqlitePlugin.openDatabase({ name: "TravelExpense.db", createFromLocation: 1 });
   //     updatelastsync();
    //  alert("stop");
     SyncFn();
     //  TruncateExpenses();
     //TruncateTravels();
         SyncUsers();
      //  db = window.sqlitePlugin.openDatabase({ name: "TravelExpense.db" });
    }

    // document.addEventListener("resume", onResume, false);
    var ref = window.open('#Login-home', '_system', 'location=yes');
    ref.show();
}
// A button will call this function

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 75,
       
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    });
}

 // A button will call this function

function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
}
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64 encoded image data
     console.log("sss   "+imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;
}
//function capturePhoto() {
//    navigator.camera.getPicture(uploadPhoto, null, { sourceType: 1, quality: 25 });
//}
//function uploadPhoto(data) {
//    // this is where you would send the image file to server

//    cameraPic.src = "data:image/jpeg;base64," + data;
//    // Successful upload to the server
//    navigator.notification.alert(
//		'Your Photo has been uploaded',  // message
//		okay,                           // callback
//	    'Photo Uploaded',              // title
//	    'OK'                          // buttonName
//	);

//    // upload has failed Fail

//    /* 

//	if (failedToUpload){

//	navigator.notification.alert(
//		'Your Photo has failed to upload',
//		failedDismissed,
//	    'Photo Not Uploaded',
//	    'OK'
//		);

//	} 
//	*/


//}

//function okay() {
//    // Do something
//}
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


function onBackKeyDown() {

    //if ($("#Home-layout").css("display") != "none") {

    //    var closeapp = confirm("Are you sure to close this app?");

    //    if (closeapp == true) {
    //        navigator.app.exitApp(); // To exit the app!
    //    }
    //    else {
    //        return false;
    //    }

    //}
    //else if ($("#Login-home").css("display") != "none") {

    //    var closeapp = confirm("Are you sure to close this app?");

    //    if (closeapp == true) {
    //        navigator.app.exitApp(); // To exit the app!
    //    }
    //    else {
    //        return false;
    //    }

    //}
    //else if ($("#ShareMediaLibrary-layout").css("display") != "none") {
    //    window.location = "#MediaLibrary-layout";
    //    fnMediaLibrary(localStorage.getItem("LoginUserID"));
    //}
    //else if ($("#ChangePasswordaccount-layout").css("display") != "none") {
    //    window.location = "#accountsetting-layout";
    //}
    //else if ($("#ChangeUserName-layout").css("display") != "none") {
    //    window.location = "#accountsetting-layout";
    //}
    //else if ($("#ChangeEmailAddress-layout").css("display") != "none") {
    //    window.location = "#accountsetting-layout";
    //}
    //else if ($("#payments-layout").css("display") != "none") {
    //    if ($("#paywithPaypalcontainer").css("display") != "none") {
    //        $("#paywithPaypalcontainer").slideUp(1000);
    //    }
    //    else {
    //        window.location = "#accountsetting-layout";
    //    }
    //}
    //else if ($("#PaymentViaCreditCard-layout").css("display") != "none") {
    //    creditfieldempty();
    //    window.location = "#payments-layout";
    //}
    //else if ($(".SubMenuForReports").css("display") != "none") {
    //    $(".SubMenuForReports").fadeOut(500);
    //}

    //else if ($(".SubMenuForForms").css("display") != "none") {
    //    $(".SubMenuForForms").fadeOut(500);
    //}

    //else if ($("#EditMyReprot-layout").css("display") != "none") {
    //    window.location = "#MyReportsView-layout";
    //}

    //else if ($("#EditMyforms-layout").css("display") != "none") {
    //    window.location = "#MyFormsView-layout";
    //}

    //else if ($("#sendreprot-layout").css("display") != "none") {
    //    window.location = "#MyReportsView-layout";
    //}
    //else if ($("#signup-layout").css("display") != "none") {
    //    emptysignupform();
    //    window.location = "#Login-home";
    //}
    //else if ($("#uploadmedia-layout").css("display") != "none") {
    //    $("#MediaTxtLabeled").html("");
    //    $("#FullMediaPath").html("");
    //    $("#UploadMediaDescription").val("");
    //    window.location = "#MediaLibrary-layout";
    //}
    //else {
    //    window.location = "#Home-layout";
    //    setTimeout(function () {
    //        $("#MainPageTitle .km-view-title span").html("Welcome " + localStorage.getItem("LoginUserName"));
    //    }, 2000);

    //}

}
var ConnectionStatus;

    function checkConnection() {
        var networkState = navigator.network.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
		ConnectionStatus = states[networkState];
    }
function getuser(email, password) {
    $("#btnlogin").css("display", "none");
    $(".LoginFrieldsContainer #Loader").css("display", "block");
    db.transaction(function (txt) {   exeQuery(txt, email, password); }, errorHandler, successCB);
}
function exeQuery(txt, email, password) {
    console.log("exequery");
  //  var getstatement = "SELECT UserId,FirstName,LastName,UserName,Email,Password,Address,PhoneNo,IsActive,UserGuid,Manager,AccountingEmail,OfficeLocation,Department,CompanyDimension,OtherDimension1,OtherDimension2,BankAccountNumber,RoutingNumber,SwiftCode,IBAN,BankAddress,Currency,IsAccountant from Users where Email=? and Password=? and IsActive='1'";
    var getstatement="SELECT * FROM Users WHERE Email=? AND Password=? and IsActive=?";
   // var getstatement = "SELECT * FROM Users";
    console.log(getstatement);
    txt.executeSql(getstatement, [email, password,true], loginresult, errorHandler);
}
function loginresult(txt, results) {
    var lengt = results.rows.length;
   // alert(lengt);
    $("#btnlogin").css("display", "block");
    $(".LoginFrieldsContainer #Loader").css("display", "none");
    var query = results.rows.item(0);
    if (lengt > 0) {

        var userid = query.UserId;
        //  alert(userid);
        localStorage.setItem("UserId", userid);
        var email = query.Email;
        // alert(email);
        sessionStorage.setItem("UserEmail", email);
        var name = query.UserName
        //   alert(name);
        sessionStorage.setItem("UserName", name);
        var currency = query.Currency;
        //  alert(currency);
        sessionStorage.setItem("UserCurrency", currency);

        var isaccountant = query.IsAccountant;
        //   alert(isaccountant);
       sessionStorage.setItem("IsAccountant", isaccountant);
      var query = "SELECT UserId,FirstName,LastName,UserName,Email,Password,Address,PhoneNo,IsActive,UserGuid,Manager,AccountingEmail,OfficeLocation,Department,CompanyDimension,OtherDimension1,OtherDimension2,BankAccountNumber,RoutingNumber,SwiftCode,IBAN,BankAddress,Currency,IsAccountant from Users where Manager=?";
      txt.executeSql(query, [userid], successmanager, errorHandler);


    }
    else {
        //  LoginError("Wrong username and password");
        navigator.notification.alert("Wrong username and password", alertDismissed, 'The Expense Touch', 'OK');
        $("#btnlogin").css("display", "block");
        $(".LoginFrieldsContainer #Loader").css("display", "none");
    }

}
function errorHandler(transaction, e) {
  //navigator.notification.alert('Error: ' + e.message + ' code: ' + e.code,alertDismissed,'The Expense Touch','OK');
}
function successCB() {
    console.log('transiction success!');
}
//Error Display for Login Page
function LoginError(Msg) {
  //  $("#Login-home .Error").html(Msg)
  //  $("#Login-home .Error").css("display", "block");                                                                                                                                      

    setTimeout(function () {
        $("#Login-home .Error").fadeOut(2000);
    }, 4000);
}
//Error Display for Login Page ENd

function successmanager(txt, results) {
    $("#btnlogin").css("display", "block");
    $(".LoginFrieldsContainer #Loader").css("display", "none");

    var lenth = results.rows.length;
   // alert(lenth)
    if (lenth > 0) {
        localStorage["IsManager"] = 1;
  //      alert(localStorage["IsManager"]);
    }
    else {
        localStorage["IsManager"] = 0;
   //     alert(localStorage["IsManager"]);
    }
    $("#EmailAddress").val("");
    $("#Password").val("");

    window.location = "#viewmytravel-layout";
    var LoginUserName= sessionStorage.getItem("UserName")
    setTimeout(function () {
        $("#MainPageTitle .km-view-title span").html("Welcome " + LoginUserName);
    }, 2000);
}
//Prepare My Travels
function insertTravelstrans(travelname, datefrom, dateto, descriptions) {

    db.transaction(function (txt) { exeinsertquery(txt, travelname, datefrom, dateto, descriptions) }, errorHandler, successCB);
}

function exeinsertquery(txs, travelname, datefrom, dateto, description) {
    var d = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth())+1) + "-" + new Date().getDate();
  //  alert(d);
    var userid = localStorage.getItem("UserId");
    var inserttravelstatement = "INSERT INTO Travels (UserId,Name,DateFrom,DateTo,Description,GUID,LastModified) VALUES(?,?,?,?,?,?,?)";//'" + userid + "', '" + travelname + ",'" + datefrom + "','" + dateto + "','" + description + "','" + d + "')";
    console.log(inserttravelstatement);
    var gu = guid();
    console.log(gu);
    txs.executeSql(inserttravelstatement, [userid, travelname, datefrom, dateto, description, gu, d], prepsucess, errorHandler);
}
function prepsucess(txt, results) {
    console.log(results);
    if (results.rowsAffected == 1) {
        $("#TravelName").val('');
        $("#datepicker").val('');
        $("#datepickerto").val('');
        $("#Description").val('');
        window.location = "#viewmytravel-layout";
    }
}
function nullHandler() {

};
function UpdateTravelstrans(TravelId, travelname, datefrom, dateto, descriptions) {
    db.transaction(function (txt) { exeUpdatequery(txt,TravelId, travelname, datefrom, dateto, descriptions) }, errorHandler, successCB);
}
function exeUpdatequery(txs, travelid, travelname, datefrom, dateto, description) {
    var d = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate();
    var updatetravelstatement = "UPDATE Travels SET Name=?,DateFrom=?,DateTo=?,Description=? WHERE TravelId=?";
    console.log(updatetravelstatement);
    console.log(travelname);
    console.log(datefrom);
    console.log(dateto);
    console.log(description);
    console.log(travelid);
    txs.executeSql(updatetravelstatement, [travelname, datefrom, dateto, description, travelid], updatesuccessHandler, errorHandler);
}
function updatesuccessHandler(txt, results) {
    //alert("Record updated successfully");
    window.location = "#viewmytravel-layout";
    console.log("success");
    navigator.notification.alert("Record Updated Successfully...",alertDismissed,'Travel','Done');
   // getTravelTrans();
}
function Transactionsuccess(txt, results) {
  console.log("success");
}
// End of Prepare My Travels

// view my travel

function getTravelTrans() {
   
    db.transaction(function (txt) { gettravel(txt) }, errorHandler, successCB);
}
function gettravel(txs) {
    var userid = localStorage.getItem("UserId");
  //  alert(userid);
    var getviewmytravel = "SELECT TravelId,UserId,Name,DateFrom,DateTo,Description,Status  FROM Travels WHERE UserId =? AND Deleted=? AND Status  IS NULL";
    console.log(txs);
    txs.executeSql(getviewmytravel, [userid,false], travelresult, errorHandler);
}
function travelresult(trns, results) {
  //  tx = txt;
    var lengt = results.rows.length;
    console.log("pength " + lengt);
   // $("#t01").find("tbody").html();
  //  alert(lengt);
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            console.log(results.rows.item(i).TravelId);
            var newrow = '<tr><td>' + results.rows.item(i).Name + '</td>';
            newrow += '<td>' +getDateOnly(results.rows.item(i).DateFrom) + '</th>';
            newrow += '<td>' +getDateOnly(results.rows.item(i).DateTo) + '</td>';
            newrow += '<td>' + results.rows.item(i).Description + '</td>';
//            newrow += '<td> <a data-id=' + results.rows.item(i).Travelid + ' class="view" href="#viewExpensesOfTravelByDate?TID=' + results.rows.item(i).TravelId + '">View</a> | "<a data-id=' + results.rows.item(i).TravelId + '  class="edit" href="#EditMyTravels-layout?id=' + results.rows.item(i).TravelId + '">Edit</a> | <a data-id=' + results.rows.item(i).TravelId + '  class="delete" data-click="Deletetravel">Delete</a> </td></tr>';
            newrow += '<td> <a data-id="' + results.rows.item(i).TravelId + '" class="travelbuttons" href="#viewExpensesOfTravelByDate?TID=' + results.rows.item(i).TravelId + '">View</a> </td></tr>';// | <a  href="#viewmyAction-layout?action=Submit&ID=' + results.rows.item(i).TravelId + '&Page=viewmytravel-layout" data-id="' + results.rows.item(i).TravelId + '" class="travelbuttons" >Submit</a>
//            var deleteids="deleteTravel"+i;
//            $(deleteids).kendoMobileButton({click: Deletetravel});
            $("#t01").find("tbody").append(newrow);//data-click="Deletetravel"  data-role="button"    submittravel
        }
    }
}
function Deletetravel() {
   // alert("click");
    // var data = e.button.data();
    // var id = data.id;
    //DeleteTravel(id);
}
function DeleteTravelll(travelId) {
    db.transaction(function (txt) {
        var query = "delete from Travels where TravelId=?";
        txt.executeSql(query, [travelId], successCB, errorHandler); }, errorHandler, successCB);
   
}
function SubmitTravel(cid) {
    db.transaction(function (txt) { SubmitTravelIdQuery(txt, cid); }, errorHandler, successCB);
}
function SubmitTravelIdQuery(txn, tid) {
    var status = "Submited";
    var d = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate();
    var query = "UPDATE Travels SET Status=?, StatusDate=? WHERE TravelId=?";
    txn.executeSql(query, [status, d, tid], submitTravelbyIdSucess, errorHandler);
}
function submitTravelbyIdSucess(txn, results) {
    navigator.notification.alert("Travel is submited", alertDismissed, 'Travel', 'Done');    
}
// End of view my travel
/// Edit My Travel
function EditTravelById(id) {
   // alert(id);
    db.transaction(function (txt) { Edittravelbyuseridquery(txt,id); }, errorHandler, successCB);
}
function Edittravelbyuseridquery(txs, Travelid) {
    var query = "SELECT TravelId,UserId,Name,DateFrom,DateTo,Description FROM Travels WHERE TravelId =?";
    console.log(txs);
    txs.executeSql(query, [Travelid], Edittravelresultbyuserid, errorHandler);
}
function Edittravelresultbyuserid(txt, results) {
    var lengt = results.rows.length;

    if (lengt > 0) {
        $("#txt-TravelName").val(results.rows.item(0).Name);
        $("#txt-datepickerrr").val(getDateOnly(results.rows.item(0).DateFrom));
        $("#txt-datepickertooo").val(getDateOnly(results.rows.item(0).DateTo));
        $("#txt-Descript").val(results.rows.item(0).Description);
        $("#btn-travelupdate").attr("data-id", results.rows.item(0).TravelId);
    }
}
/// End My Travel

/// upload my expense
function getTravelByUserId(usid) {
    db.transaction(function (txt) { gettravelbyuseridquery(txt, usid); }, errorHandler, successCB);
}
function gettravelbyuseridquery(txs,userid) {    
    var query = "SELECT TravelId,UserId,Name,Datefrom,DateTo,Description FROM Travels WHERE TravelId =" + userid;
    console.log(txs);
    txs.executeSql(query, [], travelresultbyuserid, errorHandler);
}
function travelresultbyuserid(txt, results) {
    var lengt = results.rows.length;
    $("#ddlTravelName").html("");
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            var html = $("#ddloption").clone().html();
            html = html.replace("{{id}}", results.rows.item(i).TravelId)
                       .replace("{{Name}}", results.rows.item(i).Name);
            $("#ddlTravelName").append(html);
        }
    }
}
function getDateOnly(date) {
    if (date == null) {
        return date;
    }
    else {
        var d = date.split(' ');
        return d[0];
    }
}

function getTDateOnly(date) {
    if (date == null) {
        return date;
    }
    else {
        var d = date.split('T');
        return d[0];
    }
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

function EgetTravelByUserId(usid) {
   
    db.transaction(function (txt) { Egettravelbyuseridquery(txt, usid); }, errorHandler, successCB);
}
function Egettravelbyuseridquery(txs, userid) {
 
    var query = "SELECT TravelId,UserId,Name,Datefrom,DateTo,Description FROM Travels WHERE UserId =" + userid;
    txs.executeSql(query, [], Etravelresultbyuserid, errorHandler);
}
function Etravelresultbyuserid(txt, results) {
    var lengt = results.rows.length;
   
    console.log("lentht of  edit travel"+lengt);
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            var html = $("#ETravel").clone().html();
            html = html.replace("{{id}}", results.rows.item(i).TravelId)
                       .replace("{{Name}}", results.rows.item(i).Name);
            $("#ddlTravel").append(html);
        }
    }
}


function getExpenseType() {
    db.transaction(function (txt) { getExpenseTypequery(txt); }, errorHandler, successCB);

}
function getExpenseTypequery(txs) {
   
    var query = "SELECT ExpenseTypeId,ExpenseName,CommentsRequired FROM ExpenseTypes WHERE IsDelete=?";
   
    txs.executeSql(query, [false], getExpenseTypesucess, errorHandler);
}
function getExpenseTypesucess(txt, results) {
    $("#ddlExpenseType").html('');
    var lengt = results.rows.length;
    
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            var html = $("#ssExpensetypeoption").clone().html();
            html = html.replace("{{id}}", results.rows.item(i).ExpenseTypeId)
                       .replace("{{Name}}", results.rows.item(i).ExpenseName)
                       .replace("{{CommentRequired}}",results.rows.item(i).CommentsRequired);
            
            $("#ddlExpenseType").append(html);
        }
    }
}


function EgetExpenseType() {
    db.transaction(function (txt) { EgetExpenseTypequery(txt); }, errorHandler, successCB);

}
function EgetExpenseTypequery(txn) {
  
    var query = "SELECT ExpenseTypeId,ExpenseName,CommentsRequired FROM ExpenseTypes WHERE IsDelete=?";

    txn.executeSql(query, [false], EgetExpenseTypesucess, errorHandler);
}
function EgetExpenseTypesucess(txt, results) {

    var lengt = results.rows.length;

    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            var html = $("#Expenses").clone().html();
            html = html.replace("{{id}}", results.rows.item(i).ExpenseTypeId)
                       .replace("{{Name}}", results.rows.item(i).ExpenseName)
                       .replace("{{CommentRequired}}", results.rows.item(i).CommentsRequired);

            $("#ddlExpense").append(html);
        }
    }
}




function getCurrencies() {
    db.transaction(function (txt) { getCurrencyquery(txn); }, errorHandler, successCB);

}
function getCurrencyquery(txn) {
    var query = "SELECT ExpenseTypeId,ExpenseName,CommentsRequired FROM ExpenseTypes";
    txs.executeSql(query, [], getCurrencysucess, errorHandler);
}
function getCurrencysucess(txt, results) {

    var lengt = results.rows.length;

    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            var html = $("#Expensetypeoption").clone().html();
            html = html.replace("{{id}}", results.rows.item(i).ExpenseTypeId)
                       .replace("{{Name}}", results.rows.item(i).ExpenseName)
                       .replace("{{CommentRequired}}", results.rows.item(i).CommentsRequired);

            $("#ddlExpenseType").append(html);
        }
    }
}

function insertExpensetransaction(travelid, date, description, amount, expensetypeid, currencytype,img) {
    db.transaction(function (txt) { insertquery(txt, travelid, date, description, amount, expensetypeid, currencytype,img) }, errorHandler, successCB);
}

function insertquery(txs, travelid, date, description, amount, expensetypeid, currencytype, img) {
   // alert("mmmm");
    var d = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate();
   // var amounttoreimberse = submitamountreimburse(amount, currencytype);
    //alert(d);
   // var userid = localStorage.getItem("UserId");
    var insertExpenseStatement = "INSERT INTO UserExpenses (TravelId,Date,Description,Amount,ExpenseTypeId,CurencyType,ExpenseDocument,GUID,LastModified,Deleted) VALUES(?,?,?,?,?,?,?,?,?,?)";
   console.log(insertExpenseStatement);
   txs.executeSql(insertExpenseStatement, [travelid, date, description, amount, expensetypeid, currencytype, img, guid(), d, false], expeseSucessfn, errorHandler);
}
function expeseSucessfn() {
    navigator.notification.alert("Expense Submited Successfully...", alertDismissed, 'Expense', 'Done');
    var travelid = localStorage.getItem("TravelIdForRedirection");
    $("#date").val('');
    $("#txtDescription").val('');
    $("#amount").val('');
    $("#ddlExpenseType").val('');
    $("#ddlCurrency").val('');
    $("#image").attr('src','');
    window.location = "#viewExpensesOfTravelByDate?TID="+travelid;
}
function nullHandler() {
    
};
/// end upload expense

///  Expense View ////////

function GetAllTravelByUserId() {
    db.transaction(function (txa) { GetAllTravelByUserIdQuery(txa); }, errorHandler, successCB);
}
function GetAllTravelByUserIdQuery(txc) {
    var userid =window.localStorage.getItem("UserId");
   // var query = "SELECT TravelId,Date,Description,Amount,ExpenseTypeId,CurencyType FROM UserExpenses";
    var query = "SELECT TravelId,UserId,Name,Datefrom,DateTo,Description,Comments,SubmittedDate,Status FROM Travels WHERE UserId =? AND Status IS NULL";
    console.log(query);
    console.log(userid);
    txc.executeSql(query, [userid], GetAllTravelByUserIdSSucess, errorHandler);
}
function GetAllTravelByUserIdSSucess(txt, results) {
    var lengt = results.rows.length;
   // alert("lentth " + lengt);
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
           // var travelid = results.rows.item(i).TravelId;
            var html = $("#TravelLi").clone().html();
         //   alert("Accordian" + i + 1);
          html = html.replace("{{TravelName}}", results.rows.item(i).Name)
                     .replace("{{Tid}}", results.rows.item(i).TravelId);
          $("#ExpenseTravel").append(html);
                 }
    }
}
function getExpensesByTID(tid) {
    db.transaction(function (txa) { GetAllExpensesByTIDQuery(txa,tid); }, errorHandler, successCB);
}
function GetAllExpensesByTIDQuery(txt, travelid) {
  //  alert("GetAllExpensesByTIDQuery");
    var userid = window.localStorage.getItem("UserId");
    var query = "select *  from UserExpenses inner join ExpenseTypes on UserExpenses.ExpenseTypeId=ExpenseTypes.ExpenseTypeId inner join Users on Users.UserId =? where UserExpenses.travelId=?";
    console.log(query);
    console.log(userid);
    console.log(travelid);
    
    txt.executeSql(query, [userid, travelid], ggetExpensetablebyTravelId, errorHandler);

}
function ggetExpensetablebyTravelId(txd, results) {
    var lengt = results.rows.length;
    console.log("all rows= " + lengt);
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {            
            var eid = results.rows.item(i).ExpenseId;
           // alert(eid);
            var html = $("#expenserow").clone().html();
            console.log(html);
            html = html.replace("{{Description}}", results.rows.item(i).Description)
                       .replace("{{amount}}", results.rows.item(i).Amount)
                       .replace("{{AmounttoReimburse}}", results.rows.item(i).AmountToReimburse)
                       .replace("{{CurencyType}}", results.rows.item(i).CurencyType)
                       .replace("{{ExpensType}}", results.rows.item(i).ExpenseTypeId)
                       .replace("{{Date}}",getDateOnly(results.rows.item(i).Date))
                       .replace("{{Imagesrc}}", results.rows.item(i).ExpenseDocument)
                       .replace("{{EExpenseId}}", eid)
                       .replace("{{DExpenseId}}", eid);
         //   $("table").find("tbody").append(html);
            console.log(html);

        }
    }
}
function SubmitExpensebyTravelId(tid) {
    db.transaction(function (txt) { SubmitExpensebyTravelIdQuery(txt,tid); }, errorHandler, successCB);
}
function SubmitExpensebyTravelIdQuery(txn,tid) {
    var userid = localStorage.getItem("UserId");
    // var query = "SELECT TravelId,Date,Description,Amount,ExpenseTypeId,CurencyType FROM UserExpenses";
    var query = "SELECT ExpenseId,TravelId,Date,Description,Amount,ExpenseTypeId,ExpenseDocument,Duration,CurencyType,AmountToReimburse FROM UserExpenses WHERE TravelId =?";
    txn.executeSql(query, [tid], submitTravelSucess, errorHandler);
}
function submitTravelSucess(txn, results) {
    var lengt = results.rows.length;
    
    if (lengt > 0) {
        var status = "Submited";
        var d = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate();
        var query = "UPDATE Travels SET Status=?, StatusDate=? WHERE TravelId=?";
        txn.executeSql(query, [status,d,tid], submitTravelSucess, errorHandler);
    }
    else {
        navigator.notification.alert("Travel cann't be submited",alertDismissed,'Travel','Done');
    }
}
function alertDismissed() {
    // do something
}
function submitTravelSucess(txt, results) {
    navigator.notification.alert("Travel submited Sucessfully...",alertDismissed, 'Travel','Done');
  
}
function ExpenseDelete(eid) {
    db.transaction(function (txt) { DeleteExpensebyTravelIdQuery(txt, eid); }, errorHandler, successCB);
}
function DeleteExpensebyTravelIdQuery(txn, eid){
    var query = "DELETE FROM UserExpenses WHERE ExpenseId=?";
    txn.executeSql(query, [tid], DeleteTravelSucess, errorHandler);
}
function DeleteTravelSucess(txt, results) {
    navigator.notification.alert("Record Deleted Sucessfully...", alertDismissed,'Travel','Done');
   
}

/// end  Expense 

/// edit expense
function getTravelNameByUserId(usid) {
    db.transaction(function (txt) { gettravelnamebyuseridquery(txt, usid); }, errorHandler, successCB);
}
function gettravelnamebyuseridquery(txs, userid) {


    var query = "SELECT TravelId,UserId,Name,Datefrom,DateTo,Description FROM Travels WHERE UserId =" + userid;

    console.log(txs);
    txs.executeSql(query, [], travelnameresultbyuserid, errorHandler);
}
function travelnameresultbyuserid(txt, results) {
    var lengt = results.rows.length;
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            var html = $("#ddloption").clone().html();
            html = html.replace("{{id}}", results.rows.item(i).TravelId)
                       .replace("{{Name}}", results.rows.item(i).Name);
            $("#ddlTravel").append(html);
        }
    }
}
function getExpense() {
    db.transaction(function (txt) { getExpensequery(txt); }, errorHandler, successCB);

}
function getExpensequery(txn) {
   
    var query = "SELECT ExpenseTypeId,ExpenseName,CommentsRequired FROM ExpenseTypes";

    txn.executeSql(query, [], getExpensesucess, errorHandler);
}
function getExpensesucess(txt, results) {

    var lengt = results.rows.length;

    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            var html = $("#Expensetypeoption").clone().html();
            html = html.replace("{{id}}", results.rows.item(i).ExpenseTypeId)
                       .replace("{{Name}}", results.rows.item(i).ExpenseName)
                       .replace("{{CommentRequired}}", results.rows.item(i).CommentsRequired);

            $("#ddlExpense").append(html);
        }
    }
}

function edittravelexpens(expenseid) {
    db.transaction(function (txt) { editExpensequery(txt, expenseid); }, errorHandler, successCB);
}
function editExpensequery(txs, expenseid) {    
    var query = "SELECT ExpenseId,TravelId,Date,Description,Amount,ExpenseTypeId,ExpenseDocument,Duration,CurencyType,AmountToReimburse FROM UserExpenses WHERE ExpenseId =?";
    txs.executeSql(query, [expenseid], editExpensesucess, errorHandler);
}
function editExpensesucess(txn, results) {
    var lengt = results.rows.length;
    console.log("edite length=" + lengt);
    if (lengt > 0) {
      
            var expenseid = results.rows.item(0).ExpenseId;
            var description = results.rows.item(0).Description;
            var amount = results.rows.item(0).Amount;
            var currency = results.rows.item(0).CurencyType;
            var travelid = results.rows.item(0).TravelId;
            var expensetypeid = results.rows.item(0).ExpenseTypeId;
            var date = results.rows.item(0).Date;
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


      
    }
}
function UpadateExpensetransaction(expenseid, travelid, date, description, amount, expensetypeid, currencytype,image) {
  //  alert("in fn");
    db.transaction(function (txt) { updatequerymmm(txt, expenseid, travelid, date, description, amount, expensetypeid, currencytype, image) }, errorHandler, successCB);
}

function updatequerymmm(txs, expepenseid, travelid, date, description, amount, expensetypeid, currencytype,image) {
  // var d = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1) + "-" + new Date().getDate();
  //  alert("update");
    // var userid = localStorage.getItem("UserId");
    var updateExpenseStatement = "UPDATE UserExpenses SET Date=?,Amount=?,ExpenseTypeId=?,CurencyType=?,TravelId=?,ExpenseDocument=? WHERE ExpenseId=?";
    console.log(updateExpenseStatement);
    txs.executeSql(updateExpenseStatement, [date, amount, expensetypeid, currencytype, travelid, image, expepenseid], userexpensupdatesucess, errorHandler);
}
function userexpensupdatesucess(txt, results) {
    //alert("succ");
    //alert("Record Updated Successfully");
    if (results.rowsAffected = 1) {
        navigator.notification.alert("Record Updated Sucessfully...", alertDismissed, 'Expense', 'Done');
        var href = $("#btn-cancel").attr("href");
        //   alert("#" + href);
        window.location = href;
    }
  
}

////end edit expense









/// my Submission ////

function GetAllTravelByUserIdS() {
  //  alert("GetAllTravelByUserIdS")
    db.transaction(GetAllTravelByUserIdQueryS, errorHandler, successCB);
}
function GetAllTravelByUserIdQueryS(txn) {
    var userid = localStorage.getItem("UserId");
  //  alert("GetAllTravelByUserIdQueryS")
    // var query = "SELECT TravelId,Date,Description,Amount,ExpenseTypeId,CurencyType FROM UserExpenses";
    var query = "SELECT * FROM Travels WHERE UserId =? AND Status IS NOT NULL";
    txn.executeSql(query, [userid], GetAllTravelByUserIdSuccess, errorHandler);
}
function GetAllTravelByUserIdSuccess(txt, results) {
    var lengt = results.rows.length;
//  alert("travel length="+ lengt);
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
           
            console.log(results.rows.item(i).TravelId);
            console.log(results.rows.item(i).Name);
            console.log(getDateOnly(results.rows.item(i).StatusDate));
            console.log(results.rows.item(i).Status);
            var lengt = results.rows.length;
            //  alert(lengt);
            if (lengt > 0) {
                for (i = 0; i < lengt; i++) {
                    var newrow = '<tr><td>' + results.rows.item(i).Name + '</td>';
                    newrow += '<td>' +getDateOnly(results.rows.item(i).StatusDate) + '</td>';
                    newrow += '<td>' + results.rows.item(i).Status + '</td>';
                    newrow += '<td> <a data-id=' + results.rows.item(i).Travelid + ' class="travelbuttons" href="#SubmissionExpensesOFTravel-layout?TID=' + results.rows.item(i).TravelId + '">View</a> </td></tr>';
                    $("#t02").find("tbody").append(newrow);
                }
            }
        //    var html = $("#submissionLi").clone().html();
        //    html = html.replace("{{TravelName}}", results.rows.item(i).Name)
         //               .replace("{{Tid}}", results.rows.item(i).TravelId)
          //              .replace("{{submiteddate}}",getDateOnly(results.rows.item(i).StatusDate))
           //             .replace("{{Status}}", results.rows.item(i).Status)
           //             .replace("{{comment}}", results.rows.item(i).Comments);
          //  $("#SubmissionUl").append(html);
            //var query = "SELECT  ExpenseTypes.ExpenseName AS ExpenseName,  UserExpenses.* FROM ExpenseTypes INNER JOIN UserExpenses ON ExpenseTypes.ExpenseTypeId = UserExpenses.TravelId  where UserExpenses.TravelId=?";
            //console.log(query);
            //console.log(travelid);
            //txt.executeSql(query, [travelid], SgetExpensetablebyTravelId, errorHandler);
           
        }
    }
}

//function SgetExpensetablebyTravelId(txt, results) {
//    var lengt = results.rows.length;
//    if (lengt > 0) {

//        for (i = 0; i < lengt; i++) {
//            //  var travelid = results.rows.item(i).TravelId
//            var html = $("#rowrepeation").clone().html();
//            html = html.replace("{{Description}}", results.rows.item(i).Description)
//                       .replace("{{amount}}", results.rows.item(i).Amount)
//                       .replace("{{AmounttoReimburse}}", results.rows.item(i).AmountToReimburse)
//                       .replace("{{CurencyType}}", results.rows.item(i).CurencyType)
//                       .replace("{{ExpensType}}", results.rows.item(i).ExpenseTypeId)
//                       .replace("{{Date}}", results.rows.item(i).Date)
//                       .replace("{{Imagesrc}}", results.rows.item(i).ExpenseDocument);
                       
//            $("#submissionAccordian").append(html);
//        }
//        var html = $("#final").clone().html();
//        $("#submissionAccordian").append(html);
//    }
//}

////// end  of my submission ////////////////

/// get submission expenses//////////

function submissionExpensesByTID(tid) {
   // alert("submissionExpensesByTID");
    db.transaction(function (txa) { submissionAllExpensesByTIDQuery(txa, tid); }, errorHandler, successCB);
}
function submissionAllExpensesByTIDQuery(txt, travelid) {
    
    var userid = window.localStorage.getItem("UserId");
  //  var query = "select *  from userExpenses inner join ExpenseTypes on userExpenses.ExpenseTypeId=ExpenseTypes.ExpenseTypeId inner join users on users.UserId =? where userExpenses.travelId=?";
  //  var query = "SELECT * FROM UserExpenses a inner join expenseTypes b on a.ExpenseTypeId =b.ExpenseTypeId  WHERE a.TravelId=? and ifnull(a.Deleted,'false') =?";
    var query = "SELECT * FROM UserExpenses a inner join expenseTypes b on a.ExpenseTypeId =b.ExpenseTypeId  WHERE a.TravelId=? and ifnull(a.Deleted,'false') =?";
    console.log(query);
    console.log(travelid);
    txt.executeSql(query, [travelid, false], function (txt, result) { submissionExpensetablebyTravelId(txt, result); }, errorHandler);

}
function submissionExpensetablebyTravelId(txt, results) {
    var lengt = results.rows.length;
   // alert("last submission"+ lengt);
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            //  var travelid = results.rows.item(i).TravelId
            var html = $("#Submitedexpense").clone().html();
            html = html.replace("{{Description}}", results.rows.item(i).Description)
                       .replace("{{amount}}", results.rows.item(i).Amount)
                       .replace("{{AmounttoReimburse}}", results.rows.item(i).AmountToReimburse)
                       .replace("{{CurencyType}}", results.rows.item(i).CurencyType)
                       .replace("{{ExpensType}}", results.rows.item(i).ExpenseTypeId)
                       .replace("{{Date}}", getDateOnly(results.rows.item(i).Date));
            
            console.log(results.rows.item(i).ExpenseDocument);
            if (results.rows.item(i).ExpenseDocument != null) {
                html = html.replace("{{display}}", "display:block;")
                         .replace("{{src}}", results.rows.item(i).ExpenseDocument);
            } else {
                html = html.replace("{{display}}", "display:none;")
                           .replace("{{src}}", "null");
            }  
                       
            //console.log(html);
            $("#Submitexpensescontainer").append(html);

        }
    }
}

/////////////////// end submisiion expenses
function submitamountreimburse(amount, curencytype) {
    // alert("jjj");
    var aa = [];
   // alert("jjj");
    for (i = 0; i < 18; i++) {
        aa.push(amount);
    }
    console.log(aa);
    /// alert("jjk");
    db.transaction(function (txt) {
      
     //   alert("jjj");
       // console.log(a);
       /// alert("jjk");
        var uid =window.localStorage.getItem("UserId");
       // alert(uid);
        aa.push(uid);
        aa.push(curencytype);
      //  console.log(a);
        var queryreimburse = "select CASE b.Currency  WHEN b.Currency THEN ?  * a.USD   WHEN b.Currency THEN ? * a.GBP  WHEN b.Currency THEN ? * a.EUR WHEN b.Currency THEN ? * a.CHF  WHEN b.Currency THEN ? * a.JPY  WHEN b.Currency THEN ? * a.CNY  WHEN b.Currency THEN ? *a.BHD  WHEN b.Currency THEN ? * a.RUB  WHEN b.Currency THEN ? * a.DKK  WHEN b.Currency THEN ? * a.AUD  WHEN b.CurrencyTHEN ? * a.SEK  WHEN b.Currency THEN ? * a.HKD  WHEN b.Currency THEN ? * a.KRW  WHEN b.Currency THEN ? * a.MXN WHEN b.Currency THEN ? * a.SGD  WHEN b.Currency THEN ? * a.AED  WHEN b.Currency THEN ? * a.ZAR  WHEN b.Currency THEN ? * a.ARS  ELSE NULL  END as Rate  from ExchangeRate a inner join Users b on  b.UserId =? where  a.CurrencyCode=?"
        txt.executeSql(queryreimburse, aa, function (txt, results) {
            console.log(results.rows.length);
            return results.row.item(0).Rate;
        }, errorHandler);

    }, errorHandler, onsuccess)
}

////view  my Expense by date

//function getExpensebytravelid(travelid) {
//    db.transaction(function (txt) { getexpensetravelid(txt,travelid); }, errorHandler, successCB);
//}
 
//function getexpensetravelid(txs, travelid) {
    
//    var getquery = "SELECT ExpenseId,Date,Description,Amount,ExpenseTypeId,ExpenseDocument,Duration,CurencyType,AmountToReimburse FROM UserExpenses WHERE TravelId =?";
//    console.log(getquery);
//    txs.executeSql(getquery, [travelid], travelidexpenseresult, errorHandler);
//}

//function travelidexpenseresult(txt, results) {
//    var lengt = results.rows.length;

//    if (lengt > 0) {
//        for (i = 0; i < lengt; i++) {
//            var html = $("#viewexpensebydateli").clone().html();
//            html = html.replace("{{Eid}}", results.rows.item(i).ExpenseId)
//                       .replace("{{Date}}", results.rows.item(i).Date);
//            $("#viewexpensebydate").append(html);
//        }
//    }
//}
//// END view  my Expense by date
 //view expense by expenseid
function getexpensebyexpenseid(expenseid) {
    db.transaction(function (txt) { getexpensebyid(txt, expenseid); }, errorHandler, successCB);

}
function getexpensebyid(txc, expenseid) {

    var getexpensequery = "SELECT ExpenseId,Date,Description,Amount,ExpenseTypeId,ExpenseDocument,Duration,CurencyType,AmountToReimburse FROM UserExpenses WHERE ExpenseId =?";
    console.log(getexpensequery);
    txc.executeSql(getexpensequery, [expenseid], expenseidresult, errorHandler);
}
function expenseidresult(txt, results) {
    var lengt = results.rows.length;
    console.log("all rows= " + lengt);
    if (lengt > 0) {
        for (i = 0; i < lengt; i++) {
            var eid = results.rows.item(i).ExpenseId;
       //    alert(eid);
            var html = $("#expenserow").clone().html();
            console.log(html);
            html = html.replace("{{Description}}", results.rows.item(i).Description)
                       .replace("{{amount}}", results.rows.item(i).Amount)
                       .replace("{{AmounttoReimburse}}", results.rows.item(i).AmountToReimburse)
                       .replace("{{CurencyType}}", results.rows.item(i).CurencyType)
                       .replace("{{ExpensType}}", results.rows.item(i).ExpenseTypeId)
                       .replace("{{Date}}", getDateOnly(results.rows.item(i).Date))
                       .replace("{{Imagesrc}}", results.rows.item(i).ExpenseDocument)
                       .replace("{{EExpenseId}}", eid)
                       .replace("{{DExpenseId}}", eid);
          //    $("table").find("tbody").append(html);
            $("#ViewExpensesOFTravel-layout").append(html);
            console.log(html);

        }
    }
}
//      view  travel by id
function viewTravelById(id) {
   // alert(id);
    db.transaction(function (txt) { viewtravel(txt, id); }, errorHandler, successCB);
}
function viewtravel(txs, Travelid) {
    //var travelquery = "SELECT TravelId,UserId,Name,DateFrom,DateTo,Description,ifnull(SELECT sum(amount) from userExpenses where travelid =  Travels.travelid and ifnull(Deleted,'false')='false') as Amount FROM Travels WHERE TravelId =?";
    var travelquery = "SELECT TravelId,UserId,Name,DateFrom,DateTo,Description,ifnull((SELECT sum(amount) from userExpenses where travelid =Travels.travelid and   ifnull(Deleted,'false')='false' ),0) as Amount FROM Travels WHERE TravelId =?";
    console.log(txs);
    txs.executeSql(travelquery, [Travelid], viewtravelresult, errorHandler);
}
function viewtravelresult(txt, results) {
    var lengt = results.rows.length;
    console.log(results.rows.item);
    $("#container").html("");
    if (lengt > 0) {
        var html = $("#travelview").clone().html();
        console.log(results);
        html = html.replace("{{Name}}", results.rows.item(0).Name)
                   .replace("{{todate}}", getDateOnly(results.rows.item(0).DateTo))
                   .replace("{{datefrom}}", getDateOnly(results.rows.item(0).DateFrom))
                   .replace("{{amount}}", results.rows.item(0).Amount)
                   .replace("{{descr}}", results.rows.item(0).Description);
                   
        $("#container").append(html);
        console.log(html);
    }
}
//view submit travel
function viewSubmitTravelById(id) {
    // alert(id);
    db.transaction(function (txt) { viewSubmittravel(txt, id); }, errorHandler, successCB);
}
function viewSubmittravel(txs, Travelid) {
    //   var travelquery = "SELECT TravelId,UserId,Name,DateFrom,DateTo,Description FROM Travels WHERE TravelId =?";
    //var travelquery = "SELECT TravelId,UserId,Name,DateFrom,DateTo,Description,ifnull((SELECT sum(amount) from userExpenses where travelid =Travels.travelid and   ifnull(Deleted,'false')='false' ),0) as Amount FROM Travels WHERE TravelId =?";
    var travelquery = "SELECT TravelId,UserId,Name,DateFrom,DateTo,Description,ifnull((SELECT sum(amount) from userExpenses where travelid =Travels.travelid and   ifnull(Deleted,'false')='false' ),0) as Amount FROM Travels WHERE TravelId =?";
    console.log(travelquery);
    console.log(txs);
    txs.executeSql(travelquery, [Travelid], viewSubmittravelresult, errorHandler);
}
function viewSubmittravelresult(txt, results) {
    var lengt = results.rows.length;
    console.log(results.rows.item);
    $("#container122").html("");
    if (lengt > 0) {
        var html = $("#submittravelview").clone().html();
        console.log(results);
        html = html.replace("{{Name}}", results.rows.item(0).Name)
        .replace("{{todate}}", getDateOnly(results.rows.item(0).DateTo))
        .replace("{{datefrom}}", getDateOnly(results.rows.item(0).DateFrom))
        .replace("{{amount}}", results.rows.item(0).Amount)
        .replace("{{descr}}", results.rows.item(0).Description);
        
        $("#container122").append(html);
        console.log(html);
    }
}
//view  my Expense by date

function getExpensebytravelid(travelid) {
    db.transaction(function (txt) { getexpensetravelid(txt, travelid); }, errorHandler, successCB);
}

function getexpensetravelid(txs, travelid) {
    console.log(travelid);
   var getquery = "SELECT * FROM UserExpenses a inner join expenseTypes b on a.ExpenseTypeId =b.ExpenseTypeId  WHERE a.TravelId=? and ifnull(a.Deleted,'false') =?";
 //   var getquery = "SELECT * FROM UserExpenses WHERE TravelId=? and ifnull(Deleted,'false')=?";
    console.log(getquery);
    txs.executeSql(getquery, [travelid,false], travelidexpenseresult, errorHandler);
}

function travelidexpenseresult(txt, results) {
    var lengt = results.rows.length;
    console.log(lengt);

    $("#expensescontainer").empty();
    if (lengt > 0) {
       
        for (i = 0; i < lengt; i++) {
            var html = $("#expense").clone().html();

            html = html.replace("{{expensetype}}", results.rows.item(i).ExpenseName)
                       .replace("{{date}}", getDateOnly(results.rows.item(i).Date))
                       .replace("{{amount}}", results.rows.item(i).Amount)
                       .replace("{{currency}}", results.rows.item(i).CurencyType)
                       .replace("{{view}}", results.rows.item(i).ExpenseId)
                       .replace("{{delete}}", results.rows.item(i).ExpenseId)
                       .replace("{{edit}}", results.rows.item(i).ExpenseId)
                       .replace("{{TID}}", results.rows.item(i).TravelId);
            
            console.log("[" + results.rows.item(i).ExpenseDocument + "]");
            console.log(results.rows.item(i).ExpenseDocument != null);
            console.log(results.rows.item(i).ExpenseDocument != '');
            if (results.rows.item(i).ExpenseDocument != null && results.rows.item(i).ExpenseDocument != '') {
                html = html.replace("{{display}}", "display:block;")
                         .replace("{{src}}", results.rows.item(i).ExpenseDocument);
            } else {
                html = html.replace("{{display}}", "display:none;")
                           .replace("{{src}}", "null");
                         
            }              
            $("#expensescontainer").append(html);
        }
    }
}
// END view  my Expense by date
//delete expense


function DeleteExpense(expenseid) {
    db.transaction( function (txt) {
        var deletequery = "UPDATE UserExpenses SET Deleted=?  WHERE ExpenseId =?";
        console.log(deletequery);
        txt.executeSql(deletequery, [true, expenseid], function (txs, result) {
            console.log(result);
            if (result.rowsAffected == 1) {
                console.log("Delete Expense updated successfully");
            }
        }, errorHandler);

    }, errorHandler, successCB);

}
function TruncateTravels() {
    db.transaction(function (txt) {
        var deletequery = "Delete From Travels; Vacuum;";
        txt.executeSql(deletequery, [],successCB, errorHandler);
    }, errorHandler, successCB);

}

function TruncateExpenses() {
    db.transaction(function (txt) {
        var deletequery = "Delete From UserExpenses; Vacuum;";
        txt.executeSql(deletequery,[], successCB, errorHandler);
    }, errorHandler, successCB);

}
function TruncateExpenseType() {
    db.transaction(function (txt) {
        var deletequery = "Delete From ExpenseTypes; Vacuum;";
        txt.executeSql(deletequery, successCB, errorHandler);
    }, errorHandler, successCB);

}
function TruncateUsers() {
    db.transaction(function (txt) {
        var deletequery = "Delete From Users; Vacuum;";
        txt.executeSql(deletequery,[] ,successCB, errorHandler);
    }, errorHandler, successCB);

}
function TruncateExchangeRates() {
    db.transaction(function (txt) {
        var deletequery = "Delete From ExchangeRate; Vacuum;";
        txt.executeSql(deletequery, [],successCB, errorHandler);
    }, errorHandler, successCB);

}