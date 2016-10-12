const express = require('express');
const fs = require('fs');

const app = express();

/* serves main page */
app.get("/", function (req, res) {
    fs.readFile("index.html", "utf-8", function (err, content) {
        var response = parseContent(content);
        res.send(response);
    });


    //    var titles = "";
    //    fs.readdir("articles", function(err, filenames) {
    //        if (err) {
    //            return;
    //        } else {
    //            for (var i = 0; i < filenames.length; ++i) {
    //                titles += "<p>" + filenames[i].replace(".html", "") + "</p>";
    //            }   
    //            res.send(titles);
    //        }
    //    });
});

var parseContent = function (content) {
    return handleRepeat(content, 0);
};

var handleRepeat = function (content, index) {

    var repeatOpen = content.indexOf("#repeat/", index);
    // If there is not even a single repeatOpen
    if (repeatOpen == -1) {
        return;
    }

    var closingHash = content.indexOf("#", repeatOpen + 1);
    var folderName = content.substring(repeatOpen + 8, closingHash);
    var nextRepeatOpen = content.indexOf("#repeat/", repeatOpen + 1);

    // Are we at the end of the recursion?
    if (nextRepeatOpen != -1) {
        content = handleRepeat(content, nextRepeatOpen);
    }

    var repeatClosed = content.indexOf("#repeatClosed#", repeatOpen);

    var repeatableContent = content.substring(closingHash + 1, repeatClosed);
    var files = fs.readdirSync(folderName);

    var finalContent = "";
    for (var i = 0; i < files.length; ++i) {
        var tempContent = "";
        tempContent = repeatableContent.replace("#title#", files[i]);
        if(tempContent.indexOf("#content#") != -1) {
            var contentFile = fs.readFileSync(folderName + "/" + files[i]).toString();
            tempContent = tempContent.replace("#content#", contentFile); 
        }
        finalContent += tempContent;
    }
    content = [content.slice(0, repeatOpen), finalContent, content.slice(repeatClosed + 14)].join('');

    return content;
};


/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile(__dirname + "/webapp" + req.params[0]);
});

app.listen(8080, function () {
    console.log("Listening on 8080");
});


module.exports.parseContent = parseContent;