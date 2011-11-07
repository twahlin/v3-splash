$(document).ready(function() {
    $('#timer').countdown({ 
        until: new Date(2011, 11, 11), 
        timezone: -5,
        layout: '<ul>{d<}<li><em>{dn}</em> {dl}</li>{d>}{h<}<li><em>{hn}</em> {hl}</li>{h>}' + 
            '{m<}<li><em>{mn}</em> {ml}</li>{m>}{s<}<li><em>{sn}</em> {sl}</li>{s>}</ul>',
        onTick: get_seconds
    });
    
    var archtype = Raphael("pane", 200, 100)
    archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
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
    //make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
    var my_arc = archtype.path().attr({"stroke": "#f00", "stroke-width": 6, arc: [50, 50, 0, 100, 30]});
    my_arc.animate({arc: [50, 50, timer_radius, 100, 30]}, 1500, "bounce");
    
    function get_seconds () {
        timer_radius = 100 - (($('#timer ul li:last em').text()) * 1.66666667);
    }
});        