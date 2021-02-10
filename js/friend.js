// 获取处理友链数据

$(function () {
    $.getJSON("../json/friend.json", function (data) {
        // 随机排序过滤失效的
        let notValid = data.filter((item, a, b) => item.valid == 0), 
            html = `<p>以下排名不分前后</p><div class='friends'>`;

        $('.links-content').html("");

        data = data.filter((item, a, b) => item.valid != 0).sort(function (a, b) {
            return Math.random() > .5 ? -1 : 1;
        });
        
        $.each(data, function (i, e) {
            html += 
            `<div class='friend'>
                ${e.src == undefined ? '<img class="friend-avatar" src="https://reself.oss-cn-beijing.aliyuncs.com/uploads/avatar/nopic.jpg" title="图片链接不可用">' : `<img class="friend-avatar" src="${e.src}"></img>`}
                <div class='text-desc' title="${e.desc}">网址：<a href="${e.url}" target="_blank">${e.name}</a><br> 时间：${e.date}<br> 简介：${e.desc}</div>
            </div>`;
        });
        html += '<div class="friend" style="border:none"></div>'
        $('.links-content').append(html + "</div><hr/>");
        // 过期的
        if (notValid.length > 0) {
            html = `<p>异常的大佬们</p><div class='friends'>`;
            $.each(notValid, function (i, e) {
                html +=
                `<div class='friend'>
                    <img class='friend-avatar' src='https://reself.oss-cn-beijing.aliyuncs.com/uploads/avatar/nopic.jpg' title='图片链接不可用'>
                    <div class='text-desc' title='${e.desc}'>网址：<a href="${e.url}" target="_blank">${e.name}</a><br> 访问时间：${e.stopTime}<br> 简介：${e.desc}</div>
                </div>`
            })
            html += '<div class="friend" style="border:none"></div>'
            $('.links-content').append(html + "</div><hr/>");
        }
    })
});
