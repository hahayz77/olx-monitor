require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const createTables = async () => {
  // Create table at Supabase

  // ######### ADS TABLE #########
  // create table
  // public.ads (
  //   id text not null,
  //   url text null,
  //   title text null,
  //   "searchTerm" text null,
  //   created text null,
  //   "lastUpdate" text null,
  //   price integer null,
  //   constraint ads_pkey primary key (id)
  // ) tablespace pg_default;

  // ######### LOGS TABLE #########
  // create table
  // public.logs (
  //   url text null,
  //   "adsFound" smallint null,
  //   "averagePrice" integer null,
  //   "minPrice" integer null,
  //   "maxPrice" integer null,
  //   created text not null,
  //   constraint logs_pkey primary key (created)
  // ) tablespace pg_default;

  try {
    startScriptLog()
  } catch (error) {
    console.error("StartScript Error: ", error)
  }

};


const now = new Date().toISOString();

const startScriptLog = async () => {
  try {
    let { error: logsError } = await supabase
      .from('logs')
      .insert([
        {
          url: 'Starting script....',
          adsFound: null,
          averagePrice: null,
          minPrice: null,
          maxPrice: null,
          created: now
        }
      ]);

    if (logsError) {
      console.error('Error inserting into logs:', logsError);
      throw logsError;
    } else {
      console.log('Successfully inserted test record into logs');
    }
  } catch (error) {
    console.error('Error in startScriptLog:', error);
  }
};

module.exports = {
  supabase,
  createTables,
  startScriptLog
};
