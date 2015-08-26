class Hello {
  hi() {
    return "hello";
  }
}

(() => {
  var world = new Hello();

  document.getElementById("root").innerHTML = world.hi();
})();
