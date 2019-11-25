/***
 * 加载笔记本
 */
function loadNoteBook(){
	$.ajax({
		url:"/notebook.do",
		method:"get",
		success:function (data) {
		    if(data=='fail'){
		        location.href="login.html";
		        return;
            }
			var special=data['special'];
            var normal=data['normal'];
            var list=$('#first_side_right .contacts-list');
            /*console.log(list.html());*/
			//绑定特殊笔记本
            for (var i=0;i<special.length;i++){
            	var nb=special[i];
            	switch (nb.name) {
					case '回收站':
						$('#rollback_button').data("notebook",nb);
						break;
                    case '收藏':
                        $('#like_button').data("notebook",nb);
                        break;
                    case '活动':
                        $('#action_button').data("notebook",nb);
                        break;
                    case '默认':
                        $('#first_side_right .contacts-list li:first').data("notebook",nb);
                        break;
                }
			}
			//绑定普通笔记本
            for (var i=0;i<normal.length;i++) {
                var nb = normal[i];
                list.append('<li class="online">\n' +
                    '<a class=\'unchecked\'>\n' +
                    '<i class="fa fa-book" title="笔记本" rel="tooltip-bottom"></i>'
                    + nb.name+
                    '<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button>\n' +
                    '</a>\n' +
                    '</li>');
                $('#first_side_right .contacts-list li:last').data("notebook",nb);
            }
            $('#first_side_right .contacts-list li:first').click();
        }
	})
}


/****
 * 添加笔记本
 */
function addNoteBook(){
	var name=$('#input_notebook').val().trim();
	if(name==null||name.length==0){
        sweetAlert("笔记本名称不能为空！", "警告！","error");
        return;
	}
	$.ajax({
		url:"/notebook.do",
		method:"post",
		data:{name:name},
		success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
			if (data['success']){
                sweetAlert("笔记本已经创建", "创建成功！","success");
                var nb =data['notebook'];
                //关闭弹出窗
                $('.cancle').click();
                //新添加的节点放在普通笔记本的第一位
                $('#first_side_right .contacts-list li:first')
                    .after('<li class="online">\n' +
                    '<a class=\'unchecked\'>\n' +
                    '<i class="fa fa-book" title="笔记本" rel="tooltip-bottom"></i>'
                    + nb.name+
                    '<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button>\n' +
                    '</a>\n' +
                    '</li>');
                $('#first_side_right .contacts-list li:first').next().data('notebook',nb);
                //设置新加入笔记本为选中状态
                $('#first_side_right .contacts-list li:first').next().click();
			} else if (data['name_null']){
                sweetAlert("笔记本名称不能为空！", "警告！","error");
            }else if (data['name_repeat']){
                sweetAlert("笔记本名称已存在！", "警告！","error");
            }
        }
	})
}

/***
 * 重命名笔记本
 */
function updateNoteBook(){
    var name=$('#input_notebook_rename').val().trim();
    var li=$('#first_side_right .contacts-list li .checked').parent();
    var nb=li.data('notebook');
    var id=nb.id;
    //alert(name+","+id);
    if(name==null||name.length==0){
        sweetAlert("笔记本名称不能为空！", "警告！","error");
        return;
    }
    $.ajax({
        url:"/notebook.do",
        method:"put",
        data:{name:name,id:id},
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            if (data['success']){
                sweetAlert("笔记本已经修改", "修改成功！","success");
                //关闭弹出窗
                $('.cancle').click();
                //修改笔记本显示名称
                li.html('<a class=\'unchecked\'>\n' +
                        '<i class="fa fa-book" title="笔记本" rel="tooltip-bottom"></i>'
                        + name+
                        '<button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button>\n' +
                        '</a>');
                //将新笔记本数据重新绑定到节点
                nb.name=name;
                li.data('notebook',nb);
                //console.log(li.html);
                //被修改的笔记本为选中状态
                li.click();
            } else if (data['name_null']){
                sweetAlert("笔记本名称不能为空！", "警告！","error");
            }else if (data['name_repeat']){
                sweetAlert("笔记本名称已存在！", "警告！","error");
            }
        }
    })
}

/***
 * 删除笔记本
 */
function deleteNoteBook(){
    var li=$('#first_side_right .contacts-list li .checked').parent();
    var id=li.data('notebook').id;
    $.ajax({
        url: "/notebook.do",
        method: "delete",
        data: {id: id},
        success: function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            li.remove();
            $('.close').click();
            $('#first_side_right .contacts-list li:first').click();
            sweetAlert("笔记本已经删除", "删除成功！", "success");
        }
    })
}

/**
 * 将笔记本列表放置到select组件中
 */
function setNoteBookToSelect(){
	//console.log("将笔记本列表放置到select组件中");
    $.ajax({
        url:"/notebook/normal.do",
        method:"get",
        success:function (data) {
            if(data=='fail'){
                location.href="login.html";
                return;
            }
            var defaultNotebook=$('#first_side_right .contacts-list li:first').data("notebook");
            $('#moveSelect').append('<option value="'+defaultNotebook.id+'">默认笔记本</option>');
            for (var i=0;i<data.length;i++){
                var notebook=data[i];
                $('#moveSelect').append('<option value="'+notebook.id+'">'+notebook.name+'</option>');
            }
        }
    })
}