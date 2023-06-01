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
        format: (d) => `${d.getDate()} ${months[d.getMonth()]}`,
      };
    }
  }

  function defineButtonLabel() {
    const d = getDate();
    const formatter = disposeFormatter();
    return formatter.format(d);
  }

  const eventLabel = defineButtonLabel();
  jQuery("div.event-date span").each(function () {
    $(this).text(eventLabel);
  });
});
