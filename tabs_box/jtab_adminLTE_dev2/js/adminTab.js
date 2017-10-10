
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
            data: { dataType: 'iframe', dataLink: 'template/main.html' }
        }],
        activeTabIndex: 0,   
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

    $(".modules").on("click",function(){
        var listBox = $(this).siblings(".modulesList");
        var isHid = listBox.css("display");
        if( isHid == "block" ){
            listBox.fadeOut();
        }else if( isHid == "none" ){
            listBox.fadeIn();
        }
    });
}

