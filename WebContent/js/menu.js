function postEvent(url, parameters, after, error){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
    xhr.onload = function() {
        if (xhr.status < 400) {
            var json = JSON.parse(xhr.responseText);
            after.call(xhr, json);
        }
    };
    xhr.onerror = function() {
        error.call(xhr, xhr);
    };
    xhr.send(parameters);
}

function getCookies(){
    var cookieObj = {};
    var temp = [];
    var cookies = document.cookie.split(";");
    for(var i = 0; i < cookies.length;i++){
        if(cookies[i]) {
            temp = cookies[i].split("=");
            cookieObj[temp[0].trim()] = temp[1].trim();
        }
    }
    return cookieObj;
}

onloginSuccess = function(){};

function checkLogin(){
    var cookies = getCookies();
    if(cookies.username){
        postEvent('./checkLogin.do', 'username=' + cookies.username, function(json){
            if(json.err_code == 0){
                var a = document.getElementById('login');
                a.innerText = "欢迎回来，" + json.err_msg + "<" + cookies.username + ">";
                a.setAttribute('href', './modify.html');
                onloginSuccess.call(); 
            }
        }, function(json){});
    }
}

checkLogin();

function logout(){
    var cookies = getCookies();
    if(cookies.username){
        postEvent('./logout.do', 'username=' + cookies.username, function(json){
            if(json.err_code == 0){
                var a = document.getElementById('login');
                a.innerText = "您好，请登录";
                a.setAttribute('href', './login.html');
                window.location.href = "./login.html";
            }
        }, function(json){});
    }
}