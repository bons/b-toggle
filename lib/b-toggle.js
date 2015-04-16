'use strict';

var MODULE_NAME = 'bons.bToggle';

var angular = require('angular');

angular .module(MODULE_NAME, [])
        .directive('bToggle',
        function()
        {
          return {
            restrict: 'A',
            transclude: true,
            scope: {
              isActive: '@',
              onActive: '&',
              onIdle: '&'
            },
            link: function( scp, elm, attr, ctrl, trans )
            {

              scp.$watch('isActive', function( newVal )
              {
                if(newVal)
                {
                  attr.$addClass('active');

                  if(typeof scp.onActive === 'function')
                  {
                    scp.onActive();
                  }

                }
                else
                {
                  attr.$removeClass('active');

                  if(typeof scp.onIdle === 'function')
                  {
                    scp.onIdle();
                  }
                }
              });

              elm.bind('click', function(evt)
              {
                if(evt.isDefaultPrevented())
                {
                  return false; // exit
                }

                scp.$apply(function()
                {
                  scp.isActive = !scp.isActive;
                });
              });

              // allow elements to born with .active class and mirror it in scope
              scp.isActive = angular.element(elm).hasClass('active');

              // manually transclusion appending this scope
              trans(scp, function(clone)
              {
                elm.append(clone);
              });
            }
          };
        }); // end bStick

module.exports = MODULE_NAME;
