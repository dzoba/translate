$(function(){

  debugger;
  var TranslateView = Backbone.View.extend({
    el: '.body-content',

    events: {
      'click #translate' : 'translate'
    },

    initialize: function() {
      console.log('View Initialized');
    },

    translate: function(e) {
      e.preventDefault();

      var userString = $('#textEntry').val();

      if(userString) {
        var url = '/api/process/' + userString;
        console.log("Submitted");
        $.ajax({
          url: url
        }).done(function(data) {
          console.log(data);
          $('#translatedText').html('');
          for(var i = 0; i < userString.length; i++) {
            $('#translatedText').append(data[userString[i]].count + data[userString[i]].img);
          }
        });
      } else {
        alert('Please enter some text.');
      }
    }
  });

  var translateview = new TranslateView();

});
