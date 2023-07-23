window.addEventListener("DOMContentLoaded", function () {
    //check if we are comming from strategy page
    const fromStrategyPageLS = window.localStorage.getItem("nav-to-investments");
    document.querySelectorAll<HTMLDivElement>("[nav-from-strategy]").forEach((item) => {
      if (fromStrategyPageLS === item.getAttribute("nav-from-strategy")) {
        document.querySelector<HTMLDivElement>("[strategy-category]")?.click();
        item.click();
        setTimeout(() => {
          item.scrollIntoView({
            behavior: "smooth", // Use smooth scrolling
            block: "center", // Scroll to the center of the element
            inline: "nearest", // Scroll to the nearest edge of the element
          });
        }, 700);
        window.localStorage.removeItem("nav-to-investments");
      }
    });
  });
  