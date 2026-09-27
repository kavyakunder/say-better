// Virtual backgrounds offered in the record panel, Google Meet style.
// To add your own, drop an image into public/backgrounds/ and add an entry here.

export type BackgroundOption =
  | { id: "none"; label: string; kind: "none" }
  | { id: "blur"; label: string; kind: "blur" }
  | { id: string; label: string; kind: "image"; src: string };

export const BACKGROUNDS: BackgroundOption[] = [
  { id: "none", label: "None", kind: "none" },
  { id: "blur", label: "Blur", kind: "blur" },
  { id: "stage", label: "Stage", kind: "image", src: "/backgrounds/stage.svg" },
  { id: "library", label: "Library", kind: "image", src: "/backgrounds/library.svg" },
  { id: "sunset", label: "Sunset", kind: "image", src: "/backgrounds/sunset.svg" },
  { id: "ocean", label: "Ocean", kind: "image", src: "/backgrounds/ocean.svg" },
  { id: "night-sky", label: "Night sky", kind: "image", src: "/backgrounds/night-sky.svg" },
];
