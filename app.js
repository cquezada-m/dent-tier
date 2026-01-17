(function () {
  "use strict";

  console.log("[App] Initializing application...");

  // ==================== UTILITIES ====================

  // Generate UUID v4
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }

  // Generate short ID for WhatsApp message
  function generateShortId() {
    return "CT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Parse UTM parameters from URL
  function getUTMParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
    };
  }

  // ==================== TRACKING ====================

  console.log("[Tracking] Setting up tracking system...");

  window.dataLayer = window.dataLayer || [];

  const sessionId = sessionStorage.getItem("session_id") || generateUUID();
  sessionStorage.setItem("session_id", sessionId);
  console.log("[Tracking] Session ID:", sessionId);

  let leadId = localStorage.getItem("lead_id") || generateUUID();
  localStorage.setItem("lead_id", leadId);
  console.log("[Tracking] Lead ID:", leadId);

  const utmParams = getUTMParams();
  const qualificationVersion = "1.0";
  const experimentVariant = "v1";

  if (utmParams.utm_source) {
    console.log("[Tracking] UTM parameters detected:", utmParams);
  }

  function pushEvent(eventName, additionalData = {}) {
    const eventData = {
      event: eventName,
      session_id: sessionId,
      lead_id: leadId,
      qualification_version: qualificationVersion,
      experiment_variant: experimentVariant,
      ...utmParams,
      ...additionalData,
    };
    window.dataLayer.push(eventData);
    console.log("[DataLayer] Event pushed:", eventName, eventData);
  }

  // Page view event
  pushEvent("page_view");
  console.log("[Tracking] Page view event fired");

  // CTA click tracking
  document.addEventListener("click", function (e) {
    const ctaElement = e.target.closest("[data-cta-id]");
    if (ctaElement) {
      const ctaId = ctaElement.getAttribute("data-cta-id");
      pushEvent("cta_click", { cta_id: ctaId });
      console.log("[Tracking] CTA click tracked:", ctaId);
    }
  });
  console.log("[Tracking] CTA click tracking initialized");

  // View content event (50% scroll or 15s)
  let viewContentFired = false;
  function fireViewContent(engagementType) {
    if (viewContentFired) return;
    viewContentFired = true;
    pushEvent("view_content", { engagement_type: engagementType });
    console.log("[Tracking] View content fired via:", engagementType);
  }

  // Scroll tracking helper
  function checkScrollProgress(progress) {
    if (progress >= 0.5) {
      fireViewContent("scroll_50");
    }
  }

  // Time tracking
  setTimeout(function () {
    fireViewContent("time_15s");
  }, 15000);
  console.log("[Tracking] Time tracking initialized (15s threshold)");

  // ==================== LENIS SMOOTH SCROLL ====================

  if (typeof Lenis !== "undefined") {
    console.log("[Lenis] Initializing smooth scroll...");
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Lenis scroll tracking using progress (0-1)
    lenis.on("scroll", function (e) {
      checkScrollProgress(e.progress);
    });
    console.log("[Tracking] Scroll tracking initialized via Lenis");

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    console.log("[Lenis] Smooth scroll initialized successfully");
  } else {
    console.warn("[Lenis] Lenis library not found, skipping smooth scroll");
  }

  // Always add native scroll listener as fallback (works even with Lenis)
  window.addEventListener("scroll", function () {
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );
    const scrollProgress = (window.scrollY + window.innerHeight) / docHeight;
    checkScrollProgress(scrollProgress);
  });
  console.log("[Tracking] Native scroll fallback initialized");

  // ==================== GSAP ANIMATIONS ====================

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    console.log("[GSAP] Initializing animations...");
    gsap.registerPlugin(ScrollTrigger);

    // Reveal animations
    const revealElements = gsap.utils.toArray(".reveal");
    console.log("[GSAP] Found", revealElements.length, "reveal elements");

    revealElements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: (i % 3) * 0.1,
        },
      );
    });
    console.log("[GSAP] Reveal animations configured");

    // Hero video card parallax effect
    const heroVideoCard = document.getElementById("hero-video-card");
    if (heroVideoCard) {
      gsap.to(heroVideoCard, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      console.log("[GSAP] Hero video parallax effect initialized");
    } else {
      console.warn("[GSAP] Hero video card element not found");
    }
  } else {
    console.warn("[GSAP] GSAP or ScrollTrigger not found, skipping animations");
  }

  // ==================== FORM LOGIC ====================

  console.log("[Form] Initializing form logic...");

  const form = document.getElementById("qualification-form");
  const formContainer = document.getElementById("form-container");
  const resultContainer = document.getElementById("result-container");
  const resultQualified = document.getElementById("result-qualified");
  const resultNotQualified = document.getElementById("result-not-qualified");
  const resultName = document.getElementById("result-name");
  const whatsappLink = document.getElementById("whatsapp-link");

  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnSubmit = document.getElementById("btn-submit");

  const currentStepEl = document.getElementById("current-step");
  const progressBar = document.getElementById("progress-bar");
  const progressPercent = document.getElementById("progress-percent");

  const steps = document.querySelectorAll(".form-step");
  const totalSteps = steps.length;
  let currentStep = 1;

  console.log("[Form] Total steps:", totalSteps);

  // Form data storage
  let formData = JSON.parse(localStorage.getItem("form_data")) || {};
  let formStarted = localStorage.getItem("form_started") === "true";
  let formSubmitted = false;
  let formStartTime = formStarted
    ? parseInt(localStorage.getItem("form_start_time")) || Date.now()
    : null;

  if (Object.keys(formData).length > 0) {
    console.log("[Form] Restored form data from localStorage:", formData);
  }

  // WhatsApp number (replace with actual clinic number)
  const WHATSAPP_NUMBER = "56912345678";

  // Restore form data
  function restoreFormData() {
    console.log("[Form] Restoring form data...");

    if (formData.first_name) {
      document.getElementById("first_name").value = formData.first_name;
      console.log("[Form] Restored first_name:", formData.first_name);
    }

    ["primary_goal", "timeline", "priority", "investment_range"].forEach(
      (field) => {
        if (formData[field]) {
          const radio = document.querySelector(
            `input[name="${field}"][value="${formData[field]}"]`,
          );
          if (radio) {
            radio.checked = true;
            radio.closest(".custom-radio").classList.add("selected");
            console.log("[Form] Restored", field + ":", formData[field]);
          }
        }
      },
    );

    ["accepted_conditions", "whatsapp_opt_in"].forEach((field) => {
      if (formData[field]) {
        const checkbox = document.querySelector(`input[name="${field}"]`);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.closest(".custom-radio").classList.add("selected");
          console.log("[Form] Restored", field + ":", formData[field]);
        }
      }
    });

    // Restore step
    const savedStep = parseInt(localStorage.getItem("current_step")) || 1;
    if (savedStep > 1 && savedStep <= totalSteps) {
      console.log("[Form] Restoring to step:", savedStep);
      goToStep(savedStep);
    }
  }

  // Save form data
  function saveFormData() {
    formData.first_name = document.getElementById("first_name").value;

    ["primary_goal", "timeline", "priority", "investment_range"].forEach(
      (field) => {
        const checked = document.querySelector(
          `input[name="${field}"]:checked`,
        );
        if (checked) formData[field] = checked.value;
      },
    );

    ["accepted_conditions", "whatsapp_opt_in"].forEach((field) => {
      const checkbox = document.querySelector(`input[name="${field}"]`);
      if (checkbox) formData[field] = checkbox.checked;
    });

    localStorage.setItem("form_data", JSON.stringify(formData));
    localStorage.setItem("current_step", currentStep.toString());
    console.log("[Form] Form data saved to localStorage");
  }

  // Update progress UI
  function updateProgress() {
    const percent = Math.round((currentStep / totalSteps) * 100);
    currentStepEl.textContent = currentStep;
    progressBar.style.width = percent + "%";
    progressPercent.textContent = percent + "%";
    console.log("[Form] Progress updated:", percent + "%");
  }

  // Show/hide navigation buttons
  function updateButtons() {
    btnPrev.classList.toggle("hidden", currentStep === 1);
    btnNext.classList.toggle("hidden", currentStep === totalSteps);
    btnSubmit.classList.toggle("hidden", currentStep !== totalSteps);
    console.log("[Form] Navigation buttons updated for step:", currentStep);
  }

  // Go to specific step
  function goToStep(step) {
    console.log("[Form] Navigating to step:", step);
    steps.forEach((s) => s.classList.remove("active"));
    const targetStep = document.querySelector(
      `.form-step[data-step="${step}"]`,
    );
    if (targetStep) {
      targetStep.classList.add("active");
      currentStep = step;
      updateProgress();
      updateButtons();
      saveFormData();

      // Fire form_step event
      const stepNames = [
        "",
        "first_name",
        "primary_goal",
        "timeline",
        "priority",
        "investment_range",
        "consent",
      ];
      const stepName = stepNames[currentStep] || "unknown";
      pushEvent("form_step", {
        step_index: currentStep,
        step_name: stepName,
        field_group: "qualification",
      });
      console.log("[Form] Step", currentStep, "activated -", stepName);
    } else {
      console.error("[Form] Target step not found:", step);
    }
  }

  // Validate current step
  function validateStep() {
    const activeStep = document.querySelector(".form-step.active");
    const step = parseInt(activeStep.dataset.step);
    console.log("[Form] Validating step:", step);

    if (step === 1) {
      const name = document.getElementById("first_name").value.trim();
      if (!name) {
        console.warn("[Form] Validation failed: first_name is empty");
        pushEvent("form_validation_error", {
          step: step,
          field: "first_name",
          reason: "empty",
        });
        document.getElementById("first_name").focus();
        return false;
      }
      console.log("[Form] Step 1 validation passed");
    }

    if (step >= 2 && step <= 5) {
      const fieldNames = [
        "",
        "",
        "primary_goal",
        "timeline",
        "priority",
        "investment_range",
      ];
      const fieldName = fieldNames[step];
      const checked = document.querySelector(
        `input[name="${fieldName}"]:checked`,
      );
      if (!checked) {
        console.warn("[Form] Validation failed:", fieldName, "not selected");
        pushEvent("form_validation_error", {
          step: step,
          field: fieldName,
          reason: "not_selected",
        });
        return false;
      }
      console.log(
        "[Form] Step",
        step,
        "validation passed -",
        fieldName + ":",
        checked.value,
      );
    }

    return true;
  }

  // Calculate lead tier
  function calculateTier() {
    console.log("[Form] Calculating lead tier...");
    const priority = formData.priority;
    const timeline = formData.timeline;
    const investment = formData.investment_range;
    const accepted = formData.accepted_conditions;

    console.log("[Form] Tier calculation inputs:", {
      priority,
      timeline,
      investment,
      accepted,
    });

    if (!accepted) {
      console.log("[Form] Tier result: C (conditions not accepted)");
      return "C";
    }

    const isHighIntent =
      priority === "alta" && (timeline === "7-14" || timeline === "este_mes");
    const isMediumIntent =
      (priority === "alta" || priority === "media") && timeline !== "no_seguro";
    const isHighBudget =
      investment === "3000_6000" || investment === "6000_plus";
    const isMidBudget = investment === "1500_3000";

    // Tier A: High intent + high budget
    if (isHighIntent && isHighBudget) {
      console.log("[Form] Tier result: A (high intent + high budget)");
      return "A";
    }

    // Tier B1: High intent + mid budget (hot lead, budget constraint)
    if (isHighIntent && isMidBudget) {
      console.log("[Form] Tier result: B1 (high intent + mid budget)");
      return "B1";
    }

    // Tier B2: Medium intent + medium budget
    if (isMediumIntent && isMidBudget) {
      console.log("[Form] Tier result: B2 (medium intent + medium budget)");
      return "B2";
    }

    // Tier B3: Medium intent + high budget (warm lead, good budget)
    if (isMediumIntent && isHighBudget) {
      console.log("[Form] Tier result: B3 (medium intent + high budget)");
      return "B3";
    }

    console.log("[Form] Tier result: C (low intent or low budget)");
    return "C";
  }

  // Handle form submission
  function handleSubmit() {
    console.log("[Form] Processing form submission...");
    saveFormData();

    const tier = calculateTier();
    const isQualified = ["A", "B1", "B2", "B3"].includes(tier);
    const shortId = generateShortId();

    console.log("[Form] Submission result:", { tier, isQualified, shortId });

    // Fire form_submit event
    pushEvent("form_submit", {
      lead_tier: tier,
      is_qualified: isQualified,
      investment_range: formData.investment_range,
      priority: formData.priority,
      timeline: formData.timeline,
    });
    console.log("[Form] form_submit event fired");

    // Fire qualified_lead event only for A/B
    if (isQualified) {
      pushEvent("qualified_lead", {
        lead_tier: tier,
        is_qualified: true,
        investment_range: formData.investment_range,
        priority: formData.priority,
        timeline: formData.timeline,
      });
      console.log("[Form] qualified_lead event fired for tier:", tier);
    }

    // Show result
    formContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    console.log("[Form] Showing result container");

    if (isQualified) {
      resultQualified.classList.remove("hidden");
      resultName.textContent = formData.first_name;
      console.log(
        "[Form] Displaying qualified result for:",
        formData.first_name,
      );

      // Build WhatsApp message
      const message = encodeURIComponent(
        `Hola, soy ${formData.first_name}. Postulé a la evaluación de Diseño de Sonrisa Digital Personalizada. ¿Me ayudan a agendar? ID: ${shortId}`,
      );
      whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      console.log("[Form] WhatsApp link generated with ID:", shortId);

      // Track WhatsApp click
      whatsappLink.addEventListener("click", function () {
        pushEvent("whatsapp_redirect", {
          lead_tier: tier,
          lead_id_short: shortId,
          is_qualified: true,
        });
        console.log("[Form] WhatsApp redirect clicked, ID:", shortId);
      });
    } else {
      resultNotQualified.classList.remove("hidden");
      console.log("[Form] Displaying not-qualified result");
    }

    // Save submission receipt for attribution/debugging (non-PII)
    const submissionReceipt = {
      timestamp: new Date().toISOString(),
      short_id: shortId,
      lead_tier: tier,
      is_qualified: isQualified,
      primary_goal: formData.primary_goal,
      timeline: formData.timeline,
      priority: formData.priority,
      investment_range: formData.investment_range,
      session_id: sessionId,
      lead_id: leadId,
      ...utmParams,
    };
    localStorage.setItem(
      "lead_last_submission",
      JSON.stringify(submissionReceipt),
    );
    console.log("[Form] Saved submission receipt:", submissionReceipt);

    // Clear only form progress (keep receipt for attribution)
    localStorage.removeItem("form_data");
    localStorage.removeItem("current_step");
    localStorage.removeItem("form_started");
    console.log("[Form] Cleared form progress from localStorage");
  }

  // Event listeners for radio buttons
  document.querySelectorAll(".custom-radio").forEach((label) => {
    label.addEventListener("click", function () {
      const input = this.querySelector("input");
      if (input.type === "radio") {
        this.closest(".space-y-3, .space-y-4")
          .querySelectorAll(".custom-radio")
          .forEach((l) => {
            l.classList.remove("selected");
          });
        this.classList.add("selected");
        console.log("[Form] Radio selected:", input.name, "=", input.value);
      } else if (input.type === "checkbox") {
        this.classList.toggle("selected", input.checked);
        console.log("[Form] Checkbox toggled:", input.name, "=", input.checked);
      }
    });
  });
  console.log("[Form] Custom radio/checkbox listeners attached");

  // Navigation buttons
  btnNext.addEventListener("click", function () {
    console.log("[Form] Next button clicked");
    if (!validateStep()) return;

    // Fire form_start on first interaction
    if (!formStarted) {
      formStarted = true;
      formStartTime = Date.now();
      localStorage.setItem("form_started", "true");
      localStorage.setItem("form_start_time", formStartTime.toString());
      pushEvent("form_start");
      console.log("[Form] form_start event fired (first interaction)");
    }

    if (currentStep < totalSteps) {
      goToStep(currentStep + 1);
    }
  });

  btnPrev.addEventListener("click", function () {
    console.log("[Form] Previous button clicked");
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  btnSubmit.addEventListener("click", function (e) {
    console.log("[Form] Submit button clicked");
    e.preventDefault();
    if (!validateStep()) return;
    formSubmitted = true;
    handleSubmit();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("[Form] Form submit event prevented (handled via button)");
  });

  // Form abandon tracking
  function handleFormAbandon() {
    if (formStarted && !formSubmitted) {
      const elapsedSeconds = formStartTime
        ? Math.round((Date.now() - formStartTime) / 1000)
        : 0;
      pushEvent("form_abandon", {
        last_step: currentStep,
        total_steps: totalSteps,
        elapsed_time_seconds: elapsedSeconds,
        primary_goal: formData.primary_goal || null,
        timeline: formData.timeline || null,
        priority: formData.priority || null,
        investment_range: formData.investment_range || null,
      });
      console.log("[Form] form_abandon event fired at step:", currentStep);
    }
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      handleFormAbandon();
    }
  });

  window.addEventListener("pagehide", handleFormAbandon);
  console.log("[Tracking] Form abandon tracking initialized");

  // Initialize
  console.log("[Form] Running initialization...");
  restoreFormData();
  updateProgress();
  updateButtons();

  console.log("[App] Application initialized successfully");
})();
