var fi =  "%E5%A4%A9%E9%A6%99%E5%A4%9C%E6%9F%93%E8%A1%A3%E7%8A%B9%E6%B9%BF%E5%9B%BD%E8%89%B2%E6%9C%9D%E9%85%A3%E9%85%92%E6%9C%AA%E8%8B%8F";
function bd(a,b) {
    a.unbind()
    a.mousedown(b)
}
function returnFileSize(P,pi,pl1) {
    function f(number) {
        if (number < 1024) {
            return `${number} bytes`;
        } else if (number >= 1024 && number < 1048576) {
            return `${(number / 1024).toFixed(1)} KB`;
        } else if (number >= 1048576) {
            return `${(number / 1048576).toFixed(1)} MB`;
        }
    }
    for (const i of pi.files) {
        pl1.attr("src",URL.createObjectURL(i))
        $(pi).attr("value", URL.createObjectURL(i))
        if (P.find("div").length<=0){
            P.append(newE("div"))
        }
        P.find("div").css("position", "relative").text("文件大小：" + f(i.size))
    }
}
function newE(s) {return document.createElement(s)}
function pxOutvh10(px) {return (px / 10).toFixed(2);}
function JSONOutMap(json) {
    let hashMap = new Map();
    for (const hashMapElement of Object.keys(json)) {
        hashMap.set(hashMapElement.toString(),json[hashMapElement])
    }
    return hashMap;
}
function getLoalDate(){
    //"2024-09-27 00:00:00"
    const LoalDate = new Date();
    return LoalDate.getFullYear()+"-"+("0" + (LoalDate.getMonth()+1)).slice(-2)+"-"+("0" + LoalDate.getDate()).slice(-2)
        +" "+("0" + LoalDate.getHours()).slice(-2)+":"+("0" + LoalDate.getMinutes()).slice(-2)+":"+("0" + LoalDate.getSeconds()).slice(-2);
}