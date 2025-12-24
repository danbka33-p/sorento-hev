function closeAllSiblings(li) {
  // optional "classic accordion" behavior:
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
    closeAllSiblings(li);
    li.classList.add("active");
  }
}

function expandToCurrent(docId) {
  const leafDiv = document.querySelector('.thisFile[data-docid="' + docId + '"]');
  if (!leafDiv) return;

  leafDiv.classList.add("current");
  const leafLi = leafDiv.closest("li");
  if (leafLi) leafLi.classList.add("active");

  let cur = leafLi;
  while (cur) {
    const parentLi = cur.parentElement ? cur.parentElement.closest("li") : null;
    if (!parentLi) break;
    parentLi.classList.add("active");
    cur = parentLi;
  }

  leafDiv.scrollIntoView({ block: "center" });
}

function openMenu() {
  document.body.classList.add("menu-open");
}

function closeMenu() {
  document.body.classList.remove("menu-open");
}

document.addEventListener("DOMContentLoaded", function() {
  // Accordion click handling
  document.querySelectorAll(".accordeon > li div, .accordeon li div").forEach(function(div) {
    div.addEventListener("click", function(ev) {
      // leaf file: navigation handled by onclick; close menu on mobile
      if (div.classList.contains("thisFile")) {
        // if mobile menu open - close it
        if (document.body.classList.contains("menu-open")) closeMenu();
        return;
      }

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

  // Mobile sidebar controls
  const menuBtn = document.getElementById("menuBtn");
  const overlay = document.getElementById("overlay");

  if (menuBtn) {
    menuBtn.addEventListener("click", function() {
      if (document.body.classList.contains("menu-open")) closeMenu();
      else openMenu();
    });
  }
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // ESC closes menu
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeMenu();
  });
});
