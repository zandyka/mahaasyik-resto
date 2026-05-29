// Format IDR currency
export const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date to Indonesian
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
};

// Format time 24hr to 12hr
export const formatTime = (timeStr) => {
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'WIB' : 'WIB';
  return `${timeStr.substring(0, 5)} ${ampm}`;
};

// Seating area label
export const seatingLabel = (val) => ({
  outdoor_lt1: 'Outdoor Lt. 1',
  indoor_lt1: 'Indoor Lt. 1',
  indoor_lt1_nosmoking: 'Indoor Lt. 1 No Smoking (AC)',
  lt2_ac: 'Lt. 2 (AC)',
}[val] || val);
