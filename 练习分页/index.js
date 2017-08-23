/**
 * Created by Administrator on 2016/1/19.
 */

var list = document.getElementById("list");
var page = document.getElementById("page");
var pageList = document.getElementById("pageList")
//һ������ͨ��Ajax�����ǵ����ݻ�õ�
var total = 0;//������
var totalPage = 0;//��ҳ
var pageNum = 10, curPage = 1;
list.style.height = pageNum *30 + "px";
utils.ajax("data.txt", function (data) {
    total = data.length;
    totalPage = Math.ceil(total / pageNum);
    bindPage();
    bindData(curPage, data);

    //�����¼�ί��ʵ�����ǵķ�ҳ�л�
    page.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.tagName.toLocaleLowerCase() == "li") {
            //˵���ҵ���ķ�ҳ��ҳ��
            var page = Number(tar.innerHTML);
            curPage = page;
            changeBg();
        } else if (tar.id === "first") {
            curPage = 1;
        } else if (tar.id === "last") {
            curPage = totalPage;
        } else if (tar.id === "prev") {
            if (curPage === 1)return;
            curPage--;
        } else if (tar.id === "next") {
            if (curPage === totalPage)return;
            curPage++;
        } else if (tar.id === "search") {
            return
        }
        bindData(curPage, data);
    }
    //�� �������ı����keyup�¼���������µ���enter������
    var search = document.getElementById("search");
    search.onkeyup = function (e) {
        e = e || window.eventt;
        if (e.keyCode === 13) {
            var val = this.value.replace(/(^ +)|( +$)/g, "");
            if (val) {
                if (/^(\d|([1-9]\d+))$/.test(val)) {
                    if (val >= 1 && val <= totalPage) {
                        this.value = totalPage;
                        val = totalPage;
                    } else {
                        this.value = totalPage;
                    }
                    curPage = val;
                    bindData(val, data)
                } else {
                    this.value = '';
                    this.focus();
                }
            }
            changeBg();
        }
    }
})
//��̬�����Ƿ�ҳ��ҳ��
function bindPage() {
    var str = '';
    for (var i = 1; i <= totalPage; i++) {
        var c = i === curPage ? "select" : null;
        str += "<li class='" + c + "'>" + i + "</li>"
    }
    pageList.innerHTML = str;



}
//��ʵ�����Ƕ����ݵİ�
//����ҵ�ǰ�󶨵ĵ�һҳ�����ݣ�����������0-9
//0-9
//10-19
//20-29  ��ʼ�����ͽ��������Ĺ���
//��ʼֵ(n-1)*pageName ~ n*pageNum - 1;
function bindData(page, data) {
    var sIndex = (page - 1) * pageNum, enIndex = page * pageNum - 1;
    var str = "";
    for (var i = sIndex; i < enIndex; i++) {
        var cur = data[i];
        if (cur) {
            var c = i % 2 === 1 ? "even" : null;
            str += "<li class='" + c + "' num='" + cur["num"] + "'>";

            for (var key in cur) {
                var val = key === "sex" ? (cur[key] === 1 ? "��" : "Ů") : cur[key];
                str += "<span>" + val + "</span>"
            }
            str += "</li>";
        }

    }
    list.innerHTML = str;


    var oLis = list.getElementsByTagName("li");
    for(var k=0;k< oLis.length;k++){
        oLis[k].onclick = function(){
            /**
             * window.location.href = xxx��ת��ָ����ҳ���ڱ����ڴ�
             * var url = window.location.href; ��ȡ��ҳ���url��ַ
             * window.open('��ַ')  ��ת��ָ����ҳ�棬���´����д�
             * @type {string}
             */
            window.location.href = "detail.html?num="+ this.getAttribute("num");
        }
    }
}

//ʵ�ַ�ҳѡ����ʽ�л�
function changeBg() {
    var oLis = pageList.getElementsByTagName("li")
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = i === (curPage - 1) ? "select" : null;
    }
}



/*
var str2 = '2222333445566777222';
var reg = /\d+/
var str3 = str2.replace(reg,"$1")*/
