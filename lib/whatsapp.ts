import { business } from "@/data/business";

export function whatsappUrl(message: string = business.whatsapp.defaultMessage): string {
  return `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function productInquiryUrl(productName: string): string {
  return whatsappUrl(`Hola! Quisiera consultar por ${productName}.`);
}
