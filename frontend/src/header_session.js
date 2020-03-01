
var config =
[
    {
        withCredentials: true,
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': true
        }
    },
    {
        withCredentials: true,
        headers:
        {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': true
        }
    }
];

module.exports =  config;