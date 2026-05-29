// Load Midtrans Snap script dynamically
export const loadMidtransSnap = () => {
  return new Promise((resolve, reject) => {
    if (window.snap) { resolve(window.snap); return; }
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '');
    script.onload = () => resolve(window.snap);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const openSnapPayment = async (snapToken, onSuccess, onPending, onError, onClose) => {
  const snap = await loadMidtransSnap();
  snap.pay(snapToken, {
    onSuccess: (result) => onSuccess && onSuccess(result),
    onPending: (result) => onPending && onPending(result),
    onError: (result) => onError && onError(result),
    onClose: () => onClose && onClose(),
  });
};
