var e=Object.defineProperty,t=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,a=(t,o,r)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,s=(e,s)=>{for(var n in s||(s={}))o.call(s,n)&&a(e,n,s[n]);if(t)for(var n of t(s))r.call(s,n)&&a(e,n,s[n]);return e};import{r as n,R as l,I as c,U as i,B as p,a as h,_ as u,x as y,F as d,h as m,b}from"./vendor.67b60a5d.js";function g(){const[e,t]=n.exports.useState(localStorage.getItem("input")),[o,r]=n.exports.useState([]),a={name:"file",action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",headers:{authorization:"authorization-text"},onChange(e){console.log(e);let t=new FileReader;t.onload=function(e){let t=e.target.result,o=y.exports.read(t,{type:"binary"});console.log(y.exports.utils.sheet_to_txt(o));let a=[];for(let r in o.Sheets)o.Sheets.hasOwnProperty(r)&&(a=a.concat(y.exports.utils.sheet_to_json(o.Sheets[r])));console.log(a),r([...a])},t.readAsBinaryString(e.file.originFileObj)}};return l.createElement("div",{className:"App"},l.createElement(c,{type:"text",value:e,onChange:e=>{t(e.target.value),localStorage.setItem("input",e.target.value)}}),l.createElement(i,s({},a),l.createElement(p,{icon:l.createElement(h,null)},"Click to Upload")),l.createElement(p,{onClick:()=>{((e,t,o)=>{try{const r={id:"headerId",key1:"header1",key2:"header2",key3:"header3",key4:"header4",key5:"header5",key6:"header6"},a=u.chain(o).map((e=>{let o=u.cloneDeep(e);const a=s({},u.pick(o,t));return Object.keys(a).reduce(((e,t)=>(e[r[t]||t]=a[t],e)),{})})).value();if(u.isEmpty(o))return void console.log("没数据");const n=y.exports.utils.book_new();let l=y.exports.utils.json_to_sheet(a);l["!cols"]=[{wch:30},{wch:50},{wch:20},{wch:20},{wch:20},{wch:20},{wch:50}],y.exports.utils.book_append_sheet(n,l,"sheet1");const c={bookType:"xlsx",bookSST:!1,type:"array"},i=y.exports.write(n,c);d.saveAs(new Blob([i],{type:"application/octet-stream"}),`${e} ${m().format("YYYYMMDDHHmmss")}.xlsx`)}catch(r){console.log(r,r.stack)}})("exportList",["姓名","年纪","工作"],o)}},"下载"))}b.render(l.createElement(g,null),document.getElementById("root"));
