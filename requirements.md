# PRD — Landing Page Piloto High-Ticket (Clínica Dental)
**Rol:** Product Owner + Performance Ads (High Ticket)  
**Objetivo:** Validar demanda y captación de leads **calificados** para el servicio **“Diseño de Sonrisa Digital Personalizada”** usando **Meta Ads** + Landing + Formulario + WhatsApp Business.  
**Stack:** 100% HTML + Tailwind + JS (sin subscripciones) + GitHub Pages + GTM/GA4/Meta Pixel.  
**Canal de contacto:** WhatsApp Business de la clínica.

---

## 1. Contexto y propósito del producto
La landing no es “un sitio bonito”. Es un **sistema mínimo de validación** que:
- Reduce curiosos y consultas de bajo valor.
- Aumenta intención real (con filtros y preparación mental).
- Permite medir: desde click hasta conversación por WhatsApp.
- Permite iterar oferta/mensaje con datos (no opiniones).

---

## 2. Objetivos (medibles)
### Objetivo principal
- Generar **Qualified Leads (Tier A/B)** que avancen a WhatsApp con contexto suficiente para agendar.

### Objetivos secundarios
- Disminuir leads sin intención (Tier C).
- Identificar fricciones del funnel (drop-offs).
- Documentar aprendizajes para iterar Ads y oferta.

### Métricas clave (KPIs)
- **Landing View → FormStart rate**
- **FormStart → FormSubmit rate**
- **FormSubmit → QualifiedLead rate**
- **QualifiedLead → WhatsAppRedirect rate**
- **Costo por QualifiedLead (Meta)** (se calcula en Ads Manager, usando evento)
- **Tiempo medio hasta WhatsAppRedirect** (proxy de intención)
- **Drop-off por step** del formulario

---

## 3. Alcance del MVP
### Incluye
- Landing single-page (one-pager) optimizada para mobile.
- Copy orientado a high-ticket + filtrado.
- Formulario multi-step con reglas de precalificación.
- Página/estado de confirmación post-submit.
- Redirección a WhatsApp con mensaje prellenado.
- Tracking completo vía dataLayer + GTM.
- Implementación de eventos GA4 y Meta Pixel.

### No incluye (por ahora)
- CRM, dashboard, backend propio, email automation.
- Google Ads.
- A/B testing automatizado (se puede hacer manual con variantes).
- Gestión de agenda integrada (solo WhatsApp para coordinar).

---

## 4. Usuarios y casos de uso
### Persona 1 — Paciente ideal (Tier A)
- Motivación estética/confianza alta.
- Dispuesto a invertir.
- Busca solución planificada, natural, premium.
- Quiere pocas sesiones y confianza en el resultado.

**Caso de uso:**
1) Ve anuncio → 2) Entiende propuesta → 3) Postula → 4) Califica → 5) Va a WhatsApp para agendar.

### Persona 2 — Interesado tibio (Tier B)
- Intención real, pero más lento o con presupuesto medio.
- Puede necesitar seguimiento, pero vale la pena.

### Persona 3 — Curioso (Tier C)
- Busca “lo más barato”, “solo cotizar”, “solo explorar”.
- Debe ser filtrado sin saturar WhatsApp.

---

## 5. Arquitectura del funnel (alto nivel)
**Meta Ads → Landing → Form multi-step → (calificación) → WhatsApp**

Regla base:
- **WhatsApp NO aparece como CTA primario antes del formulario.**
- Primero: postulación + filtro. Luego: WhatsApp.

---

## 6. Requerimientos de contenido (secciones obligatorias)
> Nota: Cada sección debe tener objetivo psicológico y objetivo de conversión.

### 6.1 Header minimalista (sin menú)
**Objetivo:** foco total en conversión.
- Logo (opcional) + texto corto “Evaluación exclusiva”.
- Un solo CTA: “Postular” (ancla al formulario).
- Sin links externos (RRSS, otras páginas, WhatsApp directo).

**Criterios de aceptación**
- No hay navegación a otras URLs.
- CTA siempre visible en desktop; en mobile puede ser sticky.

---

### 6.2 Hero (primera pantalla)
**Objetivo psicológico:** claridad + autoridad + filtro temprano.  
**Objetivo conversión:** llevar al formulario.

**Contenido mínimo**
- Titular: “Mejora tu sonrisa de forma natural con planificación digital personalizada”
- Subtitular: “Proceso guiado, resultados armónicos, atención boutique.”
- Badge: “Evaluación exclusiva / Cupos limitados”
- **Filtro temprano** (texto):  
  “⚠️ No es un tratamiento económico ni masivo. Diseñado para personas comprometidas con un resultado premium.”
- CTA primario: “Postular a evaluación”
- Micro-confianza: “Planificación digital • Atención personalizada • Resultados naturales”

**UI/UX**
- Fondo limpio, estética clínica premium.
- Imagen hero (si se usa): humana/sonrisa natural, no stock exagerado.
- Evitar sobrecarga: máximo 2–3 líneas visibles en mobile.

**Criterios de aceptación**
- CTA visible sin scroll en mobile (ideal).
- Filtro temprano visible sin scroll o con scroll mínimo.

---

### 6.3 Sección “¿Por qué no es una decisión simple?”
**Objetivo psicológico:** empatía + reconocer el dolor + elevar la conversación.

**Contenido**
- 3–5 bullets de problemas reales:
  - Inseguridad al sonreír
  - Miedo a resultados artificiales
  - Falta de confianza en cotizaciones previas
  - Deseo de solución planificada (no improvisada)

**Criterios de aceptación**
- Copy sin dramatizar; tono profesional.
- Debe conectar con emoción sin sonar “venta agresiva”.

---

### 6.4 Sección “La solución: Diseño de Sonrisa Digital Personalizada”
**Objetivo psicológico:** clarificar método (reduce incertidumbre).  
**Objetivo conversión:** justificar inversión.

**Contenido**
- Definición simple del servicio (no técnica):
  “Un proceso guiado donde planificamos tu sonrisa antes de intervenir.”
- 3 pilares:
  1) Evaluación avanzada
  2) Escaneo / planificación digital
  3) Propuesta personalizada y ejecución

**Criterios de aceptación**
- Lenguaje entendible para no dentistas.
- No prometer milagros (“perfecto”, “garantizado”, etc.)

---

### 6.5 Sección “Qué incluye” (lista de valor)
**Objetivo psicológico:** tangibilizar valor.

**Contenido mínimo**
- Evaluación estética avanzada
- Escaneo intraoral 3D (si aplica)
- Planificación digital personalizada
- Propuesta clara antes de comenzar
- Atención directa con especialista
- Ejecución en pocas sesiones (si aplica)

**Criterios de aceptación**
- Si algún punto NO aplica clínicamente, debe poder ocultarse/configurarse.
- No incluir marcas si no hay consenso (Straumann, etc.) en esta fase.

---

### 6.6 Sección “Para quién SÍ / Para quién NO”
**Objetivo psicológico:** filtro + exclusividad.  
**Objetivo conversión:** aumentar calidad de leads (menos volumen, más intención).

**Contenido**
**Sí es para ti si:**
- Buscas resultado natural y armónico
- Valoras planificación y tecnología
- Estás dispuesto(a) a invertir
- Quieres confianza y previsibilidad

**No es para ti si:**
- Buscas lo más barato
- Solo quieres “cotizar por curiosidad”
- No estás listo(a) para decidir en el corto/mediano plazo
- Comparas solo por precio

**Criterios de aceptación**
- Debe estar antes del formulario (o justo encima).
- Debe sentirse firme pero respetuoso.

---

### 6.7 Sección “Inversión y transparencia” (sin precios exactos)
**Objetivo psicológico:** preparar mente para high-ticket, sin fricción de precio público.

**Contenido**
- Declaración: “Inversión media-alta acorde a planificación/tecnología.”
- Explicación: “La inversión depende del caso y se define en evaluación.”
- Si hay financiamiento: mención genérica (“facilidades de pago disponibles”).

**Criterios de aceptación**
- Nunca mostrar precio fijo en MVP.
- Debe reforzar el filtro sin confrontación.

---

### 6.8 Sección “Proceso” (paso a paso)
**Objetivo psicológico:** claridad = confianza.

**Contenido**
1) Postulas (formulario)
2) Confirmamos si eres candidato(a)
3) Coordinas por WhatsApp
4) Evaluación en clínica
5) Plan personalizado

**Criterios de aceptación**
- Visual simple: timeline o 4–5 steps con íconos.

---

### 6.9 Sección “Prueba social / confianza” (opcional pero recomendada)
**Objetivo psicológico:** reducir riesgo percibido.

**Contenido (elige 1–2)**
- Testimonios breves (sin claims exagerados)
- Estadísticas: “+X años”, “+Y casos” (solo si son reales)
- Certificaciones (si aplica)
- Fotos de clínica/equipo (reales)

**Criterios de aceptación**
- Si no hay material, se omite para no inventar.

---

### 6.10 Formulario multi-step de precalificación (sección principal)
**Objetivo psicológico:** compromiso gradual + filtro.  
**Objetivo conversión:** convertir en lead calificado antes de WhatsApp.

#### Estructura del formulario
- Multi-step (recomendado 6–7 preguntas)
- Barra de progreso (ej: 1/6, 2/6…)
- Un solo campo por pantalla (ideal)
- Botones: “Continuar” / “Volver”
- Validación suave y clara
- Persistencia en localStorage (si cierra/recarga)

#### Preguntas recomendadas (MVP)
**Step 1 — Nombre**
- `first_name` (requerido)

**Step 2 — Objetivo principal**
- `primary_goal` enum:
  - “Sonrisa más armónica y natural”
  - “Mejorar confianza al sonreír”
  - “Corregir detalles estéticos”
  - “No estoy seguro(a)”

**Step 3 — Urgencia / horizonte**
- `timeline` enum:
  - “7–14 días”
  - “Este mes”
  - “+60 días”
  - “No estoy seguro(a)”

**Step 4 — Prioridad**
- `priority` enum:
  - “Alta (quiero resolverlo pronto)”
  - “Media (quiero evaluar opciones)”
  - “Explorando (solo mirando)”

**Step 5 — Rango de inversión (filtro económico)**
- `investment_range` enum (ejemplo):
  - “$1.500–$3.000”
  - “$3.000–$6.000”
  - “$6.000+”
  - “Prefiero no decir / busco lo más económico” (si se incluye, tiende a Tier C)

**Step 6 — Canal WhatsApp**
- `whatsapp_opt_in` checkbox:
  - “Acepto que me contacten por WhatsApp para coordinar evaluación.”
- `phone` opcional:
  - Si lo pides, debe ser claro y mínimo (formato Chile +56…)
  - Recomendación: pedirlo solo si aporta (WhatsApp funciona sin capturar número si rediriges)

**Step 7 — Condiciones**
- `accepted_conditions` (requerido):
  - “Entiendo que es una evaluación para un tratamiento premium y no es una cotización masiva.”

#### Reglas de calificación (Tiering)
- **Tier A (ideal):**
  - `accepted_conditions = true`
  - `priority` = alta
  - `investment_range` >= “$3.000–$6.000”
  - `timeline` = “7–14 días” o “Este mes”
- **Tier B (posible):**
  - `accepted_conditions = true`
  - `priority` = media
  - `investment_range` >= “$1.500–$3.000”
  - `timeline` != “No estoy seguro(a)”
- **Tier C (curioso):**
  - `priority` = explorando OR
  - `accepted_conditions` = false OR
  - `investment_range` bajo / no declara OR
  - `timeline` = no seguro

**Criterios de aceptación**
- Debe calcular `lead_tier` y `is_qualified` al submit.
- Debe permitir continuar aunque el lead sea C, pero:
  - **La redirección a WhatsApp puede ser solo para A/B** (recomendado)  
  - Para C: mostrar mensaje “por ahora no califica / te recomendamos…” (sin ofender).
- Debe ser usable 100% en mobile.

---

### 6.11 Pantalla de confirmación / resultado (post-submit)
**Objetivo psicológico:** guiar el siguiente paso sin confusión.

**Estados**
1) **A/B (calificado):**
   - Mensaje: “Gracias, eres candidato(a). Continúa por WhatsApp para coordinar.”
   - CTA: “Ir a WhatsApp”
2) **C (no calificado):**
   - Mensaje respetuoso: “Gracias por postular. Este proceso es para casos de inversión media-alta. Si buscas opciones generales, podemos orientarte en la clínica.”
   - CTA alternativo (opcional): “Ver otros servicios” (si existe) o “Finalizar”.

**Criterios de aceptación**
- No saturar WhatsApp con Tier C (ideal).
- Mantener tono premium y humano.

---

### 6.12 Footer minimalista
**Objetivo:** confianza + datos básicos.
- Nombre de clínica
- Ubicación general (comuna/ciudad)
- Horario (si aplica)
- Aviso legal mínimo: “Resultados dependen del diagnóstico clínico”

**Criterios de aceptación**
- Sin links externos en MVP (opcional: link a Google Maps si la clínica lo pide).

---

## 7. Requerimientos funcionales (sistema)
### 7.1 CTA y navegación
- CTA primario en hero y pre-form: ancla a formulario.
- Sticky CTA en mobile (opcional).
- Sin menús que desvíen.

### 7.2 WhatsApp redirect
- Se redirige con `wa.me/<E164>?text=<encoded>`
- Mensaje prellenado incluye:
  - Nombre
  - Servicio (“Diseño de Sonrisa Digital Personalizada”)
  - Petición de agenda
  - **ID corto** (para reconciliar tracking)

**Plantilla mensaje recomendada**
- “Hola, soy {Nombre}. Postulé a la evaluación de Diseño de Sonrisa Digital Personalizada. ¿Me ayudan a agendar? ID: CT-{idCorto}”

### 7.3 Persistencia de formulario
- Guardar progreso en `localStorage`:
  - step actual
  - respuestas
  - lead_id
- Botón “Continuar donde quedé” (opcional) o auto-restore.

### 7.4 Manejo de errores
- Si fallan scripts de tracking, el usuario igual puede completar y llegar a WhatsApp.
- Validación visible (no “alert()”).
- Mensajes de error: claros y cortos.

---

## 8. Tracking (requerimientos técnicos)
### 8.1 Principio
Todo tracking se dispara vía:
- `window.dataLayer.push({ event: "...", ...props })`

### 8.2 Eventos obligatorios (dataLayer)
- `page_view`
- `view_content` (scroll 50% o 15s)
- `form_start`
- `form_step`
- `form_submit`
- `qualified_lead`
- `whatsapp_redirect`

### 8.3 Props estándar (sin PII)
- `session_id`
- `lead_id`
- `lead_tier`
- `is_qualified`
- `investment_range`
- `priority`
- `timeline`
- `qualification_version`
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `engagement_type` (para view_content)
- `step`, `field_group` (para form_step)

**Prohibido enviar a GA/Meta**
- email, teléfono, nombre completo (PII)

### 8.4 Conversión principal
- **GA4 conversion:** `qualified_lead`
- **Meta optimización:** custom `QualifiedLead` (cuando haya volumen), por ahora `Lead` y `Contact` también sirven.

---

## 9. Requerimientos de Ads High-Ticket (implicancias de producto)
La landing debe soportar el enfoque de Ads:
- Mensaje premium, no “promo”.
- Filtro temprano (evitar shock de precio).
- Consistencia anuncio → landing (mismo concepto, misma promesa).
- Claridad del “método” (reduce fricción para high-ticket).
- CTA tipo “postula” (selección) no “agenda” (volumen).

---

## 10. UX/UI (estándar premium)
### 10.1 Principios visuales
- Minimalismo (mucho aire).
- Tipografía legible, jerarquía clara.
- 1 color de acento (brand) + neutros.
- Cards suaves, sombras sutiles.
- Nada “agresivo”: sin rojos, sin urgencia falsa.

### 10.2 Layout
- Max width: 1100–1200px en desktop.
- Spacing generoso: secciones con `py-16` mínimo.
- Mobile first: todo legible en 360px.

### 10.3 Componentes
- Botón primario (brand)
- Botón secundario (outline)
- Cards con borde suave
- Badges (brand-100)
- Stepper del form (progress)

---

## 11. SEO mínimo (sin perder foco)
- `title` y `meta description` coherentes con Ads.
- OpenGraph (imagen + título).
- Canonical (la URL final de GitHub Pages).
- `robots` index/noindex según decisión (para piloto puede ser index).

---

## 12. Performance (crítico para Ads)
### Requerimientos
- LCP < 2.5s en mobile (ideal).
- JS mínimo (solo lo necesario).
- Imágenes optimizadas (WebP/AVIF si posible).
- Lazy-load para secciones no críticas.

### Criterios de aceptación
- PageSpeed > 80 mobile (objetivo razonable).
- No usar librerías pesadas innecesarias.

---

## 13. Accesibilidad y compliance
- Labels en inputs.
- Focus visible (teclado).
- Contraste AA (texto vs fondo).
- Texto sin claims médicos falsos.
- Disclaimer: “Tratamiento sujeto a evaluación clínica.”

---

## 14. Configuración y despliegue (GitHub Pages)
- Repo público o privado (da igual para Pages si configuras bien).
- Branch `main` o `gh-pages`.
- Ruta estable (importante para pixel/GA).
- Archivo `CNAME` si usas dominio propio (opcional).
- QA en móvil real (iPhone/Android).

---

## 15. Plan de QA (checklist)
### Funcional
- [ ] CTA lleva al form.
- [ ] Form multi-step avanza/retrocede.
- [ ] Validaciones funcionan.
- [ ] Calificación A/B/C correcta.
- [ ] A/B redirige a WhatsApp con mensaje correcto.
- [ ] C no redirige (si así se define).
- [ ] LocalStorage restore funciona.

### Tracking (GTM Preview)
- [ ] page_view con UTMs
- [ ] view_content (scroll/time)
- [ ] form_start
- [ ] form_step por step
- [ ] form_submit con props
- [ ] qualified_lead solo para A/B según reglas
- [ ] whatsapp_redirect antes de redirect

### UX
- [ ] Mobile legible sin zoom.
- [ ] Botones con buen hit-area.
- [ ] No hay distracciones (links externos).

---

## 16. Criterios de éxito del piloto (producto + ads)
Al final de 14–21 días:
- Hay **QualifiedLeads** consistentes (no solo Leads).
- WhatsApp recibe conversaciones con contexto (no “¿precio?”).
- La clínica no se satura y puede gestionar.
- Se identifican objeciones reales y se iteran mensajes.

---

## 17. Backlog (post-MVP, si funciona)
- Variant A/B manual de hero y filtro (dos URLs).
- Registro de leads en Google Sheets (webhook).
- Retargeting: audiencia de `view_content` sin `form_submit`.
- Meta CAPI server-side (cuando haya backend).
- Panel simple (reporting).

---

## 18. Definiciones finales (glosario)
- **Lead:** completó formulario (`form_submit`).
- **Qualified Lead:** cumple criterios A/B (`qualified_lead`).
- **Tier A:** ideal, alta intención + inversión.
- **Tier B:** posible, requiere seguimiento.
- **Tier C:** curioso/no apto para piloto.

---
