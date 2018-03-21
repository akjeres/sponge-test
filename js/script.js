(function() {
  var currentElem = null;
  var menu_button_counter = 0;

  function parameter_2_int (string) {

    return parseInt(string.substring(0, string.indexOf("px")));
  };
  function set_row (className_set, className_clear0, className_clear1) {
    function clear_row (className) {
      for(var i = 0; i < document.getElementsByClassName(className).length; i++) {
        document.getElementsByClassName(className)[i].innerHTML = "";
      }
    }
    function set_new_row (className) {
      for(var i = 0; i < document.getElementsByClassName(className).length; i++) {
        document.getElementsByClassName(className)[i].innerHTML = "<br/>";
      }
    }
    clear_row (className_clear0);
    clear_row (className_clear1);
    set_new_row (className_set);
  }
  function open_menu() {
    central.classList.add("menu_open");
    header_menu.classList.add("menu_open");
    header.classList.add("menu_open");
  }
  function close_menu() {
    central.classList.remove("menu_open");
    header_menu.classList.remove("menu_open");
    header.classList.remove("menu_open");
    var padding_top = getComputedStyle(document.getElementById("top")).paddingTop;
    padding_top = parameter_2_int(padding_top);
    var window_scroll = window.pageYOffset || document.documentElement.scrollTop;
    if (window_scroll >= padding_top/2) {
      header.classList.add("scrolled");
    } else header.classList.remove("scrolled");
  }


  document.addEventListener("DOMContentLoaded", function() {
    function ready() {
      setTimeout('document.getElementById("header").style.visibility = "visible"', 1000);
      if (window.innerWidth > 1023) {
        set_row ("new_row_desktop", "new_row_tablet", "new_row_phone");
      } else if (window.innerWidth > 767) {
        set_row ("new_row_tablet", "new_row_desktop", "new_row_phone");
      } else {
        set_row ("new_row_phone", "new_row_desktop", "new_row_tablet");
        document.getElementsByClassName("new_row_phone")[0].innerHTML = "<br/><br/>";
      }
    }
    function setHover(item) {
      for (var i = 0; i < item.childNodes.length; i++) {
        if (item.childNodes[i].nodeName == "#text") continue;
        item.childNodes[i].childNodes[0].setAttribute("data-hover", item.childNodes[i].childNodes[0].innerHTML);
      }

      return false;
    }
    function setMobileStyles() {
      if (window.innerWidth > 1023) {
        header.classList.remove("mobile");
        header_menu.classList.remove("mobile");
      } else {
        header.classList.add("mobile");
        header_menu.classList.add("mobile");
      }
    }

    ready();
    setHover(menu);
    setMobileStyles();
  });
  menu.onmouseover = function(event) {
    if (currentElem) {
      return;
    }

  var target = event.target;
    while (target != this) {
      if (target.tagName == 'A') break;
      target = target.parentNode;
    }
    if (target == this) return;

    currentElem = target;
    document.getElementById("nav_ruler").style.width = '15px';
    document.getElementById("nav_ruler").style.left = (
      target.getBoundingClientRect().left 
      ) + "px";
  };

  menu.onclick = function(event) {

  var target = event.target;
    while (target != this) {
      if (target.tagName == 'A') break;
      target = target.parentNode;
    }
    if (target == this) return;

    currentElem = target;

  };

  menu.onmouseout = function(event) {
    if (!currentElem) return;

    var relatedTarget = event.relatedTarget;
    if (relatedTarget) {
      while (relatedTarget) {
        if (relatedTarget == currentElem) return;
        relatedTarget = relatedTarget.parentNode;
      }
    }

    document.getElementById("nav_ruler").style.width = '';
    currentElem = null;
  };

  header_row.onclick = function(event) {
    function menu_button_click() {

      ++menu_button_counter;
      if (menu_button_counter % 2) {
        open_menu();
      } else close_menu();
    }

    if (window.innerWidth < 1024) {
      if (event.target.id == "header_row" || 
          event.target.id == "menu_button" || event.target.id == "central" ||
          event.target.id == "top_span" || event.target.id == "bottom_span") {
          menu_button_click();
        } else {
          close_menu();
          menu_button_counter = 0;
        }
    }
  }

  window.onresize = function(event) {
    if (window.innerWidth > 1023) {
      header_menu.classList.remove("mobile");
      header.classList.remove("mobile");
    } else {
      header_menu.classList.add("mobile");
      header.classList.add("mobile");
      if (menu_button_counter%2) {
        open_menu();
      } else close_menu();
    }
    if (window.innerWidth > 1023) {
      set_row ("new_row_desktop", "new_row_tablet", "new_row_phone");
    } else if (window.innerWidth > 767) {
      set_row ("new_row_tablet", "new_row_desktop", "new_row_phone");
    } else {
      set_row ("new_row_phone", "new_row_desktop", "new_row_tablet");
      document.getElementsByClassName("new_row_phone")[0].innerHTML = "<br/><br/>";
    }
  };
  window.onscroll = function() {
    function scrollClass(item) {
      var window_scroll = window.pageYOffset || document.documentElement.scrollTop;
      var scrolled = (window_scroll > document.documentElement.clientHeight) ? window_scroll - document.documentElement.clientHeight : 0;
      var navbar_height = (window.innerWidth < 1024) ? header_row.offsetHeight : 0;
      var selectorList = document.getElementsByClassName(item);
      var user_window = document.documentElement.clientHeight;
      function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return box.top + pageYOffset;
      }
      for (var j = 0; j < selectorList.length; j++) {
        var selector = document.getElementsByClassName(item)[j];
        for (var i = 0; i < selector.childNodes.length; i++) {
          if (selector.childNodes[i].nodeName == "#text") continue;
          var to_selector = (getCoords(selector.childNodes[i]) > user_window) ? getCoords(selector.childNodes[i]) : 0;
          if((window.pageYOffset || document.documentElement.scrollTop)
            > (getCoords(selector.childNodes[i])+0.1*(selector.childNodes[i].offsetHeight)-user_window)
            && (window.pageYOffset || document.documentElement.scrollTop) < 
            getCoords(selector.childNodes[i])-navbar_height+selector.childNodes[i].offsetHeight) {
              selector.childNodes[i].classList.add("fade-class");
            } else selector.childNodes[i].classList.remove("fade-class");
        }
      }
    }

    if (window.innerWidth > 1023) {
      header.classList.remove("scrolled", "mobile", "menu_open");
      header.classList.remove("mobile");
    } else {
      var padding_top = getComputedStyle(document.getElementById("top")).paddingTop;
      padding_top = parameter_2_int(padding_top);
      var window_scroll = window.pageYOffset || document.documentElement.scrollTop;
      if (menu_button_counter%2) {
        open_menu();
      } else {
        close_menu();
        if (window_scroll >= padding_top/2) {
          header.classList.add("scrolled");
        } else header.classList.remove("scrolled");
      }
    }
    scrollClass("fade");
  };
})();