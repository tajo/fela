var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

babelHelpers.defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

babelHelpers.extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

babelHelpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

babelHelpers;

/*  weak */
var RULE_TYPE = 1;

function createDOMInterface(renderer, node) {
  return function (change) {
    // only use insertRule in production as browser devtools might have
    // weird behavior if used together with insertRule at runtime
    if (true && change.type === RULE_TYPE && !change.media) {
      try {
        node.sheet.insertRule(change.selector + '{' + change.declaration + '}', node.sheet.cssRules.length);
      } catch (error) {
        // TODO: MAYBE WARN IN DEV MODE
      }
    } else {
      node.textContent = renderer.renderToString();
    }
  };
}

function isValidHTMLElement(mountNode) {
  return mountNode && mountNode.nodeType === 1;
}

function render(renderer, mountNode) {
  // mountNode must be a valid HTML element to be able
  // to set mountNode.textContent later on
  if (!isValidHTMLElement(mountNode)) {
    throw new Error('You need to specify a valid element node (nodeType = 1) to render into.');
  }

  // warns if the DOM node either is not a valid <style> element
  // thus the styles do not get applied as Expected
  // or if the node already got the data-fela-stylesheet attribute applied
  // suggesting it is already used by another Renderer
  void 0;

  // mark and clean the DOM node to prevent side-effects
  mountNode.setAttribute('data-fela-stylesheet', '');

  var updateNode = createDOMInterface(renderer, mountNode);
  renderer.subscribe(updateNode);

  var css = renderer.renderToString();

  if (mountNode.textContent !== css) {
    // render currently rendered styles to the DOM once
    mountNode.textContent = css;
  }
}

var index = { render: render };

export default index;