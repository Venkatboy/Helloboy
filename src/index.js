import React from "react";
import ReactDOM from "react-dom";
import { generateZip } from "./jszip";
import "./styles.css";

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         no_image: "https://www.freeiconspng.com/uploads/no-image-icon-6.png",
         files: []
      };
      this.inputRef = React.createRef();
   }

   uploadItem = e => {
      e.preventDefault();
      let files = e.target.files;
      const reader = new FileReader();
      for (const element of files) {
         reader.onloadend = () => {
            this.setState({
               files: [
                  ...this.state.files,
                  {
                     id: element.size,
                     file: element,
                     imagePreviewUrl: reader.result
                  }
               ]
            });
         };
         reader.readAsDataURL(element);
      }
   };

   removeItem = event => {
      const id = Number(event.target.id);
      this.setState({
         files: [...this.state.files.filter(obj => obj.id !== id)]
      });
      this.inputRef.current.value = "";
   };

   downloadZip = () => {
      generateZip(this.state.files);
   };

   render() {
      return (
         <div className="App">
            <h1>JSZip test</h1>
            <input type="file" onChange={this.uploadItem} ref={this.inputRef} />
            <div className="imgContainer">
               {!this.state.files.length ? (
                  <img src={this.state.no_image} alt="No Image" />
               ) : (
                  this.state.files.map((obj, k) => (
                     <div className="imgWrapper">
                        <img src={obj.imagePreviewUrl} alt={obj.id} key={k} />
                        <button
                           type="button"
                           onClick={this.removeItem}
                           id={obj.id}
                        >
                           &times;
                        </button>
                     </div>
                  ))
               )}
            </div>
            <button
               type="button"
               onClick={this.downloadZip}
               className="epk-button zip-button"
               disabled={this.state.files.length === 0}
            >
               Download Zip
            </button>
         </div>
      );
   }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
