const feedSection = document.querySelector("body");


function removeFeedCrap() {
  // Remove News
  const newsSection = document.querySelector("aside[aria-label='LinkedIn News']");
  if (newsSection) {
    console.log("De-enshitifier: Removed news feed");
    newsSection.remove();
  }
  // Remove Ads
  const ads = document.getElementsByClassName("ad-banner-container");
  for (let i = 0; i < ads.length; i++) {
    console.log("De-enshitifier: Removed an ad");
    ads[i].remove();
  }


  // Remove promoted
  const promotedSections = feedSection.querySelectorAll("[aria-hidden]");
  promotedSections.forEach((section) => {
    if (section.innerHTML.includes("Promoted")) {
      let delSection =
        section?.parentElement?.parentElement?.parentElement?.parentElement
          ?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
      console.log(
        "De-enshitifer: Found promoted post, removed it"
      );
      console.log(delSection);
      if (delSection) {
        delSection.remove();
      }
    }
  });
  const suggested = feedSection.querySelectorAll(
    "span[class='update-components-header__text-view']"
  );
  suggested.forEach((section) => {
    if (
      section.innerHTML.includes("Suggested") ||
      section.innerHTML.includes("Recommended") ||
      section.innerHTML.includes("recommended") ||
      section.innerHTML.includes("commented") ||
      section.innerHTML.includes("likes") ||
      section.innerHTML.includes("celebrates") ||
      section.innerHTML.includes("loves") ||
      section.innerHTML.includes("supports") ||
      section.innerHTML.includes("follow")
    ) {
      let delSection =
        section.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.parentElement;
      console.log(
        "De-Enshitifier: Found Suggested/Recommended post, removed it"
      );
      console.log(delSection);
      delSection.remove();
    }
  });
  const promos = feedSection.querySelector("div[class='update-components-promo-v1']");
  if (promos) {
  promos.forEach((section) => {
    section?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement.remove();
  });
}
}

// Attempt to remove the feed immediately in case the page is already loaded
removeFeedCrap();

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(removeFeedCrap);

// Start observing the target node for configured mutations
observer.observe(feedSection.parentElement, config);
