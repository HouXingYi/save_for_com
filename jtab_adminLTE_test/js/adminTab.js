
$(function(){
    $(".divRight").css("height" , "500px");
    init();
});

function init(){
    $.fn.initJerichoTab({
        renderTo: '.divRight',
        uniqueId: 'myJerichoTab',
        contentCss: { 'height': $('.divRight').height() - 50 },
        tabs: [{
            title: 'JeirchoTab',
            closeable: false,
            data: { dataType: 'formtag', dataLink: '#tbNews' }
        }, 
        {
            title: 'iframe',
            closeable: false,
            data: { dataType: 'iframe', dataLink: './template/main.html' }
        }],
        activeTabIndex: 1,
        loadOnce: true
    });
    bindEvent();
}
function bindEvent(){
    $('span.func').css({ 'cursor': 'pointer' }).hover(function() {
        $(this).css({ 'color': '#3de', 'text-decoration': 'underline' });
    }, function() {
        $(this).css({ 'color': '#000', 'text-decoration': 'none' });
    }).click(function() {
        $.fn.jerichoTab.addTab({
            tabFirer: $(this),
            title: $(this).text(),
            closeable: true,
            data: {
                dataType: $(this).attr('dataType'),
                dataLink: $(this).attr('dataLink')
            }
        }).showLoader().loadData();
    });
}