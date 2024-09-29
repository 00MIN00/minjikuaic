//t1
$(document).ready(function () {
    const qc = $("#queryCuisine").find("div")
    const pw = {"padding":"0px 1px 0px 1px","width":"auto"}
    qc.css(pw)
    qc.find("div").css(pw)
    let jsonData = GetajaxJSON("/Cuisine/Cuisine/Species", "json", "", "")
    for (let i in jsonData) {
        let ds = $("#modules")
            .find($(".SpeciesFont"))
            .attr({
                href: jsonData[i]["href"],
                URL: jsonData[i]["URL"]
            })
            .text(jsonData[i]["ZoningName"])
        if (i == 0) {
            ds.css("color", "rgb(32, 155, 250)").attr("id", "01")
        } else {
            ds.css("color", "rgb(0,0,0)")
        }
        $("#SpeciesZoning").append(ds.clone())
        if (Object.keys(jsonData).length - 1 > i) {
            $("#SpeciesZoning").append($("#modules").find($(".SpeciesFontFG")).clone())
        }
    }
    bd($("#queryCuisineButton button"), function (){getCuisine(extractionGETData())})
    insertCuisineButtonRenewal()
    SpeciesRenewal()
    etop()
    getCuisine(extractionGETData())
    initPage()
})
function etop(){
    const ch = $("#CuisineBehaviorH");
    if (ch.innerHeight() > 650) {
        const len = document.getElementById("CuisineBehaviorH").getBoundingClientRect().top;
        ch.html("")
            .attr({overflow: "auto"})
            .css({
                "max-height":($(document).innerHeight()-parseInt(len)-300).toString() + "px",
                "height":"max-content"
            });
    };
    return ch;
}
function SpeciesRenewal() {
    bd($(".SpeciesFont"),
        function () {
            const r1 = 'rgb(32, 155, 250)'
            if ($(this).css('color') != r1) {
                $(this).css('color', r1).attr("id", "01")
            }
            if ($(this).css('color') == r1) {
                $(this).css('color', r1).attr("id", "01")
                $(this).nextAll('.SpeciesFont').css('color', 'rgb(0,0,0)').attr("id", "")
                $(this).prevAll('.SpeciesFont').css('color', 'rgb(0,0,0)').attr("id", "")
            }
            getCuisine(extractionGETData())
        }
    )
}
function getCuisine(jsonData) {
    const JSON1 = GetajaxJSON("/Cuisine/Cuisine/selectAll", "json", jsonData, "application/json")
    const JSONData = JSON1["CuisineList"]
    const page = JSON1["Page"]
    etop().html("")
    let JSONData1 = {}
    for (var dataKey in JSONData) {
        var CuisineBehavior = $("#modules .CuisineBehavior").clone()
        $("#CuisineBehaviorH").append(CuisineBehavior)
        CuisineBehavior.find(".Preview").html("<img name='Preview' src='/static/img/CuisineImage/" + JSONData[dataKey]["Preview"] + ".jpg?Time=" + (new Date()).getTime() + "'>")
        CuisineBehavior.find(".DishName").html(JSONData[dataKey]["DishName"])
        CuisineBehavior.find(".FoodIngredient").append(":&nbsp;&nbsp;")
        const json = {}
        for (let oj in JSONData[dataKey]["FoodIngredient"]) {
            oj = JSONData[dataKey]["FoodIngredient"][oj]
            const key = Object.keys(oj)[0]
            json[key] = oj[key]
        }
        JSONData[dataKey]["FoodIngredient"] = json
        for (var FoodIngredientKey in json) {
            CuisineBehavior.find(".FoodIngredient").append(FoodIngredientKey + ":" + json[FoodIngredientKey] + ",")
        }
        CuisineBehavior.find(".ExplainInDetail").html("简介:" + JSONData[dataKey]["ExplainInDetail"])
        CuisineBehavior.find(".Snowflake").html(JSONData[dataKey]["Snowflake"])
        CuisineBehavior.find(".Craft").html("做法:" + JSONData[dataKey]["Craft"])
        CuisineBehavior.find(".Price").html("价格:" + JSONData[dataKey]["Price"])
        JSONData1[JSONData[dataKey]["Snowflake"]] = JSONData[dataKey]
    }
    $("#p").css("display","block")
    $("#pq").text(page["pq"])
    $("#pz").text(page["pz"])
    console.log($("#pq").text())
    $("#number").attr({max:parseInt(page["pz"]),min:1,value:parseInt($("#pq").text()),autocomplete:"off"})
    sessionStorage.setItem("getCuisineJson", JSON.stringify(JSONData1))
    UpdateButtonRenewal();
    DeleteButtonRenewal()
}
//架构创建页面
function insertCuisineButtonRenewal() {
    $(".newCuisine").mousedown(function () {
        //参数
        const CuisineBehavior = {Preview: "空白图", DishName: "", ExplainInDetail: "", FoodIngredient: {},}
        const CuisineBehaviorg = FFA(CuisineBehavior)
        CuisineBehaviorg.find(".order div").last().css("display", "block").mousedown(function () {
            insertCuisineUp()
            CuisineBehaviorg.find(".order div").last().css("display", "block").unbind()
        })
        $("#CuisineBehaviorH").html(CuisineBehaviorg.wrap("<div class='row CuisineBehavior'></div>"))
        $("#CuisineBehaviorH").find("span:contains('-')").mousedown(function () {
            $(this).parent("div").remove()
        })
    })
}
//提交创建数据
function insertCuisineUp() {
    let JsonCuisineBehavior = extractionFormData()
    JsonCuisineBehavior["Preview"] = JsonCuisineBehavior["DishName"]
    JsonCuisineBehavior["Snowflake"] = $("#01").text()
    UpImgOfJSONData(JsonCuisineBehavior["Preview"].replace("/", ""),"/HTML/Cuisine/UpImgDate",JSON.stringify(JsonCuisineBehavior),"/Cuisine/Cuisine/insertCuisine")
    UpFlush()
}
//更新按钮事件绑定
//由getCuisine（）调用
//待优化
function UpdateButtonRenewal() {
    bd($(".order").find(".Update button"),function () {
        const CuisineBehavior = JSON.parse(sessionStorage.getItem("getCuisineJson"))[$(this).parents(".CuisineBehavior").find(".Snowflake").text()]
        const CuisineBehaviorg =FFA(CuisineBehavior)
        CuisineBehaviorg.find(".order div").last().css("display", "block").mousedown(function () {
            UpdateUp()
            CuisineBehaviorg.find(".order div").last().css("display", "block").unbind()
        })
        $("#CuisineBehaviorH").html(CuisineBehaviorg.wrap("<div class='row CuisineBehavior'></div>"))
        $("#CuisineBehaviorH").find("span:contains('-')").mousedown(function () {
            $(this).parent("div").remove()
        })
    })
}
function UpdateUp() {
    let js1;
    let JsonCuisineBehavior = extractionFormData()
    const CuisineBehavior = JSON.parse(sessionStorage.getItem("getCuisineJson"))[$(".CuisineBehavior .Snowflake").html()]
    JsonCuisineBehavior["Preview"] = JsonCuisineBehavior["Preview"][JsonCuisineBehavior["Preview"].length - 1].split(".")[0]
    JsonCuisineBehavior["Snowflake"] = $(".CuisineBehavior .Snowflake").html()
    if (CuisineBehavior["Preview"] != JsonCuisineBehavior["Preview"]) {
        js1 = CuisineBehavior["Preview"]
        JsonCuisineBehavior["Preview"] = CuisineBehavior["Preview"]
    }else {js1="NULL"}
    UpImgOfJSONData(js1.replace("/", ""),"/HTML/Cuisine/UpImgDate",JSON.stringify(JsonCuisineBehavior),"/Cuisine/Cuisine/Update")
    UpFlush()
}
function DeleteButtonRenewal() {
    bd($(".order").find(".Delete button"),
        function () {
            const Snowflake = $(this).parents("#CuisineBehaviorH .CuisineBehavior").find(".Snowflake").text();
            let JsonCuisineBehavior = {"Snowflake": Snowflake, "DataID": $("#01").text()}
            DeleteajaxJSON("/Cuisine/Cuisine/Delete", "json", JSON.stringify(JsonCuisineBehavior), "application/json")
        })
}
function bd(a,b) {
    a.unbind()
    a.mousedown(b)
}
//t1
//基于模板的创建和修改
function inputModules() {
    var CuisineBehavior = $("#modules div").filter(".CuisineBehavior").clone()
    CuisineBehavior.find(".Preview").html("<img name='Preview' src='/static/img/空白图.jpeg'>")
    CuisineBehavior.find(".DishName").html("<input type='text' name='DishName' value='' >")
    CuisineBehavior.find(".ExplainInDetail").html("<textarea   name='ExplainInDetail' value='' style=' width: 50vw;height: content-box'></textarea>")
    CuisineBehavior.find(".Craft").html("<textarea   name='Craft' value='' style=' width: 50vw;height: content-box'></textarea>")
    CuisineBehavior.find(".Price").append(newE("input")).find("input")
        .attr({width:"10vw",height:"2vh",type:"number",step:"0.01",min:"0" ,name:"Price"})
    var FoodIngredients = CuisineBehavior.find(".FoodIngredient").text("").append("材料：<br>")
    FoodIngredients.append("<div><span style='font-size: 1.5em;'>+</span><br></div>")
    FoodIngredients.find("span:contains('+')").parent().mousedown(function () {
        FoodIngredients.find("span:contains('+')").parent("div")
            .before("<div style='padding-right: 0.1vw; float: left;'>" +
                "<input type='text' name='key' value='' >:" +
                "<input type='text' name='value' value='' >" +
                "<span style='font-size: 1.5em;margin-left: 0.5em;'>-</span><br>" +
                "</div>")
        FoodIngredients.find("span:contains('-')").unbind().mousedown(function () {
            $(this).parent("div").remove()
        })
    })
    CuisineBehavior.find(".order div").first().next().addBack().css("display", "none")
    CuisineBehavior.find(".order div").last().css("display", "block")
    return CuisineBehavior
}
function FFA(CuisineBehavior) {
    const CuisineBehaviorg = inputModules();
    const P = CuisineBehaviorg.find(".Preview").html("");
    const pi = P.append(newE("input")).find("input");
    const pl = P.append(newE("label")).find("label");
    const pl2 = pl.append(newE("img")).find("img")
        .attr({id:"imgPreview",src:"/static/img/空白图.jpeg"}).css({"z-index":2,"position":"absolute","opacity":0});
    const pl1 = pl.append(newE("img")).find(":not(img[id='imgPreview'])")
        .css({"z-index":1,"position":"relative"});
    pl1.attr({src:"/static/img/空白图.jpeg"});
    if(CuisineBehavior["Preview"]!="空白图"){
        const st = "/static/img/CuisineImage/" + CuisineBehavior["Preview"] + ".jpg?Time=" + (new Date()).getTime();
        pl1.attr("src",st);
        pi.attr("value",st);
    }
    pl2.mouseenter(function () {
        $(this).animate({opacity: 0.8});
    }).mouseleave(function () {
        $(this).animate({opacity: 0.0});
    })
    pi.attr({id:"UpImg",style:"display: none;",accept:".jpg",type:"file",name:"Preview",value: "/static/img/空白图.jpeg"});
    pi.change(function () {
        returnFileSize(P, document.getElementById("UpImg"), pl1);
    });
    pl.css({"position":"relative"}).attr({for:"UpImg"});
    CuisineBehaviorg.find(".DishName input").attr("value", CuisineBehavior["DishName"]);
    CuisineBehaviorg.find(".ExplainInDetail textarea").text(CuisineBehavior["ExplainInDetail"]);
    CuisineBehaviorg.find(".Craft textarea").text(CuisineBehavior["Craft"]);
    CuisineBehaviorg.find(".Price input").attr("value",CuisineBehavior["Price"]);
    CuisineBehaviorg.find(".Snowflake").html(CuisineBehavior["Snowflake"]);
    for (var dataKey in CuisineBehavior["FoodIngredient"]) {
        CuisineBehaviorg.find(".FoodIngredient div").last()
            .before("<div style='padding-right: 0.1vw; float: left;'>" +
                "<input type='text' name='key' value='" + dataKey +"' >:" +
                "<input type='text' name='value' value='" + CuisineBehavior["FoodIngredient"][dataKey] + "' >" +
                "<span style='font-size: 1.5em;margin-left: 0.5em;'>-</span><br>" +
                "</div>");
    };
    CuisineBehaviorg.find(".order div").first().next().addBack().css("display", "none");
    $("#p").css("display","none")
    return CuisineBehaviorg;
}
function UpImgOfJSONData(imgName,imgUrl,json,urlJson) {
    let state;
    if(imgName!="NULL"){
        let len = $("#UpImg").attr("value").split("/")
        if ("空白图"==imgName&&imgName!=len[len.length-1].split(".")[0]){
            let imgData = new FormData();
            imgData.append("img", $(".Preview input[id='UpImg']")[0].files[0]);
            imgData.append("Preview", imgName);
            state = PutajaxImg(imgUrl, imgData);
        }else {state = 200;}
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
    k["page"] = parseInt($("#pq").text());
    return k;
}
function extractionFormData() {
    let JsonCuisineBehavior = {}
    JsonCuisineBehavior["DishName"] = $(".CuisineBehavior input[name = 'DishName']").val()
    JsonCuisineBehavior["Preview"] = $(".CuisineBehavior input[name = 'Preview']").attr("value").split("/")
    JsonCuisineBehavior["ExplainInDetail"] = $(".CuisineBehavior textarea[name = 'ExplainInDetail']").val()
    JsonCuisineBehavior["Craft"] = $(".CuisineBehavior textarea[name = 'Craft']").val()
    JsonCuisineBehavior["Price"] = $(".CuisineBehavior input[name = 'Price']").val()
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
function initPage() {
    bd($("#p1"),function () {
        if ($(this).attr("id")=="p1"){
            let gD = extractionGETData()
            gD["page"]=1;
            getCuisine(gD)
        }
    })
    bd($("#pU"),function () {
        console.log(parseInt($("#pq").text())>1)
        if ($(this).attr("id")=="pU"&&parseInt($("#pq").text())>1){
            let gD = extractionGETData()
            gD["page"]=gD["page"]-1;
            getCuisine(gD)
        }else {alert("我是第一页")}
    })
    bd($("#pD"),function () {
        console.log(parseInt($("#pq").text())<parseInt($("#pz").text()))
        if ($(this).attr("id")=="pD"&&parseInt($("#pq").text())<parseInt($("#pz").text())){
            let gD = extractionGETData()
            gD["page"]=gD["page"]+1;
            getCuisine(gD)
        }else {alert("后面没有了")}
    })
    $("#pt").mouseenter(function () {
        document.getElementById("number").focus();

    })
    $("#pt").mouseleave(function () {
        document.getElementById("number").blur();
        const tval = parseInt($("#pt input").val())
        const dval = parseInt($("#pq").text())
        if ($(this).attr("id")=="pt"&&tval!=dval){
            let gD = extractionGETData()
            gD["page"]=tval;
            getCuisine(gD)
        }
    })
}