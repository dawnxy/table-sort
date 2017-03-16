/**
 * Created by Administrator on 2016/12/3.
 */
//1、获取要操作的元素
var tab=document.getElementById("tab");
var oThs=tab.tHead.rows[0].cells;
var tBody=tab.tBodies[0];
var oRows=tBody.rows;
var data=null;

//2、获取数据
(function getData() {
    var xhr=new XMLHttpRequest();
    xhr.open("get","data.txt",false);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            var jsonStr=xhr.responseText;
            data=utils.jsonParse(jsonStr);
        }
    }
    xhr.send(null);
})();
//console.log(data);

//3、绑定数据到页面
(function bindData() {
    if(data&&data.length>0){
        var frg=document.createDocumentFragment();
        for(var i=0;i<data.length;i++){
            var curDataObj=data[i];
            var tr=document.createElement("tr");
            for(key in curDataObj){
                var td=document.createElement("td");
                td.innerHTML=key=="develop"?(curDataObj[key]=curDataObj[key]==0?"发展中":"发达的"):curDataObj[key];
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tBody.appendChild(frg);
    }
})();

//4、隔行变色
function changeBg() {
    for(var i=0;i<oRows.length;i++){
        oRows[i].className="bg"+(i%2+1);
    }
}
changeBg();

//5、点击表头中的th，进行表格排序
var curClickIndex=null;
(function () {
    for(var i=0;i<oThs.length;i++){
        if(oThs[i].className=="rank"){
            oThs[i].index=i;
            oThs[i].sortFlag=-1;
            oThs[i].onclick=function () {
                tableSort.call(this,this.index);
            }
        }
    }
})();
//排序函数
function tableSort(n) {
    var oRowsAry=utils.listToArray(oRows),_this=this;

    //问题：点击a，点击其他的th后，再次点击a，a必须是升序
    //方法一,如果th不是当前点击的，将它的sortFlag设置为-1
    /*for(var i=0;i<oThs.length;i++){
        if(oThs[i]!=this){
            oThs[i].sortFlag=-1;
        }
    }*/

    //方法二：
    if(curClickIndex !== this.index) {
        curClickIndex = this.index;
        this.sortFlag = -1;
    }


    this.sortFlag*=-1;
    oRowsAry.sort(function (curTr,nextTr) {
        var curCon=curTr.cells[n].innerHTML;
        var nextCon=nextTr.cells[n].innerHTML;
        return isNaN(curCon)||isNaN(nextCon)?(curCon.localeCompare(nextCon))*_this.sortFlag:(curCon-nextCon)*_this.sortFlag;
    });
    var frg=document.createDocumentFragment();
    for(var i=0;i<oRowsAry.length;i++){
        frg.appendChild(oRowsAry[i]);
    }
    tBody.appendChild(frg);
    changeBg();
}

