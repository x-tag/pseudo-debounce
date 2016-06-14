(function(){
  var bounce = function(){
    var args = this.queueArgs;
    var target = this.queueTarget;
    this.queueArgs = this.queueTarget = this.queueRequest = null;
    return this.apply(target, args);
  };

  xtag.pseudos.debounce = {
    onCompiled: function(fn, pseudo){
      var timer = pseudo.arguments[0] == 'timer';
      var duration = pseudo.arguments[1];
      return function(){
        fn.queueArgs = arguments;
        fn.queueTarget = this;
        fn.queueRequest = fn.queueRequest || (timer ?
                          setTimeout(bounce.bind(fn), duration || 100) :
                          xtag.requestFrame(bounce.bind(fn)));
      }
    }
  }
})();
