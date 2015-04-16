'use strict';

require('angular');
require('angular-mocks');
var app = require('../lib/b-toggle');

function hasClass(element, cls)
{
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

// Patch since PhantomJS does not implement click() on HTMLElement. In some
// cases we need to execute the native click on an element. However, jQuery's
// $.fn.click() does not dispatch to the native function on <a> elements, so we
// can't use it in our implementations: $el[0].click() to correctly dispatch.
if (!HTMLElement.prototype.click)
{
  HTMLElement.prototype.click = function()
  {
    var ev = document.createEvent('MouseEvent');
    ev.initMouseEvent(
        'click',
        /*bubble*/true, /*cancelable*/true,
        window, null,
        0, 0, 0, 0, /*coordinates*/
        false, false, false, false, /*modifier keys*/
        0/*button=left*/, null
    );
    this.dispatchEvent(ev);
  };
}

describe('Test Suite: bToggle', function()
{
  var scope,
      $compile;

  function injectHTML(cls)
  {
    var body  = document.querySelector("body");
    body.innerHTML = '<div b-toggle class="' + cls +'"></div>';

    $compile(body)(scope);

    var toggle = body.querySelector("[b-toggle]");

    return toggle;
  }

  beforeEach(angular.mock.module('bons.bToggle'));

  beforeEach(angular.mock.inject(['$rootScope','$compile',
      function ($rootScope, _$compile_)
      {
        scope = $rootScope.$new();
        $compile = _$compile_;
      }
    ])
  );

  it('should be defined', function()
  {
    expect(app).toBeDefined();
  });

  it('should add the class active if the element was clicked', function()
  {
    var toggleElement = injectHTML();

    toggleElement.click();

    expect(hasClass(toggleElement, 'active')).toBe(true);
  });

  it('should remove the class active is the element was clicked and had the active class', function()
  {
    var toggleElement = injectHTML('active');

    toggleElement.click();

    expect(!hasClass(toggleElement, 'active')).toBe(true);
  });

  it('should remove the class active is the element was clicked and had the active class', function()
  {
    var toggleElement = injectHTML('active');

    toggleElement.click();

    expect(!hasClass(toggleElement, 'active')).toBe(true);
  });

});
