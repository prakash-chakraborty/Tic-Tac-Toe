(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(e,t,s){},15:function(e,t,s){"use strict";s.r(t);var n=s(5),i=s(3),r=s(4),a=s(7),c=s(6),l=s(1),o=s.n(l),u=s(8),d=s.n(u),h=(s(13),s.p+"static/media/logo.0a64b44e.jpg"),m=s(0);function x(e){var t="bg-cyan-100 rounded-2xl md:p-6 text-2xl cursor-pointer";e.iswinningTile&&(t="bg-green-200 rounded-2xl md:p-6 text-2xl cursor-pointer");var s=null===e.value?"\u270e":e.value;return Object(m.jsx)("div",{className:t,onClick:e.onClick,children:Object(m.jsx)("span",{className:"font-bold",children:s})})}var p=function(e){Object(a.a)(s,e);var t=Object(c.a)(s);function s(){return Object(i.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"renderSquare",value:function(e,t){var s=this;return Object(m.jsx)(x,{value:this.props.squares[e],iswinningTile:t,onClick:function(){return s.props.onClick(e)}},e)}},{key:"render",value:function(){for(var e=[],t=0;t<9;t++)this.props.winningTiles.includes(t)?e.push(this.renderSquare(t,!0)):e.push(this.renderSquare(t,!1));return Object(m.jsx)("div",{className:"grid grid-rows-3 grid-cols-3 gap-4",children:e})}}]),s}(o.a.Component),j=function(e){Object(a.a)(s,e);var t=Object(c.a)(s);function s(e){var n;return Object(i.a)(this,s),(n=t.call(this,e)).state={history:[{squares:Array(9).fill(null),clickPosition:Array(9).fill(null)}],stepNumber:0,xIsNext:!0,lastStepClicked:-1,sortAsc:!0},n}return Object(r.a)(s,[{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0,lastStepClicked:e})}},{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),s=t[t.length-1].squares.slice();this.calculateWinner(s)||s[e]||(s[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:s,clickPosition:e}]),stepNumber:t.length,xIsNext:!this.state.xIsNext,lastStepClicked:-1}))}},{key:"handleToggleClick",value:function(){this.setState({sortAsc:!this.state.sortAsc})}},{key:"calculateWinner",value:function(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0;s<t.length;s++){var i=Object(n.a)(t[s],3),r=i[0],a=i[1],c=i[2];if(e[r]&&e[r]===e[a]&&e[r]===e[c])return e[r]}return null}},{key:"isDraw",value:function(e){return null===this.calculateWinner(e)&&!e.includes(null)}},{key:"getWinningTiles",value:function(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0;s<t.length;s++){var i=Object(n.a)(t[s],3),r=i[0],a=i[1],c=i[2];if(e[r]&&e[r]===e[a]&&e[r]===e[c])return t[s]}return[-1,-1,-1]}},{key:"render",value:function(){var e,t=this,s=this.state.history,n=s[this.state.stepNumber],i=this.calculateWinner(n.squares),r="Sort Desc \u2193",a=s.map((function(e,s){var n=t.state.history[s].clickPosition,i=Math.floor(n/3),r=n%3,a=s?s===t.state.lastStepClicked?Object(m.jsxs)("b",{children:["Go to step #",s,". Position: (",i,",",r,")"]}):Object(m.jsxs)("span",{children:["Go to step #",s,". Position: (",i,",",r,")"]}):"Go to game start";return Object(m.jsx)("li",{children:Object(m.jsx)("button",{onClick:function(){return t.jumpTo(s)},children:a})},s)}));this.state.sortAsc||(r="Sort Asc \u2191",a.reverse());var c=[-1,-1,-1];return i?(e="Winner: "+i,c=this.getWinningTiles(n.squares)):e=this.isDraw(n.squares)?"Match Draw":"Next Turn: "+(this.state.xIsNext?"X":"O"),Object(m.jsx)("div",{className:"min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12",children:Object(m.jsxs)("div",{className:"relative py-3 sm:max-w-xl sm:mx-auto",children:[Object(m.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"}),Object(m.jsx)("div",{className:"relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20",children:Object(m.jsxs)("div",{className:"max-w-md mx-auto",children:[Object(m.jsx)("div",{className:"mx-auto",children:Object(m.jsx)("img",{src:h,alt:"logo",className:"h-12 my-4 mx-auto"})}),Object(m.jsxs)("div",{className:"w-full overflow-hidden text-center",children:[Object(m.jsx)("p",{className:"text-lg py-2 px-4 my-4",children:e}),Object(m.jsx)(p,{squares:n.squares,winningTiles:c,onClick:function(e){return t.handleClick(e)}})]}),Object(m.jsxs)("div",{className:"my-10",children:[Object(m.jsx)("button",{className:"py-2 px-4 m-2 float-left bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75",onClick:function(){return window.location.reload()},children:"Restart \u21ba"}),Object(m.jsx)("button",{className:"py-2 px-4 m-2 float-right bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75",onClick:function(){return t.handleToggleClick()},children:r})]})]})})]})})}}]),s}(o.a.Component);d.a.render(Object(m.jsx)(j,{}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.ed6f6be7.chunk.js.map