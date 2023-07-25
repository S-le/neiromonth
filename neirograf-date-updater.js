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

  function defineStartDateLabel() {
    const d = getDate();
    const formatter = new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
    });

    return formatter.format(d);
  }

  function defineStartTimeLabel() {
    const mskDate = convertTZ(new Date());
    const mskHours = mskDate.getHours();

    if (mskHours >= 15 && mskHours <= 19) {
      return "19:00 МСК";
    }

    return "15:00 или 19:00 МСК";
  }

  const $elBtnText = jQuery("span.date-to-change");
  if ($elBtnText.length) {
    $elBtnText.text(defineStartDateLabel() + " в " + defineStartTimeLabel());
  }
});
