-- Store the music generation API key securely
-- This will be used by the Edge Function for music generation
INSERT INTO auth.secrets (name, value) VALUES ('MUSIC_API_KEY', '26651566891361849fc9cf844823f64f') 
ON CONFLICT (name) DO UPDATE SET value = EXCLUDED.value;