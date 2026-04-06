-- =============================================
-- THE FLORIDA MAID — COMPLETE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  unit text,
  notes text,
  status text DEFAULT 'active',
  active boolean DEFAULT true,
  do_not_service boolean DEFAULT false,
  pin text DEFAULT lpad(floor(random() * 1000000)::text, 6, '0'),
  referrer_id uuid,
  pet_name text,
  pet_type text,
  preferred_cleaner_id uuid,
  latitude double precision,
  longitude double precision,
  sms_consent boolean DEFAULT true,
  sms_marketing_opt_out boolean DEFAULT false,
  sms_marketing_opted_out_at timestamptz,
  email_marketing_opt_out boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cleaners
CREATE TABLE IF NOT EXISTS cleaners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  hourly_rate numeric DEFAULT 40,
  active boolean DEFAULT true,
  notes text,
  pin text DEFAULT lpad(floor(random() * 1000000)::text, 6, '0'),
  working_days text[] DEFAULT ARRAY['monday','tuesday','wednesday','thursday','friday','saturday'],
  start_time text DEFAULT '09:00',
  end_time text DEFAULT '18:00',
  home_by_time text DEFAULT '19:00',
  max_jobs_per_day integer DEFAULT 3,
  home_latitude double precision,
  home_longitude double precision,
  service_zones text[],
  has_car boolean DEFAULT false,
  sms_consent boolean DEFAULT true,
  quiet_hours_start text DEFAULT '20:00',
  quiet_hours_end text DEFAULT '08:00',
  guidelines_acknowledged boolean DEFAULT false,
  guidelines_acknowledged_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  cleaner_id uuid REFERENCES cleaners(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  service_type text DEFAULT 'Standard Cleaning',
  status text DEFAULT 'pending',
  price integer DEFAULT 0,
  hourly_rate numeric DEFAULT 65,
  notes text,
  payment_status text DEFAULT 'pending',
  payment_method text,
  paid_at timestamptz,
  cleaner_pay_rate numeric DEFAULT 40,
  cleaner_paid boolean DEFAULT false,
  cleaner_paid_at timestamptz,
  recurring_type text,
  recurring_schedule_id uuid,
  cleaner_token text,
  token_expires_at timestamptz,
  check_in_at timestamptz,
  check_out_at timestamptz,
  check_in_photo_url text,
  check_out_video_url text,
  rating integer,
  rating_text text,
  rating_at timestamptz,
  suggested_cleaner_id uuid,
  suggested_reason text,
  referrer_id uuid,
  ref_code text,
  attributed_domain text,
  attribution_confidence integer,
  attributed_at timestamptz,
  followup_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'viewer',
  phone text,
  status text DEFAULT 'active',
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text,
  message text NOT NULL,
  read boolean DEFAULT false,
  booking_id uuid,
  url text,
  created_at timestamptz DEFAULT now()
);

-- Referrers
CREATE TABLE IF NOT EXISTS referrers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  ref_code text UNIQUE,
  zelle_email text,
  preferred_payout text DEFAULT 'zelle',
  active boolean DEFAULT true,
  total_referrals integer DEFAULT 0,
  total_earned numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Referral Commissions
CREATE TABLE IF NOT EXISTS referral_commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES referrers(id),
  booking_id uuid,
  client_id uuid,
  amount numeric NOT NULL,
  status text DEFAULT 'pending',
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Cleaner Applications
CREATE TABLE IF NOT EXISTS cleaner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  address text,
  experience text,
  availability text,
  referral_source text,
  references jsonb,
  notes text,
  photo_url text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Management Applications
CREATE TABLE IF NOT EXISTS management_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  experience text,
  availability text,
  cover_letter text,
  photo_url text,
  video_url text,
  resume_url text,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Service Types
CREATE TABLE IF NOT EXISTS service_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  default_hours numeric DEFAULT 2,
  active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

INSERT INTO service_types (name, default_hours, sort_order) VALUES
  ('Standard Cleaning', 2, 1),
  ('Deep Cleaning', 4, 2),
  ('Move In/Out', 5, 3),
  ('Post Construction', 6, 4)
ON CONFLICT DO NOTHING;

-- Booking Notes
CREATE TABLE IF NOT EXISTS booking_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL,
  content text NOT NULL,
  author_type text DEFAULT 'admin',
  author_name text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Settings
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb,
  updated_at timestamptz DEFAULT now()
);

-- Feedback
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  source text,
  created_at timestamptz DEFAULT now()
);

-- SMS Conversations (Selena chatbot)
CREATE TABLE IF NOT EXISTS sms_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  client_id uuid,
  booking_id uuid,
  state text DEFAULT 'active',
  booking_checklist jsonb,
  service_type text,
  hourly_rate numeric,
  bedrooms integer,
  bathrooms integer,
  pricing_choice text,
  preferred_date text,
  preferred_time text,
  expired boolean DEFAULT false,
  completed_at timestamptz,
  outcome text,
  summary text,
  conversation_summary text,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- SMS Conversation Messages
CREATE TABLE IF NOT EXISTS sms_conversation_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES sms_conversations(id),
  direction text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Client SMS Messages
CREATE TABLE IF NOT EXISTS client_sms_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  direction text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- SMS Logs
CREATE TABLE IF NOT EXISTS sms_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text,
  message text,
  sms_type text,
  status text DEFAULT 'sent',
  telnyx_message_id text,
  booking_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Cleaner Notifications
CREATE TABLE IF NOT EXISTS cleaner_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cleaner_id uuid REFERENCES cleaners(id),
  type text NOT NULL,
  title text,
  message text NOT NULL,
  read boolean DEFAULT false,
  booking_id uuid,
  sms_sent boolean DEFAULT false,
  email_sent boolean DEFAULT false,
  push_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Push Subscriptions
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint text UNIQUE NOT NULL,
  keys jsonb NOT NULL,
  role text DEFAULT 'admin',
  user_id text,
  created_at timestamptz DEFAULT now()
);

-- Email Logs
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid,
  email_type text,
  recipient text,
  created_at timestamptz DEFAULT now()
);

-- Lead Clicks (analytics)
CREATE TABLE IF NOT EXISTS lead_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text,
  page text,
  action text,
  referrer text,
  device text,
  session_id text,
  visitor_id text,
  user_agent text,
  screen_w integer,
  screen_h integer,
  scroll_depth integer,
  time_on_page integer,
  active_time integer,
  placement text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  load_time_ms integer,
  load_speed text,
  connection text,
  final_scroll integer,
  final_time integer,
  cta_clicked boolean,
  scroll_at_cta integer,
  time_before_cta integer,
  created_at timestamptz DEFAULT now()
);

-- Lead Verification
CREATE TABLE IF NOT EXISTS lead_verification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  visitor_id text,
  session_id text,
  domain text,
  verification_type text,
  confidence integer,
  created_at timestamptz DEFAULT now()
);

-- Campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text DEFAULT 'email',
  subject text,
  body text,
  sms_body text,
  status text DEFAULT 'draft',
  audience text DEFAULT 'all_clients',
  sent_count integer DEFAULT 0,
  delivered_count integer DEFAULT 0,
  failed_count integer DEFAULT 0,
  scheduled_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Campaign Recipients
CREATE TABLE IF NOT EXISTS campaign_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id),
  client_id uuid,
  email text,
  phone text,
  channel text DEFAULT 'email',
  status text DEFAULT 'pending',
  telnyx_message_id text,
  delivered_at timestamptz,
  opened_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Marketing Opt Out Log
CREATE TABLE IF NOT EXISTS marketing_opt_out_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  channel text NOT NULL,
  method text,
  created_at timestamptz DEFAULT now()
);

-- Recurring Schedules
CREATE TABLE IF NOT EXISTS recurring_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  cleaner_id uuid REFERENCES cleaners(id),
  service_type text DEFAULT 'Standard Cleaning',
  frequency text NOT NULL,
  day_of_week text,
  start_time text DEFAULT '09:00',
  duration_hours numeric DEFAULT 2,
  hourly_rate numeric DEFAULT 65,
  notes text,
  active boolean DEFAULT true,
  paused boolean DEFAULT false,
  paused_until timestamptz,
  last_generated timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Schedule Issues
CREATE TABLE IF NOT EXISTS schedule_issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid,
  cleaner_id uuid,
  client_id uuid,
  issue_type text NOT NULL,
  severity text DEFAULT 'info',
  title text,
  message text NOT NULL,
  resolved boolean DEFAULT false,
  resolved_at timestamptz,
  dismissed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Running Late
CREATE TABLE IF NOT EXISTS running_late (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL,
  cleaner_id uuid NOT NULL,
  eta_minutes integer,
  notified_client boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Travel Time Cache
CREATE TABLE IF NOT EXISTS travel_time_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_address text NOT NULL,
  to_address text NOT NULL,
  duration_minutes integer,
  distance_miles numeric,
  created_at timestamptz DEFAULT now()
);

-- Deals (Sales Pipeline)
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  title text NOT NULL,
  value numeric DEFAULT 0,
  stage text DEFAULT 'lead',
  status text DEFAULT 'open',
  notes text,
  close_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Deal Activities
CREATE TABLE IF NOT EXISTS deal_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES deals(id),
  type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Waitlist
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid,
  name text,
  phone text,
  preferred_date text,
  preferred_time text,
  notes text,
  status text DEFAULT 'waiting',
  created_at timestamptz DEFAULT now()
);

-- Domains
CREATE TABLE IF NOT EXISTS domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text UNIQUE NOT NULL,
  neighborhood text,
  region text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Domain Notes
CREATE TABLE IF NOT EXISTS domain_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text NOT NULL,
  note text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Outreach Log
CREATE TABLE IF NOT EXISTS outreach_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id),
  moment_id text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text DEFAULT 'google',
  author text,
  rating integer,
  text text,
  reply text,
  review_id text UNIQUE,
  review_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Google tokens
CREATE TABLE IF NOT EXISTS google_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token text,
  refresh_token text,
  account_id text,
  location_id text,
  expires_at timestamptz,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleaners ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrers ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleaner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE management_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_sms_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleaner_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_opt_out_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE running_late ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_time_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies — allow service_role to bypass (API uses service role key)
CREATE POLICY "Service role bypass" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON cleaners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON bookings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON admin_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON referrers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON referral_commissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON cleaner_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON management_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON service_types FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON booking_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON feedback FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON sms_conversations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON sms_conversation_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON client_sms_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON sms_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON cleaner_notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON push_subscriptions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON email_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON lead_clicks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON lead_verification FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON campaigns FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON campaign_recipients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON marketing_opt_out_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON recurring_schedules FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON schedule_issues FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON running_late FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON travel_time_cache FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON deals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON deal_activities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON waitlist FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON domains FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON domain_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON outreach_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role bypass" ON google_tokens FOR ALL USING (true) WITH CHECK (true);
