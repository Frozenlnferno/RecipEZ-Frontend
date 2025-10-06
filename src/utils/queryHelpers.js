// Helper to build query string from filters and search
const buildURL = (query, filters) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (filters?.type) { params.append('type', filters.type) };
    // cuisine, diet, intolerances may be arrays or single values
    if (filters?.cuisine) {
        if (Array.isArray(filters.cuisine)) filters.cuisine.forEach(c => params.append('cuisine', c));
        else params.append('cuisine', filters.cuisine);
    }
    if (filters?.diet) {
        if (Array.isArray(filters.diet)) filters.diet.forEach(d => params.append('diet', d));
        else params.append('diet', filters.diet);
    }
    if (filters?.intolerances) {
        if (Array.isArray(filters.intolerances)) filters.intolerances.forEach(i => params.append('intolerances', i));
        else params.append('intolerances', filters.intolerances);
    }
    if (filters?.readyTime) params.append('readyTime', filters.readyTime);
    return params.toString();
};

const parse = (search) => {
    const params = new URLSearchParams(search);
    // For single-value filters
    const query = params.get("query") || "";
    const type = params.get("type") || "";
    const readyTime = params.get("readyTime") || "";

    // For multi-value filters (e.g., cuisine, diet, intolerances)
    const cuisine = params.getAll("cuisine");
    const diet = params.getAll("diet");
    const intolerances = params.getAll("intolerances");

    return { query, type, cuisine, diet, intolerances, readyTime };
};

const buildAPIURL = (query, filters) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (filters?.type) { params.append('type', filters.type) };
    if (filters?.cuisine) {
        if (Array.isArray(filters.cuisine)) filters.cuisine.forEach(c => params.append('cuisine', c));
        else params.append('cuisine', filters.cuisine);
    }
    if (filters?.diet) {
        if (Array.isArray(filters.diet)) filters.diet.forEach(d => params.append('diet', d));
        else params.append('diet', filters.diet);
    }
    if (filters?.intolerances) {
        if (Array.isArray(filters.intolerances)) filters.intolerances.forEach(i => params.append('intolerances', i));
        else params.append('intolerances', filters.intolerances);
    }
    if (filters?.readyTime) params.append('readyTime', filters.readyTime);
    return params.toString();
};

const queryHelpers = {
    buildURL,
    parse,
    buildAPIURL
}

export default queryHelpers;