export default interface Site {
  user_id: string;
  _id: string;
  title?: string;
  description?: string;
  site_url?: string;
  published?: number;
  favicon_url?: string;
  cname?: string;
  template_colors? : string[]
}