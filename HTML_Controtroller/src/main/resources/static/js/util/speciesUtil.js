$(document).ready(function () {
    $("#queryCuisine").find("div").css("padding", "0px 1px 0px 1px").css("width", "auto")
    $("#queryCuisine").find("div").find("div").css("padding", "0px 1px 0px 1px").css("width", "auto")
    $("#details .row .col-12").append(newE("div")).find("div")
        .attr({id:"insertSpecies"})
        .css({float:"right"})
        .append(newE("button")).find("button").attr({"type":"button"})
        .css({padding:"1.5em","padding-block":"0.8em","font-size":"0.8em"
            ,"background-color":"rgba(32, 155, 250,1)","color":"rgb(255,255,255)"})
        .text("创建分区")
    getSpecies(null)
})
function getSpecies(jsonData) {
    console.log($("#SpeciesBehaviorH"))
    $("#SpeciesBehaviorH").html("")
    jsonData = GetajaxJSON("/Cuisine/Species/selectAll", "json", "", "")["data"];
    console.log(jsonData)
    for (let obj in jsonData){

        let SpeciesBehavior = $("#modules .SpeciesBehavior").clone();
        SpeciesBehavior.find(".Snowflake").html(jsonData[obj]["Snowflake"]);
        SpeciesBehavior.find(".SpeciesName").html(jsonData[obj]["ZoningName"]);
        const list = jsonData[obj]["KeyList"];
        let sb = SpeciesBehavior.find(".DishName")
        console.log(list)
        if(Object.keys(list).length>0){
            for (let str in list){
                sb.append(document.createElement("div")).find("div:not(.key)")
                    .css(" margin","0.1vw").attr({key : str,class:"key"}).text(list[str]).css({"margin-right": "vw0.1"})
            }
        }
        SpeciesBehavior.find(".DishName").css({ margin:"0px"});
        SpeciesBehavior.find(".Snowflake").attr("href",jsonData[obj]["href"]);
        console.log(SpeciesBehavior)
        $("#SpeciesBehaviorH").append(SpeciesBehavior);
        console.log($("#SpeciesBehaviorH"))
    }
    sessionStorage.setItem("getSpeciesJson", JSON.stringify(jsonData))
    buildUpdate()
    DeleteButtonRenewal()
    insertSpecies()
}
function buildUpdate() {
    $(".Update button").mousedown(function () {
        let lits = {"Name1":null,"Name2":null
            ,"Snowflake1":null,"Snowflake2":null
            ,"Data1":null,"Data2":null};
        let jsonData = JSON.parse(sessionStorage.getItem("getSpeciesJson"));
        $("#details>div[class$='row']").css({display: "none"})
        $("#details #ss").append(newE("div")).append(newE("div"))
        $("#details #ss>div" +
            "").eq(0).attr({id:"bt"});
        $("#details #ss>div").eq(-1).attr({id:"gai"});
        const  gai =$("#gai")
        const  bt =$("#bt")
        bt.addClass("col-12").css({margin: "10px 0px 10px 1px"}).append(newE("span")).find("span").css({"font-size":" 28px",height: "40px","font-weight": 500})
            .text("菜品管理")
        for (let obj in jsonData) {
            gai.append(newE("div"));
        }
        const y = gai.find("div").eq(0)
        const z = gai.find("div").eq(1)
        const g = gai.find("div").eq(2)
        gai.css({"padding-block": "1vw","padding-inline": "2vw",
            "background-color":" rgba(245,245,245,1)","min-height":"30vh","max-height":"50vh",height:"35vh"});
        z.attr({class: "TabPanel"}).append(document.createElement("div"));
        y.attr({class: "ControlPanel",name:"A"});
        g.attr({class: "ControlPanel",name:"B"});
        const Bselect = z.find("div").append(document.createElement("select")).find("select").attr({id:"BName"}).css({width:"100%"});
        Bselect.append(document.createElement("option")).find("option").not(Bselect.find("option[value]")).attr({value:"0"}).text("请选择更改对象");
        for (let obj in jsonData) {
            if ($(this).parents(".SpeciesBehavior").find(".Snowflake").text()==obj){continue;};
            Bselect.append(document.createElement("option")).find("option").not(Bselect.find("option[value]")).attr({value:obj}).text(jsonData[obj]['ZoningName']);
        };
        z.find("div").append(document.createElement("div")).find("div").css({height:"1.5vh",width:"100%"});
        z.children("div").append(document.createElement("button")).find("button").text("提交").css("margin-inline","2vw").attr({id:"UPUpData"});
        const ylits = jsonData[$(this).parents(".SpeciesBehavior").find(".Snowflake").text()]["KeyList"];
        loadElement(y,ylits);
        Bselect.change(function () {
            let lits  =  JSON.parse(sessionStorage.getItem("lits"));
            Bselect.find("option[value='0']").remove();
            loadElement(g,jsonData[Bselect.find("option:selected")[0].value]["KeyList"]);
            loadElement(y,ylits);
            z.css({height: y.height});
            lits.Snowflake2=Bselect.find("option:selected")[0].value;
            lits.Name2=$.trim(Bselect.find("option:selected").text());
            boundKey();
            sessionStorage.setItem("lits",JSON.stringify(lits))
        })
        lits.Snowflake1=$.trim($(this).parents(".SpeciesBehavior").find(".Snowflake").text());
        lits.Name1=$.trim($(this).parents(".SpeciesBehavior").find(".SpeciesName").text());
        $(".ControlPanel").mouseleave(function () {
            $(".key").unbind();
            boundKey()
        })
        sessionStorage.setItem("lits",JSON.stringify(lits))
        UPUpdate(lits,Bselect);
    })

}
function UPUpdate() {
    $("button[id=UPUpData]").mousedown(function () {
        let lits  =  JSON.parse(sessionStorage.getItem("lits"));
        const DataObj = $(".ControlPanel");
        function forObj(objLits,lits) {
            for (let obj of objLits){
                lits.push($(obj).attr("key"));
            }
            return lits
        }

        lits.Data1 = forObj(DataObj.filter('div[name=A]').find("div"),[]);
        lits.Data2 = forObj(DataObj.filter('div[name=B]').find("div"),[]);

        PutajaxJSON("/Cuisine/Species/Update", "json",JSON.stringify(lits), "application/json")
        $("#gai").remove();
        $("#bt").remove();
        setTimeout(function () {
            $("#details>div[class$='row']").css({display: "block"})
            getSpecies(null)
        },1000)
    })

}
function DeleteButtonRenewal() {
    bd($(".order").find(".Delete button"),
        function () {
            const Snowflake = $(this).parents("#SpeciesBehaviorH .SpeciesBehavior").find(".Snowflake").text();
            let JsonCuisineBehavior = {"Snowflake": Snowflake, "DataID": $("#01").text()}
            DeleteajaxJSON("/Cuisine/Species/Delete", "json", JSON.stringify(JsonCuisineBehavior), "application/json")
            getSpecies(null)
        })
}
function insertSpecies() {
    bd($("#insertSpecies"),function () {
        const name = window.prompt("新建分区名称")
        if(name==null || name=="null"){
            getSpecies(null)
        }
        PostajaxJSON("/Cuisine/Species/insertCuisine", "json", name, "application/json")
        setTimeout(function () {
            getSpecies(null)
        },1000)
    })
}
function loadElement(obj,lits) {
    obj.text("")
    for (const Element in lits) {
        obj.append(document.createElement("div"))
        obj.find("div:not(.key)").text(lits[Element])
            .attr({class:"key","key":Element}).css({"margin-inline":"0.5vw"})
    }
}
function boundKey() {
    $(".key").mousedown(function (){
        const keyc =this;
        const namec = $(keyc).parent().attr("name");
        if (namec=="A"){
            $("div[name=A]").find("div[key='"+$(keyc).attr("key")+"']").remove()
            $("div[name=B]").append(keyc)
        }else {
            $("div[name=B]").find("div[key='"+$(keyc).attr("key")+"']").remove()
            $("div[name=A]").append(keyc)
        }
    })
}