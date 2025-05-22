const feedSection = document.querySelector("main[aria-label='Main Feed']");

function removeFeedCrap() {
  // Remove promoted
  const promotedSections = feedSection.querySelectorAll("[aria-hidden]");
  promotedSections.forEach((section) => {
    if (section.innerHTML.includes("Promoted")) {
      let delSection =
        section?.parentElement?.parentElement?.parentElement?.parentElement
          ?.parentElement?.parentElement?.parentElement?.parentElement;
      console.log(
        "LinkedIn Feed Obliterator - Found promoted post, removing it..."
      );
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
      section.innerHTML.includes("recommended")
    ) {
      let delSection =
        section.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement;
      console.log(
        "LinkedIn Feed Obliterator - Found Suggested/Recommended post, removing it..."
      );
      delSection.remove();
    }
  });
}

// Attempt to remove the feed immediately in case the page is already loaded
removeFeedCrap();

// Ref: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(removeFeedCrap);

// Start observing the target node for configured mutations
observer.observe(feedSection, config);
