function checkComments(){
    postEvent('./getComment.do', null, function(json){
        if(json.err_code == 0){
            var div = document.getElementById('chatContent');
            div.innerHTML = json.err_msg;
        }
    }, function(json){});
}

comments_onloginSuccess = onloginSuccess;
onloginSuccess = function(){
    comments_onloginSuccess();
    checkComments();
}
