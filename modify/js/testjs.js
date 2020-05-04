var words = document.getElementById("word");
var sentence = document.getElementById("sentence");
var description = document.getElementById("description");
//var imgs = document.getElementById("images");
//var realimage = document.getElementById("realimage");
var download = document.getElementById("submit");
var jname = document.getElementById("jname");
var item = document.getElementById('item');


var storesentence = "cell is important to us";
var storewords = [];
var storehints = {};

sentenceflag = 0;
nameflag = 0;
descriptionflag = 0;


sentence.onfocus = function() {
    if (sentenceflag === 0) {
        this.class = "inputshow";
        this.innerHTML = "";
        sentenceflag = 1;
    }
};
sentence.onblur = function() {
    if (this.value === "") {
        this.innerHTML = "cell is important to us";
        sentenceflag = 0;
        storesentence = "cell is important to us";
        this.class = "defaultshow";
    } else {
        //storesentence = this.value.trim().split(/\s+/);
        storesentence = this.value;
        //console.log(storesentence);
    }
};

jname.onfocus = function() {
    if (nameflag === 0) {
        this.class = "inputshow";
        this.value = "";
        nameflag = 1;
    }
};
jname.onblur = function() {
    if (this.value === "") {
        this.value = "test.json";
        nameflag = 0;
        this.class = "defaultshow";
    } else {
        if (this.value.slice(-5) !== ".json") {
            this.value = this.value + ".json";
        }
    }
};

description.onfocus = function() {
    if (descriptionflag === 0) {
        this.class = "inputshow";
        this.innerHTML = "";
        descriptionflag = 1;
    }
};
description.onblur = function() {
    if (this.value === "") {
        this.innerHTML = "Description to your question!";
        descriptionflag = 0;
        storesentence = "Description to your question!";
        this.class = "defaultshow";
    } else {
        //storesentence = this.value.trim().split(/\s+/);
        storesentence = this.value;
        //console.log(storesentence);
    }
};

download.onclick = function() {
    var store = {};
    store["sentence"] = storesentence;
    store["words"] = [];
    store["hints"] = {};
    store["description"] = description.value;
    for (var i = 0; i < storewords.length; i++) {
        if (
            storewords[i] !== "$" &&
            storehints.hasOwnProperty(storewords[i])
        ) {
            store["words"][store["words"].length] = storewords[i];
            store["hints"][storewords[i]] = {};
            store["hints"][storewords[i]]["text hints"] =
                storehints[storewords[i]]["text hints"];
            store["hints"][storewords[i]]["img hints"] =
                storehints[storewords[i]]["img hints"];
        }
    }

    var filename = jname.value;
    downLoadFiles(store, filename);
    window.location.reload();
};

const downLoadFiles = (data, fileName) => {
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        var blob = new Blob([JSON.stringify(data)], {
            type: "data:application/json;charset=utf-8",
        });
        navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
        const a = document.createElement("a");
        a.style.visibility = "hidden";
        document.body.appendChild(a);
        var blobs = new Blob([JSON.stringify(data)], {
            type: "data:application/json;charset=utf-8",
        });
        var objurl = URL.createObjectURL(blobs);
        a.href = objurl;
        // a.href = "data:application/json;charset=utf-8" + JSON.stringify(data, null, 2);
        a.download = fileName;
        a.click();
        document.body.removeChild(a);
    }
};

var rightTr = document.getElementById("dyna").getElementsByTagName("tr");
for (var j = 0; j < rightTr.length; j++) {
    if (j == 0) {
        continue;
    }
    trFunction(rightTr[j]);
}

function trFunction(obj) {
    td = obj.getElementsByTagName("input");
    timg = obj.getElementsByTagName("img");
    console.log(td);
    td[0].onfocus = function() {
        if (this.value === "Word?") {
            this.class = "inputshow";
            this.value = "";
        }
    };
    td[0].onblur = function() {
        var tr = this.parentNode.parentNode;
        var td = tr.getElementsByTagName("input");
        if (this.value === "") {
            this.value = "Word?";
            //alert("Empty Word!");
            this.class = "defaultshow";
        } else {
            var temp = 0;
            for (var i = 0; i < storewords.length; i++) {
                if (storewords[i] === this.value) {
                    temp++;
                    break;
                }
            }
            if (this.value !== "Word?" && temp === 0) {
                storewords[storewords.length] = this.value;
                storehints[this.value] = {};
                storehints[this.value]["text hints"] = "Please enter hints";
                storehints[this.value]["img hints"] = "None";
                if (td[1].value !== "Please enter hints") {
                    storehints[this.value]["text hints"] = td[1].value;
                }
                if (td[2].value !== "None") {
                    storehints[this.value]["img hints"] = td[2].value;
                }
            }
        }
    };
    td[1].onfocus = function() {
        if (this.value === "Please enter hints") {
            this.class = "inputshow";
            this.value = "";
        }
    };
    td[1].onblur = function() {
        var tr = this.parentNode.parentNode;
        var td = tr.getElementsByTagName("input");
        if (this.value === "") {
            this.value = "Please enter hints";
            //alert("Empty hint!");
        } else {
            if (
                td[0].value !== "" &&
                td[0].value !== "Word?" &&
                this.value !== "Please enter hints"
            ) {
                storehints[td[0].value]["text hints"] = this.value;
            }
        }
    };
    td[2].onfocus = function() {
        if (this.value === "None") {
            this.class = "inputshow";
            this.value = "";
            imgsourceflag = 1;
        }
        console.log(timg[0]);
    };
    td[2].onblur = function() {
        var tr = this.parentNode.parentNode;
        var td = tr.getElementsByTagName("input");
        var timg = tr.getElementsByTagName("img");
        if (this.value === "") {
            this.value = "None";

            imgsource = "None";
            this.class = "defaultshow";
        } else {
            if (
                td[0].value !== "" &&
                td[0].value !== "Word?" &&
                this.value !== "None"
            ) {
                storehints[td[0].value]["img hints"] = this.value;
            }
        }

        timg[0].src = this.value;
    };
}

function del(obj) {
    var tr = obj.parentNode.parentNode;
    var td = tr.getElementsByTagName("input");
    console.log(storehints);
    for (var i = 0; i < storewords.length; i++) {
        if (storewords[i] === td[0].value) {
            storewords[i] = "$";
        }
    }
    console.log(storehints);
    tr.parentNode.removeChild(tr);
}

function addNewWord() {
    var coitem = document.createElement("tr")
    coitem.innerHTML = item.innerHTML;
    coitem.style = item.style;
    console.log(coitem)
    document.getElementById("right-table").appendChild(coitem)

    rightTr = document.getElementById("dyna").getElementsByTagName("tr");
    for (let j = 0; j < rightTr.length; j++) {
        if (j == 0) {
            continue;
        }
        trFunction(rightTr[j]);
    }
    // var tr = document.createElement("tr");
    // var xh = document.createElement("td");
    // var xm = document.createElement("td");
    // var xis = document.createElement("td");
    // var xim = document.createElement("td");
    // var del = document.createElement("td");

    // xh.style.width = "50px";
    // xm.style.width = "200px";
    // del.style.width = "50px";
    // xis.style.width = "180px";
    // xim.style.width = "200px";
    // xh.innerHTML =
    //     "<input type='text' value='Word?' class='defaultshow' style='width: 50px;' />";
    // xm.innerHTML =
    //     "<input type='text' value='Please enter hints' class='defaultshow' style='width: 200px;' />";
    // xis.innerHTML = "<input type='text' value='None' />";
    // xim.innerHTML = "<img src = '' class = 'smallimg'/>";
    // del.innerHTML =
    //     "<input type='button' onclick='del(this)' value='delete' >";
    // var tab = document.getElementById("dyna");
    // tab.appendChild(tr);
    // tr.appendChild(xh);
    // tr.appendChild(xm);
    // tr.appendChild(xis);
    // tr.appendChild(xim);
    // tr.appendChild(del);
    // var rightTr = document
    //     .getElementById("dyna")
    //     .getElementsByTagName("tr");
    // for (var j = 0; j < rightTr.length; j++) {
    //     if (j == 0) {
    //         continue;
    //     }
    //     trFunction(rightTr[j]);
    // }
}