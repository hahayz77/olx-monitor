const { supabase } = require('../database/database.js');
const $logger = require('../components/Logger.js');

const getAd = async (id) => {
    $logger.debug('adRepository: getAd');
    try {
        let { data, error } = await supabase
            .from('ads')
            .select('*')
            .eq('id', id);
        if (error) {
            $logger.error('Error fetching ad by id:', error);
            throw error;
        }
        if (!data || data.length === 0) {
            $logger.error('No ad found with this ID');
            throw new Error('No ad found with this ID');
        }
        return data[0];
    } catch (err) {
        $logger.info('Error in getAd:', err);
        throw err;
    }
};

const getAdsBySearchTerm = async (searchTerm, limit = 10) => {
    $logger.debug('adRepository: getAdsBySearchTerm');
    try {
        let { data, error } = await supabase
            .from('ads')
            .select('*')
            .eq('searchTerm', searchTerm)
            .limit(limit);
        if (error) {
            $logger.error('Error fetching ads by search term:', error);
            throw error;
        }
        if (!data || data.length === 0) {
            $logger.error('No ads found with this term');
            throw new Error('No ads found with this term');
        }
        return data;
    } catch (err) {
        $logger.error('Error in getAdsBySearchTerm:', err);
        throw err;
    }
};

const getAdsBySearchId = async (id, limit = 10) => {
    $logger.debug('adRepository: getAdsBySearchId');
    try {
        let { data, error } = await supabase
            .from('ads')
            .select('*')
            .eq('searchId', id)
            .limit(limit);
        if (error) {
            $logger.error('Error fetching ads by search ID:', error);
            throw error;
        }
        if (!data || data.length === 0) {
            $logger.error('No ads found with this ID');
            throw new Error('No ads found with this ID');
        }
        return data;
    } catch (err) {
        $logger.error('Error in getAdsBySearchId:', err);
        throw err;
    }
};

const createAd = async (ad) => {
    $logger.debug('adRepository: createAd');
    try {
        const now = new Date().toISOString();
        const adData = {
            id: ad.id,
            url: ad.url,
            title: ad.title,
            searchTerm: ad.searchTerm,
            price: ad.price,
            created: now,
            lastUpdate: now
        };
        console.log('createAd data:', adData);
        let { error } = await supabase
            .from('ads')
            .insert([adData]);
        if (error) {
            $logger.error('Error inserting ad:', error);
            throw error;
        }
    } catch (err) {
        $logger.error('Error in createAd:', err);
        throw err;
    }
};

const updateAd = async (id, ad) => {
    $logger.debug('adRepository: updateAd');
    try {
        const updateData = {
            price: ad.price,
            lastUpdate: new Date().toISOString()
        };
        console.log('updateAd data:', updateData);
        let { error } = await supabase
            .from('ads')
            .update(updateData)
            .eq('id', id);
        if (error) {
            $logger.error('Error updating ad:', error);
            throw error;
        }
    } catch (err) {
        $logger.error('Error in updateAd:', err);
        throw err;
    }
};

module.exports = {
    getAd,
    getAdsBySearchTerm,
    getAdsBySearchId,
    createAd,
    updateAd
};
