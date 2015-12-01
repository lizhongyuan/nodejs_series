/**
 * Created by svenlee on 15/11/23.
 */

function shake(e, oncomplete, distance, time) {
    if(typeof e === "string")
    {
        e = document.getElementById(e);
    }

    if(!time)
        time = 500;
    if(!distance)
        distance = 5;

    var originalStyle = e.style.cssText;
    e.style.position = "relative";
    var start = (new Date()).getTime();
    animate();

    function animate()
    {
        var now = (new Date()).getTime();
        var elapsed = now - start;

        var fraction = elapsed/time;
        if(fraction < 1)
        {
            var x = distance * Math.sin(fraction*4*Math.PI);
            e.style.left = x + "px";

            setTimeout(animate, Math.min(25, time - elapsed));
        }
        else    // 动画完成
        {
            e.style.cssText = originalStyle;
            if(oncomplete)      //调用完成后的回调函数
                oncomplete(e);
        }
    }
}

function fadeOut(e, oncomplete, time)
{
    if(typeof e == "string")
        e = document.getElementById(e);
    if(!time)
        time = 500;

    var ease = Math.sqrt;

    var originalOpacity = e.style.opacity;

    var start = (new Date()).getTime();
    animate();

    function animate() {
        var elapsed = (new Date()).getTime() - start;
        var fraction = elapsed/time;
        if(fraction < 1)
        {
            var opacity = 1 - ease(fraction);
            e.style.opacity = String(opacity);
            setTimeout(animate, Math.min(25, time - elapsed));
        }
        else
        {
            //e.style.opacity = "0";
            e.style.opacity = String(originalOpacity);
            if(oncomplete)
                oncomplete(e);
        }
    }
}
