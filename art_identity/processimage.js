(function() {
  // The width and height of the captured photo. We will set the
  // width to the value defined here, but the height will be
  // calculated based on the aspect ratio of the input stream.

  var width = 1367;    // We will scale the photo width to this 1280
  var height = 800;     // This will be computed based on the input stream

  // |streaming| indicates whether or not we're currently streaming
  // video from the camera. Obviously, we start at false.

  var streaming = false;

  // The various HTML elements we need to configure or control. These
  // will be set by the startup() function.

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  var sourceImageUrl = "";

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        // Firefox currently has a bug where the height can't be read from
        // the video, so we will make assumptions if this happens.
      
        if (isNaN(height)) {
          //height = width / (4/3);
          //height = width / (3/2);
          height = 500;
        }
        height = 910;
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    // startbutton.addEventListener('click', function(ev){
    //   takepicture();
    //   ev.preventDefault();
    // }, false);
    $(document).click(function() {
    takepicture();
});
    
    clearphoto();
  }

  // Fill the photo with an indication that none has been
  // captured.

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas, then converting that to a PNG
  // format data URL. By drawing it on an offscreen canvas and then
  // drawing that to the screen, we can change its size and/or apply
  // other changes before drawing it.

  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      processImage();
    } else {
      clearphoto();
    }
  }

  function makeblob(dataURL) {
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = decodeURIComponent(parts[1]);
                return new Blob([raw], { type: contentType });
            }
            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], { type: contentType });
        }

  function processImage() {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "7fc03b2864a94145a079c19d0b406477";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "true",
            //"returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        };

        // Display the image.
        sourceImageUrl = canvas.toDataURL('image/png');
        var blob = makeblob(sourceImageUrl);

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",
            processData: false,
            // Request body.
            data: blob,
        })

        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
            blurrface(data);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? 
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    }

    function blurrface(data) {
        for(var i = 0; i < data.length; i++)
        {
            var face = data[i];
            var rect = face.faceRectangle;
            var landmarks = face.faceLandmarks;
            var ctx = canvas.getContext('2d');
            var canvasColor = ctx.getImageData(landmarks.noseTip.x, landmarks.noseTip.y, 1,1); // rgba e [0,255]
            var pixels = canvasColor.data;
            var rgb = pixels[0]+','+ pixels[1]+','+pixels[2]+',0.5';

            var leftEyeX = landmarks.eyebrowLeftOuter.x;
            var leftEyeY = landmarks.eyeLeftTop.y;
            var leftEyeHeight = landmarks.eyeLeftBottom.y - leftEyeY;
            var leftEyeWidth = landmarks.eyebrowLeftInner.x - leftEyeX;
            getBlurredBG(rgb,'leftEye', leftEyeX-30, leftEyeY-50, leftEyeWidth+80, leftEyeHeight+115);
            
            var rightEyeX = landmarks.eyebrowRightInner.x;
            var rightEyeY = landmarks.eyeRightTop.y;
            var rightEyeHeight = landmarks.eyeRightBottom.y - rightEyeY;
            var rightEyeWidth = landmarks.eyebrowRightOuter.x - rightEyeX;
            getBlurredBG(rgb,'rightEye', rightEyeX-30, rightEyeY-50, rightEyeWidth+80, rightEyeHeight+115);

            var mouthX = landmarks.mouthLeft.x-50;
            var mouthY = landmarks.upperLipTop.y-50;
            var mouthHeight = landmarks.underLipBottom.y - mouthY+50;
            var mouthWidth = landmarks.mouthRight.x - mouthX+50;
            getBlurredBG(rgb,'mouth', mouthX, mouthY-5, mouthWidth, mouthHeight+15);

            var noseX = landmarks.noseLeftAlarOutTip.x-25;
            var noseY = (landmarks.noseRootLeft.y+landmarks.noseRootRight.y)/2;
            var noseHeight = landmarks.noseTip.y+50 - noseY;
            var noseWidth = landmarks.noseRightAlarOutTip.x - noseX+50;
            getBlurredBG(rgb,'nose', noseX, noseY, noseWidth, noseHeight);
        }
}

function getBlurredBG(rgb,id, x, y, w, h) {

  var ocanvas = document.getElementById(id);
    //create new canvas to enable clipping
    ocanvas.width = w;
    ocanvas.height = h;
    ocanvas.style.left = x+ 'px';
    ocanvas.style.top = y+10+ 'px';

    var ctx = ocanvas.getContext('2d');
    var copy = document.getElementById('photocopy');
    ctx.drawImage(copy, x, y, w, h, 0, 0, w, h);
    //stackBlurCanvasRGB(id, 0, 0, w, h, 24);

    ctx.fillStyle = 'rgba('+rgb+')';
    ctx.fillRect(0, 0, w, h);
    ocanvas.style.filter = 'blur(20px)';
    
    var data = canvas.toDataURL('image/png');
    photocopy.setAttribute('src', data);
}
  // Set up our event listener to run the startup process
  // once loading is complete.
  window.addEventListener('load', startup, false);
})();

 

