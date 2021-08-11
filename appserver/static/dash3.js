//# sourceURL=dash3.js

require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    "splunkjs/mvc/searchmanager",
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView, SearchManager) {

    t1 = mvc.Components.attributes.table1;
     
    var CustomRangeRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            // Enable this custom cell renderer for both the active_hist_searches and the active_realtime_searches field
            return _(['acknowledge']).contains(cell.field);
        },
        render: function($td, cell) {
            // Add a class to the cell based on the returned value
            // Update the cell content
            $td.append('<input type="button" value="acknowledge" class="btn btn-primary"/>').on('click',function(){
                sourcetype = this.parentElement.firstElementChild.textContent;
                alert(sourcetype);

                // Create new search, write to a lookup
                sm = new SearchManager({
                    preview: false,
                    cache: false,
                    search: "| makeresults | eval _time=now(), sourcetype=\""+sourcetype+"\" | outputlookup st_acknowledges.csv append=t" 
                });
                
                // Search writing to lookup is done
                sm.on("search:done", function(state, job) {
                    if (state.content.resultCount === 0) {
                        alert("no results");
                    }
                    else {
                        alert("Results written to a lookup");
                        $('#table1 >* a.btn-pill.refresh').click(); // Refresh the table
                    }
                });
                sm.on("search:error", function(state, job) {
                        alert("Error while writing results");
                });
            });
        }
    });
    mvc.Components.get('table1').getVisualization(function(tableView) {
        // Add custom cell renderer, the table will re-render automatically.
        tableView.addCellRenderer(new CustomRangeRenderer());
    });
});
