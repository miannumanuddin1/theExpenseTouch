// JavaScript Document

$(document).ready(function (e) {

$("#UploadMediaBtnSbmt").click(function(e) {
	
	
	var GetFullpathOfMedia = $("#FullMediaPath").html();
	var mediadescription = document.getElementById("UploadMediaDescription").value;
	//alert(GetFullpathOfMedia);
	//alert(mediadescription);
	
	if(GetFullpathOfMedia=="")
	{
		navigator.notification.alert(
			'Please Choose your media file.',
			BuiltInAlert,
			'Media File not selected!',
			'OK'
		);	
	}
	else if(mediadescription=="")
	{
		navigator.notification.alert(
			'Enter Media description.',
			BuiltInAlert,
			'Empty Media Description!',
			'OK'
		);			
	}
	else
	{
		uploadPhoto(GetFullpathOfMedia);
	}
	
});

});

    var pictureSource;
    var destinationType;

    document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    function onPhotoURISuccess(imageURI) {
       window.resolveLocalFileSystemURI(imageURI, function(entry){
            //alert(entry.name + " " +entry.fullPath);
            //uploadPhoto(entry.fullPath);
			
			var filemediapath = entry.fullPath;
			$("#MediaTxtLabeled").html(filemediapath.substr(filemediapath.lastIndexOf('/') + 1));
			$("#FullMediaPath").html(filemediapath);
			
            }, function(e){
      });
			
    }

function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = this.MimeType;
			var filename = options.fileName;
			var filetype = filename.substr(filename.lastIndexOf('.') + 1);
			//alert(imageURI);
			//alert(filename);
			//alert(filetype);
            options.chunkedMode = false;
            var params = new Object(); 
            params.value1 = "test"; 
            params.value2 = "param"; 

            options.params = params; 

            var ft = new FileTransfer(); 
            ft.upload(imageURI, "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/UploadMedia", win, fail, options, true); 
			
}


function win(r) { 
            //alert("Sent"); 
            SaveMedia();
        } 

        function fail(error) { 
            //alert("An error has occurred: Code = " + error.code); 
			alert("Media Not uploaded please try again later.");
        } 


		
		
    function getPhoto(source) {		
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
          destinationType: destinationType.DATA_URL,
	    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
	    mediaType: navigator.camera.MediaType.ALLMEDIA,       
	    sourceType: source });
		
    }

    function onFail(message) {
      //alert('Failed because: ' + message);
    }






function SaveMedia()
{
	alert("SaveMedia");
	var userId = localStorage.getItem("LoginUserID");
	var Email = localStorage.getItem("LoginUserEmail");
	var MediaUrl = document.getElementById('FullMediaPath').innerHTML;
	var MediaName= MediaUrl.substr(MediaUrl.lastIndexOf('/')+1);	
	var mediadescription = document.getElementById("UploadMediaDescription").value;
	alert("SaveMedia Values");

                $.ajax({
                    type: "POST",
                      url: "http://iris.ci.evidencereport.com/WebServices/UploadMediaMobile.asmx/UploadFileInOwnLibrary",
                    data: "{'UserId': '" + userId + "','FileName':'" + MediaName + "','Description':'" + mediadescription + "','Email':'" + Email + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
						
						alert("Success");

                        if (response != null && response != "") {
                            var prods = response.d;
							alert(prods);
 
                            if (prods == "Done") 
							{
								alert("Done");
                            }
							else if (prods == "Email Not Found")
							{
								 alert("Email Not Found");
 
 	                        }
						   
                        }
                        else {
                            alert("No data to display");
                        }
                    },
                    error: function (e) {
                        alert("There was an error retrieving records." + "Error Description:  " + e.d);
                    }

                });


	
}