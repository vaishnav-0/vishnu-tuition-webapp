import {get} from "./request"

export default async function k(key: any) {
    try {
        const r = await get("g/" + key);
        return {data: r.data, status: r.status};
    } catch (e: any) {
        return {data: e.response.data, status: e.response.status};
    }
}
