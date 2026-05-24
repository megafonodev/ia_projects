import { ASPECT_RATIO_PIXELS } from "../components/constants";

/**
 * Convierte un ratio (ej. "9:16") a dimensiones en píxeles (ej. "1080x1920")
 * teniendo en cuenta los tamaños oficiales de cada plataforma.
 *
 * Lógica de resolución:
 *  1. ¿Existe entrada para [plataforma][ratio]? → úsala
 *  2. ¿No? → usa ASPECT_RATIO_PIXELS.default[ratio]
 *  3. ¿Tampoco? → devuelve el ratio tal cual (nunca falla)
 */
export function toPixelSize(ratio, platform) {
  const platformMap = ASPECT_RATIO_PIXELS[platform];
  if (platformMap?.[ratio]) return platformMap[ratio];
  const defaultMap = ASPECT_RATIO_PIXELS.default;
  if (defaultMap?.[ratio]) return defaultMap[ratio];
  return ratio;
}

/**
 * Builds the payload from form state + mode.
 */
function toDurationInt(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Duración de video inválida: ${value}`);
  }
  return parsed;
}

function buildImagePayload(form) {
  return {
    mode: "image",
    campaignName: form.campaignName,
    product: form.product,
    objective: form.objective,
    referenceImage: form.referenceImage,
    numberOfOutputs: form.numberOfOutputs,
    aspectRatio: toPixelSize(form.aspectRatio, form.platform),
    imageQuality: form.imageQuality,
    platform: form.platform,
    audience: form.audience,
    mainMessage: form.mainMessage,
    valueProp: form.valueProp,
    hexColors: form.hexColors,
    requiredElements: form.requiredElements,
    restrictions: form.restrictions,
  };
}

function buildVideoPayload(form) {
  return {
    mode: "video",
    campaignName: form.campaignName,
    product: form.product,
    objective: form.objective,
    platform: form.platform,
    audience: form.audience,
    mainMessage: form.mainMessage,
    valueProp: form.valueProp,
    hexColors: form.hexColors,
    requiredElements: form.requiredElements,
    restrictions: form.restrictions,
    referenceImage: form.referenceImage,
    video: {
      numberOfOutputs: form.numberOfOutputs,
      aspectRatio: form.aspectRatio,
      duration: toDurationInt(form.referenceImage ? "8s" : form.duration),
      resolution: form.imageSize,
      frameRate: 24,
      outputFormat: "video/mp4",
    },
  };
}

export function buildPayload(mode, form) {
  return mode === "video"
    ? buildVideoPayload(form)
    : buildImagePayload(form);
}

/**
 * Sends the form payload to the n8n webhook.
 * Throws on non-2xx responses.
 */
export async function submitForm(mode, form) {
  const payload = buildPayload(mode, form);

  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  return res;
}
