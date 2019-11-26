/**
 * 日期格式化
 */
function formatDate(date,fmt) {
    var o = {
        "M+" : date.getMonth()+1,                   //月份
        "d+" : date.getDate(),                      //日
        "h+" : date.getHours(),                     //小时
        "m+" : date.getMinutes(),                   //分
        "s+" : date.getSeconds(),                   //秒
        "q+" : Math.floor((date.getMonth()+3)/3),   //季度
        "S" : date.getMilliseconds()                //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return fmt;
}
/***
 * 加载普通笔记
 */
function getNormalNoteList(){
    var li=$('#first_side_right .contacts-list li .checked').parent();
    var nb=li.data('notebook');
    var notebookId=nb.id;
    $.ajax({
        url:"/note.do",
        method:"get",
        data:{notebookId:notebookId},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            $('#second_side_right .contacts-list').html('');
            for (var i=0;i<data.length;i++) {
                var note = data[i];
                $('#second_side_right .contacts-list').append('<li class="online">\n' +
                    '<a>\n' +
                    '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title+'&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+formatDate(new Date(note.modifyTime),"yyyy/MM/dd hh:mm")+')</span><button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n' +
                    '</a>\n' +
                    '<div class="note_menu" tabindex=\'-1\'>\n' +
                    '<dl>\n' +
                    '<dt><button type="button" class="btn btn-default btn-xs btn_move" title=\'移动至...\'><i class="fa fa-random"></i></button></dt>\n'
                    +
                    (note.share !=0 ? '':'<dt><button type="button" class="btn btn-default btn-xs btn_share" title=\'分享\'><i class="fa fa-sitemap"></i></button></dt>\n')
                    +
                    '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title=\'删除\'><i class="fa fa-times"></i></button></dt>\n' +
                    '</dl>\n' +
                    '</div>\n' +
                    '</li>');
                $('#second_side_right .contacts-list li:last').data('note',note);
                $('#second_side_right .contacts-list li:first').click();
            }
        }
    })
}

/***
 * 查询普通笔记内容
 */
function getNoteDetail(){
    var note = $('#second_side_right .contacts-list li .checked').parent().data('note');
    //alert(note.title);
    $('#input_note_title').val(note.title);
    um.setContent(note.body==null?'':note.body);
}

/***
 * 创建普通笔记
 */
function createNormalNote(){
    var li=$('#first_side_right .contacts-list li .checked').parent();
    var nb=li.data('notebook');
    var notebookId=nb.id;
    var title=$('#input_note').val().trim();
    $.ajax({
        url:"/note.do",
        method:"post",
        data:{notebookId:notebookId,title:title},
        success:function (note,data) {
        	/*alert(note.title);*/
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            $('.cancle').click();
            $('#second_side_right .contacts-list').prepend('<li class="online">\n' +
                '<a class=\'checked\'>\n' +
                '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title+'&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+formatDate(new Date(note.modifyTime),"yyyy/MM/dd hh:mm")+')</span><button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n' +
                '</a>\n' +
                '<div class="note_menu" tabindex=\'-1\'>\n' +
                '<dl>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_move" title=\'移动至...\'><i class="fa fa-random"></i></button></dt>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_share" title=\'分享\'><i class="fa fa-sitemap"></i></button></dt>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title=\'删除\'><i class="fa fa-times"></i></button></dt>\n' +
                '</dl>\n' +
                '</div>\n' +
                '</li>');
            $('#second_side_right .contacts-list li:first').data('note',note);
            $('#second_side_right .contacts-list li:first').click();
            sweetAlert("笔记已经创建", "创建成功！", "success");
        }
    })
}

/***
 * 更新普通笔记
 */
function updateNormalNote(){
    var note= $('#second_side_right .contacts-list li .checked').parent().data('note');
    var share=note.share;
    var noteId=note.id;
    var title=$('#input_note_title').val().trim();
    var body=um.getContent();
    $.ajax({
        url:"/note.do",
        method:"put",
        data:{id:noteId,title:title,body:body,share:share},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            sweetAlert("笔记已经保存", "保存成功！", "success");
            note.modifyTime=data.modifyTime;
            note.title=title;
            note.body=body;
            $('#second_side_right .contacts-list li .checked').parent().data('note',note);
            $('#second_side_right .contacts-list li .checked').html('<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title+'&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+formatDate(new Date(note.modifyTime),"yyyy/MM/dd hh:mm")+')</span><button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n');
        }
    })
}

/***
 * 删除普通笔记
 */
function deleteNormalNote(){
    var notebookId = $('#rollback_button').data("notebook").id;
    var li =$('#second_side_right .contacts-list li .checked').parent();
    moveNote(li,notebookId);
    sweetAlert("笔记已经删除至回收站", "删除成功！", "success");
}

/***
 * 移动笔记
 */
function moveNote(li,notebookId){
    var noteId = li.data('note').id;
    //alert(li.data('note').id)
    $.ajax({
        url:"/note/move.do",
        method:'put',
        data:{id:noteId,notebookId:notebookId},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            var parent =li.parent();
            li.remove();
            $('.cancle').click();
            parent.children('li:first').click();
        }
    })
}

/***
 * 分享笔记
 */
function createShareNote(e){
    var noteId = $('#second_side_right .contacts-list li .checked').parent().data('note').id;
    $.ajax({
        url:'/share.do',
        method:'post',
        data:{noteId:noteId},
        success:function (data) {
            if (data == 'fail') {
                location.href = "login.html";
                return;
            }
            if (data){
                $(e).fadeOut(600);
                $("footer div strong").text("分享成功").parent().fadeIn(100);
                setTimeout(function () {
                    $("footer div").fadeOut(500);
                }, 1500);
                sweetAlert("笔记已经分享", "分享成功！", "success");
            } else {
                sweetAlert("笔记内容为空不能分享!", "警告！", "error");
            }
        }
    });
}

/***
 * 查询回收站笔记列表
 */
function getRecycleNoteList(){
    var nb=$('#rollback_button').data("notebook");
    var notebookId=nb.id;
    $.ajax({
        url:"/note.do",
        method:"get",
        data:{notebookId:notebookId},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            $('#four_side_right .contacts-list').html('');
            for (var i=0;i<data.length;i++) {
                var note = data[i];
                $('#four_side_right .contacts-list').append('<li class="disable"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>'+note.title+'&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+formatDate(new Date(note.modifyTime),"yyyy/MM/dd hh:mm")+')</span><button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay"><i class="fa fa-reply"></i></button></a></li>');
                $('#four_side_right .contacts-list li:last').data('note',note);
                $('#four_side_right .contacts-list li:first').click();
            }
        }
    })
}

/***
 * 查看回收站笔记内容
 */
function getRecycleNoteDetail() {
	var note=$('#four_side_right .contacts-list li .checked').parent().data('note');
    $('#noput_note_title').html(note.title);
    $('#note_body').html(note.body);
}

/***
 * 删除回收站笔记
 */
function deleteRecycleNote(){
    var li =$('#four_side_right .contacts-list li .checked').parent();
    var noteId = li.data('note').id;
    $.ajax({
        url:"/note.do",
        method:"delete",
        data:{id:noteId},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            li.remove();
            $('#four_side_right .contacts-list li:first').click();
            $('.cancle').click();
            sweetAlert("笔记已彻底删除！", "删除成功！", "success");
        }
    })
}

/***
 * 搜索分享笔记列表
 */
function getShareNoteList(){
    var keyword=$('#search_note').val().trim();
    if (keyword==null||keyword.length==0){
        return;
    }
    $.ajax({
        url:'/share.do',
        method:'get',
        data:{title:keyword},
        success:function (data) {
            $('#pc_part_2,#pc_part_3,#pc_part_4,#pc_part_7,#pc_part_8').hide();
            $('#pc_part_6,#pc_part_5').show();
            $('#pc_part_6 .contacts-list').empty();
            for (var i = 0 ;i < data.length;i++){
                var share = data[i];
                //alert(share);
                $('#pc_part_6 .contacts-list').append('<li class="online">\n' +
                    '<a href="#">\n' +
                    '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+share.title+'<button type="button" class="btn btn-default btn-xs btn_position btn_like"><i class="fa fa-star-o"></i></button><div class="time"></div>\n' +
                    '</a>\n' +
                    '</li>');
                $('#pc_part_6 .contacts-list li:last').data("share",share);
            }
            $('#pc_part_6 .contacts-list li:first').click();
        }
    })
}

/***
 * 查询分享笔记内容
 */
function getShareNoteDetail(){
    var share= $('#pc_part_6 .contacts-list li .checked').parent().data("share");
    $('#noput_note_title').html(share.title);
    $('#note_body').html(share.body);
}

/***
 * 收藏分享笔记
 */
function likeShareNote(shareId,dom){
    var share= $('#pc_part_6 .contacts-list li .checked').parent().data("share");
    var shareId = share.id;
    var notebook = $('#like_button').data("notebook");
    var notebookId = notebook.id;
    $.ajax({
        url:'/favorites.do',
        method:'post',
        data:{notebookId:notebookId,shareId:shareId},
        success:function (data) {
            $('.cancle').click();
            if (data){
                sweetAlert("笔记已收藏", "收藏成功！", "success");
            } else {
                sweetAlert("笔记已收藏，不能重复收藏!", "警告！", "error");
            }
        }
    })
}

/***
 * 加载收藏笔记
 */
function getLikeNoteList(likeNoteId){
	alert("加载收藏笔记");
}

/***
 * 查看收藏笔记内容
 */
function getLikeNoteDetail(noteId) {
	console.log("查看收藏笔记内容");
}

/***
 * 删除收藏笔记
 */
function deleteLikeNote(noteId,dom){
	alert("删除收藏笔记");
}

/***
 * 加载本用户参加活动笔记列表
 */
function getNoteActivityList(noteBookId){
	alert("加载本用户参加活动笔记列表");
}

/***
 * 查询参加活动的笔记内容
 */
function getActivityNoteDetail(noteId) {
	console.log("查询参加活动的笔记内容");
}