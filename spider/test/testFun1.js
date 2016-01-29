/**
 * Created by svenlee on 16/1/25.
 */

var fun1 = function(err, done) {
    console.log("test fun1");
    done();
}

fun1(null, function(){});

