/***
 * 获得活动列表
 */
function getActivityList(){
    $.ajax({
        url:"/activity.do",
        method:"get",
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            for (var i =0;i<data.length; i++){
                var a = data[i];
                var color = 'bg-primary';
                switch (i % 4) {
                    case 0:
                        color='bg-warning';
                        break;
                    case 1:
                        color='bg-primary';
                        break;
                    case 2:
                        color='bg-inverse';
                        break;
                    case 3:
                        color='bg-danger';
                        break;
                }
                $('#col_' + i % 3).append('<div id="contentfeeds8" class="panel panel-animated panel-default animated fadeInUp" style="visibility: visible;"><div class="panel-body bordered-bottom"><div class="no-padding jumbotron '+color+'"><p class="lead"><a href="activity_detail.html#'+a.id+'">'+a.title+'</a></p></div><p class="text-muted">'+a.body+'</p><div class="text-muted"><small style="color:red;" class="endTime">活动结束时间:0</small></div></div></div>');
                var endTime = new Date(a.endTime).getTime()-new Date().getTime();
                $('#col_' + ( i % 3 )  +" small:last").data("endTime",endTime);
            }
        }
    });
    setInterval(countDown,1000);
}
function countDown() {
    var smalls = $('#side_right .endTime');
    $(smalls).each(function () {
        var endTime = $(this).data("endTime");
        if (endTime > 0){
            var time = endTime;
            var day = parseInt(time / (1000*60*60*24));
            time %=(1000*60*60*24);
            var hours = parseInt(time / (1000*60*60));
            time %=(1000*60*60);
            var minute = parseInt(time / (1000*60));
            time %=(1000*60);
            var second = parseInt(time / 1000);
            $(this).html('距离结束还有：'+day+'天'+hours+'小时'+minute+'分'+second+'秒');
            $(this).data("endTime",(endTime - 1000));
        }else {
            $(this).html('活动已结束');
            var a =$(this).parent().parent().find('a');
            a.attr("href","javascript:return false");
            a.css('cursor','default');
        }
    });
}

/***
 * 查询指定活动下已参加活动的笔记列表
 */
function getNoteActivitys(){
    var activityId = location.hash.substr(1);
    $.ajax({
        url:"/activityNote.do",
        method:"get",
        data:{activityId:activityId},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            $('#first_action .contacts-list').empty();
            for (var i =0; i<data.length; i++){
                var activityNote = data[i]['activityNote'];
                var upDown = data[i]['upDown'];
                var upState = "fa-thumbs-o-up";
                var downState = "fa-thumbs-o-down";
                if (upDown !=null) {
                    if (upDown.state == 1){
                        upState ="fa-thumbs-up";
                    } else if(upDown.state == 2){
                        downState ="fa-thumbs-down";
                    }
                }
                $('#first_action .contacts-list').append('<li class="online"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+activityNote.share.title+'<button type="button" class="btn btn-default btn-xs btn_position_3 btn_up" style="margin-right: 40px"><i class="fa ' + upState + '"></i><i id="up"> ' + activityNote.up + '</i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_down" ><i class="fa ' + downState + '"></i><i id="down">' + activityNote.down + '</i></button><button type="button" class="btn btn-default btn-xs btn_position btn_like"><i class="fa fa-star-o"></i></button></a></li>\n');
                $('#first_action .contacts-list li:last').data('activityNote',activityNote);
                $('#first_action .contacts-list li:first').click();
            }
        }
    })
}

/***
 * 查询活动笔记内容
 */
function getNoteActivityDetail(){
    console.log("查询活动笔记内容");
    var an = $('#first_action .contacts-list li .checked').parent().data('activityNote');
    $('#content_body').html('<h4><strong>笔记标题: </strong>'+ an.share.title+'</h4>'+'<div>'+an.share.body+'</div>');
}

/***
 * 查询可选择的笔记本
 */
function getSelectNoteBook(){
    $.ajax({
        url: '/notebook.do',
        method: 'get',
        success: function (data) {
            if(data == 'fail'){
                location.href='login.html';
                return;
            }
            var special = data['special'];
            var normal = data['normal'];
            //绑定特殊笔记本
            for (var i = 0; i < special.length; i++) {
                var nb = special[i];
                switch (nb.name) {
                    case '默认':
                        $('#select_notebook .contacts-list li:first').data("notebook",nb);
                        break;
                }
            }
            $('#select_notebook .contacts-list li').not( $('#select_notebook .contacts-list li:first')).remove();
            //绑定普通笔记本
            for (var i = 0;i < normal.length; i++) {
                var nb = normal[i];
                $('#select_notebook .contacts-list').append('<li class="online"><a ><i class="fa fa-book" title="online" rel="tooltip-bottom"></i> '+nb.name+'</a></li>');
                $('#select_notebook .contacts-list li:last').data("notebook",nb);
            }
            $('#select_notebook .contacts-list li:first').click();
        }
    })
}

/***
 * 查询可选择的笔记
 */
function getSelectNoteList(){
    var li =  $('#select_notebook .contacts-list li .checked').parent();
    var nb = li.data('notebook');
    var notebookId = nb.id;
    $.ajax({
        url:"/note.do",
        method:"get",
        data:{notebookId:notebookId},
        success:function (data) {
            $('#select_note .contacts-list').html('');
            for (var i=0;i<data.length;i++){
                var note = data[i];
                $('#select_note .contacts-list').append('<li class="online"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title+'</a></li>');
                $('#select_note .contacts-list li:last').data("note",note);
                $('#select_note .contacts-list li:first').click();
            }
        }
    })
}

/***
 *	将用户选择的笔记参加活动
 */
function createNoteActivity(){
    var activityId = location.hash.substr(1);
    var note =$('#select_note .contacts-list li .checked').parent().data('note');
    $.ajax({
        url:"/activityNote.do",
        method:"post",
        data:{noteId:note.id,activityId:activityId},
        success:function (data) {
            if (data){
                location.reload();
                $('.close,.cancle').trigger('click');
            } else {
                $('.close,.cancle').trigger('click');
                alert("笔记本不能为空或者此笔记本已经参加过活动")
            }
        }
    })
}

/***
 *	分享活动笔记
 */
function likeActivityNote() {
    alert("分享活动笔记");
}

/***
 *	顶笔记
 */
function up(button) {
    changeState(button,1);
}

/***
 *	踩笔记
 */
function down(button) {
    changeState(button,2);
}
function changeState(button, state) {
    var activityNoteId =$(button).parent().parent().data('activityNote').id;
    $.ajax({
        url:"/upDown.do",
        method:"post",
        data:{activityNoteId:activityNoteId,state:state},
        success:function () {
            if (state==1){
                var i =$(button).children('.fa');
                if(i.hasClass('fa-thumbs-o-up')){
                    i.removeClass('fa-thumbs-o-up');
                    i.addClass('fa-thumbs-up');
                    //修改踩样式
                    $(button).children('.fa').removeClass('fa-thumbs-down');
                    $(button).children('.fa').addClass('fa-thumbs-o-down');
                    var up = parseInt($(button).children('#up').html());
                    $(button).children('#up').html(up+1);
                    var down = parseInt($(button).next().children('#down').html());
                    if (down>0){
                        down--;
                        $(button).next().children('#down').html(down == 0 ? '0': down);
                    }
                }else {
                    i.removeClass('fa-thumbs-up');
                    i.addClass('fa-thumbs-o-up');
                    var up = parseInt($(button).children('#up').html());
                    up--;
                    $(button).children('#up').html(up == 0 ? '0': up);
                }
            }else {
                var i =$('#first_action .btn_down').children('.fa');
                if(i.hasClass('fa-thumbs-o-down')){
                    i.removeClass('fa-thumbs-o-down');
                    i.addClass('fa-thumbs-down');
                    //修改踩样式
                    $(button).prev().children('.fa').removeClass('fa-thumbs-up');
                    $(button).prev().children('.fa').addClass('fa-thumbs-o-up');
                    var down = parseInt($(button).children('#down').html());
                    $(button).children('#down').html(down+1);
                    var up = parseInt($(button).prev().children('#up').html());
                    if (up>0){
                        up--;
                        $(button).prev().children('#up').html(up == 0 ? '0': up);
                    }
                }else {
                    i.removeClass('fa-thumbs-down');
                    i.addClass('fa-thumbs-o-down');
                    var down = parseInt($(button).children('#down').html());
                    down--;
                    $(button).children('#down').html(down == 0 ? '0': down);
                }
            }
        }
    })
}
