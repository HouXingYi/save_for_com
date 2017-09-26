<%@ Page Language="C#" AutoEventWireup="true" CodeFile="b.aspx.cs" Inherits="b" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>New Tab</title>
    <style type="text/css">
       body,*
        {
        	font-family:Verdana;
        	font-size:10px;
        	}
    </style>
    <script type="text/javascript">
        window.onload = function() {
            window.parent.$.fn.jerichoTab.addTab({
                title: 'Child tab',
                closeable: true,
                data: {
                    dataType: 'iframe',
                    dataLink: 'http://igoogle.com'
                }
            }).showLoader().loadData();
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <b>a new tab will be added to the jerichotab.</b>
    </div>
    </form>
</body>
</html>
