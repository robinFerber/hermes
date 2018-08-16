# hermes
 -Robin Ferber 2018-


## -Install-
  
  #### - Place script file into script UI panel.
    
    - PC: Program Files\Adobe\Adobe After Effects CC 2018\Support Files\Scripts\ScriptUI Panels
    
    - Mac: Applications\Adobe After Effects CC 2018\Scripts\ScriptUI Panels

## -Use-
 
    - Select keyframe placement interval.
  
    - Press "build text bubble" button.
  
    - Enter sentence when prompted.

## -Layers created-

 ### - Bubble Control Null
    - X margin: adjust margins on the X from the center
    - Y margin: adjust margins on the Y from the center
    - Round Corners: adjust roundness of bubble corners
    - offset bubble center: adjust the location of the center of the bubble ~ for sentences with words that have descenders
    - Bubble Fill: color value for the bubble fill
 
 ### - Text bubble
    - shape layer containing the bubble behind the text
    - connected by expressions to "Bubble Control Null"
      - !Expressions are relative and layers must remain stacked the way they are! - This is to allow multiple bubbles in one comp. If you would like to move the layers around you can edit the expressions to look directly at the specific layer.
 
 ### - Copy Layer
    - Layer containing copy for text bubble.
    - Keyframes are on source text. 
    - Text Bubble layer looks to this layer for its size.
