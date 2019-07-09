/*
 * Copyright (C) 2007-2019 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function($) {

   $(function() {
     var queryParam = $.urlParam('q');
     if (queryParam) {
       queryParam = decodeURI(queryParam).trim();
       $('#query').val(queryParam);
     }

     var source = $("#search-results-template").html();
     var template = Handlebars.compile(source);

     var doSearch = function(userTerm, categories) {
       var params = {};

       if (userTerm) {
         params.userTerm = userTerm;
       }
       if (categories) {
         params.categories = categories;
       }

       $.get("/api/search.json", params).done(function(data) {
         if (data == null) {
           data = [];
         }

         var context = { results: data };
         var html = template(context);

         $('#search-results').html(html);
       });
     }

     $('#categories input').click(function() {
       var categories = [];

       $('#categories input:checked').each(function() {
         categories.push($(this).val());
       });

       doSearch(queryParam, categories);
     });

     doSearch(queryParam);
   });

})(jQuery);
