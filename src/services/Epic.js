import { ENDPOINTS } from "@/helper/constants";
import http from "./http";

export async function getEpics() {
  const res = await http({
    baseURL: ENDPOINTS.epics,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });

  return new Promise((resolve) => {
    resolve(res.data);
  });
}

export async function getIssueInEpic(epicId) {
  const res = await http({
    baseURL: ENDPOINTS.epics + '/' + epicId,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });

  return new Promise((resolve) => {
    resolve(res.data);
  });
}
