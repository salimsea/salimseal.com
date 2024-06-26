import create from "zustand";

export const URLCV = "https://s.id/cv-salim-segaf-alqosam";
export const URLLINKEDIN = "https://www.linkedin.com/in/salimsea/";
export const URLGITHUB = "https://github.com/salimsea";
export const URLFACEBOOK = "https://www.facebook.com/salimsea";
export const URLINSTAGRAM = "https://instagram.com/salimseal";
export const URLTWITTER = "https://twitter.com/salimsea";
export const URLDRIBBLE = "https://dribbble.com/salimsea";
export const URLBEHANCE = "https://www.behance.net/salimsaseasasa";

export const useProgressStore = create((set) => ({
  isAnimating: false,
  setIsAnimating: (isAnimating) => set(() => ({ isAnimating })),
}));

export const FUNCTextToSlug = (Text) => {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
