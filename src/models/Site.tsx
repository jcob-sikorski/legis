export default interface Site {
  user_id: string;
  _id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  deleted: number;
  image_url?: string;
  site_url?: string;
  status?: number;
  share_image_url?: string;
  favicon_url?: string;
  cname?: string;
}