/**
 * Builds the payload from form state + mode.
 */
export function buildPayload(mode, form) {
  const payload = {
    mode,
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

  if (mode === "video") {
    payload.duration = form.duration;
    payload.imageSize = form.imageSize;
  }

  return payload;
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
