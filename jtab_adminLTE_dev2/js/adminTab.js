
$(function(){
    init();
});
function init(){
    $.fn.initJerichoTab({
        renderTo: '.content-wrapper',
        uniqueId: 'myJerichoTab',
        contentCss: { 'height': "100px" },
        tabs: [{
            title: 'main',
            closeable: false,
            data: { dataType: 'iframe', dataLink: 'template/main.html' },
            onLoadCompleted: function(h) {
                console.log(h);
            }
        }],
        activeTabIndex: 0,   //最先激活的tab  // 首页
        loadOnce: true
    });
    bindEvent();
}
function bindEvent(){

    $('span.func').click(function() {
        $.fn.jerichoTab.addTab({
            tabFirer: $(this),
            title: $(this).text(),
            closeable: true,
            data: {
                dataType: $(this).attr('dataType'),
                dataLink: $(this).attr('dataLink')
            }
        })
        .showLoader().loadData();
    });

}

