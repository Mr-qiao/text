import React, { useState } from "react";
import { Upload, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import FileSaver from "file-saver"; //必要依赖
import _ from "lodash";
import moment from "moment";

//三个参数，title是生成的Excel文件名，headers是文件的头部，values为具体的json数据
const exportList = (title, headers, values) => {
  try {
    //如果value的json字段的key值和想要的headers值不一致时，可做如下更改
    //将和下面的Object.fromEntries结合，将json字段的key值改变为要求的excel的header值
    const keyMap = {
      id: "headerId",
      key1: "header1",
      key2: "header2",
      key3: "header3",
      key4: "header4",
      key5: "header5",
      key6: "header6",
    };
    const data = _.chain(values)
      .map((i) => {
        let ne = _.cloneDeep(i);
        const rzt = {
          ..._.pick(ne, headers),
        };
        //改变key值为要求的excel的title值,但是edge不兼容，ca
        // const newRzt = Object.fromEntries(Object.entries(rzt).map(([k, v]) => [keyMap[k]||k, v]))
        const newRzt = Object.keys(rzt).reduce((newData, key) => {
          //上面的方法不兼容，所以用了这个方法处理headers
          let newKey = keyMap[key] || key;
          newData[newKey] = rzt[key];
          return newData;
        }, {});
        return newRzt;
      })
      .value();
    if (_.isEmpty(values)) {
      console.log("没数据");
      return;
    }

    const workbook = XLSX.utils.book_new(); //创建一个新的工作簿对象
    let ws = XLSX.utils.json_to_sheet(data); //将json对象数组转化成工作表
    ws["!cols"] = [
      //设置每一列的宽度
      { wch: 30 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 50 },
    ];
    XLSX.utils.book_append_sheet(workbook, ws, "sheet1"); //把sheet添加到workbook里，第三个参数是sheet名
    const wopts = { bookType: "xlsx", bookSST: false, type: "array" }; //写入的样式bookType:输出的文件类型，type：输出的数据类型，bookSST: 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    const wbout = XLSX.write(workbook, wopts); // 浏览器端和node共有的API,实际上node可以直接使用xlsx.writeFile来写入文件,但是浏览器没有该API
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      `${title} ${moment().format("YYYYMMDDHHmmss")}.xlsx`
    ); //保存文件
  } catch (e) {
    console.log(e, e.stack);
  }
};

function App() {
  const [input1, setInput] = useState(localStorage.getItem("input"));
  const [JSON, setJSON] = useState([]);
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      console.log(info);
      let reader = new FileReader();
      reader.onload = function (e) {
        let data = e.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        console.log(XLSX.utils.sheet_to_txt(workbook));
        let JSON = [];
        // 循环文件中的每个表
        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 将获取到表中的数据转化为json格式
            JSON = JSON.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
        }

        console.log(JSON);
        setJSON([...JSON]);

        // if (callback) callback(workbook);
      };
      reader.readAsBinaryString(info.file.originFileObj);
    },
  };
  return (
    <div className="App">
      <Input
        type="text"
        value={input1}
        onChange={(e) => {
          setInput(e.target.value);
          localStorage.setItem("input", e.target.value);
        }}
      />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Button
        onClick={() => {
          exportList("exportList", ["姓名", "年纪", "工作"], JSON);
        }}
      >
        下载
      </Button>
    </div>
  );
}

export default App;

// class ExportExcel extends Component{
//     constructor(){
//         super()
//         this.state={
//             exportData:[{//模拟的JSON数据
//               id:1,
//               key1:"value1",
//               key2:"value2",
//               key3:"value3",
//               key4:"value4",
//               key5:"value5",
//               key6:"value6",
//             }]
//         }
//     }
//     componentWillMount(){
//     }

//     render(){
//             <div>
//               <button onClick={this.exportList.bind(this,"exportList",["id","key1","key2","key3","key4","key5","key6"],this.state.exportData)}>export</button>
//             </div>
//         )
//     }
// }
// export default ExportExcel
