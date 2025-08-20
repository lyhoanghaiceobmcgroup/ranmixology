import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, drinkName, mood } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const musicApiKey = Deno.env.get('MUSIC_API_KEY');
    
    if (!musicApiKey) {
      return new Response(
        JSON.stringify({ error: 'Music API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating music with prompt:', prompt);
    console.log('Drink name:', drinkName);
    console.log('Mood:', mood);

    // Enhance the prompt with drink and mood context
    const enhancedPrompt = `Create instrumental music inspired by ${drinkName || 'a special drink'}. The mood should be ${mood || 'relaxing'}. ${prompt}`;

    // Call the music generation API
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${musicApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "aec803269ec2d3d64dba5a05b975c6b2c5dd3a7c7f5a5c2e7dc9c4b6bfb6c9e2",
        input: {
          prompt: enhancedPrompt,
          model_version: "stereo-melody-large",
          output_format: "mp3",
          normalization_strategy: "peak"
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Music API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate music', details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    console.log('Music generation result:', result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        predictionId: result.id,
        status: result.status,
        prompt: enhancedPrompt
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-music function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});