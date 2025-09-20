export async function loadGuidefoxAgent(opts) {
  window.bwApiBaseUrl = process.env.REACT_APP_BW_API_BASE;
  window.bwAgentBaseUrl = process.env.REACT_APP_BW_AGENT_BASE;

  // Identify user for targeting + repetition rules
  window.bwUser = {
    id: String(opts?.user._id || opts?.user.id || ""),
    email: opts?.user.email || undefined,
    createdAt: opts?.user.createdAt || undefined,
  };

  // prevent double injection
  if (document.querySelector('script[data-bw-agent="true"]')) return;
   
  // load script
  await new Promise(function (resolve, reject) {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = false;
    s.dataset.bwAgent = "true";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Guidefox agent failed to load"));
    s.src = window.bwAgentBaseUrl + "/main.js";
    (document.head || document.body).appendChild(s);
  });
}

export function unloadGuidefoxAgent() {
  document
    .querySelectorAll('script[data-bw-agent="true"]')
    .forEach(function (s) {
      s.remove();
    });
  // remove any rendered guide DOM
  document
    .querySelectorAll(".bw-banner, .bw-popup, .bw-hint, .bw-tour")
    .forEach(function (el) {
      el.remove();
    });
  delete window.bwUser;
}
