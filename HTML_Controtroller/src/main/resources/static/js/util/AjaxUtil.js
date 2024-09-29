function ajaxJSON(url, Type, dataType, jsonData, contentType) {
    let jsonDataLet
    $.ajax({
        // "http://localhost:8090/Cuisine/cuisine/delete",//（1）请求的action路径,可以传递参数到后台
        url: "http://localhost:8090" + url,
        type: Type,
        dataType: dataType,
        data: jsonData,
        contentType: contentType,
        async: false,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("服务异常：数据获取异常，请检查报告id。");
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        },
        complete: function (data,status) {
            jsonDataLet = data.responseJSON
        }
    })
    return jsonDataLet
}
function PutajaxImg(url, formData) {
    let status1
    $.ajax({
        url: "http://localhost:8090" + url,
        type: 'POST',
        data: formData,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false,// 告诉jQuery不要去设置Content-Type请求头
        async: false,
        error: function () {
            console.log("上传失败");
        },
        complete: function (data, status) {
            console.log(status)
            status1 = status
        }

    })
    return status1
}
function PostajaxJSON(url, dataType, jsonData, contentType) {
    return ajaxJSON(url, "POST", dataType, jsonData, contentType)
}
function PutajaxJSON(url, dataType, jsonData, contentType) {
    return ajaxJSON(url, "PUT", dataType, jsonData, contentType)
}
function DeleteajaxJSON(url, dataType, jsonData, contentType) {
    return ajaxJSON(url, "DELETE", dataType, jsonData, contentType)
}
function GetajaxJSON(url, dataType, jsonData, contentType) {
    let jsonDataLet = ""
    if ((jQuery.type(jsonData) !== "string")) {
        for (let str_i in jsonData) {
            if (jsonData[str_i] == null || jsonData[str_i] == "") {
                jsonDataLet = jsonDataLet + "&" + str_i + "=" + null
            } else {
                jsonDataLet = jsonDataLet + "&" + str_i + " = " + jsonData[str_i]
            }
        }
        jsonDataLet.replaceAll("&" + jsonData[0], jsonData[0])
    }
    return ajaxJSON(url, "GET", dataType, jsonDataLet, contentType)
}