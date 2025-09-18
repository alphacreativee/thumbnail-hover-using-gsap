document.addEventListener("DOMContentLoaded", () => {
  // const lenis = new Lenis();
  // lenis.on("scroll", ScrollTrigger.update);
  // gsap.ticker.add((time) => {
  //   lenis.raf(time * 1000);
  // });
  // gsap.ticker.lagSmoothing(0);

  const thumbnail = {
    item: document.querySelectorAll(".thumbnail-item"),
    itemText: document.querySelectorAll(".thumbnail-item > h1"),
    figure: document.querySelectorAll(".thumbnail-image"),
  };

  const bg = {
    media: document.querySelectorAll(".bg-media"),
    mediaImg: document.querySelectorAll(".bg-media-image"),
    mediaText: document.querySelectorAll(".bg-media-text > span"),
  };

  const clipPath = {
    init: "polygon(0% 0% , 0% 0% , 10% 100%, 10% 100%)",
    full: "polygon(100% 0% , 0% 0% , 10% 100%, 90% 100%)",
  };

  gsap.defaults({
    duration: 1.1,
    ease: "expo.inOut",
    overwrite: true,
  });

  const initThumbnail = () => {
    gsap.set(thumbnail.item, {
      yPercent: 120,
    });

    gsap.set(bg.media, {
      clipPath: clipPath.init,
      scale: 1.25,
    });

    gsap.set(bg.mediaText, {
      yPercent: 100,
    });
    gsap.to(thumbnail.item, {
      yPercent: 0,
      stagger: 0.032,
    });
  };

  const animateClipPath = (index, eventType) => {
    for (let i = 0; i < bg.media.length; i++) {
      gsap.to(bg.media[index], {
        clipPath: () =>
          eventType === "mouseenter" ? clipPath.full : clipPath.init,
      });

      gsap.to(bg.mediaImg[index], {
        scale: () => (eventType === "mouseenter" ? 1 : 1.25),
      });

      gsap.to(bg.mediaText[index], {
        yPercent: () => (eventType === "mouseenter" ? 0 : 100),
      });
    }
  };

  const amimateStyle = (item, eventType) => {
    thumbnail.item.forEach((otherItem) => {
      if (otherItem === item) {
        otherItem.style.color = eventType === "mouseenter" ? "#fff" : "#181818";
      } else {
        otherItem.style.opacity = eventType === "mouseenter" ? 0.5 : 1;
      }
    });
  };

  const addEventListeners = () => {
    thumbnail.item.forEach((item, index) => {
      const figure = thumbnail.figure[index];

      const handleInteraction = (event) => {
        const eventType =
          event.type === "touchstart" || event.type === "mouseenter"
            ? "mouseenter"
            : "mouseleave";

        animateClipPath(index, eventType);
        amimateStyle(item, eventType);
        eventType === "mouseenter"
          ? figure.classList.add("active")
          : figure.classList.remove("active");
      };

      //desktop
      item.addEventListener("mouseenter", handleInteraction);
      item.addEventListener("mouseleave", handleInteraction);
      //mobile

      item.addEventListener("touchstart", handleInteraction);
      item.addEventListener("touchend", handleInteraction);
    });
  };

  window.addEventListener("DOMContentLoaded", () => {
    initThumbnail();
    addEventListeners();
  });
});
