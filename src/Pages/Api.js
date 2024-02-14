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
            fetch_RateCateogry_DD: () => axios.get(baseurl + 'rate_category'),
            fetch_BillCategory_DD: () => axios.get(baseurl + 'bill_category'),
            fetch_Paymode_DD: () => axios.get(baseurl + 'dd_paymode'),
            fetch_BankMaster_DD: () => axios.get(baseurl + 'dd_bank_master'),
            fetch_BranchMaster_DD: (id) => axios.get(baseurl + `dd_branchmaster?bank_code=${id}`),
            fetch_customerType_DD: () => axios.get(baseurl + 'customer_type'),
            fetch_DepositePaymode_DD: () => axios.get(baseurl + 'dd_deposit_paymode'),
            fetch_DepositeType_DD: () => axios.get(baseurl + 'dd_deposit_type'),
            FetchAll: () => axios.get(url),
            create: (newRecord) => axios.post(url, newRecord),
            update: (id, newRecord) => axios.put(url + `?customer_code=${id}`, newRecord),

            fetchGSTDetails: (id) => axios.get(baseurl + `gst_details?customer_code=${id}`),
            gstStatusCheck: (id) => axios.get(baseurl + `get_gst_status_check?customer_code=${id}`),
            gstCancleDate: (id) => axios.get(baseurl + `get_maxgst_cancelationdate?customer_code=${id}`),
            addGstDetails: (newRecord) => axios.post(baseurl + "gst_details", newRecord),
            UpdateGSTDetails: (id, updatedRecord) => axios.put(baseurl + `gst_details?gst_id=${id}`, updatedRecord),

            bankDetailsUpdate: (id, updatedRecord) => axios.put(url + `?customer_code=${id}`, updatedRecord),
            AddDeposit: (newRecord) => axios.post(baseurl + 'customer_deposit', newRecord),
            FetchDepositeDetails: (id) => axios.get(baseurl + `customer_deposit?customer_code=${id}`),

            DD_fetch_cityName: () => axios.get(baseurl + "dd_city"),
            DD_fetch_TalukaName: () => axios.get(baseurl + "dd_taluka"),
            DD_fetch_DistrictName: () => axios.get(baseurl + "district"),
            addressFetchAll: (id) => axios.get(baseurl + `address?customer_code=${id}`),
            addAddress: (newRecord) => axios.post(baseurl + "address", newRecord),
            AddressUpdate: (id, newRecord) => axios.put(baseurl + `address?address_id=${id}`, newRecord),

            dd_UserCode: () => axios.get(baseurl + `dd_cust_customer_code`),
            dd_CustomerName: () => axios.get(baseurl + `dd_cust_customer_name`),
            fetchByCustomerCode: (id) => axios.get(url + `?customer_code=${id}`)
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
            fetchById: id => axios.get(url + `?bank_code=${id}`),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?bank_code=${id}`, updateRecord),
            delete: id => axios.delete(url + `?bank_code=${id}`)
        };
    }
};

export const BranchMasterApi = {
    BranchMaster(url = baseurl + 'branchmaster') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + `?branch_code=${id}`),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?branch_code=${id}`, updateRecord),
            delete: deletedBranch => axios.delete(url + `?branch_code=${deletedBranch}`),
            fetchByBack_code: banck_code => axios.get(url + `?bank_code=${banck_code}`)
        };
    }
};

export const DistrictAPI = {
    DistrictAPI_master(url = baseurl + 'district') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?district_code=${id}`, updateRecord),
        };
    }
};

export const TalukaAPI = {
    TalukaAPI_master(url = baseurl + 'taluka') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?taluka_code=${id}`, updateRecord),
            fetchDistrictNameDD: () => axios.get(baseurl + `district`)
        };
    }
};
export const CityAPI = {
    CityAPI_master(url = baseurl + 'city') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?city_code=${id}`, updateRecord),
            fetchTalukaName: () => axios.get(baseurl + "taluka")
        };
    }
};

export const DistributionBatchAPI = {
    DistributionBatch_master(url = baseurl + 'dist_batch') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?dist_batch_no=${id}`, updateRecord),
        };
    }
};

export const sign_up_Api = {
    user_mast(url = baseurl + 'user_mast') {
        return {
            create: newRecord => axios.post(url, newRecord),
        };
    }
};

export const sign_in_Api = {
    sign_in(url = baseurl + 'signin') {
        return {
            fetchby_login_id: loginId => axios.get(url + `?login_id=${loginId}`),
            fetchById: id => axios.get(url + `?branch_code=${id}`),
        };
    }
};

export const ContractorTypeApi = {
    ContractorTypeApi_master(url = baseurl + 'contractor_type') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?customer_type_id=${id}`, updateRecord),
        };
    }
};
export const ContractorAPi = {
    ContractorAPi_master(url = baseurl + 'contractor') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?contractor_code=${id}`, updateRecord),

            fetch_BankMaster_DD: () => axios.get(baseurl + 'dd_bank_master'),
            fetch_BranchMaster_DD: (id) => axios.get(baseurl + `dd_branchmaster?bank_code=${id}`),
            fetch_ifcs: (id) => axios.get(baseurl + `get_ifsc_from_branch?branch_code=${id}`),

            DD_contractor_details_route_name: () => axios.get(baseurl + 'dd_contractor_detail_route_name'),
            contractDetailsCreate: (newRecord) => axios.post(baseurl + 'contractor_detail', newRecord),
            updateContrcatDetails: (id, newRecord) => axios.put(baseurl + `contractor_detail?cont_det_code=${id}`, newRecord),

            DD_route_name_form_Contrcator_code: (id) => axios.get(baseurl + `dd_contractor_deposit_route_name?contractor_code=${id}`),
            fetchContrcatorDeposite: (id) => axios.get(baseurl + `contractor_deposit?contractor_code=${id}`),
            fetch_DepositePaymode_DD: () => axios.get(baseurl + 'dd_deposit_paymode'),
            fetch_DepositeType_DD: () => axios.get(baseurl + 'dd_deposit_type'),
            postContractorDetails: (newRecord) => axios.post(baseurl + "contractor_deposit", newRecord),

            DD_contractor_code:()=>axios.get(baseurl+`dd_contrac_contractor_code`),
            DD_contractor_name:()=>axios.get(baseurl+`dd_contrac_contractor_name`),
            fetchById:(id)=>axios.get(url + `?contractor_code=${id}`),
            
        };
    }
};

export const DistrubutionRoutesAPI = {
    DistrubutionRoutesAPI_master(url = baseurl + 'dist_routes') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + `?route_code=${id}`, updateRecord),

            DD_fetch_district_batch_name: () => axios.get(baseurl + 'dd_dist_batch_name'),
            DD_fetch_contractorCodeNames: () => axios.get(baseurl + 'dd_contractor_name')
        };
    }
};

