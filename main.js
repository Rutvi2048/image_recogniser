Webcam.set({
    width:350,
    height:300,
    imafe_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Jr4Ql8mib/model.json',modelLoaded);

function modelLoaded()
{
    console.log("model loaded");
}

function print() {
    var largeImage = document.getElementById('captured_image');
    largeImage.style.display = 'block';
    largeImage.style.width=200+"px";
    largeImage.style.height=200+"px";
    var url=largeImage.getAttribute('src');
    window.open(url,'Image','width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
 }

function check()
{
    img = document.getElementById("captured_image");
 classifier.classify(img,gotresult);  
}

function gotresult(error,results) {
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3)*100;
}
}