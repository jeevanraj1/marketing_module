import axios from "axios";

const baseurl = `http://172.16.17.2:8080/ords/market/tbl/`
export const officerApi = {
    officerApi_master(url = baseurl + `officers`) {
        return {
            fetchAll: () => axios.get(url),
            create: (newrecord) => axios.post(url, newrecord),
            update: (id, newrecord) => axios.put(url + `?officer_code=${id}`, newrecord)
        }
    }
}

export const paymodeApi = {
    paymodeapi_master(url = baseurl + `paymode`) {
        return {
            fetchAll: () => axios.get(url),
            create: (newrecord) => axios.post(url, newrecord)
        }
    }
}

export const customerApi = {
    customerMaster(url = baseurl + 'customer') {
        return {
            fetch_OfficerName_DD: () => axios.get(baseurl + 'dd_officer_name'),
            fetch_relationType_DD: () => axios.get(baseurl + "relation"),
            fetch_status_DD: () => axios.get(baseurl + 'agent_status')
        }
    }
}

export const RelationApi = {
    RelationApi_master(url = baseurl + "relation") {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?rel_type_id=${id}`, updateRecord),
        }
    }
}
export const paymode_Api = {
    paymode(url = baseurl + 'paymode') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?pay_id=${id}`, updateRecord),
        }
    }
}
export const StatusApi = {
    Status_master(url = baseurl + 'agent_status') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + `?status_id=${id}`),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?status_id=${id}`, updateRecord),
        };
    }
};

export const billCategoryApi = {
    BillCategory_Master(url = baseurl + "bill_category") {
        return {
            fetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, newRecord) => axios.put(url + `?bill_catag=${id}`, newRecord)
        }
    }
}
export const RateCategoryApi = {
    RateCategory(url = baseurl + 'rate_category') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?catag_code=${id}`, updateRecord),
        };
    }
};
