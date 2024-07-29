const { supabase } = require('../database/database.js');

const saveLog = async (data) => {
    try {
        let { error } = await supabase
            .from('logs')
            .insert([
                { url: data.url, adsFound: data.adsFound, averagePrice: data.averagePrice, minPrice: data.minPrice, maxPrice: data.maxPrice, created: new Date().toISOString() }
            ]);
        if (error) throw error;
    } catch (error) {
        console.error("SaveLog Error: ", error)
    }
};

const getLogsByUrl = async (url, limit) => {
    try {
        let { data, error } = await supabase
            .from('logs')
            .select('*')
            .eq('url', url)
            .limit(limit);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("getLogsError: ", error)
    }
};

module.exports = {
    saveLog,
    getLogsByUrl
};
