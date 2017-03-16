/**
 * Created by Administrator on 2016/12/3.
 */
var utils={
    jsonParse:function (jsonStr) {
        return "JSON" in window?JSON.parse(jsonStr):eval("("+jsonStr+")");
    },
    listToArray:function (likeAry) {
        var ary=[];
        try{
            return Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary.push(likeAry[i]);
            }
            return ary;
        }
    }
}