import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';

function App() {
  const viewerDiv = useRef<HTMLDivElement>(null);

  // let handleKeyBlock = (e: any) => {
  //   console.log("helllllo")
  //   console.log(e)
  // }

  // useEffect(() => {
    
  //   console.log("hi")

  //   window.addEventListener('', handleKeyBlock)


  //   return () => {
  //     window.removeEventListener('', handleKeyBlock)
  //   }
  // }, [])

    
  //initialDoc we will store in the s3 bucket and fetch it from there for our WEB app- for making it dynamic 

  useEffect(() =>{
    if (viewerDiv.current) {
      WebViewer({path:'../../../lib',initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'},
    viewerDiv.current as HTMLDivElement).then(instance =>{
      const { documentViewer, annotationManager, Annotations, Tools} = instance.Core
      
      documentViewer.addEventListener('documentLoaded', () => {
        annotationManager.setCurrentUser('ROHAN')
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);
     
        // Tools.Tool.ENABLE_TEXT_SELECTION=false;
        Tools.Tool.disableTextSelection()
        // disableEmbeddedJavaScript()
        // documentViewer.enableReadOnlyMode()
        console.log("conming here")
        // instance.UI.hotkeys.on('ctrl+p, command+p', () => {
        //   documentViewer.closeDocument()
        // })



        instance.UI.hotkeys.off(instance.UI.hotkeys.Keys.COMMAND_P)
        instance.UI.hotkeys.off(instance.UI.hotkeys.Keys.CTRL_P)
        instance.UI.hotkeys.off(instance.UI.hotkeys.Keys.CTRL_V)
        instance.UI.hotkeys.off(instance.UI.hotkeys.Keys.COMMAND_V)
        instance.UI.hotkeys.off(instance.UI.hotkeys.Keys.CTRL_C)
        instance.UI.hotkeys.off(instance.UI.hotkeys.Keys.COMMAND_C)
        instance.UI.hotkeys.on("command+3+shift", () => {
          console.log("hehehheheh")
          documentViewer.closeDocument()
        })

      });
    });
    }
    
  },[])
  return (
    <div className="App">
      <div className='webviewer' ref={viewerDiv}></div>
          
    </div>
  );
}

export default App;
