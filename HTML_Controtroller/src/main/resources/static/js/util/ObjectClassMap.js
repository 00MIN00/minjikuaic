//类
class Cuisine{
    Snowflake;
    Preview;
    DishName;
    FoodIngredient;
    ExplainInDetail;
    Craft;
    Price;
    constructor(JsonData) {
        if (JsonData==undefined){return null;}
        const MapData = new Map();
        for (let str of Object.keys(JsonData)) {
            MapData.set(str,JsonData[str])
        }
        MapData.has("Snowflake") ? this.Snowflake = MapData.get("Snowflake") : this.Snowflake = null;
        MapData.has("Preview") ? this.Preview = MapData.get("Preview") : this.Preview = null;
        MapData.has("DishName") ? this.DishName = MapData.get("DishName") : this.DishName = null;
        MapData.has("FoodIngredient") ? this.FoodIngredient = MapData.get("FoodIngredient") : this.FoodIngredient = null;
        MapData.has("ExplainInDetail") ? this.ExplainInDetail = MapData.get("ExplainInDetail") : this.ExplainInDetail = null;
        MapData.has("Craft") ? this.Craft = MapData.get("Snowflake") : this.Craft = null;
        MapData.has("Price") ? this.Price = MapData.get("Price") : this.Price = null;
    }
    set Snowflake(Snowflake){this.Snowflake=Snowflake}
    get Snowflake(){return this.Snowflake}
    set Preview(Preview){this.Preview=Preview}
    get Preview(){return this.Preview}
    set DishName(DishName){this.DishName=DishName}
    get DishName(){return this.DishName}
    set FoodIngredient(FoodIngredient){this.FoodIngredient=FoodIngredient}
    get FoodIngredient(){return this.FoodIngredient}
    set ExplainInDetail(ExplainInDetail){this.ExplainInDetail=ExplainInDetail}
    get ExplainInDetail(){return this.ExplainInDetail}
    set Craft(Craft){this.Craft=Craft}
    get Craft(){return this.Craft}
    set Price(Price){this.Price=Price}
    get Price(){return this.Price}
}
class Orderfood{
    Snowflake
    userSnowflake;     //顾客id
    userName;          //顾客姓名
    state;             //状态{0:空置,1:已预约,2:未点餐,3:未上完菜,4:未结账}
    KeyList;           //菜品id列表
    TimeToOrder
    TimeOfCheckout
    total              //合计
    discount           //折扣
    receivable         //应付
    payment            //付款
    change             //找零
    integral           //积分
    couponSnowflake             //优惠劵
    constructor(Orderfoodjson) {
        if (Orderfoodjson==null){return this}
        const MapData = new Map();
        for (let str of Object.keys(Orderfoodjson)) {
            MapData.set(str,Orderfoodjson[str])
        }
        MapData.has("Snowflake") ? this.Snowflake = MapData.get("Snowflake") : this.Snowflake = null;
        MapData.has("userSnowflake") ? this.userSnowflake = MapData.get("userSnowflake") : this.userSnowflake = null;
        MapData.has("userName") ? this.userName = MapData.get("userName") : this.userName = null;
        MapData.has("state") ? this.state = MapData.get("state") : this.state = null;
        if(MapData.has("keyList")){
            this.KeyList = typeof MapData.get("keyList")=="object"?MapData.get("keyList") :JSON.parse(MapData.get("keyList"));
        }else {
            if(MapData.has("KeyList")){
                this.KeyList = typeof MapData.get("KeyList")=="object"?MapData.get("KeyList") :JSON.parse(MapData.get("KeyList"));
            }else {
                this.KeyList = null;
            }
        }
        MapData.has("TimeToOrder") ? this.TimeToOrder = MapData.get("TimeToOrder") : this.TimeToOrder = null;
        MapData.has("TimeOfCheckout") ? this.TimeOfCheckout = MapData.get("TimeOfCheckout") : this.TimeOfCheckout = null;
        MapData.has("total") ? this.total = MapData.get("total") : this.total = null;
        MapData.has("discount") ? this.discount = MapData.get("discount") : this.discount = null;
        MapData.has("receivable") ? this.receivable = MapData.get("receivable") : this.receivable = null;
        MapData.has("payment") ? this.payment = MapData.get("payment") : this.payment = null;
        MapData.has("change") ? this.change = MapData.get("change") : this.change = null;
        MapData.has("integral") ? this.integral = MapData.get("integral") : this.integral = null;
        MapData.has("couponSnowflake") ? this.couponSnowflake = MapData.get("couponSnowflake") : this.couponSnowflake = null;
    }
    set Snowflake(Snowflake){this.Snowflake=Snowflake}
    get Snowflake(){return this.Snowflake}
    set userSnowflake(userSnowflake){this.userSnowflake=userSnowflake}
    get userSnowflake(){return this.userSnowflake}
    set userName(userName){this.userName=userName}
    get userName(){return this.userName}
    set state(state){this.state=state}
    get state(){return this.state}
    set KeyList(KeyList){this.KeyList=JSON.parse(KeyList)}
    get KeyList(){return this.KeyList}
    set TimeToOrder(TimeToOrder){this.TimeToOrder=TimeToOrder}
    get TimeToOrder(){return this.TimeToOrder}
    set TimeOfCheckout(TimeOfCheckout){this.TimeOfCheckout=TimeOfCheckout}
    get TimeOfCheckout(){return this.TimeOfCheckout}
    set total(total){this.total=total}
    get total(){return this.total}
    set discount(discount){this.discount=discount}
    get discount(){return this.discount}
    set receivable(receivable){this.receivable=receivable}
    get receivable(){return this.receivable}
    set payment(payment){this.payment=payment}
    get payment(){return this.payment}
    set change(change){this.change=change}
    get change(){return this.change}
    set integral(integral){this.integral=integral}
    get integral(){return this.integral}
    set couponSnowflake(couponSnowflake){this.couponSnowflake=couponSnowflake}
    get couponSnowflake(){return this.couponSnowflake}
    //输入方法查询
}


//批量方法
function CuisineLits(Object) {
    let map = new Array();
    for (const tagDatumKey in Object) {map.push(new Cuisine(Object[tagDatumKey]))}
    return map;
}
function OrderfoodLits(Object) {
    let map = new Array();
    for (const tagDatumKey in Object) {map.push(new Orderfood(Object[tagDatumKey]))}
    return map;
}