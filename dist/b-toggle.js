/* b-toggle - v0.1.0 - 2015-05-06
* https://github.com/bons/b-toggle
* Copyright (c) 2015 Bons; Licensed MIT */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
              isActive: '=?',
              onActive: '&',
              onIdle: '&'
            },
            link: function( scp, elm, attr, ctrl, trans )
            {
              if(typeof scp.isActive === 'undefined')
              {
                scp.isActive = false;
              }

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

},{"angular":"angular"}]},{},[1]);
