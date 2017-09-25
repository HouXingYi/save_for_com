
var jericho = {
    showLoader: function() {
        $('#divMainLoader').css('display', 'block');
    },
    removeLoader: function() {
        $('#divMainLoader').css('display', 'none');
    },
    buildTree: function() {

        $('.functree li').each(function() {
            if ($(this).is(':has(ul)'))
                $(this).addClass('collapse');
            if ($(this).next().is('li') || $(this).next().is('ul'))
                $(this).css({ borderLeft: 'dashed 1px #dedede' });
        })
        $('li.collapse>span').click(function() {
            $(this).next('ul').slideToggle('fast', function() {
                if ($(this).parent().hasClass('collapse'))
                    $(this).parent().removeClass('collapse').addClass('expand');
                else
                    $(this).parent().removeClass('expand').addClass('collapse');
            })
        })

        $('span.func').css({ 'cursor': 'pointer' }).hover(function() {
            $(this).css({ 'color': '#3de', 'text-decoration': 'underline' });
        }, function() {
            $(this).css({ 'color': '#000', 'text-decoration': 'none' });
        }).click(function() {

            $.fn.jerichoTab.addTab({
                tabFirer: $(this),
                title: $(this).text(),
                closeable: true,
                iconImg: $(this).attr('iconImg'),
                data: {
                    dataType: $(this).attr('dataType'),
                    dataLink: $(this).attr('dataLink')
                }
            })
            .showLoader().loadData();

        });
        
    },
    buildTabpanel: function(){
        $.fn.initJerichoTab({
            renderTo: '.divRight',
            uniqueId: 'myJerichoTab',
            contentCss: { 'height': $('.divRight').height() - 50 },
            tabs: [{
                title: 'JeirchoTab',
                closeable: false,
                iconImg: 'images/jerichotab.png',
                data: { dataType: 'formtag', dataLink: '#tbNews' },
                onLoadCompleted: function(h) {
                    $('<b style="color:red" />').html('The JerichoTab processed in ' + (new Date().getTime() - d1) + ' milliseconds!').appendTo(h);
                }
            }],
            activeTabIndex: 1,
            loadOnce: true
        });
    }

}


$().ready(function() {
    jericho.buildTree();
    jericho.buildTabpanel();
})

$(window).resize(function() {
    var w = $(document).width();
    $('.divRight').css({ width: w - 250 });
})






