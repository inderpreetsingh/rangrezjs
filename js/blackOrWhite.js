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
    }
    
    var net = new brain.NeuralNetwork();
    $(".basic").spectrum({
        color: "#f00",
        flat:false,
        showInput:true,
        className:'color-pickel',
        showButtons:false,
        /* when the user selects color change the background color */
        move: function(color) {
            $(".colorLayer").css({"background-color":color.toRgbString()});
            $("::selection").css({"background-color":color.toRgbString()});
            var rgb = new RGB();
            console.log(rgb);
            rgb255=color.toRgb();
            rgb.normalize(rgb255.r, rgb255.g, rgb255.b);
            console.log(rgb);
            /* Based on the color that user run the neural network */
            $.getJSON("json/blackWhite.json",function(dataJson){
                /*Before running the network you need to train it with a json file */
                net.train(dataJson.data);
                var output = net.run(rgb);
                console.log(output);
                if (output.black < output.white)
                {
                    console.log("text should be white");
                    $(".rangrez").css({"color":"#fafafa","text-shadow":"2px 2px rgba(0,0,0,0.5)"});
                }
                else
                {
                    console.log("text should be black");
                     $(".rangrez").css({"color":"#222","text-shadow":"2px 2px rgba(256,256,256,0.5)"});
                }
            });
        }
    });