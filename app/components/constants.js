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
export const PLATFORMS = [
  "Instagram",
  "Facebook",
  "TikTok",
  "LinkedIn",
  "Twitter",
];

export const PLATFORM_ASPECT_RATIOS = {
  Instagram: ["1:1", "1.91:1", "4:5", "9:16"],
  Facebook: ["1:1", "1.91:1", "4:5", "9:16"],
  TikTok: ["1:1", "4:5", "9:16", "16:9"],
  LinkedIn: ["1:1", "1.91:1", "4:5"],
  Twitter: ["1:1", "1.91:1", "9:16", "16:9"],
};

export function getAspectRatiosForPlatform(platform) {
  return PLATFORM_ASPECT_RATIOS[platform] ?? ASPECT_RATIOS;
}
export const DURATIONS = ["5s", "10s", "15s", "30s", "60s"];
export const IMAGE_SIZES = ["1K", "2K", "4K"];

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
  duration: "10s",
  imageSize: "1K",
};

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
