const http = require("./http");

const userName = 'luannm.teecom@gmail.com';
const apiToken = 'ATATT3xFfGF0VLxr5p1MpevPzoohwxpTu5cZqADRz3Ps5rlmbT8HIGAQZvCuO1duMR3ORfTMNo4Im14Z5JAkIzL2gB4WZK3x6b9VnAwFhfBKuZmpy-eYm6N0lnZ_n6Qhwb2m7qWLjq8x3pC8d48bnHro4lRUb0EppW7foh-WzuhSgCx4HYeVZMU=8CFCC75B'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

const getEpics = async function() {
    // let axiosUrl = `https://teecomsys.atlassian.net/rest/api/3/search?startAt=0&maxResults=50&fields=*all&jql=project%20%3D%20SPA%20and%20type%3DEpic%20and%20status%20!%3D%20Done%20%20ORDER%20BY%20Rank%20ASC`
    let axiosUrl = `https://teecomsys.atlassian.net/rest/api/3/search?startAt=0&maxResults=50&fields=*all&jql=project%20%3D%20SPA%20and%20type%3DEpic%20%20ORDER%20BY%20Rank%20ASC`
    // let axiosUrl = 'https://teecomsys.atlassian.net/rest/agile/1.0/epic/none/issue?startAt=0&maxResults=50';
    const res = await http({
        baseURL: axiosUrl,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS"
        },
        timeout: getRandomIntInclusive(2000, 50000),
        auth: {
            username: userName,
            password: apiToken,
        }
    });

    return new Promise((resolve) => {
        console.log(res.data)
        resolve(res.data)
    });
}

const getIssueInEpic = async function(epicId) {
    // let axiosUrl = `https://teecomsys.atlassian.net/rest/api/3/search?startAt=0&maxResults=50&fields=*all&jql=project%20%3D%20SPA%20and%20type%3DEpic%20%20ORDER%20BY%20Rank%20ASC`
    let axiosUrl = `https://teecomsys.atlassian.net/rest/agile/1.0/epic/${epicId}/issue`;
    const res = await http({
        baseURL: axiosUrl,
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS"
        },
        timeout: getRandomIntInclusive(2000, 50000),
        auth: {
            username: userName,
            password: apiToken,
        }
    });

    return new Promise((resolve) => {
        console.log(res.data)
        resolve(res.data)
    });
}

module.exports = {
    getEpics, getIssueInEpic
};