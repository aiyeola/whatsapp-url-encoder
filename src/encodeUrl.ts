export default function encodeUrl(phone_number: string, encodedText: string) {
  return `https://api.whatsapp.com/send/?phone=${phone_number}&${encodedText}`;
}
