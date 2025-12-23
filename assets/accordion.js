function closeAllSiblings(li) {
  // If you want "classic accordion" (only one open per level), enable this:
  // const parentUl = li.parentElement;
  // Array.from(parentUl.children).forEach(sib => {
  //   if (sib !== li) sib.classList.remove("active");
  // });
}

function toggleFolder(li) {
  if (!li) return;
  const isActive = li.classList.contains("active");
  if (isActive) {
    li.classList.remove("active");
  } else {
    // optional classic accordion behavior
    closeAllSiblings(li);
    li.classList.add("active");
  }
}

function expandToCurrent(docId) {
  const leafDiv = document.querySelector('.thisFile[data-docid="' + docId + '"]');
  if (!leafDiv) return;

  // mark current
  leafDiv.classList.add("current");
  const leafLi = leafDiv.closest("li");
  if (leafLi) leafLi.classList.add("active");

  // open parents
  let cur = leafLi;
  while (cur) {
    const parentLi = cur.parentElement ? cur.parentElement.closest("li") : null;
    if (!parentLi) break;
    parentLi.classList.add("active");
    cur = parentLi;
  }

  // scroll current into view (sidebar)
  leafDiv.scrollIntoView({ block: "center" });
}

document.addEventListener("DOMContentLoaded", function() {
  // click handling:
  // - if li has a nested <ul>, clicking its first <div> toggles
  // - if it's a thisFile leaf, clicking navigates (already set via onclick)
  document.querySelectorAll(".accordeon > li div, .accordeon li div").forEach(function(div) {
    div.addEventListener("click", function(ev) {
      // leaf file: let onclick navigate; still prevent folder toggle
      if (div.classList.contains("thisFile")) return;

      const li = div.closest("li");
      const childUl = li ? li.querySelector(":scope > ul") : null;
      if (childUl) {
        ev.preventDefault();
        toggleFolder(li);
      }
    });
  });

  // current docId from meta injected by generator
  const meta = document.querySelector('meta[name="docId"]');
  if (meta && meta.content) {
    expandToCurrent(meta.content);
  }
});