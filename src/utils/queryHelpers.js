// Helper to build query string from filters and search
const buildURL = (query, filters) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (filters.type) { params.append('type', filters.type) };
    if (filters.cuisine && filters.cuisine.length)
        filters.cuisine.forEach(c => params.append('cuisine', c));
    if (filters.diet && filters.diet.length)
        filters.diet.forEach(d => params.append('diet', d));
    if (filters.intolerances && filters.intolerances.length)
        filters.intolerances.forEach(i => params.append('intolerances', i));
    if (filters.maxReadyTime) params.append('maxReadyTime', filters.maxReadyTime);
    return params.toString();
};

const parse = (search) => {
    const params = new URLSearchParams(search);
    // For single-value filters
    const query = params.get("query") || "";
    const type = params.get("type") || "";
    const maxReadyTime = params.get("maxReadyTime") || "";

    // For multi-value filters (e.g., cuisine, diet, intolerances)
    const cuisine = params.getAll("cuisine");
    const diet = params.getAll("diet");
    const intolerances = params.getAll("intolerances");

    return { query, type, cuisine, diet, intolerances, maxReadyTime };
};

const buildAPIURL = (query, filters) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (filters.type) { params.append('type', filters.type) };
    if (filters.cuisine && filters.cuisine.length)
        filters.cuisine.forEach(c => params.append('cuisine', c));
    if (filters.diet && filters.diet.length)
        filters.diet.forEach(d => params.append('diet', d));
    if (filters.intolerances && filters.intolerances.length)
        filters.intolerances.forEach(i => params.append('intolerances', i));
    if (filters.maxReadyTime) params.append('maxReadyTime', filters.maxReadyTime);
    return params.toString();
};

const queryHelpers = {
    buildURL,
    parse,
    buildAPIURL
}

export default queryHelpers;