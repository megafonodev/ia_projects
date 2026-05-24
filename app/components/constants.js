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
 * Todos los valores son divisibles por 16 (requisito de GPT Image 2).
 * La entrada "default" se usa cuando la plataforma no tiene un valor específico.
 *
 * Verificación: W % 16 === 0 && H % 16 === 0 para todos los valores.
 */
export const ASPECT_RATIO_PIXELS = {
  default: {
    "1:1":  "1024x1024",  // 64×64 bloques ✓
    "2:3":  "1024x1536",  // 64×96 ✓  ratio exacto
    "3:2":  "1536x1024",  // 96×64 ✓  ratio exacto
    "3:4":  "768x1024",   // 48×64 ✓  ratio exacto
    "4:3":  "1536x1152",  // 96×72 ✓  ratio exacto
    "4:5":  "1024x1280",  // 64×80 ✓  ratio exacto
    "5:4":  "1280x1024",  // 80×64 ✓  ratio exacto
    "9:16": "1152x2048",  // 72×128 ✓ ratio exacto
    "16:9": "2048x1152",  // 128×72 ✓ ratio exacto
    "21:9": "2016x864",   // 126×54 ✓ ratio exacto (7:3)
  },
  Instagram: {
    "1:1":  "1024x1024",
    "4:5":  "1024x1280",
    "9:16": "1152x2048",
    "16:9": "1024x576",   // 64×36 ✓ ratio exacto (landscape feed)
  },
  Facebook: {
    "1:1":  "1024x1024",
    "4:5":  "1024x1280",
    "9:16": "1152x2048",
    "16:9": "1024x576",
  },
  LinkedIn: {
    "1:1":  "1024x1024",
    "2:3":  "1024x1536",
    "4:5":  "1024x1280",
    "9:16": "1152x2048",
    "16:9": "1024x576",
  },
  TikTok: {
    "1:1":  "1024x1024",
    "9:16": "1152x2048",
    "16:9": "2048x1152",  // mayor resolución para TikTok horizontal
  },
  X: {
    "1:1":  "1024x1024",
    "9:16": "1152x2048",
    "16:9": "1024x576",
  },
  YouTube: {
    "1:1":  "1024x1024",
    "4:3":  "1536x1152",
    "9:16": "1152x2048",
    "16:9": "2048x1152",  // mayor resolución para YouTube
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
