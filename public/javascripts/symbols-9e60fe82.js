(function(){$(function(){var n,a,t,e,r,c,o,u,i,s,l;return a=function(n){var a;a=parseInt($(n).text()),26>a?$(n).css("color","rgb("+(255-10*a)+","+10*a+",0)"):$(n).css("color","green")},l=$("#symbols-list"),s=[],t="",r=new Detexify({baseuri:"/api/"}),c=function(n,a){return(""+n).localeCompare(""+a)},n=function(n,a){return c(n.command,a.command)},o=function(a,t){return a["package"]===t["package"]?n(a,t):c(a["package"],t["package"])},i=function(n,a){return n.samples-a.samples},e=function(n){return""===t?n:$.grep(n,function(n){return n["package"]&&n["package"].match(t)||n.command.match(t)})},u=function(n,a){populateSymbolList(e(n),a)},$("#sort").change(function(){switch($(this).val()){case"alpha":s.sort(n);break;case"samples":s.sort(i);break;case"package":s.sort(o)}u(s,l)}),jQuery.fn.handleKeyboardChange=function(n){var a,t,e,r;return e=function(n){var a;return a={9:!0,16:!0,17:!0,18:!0,37:!0,38:!0,39:!0,40:!0,91:!0,92:!0,93:!0},a[n.which]},t=function(n){n.val()!==jQuery.data(n[0],"valueLast")&&(jQuery.data(n[0],"valueLast",n.val()),n.trigger("change"))},a=function(){r&&clearTimeout(r)},r=0,this.keydown(function(n){return e(n)?void 0:(a(),null)}).keyup(function(c){var o;e(c)||(a(),o=$(this),r=setTimeout(function(){t(o)},n))}).change(function(){return t($(this))})},$("#filter").handleKeyboardChange(300).change(function(){t=$(this).val(),u(s,l)}),$.getJSON("/api/symbols",function(a){return $("#symbols--loading").hide(),s=a,s.sort(n),u(s,l),s.sort(n),u(s,l)})})}).call(this);