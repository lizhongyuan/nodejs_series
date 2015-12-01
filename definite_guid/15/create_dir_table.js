/**
 * Created by svenlee on 15/11/19.
 */

onLoad(function(){
    var toc = document.getElementById("TOC");
    //查找TOC容器元素
    //如果不存在，则在文档开头处(body的firstChild)创建一个
    if(!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }

    // 查找所有标题
    var headings;
    if(document.querySelectorAll())
    {
        headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    }
    else
    {
        headings = findHeadings(document.body, []);
    }


    function findHeadings(root, sects) {
        for(var c = root.firstChild; c != null; c = c.nextSibling){
            if(c.nodeType != 1)
                continue;
            if(c.tagName.length == 2 && c.tagName.charAt(0) == "H")
                sects.push(c);
            else
                findHeadings(c, sects);
        }
        return sects;
    }

    var sectionNumbers = [0,0,0,0,0,0];

    for(var h = 0; h < headings.length; h++)
    {
        var heading = headings[i];

        if(heading.parentNode == toc)
            continue;

        //判断标题的jibie
        var level = parseInt(heading.tagName.charAt(1));
        if(isNaN(level) || level < 1 || level > 6)
            continue;

        sectionNumbers[level - 1]++;

        for(var i = level; i<6; i++)
        {
            sectionNumbers[i] = 0;
        }
    }

});


