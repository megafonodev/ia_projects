import { FieldGroup, TextInput, TextArea, Select, PillSelector, NumberStepper } from "./FormControls";
import FileUpload from "./FileUpload";
import {
  PLATFORMS,
  DURATIONS,
  IMAGE_SIZES,
  VIDEO_ASPECT_RATIOS,
  getAspectRatiosForPlatform,
} from "./constants";

export default function FormFields({ mode, form, set, onFileChange, onClearFile, maxOutputs }) {
  const availableAspectRatios =
    mode === "video" ? VIDEO_ASPECT_RATIOS : getAspectRatiosForPlatform(form.platform);
  const availableDurations =
    mode === "video" && form.referenceImage ? ["8s"] : DURATIONS;

  return (
    <div key={mode} className="grid gap-6 sm:grid-cols-2">
      {/* Campaign name */}
      <FieldGroup label="Nombre interno de la campaña" htmlFor="campaignName" required delay={0}>
        <TextInput
          id="campaignName"
          placeholder="Ej: Lanzamiento primavera 2026"
          value={form.campaignName}
          onChange={set("campaignName")}
          required
        />
      </FieldGroup>

      {/* Product */}
      <FieldGroup label="Producto / Servicio" htmlFor="product" required delay={30}>
        <TextInput
          id="product"
          placeholder="Ej: Crema hidratante facial"
          value={form.product}
          onChange={set("product")}
          required
        />
      </FieldGroup>

      {/* Objective */}
      <FieldGroup label="Objetivo principal de la publicación" htmlFor="objective" required delay={60}>
        <TextInput
          id="objective"
          placeholder="Ej: Conversión, branding, awareness..."
          value={form.objective}
          onChange={set("objective")}
          required
        />
      </FieldGroup>

      {/* Platform */}
      <FieldGroup label="Plataforma de destino" htmlFor="platform" required delay={90}>
        <Select
          id="platform"
          value={form.platform}
          onChange={set("platform")}
          options={PLATFORMS}
          placeholder="Selecciona una plataforma"
          required
        />
      </FieldGroup>

      {/* Reference image — full width */}
      <div className="sm:col-span-2">
        <FieldGroup label="Imagen de referencia (opcional)" htmlFor="referenceImage" delay={120}>
          <FileUpload
            file={form.referenceImage}
            fileName={form.referenceImageName}
            onFileChange={onFileChange}
            onClear={onClearFile}
          />
          <p className="mt-2 text-xs text-[var(--emd-text-muted)]/80">
            Tamaño máximo: 20 MB.
          </p>
        </FieldGroup>
      </div>

      {/* Video-only: duration + resolution */}
      {mode === "video" && (
        <>
          <FieldGroup label="Duración" htmlFor="duration" required delay={140}>
            <PillSelector
              options={availableDurations}
              value={form.duration}
              onChange={set("duration")}
            />
            {form.referenceImage && (
              <p className="mt-2 text-xs text-[var(--emd-text-muted)]/80">
                Con imagen de referencia, la duración se fija en 8s.
              </p>
            )}
          </FieldGroup>

          <FieldGroup label="Resolución" htmlFor="imageSize" required delay={160}>
            <PillSelector
              options={IMAGE_SIZES}
              value={form.imageSize}
              onChange={set("imageSize")}
            />
            <p className="mt-2 text-xs text-[var(--emd-text-muted)]/80">
              Velocidad nativa: 24 FPS. Formato de salida: video/mp4.
            </p>
          </FieldGroup>
        </>
      )}

      {/* Number of outputs */}
      <FieldGroup
        label={mode === "image" ? "Número de imágenes a generar" : "Número de vídeos a generar"}
        htmlFor="numberOfOutputs"
        required
        delay={180}
      >
        <NumberStepper
          id="numberOfOutputs"
          value={form.numberOfOutputs}
          onChange={set("numberOfOutputs")}
          min={1}
          max={maxOutputs}
        />
      </FieldGroup>

      {/* Aspect ratio */}
      <FieldGroup label="Proporción de aspecto" htmlFor="aspectRatio" required delay={210}>
        <PillSelector
          options={availableAspectRatios}
          value={form.aspectRatio}
          onChange={set("aspectRatio")}
        />
      </FieldGroup>

      {/* Audience */}
      <FieldGroup label="Público objetivo" htmlFor="audience" required delay={240}>
        <TextInput
          id="audience"
          placeholder="Ej: Mujeres 25-40, interesadas en skincare"
          value={form.audience}
          onChange={set("audience")}
          required
        />
      </FieldGroup>

      {/* HEX colors */}
      <FieldGroup label="Códigos HEX o referencias de color" htmlFor="hexColors" delay={270}>
        <TextInput
          id="hexColors"
          placeholder="Ej: #FF4D4D, #1A0747, #AE9AD6"
          value={form.hexColors}
          onChange={set("hexColors")}
        />
      </FieldGroup>

      {/* Main message — full width */}
      <div className="sm:col-span-2">
        <FieldGroup label="Mensaje principal (instrucciones)" htmlFor="mainMessage" required delay={300}>
          <TextArea
            id="mainMessage"
            placeholder="Describe con detalle lo que necesitas generar..."
            value={form.mainMessage}
            onChange={set("mainMessage")}
            required
            rows={4}
          />
        </FieldGroup>
      </div>

      {/* Value proposition */}
      <div className="sm:col-span-2">
        <FieldGroup label="Propuesta de valor / Beneficio principal" htmlFor="valueProp" required delay={330}>
          <TextInput
            id="valueProp"
            placeholder="Ej: Hidratación profunda en 30 segundos"
            value={form.valueProp}
            onChange={set("valueProp")}
            required
          />
        </FieldGroup>
      </div>

      {/* Required elements */}
      <div className="sm:col-span-2">
        <FieldGroup label="Elementos que deben aparecer" htmlFor="requiredElements" delay={360}>
          <TextArea
            id="requiredElements"
            placeholder="Ej: Logo de la marca, producto en primer plano, fondo neutro..."
            value={form.requiredElements}
            onChange={set("requiredElements")}
            rows={3}
          />
        </FieldGroup>
      </div>

      {/* Restrictions */}
      <div className="sm:col-span-2">
        <FieldGroup label="Restricciones o consideraciones" htmlFor="restrictions" delay={390}>
          <TextArea
            id="restrictions"
            placeholder="Ej: No incluir texto superpuesto, evitar tonos fríos..."
            value={form.restrictions}
            onChange={set("restrictions")}
            rows={3}
          />
        </FieldGroup>
      </div>
    </div>
  );
}
