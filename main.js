Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

Webcam.attach('#camera');

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="captured_image">';
});
}

console.log("ml5 version :",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9T7CbZiyW/model.json',model_loaded);

function model_loaded(){
    console.log("model_loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data="The Prediction Is "+prediction;
    utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(speak_data);
}

function identify_emotion(){
    img=document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}

function gotresult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak()
        if(results[0].label=="Yo"){
            document.getElementById("update_gesture").innerHTML="&#129304;"; 
         }
         if(results[0].label=="Bye"){
            document.getElementById("update_gesture").innerHTML="&#128075;"; 
         }
         if(results[0].label=="Left"){
            document.getElementById("update_gesture").innerHTML="&#128073;"; 
         }
         if(results[0].label=="Right"){
            document.getElementById("update_gesture").innerHTML="&#128072;;"; 
         }
         if(results[0].label=="Down"){
            document.getElementById("update_gesture").innerHTML="&#128071;"; 
         }
    }
}