<%@ WebHandler Language="C#" Class="dataexchange" %>

using System;
using System.Web;

public class dataexchange : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        ProcessData(context);
    }
    void ProcessData(HttpContext context)
    {
        string msg =string.Empty;
        try
        {
            switch (context.Request["action"])
            {
                case "getdatetime":
                    msg += "got date ticks from server: ";
                    msg += DateTime.Now.Ticks;
                    break;
                case "microsoft":
                    msg+="behinds code:<br />";
                    msg += "<span>System.Threading.<span style='color:#2B91AF'>Thread</span>.Sleep(<span style='color:#2B91AF'>TimeSpan</span>.FromSeconds(3))</span>";                    
                    System.Threading.Thread.Sleep(TimeSpan.FromSeconds(3));                    
                    break;
                case "chess":
                    msg += "Li Gu vs Hao Chang -(live)";
                    break;
                case "whether":
                    msg += "aha, you'd better ask the weather bureau...";
                    break;
                case "ent":
                    msg += "MJ said:  &quot;i am back!&quot;   --wow!";
                    break;
            }
        }
        catch
        {
            msg = "<b>error, there was an exception.</b>";
        }
        context.Response.Write(msg);
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}