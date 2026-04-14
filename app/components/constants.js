export const ASPECT_RATIOS = [
  "1:1",
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
  "LinkedIn",
  "TikTok",
  "X",
  "YouTube",
  "Otra",
];
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
