var app = angular.module('VimeoRepeater', [])

.directive('vimeo', function() {
  
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'vimeo-template.html',
    scope: {
      video: '='
    },
    link: function(scope, element, attrs) {

      var $playButton = element.find('button'),
          $iframe = element.find('iframe'),
          player,
          url = "http://player.vimeo.com/video/" + scope.video.vid + "?title=0&byline=0&portrait=0&api=1&player_id=" + scope.video.id;
          // NB: player_id param must match the id of the iframe element when using multiple video players

      scope.isPlaying = false; // boolean for controlling display of UI elements
      $iframe.attr('id', scope.video.id); // ensure video iframe has the same id as 'player_id' parameter
      $iframe.attr('src', url); // add the vimeo video url
      player = $f($iframe[0]); // use froogaloop to target the iframe html element

      player.addEvent('ready', function() { // wait for player ready before adding other event listeners
      
        player.addEvent('finish', function() {
          scope.isPlaying = false;
          scope.$digest(); // force angular to update UI
        })
        .addEvent('pause', function(id) {
          scope.isPlaying = false;
          scope.$digest(); // force angular to update UI
        })
        .addEvent('play', function(id) {
          scope.isPlaying = true;
          scope.$digest(); // force angular to update UI
        });
      });

      $playButton.on('click', function(event) {
        if (scope.isPlaying) {
          player.api('pause');
        } else {
          player.api('play');
        }
        scope.isPlaying = !scope.isPlaying; // convert boolean to it's opposite value 
        scope.$digest(); // force angular to update UI
      });
    }
  };
});