jQuery(document).ready(function () {
  function convertTZ(date, tzString = "Europe/Moscow") {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: tzString }
      )
    );
  }
  function getDate() {
    const d = new Date();
    const moscowDate = convertTZ(d);

    if (moscowDate.getHours() >= 19) {
      d.setDate(d.getDate() + 1);
    }

    return d;
  }

  function disposeFormatter() {
    try {
      const formatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return formatter;
    } catch (e) {
      const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
      ];
      return {
        format: (d) =>
          `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`,
      };
    }
  }

  function defineButtonLabel() {
    const d = getDate();
    const formatter = disposeFormatter();
    return "Старт " + formatter.format(d);
  }

  function defineStartTimeLabel() {
    const mskDate = convertTZ(new Date());
    const mskHours = mskDate.getHours();

    if (mskHours >= 15 && mskHours <= 19) {
      return "19:00 МСК";
    }

    return "15:00 или 19:00 МСК";
  }

  const $elBtnText = jQuery("#date-to-change").find(".elementor-button-text");
  if ($elBtnText.length) {
    $elBtnText.text(defineButtonLabel());
  }

  // const $elStartTimeLabel = jQuery("div.start-time-label").find("span");
  // if ($elStartTimeLabel.length) {
  //   $elStartTimeLabel.text(defineStartTimeLabel());
  // }

  const elStartTimeLabel = document.querySelector("div.start-time-label span");
  if (elStartTimeLabel) {
    elStartTimeLabel.innerHTML = defineStartTimeLabel();
  }
});
