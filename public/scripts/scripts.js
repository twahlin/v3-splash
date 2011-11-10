;(function() {

  // ON DOCUMENT.ready fire the primary function
  $(function(){ timer.init() })    

    var timer = {
      //
      // `create_arc` is used to assign an arc to the Raphael pane created in .init
      //
      create_arc: function(arch) {
        arch.customAttributes.arc = function (xloc, yloc, value, total, R) {
          var alpha = 360 / total * value,
          a = (90 - alpha) * Math.PI / 180,
          x = xloc + R * Math.cos(a),
          y = yloc - R * Math.sin(a),
          path;
          if (total == value) {
            path = [["M", xloc, yloc - R], ["A", R, R, 0, 1, 1, xloc - .01, yloc - R]];
          } else {
            path = [["M", xloc, yloc - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
          }
          return {path: path};
        };
      },
      //
      // `get_arc_radius` returns the correct arc radius based on something
      //
      get_arc_radius: function() {
        return ((($('#timer ul li:last em').text()) * 1.66666667));
      },
      //
      // `update_based_on(type increment)
      //
      update_based_on: function(type, obj) {
        var types = {
          'seconds': 1000,
          'minutes': 60000,
          'hours': 3600000
        }

        var update = setInterval(function() {
          obj.animate({arc: [100, 100, timer.get_arc_radius(), 100, 80]}, types[type]);  
        }, types[type])
      },
      //
      // `create_pieces`
      //
      create_pieces: function() {
        var archtype = Raphael("pane", 200, 200)      
        timer.create_arc(archtype)

        //http://stackoverflow.com/questions/5061318/drawing-centered-arcs-in-raphael-js
        //make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
        var my_arc = archtype.path().attr({"stroke": "#6caddf", "stroke-width": 10, arc: [100, 100, timer.get_arc_radius(), 100, 80]});
        timer.update_based_on('seconds', my_arc)
      },
      //
      // `init` kicks of the main behavior
      //
      init: function() {

        $('#timer').countdown({ 
          until: new Date(2011, 11, 11), 
          timezone: -5,
          layout: '<ul>{d<}<li class="days"><em>{dn}</em> {dl}</li>{d>}{h<}<li class="hours"><em>{hn}</em> {hl}</li>{h>}' + 
            '{m<}<li class="minutes"><em>{mn}</em> {ml}</li>{m>}{s<}<li class="seconds"><em>{sn}</em> {sl}</li>{s>}</ul>',
          onTick: function() {}
        });

        timer.create_pieces()
      } // eo .init
    }
    
    
    //external links
    function externalLinks() {
        if (!document.getElementsByTagName) return;
        var anchors = document.getElementsByTagName("a");
        for (var i=0; i<anchors.length; i++) {
            var anchor = anchors[i];
            if (anchor.getAttribute("href") &&
            anchor.getAttribute("rel") == "external")
            anchor.target = "_blank";
        }
    }
    window.onload = externalLinks;
    //end external links

})();                   