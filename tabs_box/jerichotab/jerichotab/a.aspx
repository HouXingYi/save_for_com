<%@ Page Language="C#" AutoEventWireup="true" CodeFile="a.aspx.cs" Inherits="a" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Redirect</title>
    <style type="text/css">
        body,*
        {
        	font-family:Verdana;
        	font-size:10px;
        	}
        .btn
        {
        	border:outset 1px #dedede;
        	background:#ddd;
        	padding:5px 2px;
        	cursor:pointer;
        	}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <asp:Button CssClass="btn" ID="btnRedirect" Text="Redirect to b.aspx" runat="server" />
    </div>
    </form>
</body>
</html>
