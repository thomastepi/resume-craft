import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

const RECAPTCHA_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";
const SITE_KEY = "6LfFmM8rAAAAAMMbAgUdchh0HNCfluN9Y4zydh_a";

const GoogleReCaptcha = forwardRef(function GoogleReCaptcha(_, ref) {
  const widgetIdRef = useRef(null);
  const resolverRef = useRef(null);
  const readyIntervalRef = useRef(null);

  useEffect(() => {
    if (window.grecaptcha) return;
    const s = document.createElement("script");
    s.src = RECAPTCHA_SRC;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  const renderWidget = useCallback(() => {
    if (!window.grecaptcha || widgetIdRef.current !== null) return;

    widgetIdRef.current = window.grecaptcha.render("recaptcha-invisible", {
      sitekey: SITE_KEY,
      size: "invisible",
      callback: (token) => {
        resolverRef.current?.(token);
        resolverRef.current = null;
      },
      "error-callback": () => {
        resolverRef.current?.(null);
        resolverRef.current = null;
      },
      "expired-callback": () => {
        resolverRef.current?.(null);
        resolverRef.current = null;
      },
      badge: "bottomright",
    });
  }, []);

  useEffect(() => {
    const tick = () => {
      if (window.grecaptcha?.render) {
        clearInterval(readyIntervalRef.current);
        renderWidget();
      }
    };
    if (window.grecaptcha?.render) renderWidget();
    else readyIntervalRef.current = window.setInterval(tick, 50);

    return () => clearInterval(readyIntervalRef.current);
  }, [renderWidget]);

  useImperativeHandle(ref, () => ({
    execute: () =>
      new Promise((resolve) => {
        if (widgetIdRef.current == null || !window.grecaptcha?.execute) {
          return resolve(null);
        }
        resolverRef.current = resolve;
        window.grecaptcha.execute(widgetIdRef.current);
      }),
    reset: () => {
      if (widgetIdRef.current != null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
      resolverRef.current = null;
    },
  }));

  return <div id="recaptcha-invisible" />;
});

export default GoogleReCaptcha;
