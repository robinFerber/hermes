//**Robin Ferber 2018**//
var numFrames = 0;
(function textBubbleTypeOn (thisObj) {
    function buildUI(thisObj) {  // build the UI //
        var windowTitle = localize("$$$/AE/Script/testBuildBubUI/TextBubbleTypeOn=Text Bubble Type On");  // define window title //
        var buttonOne = localize("$$$/AE/Script/testBuildBubUI/generateBubble=Build Text Bubble");  // define button one text value //
        var DDOne = ['1','2','3','4','5','6','7','8','9','10'];  // define DD1 text values // 
        
        var wind = (thisObj instanceof Panel)? thisObj : new Window('palette', windowTitle);  // create window //
            wind.spacing = 3;  // set window spacing //
            wind.margins = 3;  // set wndow margins //
            wind.preferredSize = [0, 0, 150, 150];
            var buttonGroup = wind.add ("group"); // add button group //
                buttonGroup.spacing = 5; // set button spacing //
                buttonGroup.margins = 5; // set button margins //
                buttonGroup.orientation = "column"; // set button group orientation //
                wind.button1 = buttonGroup.add ("button", [0, 0, 120, 25], buttonOne); // add button one to group //
                wind.button1.alignment = "center";
                wind.DD1 = buttonGroup.add("dropdownlist", undefined, DDOne);
                wind.DD1.margins = 5;
                wind.DD1.text = "Key Interval: ";
                wind.DD1.text.alignment = "left";
                wind.DD1.selection = 5;
                buttonGroup.alignment = "right"; // set button alignment //
                buttonGroup.alignChildren = "right"; // set button chldren alignment // 
                
            wind.button1.onClick = function(){ // button 1 onclick function //
                numFrames = wind.DD1.selection.text;
                createBubble(); // calling the function containing the layer building functions //
            }
        wind.layout.layout(true); // setting the window layout //
        
        return wind // returning the window for AE to build //
    }
    var w = buildUI(thisObj);  // var to call to build the UI panel //
    
    if (w.toString() == "[object Panel]") { 
        w; 
    } else {  
        w.show(); 
    }
   
     function createBubble() {   // build bubble //
         
        app.beginUndoGroup("Build Bubble");// start undo group //
         var localNumFrame = this.numFrames;
//~          alert(this.numFrames);
         var curComp = app.project.activeItem;  // select current comp //
         var text = prompt ("Sentence to be typed on", "").split(" "); // Prompt user for copy //
         var textCheck = function() {  //check if text has been entered into prompt //
            if(text == ""){
                alert("No copy entered.");  
            }else{
                createText();
            }
         }
         
         var converter = function() {  // get frame length and set key frame interval //
             
            var frameLength = curComp.frameDuration;
            frameInterval = frameLength*localNumFrame;
         }
        
        var addControlNull = function(){  // create the control null //
            var newControlNull = curComp.layers.addNull();
            var nameNull = newControlNull.name = "Bubble Control Null";
            
            var AddXmargSlider = newControlNull.property("Effects").addProperty("Slider Control");
            var AddXmargSliderSet = curComp.layer("Bubble Control Null").property("Effects").property("Slider Control").property("Slider").setValue("50");
            var nameXmargSlider = AddXmargSlider.name = "X Margin:";
            
            var AddYmargSlider = newControlNull.property("Effects").addProperty("Slider Control");
            var AddYmargSliderSet = curComp.layer("Bubble Control Null").property("Effects").property("Slider Control").property("Slider").setValue("25");
            var nameYmargSlider = AddYmargSlider.name = "Y Margin:";
            
            var AddRndCornSlider = newControlNull.property("Effects").addProperty("Slider Control");
            var AddRndCornSliderSet = curComp.layer("Bubble Control Null").property("Effects").property("Slider Control").property("Slider").setValue("45");
            var nameRndCornSlider = AddRndCornSlider.name = "Round Corners:";
            
            var AddCntrOffsetSlider = newControlNull.property("Effects").addProperty("Slider Control");
            var AddCntrOffsetSliderSet = curComp.layer("Bubble Control Null").property("Effects").property("Slider Control").property("Slider").setValue("0");
            var nameCntrOffsetSlider = AddCntrOffsetSlider.name = "Offset bubble center:";

            var AddColorPicker = newControlNull.property("Effects").addProperty("Fill");
            var AddColorPickerSet = curComp.layer("Bubble Control Null").property("Effects").property("Fill").property("Color").setValue([1, 1, 1]);
            var nameColorPicker = AddColorPicker.name = "Bubble Fill:";
         }
          
         var createText = function(){  // create the copy layer //
            createShape();
            converter();  // run converter function //
            
            var textLayer = curComp.layers.addText();
            var textSource = textLayer.property("Source Text");
            var textStyle = textSource.value;
            textLayer.name = "Copy";
            textStyle.justification = ParagraphJustification.CENTER_JUSTIFY;
            textStyle.fontSize = 50;
            textStyle.fillColor = [.3,.3,.3];
            textStyle.font = "Roboto";
            textStyle.applyFill = true;
            
            textSource.setValue(textStyle);
            var sentence = null;
            for (i=0; i<text.length; i++) {  // set copy key frames //
                if(i===0) {
                    var wordOne = textSource.setValueAtTime(frameInterval, new TextDocument(text[i])); 
                }else if (i === 1 && text[i] != undefined) {
                    var wordTwo = textSource.setValueAtTime(frameInterval*2, new TextDocument(text[0]+" "+text[i]));
                } else if (i === 2 && text[i] != undefined) {
                    var wordThree = textSource.setValueAtTime(frameInterval*3, new TextDocument(text[0]+" "+text[1]+" "+text[i]));
                } else if (i === 3 && text[i] != undefined) {
                    var wordFour = textSource.setValueAtTime(frameInterval*4, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[i]));
                } else if (i === 4 && text[i] != undefined) {
                    var wordFive = textSource.setValueAtTime(frameInterval*5, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[i]));
                } else if (i === 5 && text[i] != undefined) {
                    var wordSix = textSource.setValueAtTime(frameInterval*6, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[i]));
                } else if (i === 6 && text[i] != undefined) {
                    var wordSeven = textSource.setValueAtTime(frameInterval*7, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[i]));
                } else if (i === 7 && text[i] != undefined) {
                    var wordEight = textSource.setValueAtTime(frameInterval*8, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[6]+" "+text[i]));
                } else if (i === 8 && text[i] != undefined) {
                    var wordNine = textSource.setValueAtTime(frameInterval*9, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[6]+" "+text[7]+" "+text[i]));
                } else if (i === 9 && text[i] != undefined) {
                    var wordTen = textSource.setValueAtTime(frameInterval*10, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[6]+" "+text[7]+" "+text[8]+" "+text[i]));
                } else if (i === 10 && text[i] != undefined) {
                    var wordEleven = textSource.setValueAtTime(frameInterval*11, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[6]+" "+text[7]+" "+text[8]+" "+text[9]+" "+text[i]));
                } else if (i === 11 && text[i] != undefined) {
                    var wordTwelve = textSource.setValueAtTime(frameInterval*12, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[6]+" "+text[7]+" "+text[8]+" "+text[9]+" "+text[10]+" "+text[i]));
                } else if (i === 12 && text[i] != undefined) {
                    var wordThirteen = textSource.setValueAtTime(frameInterval*13, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[6]+" "+text[7]+" "+text[8]+" "+text[9]+" "+text[10]+" "+text[11]+" "+text[i]));
                } else if (i === 13 && text[i] != undefined) {
                    var wordFourteen = textSource.setValueAtTime(frameInterval*14, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[6]+" "+text[7]+" "+text[8]+" "+text[9]+" "+text[10]+" "+text[11]+" "+text[12]+" "+text[i]));
                } else if (i === 14 && text[i] != undefined) {
                    var wordFifteen = textSource.setValueAtTime(frameInterval*15, new TextDocument(text[0]+" "+text[1]+" "+text[2]+" "+text[3]+" "+text[4]+" "+text[5]+" "+text[6]+" "+text[7]+" "+text[8]+" "+text[9]+" "+text[10]+" "+text[11]+" "+text[12]+" "+text[13]+" "+text[i]));
                } else {
                    break;
                }
            }
        }
        
        var createShape = function(){  // make bubble shape and add control expressions //
             addControlNull();
             var shapeLayer = curComp.layers.addShape();
             shapeLayer.name = "Text bubble";
             var shapeGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");  
             var myRect = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
             var rndcnr = shapeGroup.property("Contents").addProperty("ADBE Vector Filter - RC");
             var rndSet = rndcnr.property("ADBE Vector RoundCorner Radius").setValue(25);
             var fillAdd = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill"); 
             var fillSet = fillAdd.property("ADBE Vector Fill Color").setValue([240, 240, 240]);
             var opacitySet = fillAdd.property("ADBE Vector Fill Opacity").setValue(100);
             var addMargExprs = shapeGroup.property("Contents").property("Rectangle Path 1").property("size").expression = "xMargVal = thisComp.layer('Bubble Control Null').effect('X Margin:')('Slider'); x = thisComp.layer(index-1).sourceRectAtTime().width; yMargVal = thisComp.layer('Bubble Control Null').effect('Y Margin:')('Slider'); compDur = thisComp.duration; y = thisComp.layer(index-1).sourceRectAtTime(compDur, false).height; [x+(xMargVal*2), y+(yMargVal*2)] ";
             var addRndCornExprs = shapeGroup.property("Contents").property("Round Corners 1").property("radius").expression = "thisComp.layer('Bubble Control Null').effect('Round Corners:')('Slider')";
             var addYCntrExprs = shapeLayer.property("Transform").property("Position").expression = "txtHeight = thisComp.layer(index-1).sourceRectAtTime(200).height; offVal = thisComp.layer('Bubble Control Null').effect('Offset bubble center:')('Slider'); yVal = transform.position[1]+offVal;[transform.position[0], yVal-(txtHeight*0.5)]";
             var addFillExprs = shapeLayer.property("Contents").property("Group 1").property("Contents").property("Fill 1").property("Color").expression = "thisComp.layer('Bubble Control Null').effect('Bubble Fill:')('Color')";
             var addFillOExprs = shapeLayer.property("Contents").property("Group 1").property("Contents").property("Fill 1").property("Opacity").expression = "thisComp.layer('Bubble Control Null').effect('Bubble Fill:')('Opacity')";
         };
        
         if(curComp){  // check that a comp is selected //
            textCheck();  // run text check function //
         } 
         
          }
        
        app.endUndoGroup();   // end undo group //
})(this);
