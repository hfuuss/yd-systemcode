// interface IYd {
//     str: string
// }
// class Index {
//     private data: string;
//     constructor(data: IYd) {
//         this.data = data.str;
//     }
//     log() {
//         console.log(this.data);
//     }
// }
// const index = new Index({
//     str: "京程一灯🏮"
// });
// index.log();


import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./pages/App";
ReactDom.render(<App/>,document.getElementById("main"))
