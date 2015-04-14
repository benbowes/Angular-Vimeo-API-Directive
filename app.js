var app = angular.module('VimeoRepeater', [])

  .directive('vimeo', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        video: '='
      },
      templateUrl: 'vimeo-template.html',
      link: function(scope, element, attrs) {
        
        var $playButton = element.find('button'),
            $iframe = element.find('iframe'),
            player,
            url = "http://player.vimeo.com/video/" + scope.video.vid + "?title=0&byline=0&portrait=0&api=1&player_id="+scope.video.id;
            // NB: player_id must match the id of the iframe element when using multiple video players
            
        scope.isPlaying = false; // boolean for controlling display of UI elements
        
        $iframe.attr('id', scope.video.id); // ensure video iframe has the same id as 'player_id' parameter
        $iframe.attr('src', url); // add the vimeo video url

        player = $f($iframe[0]); // use froogaloop to target the iframe html element
        
        player.addEvent('ready', function() {
          
          player.addEvent('finish', function() {
            scope.isPlaying = false;
            scope.$digest(); // force angular to update vars
          })
          .addEvent('pause', function(id) {
            scope.isPlaying = false;
            scope.$digest(); // force angular to update vars
          })
          .addEvent('play', function(id) {
            scope.isPlaying = true;
            scope.$digest(); // force angular to update vars
          });
          
        });

        $playButton.on('click', function(event) {
  
          if (scope.isPlaying) {
            player.api('pause');
          } else {
            player.api('play');
          }
  
          scope.isPlaying = !scope.isPlaying; // convert boolean to it's opposite value 
          scope.$digest(); // force angular to update vars
        });
      }
    };
  });
