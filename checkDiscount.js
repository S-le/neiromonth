jQuery(document).ready(function () {
  var HOUR = 3600000;

  function checkDiscount() {
    var discountPriceSections = getDiscountPriceSections(),
      fullPriceSections = getFullPriceSections();

    if (hasDiscount()) {
      showSections(discountPriceSections);
      hideSections(fullPriceSections);
    } else {
      hideSections(discountPriceSections);
      showSections(fullPriceSections);
    }
  }

  checkDiscount();
  setInterval(function () {
    checkDiscount();
  }, HOUR);

  function hasDiscount() {
    var currentDayAndMonth = getCurrentDayAndMount();
    var currentDay = currentDayAndMonth[0];
    return currentDay < 3 || currentDay > 20;
  }

  function getCurrentDayAndMount() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();

    return [day, month];
  }

  function getDiscountPriceSections() {
    return jQuery(".discount-price,section.elementor-element-821ba00");
  }

  function getFullPriceSections() {
    return jQuery(".full-price");
  }

  function hideSections($sections) {
    if (!$sections) return;
    $sections.hide();
  }

  function showSections($sections) {
    if (!$sections) return;
    $sections.show();
  }
});
