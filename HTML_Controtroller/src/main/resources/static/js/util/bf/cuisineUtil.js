
//基于模板的创建和修改
function inputModules() {
    var CuisineBehavior = $("#modules div").filter(".CuisineBehavior").clone()
    CuisineBehavior.find(".Preview").html("<img name='Preview' src='/static/img/空白图.jpeg'>")
    CuisineBehavior.find(".DishName").html("<input type='text' name='DishName' value='' >")
    CuisineBehavior.find(".ExplainInDetail").html("<textarea   name='ExplainInDetail' value='' style=' width: 50vw;height: content-box'></textarea>")
    CuisineBehavior.find(".Craft").html("<textarea   name='Craft' value='' style=' width: 50vw;height: content-box'></textarea>")
    var FoodIngredients = CuisineBehavior.find(".FoodIngredient").text("").append("材料：<br>")
    FoodIngredients.append("<div><span style='font-size: 1.5em;'>+</span><br></div>")
    FoodIngredients.find("span:contains('+')").parent().mousedown(function () {
        FoodIngredients.find("span:contains('+')").parent("div").before("<div><input type='text' name='key' value='' >:<input type='text' name='value' value='' ><span style='font-size: 1.5em;margin-left: 0.5em;'>-</span><br></div>")
        FoodIngredients.find("span:contains('-')").unbind().mousedown(function () {
            $(this).parent("div").remove()
        })
    })
    CuisineBehavior.find(".order div").first().next().addBack().css("display", "none")
    CuisineBehavior.find(".order div").last().css("display", "block")
    return CuisineBehavior
}

function UpImgOfJSONData(imgName,imgUrl,json,urlJson) {
    let state;
    if(imgName!="NULL"){
        let imgData = new FormData();
        imgData.append("img", $(".Preview input[id='UpImg']")[0].files[0]);
        imgData.append("Preview", imgName)
        state = PutajaxImg(imgUrl, imgData)
        if(state==200||state=="success") {
            if(urlJson=="/Cuisine/Cuisine/Update"){
                PutajaxJSON(urlJson, "json", json, "application/json")
            }else {
                PostajaxJSON(urlJson, "json", json, "application/json")
            }

        }
    }
}
function UpFlush() {
    let  size;
    try {
        size = returnFileSize(($(".Preview input[id='UpImg']")[0].files[0]).size)
        if (size.slice(-2)!="MB"){
            size= 1
        }else {size = parseInt(size)}
    }catch (e){
        size=1
    }
    finally {
        $("#CuisineBehaviorH").find("div").css("font-size","2em").text("数据更新中--------->")
    }
    setTimeout(function () {
        const jsonDatas = extractionGETData()
        getCuisine(jsonDatas)
    },size*1500)
}
function extractionGETData() {
    let k = {};
    k["SpeciesFont"] = $("#01").html();
    k["DataID"] = $('input[name="DishName"]').val();
    k["FoodIngredient"] = $('input[name="FoodIngredient"]').val();
    k["page"] = 0;
    return k;
}
function extractionFormData() {
    let JsonCuisineBehavior = {}
    JsonCuisineBehavior["DishName"] = $(".CuisineBehavior input[name = 'DishName']").val()
    JsonCuisineBehavior["Preview"] = $(".CuisineBehavior input[name = 'Preview']").attr("value").split("/")
    JsonCuisineBehavior["ExplainInDetail"] = $(".CuisineBehavior textarea[name = 'ExplainInDetail']").val()
    JsonCuisineBehavior["Craft"] = $(".CuisineBehavior textarea[name = 'Craft']").val()
    JsonCuisineBehavior["FoodIngredient"] = {}
    for (let i of $(".CuisineBehavior input[name = 'key']")) {
        JsonCuisineBehavior["FoodIngredient"][$(i).val()] = $(i).parent().find("input[name=value]").val()
    }
    return JsonCuisineBehavior
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
function returnFileSize(number) {
    if (number < 1024) {
        return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
    }
}