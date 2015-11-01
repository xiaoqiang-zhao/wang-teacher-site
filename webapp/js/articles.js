// 初始化数据
var groupId = parseInt(location.href.replace(/.+\.html#/, ''));
var data = {
    pageNum: 1
};
if (!isNaN(groupId)) {
    data.groupId = groupId;
}

// 填充第一批数据
getArticles();

// 监听滚动条
$(window).scroll(scrollCallback);
function scrollCallback() {
    var bodyHeight = $('body').height();
    var scrollTop = $(window).scrollTop();

    if (bodyHeight - scrollTop - $(this).height() < 500) {
        getArticles();

        // 需要延迟触发，否则一次加载多页
        $(window).unbind('scroll');
        setTimeout(function () {
            $(window).scroll(scrollCallback);
        }, 1500);
    }
}

// 获取文章数据
function getArticles() {
    $.ajax({
        url: '/articles',
        data: data,
        success: function (data) {
            appendToDom(data.data);
        }
    });
    data.pageNum++;
}

// 填充文章数据到页面
function appendToDom(data) {
    var itemLines = $('.item-line');

    for (var i = 0; i < data.length; i++) {
        (function (data) {
            var html = ''
                + '<a class="item">'
                + (data.coverImgUrl ? '    <img class="cover" src="' + data.coverImgUrl + '"/>' : '')
                + '    <h2 class="title">' + data.title + '</h2>'
                + '    <div class="description">'
                + (data.description ? data.description : '')
                + '    </div>'
                + '</a>';
            setTimeout(function () {
                getShortestItem(itemLines).append(html);
            }, 300);
        })(data[i]);
    }
}

function getShortestItem(itemLines) {
    var height = 0;
    var index = 0;

    for (var i = 0; i < itemLines.length; i++) {
        if (i === 0) {
            height = itemLines.eq(i).height();
        }

        if (itemLines.eq(i).height() < height) {
            index = i;
            height = itemLines.eq(i).height();
        }
    }

    return itemLines.eq(index);
}