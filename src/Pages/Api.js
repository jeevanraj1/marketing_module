import axios from "axios";

// const baseurl = `http://172.16.17.2:8080/ords/market/tbl/`
const baseurl = `http://103.21.232.59:8080/ords/market/tbl/`
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
            fetch_status_DD: () => axios.get(baseurl + 'agent_status'),
            fetch_RateCateogry_DD:()=>axios.get(baseurl+'rate_category'),
            fetch_BillCategory_DD:()=>axios.get(baseurl+'bill_category'),
            fetch_Paymode_DD:()=>axios.get(baseurl+'paymode'),
            fetch_BankMaster_DD:()=>axios.get(baseurl+'dd_bank_master'),
            fetch_BranchMaster_DD:(id)=>axios.get(baseurl+`dd_branchmaster?bank_code=${id}`),
            fetch_customerType_DD:()=>axios.get(baseurl + 'customer_type'),
            fetch_DepositePaymode_DD:()=>axios.get(baseurl+'dd_deposit_paymode'),
            fetch_DepositeType_DD:()=>axios.get(baseurl + 'dd_deposit_type'),
            create:(newRecord)=>axios.post(url,newRecord),
            bankDetailsUpdate:(id,updatedRecord)=>axios.put(url+`?customer_code=${id}`,updatedRecord)
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

export const CustomerTypeApi = {
    CustomerTypeApi_master(url = baseurl + 'customer_type') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?customer_type_id=${id}`, updateRecord),
        };
    }
};
export const BankMasterApi = {
    bankmaster(url = baseurl + 'bankmaster') {
      return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url+`?bank_code=${id}`),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url+`?bank_code=${id}`, updateRecord),
        delete: id => axios.delete(url+`?bank_code=${id}`)
      };
    }
  };

  export const BranchMasterApi = {
    BranchMaster(url = baseurl + 'branchmaster') {
      return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url+`?branch_code=${id}`),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updateRecord) => axios.put(url+`?branch_code=${id}`, updateRecord),
        delete: deletedBranch => axios.delete(url+`?branch_code=${deletedBranch}`),
        fetchByBack_code:banck_code=>axios.get(url+`?bank_code=${banck_code}`)
      };
    }
  };
