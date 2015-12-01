/**
 * Created by svenlee on 15/11/13.
 */

function invoke(f, start, interval, end) {
    if (!start)
        start = 0;
    if (arguments.length <= 2)
        setTimeout(f, start);
    else {
        setTimeout(repeat, start);
        function repeat() {
            var h = setInterval(f, interval);   // 循环调用f()
            if(end)
                setTimeout(function(){
                    clearInterval(h);
                }, end);
        }
    }
}

invoke(function(){
    console.log("Hello.");
}, 0, 1000, 5000);
