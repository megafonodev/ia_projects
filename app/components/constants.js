export const ASPECT_RATIOS = [
  "1:1",
  "1.91:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9",
];
export const VIDEO_ASPECT_RATIOS = ["16:9", "9:16"];
export const PLATFORMS = [
  "Instagram",
  "Facebook",
  "TikTok",
  "LinkedIn",
  "X",
  "YouTube",
  "Otra",
];

export const PLATFORM_ASPECT_RATIOS = {
  Instagram: ["1:1", "4:5", "9:16", "16:9"],
  Facebook: ["1:1", "4:5", "9:16", "16:9"],
  LinkedIn: ["1:1", "2:3", "4:5", "9:16", "16:9"],
  TikTok: ["1:1", "9:16", "16:9"],
  X: ["1:1", "9:16", "16:9"],
  YouTube: ["1:1", "4:3", "9:16", "16:9"],
  // "Otra" → sin entrada → getAspectRatiosForPlatform devuelve ASPECT_RATIOS completo
};

/**
 * Dimensiones en píxeles por plataforma y ratio.
 * La entrada "default" se usa cuando la plataforma no tiene un valor específico.
 */
export const ASPECT_RATIO_PIXELS = {
  default: {
    "1:1":   "1080x1080",
    "2:3":   "1080x1620",
    "3:2":   "1620x1080",
    "3:4":   "1080x1440",
    "4:3":   "1440x1080",
    "4:5":   "1080x1350",
    "5:4":   "1350x1080",
    "9:16":  "1080x1920",
    "16:9":  "1920x1080",
    "21:9":  "2520x1080",
  },
  Instagram: {
    "1:1":  "1080x1080",
    "4:5":  "1080x1350",
    "9:16": "1080x1920",
    "16:9": "1080x608",
  },
  Facebook: {
    "1:1":  "1080x1080",
    "4:5":  "1080x1350",
    "9:16": "1080x1920",
    "16:9": "1200x675",
  },
  LinkedIn: {
    "1:1":  "1200x1200",
    "2:3":  "600x900",
    "4:5":  "720x900",
    "9:16": "628x1200",
    "16:9": "1200x675",
  },
  TikTok: {
    "1:1":  "1080x1080",
    "9:16": "1080x1920",
    "16:9": "1920x1080",
  },
  X: {
    "1:1":  "1200x1200",
    "9:16": "1080x1920",
    "16:9": "1200x675",
  },
  YouTube: {
    "1:1":  "1080x1080",
    "4:3":  "1440x1080",
    "9:16": "1080x1920",
    "16:9": "1920x1080",
  },
};

/** Opciones de calidad de imagen (solo modo imagen). */
export const IMAGE_QUALITY_OPTIONS = [
  { label: "Baja",  value: "low" },
  { label: "Media", value: "medium" },
  { label: "Alta",  value: "high" },
];

export function getAspectRatiosForPlatform(platform) {
  return PLATFORM_ASPECT_RATIOS[platform] ?? ASPECT_RATIOS;
}

export const DURATIONS = ["4s", "6s", "8s"];
export const IMAGE_SIZES = ["720p"];

export const INITIAL_STATE = {
  campaignName: "",
  product: "",
  objective: "",
  referenceImage: null,
  referenceImageName: "",
  numberOfOutputs: 1,
  aspectRatio: "1:1",
  platform: "",
  audience: "",
  mainMessage: "",
  valueProp: "",
  hexColors: "",
  requiredElements: "",
  restrictions: "",
  duration: "6s",
  imageSize: "720p",
  imageQuality: "medium",
};

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
