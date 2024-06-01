export const getRowHeaders = (data) => {
    let rowHeaders = [];
    for (const key in data) {
        rowHeaders.push(key);        
    }
    return rowHeaders;
}