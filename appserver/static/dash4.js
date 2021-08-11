//# sourceURL=dash4.js

require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    "splunkjs/mvc/searchmanager",
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView, SearchManager) {     
    $( '#drilldown_modal_panel >* .modal-body' ).append( $('#drilldown_panel')  ) // Move the panel to the modal popup
    $('#drilldown_modal_panel > .dashboard-panel').css('background-color','rgba(0, 0, 0, 0)'); // Hide the parent element of the modal
    // Integrate with the table drilldown
    mt = mvc.Components.attributes.main_table
    mt.on("click", function(e) {

        // Displays a data object in the console
        //console.log("Clicked the table:", e.data);
        $("#drilldown_modal").modal(); // Show the pop-up
    });
});
