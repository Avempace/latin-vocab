(function (){
// code written by Julian Yolles
// load jQuery; when it is loaded, initialize bookmarklet
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
    script.onload = script.onreadystatechange = function(){
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
            latinbookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);

    // initialize the bookmarklet
    function latinbookmarklet(){
    // structure the menu overlay and prepend it to the body   
    $("body").prepend('<div class="Popup-Content"><div><button type="button" class="close" style="border: 2px; font-size: 30px; line-height: .5em; margin: .1em; padding: 2px"><div style="padding: 2px; padding-bottom: 8px">x</div></button></div><div style="padding: 5px 20px 20px 20px;"><h2 style="margin-top: 0px;">Latin Vocab Tool</h2><div style="font-size: 10px">Written by Julian Yolles</div><br><button type="button" class="lookup">Lookup</button><button type="button" class="addList">Add to list</button><button type="button" class="removeList">Remove from list</button><button type="button" class="saveList">Save list</button><button type="button" class="retrieveList">Retrieve list</button><br><div id="wordsList"></div></div></div>');

    // close the menu
    $(".close").click(function(){
        $('.Popup-Content').hide();
    });

    // function to get selected text from the page
    function getSel() {
        var mySel = '';
            if (window.getSelection) {
            mySel = window.getSelection();
            } else if (document.getSelection) {
            mySel = document.getSelection();
            } else if (document.selection) {
            mySel = document.selection.createRange().text;
            }
        return mySel;   
    }

    // function to open a tab to look up the selected word
    $('.lookup').click(function(){
        function openWin() {
            myWindow = window.open("http://www.perseus.tufts.edu/hopper/morph?l=" + getSel() + "&la=la", "_blank");
            myWindow.location;
        }
        openWin();
    });

    // function to add selected word to a list
    $('.addList').click(function(){
       document.getElementById("wordsList").innerHTML += getSel() + " " + "<br>";
    });

    // empty array to store saved words in
    var myList = [];

    // function to save words in local storage
    $('.saveList').click(function(){
    // first delete extra space if user has selected a word with following space, to prevent list retrieval malfunction
        $('#wordsList').contents().filter(function() {
            return this.nodeType == 3
        }).each(function(){
            this.textContent = this.textContent.replace('  ',' ');
        });
        myList = $('#wordsList').text();
        function arrayStore(a) {
            var jsonList = JSON.stringify(a); window.localStorage.setItem("vocabList", jsonList); 
            console.log(jsonList);    
        }
        arrayStore(myList);
    });

    // function to remove a selected word from list
    $('.removeList').click(function(){
            $('#wordsList').contents().filter(function() {
            return this.nodeType == 3
        }).each(function(){
            this.textContent = this.textContent.replace(getSel(),'');
        });
    });

    // function to clear list before retrieving previous list
    function clearList(){
        $('#wordsList').text('');
    }

    // function to retrieve JSON data and add it to the list
    $('.retrieveList').click(function(){
        clearList();
        var retrievedWords = window.localStorage.getItem("vocabList");
        myList = JSON.parse(retrievedWords) || [];
        console.log(myList);
        var splitList = myList.split(" ");
        console.log(splitList);
        for (var i = 0; i<splitList.length; i++){
            document.getElementById("wordsList").innerHTML += splitList[i] + "<br>";   
        }
    });

    // CSS style for overlay menu
    $("<style>")
        .prop("type", "text/css")
        .html("\
        .Popup-Content {\
                    position: -webkit-sticky;\
                    position: sticky;\
                    top: 0;\
                    padding: 5px;\
                    z-index: 199;\
                    background-color: rgb(66,134,244);\
                    background-color: rgba(66,134,244);\
                    -webkit-animation-name: fadeIn;\
                    -webkit-animation-duration: 0.4s;\
                    animation-name: fadeIn;\
                    animation-duration: 0.4s;\
            }")
        .appendTo("head");
    }
    
})()