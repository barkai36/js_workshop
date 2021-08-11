 //# sourceURL=dash2.js
 require(['jquery', 'splunkjs/mvc/simplexml/ready!'], function($) {
    var unsubmittedTokens = splunkjs.mvc.Components.getInstance("default");
    var submittedTokens = splunkjs.mvc.Components.getInstance("submitted");
     $('#mybutton').click(function(){
         alert("clicked!");
        unsubmittedTokens.set("show_panel", "show");
        submittedTokens.set(unsubmittedTokens.toJSON());
     });
 })