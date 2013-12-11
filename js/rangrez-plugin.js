    var RGB = function (){
        var object = this;
        object.r = 0;
        object.g = 0;
        object.b = 0;
        
        object.normalize = function(r,g,b){
            object.r = r/255;
            object.g = g/255;
            object.b = b/255;
            return object;
        }
        
        object.denormalize = function(r,g,b){
            object.r = Math.round(r*255);
            object.g = Math.round(g*255);
            object.b = Math.round(b*255)
        }
        
        object.giveString = function(){
            rgbString = "rgb("+object.r+","+object.g+","+object.b+")";
            return rgbString;
        }
        
        object.getString = function(rgbString){
            console.log("the string got before regexp" + rgbString);
            rgbString = rgbString.replace(/[^\d,]/g, '').split(',');
            console.log("the string got after regexp" + rgbString);
            object.r = parseInt(rgbString[0]);
            object.g = parseInt(rgbString[1]);
            object.b = parseInt(rgbString[2]);
    }
    }
        

var rangrez = function(initializer)
{
    var object = this;
    object.trainer=initializer.trainer || "json/complimentory.json";
    object.roohClass=initializer.roohClass || ".rooh";
    object.rangrezClass = initializer.rangrezClass || ".rangrez";
    object.rangrezCSS =initializer.rangrezCSS || "color";
    object.roohCSS = initializer.roohCSS || "background-color";
    
    var roohRGB = new RGB();
    var rangrezRGB= new RGB();
    var net = new brain.NeuralNetwork();
    
    object.moheRangDe = function(){
        roohColor = $(object.roohClass).css(object.roohCSS);
        console.log("rooh color is " + roohColor);
        roohRGB.getString(roohColor);
        console.log("rooh RGB is " +roohRGB);
        roohRGB.normalize(roohRGB.r,roohRGB.g,roohRGB.b);
        console.log("normalized rooh RGB is " +roohRGB.r);
        var output = net.run(roohRGB);
        console.log("output of neural network is " + output.r);
        rangrezRGB.denormalize(output.r,output.g,output.b);
        console.log("denormalized output into rangrezRGB is " + rangrezRGB.r+rangrezRGB.g+rangrezRGB.b);
        $(object.rangrezClass).css(object.rangrezCSS,rangrezRGB.giveString());
    }
    $.getJSON(object.trainer,function(dataJson){
        net.train(dataJson.data);
        console.log("network trained");
       object.moheRangDe(); 
    });
}