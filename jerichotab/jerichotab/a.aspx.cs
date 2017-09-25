using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class a : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        btnRedirect.Click += new EventHandler(btnRedirect_Click);
    }

    void btnRedirect_Click(object sender, EventArgs e)
    {
        Response.Redirect("b.aspx");
    }
}
