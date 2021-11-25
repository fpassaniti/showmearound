import { ApiClient, fromCatalog } from '@opendatasoft/api-client';

const getDatasets = async (domainid) => {
    if (!domainid) return { datasets: [] };
    const client = new ApiClient({ domain: domainid });
    const query = fromCatalog()
        .datasets()
        .limit(10)
        .toString();
    return client.get(query)
        .then(res => res)
        .catch(err => {
            throw err;
        });
};

const getRecords = async (domainid, datasetid) => {
    if (!domainid || !datasetid) return { datasets: [] };
    const client = new ApiClient({ domain: domainid });
    const query = fromCatalog()
        .dataset(datasetid)
        .records()
        .limit(10)
        .toString();
    return client.get(query)
        .then(res => res)
        .catch(err => {
            throw err;
        });
}

const getRecord = async (domainid, datasetid, recordid) => {
    if (!domainid || !datasetid) return { datasets: [] };
    const client = new ApiClient({ domain: domainid });
    const query = fromCatalog()
        .dataset(datasetid)
        .records()
        .where(`recordid="${recordid}"`)
        .limit(1)
        .toString();
    return client.get(query)
        .then(res => res)
        .catch(err => {
            throw err;
        });
}

const getAround = async (domainid, datasetid, center, radius = 100, rows = 20) => {
    let query = `https://${domainid}.opendatasoft.com/api/records/1.0/search?sort=-dist&geofilter.distance=${center.lat},${center.lng},${radius}&rows=${rows}&format=json&dataset=${datasetid}`;
    return fetch(query)
        .then(res => res)
        .then(res => res.json())
        .catch(err => {
            throw err;
        });
}

export default { getRecords, getRecord, getDatasets, getAround}