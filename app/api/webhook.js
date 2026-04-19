/**
 * Builds the payload from form state + mode.
 */
function buildImagePayload(form) {
  return {
    mode: "image",
    campaignName: form.campaignName,
    product: form.product,
    objective: form.objective,
    referenceImage: form.referenceImage,
    numberOfOutputs: form.numberOfOutputs,
    aspectRatio: form.aspectRatio,
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
      duration: form.referenceImage ? "8s" : form.duration,
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
