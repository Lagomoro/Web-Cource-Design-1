function showReply(father_id, html){ 
    var cookies = getCookies();
    if(cookies.username){
        document.getElementById('replyWindow').style.display='block';
        document.getElementById('replyFade').style.display='block';
        document.getElementById('replyInfo').innerHTML = html;
        document.getElementById('father').value = father_id;
    }else{
        window.location.href = "./login.html";
    }
}
function hideReply(){ 
    document.getElementById('replyWindow').style.display='none';
    document.getElementById('replyFade').style.display='none';
    document.getElementById('father').value = -1;
    document.getElementById('content').value = "";
    document.getElementById('content_data').value = "";
    activeCommentButton();
}

function activeCommentButton(){ 
    var button = document.getElementById('confirm');
    button.disabled = null; 
    button.value = "下一步";
}
function changeCommentButton(text){ 
    var button = document.getElementById('confirm');
    button.disabled = null; 
    button.value = text;
}
function deactiveCommentButton(){ 
    var button = document.getElementById('confirm');
    button.disabled = "disabled"; 
    button.value = "正在提交请求……"
}

function checkCommentForm(){ 
    var content = document.getElementById('content');
    var content_data = document.getElementById('content_data');
    var text = content.value;
    text = text.replace(/\r\n/g, "<br>");
    text = text.replace(/\n/g, "<br>");
    text = text.replace(/\s/g, "&nbsp;");
    content_data.value = text;
    deactiveCommentButton();
    return true;
}

$("iframe[name=replyBackContent]").on("load", function() { 
    var responseText = $("iframe")[0].contentDocument.body.getElementsByTagName("pre")[0].innerHTML; 
    var json = JSON.parse(responseText);
    switch(json.err_code){
    case 0:
        checkComments();
        hideReply();
        activeCommentButton();
        break;
    default:
        changeCommentButton(json.err_msg);
        activeCommentButton();
    }
}) 