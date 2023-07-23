const newsPageNo = window.localStorage.getItem("searchParamNewsPageNo");
if (newsPageNo && Number(newsPageNo) > 0 && Number(newsPageNo) < 3) {
  scrollToNews();
  window.localStorage.removeItem("searchParamNewsPageNo");
}

const newsWrapper = document.querySelector<HTMLDivElement>("[get-no-of-items]");

// Create a new MutationObserver instance to track when fs-cmsload adds the news
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      //When this is triggered fs-cmsload has added the remaining members
      scrollToNews();
    }
  });
});

// Configure and start observing the teamWrapper
const observerConfig = { childList: true };
newsWrapper && observer.observe(newsWrapper, observerConfig);

function scrollToNews() {
  // check if we come from search and we have local storage param
  const hasLocalStorageDataNews =
    window.localStorage.getItem("searchParamNews");
  const newsItems = document.querySelectorAll<HTMLDivElement>("[news-item]");
  // if we have local storage param we find desired div and simulate click to open drawer
  hasLocalStorageDataNews &&
    newsItems.forEach((newsItem) => {
      const newsItemSlug = newsItem.getAttribute("news-item");
      if (newsItemSlug === hasLocalStorageDataNews) {
        newsItem.scrollIntoView({
          behavior: "smooth", // Use smooth scrolling
          block: "start", // Scroll to the top of the element
          inline: "nearest", // Scroll to the nearest edge of the element
        });
        newsItem.click();
        window.localStorage.removeItem("searchParamNews");
      }
    });
}
