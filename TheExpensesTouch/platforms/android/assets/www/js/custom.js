//IRIS Android App Custom JS



// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    checkConnection();
	document.addEventListener("backbutton", onBackKeyDown, false);
	document.addEventListener("menubutton", onMenuKeyDown, false);

}

function onMenuKeyDown() {

		if($("#Home-layout").css("display") == "none")
		{
			if($("#Login-home").css("display") != "none")
			{
				return false;	
			}
			else
			{
				window.location = "#Home-layout";
			}
		}

}


function onBackKeyDown() {

		if($("#Home-layout").css("display") != "none")
		{

		var closeapp=confirm("Are you sure to close this app?");
		
			if (closeapp==true)
			{
				navigator.app.exitApp(); // To exit the app!
			}
			else
			{
				return false;	
			}

		}
		else if($("#Login-home").css("display") != "none")
		{

		var closeapp=confirm("Are you sure to close this app?");
		
			if (closeapp==true)
			{
				navigator.app.exitApp(); // To exit the app!
			}
			else
			{
				return false;	
			}
			
		}
		else if($("#ShareMediaLibrary-layout").css("display") != "none")
		{
			window.location = "#MediaLibrary-layout";
			fnMediaLibrary(localStorage.getItem("LoginUserID"));
		}
		else if($("#ChangePasswordaccount-layout").css("display") != "none")
		{
			window.location = "#accountsetting-layout";
		}
		else if($("#ChangeUserName-layout").css("display") != "none")
		{
			window.location = "#accountsetting-layout";
		}
		else if($("#ChangeEmailAddress-layout").css("display") != "none")
		{
			window.location = "#accountsetting-layout";
		}
		else if($("#payments-layout").css("display") != "none")
		{
			if($("#paywithPaypalcontainer").css("display") != "none")
			{
				$("#paywithPaypalcontainer").slideUp(1000);
			}
			else
			{
			window.location = "#accountsetting-layout";
			}
		}
		else if($("#PaymentViaCreditCard-layout").css("display") != "none")
		{
			creditfieldempty();
			window.location = "#payments-layout";
		}
		else if($(".SubMenuForReports").css("display") != "none")
		{		
			$(".SubMenuForReports").fadeOut(500);
		}

		else if($(".SubMenuForForms").css("display") != "none")
		{		
			$(".SubMenuForForms").fadeOut(500);
		}

		else if($("#EditMyReprot-layout").css("display") != "none")
		{
			window.location = "#MyReportsView-layout";
		}

		else if($("#EditMyforms-layout").css("display") != "none")
		{
			window.location = "#MyFormsView-layout";
		}

		else if($("#sendreprot-layout").css("display") != "none")
		{
			window.location = "#MyReportsView-layout";
		}
		else if($("#signup-layout").css("display") != "none")
		{
			emptysignupform();
			window.location = "#Login-home";
		}
		else if($("#uploadmedia-layout").css("display") != "none")
		{
			$("#MediaTxtLabeled").html("");
			$("#FullMediaPath").html("");
			$("#UploadMediaDescription").val("");
			window.location = "#MediaLibrary-layout";
		}
		else
		{
			window.location = "#Home-layout";	
			setTimeout(function(){
				$("#MainPageTitle .km-view-title span").html("Welcome " + localStorage.getItem("LoginUserName")); 
			},2000);

		}
	
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



//Jquery OnLoad
$(document).ready(function (e) {

CheckIfUserLoginStatus();

//Logout Button	  
$("#Logout").click(function(e) {
	Logout();
});
//Logout Button


//SignUp Button	  
$("#SignUpPageBtn").click(function(e) {
	window.location = "#signup-layout";
});
//SignUp Button

	  
//OnClick Login Button	  
$("#Login").click(function(e) {    	
	var username = $("#EmailAddress").val();
		var Password = $("#Password").val();
		
		if(username=="")
		{
			LoginError("Enter your email address.");
		}
		else if(Password=="")
		{			
			LoginError("Enter your password.");
		}
		else
		{
			checkConnection();
			if(ConnectionStatus=="No network connection")
			{
				LoginError("No network connection.");
			}
			else
			{
				SignIn(username, Password);
			}
		}
});
//OnClick Login Button Function End	  




//Log Activity Menu Btn
$("#Log").click(function(e) {
	checkConnection();
			if(ConnectionStatus=="No network connection")
			{
				navigator.notification.alert(
					'No network connection! First connect with your internet.',
					BuiltInAlert,
					'No network connection',
					'Done'
				);			
			}
			else
			{
				window.location = "#Log-layout";
				ActivityLog(localStorage.getItem("LoginUserID"))				
			}
			
});
//Log Activity Menu Btn End



//My Reports Menu Btn start
$("#MediaLibrary").click(function(e) {	
	checkConnection();
			if(ConnectionStatus=="No network connection")
			{
				navigator.notification.alert(
					'No network connection! First connect with your internet.',
					BuiltInAlert,
					'No network connection',
					'Done'
				);			
			}
			else
			{
				window.location = "#MediaLibrary-layout";
				fnMediaLibrary(localStorage.getItem("LoginUserID"));				
			}
});
//My Reports Menu Btn End



//MyReports Menu Btn
$("#MyReports").click(function(e) {
	$(".SubMenuForReports").css("display", "none");
	checkConnection();
			if(ConnectionStatus=="No network connection")
			{
				navigator.notification.alert(
					'No network connection! First connect with your internet.',
					BuiltInAlert,
					'No network connection',
					'Done'
				);			
			}
			else
			{
				window.location = "#MyReportsView-layout";
				showmyreports();
			}
});




//MyReports Menu Btn
$("#MyForms").click(function(e) {
	$(".SubMenuForForms").css("display", "none");
	checkConnection();
			if(ConnectionStatus=="No network connection")
			{
				navigator.notification.alert(
					'No network connection! First connect with your internet.',
					BuiltInAlert,
					'No network connection',
					'Done'
				);			
			}
			else
			{
				window.location = "#MyFormsView-layout";
				showmyforms();
			}
});



//Account Setting Menu Btn
$("#Accounts").click(function(e) {
	checkConnection();
			if(ConnectionStatus=="No network connection")
			{
				navigator.notification.alert(
					'No network connection! First connect with your internet.',
					BuiltInAlert,
					'No network connection',
					'Done'
				);			
			}
			else
			{
				window.location = "#accountsetting-layout";
				accountsettingDataSet();
			}
});
//Account Setting Menu Btn End

$(".MenuBtn").click(function(e) {
		setTimeout(function(){
			$("#MainPageTitle .km-view-title span").html("Welcome " + localStorage.getItem("LoginUserName")); 
		},2000);    
});



//Click actions media library

$('#MediaActions').live('change',function(){
	
	var OptionID = $(this).children(":selected").attr("id");
	var MLID = $(this).children(":selected").attr("mlid");
	var OptionTxt = $(this).children(":selected").text();
	
	if(OptionTxt=="Download")
	{
		download(OptionID);
	}
	else if(OptionTxt=="Delete")
	{
		DeleteMedia(OptionID);
	}
	else if(OptionTxt=="Share")
	{
		window.location = "#ShareMediaLibrary-layout";
		AddShareMediaValus(OptionID, MLID);
	}
});	



					

//ShareMedia Btn
$("#ShareMediaSendBtn").click(function(e) {
if($("#ShareEmailStore").val()=="")
	{
				navigator.notification.alert(
					'Empty Email Address! Please enter email address to share.',
					BuiltInAlert,
					'Empty Email Address',
					'OK'
				);			
		
	}
	else
	{
		sharemedia();
	}   
});

//Change password btn
$("#ChangePasswordBtn").click(function(e) {
	changeaccountpassword();
});


//Change UESRNAME btn
$("#ChangeUserNameBtn").click(function(e) {
	changeaccountUsername();
});


//Change Email btn
$("#ChangEmailAddressBtn").click(function(e) {
	changeaccountEmailAddress();
});



//ManageAccount Btn btn
$("#gOTOpaymentsBtn").click(function(e) {
	window.location = "#payments-layout";
	LoadAccountInfo();
});



//PayWith Pay Pal Btn btn
$("#paywithPaypalBtn").click(function(e) {	
	if($("#paywithPaypalcontainer").css("display") != "none")
	{
		$("#paywithPaypalcontainer").slideUp(1000);
		$("#ddlSubscription").html("");
		$("#ddlSubscription").append("<option>Select Subscription Plan</option>");
	}
	else
	{
		$("#paywithPaypalcontainer").slideDown(1000);
		appenSubscriptionplans();
	}

});


//pay with Credit Card Click
$("#paywithcreditcardbtn").click(function(e) {	
	window.location = "#PaymentViaCreditCard-layout";
});


//Add credit card
$("#addcreditcardbtn").click(function(e) {	
	addcreditcard();
});



//Edit Report
$("#Menueditmyreport").click(function(e) {	
	window.location = "#EditMyReprot-layout";
	$(".SubMenuForReports").css("display", "none");
	$("#txteditreportname").val("");
	$("#txteditpasswordreport").val("");
});


//Send Report
$("#sendreportlock").click(function(e) {	
	window.location = "#sendreprot-layout";
	$(".SubMenuForReports").css("display", "none");
});

$("#sendreportunlock").click(function(e) {
	window.location = "#sendreprot-layout";
	$(".SubMenuForReports").css("display", "none");	
});

//Delete Report
$("#smdeletereportunlock").click(function(e) {	
	$(".SubMenuForReports").fadeOut(500);
	deletereport();
});

//Delete Report
$("#deletereportlocked").click(function(e) {	
	$(".SubMenuForReports").fadeOut(500);
	deletereport();
});



//OnSendReportClick
$("#sendreportonemailBtn").click(function(e) {
	sendreporttoemail();
});


//Lock Report
$("#smlockreport").click(function(e) {
	lockreportfunction();
});


//Lock Form
$("#smlockforms").click(function(e) {
	lockformsfunction();
});


//Delete Form
$("#smdeleteformsunlock").click(function(e) {
	deleteformsfunction();
});

//Edit Form
$("#Menueditmyforms").click(function(e) {
	$(".SubMenuForForms").css("display", "none");
	window.location = "#EditMyforms-layout";
});


//EditReport SaveBtn
$("#BtnEditReport").click(function(e) {
	editreportsaveData();
});


//Edit From SaveBtn
$("#BtnEditforms").click(function(e) {
	EditFormFunc();
});




//Signup Btn Submit


$("#SignUpBtnSbmt").click(function(e) {
	signupuser();
});



//Upload Media Button	  
$("#gotouploadMedia").click(function(e) {
	//alert("ok");
	window.location = "#uploadmedia-layout";
});
//Upload Media Button


});



var reportname;
var reportGUID;
var reportversionGUID;
var reportpageGUID;
var reportpassword;
var reportID;
var reportstatusid;

//report live click

$('#MyReportsDisplay li a').live('click',function(){

	var reportstatus = $(this).attr("status");
;
//Report info get 
	reportname = $(this).attr("reportname");
	reportGUID = $(this).attr("reportGUID");
	reportversionGUID = $(this).attr("versionGUID");
	reportpageGUID = $(this).attr("pageGUID");
	reportpassword = $(this).attr("reportpassword");
	reportID = $(this).attr("reportid");
	reportstatusid = $(this).attr("statusreport");

//show submenu	
	if(reportstatus=="lock")
	{
		$(".SubMenuForReports").fadeIn(500);
		$("#menuforlockedreport").css("display", "block");
		$("#menuforunlockedreport").css("display", "none");
	}
	else if(reportstatus=="unlock")
	{
		$(".SubMenuForReports").fadeIn(500);
		$("#menuforlockedreport").css("display", "none");
		$("#menuforunlockedreport").css("display", "block");	
	}
	
});	








//report live click
var FormId;
var formGuid;
var formversionGuid;
var TopPageGuidForm;

$('#MyFormsDisplay li a').live('click',function(){

;
//Form info get 
	FormId = $(this).attr("FormId");
	formGuid = $(this).attr("formGuid");
	formversionGuid = $(this).attr("formversionGuid");
	TopPageGuidForm = $(this).attr("TopPageGuid");

//show submenu	
		$(".SubMenuForForms").fadeIn(500);
		$("#menuforunlockedforms").css("display", "block");
	
});	







function BuiltInAlert() {

}
//Error Display for Login Page
function LoginError(Msg)
{
	$("#Login-home .Error").html(Msg)	
	$("#Login-home .Error").css("display", "block");
	
	setTimeout(function(){		
		$("#Login-home .Error").fadeOut(2000);
	},4000);
}
//Error Display for Login Page ENd


//Login Function
function SignIn(username, password)
{
$("#Login").css("display", "none");
$(".LoginFrieldsContainer #Loader").css("display", "block");


$.ajax({   type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/btnLogIn_Click",
                data: "{'email': '" + username + "','password':'" + password + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
					$("#Login").css("display", "block");
					$(".LoginFrieldsContainer #Loader").css("display", "none");

                    if (response != null && response != "") {
                        var prods = response.d;
                        if (prods == "false") {
                            LoginError("Wrong username and password");
                        }
                        else
                        {
                            var splitString = prods.split(",");
							var LoginUserID = splitString[0]
							var LoginUserName = splitString[1];
							var LoginUserEmail = username;
							localStorage.setItem("LoginUserID", LoginUserID);
							localStorage.setItem("LoginUserName", LoginUserName);
							localStorage.setItem("LoginUserEmail", LoginUserEmail);
							$("#EmailAddress").val("");
							$("#Password").val("");
							window.location = "#Home-layout";	

							setTimeout(function(){		
								$("#MainPageTitle .km-view-title span").html("Welcome " + LoginUserName); 
							},2000);							

                        }
               
                    }
                    else 
					{
						LoginError("No data to display");
                    }

                },
                error: function (e) {
					LoginError("There was an error retrieving records. Please Try Again.");
					$("#Login").css("display", "block");
					$(".LoginFrieldsContainer #Loader").css("display", "none");
                }
            });			
}
//Login Function End



//Logout Function Start
function Logout()
{
	localStorage.removeItem("LoginUserID");
	localStorage.removeItem("LoginUserName");
	localStorage.removeItem("LoginUserEmail");
	window.location = "#Login-home";
}
//Logout Function End


//User Check Login Status Functions
function CheckIfUserLoginStatus()
{
	if(localStorage.getItem("LoginUserEmail") == null || localStorage.getItem("LoginUserEmail") == "")
	{
	}
	else
	{
		
		window.location = "#Home-layout";
				
		setTimeout(function(){
			$("#MainPageTitle .km-view-title span").html("Welcome " + localStorage.getItem("LoginUserName")); 
		},2000);
									
	}
}

function CheckIfUserNotLoginStatus()
{
	if(localStorage.getItem("LoginUserEmail") == null || localStorage.getItem("LoginUserEmail") == "")
	{
		window.location = "#Login-home";
	}
}
//User Check Login Status Functions ENd

//Activity Log
function ActivityLog(UserId)
{
	$("#LogLoader").css("display", "block");						
	$("#ActivityLogContainer").html("");
	$("#ActivityLogContainer").css("display", "none");

	
 	            $.ajax({					
                type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/logReport",
                data: "{'UserId':'" + UserId + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
				
				    if (response != null && response != "") 
					{
                        var prods = response.d;
                       // alert(prods);
                        var myArray = prods.split(';');
                       // alert("Length" +myArray.length);
                        for (var i=0; i<myArray.length-1; i++)
                        {
                            var Array = myArray[i].split('$');
							
							if (Array[0]!="")
                            {
							
								if (Array[0] =="Report Created")
								{
								
									$("#ActivityLogContainer").append('<tr><td> The Report <span>' + Array[1] + '</span> Has been Created</td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');	
									
								}
								

                                if (Array[0] =="Report Updated")
                                {
                                    //alert("2");
                                    $("#ActivityLogContainer").append('<tr><td> The Report <apen>' + Array[1] + '</span> Has been Updated</td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }


                                if (Array[0] =="Report Version Locked")
                                {
                                    //alert("3");
                                    $("#ActivityLogContainer").append('<tr><td> The Report <span>' + Array[1] + '</span> Has been Locked</td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }



                                if (Array[0] == "Report Version Created")
                                {
                                    //alert("4");
                                    $("#ActivityLogContainer").append('<tr><td> A new version of <span>' + Array[1] + '</span> Has been Created</td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }



                                if (Array[0] == "Report Version Deleted")
                                {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> The Report <span>' + Array[1] + '</span> Has been Deleted</td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // Page
                                if (Array[0] == "Page Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Page <span>' + Array[2] + '</span> Has been Created on Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Page Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Page <span>' + Array[2] + '</span> Has been Updated of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Page Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Page <span>' + Array[2] + '</span> Has been Deleted of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // PDF Generate
                                if (Array[0] == "PDF Generated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> You Have Generated PDF of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // Report Sent
                                if (Array[0] == "Report Sent") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> You Have Sent the Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // Paragraph
                                if (Array[0] == "Paragraph Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Paragraph has been added on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Paragraph Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Paragraph has been updated on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Paragraph Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Paragraph has been deleted on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Image
                                if (Array[0] == "Image Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An Image has been added on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Image Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An Image has been updated on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Image Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An Image has been deleted on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // Image with paragraph
                                if (Array[0] == "ImageWithParagraph Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An image with Paragraph has been added on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "ImageWithParagraph Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An image with Paragraph has been updated on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "ImageWithParagraph Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An image with Paragraph has been deleted on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // Multiple Image With Paragraph
                                if (Array[0] == "MultipleImageParagraph Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> The multiple images with Paragraph has been added on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "MultipleImageParagraph Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> The multiple images with Paragraph has been updated on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "MultipleImageParagraph Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> The multiple images with Paragraph has been deleted on  page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Section Break
                                if (Array[0] == "SectionBreak Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A section Break has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "SectionBreak Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A section Break has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "SectionBreak Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A section Break has been deleted on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Line
                                if (Array[0] == "Line Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A line has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Line Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A line has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Line Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A line has been deleted on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // Text Box
                                if (Array[0] == "Textbox Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A textbox has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Textbox Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A textbox has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Textbox Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A textbox has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //TextArea
                                if (Array[0] == "TextArea Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A textarea has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "TextArea Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A textarea has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "TextArea Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A textarea has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Button
                                if (Array[0] == "Button Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A button has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Button Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A button has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Button Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A button has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //HyperLink
                                if (Array[0] == "Hyperlink Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A hyperlink has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Hyperlink Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A hyperlink has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Hyperlink Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A hyperlink has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // Audio
                                if (Array[0] == "Audio Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An Audio file has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Audio Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An Audio file has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Audio Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> An Audio file has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Video
                                if (Array[0] == "Video Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A video file has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Video Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A video file has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Video Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A video file has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Radio
                                if (Array[0] == "Radio Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A rideo button has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Radio Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A rideo button has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Radio Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A rideo button has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Checkbox
                                if (Array[0] == "Checkbox Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A checkbox has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Checkbox Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A checkbox has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Checkbox Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A checkbox has been deleted on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Space
                                if (Array[0] == "Space Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A space has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Space Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A space has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Space Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A space has been deleted on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //Word
                                if (Array[0] == "Word Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft word document has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Word Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft word document has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Word Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft word document has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }

                                // Excel
                                if (Array[0] == "Excel Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft excel document has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Excel Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft excel document has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "Excel Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft excel document has been deleted on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                // PowerPoint
                                if (Array[0] == "PowerPoint Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft powerpoint document has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "PowerPoint Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft powerpoint document has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "PowerPoint Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> A Microsoft powerpoint document has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                //PDF
                                if (Array[0] == "PDF Created") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> The PDF document has been added on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "PDF Updated") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> The PDF document has been updated on page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }
                                if (Array[0] == "PDF Deleted") {
                                    //alert("5");
                                    $("#ActivityLogContainer").append('<tr><td> The PDF document has been deleted from page <span>' + Array[2] + '</span> of Report <span>' + Array[1] + '</span></td><td>' + Array[4] + ' at ' + Array[5] + '</td></tr>');
                                }

								
							}
							
						}
						
						//End Loop
						
						$("#LogLoader").css("display", "none");						
						$("#ActivityLogContainer").css("display", "block");
						
					}
					
                },
                error: function (e) {
					$("#LogLoader").css("display", "none");						
                    alert("There was an error retrieving records. Check your internet connection");
                }

            	});

	
}
//Activity Log End


//My ReportsFunction Start
function fnMediaLibrary(Id)
{
	$("#MediaLibraryContainer").html("");
	$("#MediaLibraryContainer").css("display", "none");
	$("#MediaLibraryLoader").css("display", "block");

	            $.ajax({

                type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/LoadMediaContents",
               // url: "WebService.asmx/LoadMediaContents",
                //url: "http://rnws1.2bvision.com/WebService.asmx/UpdatePhAndAddressChanges",
                //data: "{'id': '" + Id + "'}",
                data: "{'userId':'"+ Id + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
					
                    if(response.d!="")
                    {
                        var prods = response.d;
                      //  alert(prods);
                        var MyArray = prods.split("%");
                        //alert(MyArray[0]);
                        //alert(MyArray[1]);
                        for(var i=0; i<MyArray.length - 1; i++)
                        {
                            var Array = MyArray[i].split("$");
                            //alert(Array[0]);
                            if (Array[2] == "image")
                            {
                                $("#MediaLibraryContainer").append('<tr><td>' + "<img src='" + Array[0] + "'>" + '</td><td>' + Array[2] + " | " + Array[3] + " | " + Array[1] + "<select id='MediaActions'><option>Select Action</option><option id='" + Array[6] + "'>Download</option><option id='" + Array[7] + "'>Delete</option><option id='" + Array[1] + "' mlid='" + Array[5] + "'>Share</option></select>" + '</td></tr>');
                            }
                            else {
                                $("#MediaLibraryContainer").append('<tr><td>' + "<img src='" + Array[0] + "'>" + '</td><td>' + Array[2] + " | " + Array[3] + "|" + Array[1] + "<select id='MediaActions'><option>Select Action</option><option id='" + Array[6] + "'>Download</option><option id='" + Array[7] + "'>Delete</option><option id='" + Array[1] + "' mlid='" + Array[5] + "'>Share</option></select>" + '</td></tr>');
                            }
                       }
					   

					   $("#MediaLibraryContainer").css("display", "block");
					   $("#MediaLibraryLoader").css("display", "none");


                    }

                },
                error: function (e) {
					$("#MediaLibraryLoader").css("display", "none");						
                    alert("There was an error retrieving records. Check your internet connection");
                }

            });

}
//My ReportsFunction End



//Download Media Library
function download(FilePath) {
	
                var Id = localStorage.getItem("LoginUserID");
                var username = localStorage.getItem("LoginUserName");
                var Email = localStorage.getItem("LoginUserEmail");
				

				
            var remoteFile = "http://iris.reportninja.org/Editor/" + FilePath;
            //alert(remoteFile);
            var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/') + 1);

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                fileSystem.root.getFile(localFileName, { create: true, exclusive: false }, function (fileEntry) {
                    var localPath = fileEntry.fullPath;
                    if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                        localPath = localPath.substring(7);
                    }
                    var ft = new FileTransfer();
                    ft.download(remoteFile,
                        localPath, function (entry) {
                            var dwnldImg = document.getElementById("dwnldImg");
                            dwnldImg.src = entry.fullPath;
                            //dwnldImg.style.visibility = "visible";
                            //dwnldImg.style.display = "block";
                        }, fail);
                      ft.onprogress = function (progressEvent) {
                        if (progressEvent.lengthComputable) {
                            loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                        } else {
                            loadingStatus.increment();
                        }
                    };
                }, failDownload);
            }, failDownload);
			
				navigator.notification.alert(
					'Media Downloaded Successfully.',
					BuiltInAlert,
					'Media Downloaded',
					'Done'
				);			

				fnMediaLibrary(localStorage.getItem("LoginUserID"))				

           // window.location = "MediaLibrary.html?id=" + Id + "&username=" + username + "&Email=" + Email + "";
}
       
function failDownload(error) {
 	navigator.notification.alert(
		error.code,
		BuiltInAlert,
		'Something went wrong',
		'Ok'
	);			
}
		
		
// Delete Media
        function DeleteMedia(MediaContentId) {
            var MediaId = MediaContentId;

            $.ajax({

                type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/DeleteMediaContents",
                data: "{'MediaContentId':'" + MediaId + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.d != "") {
                      
                        {
							navigator.notification.alert(
								'Media Has been Deleted Successfuly',
								BuiltInAlert,
								'Deleted Successfuly',
								'Done'
							);			

							fnMediaLibrary(localStorage.getItem("LoginUserID"));
						
                        }
                    }

                },
                error: function (e) {
                    alert("There was an error retrieving records." + "Error Description:  " + e.d);
                }

            });
        }

		function AddShareMediaValus(ImageName, MLID)
		{
			$("#ImageNameStore").val(ImageName);
			$("#MLIDStore").val(MLID);	
		}
		
		//Share Media Function
		function sharemedia()
		{
            var userId = localStorage.getItem("LoginUserID");
            var userName = localStorage.getItem("LoginUserName");
            var Email = $("#ShareEmailStore").val();
			var ImageName = $("#ImageNameStore").val();
			var MLID = $("#MLIDStore").val();
			
			$("#ShareMediaSendBtn").css("display", "none");
			$("#MsgProcessing").css("display", "block");

                $.ajax({
                    type: "POST",
                      url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/ShareMediaFile",
                  //  url: "WebService.asmx/ShareMediaFile",
                    //data: "{'id': '" + Id + "'}",
                    data: "{'SenderName': '" + userName + "','EmailAddress':'" + Email + "','GUID':'" + MLID + "','ImageName':'" + ImageName + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        if (response != null && response != "") {
                            var prods = response.d;
							
                            if (prods == "Success") {
								navigator.notification.alert(
									'Media Content has been Shared successfully.',
									BuiltInAlert,
									'Media Shared',
									'OK'
								);	
								
								$("#ShareEmailStore").val("");		
								window.location = "#MediaLibrary-layout";
								fnMediaLibrary(localStorage.getItem("LoginUserID"));				
                           
						   }
						   
                            if (prods == "Email Not Found") {
								navigator.notification.alert(
									'Email Id Does not Exist in IRIS Users.',
									BuiltInAlert,
									'Email Id Does not Exist',
									'OK'
								);			
                            }

                        }
                        else {
                            alert("No data to display. Please Try again.");
                        }
						
						$("#ShareMediaSendBtn").css("display", "block");
						$("#MsgProcessing").css("display", "none");
                    },
                    error: function (e) {
                        alert("There was an error retrieving records." + "Error Description:  " + e.d);
						$("#ShareMediaSendBtn").css("display", "block");
						$("#MsgProcessing").css("display", "none");
                    }
                });
		}
		
		
		
//Account Data Set Function
function accountsettingDataSet()
{
	$("#AccountPageMsgToDisplay").css("display", "block");	
	$("#AccountSetting").css("display", "none");
	$("#AccountStatusMsg").html("");
	$("#AccountUserName").html(localStorage.getItem("LoginUserName"));		
	$("#AccountEmailAddress").html(localStorage.getItem("LoginUserEmail"));		
	var id = localStorage.getItem("LoginUserID");

            $.ajax({

                type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/AccountDetail",
                data: "{'UserId':'" + id + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.d != null && response.d != "") {
                        var prods = response.d;
                        var MyArray = prods.split("%");
                        var Array = MyArray[0].split("$");

                        document.getElementById("AccountStatusMsg").innerHTML = Array[2];

						setTimeout(function(){
							$("#AccountPageMsgToDisplay").css("display", "none");	
							$("#AccountSetting").css("display", "block");
						},4000);

                    }
                },
                error: function (e) {
					$("#AccountPageMsgToDisplay").css("display", "none");	
					$("#AccountSetting").css("display", "block");
                    alert("There was an error retrieving records. Error Description:  " + e.d);
                }

            });

}


//change password function
function changeaccountpassword()
{
	var newpasswordValue = document.getElementById("PswdNewPassword").value;
	var confirmpasswordValue = document.getElementById("PswdConfirmPassword").value;
    var Id = localStorage.getItem("LoginUserID");
    var username = localStorage.getItem("LoginUserName");
    var Email = localStorage.getItem("LoginUserEmail");

	
	if(newpasswordValue=="")
	{
		navigator.notification.alert(
			'Please enter a new password.',
			BuiltInAlert,
			'Empty Password!',
			'OK'
		);			
	}
	else if(confirmpasswordValue=="")
	{
		navigator.notification.alert(
			'Please enter confirm password.',
			BuiltInAlert,
			'Empty Confirm Password!',
			'OK'
		);	
	
	}
	else
	{
		if(newpasswordValue!=confirmpasswordValue)
		{
			navigator.notification.alert(
				'Please enter same password in both fields to change.',
				BuiltInAlert,
				'Password Does not match!',
				'OK'
			);				
		}
		else
		{
			$("#ChangePasswordBtn").css("display", "none");
			$("#changepasswordwaitingmsg").css("display", "block");
			
				$.ajax({
	
					type: "POST",
					url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/FnChangePassword",
					data: "{'Id':'" + Id + "','changePassword':'" + document.getElementById("PswdNewPassword").value + "','Email':'" + Email + "','username':'" + username + "'}",
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (response) {
						if (response.d == "Done") {
							navigator.notification.alert(
								'Password Change successfully.',
								BuiltInAlert,
								'Password Changes',
								'OK'
							);			
							$("#PswdNewPassword").val("");
							$("#PswdConfirmPassword").val("");
							window.location = "#accountsetting-layout";
						}
						else {
							navigator.notification.alert(
								'There Was Error In changing Password.',
								BuiltInAlert,
								'Please Try Again!',
								'OK'
							);			
						}
						
					$("#ChangePasswordBtn").css("display", "block");
					$("#changepasswordwaitingmsg").css("display", "none");

					},
					error: function (e) {
						$("#ChangePasswordBtn").css("display", "block");
						$("#changepasswordwaitingmsg").css("display", "none");
						alert("There was an error retrieving records." + "Error Description:  " + e.d);
					}
	
				});
		}
	}
}



//Change username function
function changeaccountUsername()
{
	var newUserNameValue = document.getElementById("TxtNewUserName").value;
    var Id = localStorage.getItem("LoginUserID");

	if(newUserNameValue=="")
	{
		navigator.notification.alert(
			'Please enter new username to change.',
			BuiltInAlert,
			'Empty Username!',
			'OK'
		);					
	}
	else
	{
			$("#ChangeUserNameBtn").css("display", "none");
			$("#changeusernamewaitingmsg").css("display", "block");

            $.ajax({
             type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/ChangeUserName",
                data: "{'Id':'" + Id + "','ChangedUserName':'" + newUserNameValue + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.d == "Done") {
							localStorage.setItem("LoginUserName", newUserNameValue);
							navigator.notification.alert(
								'Username Changed successfully.',
								BuiltInAlert,
								'Username Changed.',
								'DONE'
							);			
							$("#TxtNewUserName").val("");
							$("#AccountUserName").html(localStorage.getItem("LoginUserName"));		
							window.location = "#accountsetting-layout";
							$("#ChangeUserNameBtn").css("display", "block");
							$("#changeusernamewaitingmsg").css("display", "none");
                    }
                    else if (response.d = "Exists") {
							$("#ChangeUserNameBtn").css("display", "block");
							$("#changeusernamewaitingmsg").css("display", "none");
							navigator.notification.alert(
								'A user already exists with this email address. Please choose a different email address.',
								BuiltInAlert,
								'user already exists with this email address.',
								'OK'
							);			
                    }
                },
                error: function (e) {
                    alert("There was an error retrieving records." + "Error Description:  " + e.d);
                }
            });
	}
}



//Change Email Address

function changeaccountEmailAddress()
{
	
	var NewEmailValue = document.getElementById("TxtNewEmailAddress").value;
    var Id = localStorage.getItem("LoginUserID");
    var username = localStorage.getItem("LoginUserName");
    var Email = localStorage.getItem("LoginUserEmail");
	var EmailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	
	if(NewEmailValue=="")
	{
		navigator.notification.alert(
			'Please enter new email address to change.',
			BuiltInAlert,
			'Empty email address!',
			'OK'
		);					
	}
	else if(!EmailFormat.test(NewEmailValue))
	{
		navigator.notification.alert(
			'Email format is not correct. Please enter an invalid email address format.',
			BuiltInAlert,
			'Invalid Email Address!',
			'OK'
		);
		$("#TxtNewEmailAddress").val("");	
	}
	else
	{
			$("#ChangEmailAddressBtn").css("display", "none");
			$("#changeEmailAddresswaitingmsg").css("display", "block");

            $.ajax({
                type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/ChangeUserEmail",
                data: "{'Id':'" + Id + "','username':'" + username + "','ChangedEmail':'" + document.getElementById("TxtNewEmailAddress").value + "','OldEmail':'" + Email + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response.d == "Done") {
							navigator.notification.alert(
								'You must have to login again with new email address.',
								BuiltInAlert,
								'Account SIGNOUT.',
								'LOGIN'
							);			
							navigator.notification.alert(
								'Email Address Changed successfully.',
								BuiltInAlert,
								'Email Address Changed.',
								'DONE'
							);			
							$("#TxtNewEmailAddress").val("");
							Logout();
                    }
                    else if(response.d="Exists") {
							navigator.notification.alert(
								'A user already exists with this email address. Please choose a different email address.',
								BuiltInAlert,
								'User already exists with this email address.',
								'OK'
							);			
                    }
					$("#ChangEmailAddressBtn").css("display", "block");
					$("#changeEmailAddresswaitingmsg").css("display", "none");
                },
                error: function (e) {
					$("#ChangEmailAddressBtn").css("display", "block");
					$("#changeEmailAddresswaitingmsg").css("display", "none");
                    alert("There was an error retrieving records." + "Error Description:  " + e.d);
                }
            });
	}
}


//Appen Subscription plans

function appenSubscriptionplans()
{
	var count = $("#ddlSubscription").children().length;
	
	if(count==1)
	{
            $.ajax({
                type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/SubscriptionPlan",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (response != null && response != "") {
                        var prods = response.d;
                        var myArray = prods.split("%");
                        var obj = document.getElementById("ddlSubscription");
                        for (var i = 0; i < myArray.length - 1; i++) {
                            var Array = myArray[i].split("#");
     document.getElementById("ddlSubscription").innerHTML += " <option value='" + Array[0] + "'>" + Array[1] + "</option>";
                        }
                    }
                },
                error: function (e) {
                    alert("There was an error retrieving records." + "Error Description:  " + e.d);
                }

            });
	}
		
}



//Subscription Plan choose function
function SubscriptionPlanPay() {

	var Id = localStorage.getItem("LoginUserID");;
	var SubscriptionPlan = $("#ddlSubscription option:selected").text();
	var SubscriptionPlanValue = $("#ddlSubscription").val();
	
	if(SubscriptionPlan=="Select Subscription Plan")
	{
			navigator.notification.alert(
				'Please select an Subscription Plan to proceed.',
				BuiltInAlert,
				'No Plan Selected.',
				'OK'
			);			
	}
	else
	{
	$("#paywithPaypalcontainer").slideUp(1000);	
		$.ajax({
			type: "POST",
			url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/IbtnPayPal_Click",
			data: "{'Id':'" + Id + "','SubscriptinPlan':'" + SubscriptionPlan + "','SubscriptinPlanValue':'" + SubscriptionPlanValue + "'}",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
	
				$("#ddlSubscription").html("");
				$("#ddlSubscription").append("<option>Select Subscription Plan</option>");
	
				if (response.d != null && response.d != "") {
					var prods = response.d;
					var ref = window.open(prods, '_blank', 'location=yes');
				}
				else {
					navigator.notification.alert(
						'No Data to display. Try Again!',
						BuiltInAlert,
						'Something went wrong.',
						'OK'
					);			
				}
			},
			error: function (e) {
				alert("There was an error retrieving records." + "Error Description:  " + e.d);
			}
	
		});
	}

}



//Load account info on payment page
function LoadAccountInfo() {

	var id = localStorage.getItem("LoginUserID");
	var PAccountInfo = $("#PAccountInfo").html();
	if(PAccountInfo=="")
	{
		$.ajax({
		   type: "POST",
			 url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/AccountDetail",
			data: "{'UserId':'" + id + "'}",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				if (response.d != null && response.d != "") {
					var prods = response.d;
					var MyArray = prods.split("%");
					var Array = MyArray[0].split("$");
					document.getElementById("PAccountInfo").innerHTML = Array[2];
				}
			},
			error: function (e) {
				alert("There was an error retrieving records." + "Error Description:  " + e.d);
			}
	
		});
	}
}




//Empty credit card form 
function creditfieldempty()
{
	document.getElementById("Txtcreditcardnumber").value = "";
	document.getElementById("txtcardholdername").value = "";
	document.getElementById("txtexpirationdate").value = "";
	document.getElementById("txtcvv").value = "";	
}

//Add Credit Card Function

function addcreditcard()
{
	var Id = localStorage.getItem("LoginUserID");
	var CardNumber = document.getElementById("Txtcreditcardnumber").value;
	var CardholderName = document.getElementById("txtcardholdername").value;
	var ExpiryDate = document.getElementById("txtexpirationdate").value;
	var CVV = document.getElementById("txtcvv").value;

	if (CardNumber == "" || CardNumber.length!=16) {
		navigator.notification.alert(
			'Empty Card Number or may be length is not equals to 16 digits.',
			BuiltInAlert,
			'Card Number is Required!',
			'OK'
		);			
		document.getElementById("Txtcreditcardnumber").focus();
	}
	else if (CardholderName == "") {
		navigator.notification.alert(
			'Card holder Name is must Required!',
			BuiltInAlert,
			'Empty Expiry Card holder Name',
			'OK'
		);			
		document.getElementById("txtcardholdername").focus();
	}
	else if (ExpiryDate == "") {

		navigator.notification.alert(
			'Expiry Date is Required!',
			BuiltInAlert,
			'Empty Expiry Date.',
			'OK'
		);			
		document.getElementById("txtexpirationdate").focus();
	}
	else if (CVV == "") {

		navigator.notification.alert(
			'CVV is Required!',
			BuiltInAlert,
			'Empty CVV.',
			'OK'
		);			
		document.getElementById("txtcvv").focus();
	}
	else
	{
		$("#addcreditcardbtn").css("display", "none");
		$("#creditcardaddmsg").css("display", "block");
		
                $.ajax({
                    type: "POST",
                    url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/CraditCardPayment",
                    data: "{'UserId':'" + Id + "','CardNumber':'" + CardNumber + "','CardholderName':'" + CardholderName + "','ExpiryDate':'" + ExpiryDate + "','CVV':'" + CVV + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        if (response != null && response != "") {
                            var prods = response.d;
                            alert(prods);
							creditfieldempty();
							window.location = "#payments-layout";
                        }
                        else {
                            alert("No data to display");
                        }
						$("#addcreditcardbtn").css("display", "block");
						$("#creditcardaddmsg").css("display", "none");
                    },
                    error: function (e) {
						$("#addcreditcardbtn").css("display", "block");
						$("#creditcardaddmsg").css("display", "none");
                        alert("There was an error retrieving records. Please check you internet connection");
                    }

                });
	}
}



//My Reports

function showmyreports()
{

	$('#myreportswaitingmsg').css("display", "block");
	$('#MyReportsDisplay').css("display", "none");

	var Id = localStorage.getItem("LoginUserID");

	$.ajax({
		type: "POST",
	 url:"http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/LoadReports",
   //    url: "WebService.asmx/LoadReports",
		data: "{'id': '" + Id + "'}",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			$("#MyReportsDisplay").html("");
			
			if (response.d != null && response.d != "") {
				
				$('#MyReportsDisplay').css("display", "block");
				$('#myreportswaitingmsg').css("display", "none");
				var prods = response.d;
				var myarray = prods.split('$');
				for (var i = 0; i < myarray.length - 1; i++)
				{
					var array = myarray[i].split("~");
	
					if (array[6] == "True")
					{
						$("#MyReportsDisplay").append("<li><a class='km-listview-link' status='lock' reportname='"+ array[0] +"' reportGUID='" + array[1] + "' versionGUID='"+ array[2] +"' pageGUID='"+ array[3] +"' reportpassword='"+ array[4] +"' reportid='"+ array[5] +"' statusreport='"+ array[6] +"'><span>" + array[0] + "</span><img src='images/lock.png' width='30'><div style='clear: both;'></div></a></li>");	
						
											
					}
					else
					{
						$("#MyReportsDisplay").append("<li><a class='km-listview-link' status='unlock' reportname='"+ array[0] +"' reportGUID='" + array[1] + "' versionGUID='"+ array[2] +"' pageGUID='"+ array[3] +"' reportpassword='"+ array[4] +"' reportid='"+ array[5] +"' statusreport='"+ array[6] +"'>" + array[0] + "</a></li>");
						
						
						
					}
				}
			}

		},
		error: function (e) {
			alert("There was an error retrieving records.");
			$('#changeEmailAddresswaitingmsg').css("display", "none");
		}

	});

}



//Send Report to email
function sendreporttoemail()
{
	var Emails = document.getElementById('Txtemailtosendreport').value;
	var EmailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var userId = localStorage.getItem("LoginUserID");
    var userName = localStorage.getItem("LoginUserName");
	
	if(Emails=="")
	{
		navigator.notification.alert(
			'Email must be required to send report.',
			BuiltInAlert,
			'Empty email address!',
			'OK'
		);					
	}
	else if(!EmailFormat.test(Emails))
	{
		navigator.notification.alert(
			'Email is not formatted properly.',
			BuiltInAlert,
			'Invalid Email Address!',
			'OK'
		);
	}
	else
	{
		
		$("#Reportsendingwaitingmsg").css("display", "block");
		$("#sendreportonemailBtn").css("display", "none");
		
	$.ajax({
		type: "POST",
		url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/SendEmailReport",
		data: "{'username': '" + userName + "','userId':'" + userId + "','reportGuid':'" + reportGUID + "','versionGuid':'" + reportversionGUID + "','reportName':'" + reportname + "','topPageGuid':'" + reportpageGUID + "','Emails':'" + Emails + "'}",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {

			if (response != null && response != "") {
				var prods = response.d;
				if (prods == "Success") {
					navigator.notification.alert(
						'Report has been sent successfully.',
						BuiltInAlert,
						'Report Send',
						'DONE'
					);
				}
			}
			else {
				alert("No data to display");
			}
			$("#Reportsendingwaitingmsg").css("display", "none");
			$("#sendreportonemailBtn").css("display", "block");
			window.location = "#MyReportsView-layout";
			$("#Txtemailtosendreport").val("");

		},
		error: function (e) {
			$("#Reportsendingwaitingmsg").css("display", "none");
			$("#sendreportonemailBtn").css("display", "block");
			alert("There was an error retrieving records.");
		}

	});	
	}
}


//Lock Report Function

function lockreportfunction()
{
	$(".SubMenuForReports").fadeOut(500);
	$("#myreportswaitingmsg").css("display", "block");
	$("#MyReportsDisplay").css("display", "none");
	$.ajax({
	type: "POST",
	url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/lockReport",
	data: "{'statusLocked':'" + reportstatusid + "','reportGuid':'" + reportGUID + "','versionGuid':'" + reportversionGUID + "','pageGuid':'" + reportpageGUID + "'}",
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function (response) {
		showmyreports();
		alert("Report Locked Successfully");
	},
	error: function (e) {
	$("#myreportswaitingmsg").css("display", "none");
	$("#MyReportsDisplay").css("display", "block");		
	alert("There was an error retrieving records.");
	}

});
		
}



//Delete Report

function deletereport()
{
	$("#myreportswaitingmsg").css("display", "block");
	$("#MyReportsDisplay").css("display", "none");		

            $.ajax({
                type: "POST",
                url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/deleteReport",
                data: "{'reportGuid':'" + reportGUID + "','versionGuid':'" + reportversionGUID + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    showmyreports();
                },
                error: function (e) {
					$("#myreportswaitingmsg").css("display", "none");
					$("#MyReportsDisplay").css("display", "block");		
                    alert("There was an error retrieving records.");
                }

            });
		
}



//Edit Report Save Data

function editreportsaveData()
{
		var reportname = document.getElementById('txteditreportname').value;
		var reportpassword = document.getElementById('txteditpasswordreport').value;

		if(reportname=="")
		{
			navigator.notification.alert(
				'Enter Report Name.',
				BuiltInAlert,
				'Empty Report Name!',
				'OK'
			);
		}
		else if(reportpassword=="")
		{
			navigator.notification.alert(
				'Password is required to change',
				BuiltInAlert,
				'Empty Password!',
				'OK'
			);
		}
		else
		{
			$("#BtnEditReport").css("display", "none");
			$("#editreportwaitingmessage").css("display", "block");
		$.ajax({
			type: "POST",
		   url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/EditReport",
			data: "{'reportId':'" + reportID + "','reportName':'" + reportname + "','reportPassword':'" + reportpassword + "'}",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				$("#BtnEditReport").css("display", "block");
				$("#editreportwaitingmessage").css("display", "none");
				showmyreports();
				window.location = "#MyReportsView-layout";
			},
			error: function (e) {
				$("#BtnEditReport").css("display", "block");
				$("#editreportwaitingmessage").css("display", "none");
				alert("There was an error retrieving records." + "Error Description:  " + e.d);
			}

		});
			
		}
}



//Show Forms

function showmyforms()
{
	$("#myformswaitingmsg").css("display", "block");
	$("#MyFormsDisplay").css("display", "none");
    var userId = localStorage.getItem("LoginUserID");
	$("#MyFormsDisplay").html("");
	
	
 $.ajax({
	type: "POST",
  url:"http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/LoadForms",
	data: "{'UserId': '" + userId + "'}",
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function (response) {
		
		if (response.d != null && response.d != "") {

			var prods = response.d;
			var myarray = prods.split('%');

			for (var i = 0; i < myarray.length - 1; i++) 
			{
				var array = myarray[i].split("$");
				$("#MyFormsDisplay").append("<li><a class='km-listview-link' FormId='" + array[7] + "' formGuid='" + array[4] + "' formversionGuid='" + array[6] + "' TopPageGuid='" + array[2] + "'>" + array[0] + "</a> </li>");
			}
			$("#myformswaitingmsg").css("display", "none");
			$("#MyFormsDisplay").css("display", "block");
		}
		else
		{
			alert("No Forms to Display");
			window.location = "#Home-layout";	
		}


	},
	error: function (e) {
		alert("There was an error retrieving records.");
	}

});
}


//Lock Forms
function lockformsfunction()
{
	$(".SubMenuForForms").fadeOut(500);
	$("#MyFormsDisplay").css("display", "none");
	$("#myformswaitingmsg").css("display", "block");

$.ajax({
	type: "POST",
   url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/LockForm",
	data: "{'formGuid':'" + formGuid + "','formversionGuid':'" + formversionGuid + "','TopPageGuid':'" + TopPageGuidForm + "'}",
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function (response) {
		if (response.d != null && response.d != "") {
			var prods = response.d;
			alert(prods);
			if (prods == "Done") {
				navigator.notification.alert(
					'Form has been locked successfully.',
					BuiltInAlert,
					'Locked Successfully',
					'Done'
				);	
				showmyforms();
			}
		}
		else
		{
			navigator.notification.alert(
				'Please Create a page In Order to lock it.',
				BuiltInAlert,
				'Form is not Locked!',
				'OK'
			);	

		showmyforms();
		}
	},
	error: function (e) {
		alert("There was an error retrieving records.");
		showmyforms();
	}

});
	
}


//deleteform

function deleteformsfunction()
{
	$(".SubMenuForForms").fadeOut(500);
	$("#MyFormsDisplay").css("display", "none");
	$("#myformswaitingmsg").css("display", "block");

            $.ajax({
                type: "POST",
               url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/DeleteForm",
                data: "{'formGuid':'" + formGuid + "','formversionGuid':'" + formversionGuid + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
				navigator.notification.alert(
					'Form Deleted successfully.',
					BuiltInAlert,
					'Success',
					'Done'
				);	
				showmyforms();

                },
                error: function (e) {
                    alert("There was an error retrieving records." + "Error Description:  " + e.d);
					showmyforms();
                }

            });



}


//Edit Form
function EditFormFunc()
{
	var formnamevalue = document.getElementById("txteditformsname").value;
	var formpassvalue = document.getElementById("txteditpasswordforms").value;
	
	if(formnamevalue=="")
	{
		navigator.notification.alert(
			'Form Name must be reuired to change.',
			BuiltInAlert,
			'Empty Form Name',
			'Done'
		);	
	}
	else if(formpassvalue=="")
	{
		navigator.notification.alert(
			'Password must be reuired to change.',
			BuiltInAlert,
			'Empty Password',
			'Done'
		);	
	}
	else
	{
		$("#BtnEditforms").css("display", "none");
		$("#editformswaitingmessage").css("display", "block");
			
		$.ajax({
			type: "POST",
			url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/EditForm",
			data: "{'formId':'" + FormId + "','formName':'" + formnamevalue + "','formPassword':'" + formpassvalue + "'}",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				if (response != null && response != "") {
					var prods = response.d;
					$("#BtnEditforms").css("display", "block");
					$("#editformswaitingmessage").css("display", "none");
					
					navigator.notification.alert(
						'Form data changed successfully.',
						BuiltInAlert,
						'Success',
						'Go Back'
					);					
					showmyforms();
					$("#txteditformsname").val("");
					$("#txteditpasswordforms").val("");
					window.location = "#MyFormsView-layout";
				}
				else {
					$("#BtnEditforms").css("display", "block");
					$("#editformswaitingmessage").css("display", "none");
					alert("Something went wrong please try again.");
				}


			},
			error: function (e) {
				$("#BtnEditforms").css("display", "block");
				$("#editformswaitingmessage").css("display", "none");
				alert("There was an error retrieving records." + "Error Description:  " + e.d);
			}

		});

	}
}




//Sign Up User
function emptysignupform()
{
	$('#SignUpFrstName').val("");
	$('#SignUpEmail').val("");
	$('#SignUpPassword').val("");
	$('#SignUpCpass').val("");
}

//Sign Up User
function signupuser()
{
	var Emails = document.getElementById('SignUpEmail').value;
	var EmailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	var SignUpFrstName = document.getElementById("SignUpFrstName").value;
	var SignUpEmail = document.getElementById("SignUpEmail").value;
	var SignUpPassword = document.getElementById("SignUpPassword").value;
	var SignUpCpass = document.getElementById("SignUpCpass").value;
	
	if(SignUpFrstName=="")
	{
		navigator.notification.alert(
			'Enter your first name.',
			BuiltInAlert,
			'Empty Name!',
			'Go Back'
		);			
	}
	else if(SignUpEmail=="")
	{
		navigator.notification.alert(
			'Enter your Email Address.',
			BuiltInAlert,
			'Empty Email Address!',
			'Go Back'
		);			
	}
	else if(!EmailFormat.test(Emails))
	{
		navigator.notification.alert(
			'Email is not formatted properly.',
			BuiltInAlert,
			'Invalid Email Address!',
			'Go Back'
		);
	}
	else if(SignUpPassword=="")
	{
		navigator.notification.alert(
			'Enter your Password.',
			BuiltInAlert,
			'Empty Password!',
			'Go Back'
		);			
	}
	else if(SignUpCpass=="")
	{
		navigator.notification.alert(
			'Enter your Confirm Password.',
			BuiltInAlert,
			'Empty Confirm Password!',
			'Go Back'
		);			
	}
	else if(SignUpPassword!=SignUpCpass)
	{
		navigator.notification.alert(
			'Password Does not match.',
			BuiltInAlert,
			'Password Not Match!',
			'Go Back'
		);			
	}
	else
	{

	var SignUpFrstName = document.getElementById("SignUpFrstName").value;
	var SignUpEmail = document.getElementById("SignUpEmail").value;
	var SignUpPassword = document.getElementById("SignUpPassword").value;
	var SignUpCpass = document.getElementById("SignUpCpass").value;
	
	$("#SignUpBtnSbmt").css("display", "none");
	$("#SignUpwaitingmsg").css("display", "block");
	
		$.ajax({
			type: "POST",
			url: "http://www.ci.evidencereport.com/WebServices/Registration.asmx/UserRegistration",
			data: "{'firstName':'" + SignUpFrstName + "','email':'" + SignUpEmail + "','password':'" + SignUpPassword + "'}",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				
				alert(response.d);
				if(response.d=="your account has been created. please follow the instructions in the email sent")
				{
					emptysignupform();
					window.location = "#Login-home";
				}
					$("#SignUpBtnSbmt").css("display", "block");
					$("#SignUpwaitingmsg").css("display", "none");
			},
			error: function (e) {
				$("#SignUpBtnSbmt").css("display", "block");
				$("#SignUpwaitingmsg").css("display", "none");
				alert("Something went wrong please try again later.");
			}
		});
	}
}