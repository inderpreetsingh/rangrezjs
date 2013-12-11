
        
    var RGB = function(){
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
            rgbString = rgbString.replace(/[^\d,]/g, '').split(',');
            object.r = RGB[0];
            object.g = RGB[1];
            object.b = RGB[2];
    }
    }
    
    var net = new brain.NeuralNetwork();
          $.getJSON("json/complimentory.json",function(dataJson){
                /*Before running the network you need to train it with a json file */
                net.train(dataJson.data);
                colorstuff();
            });
        
    function colorstuff(){
    $(".basic").spectrum({
        color: "#f00",
        flat:false,
        showInput:true,
        className:'color-pickel',
        showButtons:false,
        /* when the user selects color change the background color */
        move: function(color) {
            
            $(".colorLayer").css({"background-color":color.toRgbString()});
            var rgb = new RGB();
            
            /* Based on the color that user run the neural network */
           
                rgb255=color.toRgb();
                 rgb.normalize(rgb255.r, rgb255.g, rgb255.b);
                 var output = net.run(rgb);
                console.log("output"+output.r+output.g+output.b);
                rgb.denormalize(output.r,output.g,output.b);
                console.log(rgb.giveString());
               $(".rangrez").css("color",rgb.giveString());
            
        }
    });
    }
    
